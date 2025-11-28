


/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
*/

import { Service, Product, JournalArticle, InstitutionalLink } from './types';
import { 
  FileText, 
  Calculator, 
  Baby, 
  Briefcase, 
  Wallet, 
  Scroll, 
  Search, 
  Accessibility, 
  Clock, 
  Globe, 
  Flag, 
  Home, 
  Heart, 
  HardHat, 
  FileBarChart, 
  Scale, 
  Files, 
  Send, 
  LogOut, 
  HelpCircle 
} from 'lucide-react';

export const BOOKING_LINK = "https://Palmas-Marco-prenota.short.gy/";

// ⚠️ INCOLLA QUI IL LINK DELLA TUA WEB APP GOOGLE APPS SCRIPT DOPO AVERLA PUBBLICATA
export const SUCCESSION_LINK = "https://script.google.com/macros/s/AKfycbwPcaB1TFITZNUr-FT8WTMW18F1LN0wP9cMFXkMv27X237u2onGsL6Km4nQFj5yY0wA1Q/exec"; 

export const BRAND_NAME = 'CAF Palmas';
export const PHONE_NUMBER = ''; // Rimosso su richiesta
export const EMAIL_ADDRESS = ''; // Rimosso su richiesta
export const ADDRESS = 'Via Sardegna 16, 08048 Tortolì (NU)';

export const INSTITUTIONAL_LINKS: InstitutionalLink[] = [
    {
        name: "Agenzia delle Entrate",
        url: "https://www.agenziaentrate.gov.it/",
        description: "Portale ufficiale per verifiche fiscali, cassetto fiscale e normative.",
    },
    {
        name: "INPS",
        url: "https://www.inps.it/",
        description: "Istituto Nazionale Previdenza Sociale: pensioni, naspi, bonus.",
    },
    {
        name: "INAIL",
        url: "https://www.inail.it/",
        description: "Istituto Nazionale per l'Assicurazione contro gli Infortuni sul Lavoro.",
    },
    {
        name: "Ministero del Lavoro",
        url: "https://www.lavoro.gov.it/",
        description: "Normative sul lavoro, contratti e politiche sociali.",
    }
];

export const NEWS_ARTICLES: JournalArticle[] = [];


