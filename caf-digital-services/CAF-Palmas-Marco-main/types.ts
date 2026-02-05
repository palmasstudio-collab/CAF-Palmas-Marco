
/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
*/

import React from 'react';

export interface Service {
  id: string;
  title: string;
  description: string;
  category: 'Fiscale' | 'Previdenziale' | 'Famiglia' | 'Lavoro' | 'Altro';
  detailedDescription?: string;
  documents?: string[];
  faqs?: { question: string; answer: string }[];
  icon: any; // React component from lucide-react
}

export interface ChatMessage {
  role: 'user' | 'model';
  text: string;
  timestamp: number;
}

export type ViewState = 
  | { type: 'home' }
  | { type: 'services' }
  | { type: 'service-detail' }
  | { type: 'documents' }
  | { type: 'about' }
  | { type: 'contact' }
  | { type: 'booking' }
  | { type: 'succession' }
  | { type: 'admin' };

export interface Product {
  id: string;
  name: string;
  price: number;
  category: string;
  imageUrl: string;
  description: string;
  longDescription?: string;
  features: string[];
}

export interface JournalArticle {
  id: string;
  title: string;
  excerpt: string;
  content: React.ReactNode;
  date: string;
  image: string;
  category?: string;
  url?: string; // Link alla fonte originale
}

export interface InstitutionalLink {
    name: string;
    url: string;
    logoUrl?: string; // Optional logo
    description: string;
}

export interface UploadSlot {
  id: string;
  label: string;
  file: File | null;
  status: 'empty' | 'uploading' | 'done' | 'error';
}
