
/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
*/

import { GoogleGenAI } from "@google/genai";
import { SERVICES, NEWS_ARTICLES } from '../constants';
import { JournalArticle } from '../types';

const getApiKey = () => {
  try {
    // Accesso sicuro a import.meta.env
    // @ts-ignore
    const env = import.meta && import.meta.env;
    
    if (env && env.VITE_API_KEY) {
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

  return `Sei l'Assistente Virtuale di "CAF Palmas".
  
  Ecco i servizi che offriamo:
  ${servicesContext}
  
  ISTRUZIONI:
  1. Rispondi alle domande sui documenti e servizi.
  2. Per appuntamenti, dì di usare il pulsante "Prenota".
  3. Sii conciso.`;
};

export const sendMessageToGemini = async (history: {role: string, text: string}[], newMessage: string): Promise<string> => {
  try {
    const apiKey = getApiKey();
    if (!apiKey) return "⚠️ Servizio Chat momentaneamente non disponibile (API Key mancante).";

    const ai = new GoogleGenAI({ apiKey });
    
    const chat = ai.chats.create({
      model: 'gemini-2.5-flash',
      config: {
        systemInstruction: getSystemInstruction(),
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
    return "Mi dispiace, errore di connessione con l'assistente.";
  }
};

/**
 * Cerca notizie reali usando Google Search Grounding.
 * Copre Fisco, Previdenza, Lavoro e Famiglia.
 */
export const fetchFiscalNews = async (): Promise<JournalArticle[]> => {
    const apiKey = getApiKey();
    // Se non c'è la chiave, restituisci le notizie statiche di fallback
    if (!apiKey) {
      console.log("Using fallback news (No API Key)");
      return NEWS_ARTICLES;
    }

    try {
        const ai = new GoogleGenAI({ apiKey });
        const model = 'gemini-2.5-flash';

        const prompt = `
        Cerca le ultimissime notizie di OGGI o IERI in Italia riguardanti questi temi specifici:
        1. Agenzia delle Entrate / Fisco (es. scadenze, 730, tasse)
        2. INPS / Pensioni (es. pagamenti, rivalutazioni, opzione donna)
        3. Lavoro / Bonus (es. cuneo fiscale, naspi, busta paga)
        4. Famiglia (es. assegno unico, bonus nido)

        Trovami esattamente 3 notizie RILEVANTI e DIVERSE tra loro (copri diversi argomenti se puoi).
        
        Restituisci SOLO un array JSON valido (senza markdown) con questo formato per ogni notizia:
        [
            {
                "title": "Titolo breve e accattivante",
                "excerpt": "Riassunto di 2 righe della notizia",
                "category": "Una categoria tra: Fisco, INPS, Lavoro, Famiglia",
                "date": "Oggi" o "Ieri",
                "url": "Link alla fonte originale se disponibile nel grounding (altrimenti lascia vuoto)"
            }
        ]
        `;

        const result = await ai.models.generateContent({
            model: model,
            contents: prompt,
            config: {
                tools: [{ googleSearch: {} }], // Attiva la ricerca Google Reale
                responseMimeType: "application/json"
            }
        });

        const text = result.text;
        if (!text) return NEWS_ARTICLES;

        const parsedNews = JSON.parse(text);
        
        // Mappa le categorie a immagini pertinenti
        const categoryImages: {[key: string]: string} = {
            'Fisco': 'https://images.unsplash.com/photo-1554224155-8d04cb21cd6c?auto=format&fit=crop&q=80&w=800',
            'INPS': 'https://images.unsplash.com/photo-1556742049-0cfed4f7a07d?auto=format&fit=crop&q=80&w=800',
            'Lavoro': 'https://images.unsplash.com/photo-1521791136064-7986c2920216?auto=format&fit=crop&q=80&w=800',
            'Famiglia': 'https://images.unsplash.com/photo-1633158829585-23ba8f7c8caf?auto=format&fit=crop&q=80&w=800'
        };

        // Arricchisci i dati con ID e Immagini
        const finalNews: JournalArticle[] = parsedNews.map((n: any, idx: number) => {
             // Cerca di estrarre un URL dai chunk di grounding se il modello non l'ha messo nel JSON
             let sourceUrl = n.url;
             if (!sourceUrl && result.candidates?.[0]?.groundingMetadata?.groundingChunks) {
                 const chunks = result.candidates[0].groundingMetadata.groundingChunks;
                 // Assegna un link a caso dai risultati se pertinente (euristico)
                 if(chunks[idx]?.web?.uri) sourceUrl = chunks[idx].web.uri;
             }

             return {
                id: `live-${Date.now()}-${idx}`,
                title: n.title,
                excerpt: n.excerpt,
                content: n.excerpt, // Non usato nella card
                date: n.date,
                category: n.category || 'Notizie',
                image: categoryImages[n.category] || categoryImages['Fisco'],
                url: sourceUrl
             };
        });

        return finalNews.length > 0 ? finalNews : NEWS_ARTICLES;

    } catch (e) {
        console.error("Errore recupero news:", e);
        return NEWS_ARTICLES; // Fallback
    }
}
