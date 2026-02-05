/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
*/


import React from 'react';

interface AboutProps {
    condensed?: boolean;
}

const About: React.FC<AboutProps> = ({ condensed }) => {
  return (
    <section id="about" className={`bg-white ${condensed ? 'py-20' : 'py-32'} px-6 md:px-12`}>
      <div className="max-w-[1200px] mx-auto flex flex-col md:flex-row items-center gap-16">
        
        <div className="md:w-1/2">
             <div className="relative">
                <div className="absolute -top-4 -left-4 w-24 h-24 bg-blue-100 rounded-full -z-10"></div>
                <img 
                    src="https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&q=80&w=800" 
                    alt="Team CAF Palmas" 
                    className="rounded-lg shadow-xl w-full object-cover h-[400px]"
                />
             </div>
        </div>

        <div className="md:w-1/2">
          <span className="text-blue-600 font-bold uppercase tracking-widest text-sm mb-4 block">Chi Siamo</span>
          <h2 className="text-3xl md:text-5xl font-serif text-[#1A202C] mb-6 leading-tight">
            Al tuo fianco, <br/> passo dopo passo.
          </h2>
          <p className="text-lg text-gray-600 font-light leading-relaxed mb-6">
            CAF Palmas nasce con un obiettivo semplice ma fondamentale: rendere la burocrazia accessibile a tutti. Crediamo che ogni cittadino debba poter accedere ai propri diritti senza stress e senza complicazioni.
          </p>
          <p className="text-lg text-gray-600 font-light leading-relaxed mb-8">
            Il nostro team di esperti è costantemente aggiornato sulle ultime normative fiscali e previdenziali per offrirti un servizio preciso, puntuale e umano. Non siamo solo uno sportello, siamo i tuoi consulenti di fiducia.
          </p>
          
          <div className="grid grid-cols-2 gap-8 border-t border-gray-100 pt-8">
              <div>
                  <h4 className="font-bold text-xl text-[#1A202C] mb-1">Esperienza</h4>
                  <p className="text-sm text-gray-500">Anni di supporto al cittadino</p>
              </div>
              <div>
                  <h4 className="font-bold text-xl text-[#1A202C] mb-1">Professionalità</h4>
                  <p className="text-sm text-gray-500">Consulenti certificati</p>
              </div>
          </div>
        </div>

      </div>
    </section>
  );
};

export default About;
