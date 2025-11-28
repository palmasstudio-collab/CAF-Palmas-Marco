/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
*/


import React from 'react';
import { PHONE_NUMBER, EMAIL_ADDRESS, ADDRESS } from '../constants';

interface ContactProps {
    fullPage?: boolean;
}

const Contact: React.FC<ContactProps> = ({ fullPage }) => {
  return (
    <section id="contact" className={`${fullPage ? 'py-32' : 'py-24'} px-6 bg-gray-50`}>
      <div className="max-w-[1200px] mx-auto">
        <div className="text-center mb-16">
            <span className="text-blue-600 font-bold uppercase tracking-widest text-sm mb-4 block">Contatti</span>
            <h2 className="text-3xl md:text-5xl font-serif text-[#1A202C]">Parla con noi</h2>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 bg-white rounded-2xl shadow-xl overflow-hidden">
            
            {/* Left: Info & Map */}
            <div className="bg-[#1A365D] text-white p-12 flex flex-col justify-between">
                <div>
                    <h3 className="text-2xl font-serif mb-8">Informazioni di contatto</h3>
                    <div className="space-y-6">
                        <div className="flex items-start gap-4">
                            <svg className="w-6 h-6 text-blue-300 mt-1" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" /><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" /></svg>
                            <div>
                                <p className="font-semibold text-lg">Sede Principale</p>
                                <p className="text-blue-200 font-light">{ADDRESS}</p>
                            </div>
                        </div>
                        <div className="flex items-start gap-4">
                            <svg className="w-6 h-6 text-blue-300 mt-1" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" /></svg>
                            <div>
                                <p className="font-semibold text-lg">Telefono</p>
                                <p className="text-blue-200 font-light">{PHONE_NUMBER}</p>
                            </div>
                        </div>
                        <div className="flex items-start gap-4">
                            <svg className="w-6 h-6 text-blue-300 mt-1" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" /></svg>
                            <div>
                                <p className="font-semibold text-lg">Email</p>
                                <p className="text-blue-200 font-light">{EMAIL_ADDRESS}</p>
                            </div>
                        </div>
                    </div>
                </div>

                <div className="mt-12 pt-8 border-t border-white/20">
                    <p className="font-bold mb-4">Orari di Apertura</p>
                    <div className="flex justify-between text-sm text-blue-200 mb-2">
                        <span>Lun - Ven</span>
                        <span>09:00 - 13:00 / 15:00 - 18:00</span>
                    </div>
                    <div className="flex justify-between text-sm text-blue-200">
                        <span>Sab - Dom</span>
                        <span>Chiuso</span>
                    </div>
                </div>
            </div>

            {/* Right: Form */}
            <div className="p-12 bg-white">
                <h3 className="text-2xl font-serif text-[#1A202C] mb-6">Inviaci un messaggio</h3>
                <form className="space-y-6" onSubmit={(e) => e.preventDefault()}>
                    <div className="space-y-1">
                        <label className="text-sm font-semibold text-gray-600">Nome e Cognome</label>
                        <input type="text" className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-lg focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500 transition-all" placeholder="Mario Rossi" />
                    </div>
                    
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <div className="space-y-1">
                            <label className="text-sm font-semibold text-gray-600">Email</label>
                            <input type="email" className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-lg focus:outline-none focus:border-blue-500 transition-all" placeholder="mario@email.com" />
                        </div>
                        <div className="space-y-1">
                            <label className="text-sm font-semibold text-gray-600">Telefono</label>
                            <input type="tel" className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-lg focus:outline-none focus:border-blue-500 transition-all" placeholder="+39 333..." />
                        </div>
                    </div>

                    <div className="space-y-1">
                        <label className="text-sm font-semibold text-gray-600">Messaggio</label>
                        <textarea className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-lg focus:outline-none focus:border-blue-500 h-32 resize-none transition-all" placeholder="Come possiamo aiutarti?"></textarea>
                    </div>

                    <button className="w-full py-4 bg-[#2B6CB0] text-white font-bold rounded-lg hover:bg-[#2C5282] transition-colors shadow-lg">
                        Invia Messaggio
                    </button>
                </form>
            </div>
        </div>
      </div>
    </section>
  );
};

export default Contact;
