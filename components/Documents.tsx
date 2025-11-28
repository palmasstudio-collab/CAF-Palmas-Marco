/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
*/


import React from 'react';
import { SERVICES } from '../constants';

interface DocumentsProps {
    onBookClick: () => void;
}

const Documents: React.FC<DocumentsProps> = ({ onBookClick }) => {
  // Filter services that have a specific documents list
  const servicesWithDocs = SERVICES.filter(s => s.documents && s.documents.length > 0);

  return (
    <section className="py-24 px-6 bg-gray-50 min-h-screen">
      <div className="max-w-[1000px] mx-auto">
        <div className="mb-16">
            <h2 className="text-3xl md:text-5xl font-serif text-[#1A202C] mb-6">Documenti Necessari</h2>
            <p className="text-gray-600 text-lg">
                Per rendere il tuo appuntamento più efficiente, ti consigliamo di preparare la documentazione necessaria prima di venire in sede.
            </p>
        </div>

        <div className="space-y-12">
            {servicesWithDocs.map((service) => (
                <div key={service.id} className="bg-white p-8 rounded-xl shadow-sm border border-gray-200">
                    <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-6">
                        <h3 className="text-2xl font-serif font-bold text-[#2B6CB0]">{service.title}</h3>
                        <button 
                            onClick={onBookClick}
                            className="mt-4 md:mt-0 text-sm font-semibold bg-gray-100 text-gray-700 px-4 py-2 rounded-lg hover:bg-gray-200 transition-colors"
                        >
                            Prenota ora
                        </button>
                    </div>
                    
                    <ul className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        {service.documents?.map((doc, idx) => (
                            <li key={idx} className="flex items-start gap-3 text-gray-600">
                                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className="w-5 h-5 text-green-500 mt-0.5 flex-shrink-0">
                                    <path strokeLinecap="round" strokeLinejoin="round" d="M9 12.75L11.25 15 15 9.75M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                                </svg>
                                <span>{doc}</span>
                            </li>
                        ))}
                    </ul>
                </div>
            ))}

            <div className="bg-blue-50 p-8 rounded-xl border border-blue-100 text-center">
                <h3 className="text-xl font-bold text-[#1A202C] mb-3">Hai dubbi sui documenti?</h3>
                <p className="text-gray-600 mb-6">Non preoccuparti, contattaci e ti forniremo la lista completa personalizzata per la tua situazione.</p>
                <a href="#contact" className="text-blue-600 font-bold underline underline-offset-4">Contattaci</a>
            </div>
        </div>
      </div>
    </section>
  );
};

export default Documents;