
/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
*/

import React, { useEffect } from 'react';
import { Service } from '../types';

interface ServiceDetailProps {
  service: Service;
  onBack: () => void;
  onBook: () => void;
}

const ServiceDetail: React.FC<ServiceDetailProps> = ({ service, onBack, onBook }) => {
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }, [service]);

  const Icon = service.icon;

  return (
    <div className="min-h-screen bg-white animate-fade-in-up pt-10 pb-20 px-4 md:px-8">
      <div className="max-w-[1000px] mx-auto">
        
        {/* Navigation */}
        <button 
          onClick={onBack}
          className="group flex items-center gap-2 text-sm font-semibold text-gray-500 hover:text-[#1A365D] transition-colors mb-8"
        >
          <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className="w-4 h-4 group-hover:-translate-x-1 transition-transform">
            <path strokeLinecap="round" strokeLinejoin="round" d="M10.5 19.5L3 12m0 0l7.5-7.5M3 12h18" />
          </svg>
          Torna ai Servizi
        </button>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
          
          {/* Main Content */}
          <div className="lg:col-span-2 space-y-8">
            <div>
              <div className="flex items-center gap-4 mb-6">
                  <div className="w-16 h-16 bg-blue-50 rounded-2xl flex items-center justify-center text-[#2B6CB0]">
                      <Icon size={32} />
                  </div>
                  <div>
                    <span className="inline-block px-3 py-1 bg-blue-100 text-blue-700 text-xs font-bold uppercase rounded-md mb-2">
                        {service.category}
                    </span>
                    <h1 className="text-3xl md:text-4xl font-serif font-bold text-[#1A202C] leading-tight">
                        {service.title}
                    </h1>
                  </div>
              </div>
              
              <p className="text-lg text-gray-600 font-light leading-relaxed">
                {service.detailedDescription || service.description}
              </p>
            </div>

            {/* Documents Section */}
            <div className="bg-gray-50 rounded-xl p-8 border border-gray-100">
              <h3 className="text-xl font-bold text-[#1A202C] mb-6 flex items-center gap-2">
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6 text-blue-600">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 14.25v-2.625a3.375 3.375 0 00-3.375-3.375h-1.5A1.125 1.125 0 0113.5 7.125v-1.5a3.375 3.375 0 00-3.375-3.375H8.25m0 12.75h7.5m-7.5 3H12M10.5 2.25H5.625c-.621 0-1.125.504-1.125 1.125v17.25c0 .621.504 1.125 1.125 1.125h12.75c.621 0 1.125-.504 1.125-1.125V11.25a9 9 0 00-9-9z" />
                </svg>
                Documenti Necessari
              </h3>
              
              {service.documents && service.documents.length > 0 ? (
                <ul className="space-y-4">
                  {service.documents.map((doc, idx) => (
                    <li key={idx} className="flex items-start gap-3 bg-white p-4 rounded-lg border border-gray-200 shadow-sm">
                      <div className="w-6 h-6 rounded-full bg-green-100 flex items-center justify-center flex-shrink-0 mt-0.5">
                        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" className="w-4 h-4 text-green-600">
                          <path fillRule="evenodd" d="M16.704 4.153a.75.75 0 01.143 1.052l-8 10.5a.75.75 0 01-1.127.075l-4.5-4.5a.75.75 0 011.06-1.06l3.894 3.893 7.48-9.817a.75.75 0 011.05-.143z" clipRule="evenodd" />
                        </svg>
                      </div>
                      <span className="text-gray-700 font-medium">{doc}</span>
                    </li>
                  ))}
                </ul>
              ) : (
                <p className="text-gray-500 italic">
                  Contattaci per conoscere la lista specifica dei documenti per questo servizio.
                </p>
              )}
            </div>

            {/* FAQs */}
            {service.faqs && service.faqs.length > 0 && (
               <div className="pt-8 border-t border-gray-200">
                 <h3 className="text-2xl font-serif font-bold text-[#1A202C] mb-6">Domande Frequenti</h3>
                 <div className="space-y-4">
                   {service.faqs.map((faq, idx) => (
                     <div key={idx} className="bg-white border border-gray-200 rounded-lg p-6">
                       <h4 className="font-bold text-gray-800 mb-2">{faq.question}</h4>
                       <p className="text-gray-600 text-sm leading-relaxed">{faq.answer}</p>
                     </div>
                   ))}
                 </div>
               </div>
            )}
          </div>

          {/* Sidebar / CTA */}
          <div className="lg:col-span-1">
            <div className="sticky top-24 bg-white rounded-xl shadow-xl border border-blue-100 p-8">
              <h3 className="text-xl font-bold text-[#1A202C] mb-4">Prenota questo servizio</h3>
              <p className="text-sm text-gray-500 mb-6">
                Scegli la sede, il giorno e l'orario che preferisci. Riceverai una conferma immediata.
              </p>
              
              <button 
                onClick={onBook}
                className="w-full py-4 bg-[#2B6CB0] text-white font-bold rounded-lg hover:bg-[#2C5282] transition-colors shadow-lg hover:shadow-xl transform hover:-translate-y-0.5 mb-4 flex items-center justify-center gap-2"
              >
                <span>Prenota Appuntamento</span>
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className="w-5 h-5">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M6.75 3v2.25M17.25 3v2.25M3 18.75V7.5a2.25 2.25 0 012.25-2.25h13.5A2.25 2.25 0 0121 7.5v11.25m-18 0h18M5.25 12h13.5h-13.5zm0 3.75h13.5h-13.5z" />
                </svg>
              </button>

              <div className="text-center">
                 <p className="text-xs text-gray-400">Hai bisogno di info veloci?</p>
                 <a href="#contact" className="text-sm text-blue-600 font-semibold hover:underline">Contattaci</a>
              </div>
            </div>
          </div>

        </div>
      </div>
    </div>
  );
};

export default ServiceDetail;
