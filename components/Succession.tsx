
/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
*/

import React, { useState } from 'react';
import { SUCCESSION_LINK } from '../constants';

interface SuccessionProps {
    onBack?: () => void;
}

const Succession: React.FC<SuccessionProps> = ({ onBack }) => {
  const [isLoading, setIsLoading] = useState(true);
  const isPlaceholder = SUCCESSION_LINK.includes("PLACEHOLDER");

  return (
    <section className="p-4 md:p-8 bg-gray-50 min-h-screen">
      <div className="max-w-6xl mx-auto h-full flex flex-col">
        
        {/* Admin Header */}
        <div className="mb-6 flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
            <div>
                {onBack && (
                    <button 
                        onClick={onBack}
                        className="text-gray-500 hover:text-[#1A365D] flex items-center gap-1 text-sm font-semibold mb-2 transition-colors"
                    >
                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className="w-4 h-4">
                            <path strokeLinecap="round" strokeLinejoin="round" d="M10.5 19.5L3 12m0 0l7.5-7.5M3 12h18" />
                        </svg>
                        Torna alla Dashboard
                    </button>
                )}
                <h2 className="text-2xl font-serif font-bold text-[#1A202C]">Gestione Pratiche Successione</h2>
                <p className="text-gray-500 text-sm">Gestionale integrato Google Apps Script.</p>
            </div>

            <a 
                href={!isPlaceholder ? SUCCESSION_LINK : '#'} 
                target="_blank" 
                rel="noopener noreferrer"
                className="bg-[#2B6CB0] text-white px-5 py-2 rounded-lg font-semibold text-sm hover:bg-[#2C5282] transition-colors shadow-sm flex items-center gap-2"
            >
                <span>Apri a tutto schermo</span>
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className="w-4 h-4">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M13.5 6H5.25A2.25 2.25 0 003 8.25v10.5A2.25 2.25 0 005.25 21h10.5A2.25 2.25 0 0018 18.75V10.5m-10.5 6L21 3m0 0h-5.25M21 3v5.25" />
                </svg>
            </a>
        </div>

        {/* Main Content Area */}
        <div className="flex-1 bg-white rounded-xl shadow-xl overflow-hidden border border-gray-200 relative min-h-[800px]">
            {isPlaceholder ? (
                <div className="absolute inset-0 flex flex-col items-center justify-center bg-gray-100 p-8 text-center">
                    <div className="bg-white p-8 rounded-lg shadow-md max-w-lg">
                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-16 h-16 text-amber-500 mx-auto mb-4">
                            <path strokeLinecap="round" strokeLinejoin="round" d="M12 9v3.75m-9.303 3.376c-.866 1.5.217 3.374 1.948 3.374h14.71c1.73 0 2.813-1.874 1.948-3.374L13.949 3.378c-.866-1.5-3.032-1.5-3.898 0L2.697 16.126zM12 15.75h.007v.008H12v-.008z" />
                        </svg>
                        <h3 className="text-xl font-bold text-gray-800 mb-2">Applicazione non configurata</h3>
                        <p className="text-gray-600 mb-4">
                            Il link allo script Google non è stato inserito correttamente.
                        </p>
                    </div>
                </div>
            ) : (
                <>
                    {isLoading && (
                        <div className="absolute inset-0 flex flex-col items-center justify-center bg-gray-50 z-10">
                            <div className="w-12 h-12 border-4 border-blue-200 border-t-blue-600 rounded-full animate-spin mb-4"></div>
                            <p className="text-gray-500 font-medium">Caricamento portale successioni...</p>
                        </div>
                    )}
                    
                    <iframe 
                        src={SUCCESSION_LINK}
                        title="Portale Successioni CAF"
                        className="w-full h-full border-0 min-h-[800px]"
                        onLoad={() => setIsLoading(false)}
                        allow="camera; microphone; autoplay; encrypted-media;"
                    />
                </>
            )}
        </div>

        <div className="mt-4 p-4 bg-blue-50 border border-blue-100 rounded-lg text-sm text-blue-800 flex items-start gap-3">
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className="w-5 h-5 flex-shrink-0 mt-0.5">
                <path strokeLinecap="round" strokeLinejoin="round" d="M11.25 11.25l.041-.02a.75.75 0 011.063.852l-.708 2.836a.75.75 0 001.063.853l.041-.021M21 12a9 9 0 11-18 0 9 9 0 0118 0zm-9-3.75h.008v.008H12V8.25z" />
            </svg>
            <div>
                <strong>Vedi "Connessione negata"?</strong><br/>
                Assicurati di aver aggiunto <code>.setXFrameOptionsMode(HtmlService.XFrameOptionsMode.ALLOWALL)</code> nel file <strong>Code.gs</strong> su Google Script e di aver ripubblicato come <strong>Nuova Versione</strong>.
            </div>
        </div>
      </div>
    </section>
  );
};

export default Succession;
