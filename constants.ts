/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
*/

import { Service, Product, JournalArticle } from './types';

export const BOOKING_LINK = "https://Palmas-Marco-prenota.short.gy/";

// ⚠️ INCOLLA QUI IL LINK DELLA TUA WEB APP GOOGLE APPS SCRIPT DOPO AVERLA PUBBLICATA
export const SUCCESSION_LINK = "https://script.google.com/macros/s/AKfycbwPcaB1TFITZNUr-FT8WTMW18F1LN0wP9cMFXkMv27X237u2onGsL6Km4nQFj5yY0wA1Q/exec"; 

export const BRAND_NAME = 'CAF Palmas';
export const PHONE_NUMBER = '+39 012 345 6789';
export const EMAIL_ADDRESS = 'info@cafpalmas.it';
export const ADDRESS = 'Via Roma 123, 00100 Roma';

export const SERVICES: Service[] = [
  {
    id: '730',
    title: '730 – Dichiarazione dei redditi',
    description: 'Compilazione e invio del Modello 730 per lavoratori dipendenti e pensionati, con controllo detrazioni.',
    category: 'Fiscale',
    documents: ['CUD/Certificazione Unica', 'Spese mediche', 'Contratti affitto', 'Interessi mutuo']
  },
  {
    id: 'isee',
    title: 'ISEE',
    description: 'Calcolo e rilascio dell’Indicatore della Situazione Economica Equivalente per bonus e agevolazioni.',
    category: 'Fiscale',
    documents: ['Saldi e giacenze conti correnti', 'Targhe veicoli', 'Redditi', 'Dati anagrafici nucleo']
  },
  {
    id: 'auu',
    title: 'Assegno unico',
    description: 'Domanda e rinnovo di Assegno Unico e Universale per i figli, gestione variazioni e ISEE.',
    category: 'Famiglia'
  },
  {
    id: 'naspi',
    title: 'Naspi disoccupazione',
    description: 'Richiesta indennità di disoccupazione NASpI, verifica requisiti e invio telematico.',
    category: 'Lavoro'
  },
  {
    id: 'adi-sfl',
    title: 'Domanda ADI / SFL',
    description: 'Supporto per domande Assegno di Inclusione e Supporto per la Formazione e il Lavoro.',
    category: 'Fiscale'
  },
  {
    id: 'pensione',
    title: 'Domanda di pensione',
    description: 'Valutazione requisiti e invio domande di pensione (vecchiaia, anticipata, reversibilità).',
    category: 'Previdenziale'
  },
  {
    id: 'estratto',
    title: 'Verifica diritto pensione',
    description: 'Analisi posizione contributiva e simulazione temporale per l\'accesso alla pensione.',
    category: 'Previdenziale'
  },
  {
    id: 'inv-civ',
    title: 'Invalidità civile',
    description: 'Assistenza per riconoscimento invalidità, Legge 104, accompagnamento e revisioni.',
    category: 'Previdenziale'
  },
  {
    id: 'permessi-104',
    title: 'Permessi 104',
    description: 'Supporto per richieste e gestione dei permessi retribuiti ex Legge 104/1992.',
    category: 'Lavoro'
  },
  {
    id: 'soggiorno',
    title: 'Permessi di soggiorno',
    description: 'Predisposizione documentazione per rinnovo o rilascio permesso di soggiorno e ricongiungimenti.',
    category: 'Altro'
  },
  {
    id: 'cittadinanza',
    title: 'Cittadinanza',
    description: 'Supporto procedure richiesta cittadinanza italiana e caricamento documenti.',
    category: 'Altro'
  },
  {
    id: 'colf',
    title: 'Colf e badanti',
    description: 'Gestione rapporti di lavoro domestico, contratti, buste paga e contributi.',
    category: 'Lavoro'
  },
  {
    id: 'maternita',
    title: 'Maternità',
    description: 'Domande di indennità maternità/paternità, congedi obbligatori e facoltativi.',
    category: 'Famiglia'
  },
  {
    id: 'inail',
    title: 'Malattie professionali',
    description: 'Pratiche INAIL per denuncia/riconoscimento malattie professionali e infortuni.',
    category: 'Lavoro'
  },
  {
    id: 'red',
    title: 'RED',
    description: 'Compilazione e trasmissione modelli RED e dichiarazioni reddituali pensionati.',
    category: 'Fiscale'
  },
  {
    id: 'successioni',
    title: 'Successioni',
    description: 'Assistenza dichiarazioni di successione, volture catastali e imposte collegate.',
    category: 'Fiscale',
    documents: ['Certificati di morte', 'Atti proprietà immobili', 'Documenti eredi', 'Testamento se presente']
  },
  {
    id: 'doc-vari',
    title: 'Compilazione documenti',
    description: 'Supporto compilazione modulistica varia, autocertificazioni e dichiarazioni.',
    category: 'Altro'
  },
  {
    id: 'consegna',
    title: 'Consegna documenti',
    description: 'Servizio rapido di consegna o caricamento documenti per pratiche già avviate.',
    category: 'Altro'
  },
  {
    id: 'dimissioni',
    title: 'Dimissioni',
    description: 'Gestione dimissioni telematiche con procedura online e rilascio ricevute.',
    category: 'Lavoro'
  },
  {
    id: 'altro',
    title: 'Altri servizi',
    description: 'Assistenza fiscale e amministrativa per esigenze specifiche non in elenco.',
    category: 'Altro'
  }
];

export const PRODUCTS: Product[] = [
    {
        id: '1',
        name: 'Consulenza Base',
        price: 50,
        category: 'Audio', // Dummy data to satisfy type
        imageUrl: 'https://images.unsplash.com/photo-1554224155-6726b3ff858f?auto=format&fit=crop&q=80&w=800',
        description: 'Consulenza generica.',
        features: ['Supporto', 'Guida']
    }
];

export const JOURNAL_ARTICLES: JournalArticle[] = [
    {
        id: '1',
        title: 'Benvenuti',
        excerpt: 'Nuovo sito online.',
        content: 'Siamo felici di annunciare il nostro nuovo sito.',
        date: 'Oct 2023',
        image: 'https://images.unsplash.com/photo-1554224155-6726b3ff858f?auto=format&fit=crop&q=80&w=800'
    }
];