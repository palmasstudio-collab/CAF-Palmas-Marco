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
  
  ISTRUZIONI IMPORTANTI:
  1. Rispondi alle domande dei clienti su quali documenti servono (in generale) e a cosa servono le pratiche.
  2. Se un utente chiede come prenotare o vuole fissare un appuntamento, rispondi che DEVE cliccare sul pulsante "Prenota" presente nel menu o nella home page. Non puoi prendere appuntamenti direttamente in chat.
  3. Sii conciso nelle risposte.
  4. Non inventare servizi che non sono in lista.`;
};

export const sendMessageToGemini = async (history: {role: string, text: string}[], newMessage: string): Promise<string> => {
  try {
    // Vite espone le variabili d'ambiente con import.meta.env
    // @ts-ignore
    const apiKey = import.meta.env.VITE_API_KEY;
    
    if (!apiKey) {
      console.warn("API Key mancante. Assicurati di aver impostato il secret GEMINI_API_KEY su GitHub.");
      return "⚠️ Configurazione incompleta: Manca la Chiave API di Google. L'amministratore deve configurarla nelle impostazioni del repository (Secrets).";
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
    return result.text || "Non ho capito, puoi ripetere?";

  } catch (error) {
    console.error("Gemini API Error:", error);
    return "Mi dispiace, si è verificato un errore di connessione. Riprova più tardi.";
  }
};