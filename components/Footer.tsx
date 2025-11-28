
/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
*/


import React from 'react';
import { ViewState } from '../types';
import { BRAND_NAME, ADDRESS, EMAIL_ADDRESS, PHONE_NUMBER } from '../constants';

interface FooterProps {
  onLinkClick: (e: React.MouseEvent<HTMLAnchorElement>, targetView: ViewState['type'], elementId?: string) => void;
}

const Footer: React.FC<FooterProps> = ({ onLinkClick }) => {
  return (
    <footer className="bg-[#1A202C] pt-20 pb-10 px-6 text-gray-400">
      <div className="max-w-[1200px] mx-auto grid grid-cols-1 md:grid-cols-4 gap-12 mb-16">
        
        <div className="col-span-1 md:col-span-1">
          <h4 className="text-2xl font-serif text-white mb-6">{BRAND_NAME}</h4>
          <p className="text-sm leading-relaxed mb-6">
            Il tuo punto di riferimento per l'assistenza fiscale e previdenziale. Professionalità e cortesia al servizio del cittadino.
          </p>
          <div className="flex gap-4">
              {/* Social placeholders */}
              <div className="w-10 h-10 bg-white/10 rounded-full flex items-center justify-center hover:bg-blue-600 transition-colors cursor-pointer">
                 <span className="font-bold text-white">f</span>
              </div>
              <div className="w-10 h-10 bg-white/10 rounded-full flex items-center justify-center hover:bg-blue-400 transition-colors cursor-pointer">
                 <span className="font-bold text-white">in</span>
              </div>
          </div>
        </div>

        <div>
          <h4 className="font-bold text-white mb-6 tracking-wide text-sm uppercase">Navigazione</h4>
          <ul className="space-y-3 text-sm">
            <li><a href="#home" onClick={(e) => onLinkClick(e, 'home')} className="hover:text-blue-400 transition-colors">Home</a></li>
            <li><a href="#services" onClick={(e) => onLinkClick(e, 'services')} className="hover:text-blue-400 transition-colors">Tutti i Servizi</a></li>
            <li><a href="#documents" onClick={(e) => onLinkClick(e, 'documents')} className="hover:text-blue-400 transition-colors">Documenti Necessari</a></li>
            <li><a href="#about" onClick={(e) => onLinkClick(e, 'about')} className="hover:text-blue-400 transition-colors">Chi Siamo</a></li>
            <li><a href="#contact" onClick={(e) => onLinkClick(e, 'contact')} className="hover:text-blue-400 transition-colors">Contatti</a></li>
          </ul>
        </div>
        
        <div>
          <h4 className="font-bold text-white mb-6 tracking-wide text-sm uppercase">Servizi Popolari</h4>
          <ul className="space-y-3 text-sm">
            <li><a href="#" className="hover:text-blue-400 transition-colors">Modello 730</a></li>
            <li><a href="#" className="hover:text-blue-400 transition-colors">ISEE</a></li>
            <li><a href="#" className="hover:text-blue-400 transition-colors">Assegno Unico</a></li>
            <li><a href="#" className="hover:text-blue-400 transition-colors">Domande Pensione</a></li>
            <li><a href="#" className="hover:text-blue-400 transition-colors">Successioni</a></li>
          </ul>
        </div>

        <div>
          <h4 className="font-bold text-white mb-6 tracking-wide text-sm uppercase">Contattaci</h4>
          <ul className="space-y-4 text-sm">
            <li className="flex items-start gap-3">
                <svg className="w-5 h-5 text-blue-500 mt-0.5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" /><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" /></svg>
                <span>{ADDRESS}</span>
            </li>
            <li className="flex items-center gap-3">
                <svg className="w-5 h-5 text-blue-500" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" /></svg>
                <span>{PHONE_NUMBER}</span>
            </li>
            <li className="flex items-center gap-3">
                <svg className="w-5 h-5 text-blue-500" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" /></svg>
                <span>{EMAIL_ADDRESS}</span>
            </li>
          </ul>
        </div>
      </div>

      <div className="max-w-[1200px] mx-auto border-t border-gray-800 pt-8 flex flex-col md:flex-row justify-between items-center text-xs text-gray-500">
        <p>&copy; {new Date().getFullYear()} CAF Palmas. Tutti i diritti riservati.</p>
        <div className="flex gap-6 mt-4 md:mt-0">
            <a href="#" onClick={(e) => onLinkClick(e, 'admin')} className="hover:text-white font-medium">Login Amministratore</a>
            <a href="#" className="hover:text-white">Privacy Policy</a>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
