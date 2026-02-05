import React from 'react';

interface HeroProps {
    onBookClick: () => void;
}

const Hero: React.FC<HeroProps> = ({ onBookClick }) => {
  return (
    <section className="relative w-full h-[600px] md:h-[700px] overflow-hidden bg-gray-100">
      
      {/* Background Image - Professional Office Setting */}
      <div className="absolute inset-0 w-full h-full">
        <img 
            src="https://images.unsplash.com/photo-1554224155-6726b3ff858f?auto=format&fit=crop&q=80&w=2000" 
            alt="Ufficio consulenza professionale" 
            className="w-full h-full object-cover"
        />
        {/* Blue/Grey Overlay for Text Readability */}
        <div className="absolute inset-0 bg-[#1A365D]/80 mix-blend-multiply"></div>
      </div>

      {/* Content */}
      <div className="relative z-10 h-full flex flex-col justify-center items-center text-center px-6">
        <div className="animate-fade-in-up max-w-4xl mx-auto">
          <span className="block text-sm md:text-base font-bold uppercase tracking-[0.2em] text-blue-200 mb-6 bg-white/10 px-4 py-2 rounded-full mx-auto w-fit backdrop-blur-sm">
            CAF Palmas
          </span>
          <h1 className="text-4xl md:text-6xl lg:text-7xl font-serif font-bold text-white tracking-tight mb-8 leading-tight">
            Assistenza fiscale e previdenziale <br/>
            <span className="text-blue-200 italic font-medium">semplice e vicina a te.</span>
          </h1>
          <p className="max-w-xl mx-auto text-lg md:text-xl text-gray-200 font-light leading-relaxed mb-10">
            Supportiamo famiglie, lavoratori e pensionati in tutte le pratiche burocratiche. Dal 730 all'ISEE, siamo al tuo fianco.
          </p>
          
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <button 
                onClick={onBookClick}
                className="px-10 py-4 bg-[#2B6CB0] text-white rounded-lg text-base font-bold tracking-wide hover:bg-[#2C5282] transition-all shadow-xl hover:shadow-2xl hover:-translate-y-1"
            >
                Prenota un Appuntamento
            </button>
            <a 
                href="#services"
                onClick={(e) => {
                    e.preventDefault();
                    document.getElementById('services')?.scrollIntoView({ behavior: 'smooth' });
                }}
                className="px-10 py-4 bg-transparent border border-white text-white rounded-lg text-base font-bold tracking-wide hover:bg-white hover:text-[#1A365D] transition-all"
            >
                Scopri i Servizi
            </a>
          </div>
        </div>
      </div>

      {/* Trust Badges / Stats (Optional decoration) */}
      <div className="absolute bottom-0 w-full bg-white/5 backdrop-blur-md border-t border-white/10 py-6 hidden md:block">
          <div className="max-w-[1200px] mx-auto flex justify-center gap-16 text-white/80">
              <div className="flex items-center gap-3">
                  <svg className="w-6 h-6 text-blue-300" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>
                  <span className="text-sm font-medium tracking-wide">Servizio Certificato</span>
              </div>
              <div className="flex items-center gap-3">
                  <svg className="w-6 h-6 text-blue-300" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>
                  <span className="text-sm font-medium tracking-wide">Appuntamenti Veloci</span>
              </div>
              <div className="flex items-center gap-3">
                  <svg className="w-6 h-6 text-blue-300" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" /></svg>
                  <span className="text-sm font-medium tracking-wide">Consulenza Esperta</span>
              </div>
          </div>
      </div>
    </section>
  );
};

export default Hero;