import React, { useState, useEffect } from 'react';
import { BRAND_NAME } from '../constants';
import { ViewState } from '../types';

interface NavbarProps {
  onNavClick: (e: React.MouseEvent, targetView: ViewState['type'], elementId?: string) => void;
  onBookClick: () => void;
}

const Navbar: React.FC<NavbarProps> = ({ onNavClick, onBookClick }) => {
  const [scrolled, setScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleLinkClick = (e: React.MouseEvent, targetView: ViewState['type'], elementId?: string) => {
    setMobileMenuOpen(false);
    onNavClick(e, targetView, elementId);
  };

  return (
    <>
      <nav 
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ease-in-out border-b border-gray-200/10 ${
          scrolled || mobileMenuOpen ? 'bg-white shadow-md py-3' : 'bg-white py-5 shadow-sm'
        }`}
      >
        <div className="max-w-[1200px] mx-auto px-6 flex items-center justify-between">
          {/* Logo */}
          <a 
            href="#" 
            onClick={(e) => handleLinkClick(e, 'home')}
            className="text-2xl font-serif font-bold tracking-tight text-[#1A365D] flex items-center gap-2"
          >
            {/* Simple icon or logo placeholder */}
            <div className="w-8 h-8 bg-[#2B6CB0] rounded-lg flex items-center justify-center text-white font-sans font-bold text-lg">
                P
            </div>
            {BRAND_NAME}
          </a>
          
          {/* Center Links - Desktop */}
          <div className="hidden md:flex items-center gap-8 text-sm font-medium tracking-wide text-gray-600">
            <a href="#home" onClick={(e) => handleLinkClick(e, 'home')} className="hover:text-[#2B6CB0] transition-colors">Home</a>
            <a href="#services" onClick={(e) => handleLinkClick(e, 'services')} className="hover:text-[#2B6CB0] transition-colors">Servizi</a>
            <a href="#documents" onClick={(e) => handleLinkClick(e, 'documents')} className="hover:text-[#2B6CB0] transition-colors">Documenti</a>
            <a href="#about" onClick={(e) => handleLinkClick(e, 'about')} className="hover:text-[#2B6CB0] transition-colors">Chi Siamo</a>
          </div>

          {/* Right Actions */}
          <div className="flex items-center gap-4">
            {/* Admin Lock Icon - Visible for easy access */}
            <button 
                onClick={(e) => handleLinkClick(e, 'admin')}
                className="text-gray-400 hover:text-[#1A365D] transition-colors p-2 rounded-full hover:bg-gray-100"
                title="Area Admin"
            >
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-5 h-5">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M16.5 10.5V6.75a4.5 4.5 0 10-9 0v3.75m-.75 11.25h10.5a2.25 2.25 0 002.25-2.25v-6.75a2.25 2.25 0 00-2.25-2.25H6.75a2.25 2.25 0 00-2.25 2.25v6.75a2.25 2.25 0 002.25 2.25z" />
                </svg>
            </button>

            <button 
              onClick={onBookClick}
              className="hidden sm:block bg-[#2B6CB0] text-white px-6 py-2.5 rounded-full text-sm font-semibold hover:bg-[#2C5282] transition-all shadow-lg hover:shadow-xl transform hover:-translate-y-0.5"
            >
              Prenota Ora
            </button>
            
            {/* Mobile Menu Toggle */}
            <button 
              className="block md:hidden text-gray-700 focus:outline-none"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            >
               {mobileMenuOpen ? (
                 <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
                   <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
                 </svg>
               ) : (
                 <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
                   <path strokeLinecap="round" strokeLinejoin="round" d="M3.75 6.75h16.5M3.75 12h16.5m-16.5 5.25h16.5" />
                 </svg>
               )}
            </button>
          </div>
        </div>
      </nav>

      {/* Mobile Menu Overlay */}
      <div className={`fixed inset-0 bg-white z-40 flex flex-col pt-24 items-center transition-all duration-300 ease-in-out ${
          mobileMenuOpen ? 'opacity-100 translate-y-0 pointer-events-auto' : 'opacity-0 -translate-y-10 pointer-events-none'
      }`}>
          <div className="flex flex-col items-center space-y-6 text-lg font-medium text-gray-800">
            <a href="#home" onClick={(e) => handleLinkClick(e, 'home')} className="hover:text-[#2B6CB0]">Home</a>
            <a href="#services" onClick={(e) => handleLinkClick(e, 'services')} className="hover:text-[#2B6CB0]">Servizi</a>
            <a href="#documents" onClick={(e) => handleLinkClick(e, 'documents')} className="hover:text-[#2B6CB0]">Documenti</a>
            <a href="#about" onClick={(e) => handleLinkClick(e, 'about')} className="hover:text-[#2B6CB0]">Chi Siamo</a>
            
            {/* Mobile Admin Link */}
            <a href="#" onClick={(e) => handleLinkClick(e, 'admin')} className="text-gray-400 text-sm flex items-center gap-2 mt-4">
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-4 h-4">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M16.5 10.5V6.75a4.5 4.5 0 10-9 0v3.75m-.75 11.25h10.5a2.25 2.25 0 002.25-2.25v-6.75a2.25 2.25 0 00-2.25-2.25H6.75a2.25 2.25 0 00-2.25 2.25v6.75a2.25 2.25 0 002.25 2.25z" />
                </svg>
                Login Amministratore
            </a>

            <button 
                onClick={() => { setMobileMenuOpen(false); onBookClick(); }} 
                className="mt-6 bg-[#2B6CB0] text-white px-8 py-3 rounded-full text-base font-semibold"
            >
                Prenota Appuntamento
            </button>
          </div>
      </div>
    </>
  );
};

export default Navbar;