
/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
*/

import React from 'react';
import { INSTITUTIONAL_LINKS } from '../constants';

const InstitutionalLinks: React.FC = () => {
  return (
    <section className="bg-gray-100 py-16 px-6">
      <div className="max-w-[1200px] mx-auto">
        <h3 className="text-center text-sm font-bold uppercase tracking-widest text-gray-500 mb-10">Link Utili e Istituzionali</h3>
        
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            {INSTITUTIONAL_LINKS.map((link, idx) => (
                <a 
                    key={idx} 
                    href={link.url} 
                    target="_blank" 
                    rel="noopener noreferrer"
                    className="flex flex-col items-center text-center p-6 bg-white rounded-xl shadow-sm hover:shadow-md transition-all border border-gray-200 group"
                >
                    <div className="w-16 h-16 bg-gray-50 rounded-full flex items-center justify-center mb-4 text-gray-400 group-hover:text-[#1A365D] group-hover:bg-blue-50 transition-colors">
                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-8 h-8">
                            <path strokeLinecap="round" strokeLinejoin="round" d="M12 21a9.004 9.004 0 008.716-6.747M12 21a9.004 9.004 0 01-8.716-6.747M12 21c2.485 0 4.5-4.03 4.5-9S14.485 3 12 3m0 18c-2.485 0-4.5-4.03-4.5-9S9.515 3 12 3m0 0a8.997 8.997 0 017.843 4.582M12 3a8.997 8.997 0 00-7.843 4.582m15.686 0A11.953 11.953 0 0112 10.5c-2.998 0-5.74-1.1-7.843-2.918m15.686 0A8.959 8.959 0 0121 12c0 .778-.099 1.533-.284 2.253m0 0A17.919 17.919 0 0112 16.5c-3.162 0-6.133-.815-8.716-2.247m0 0A9.015 9.015 0 013 12c0-1.605.42-3.113 1.157-4.418" />
                        </svg>
                    </div>
                    <h4 className="font-bold text-gray-800 mb-2 group-hover:text-blue-700">{link.name}</h4>
                    <p className="text-xs text-gray-500">{link.description}</p>
                </a>
            ))}
        </div>
      </div>
    </section>
  );
};

export default InstitutionalLinks;
