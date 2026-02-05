
/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
*/

import React from 'react';
import { SERVICES } from '../../constants';
import { Service } from '../../types';
import useOnlineStatus from '../../hooks/useOnlineStatus';

interface AdminDashboardProps {
  onLogout: () => void;
  onSelectService: (service: Service) => void;
}

const AdminDashboard: React.FC<AdminDashboardProps> = ({ onLogout, onSelectService }) => {
  const isOnline = useOnlineStatus();

  return (
    <div className="max-w-[1200px] mx-auto p-6 min-h-screen">
       <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-8 border-b border-gray-200 pb-4 gap-4">
           <div>
               <h2 className="text-3xl font-serif font-bold text-[#1A202C]">Pannello Gestione</h2>
               <p className="text-gray-500 text-sm">Seleziona un servizio per caricare o gestire i documenti.</p>
           </div>
           
           <div className="flex items-center gap-4">
               {/* Status Indicator */}
               <div className="flex flex-col items-end">
                    <div className={`flex items-center gap-2 text-sm font-medium ${isOnline ? 'text-green-600' : 'text-amber-600'}`}>
                        <div className={`w-2.5 h-2.5 rounded-full ${isOnline ? 'bg-green-500' : 'bg-amber-500'}`}></div>
                        {isOnline ? 'Online' : 'Modalità Offline'}
                    </div>
                    <span className="text-[10px] text-gray-400 uppercase tracking-wider">Storage: Locale (Temp)</span>
               </div>

               <button 
                 onClick={onLogout}
                 className="px-4 py-2 bg-red-50 text-red-600 hover:bg-red-100 rounded-lg font-medium text-sm flex items-center gap-2 transition-colors"
               >
                 <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-4 h-4">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 9V5.25A2.25 2.25 0 0013.5 3h-6a2.25 2.25 0 00-2.25 2.25v13.5A2.25 2.25 0 007.5 21h6a2.25 2.25 0 002.25-2.25V15M12 9l-3 3m0 0l3 3m-3-3h12.75" />
                 </svg>
                 Esci
               </button>
           </div>
       </div>

       {!isOnline && (
           <div className="bg-amber-50 border border-amber-200 rounded-lg p-4 mb-6 flex items-start gap-3 text-amber-800">
               <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className="w-5 h-5 mt-0.5">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M12 9v3.75m-9.303 3.376c-.866 1.5.217 3.374 1.948 3.374h14.71c1.73 0 2.813-1.874 1.948-3.374L13.949 3.378c-.866-1.5-3.032-1.5-3.898 0L2.697 16.126zM12 15.75h.007v.008H12v-.008z" />
               </svg>
               <div>
                   <p className="font-bold text-sm">Connessione Internet Assente</p>
                   <p className="text-sm opacity-90">Puoi continuare a lavorare. I file caricati saranno sincronizzati appena tornerà la connessione.</p>
               </div>
           </div>
       )}

       <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {SERVICES.map((service) => (
              <div 
                key={service.id} 
                onClick={() => onSelectService(service)}
                className="bg-white border border-gray-200 rounded-lg p-6 hover:shadow-lg hover:border-blue-300 transition-all cursor-pointer group relative overflow-hidden"
              >
                  <div className="absolute top-0 right-0 p-4 opacity-10 group-hover:opacity-100 transition-opacity">
                      <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-5 h-5 text-blue-500 transform group-hover:translate-x-1 transition-transform">
                          <path strokeLinecap="round" strokeLinejoin="round" d="M13.5 4.5L21 12m0 0l-7.5 7.5M21 12H3" />
                      </svg>
                  </div>

                  <div className="flex justify-between items-start mb-4">
                      <span className={`text-[10px] font-bold uppercase tracking-wider px-2 py-1 rounded ${
                          service.category === 'Fiscale' ? 'bg-green-100 text-green-700' :
                          service.category === 'Previdenziale' ? 'bg-orange-100 text-orange-700' :
                          'bg-gray-100 text-gray-700'
                      }`}>
                          {service.category}
                      </span>
                  </div>
                  <h3 className="text-xl font-bold text-[#1A202C] mb-2">{service.title}</h3>
                  <p className="text-sm text-gray-500 line-clamp-2 mb-4 min-h-[40px]">{service.description}</p>
                  
                  <div className="pt-4 border-t border-gray-100 flex items-center gap-2 text-xs text-gray-400 font-medium">
                      <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-4 h-4">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 14.25v-2.625a3.375 3.375 0 00-3.375-3.375h-1.5A1.125 1.125 0 0113.5 7.125v-1.5a3.375 3.375 0 00-3.375-3.375H8.25m0 12.75h7.5m-7.5 3H12M10.5 2.25H5.625c-.621 0-1.125.504-1.125 1.125v17.25c0 .621.504 1.125 1.125 1.125h12.75c.621 0 1.125-.504 1.125-1.125V11.25a9 9 0 00-9-9z" />
                      </svg>
                      {service.documents && service.documents.length > 0 ? 
                          `${service.documents.length} documenti richiesti` : 
                          'Caricamento libero'}
                  </div>
              </div>
          ))}
       </div>
    </div>
  );
};

export default AdminDashboard;
