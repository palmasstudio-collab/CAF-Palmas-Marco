/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
*/


import React, { useMemo, useState } from 'react';
import { SERVICES } from '../constants';

interface ServicesListProps {
  limit?: number;
  onViewAll?: () => void;
  onBookClick: (serviceName?: string) => void;
  onSuccessionClick?: () => void; 
}

const ServicesList: React.FC<ServicesListProps> = ({ limit, onViewAll, onBookClick }) => {
  const [activeCategory, setActiveCategory] = useState<string>('Tutti');
  
  const categories = ['Tutti', 'Fiscale', 'Previdenziale', 'Lavoro', 'Famiglia', 'Altro'];

  const displayedServices = useMemo(() => {
    let filtered = SERVICES;
    if (activeCategory !== 'Tutti') {
      filtered = SERVICES.filter(s => s.category === activeCategory);
    }
    if (limit) {
      return filtered.slice(0, limit);
    }
    return filtered;
  }, [limit, activeCategory]);

  return (
    <section id="services" className="py-24 px-6 md:px-12 bg-white">
      <div className="max-w-[1200px] mx-auto">
        
        <div className="text-center mb-16">
          <span className="text-blue-600 font-bold uppercase tracking-widest text-sm mb-4 block">I Nostri Servizi</span>
          <h2 className="text-3xl md:text-5xl font-serif text-[#1A202C] mb-6">Come possiamo aiutarti?</h2>
          <p className="text-gray-500 max-w-2xl mx-auto">Offriamo un'ampia gamma di servizi per semplificare il tuo rapporto con la burocrazia.</p>
        
          {/* Categories Filter (Only show if not in limited/home mode) */}
          {!limit && (
              <div className="flex flex-wrap justify-center gap-4 mt-10">
                  {categories.map(cat => (
                      <button
                          key={cat}
                          onClick={() => setActiveCategory(cat)}
                          className={`px-6 py-2 rounded-full text-sm font-medium transition-all ${
                              activeCategory === cat 
                              ? 'bg-[#2B6CB0] text-white shadow-md' 
                              : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
                          }`}
                      >
                          {cat}
                      </button>
                  ))}
              </div>
          )}
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {displayedServices.map((service, idx) => (
            <div 
                key={service.id} 
                className="bg-gray-50 rounded-xl p-8 border border-gray-100 hover:shadow-lg transition-shadow duration-300 flex flex-col animate-fade-in-up"
                style={{ animationDelay: `${idx * 0.05}s` }}
            >
                <div className="mb-4">
                    <span className="inline-block px-3 py-1 bg-blue-100 text-blue-700 text-xs font-bold uppercase rounded-md mb-4">
                        {service.category}
                    </span>
                    <h3 className="text-xl font-serif font-bold text-[#1A202C] mb-3">{service.title}</h3>
                    <p className="text-gray-600 font-light leading-relaxed mb-6 flex-grow">
                        {service.description}
                    </p>
                </div>
                
                <div className="mt-auto pt-6 border-t border-gray-200 space-y-3">
                    <button 
                        onClick={() => onBookClick(service.title)}
                        className="w-full py-3 border font-semibold rounded-lg transition-colors flex items-center justify-center gap-2 group bg-white border-[#2B6CB0] text-[#2B6CB0] hover:bg-[#2B6CB0] hover:text-white"
                    >
                        <span>Prenota Appuntamento</span>
                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className="w-4 h-4 group-hover:translate-x-1 transition-transform">
                            <path strokeLinecap="round" strokeLinejoin="round" d="M13.5 4.5L21 12m0 0l-7.5 7.5M21 12H3" />
                        </svg>
                    </button>
                </div>
            </div>
          ))}
        </div>

        {limit && (
            <div className="mt-16 text-center">
                <button 
                    onClick={onViewAll}
                    className="inline-flex items-center gap-2 text-[#2B6CB0] font-bold uppercase tracking-widest text-sm hover:underline underline-offset-4"
                >
                    Visualizza tutti i servizi
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className="w-4 h-4">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M17.25 8.25L21 12m0 0l-3.75 3.75M21 12H3" />
                    </svg>
                </button>
            </div>
        )}

      </div>
    </section>
  );
};

export default ServicesList;