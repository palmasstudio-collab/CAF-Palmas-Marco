
/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
*/

import { GoogleGenAI } from "@google/genai";
import { SERVICES, NEWS_ARTICLES } from '../constants';
import { JournalArticle } from '../types';

const getApiKey = () => {
  try {
    // 1. Cerca prima se l'admin ha salvato la chiave manualmente nel browser
    const localKey = localStorage.getItem('CAF_GEMINI_KEY');
    if (localKey && localKey.startsWith('AIza')) {
        console.log("Usando API Key da LocalStorage (Admin)");
        return localKey;
    }

    // 2. Altrimenti cerca nelle variabili d'ambiente (GitHub Secrets)
    // @ts-ignore
    const env = import.meta && import.meta.env;
    if (env && env.VITE_API_KEY) {
      console.log("Usando API Key da Variabili Ambiente (GitHub)");
      return env.VITE_API_KEY;
    }
  } catch (e) {
    console.warn("Errore accesso variabili ambiente:", e);
  }
  
  console.warn("API Key mancante o non configurata.");
  return null;
};

const getSystemInstruction = () => {
  const servicesContext = SERVICES.map(s => 
    `- ${s.title}: ${s.description}`
  ).join('\n');

  return `Sei l'Assistente Virtuale Esperto del "CAF Palmas".
  
  IL TUO RUOLO:
  Sei un consulente fiscale virtuale. Devi fornire risposte precise, professionali e basate sulla logica normativa italiana.
  
  SERVIZI OFFERTI:
  ${servicesContext}
  
  ISTRUZIONI DI COMPORTAMENTO:
  1. **Ragionamento:** Prima di rispondere a domande su requisiti (es. ISEE, Bonus, Pensioni), analizza passo dopo passo la richiesta.
  2. **Precisione:** Se una domanda è troppo generica per dare una risposta fiscale certa, chiedi i dettagli mancanti (es. "Per il calcolo ISEE mi serve sapere il nucleo familiare").
  3. **Limiti:** Non inventare normative. Se non sei sicuro, suggerisci di prenotare un appuntamento in sede per una verifica approfondita.
  4. **Tono:** Professionale, empatico e rassicurante.
  5. **Prenotazioni:** Per fissare appuntamenti, invita sempre a usare il pulsante "Prenota" nel sito.`;
};

export const sendMessageToGemini = async (history: {role: string, text: string}[], newMessage: string): Promise<string> => {
  try {
    const apiKey = getApiKey();
    if (!apiKey) return "⚠️ Servizio Chat non configurato. Accedi all'Area Admin per inserire la Chiave API.";

    const ai = new GoogleGenAI({ apiKey });
    
    // Utilizziamo Gemini 3 Pro con Thinking Mode abilitato per le query complesse dell'utente.
    // Questo è fondamentale per un CAF dove la precisione normativa è prioritaria.
    const chat = ai.chats.create({
      model: 'gemini-3-pro-preview', 
      config: {
        systemInstruction: getSystemInstruction(),
        // Abilitiamo il "Pensiero" per permettere al modello di ragionare sulle normative complesse
        thinkingConfig: { 
            thinkingBudget: 32768 // Massimo budget per ragionamenti profondi su leggi e requisiti
        }
      },
      history: history.map(h => ({
        role: h.role,
        parts: [{ text: h.text }]
      }))
    });

    const result = await chat.sendMessage({ message: newMessage });
    return result.text || "Non ho capito, puoi ripetere?";

  } catch (error) {
    console.error("Gemini API Error:", error);
    return "Mi dispiace, al momento i nostri sistemi sono molto occupati. Riprova tra poco.";
  }
};

/**
 * Cerca notizie reali usando Google Search Grounding.
 * Usa Flash-Lite per la massima velocità di caricamento della pagina.
 */
export const fetchFiscalNews = async (): Promise<{ articles: JournalArticle[], source: 'live' | 'fallback' }> => {
    const apiKey = getApiKey();
    
    // Se non c'è la chiave, restituisci le notizie statiche di fallback
    if (!apiKey) {
      console.log("Using fallback news (No API Key found)");
      return { articles: NEWS_ARTICLES, source: 'fallback' };
    }

    try {
        const ai = new GoogleGenAI({ apiKey });
        
        // Per le News usiamo Flash Lite: è velocissimo e perfetto per estrarre dati semplici come le notizie
        // senza bisogno di ragionamenti complessi.
        const model = 'gemini-2.5-flash-lite-latest'; 

        const prompt = `
        Cerca le ultimissime notizie di OGGI o IERI in Italia riguardanti:
        1. Agenzia delle Entrate / Fisco
        2. INPS / Pensioni
        3. Lavoro / Bonus
        
        Trovami 3 notizie RILEVANTI.
        
        IMPORTANTE: Restituisci SOLO un array JSON valido. NON usare blocchi markdown. NON scrivere "Ecco il json".
        Formato:
        [
            {
                "title": "Titolo",
                "excerpt": "Riassunto breve",
                "category": "Fisco" | "INPS" | "Lavoro",
                "date": "Data (es. Oggi, 2 ore fa)",
                "url": "Link (opzionale)"
            }
        ]
        `;

        const result = await ai.models.generateContent({
            model: model,
            contents: prompt,
            config: {
                tools: [{ googleSearch: {} }],
                responseMimeType: "application/json"
            }
        });

        let text = result.text;
        if (!text) throw new Error("Risposta vuota da Gemini");

        // PULIZIA JSON ROBUSTA: Rimuove markdown ```json e ``` se presenti
        text = text.replace(/```json/g, '').replace(/```/g, '').trim();

        const parsedNews = JSON.parse(text);
        
        const categoryImages: {[key: string]: string} = {
            'Fisco': 'https://images.unsplash.com/photo-1554224155-8d04cb21cd6c?auto=format&fit=crop&q=80&w=800',
            'INPS': 'https://images.unsplash.com/photo-1556742049-0cfed4f7a07d?auto=format&fit=crop&q=80&w=800',
            'Lavoro': 'https://images.unsplash.com/photo-1521791136064-7986c2920216?auto=format&fit=crop&q=80&w=800',
            'Famiglia': 'https://images.unsplash.com/photo-1633158829585-23ba8f7c8caf?auto=format&fit=crop&q=80&w=800'
        };

        const finalNews: JournalArticle[] = parsedNews.map((n: any, idx: number) => {
             // Tenta di recuperare l'URL dal grounding se manca nel JSON
             let sourceUrl = n.url;
             if (!sourceUrl && result.candidates?.[0]?.groundingMetadata?.groundingChunks) {
                 const chunks = result.candidates[0].groundingMetadata.groundingChunks;
                 if(chunks[idx]?.web?.uri) sourceUrl = chunks[idx].web.uri;
             }

             return {
                id: `live-${Date.now()}-${idx}`,
                title: n.title,
                excerpt: n.excerpt,
                content: n.excerpt,
                date: n.date,
                category: n.category || 'Notizie',
                image: categoryImages[n.category] || categoryImages['Fisco'],
                url: sourceUrl
             };
        });

        return { articles: finalNews.length > 0 ? finalNews : NEWS_ARTICLES, source: 'live' };

    } catch (e) {
        console.error("ERRORE NEWS:", e);
        return { articles: NEWS_ARTICLES, source: 'fallback' };
    }
}
