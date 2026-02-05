/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
*/

import React, { useState } from 'react';
import { BOOKING_LINK } from '../constants';

interface BookingProps {
  preselectedService?: string;
}

const Booking: React.FC<BookingProps> = ({ preselectedService }) => {
  const [isLoading, setIsLoading] = useState(true);

  // Construct URL with parameter if a service is selected
  // We assume the destination app can read 'service' or similar parameter
  // Note: Shorteners often forward params, but the destination script must handle them.
  const separator = BOOKING_LINK.includes('?') ? '&' : '?';
  const iframeSrc = preselectedService 
    ? `${BOOKING_LINK}${separator}service=${encodeURIComponent(preselectedService)}` 
    : BOOKING_LINK;

  return (
    <section className="pt-32 pb-24 px-4 md:px-8 bg-gray-50 min-h-screen">
      <div className="max-w-5xl mx-auto h-full flex flex-col">
        <div className="text-center mb-8">
            <h2 className="text-3xl md:text-4xl font-serif text-[#1A202C] mb-4">Prenota il tuo Appuntamento</h2>
            <p className="text-gray-600">
                {preselectedService 
                  ? `Hai selezionato: ${preselectedService}. Scegli data e ora qui sotto.`
                  : "Seleziona il servizio, la data e l'ora che preferisci direttamente qui sotto."}
            </p>
        </div>

        <div className="flex-1 bg-white rounded-xl shadow-xl overflow-hidden border border-gray-200 relative min-h-[700px]">
            {isLoading && (
                <div className="absolute inset-0 flex flex-col items-center justify-center bg-gray-50 z-10">
                    <div className="w-12 h-12 border-4 border-blue-200 border-t-blue-600 rounded-full animate-spin mb-4"></div>
                    <p className="text-gray-500 font-medium">Caricamento calendario...</p>
                </div>
            )}
            
            <iframe 
                src={iframeSrc}
                title="Prenotazione Appuntamento CAF"
                className="w-full h-full border-0 min-h-[700px]"
                onLoad={() => setIsLoading(false)}
                allow="camera; microphone; autoplay; encrypted-media;"
            />
        </div>

        <div className="text-center mt-6">
            <p className="text-sm text-gray-500">
                Il calendario non si carica correttamente? 
                <a 
                    href={iframeSrc} 
                    target="_blank" 
                    rel="noopener noreferrer"
                    className="text-blue-600 font-bold ml-1 hover:underline"
                >
                    Apri in una nuova finestra
                </a>
            </p>
        </div>
      </div>
    </section>
  );
};

export default Booking;