export const SERVICES: Service[] = [
  {
    id: '730',
    title: '730 – Dichiarazione dei redditi',
    description: 'Compilazione e invio del Modello 730 per lavoratori dipendenti e pensionati, con controllo detrazioni.',
    detailedDescription: 'Il Modello 730 è la dichiarazione dei redditi dedicata ai lavoratori dipendenti e pensionati. Il CAF Palmas si occupa dell\'intera procedura: dalla raccolta e verifica dei documenti, al calcolo delle imposte dovute o del rimborso spettante, fino all\'invio telematico all\'Agenzia delle Entrate. Verifichiamo attentamente tutte le spese detraibili (mediche, ristrutturazioni, interessi mutuo, ecc.) per garantirti il massimo risparmio fiscale.',
    category: 'Fiscale',
    documents: ['CUD/Certificazione Unica', 'Scontrini farmaci e spese mediche', 'Contratto di affitto (se detraibile)', 'Interessi passivi mutuo', 'Assicurazioni vita/infortuni'],
    faqs: [
        { question: 'Quando scade il 730?', answer: 'La scadenza ordinaria è solitamente il 30 settembre di ogni anno.' },
        { question: 'Posso presentare il 730 senza sostituto d\'imposta?', answer: 'Sì, se non hai un datore di lavoro al momento della presentazione, puoi presentare il 730 senza sostituto e ricevere l\'eventuale rimborso direttamente dall\'Agenzia delle Entrate.' }
    ],
    icon: FileText
  },
  {
    id: 'isee',
    title: 'ISEE',
    description: 'Calcolo e rilascio dell’Indicatore della Situazione Economica Equivalente per bonus e agevolazioni.',
    detailedDescription: 'L\'ISEE (Indicatore della Situazione Economica Equivalente) è lo strumento indispensabile per accedere a numerose prestazioni sociali agevolate o servizi di pubblica utilità. Il nostro servizio comprende la compilazione della DSU (Dichiarazione Sostitutiva Unica) e il rilascio dell\'attestazione ISEE in tempi brevi.',
    category: 'Fiscale',
    documents: ['Saldi e giacenze medie conti correnti al 31/12 (di due anni fa)', 'Targhe veicoli posseduti', 'Redditi (CUD/730) di tutti i componenti', 'Codici fiscali di tutto il nucleo familiare', 'Contratto affitto registrato (se in affitto)'],
    faqs: [
        { question: 'Quale anno di redditi serve?', answer: 'Per l\'ISEE si utilizzano i redditi e i patrimoni del secondo anno solare precedente (es. per ISEE 2024 servono dati 2022).' },
        { question: 'Quanto tempo ci vuole?', answer: 'Solitamente l\'INPS rilascia l\'attestazione entro 4-7 giorni lavorativi dalla trasmissione della DSU.' }
    ],
    icon: Calculator
  },
  {
    id: 'auu',
    title: 'Assegno unico',
    description: 'Domanda e rinnovo di Assegno Unico e Universale per i figli, gestione variazioni e ISEE.',
    category: 'Famiglia',
    documents: ['ISEE in corso di validità', 'Codici fiscali dei figli', 'IBAN del richiedente', 'Verbale invalidità (se presente)'],
    detailedDescription: 'Supportiamo le famiglie nella richiesta dell\'Assegno Unico e Universale per ogni figlio a carico fino ai 21 anni e senza limiti di età per figli disabili. Gestiamo nuove domande, rinnovi annuali (con aggiornamento ISEE obbligatorio) e comunicazioni di variazione (nascita nuovi figli, cambio IBAN, variazioni nucleo).',
    icon: Baby
  },
  {
    id: 'naspi',
    title: 'Naspi disoccupazione',
    description: 'Richiesta indennità di disoccupazione NASpI, verifica requisiti e invio telematico.',
    category: 'Lavoro',
    detailedDescription: 'Se hai perso involontariamente il lavoro, ti assistiamo nella richiesta della NASpI (Nuova Assicurazione Sociale per l\'Impiego). Verifichiamo i tuoi requisiti contributivi (almeno 13 settimane negli ultimi 4 anni) e lavorativi (30 giorni nell\'ultimo anno) e inoltriamo la domanda all\'INPS per te.',
    documents: ['Lettera di licenziamento o fine contratto', 'Ultima busta paga', 'Contratto di lavoro', 'Documento d\'identità', 'IBAN'],
    icon: Briefcase
  },
  {
    id: 'adi-sfl',
    title: 'Domanda ADI / SFL',
    description: 'Supporto per domande Assegno di Inclusione e Supporto per la Formazione e il Lavoro.',
    category: 'Fiscale',
    detailedDescription: 'Ti guidiamo nelle nuove misure di contrasto alla povertà: l\'Assegno di Inclusione (ADI) per nuclei con minori, disabili o over-60, e il Supporto per la Formazione e il Lavoro (SFL) per gli occupabili. Verifichiamo i requisiti economici e patrimoniali e inviamo la richiesta telematica.',
    icon: Wallet
  },
  {
    id: 'pensione',
    title: 'Domanda di pensione',
    description: 'Valutazione requisiti e invio domande di pensione (vecchiaia, anticipata, reversibilità).',
    category: 'Previdenziale',
    detailedDescription: 'Analizziamo la tua storia lavorativa per individuare il momento migliore per andare in pensione. Gestiamo pratiche di Pensione di Vecchiaia, Anticipata, Opzione Donna, Quota 103 e Reversibilità per i superstiti.',
    icon: Scroll
  },
  {
    id: 'estratto',
    title: 'Verifica diritto pensione',
    description: 'Analisi posizione contributiva e simulazione temporale per l\'accesso alla pensione.',
    category: 'Previdenziale',
    detailedDescription: 'Attraverso l\'estratto conto contributivo, ricostruiamo la tua carriera lavorativa per verificare quanti contributi hai versato e quanto manca alla pensione. Utile anche per segnalare eventuali periodi mancanti o errati all\'INPS.',
    icon: Search
  },
  {
    id: 'inv-civ',
    title: 'Invalidità civile',
    description: 'Assistenza per riconoscimento invalidità, Legge 104, accompagnamento e revisioni.',
    category: 'Previdenziale',
    documents: ['Certificato medico introduttivo (codice telematico)', 'Documento identità', 'IBAN (per indennità)'],
    detailedDescription: 'Ti assistiamo nell\'iter per il riconoscimento dell\'invalidità civile, cecità, sordità, handicap (Legge 104/92) e disabilità. Ci occupiamo dell\'invio amministrativo della domanda all\'INPS dopo il rilascio del certificato medico.',
    icon: Accessibility
  },
  {
    id: 'permessi-104',
    title: 'Permessi 104',
    description: 'Supporto per richieste e gestione dei permessi retribuiti ex Legge 104/1992.',
    category: 'Lavoro',
    detailedDescription: 'Assistenza per la richiesta dei permessi retribuiti (3 giorni al mese) per lavoratori dipendenti che assistono familiari con disabilità grave accertata (art. 3 comma 3 Legge 104/92).',
    icon: Clock
  },
  {
    id: 'soggiorno',
    title: 'Permessi di soggiorno',
    description: 'Predisposizione documentazione per rinnovo o rilascio permesso di soggiorno e ricongiungimenti.',
    category: 'Altro',
    icon: Globe
  },
  {
    id: 'cittadinanza',
    title: 'Cittadinanza',
    description: 'Supporto procedure richiesta cittadinanza italiana e caricamento documenti.',
    category: 'Altro',
    icon: Flag
  },
  {
    id: 'colf',
    title: 'Colf e badanti',
    description: 'Gestione rapporti di lavoro domestico, contratti, buste paga e contributi.',
    category: 'Lavoro',
    icon: Home
  },
  {
    id: 'maternita',
    title: 'Maternità',
    description: 'Domande di indennità maternità/paternità, congedi obbligatori e facoltativi.',
    category: 'Famiglia',
    icon: Heart
  },
  {
    id: 'inail',
    title: 'Malattie professionali',
    description: 'Pratiche INAIL per denuncia/riconoscimento malattie professionali e infortuni.',
    category: 'Lavoro',
    icon: HardHat
  },
  {
    id: 'red',
    title: 'RED',
    description: 'Compilazione e trasmissione modelli RED e dichiarazioni reddituali pensionati.',
    category: 'Fiscale',
    icon: FileBarChart
  },
  {
    id: 'successioni',
    title: 'Successioni',
    description: 'Assistenza dichiarazioni di successione, volture catastali e imposte collegate.',
    category: 'Fiscale',
    documents: ['Certificato di morte', 'Stato di famiglia decuius ed eredi', 'Atti di proprietà immobili', 'Documenti bancari (saldi alla data morte)', 'Codici fiscali eredi'],
    detailedDescription: 'Gestiamo l\'intera pratica di successione ereditaria: dalla compilazione della dichiarazione fiscale all\'Agenzia delle Entrate, al calcolo delle imposte ipotecarie e catastali, fino alla voltura degli immobili. Ti supportiamo nella raccolta di tutta la documentazione necessaria.',
    icon: Scale
  },
  {
    id: 'doc-vari',
    title: 'Compilazione documenti',
    description: 'Supporto compilazione modulistica varia, autocertificazioni e dichiarazioni.',
    category: 'Altro',
    icon: Files
  },
  {
    id: 'consegna',
    title: 'Consegna documenti',
    description: 'Servizio rapido di consegna o caricamento documenti per pratiche già avviate.',
    category: 'Altro',
    icon: Send
  },
  {
    id: 'dimissioni',
    title: 'Dimissioni',
    description: 'Gestione dimissioni telematiche con procedura online e rilascio ricevute.',
    category: 'Lavoro',
    icon: LogOut
  },
  {
    id: 'altro',
    title: 'Altri servizi',
    description: 'Assistenza fiscale e amministrativa per esigenze specifiche non in elenco.',
    category: 'Altro',
    icon: HelpCircle
  }
];

export const PRODUCTS: Product[] = [];

export const JOURNAL_ARTICLES: JournalArticle[] = [];