
/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
*/

import React, { useState, useRef } from 'react';
import { Service, UploadSlot } from '../../types';
import useOnlineStatus from '../../hooks/useOnlineStatus';

interface ServiceUploadProps {
  service: Service;
  onBack: () => void;
}

const ServiceUpload: React.FC<ServiceUploadProps> = ({ service, onBack }) => {
  const isOnline = useOnlineStatus();
  const fileInputRefs = useRef<{ [key: string]: HTMLInputElement | null }>({});

  // Initialize slots based on required documents, or a generic slot if none
  const initialSlots: UploadSlot[] = (service.documents && service.documents.length > 0)
    ? service.documents.map((doc, idx) => ({ id: `doc-${idx}`, label: doc, file: null, status: 'empty' }))
    : [{ id: 'generic-1', label: 'Documento generico (PDF/Immagine)', file: null, status: 'empty' }];

  const [slots, setSlots] = useState<UploadSlot[]>(initialSlots);

  const handleFileSelect = (slotId: string, e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      const file = e.target.files[0];
      setSlots(prev => prev.map(slot => {
        if (slot.id === slotId) {
          // If offline, we mark it as done but logically it's just local
          return { ...slot, file: file, status: 'done' }; 
        }
        return slot;
      }));
    }
  };

  const handleTriggerUpload = (slotId: string) => {
    fileInputRefs.current[slotId]?.click();
  };

  const handleRemoveFile = (slotId: string) => {
      setSlots(prev => prev.map(slot => {
          if (slot.id === slotId) {
              return { ...slot, file: null, status: 'empty' };
          }
          return slot;
      }));
      // Reset input value
      if (fileInputRefs.current[slotId]) {
          fileInputRefs.current[slotId]!.value = '';
      }
  };

  const addNewGenericSlot = () => {
      const newId = `extra-${Date.now()}`;
      setSlots(prev => [...prev, { id: newId, label: 'Documento aggiuntivo', file: null, status: 'empty' }]);
  };

  return (
    <div className="max-w-[1000px] mx-auto p-6 min-h-screen">
      {/* Header */}
      <div className="mb-8">
        <button 
          onClick={onBack}
          className="text-gray-500 hover:text-[#1A365D] flex items-center gap-1 text-sm font-semibold mb-4 transition-colors"
        >
          <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className="w-4 h-4">
            <path strokeLinecap="round" strokeLinejoin="round" d="M10.5 19.5L3 12m0 0l7.5-7.5M3 12h18" />
          </svg>
          Torna alla Dashboard
        </button>
        <div className="flex justify-between items-center">
            <h2 className="text-3xl font-serif font-bold text-[#1A202C]">{service.title}</h2>
            {!isOnline && (
                <span className="bg-amber-100 text-amber-800 text-xs font-bold px-3 py-1 rounded-full animate-pulse">
                    OFFLINE MODE
                </span>
            )}
        </div>
        <p className="text-gray-500 mt-2">Caricamento documenti per la pratica.</p>
      </div>

      {/* Slots Grid */}
      <div className="space-y-4">
        {slots.map((slot) => (
          <div key={slot.id} className={`border rounded-xl p-6 flex flex-col sm:flex-row items-center justify-between gap-4 shadow-sm transition-all ${
              slot.file ? 'bg-green-50 border-green-200' : 'bg-white border-gray-200'
          }`}>
             <div className="flex items-center gap-4 w-full sm:w-auto">
                 <div className={`w-12 h-12 rounded-full flex items-center justify-center flex-shrink-0 transition-colors ${
                     slot.status === 'done' ? 'bg-green-200 text-green-700' : 'bg-blue-50 text-[#2B6CB0]'
                 }`}>
                     {slot.status === 'done' ? (
                         <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className="w-6 h-6">
                            <path strokeLinecap="round" strokeLinejoin="round" d="M4.5 12.75l6 6 9-13.5" />
                         </svg>
                     ) : (
                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
                            <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 14.25v-2.625a3.375 3.375 0 00-3.375-3.375h-1.5A1.125 1.125 0 0113.5 7.125v-1.5a3.375 3.375 0 00-3.375-3.375H8.25m0 12.75h7.5m-7.5 3H12M10.5 2.25H5.625c-.621 0-1.125.504-1.125 1.125v17.25c0 .621.504 1.125 1.125 1.125h12.75c.621 0 1.125-.504 1.125-1.125V11.25a9 9 0 00-9-9z" />
                        </svg>
                     )}
                 </div>
                 <div className="flex flex-col">
                     <span className="font-semibold text-gray-800">{slot.label}</span>
                     {slot.file ? (
                         <span className="text-sm text-green-700 font-medium flex items-center gap-1">
                             {isOnline ? 'Pronto per invio:' : 'Salvato in cache:'} {slot.file.name} 
                             <span className="text-xs opacity-75">({(slot.file.size / 1024).toFixed(1)} KB)</span>
                         </span>
                     ) : (
                         <span className="text-xs text-gray-400">Nessun file selezionato</span>
                     )}
                 </div>
             </div>

             <div className="flex gap-2 w-full sm:w-auto">
                 <input 
                    type="file" 
                    className="hidden" 
                    ref={(el) => { fileInputRefs.current[slot.id] = el; }}
                    onChange={(e) => handleFileSelect(slot.id, e)}
                 />
                 
                 {slot.file ? (
                     <button 
                        onClick={() => handleRemoveFile(slot.id)}
                        className="flex-1 sm:flex-none px-4 py-2 border border-red-200 text-red-500 rounded-lg hover:bg-red-50 text-sm font-medium transition-colors"
                     >
                        Rimuovi
                     </button>
                 ) : (
                    <button 
                        onClick={() => handleTriggerUpload(slot.id)}
                        className="flex-1 sm:flex-none px-6 py-2 bg-[#2B6CB0] text-white rounded-lg hover:bg-[#2C5282] text-sm font-medium transition-colors shadow-sm"
                    >
                        Carica File
                    </button>
                 )}
             </div>
          </div>
        ))}
        
        {/* Add generic slot button */}
        <button 
            onClick={addNewGenericSlot}
            className="w-full py-4 border-2 border-dashed border-gray-300 rounded-xl text-gray-500 hover:border-[#2B6CB0] hover:text-[#2B6CB0] hover:bg-blue-50/50 transition-all flex items-center justify-center gap-2 font-medium group"
        >
            <div className="w-8 h-8 rounded-full bg-gray-100 group-hover:bg-blue-100 flex items-center justify-center transition-colors">
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className="w-4 h-4">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M12 4.5v15m7.5-7.5h-15" />
                </svg>
            </div>
            Aggiungi altro documento
        </button>
      </div>

      <div className="mt-12 bg-blue-50 border border-blue-100 p-6 rounded-lg">
          <div className="flex items-start gap-3">
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className="w-6 h-6 text-blue-600 mt-1">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M11.25 11.25l.041-.02a.75.75 0 011.063.852l-.708 2.836a.75.75 0 001.063.853l.041-.021M21 12a9 9 0 11-18 0 9 9 0 0118 0zm-9-3.75h.008v.008H12V8.25z" />
              </svg>
              <div>
                <h4 className="font-bold text-[#1A365D] mb-1">Archiviazione su Hosting Statico</h4>
                <p className="text-sm text-gray-700 leading-relaxed">
                    Stai utilizzando la versione Web del gestionale. I file caricati qui rimangono nella <strong>memoria del browser</strong> finché non chiudi la scheda.
                    <br/>
                    Per salvare permanentemente le pratiche, in futuro collegheremo questo pannello ad un Cloud Storage (es. Google Drive o AWS).
                </p>
              </div>
          </div>
      </div>
    </div>
  );
};

export default ServiceUpload;
