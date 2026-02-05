import React from 'react';
import { ADDRESS } from '../constants';

const LocationSection: React.FC = () => {
  // Link diretto alla ricerca Google Maps
  const mapUrl = `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(ADDRESS)}`;

  return (
    <section className="bg-white py-16 px-6 border-t border-gray-100">
      <div className="max-w-[1000px] mx-auto text-center">
        <span className="text-blue-600 font-bold uppercase tracking-widest text-sm mb-4 block">Dove Siamo</span>
        <h2 className="text-3xl font-serif text-[#1A202C] mb-8">Vieni a trovarci in sede</h2>

        <a
          href={mapUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="group block bg-gray-50 hover:bg-blue-50 border border-gray-200 hover:border-blue-200 rounded-2xl p-8 transition-all duration-300 shadow-sm hover:shadow-md max-w-2xl mx-auto"
        >
          <div className="flex flex-col items-center gap-4">
            <div className="w-20 h-20 bg-white rounded-full flex items-center justify-center text-red-500 shadow-sm group-hover:scale-110 transition-transform border border-gray-100">
               {/* Map Pin Icon Google Style */}
               <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-10 h-10">
                 <path fillRule="evenodd" d="M11.54 22.351l.07.04.028.016a.76.76 0 00.723 0l.028-.015.071-.041a16.975 16.975 0 001.144-.742 19.58 19.58 0 002.683-2.282c1.944-1.99 3.963-4.98 3.963-8.827a8.25 8.25 0 00-16.5 0c0 3.846 2.02 6.837 3.963 8.827a19.58 19.58 0 002.682 2.282 16.975 16.975 0 001.145.742zM12 13.5a3 3 0 100-6 3 3 0 000 6z" clipRule="evenodd" />
               </svg>
            </div>

            <div>
               <h3 className="text-xl font-bold text-gray-800 mb-2 group-hover:text-blue-700">{ADDRESS}</h3>
               <div className="flex items-center justify-center gap-2 text-blue-600 font-medium text-sm">
                   <span>Clicca per aprire la mappa</span>
                   <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className="w-4 h-4 group-hover:translate-x-1 transition-transform">
                     <path strokeLinecap="round" strokeLinejoin="round" d="M13.5 4.5L21 12m0 0l-7.5 7.5M21 12H3" />
                   </svg>
               </div>
            </div>
          </div>
        </a>
      </div>
    </section>
  );
};
export default LocationSection;