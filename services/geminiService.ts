/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
*/


import { GoogleGenAI } from "@google/genai";
import { SERVICES } from '../constants';

const getSystemInstruction = () => {
  const servicesContext = SERVICES.map(s => 
    `- ${s.title}: ${s.description}`
  ).join('\n');

  return `Sei l'Assistente Virtuale di "CAF Palmas", un centro di assistenza fiscale e previdenziale.
  Il tuo tono deve essere professionale, rassicurante, chiaro e cortese. Evita un linguaggio troppo burocratico quando possibile, spiega le cose in modo semplice.
  
  Ecco i servizi che offriamo:
  ${servicesContext}
  
  Rispondi alle domande dei clienti su quali documenti servono (in generale), a cosa servono le pratiche (ISEE, 730, ecc.) e come prenotare.
  IMPORTANTE: Per prenotare, invita sempre l'utente a cliccare sul pulsante "Prenota" presente nel sito.
  
  Sii conciso.`;
};

export const sendMessageToGemini = async (history: {role: string, text: string}[], newMessage: string): Promise<string> => {
  try {
    let apiKey = '';
    
    // Tenta di recuperare la chiave da process.env (Node/System) ignorando l'errore TS
    try {
       // @ts-ignore
       if (typeof process !== 'undefined' && process.env) {
           // @ts-ignore
           apiKey = process.env.API_KEY || '';
       }
    } catch (e) {}

    // Fallback: prova a cercare la chiave in import.meta.env (Vite standard)
    if (!apiKey) {
        try {
            // @ts-ignore
            if (typeof import.meta !== 'undefined' && import.meta.env) {
                // @ts-ignore
                apiKey = import.meta.env.VITE_API_KEY || '';
            }
        } catch (e) {}
    }
    
    if (!apiKey) {
      // Per evitare errori in build se la chiave manca, ritorniamo un messaggio cortese
      console.warn("API Key mancante.");
      return "Mi dispiace, al momento non posso connettermi al server (API Key non configurata).";
    }

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
    return result.text || "Nessuna risposta.";

  } catch (error) {
    console.error("Gemini API Error:", error);
    return "Mi scuso, ma al momento ho difficoltà a reperire le informazioni richieste.";
  }
};