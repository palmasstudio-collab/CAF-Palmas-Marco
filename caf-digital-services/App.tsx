import React, { useState } from 'react';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import ServicesList from './components/ServicesList';
import About from './components/About';
import Documents from './components/Documents';
import LocationSection from './components/LocationSection';
import Booking from './components/Booking';
import Succession from './components/Succession';
import Footer from './components/Footer';
import Assistant from './components/Assistant';
import AdminLogin from './components/admin/AdminLogin';
import AdminDashboard from './components/admin/AdminDashboard';
import ServiceUpload from './components/admin/ServiceUpload';
import ServiceDetail from './components/ServiceDetail';
import InstitutionalLinks from './components/InstitutionalLinks';
import { ViewState, Service } from './types';
import { SERVICES } from './constants';

function App() {
  const [view, setView] = useState<ViewState>({ type: 'home' });
  
  // Booking Pre-selection State
  const [preselectedService, setPreselectedService] = useState<string | undefined>(undefined);
  
  // Selected Service for Details
  const [selectedServiceId, setSelectedServiceId] = useState<string | null>(null);

  // Admin State
  const [isAdminLoggedIn, setIsAdminLoggedIn] = useState(false);
  const [adminSelectedService, setAdminSelectedService] = useState<Service | null>(null);

  // Handle navigation (clicks on Navbar or Footer links)
  const handleNavClick = (e: React.MouseEvent | null, targetView: ViewState['type'], elementId?: string) => {
    if (e) e.preventDefault();
    
    setView({ type: targetView });
    
    // Smooth scroll to top when changing views
    window.scrollTo({ top: 0, behavior: 'smooth' });

    // If an ID is provided (for in-page navigation mostly on Home), scroll to it after render
    if (elementId && targetView === 'home') {
        setTimeout(() => {
            const element = document.getElementById(elementId);
            if (element) {
                const headerOffset = 90;
                const elementPosition = element.getBoundingClientRect().top;
                const offsetPosition = elementPosition + window.scrollY - headerOffset;
                window.scrollTo({ top: offsetPosition, behavior: 'smooth' });
            }
        }, 100);
    }
  };

  const handleBookClick = (serviceName?: string) => {
      setPreselectedService(serviceName);
      setView({ type: 'booking' });
      window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleServiceClick = (serviceId: string) => {
      setSelectedServiceId(serviceId);
      setView({ type: 'service-detail' });
  };

  const handleAdminLogin = (password: string) => {
      if (password === 'admin123') {
          setIsAdminLoggedIn(true);
          return true;
      }
      return false;
  };

  return (
    <div className="min-h-screen bg-[#F8F9FA] font-sans text-[#1A202C] selection:bg-[#3182CE] selection:text-white">
      {/* Navbar is hidden in Admin view */}
      {view.type !== 'admin' && (
          <Navbar 
              onNavClick={handleNavClick} 
              onBookClick={() => handleBookClick()}
          />
      )}
      
      {view.type === 'admin' && (
          // Admin Header
          <div className="bg-[#1A365D] py-4 px-6 shadow-md fixed top-0 w-full z-50">
             <div className="max-w-[1200px] mx-auto flex items-center justify-between text-white">
                <div className="flex items-center gap-2">
                    <span className="font-serif font-bold text-xl cursor-pointer" onClick={() => setView({ type: 'home'})}>CAF Palmas</span>
                    <span className="opacity-50">|</span>
                    <span className="text-sm tracking-widest uppercase font-medium bg-blue-800 px-2 py-1 rounded">Area Amministrazione</span>
                </div>
                <button 
                    onClick={() => setView({ type: 'home' })}
                    className="text-xs uppercase tracking-widest hover:text-blue-300 transition-colors"
                >
                    Esci al sito
                </button>
             </div>
          </div>
      )}
      
      <main className={view.type === 'admin' ? 'pt-20' : 'pt-24'}>
        {view.type === 'home' && (
          <>
            <Hero onBookClick={() => handleBookClick()} />
            <ServicesList 
                limit={6} 
                onViewAll={() => {
                    window.scrollTo({ top: 0, behavior: 'smooth' });
                    setView({ type: 'services' });
                }} 
                onBookClick={handleBookClick}
                onServiceClick={handleServiceClick}
            />
            <LocationSection />
            <InstitutionalLinks />
          </>
        )}

        {view.type === 'services' && (
          <ServicesList 
            onBookClick={handleBookClick} 
            onServiceClick={handleServiceClick}
          />
        )}

        {view.type === 'service-detail' && selectedServiceId && (
            <ServiceDetail 
                service={SERVICES.find(s => s.id === selectedServiceId)!}
                onBack={() => setView({ type: 'services' })}
                onBook={() => handleBookClick(SERVICES.find(s => s.id === selectedServiceId)?.title)}
            />
        )}

        {view.type === 'documents' && (
          <Documents onBookClick={handleBookClick} />
        )}

        {view.type === 'booking' && (
          <Booking preselectedService={preselectedService} />
        )}

        {view.type === 'about' && (
          <About />
        )}

        {/* Removed Contact View as requested */}

        {view.type === 'admin' && (
            <div className="bg-gray-100 min-h-screen pb-20">
                {!isAdminLoggedIn ? (
                    <AdminLogin onLogin={handleAdminLogin} />
                ) : (
                    <>
                       {!adminSelectedService ? (
                           <AdminDashboard 
                                onLogout={() => {
                                    setIsAdminLoggedIn(false);
                                    setView({ type: 'home' });
                                }}
                                onSelectService={(service) => setAdminSelectedService(service)}
                           />
                       ) : (
                           /* Logic to determine which Admin Tool to show */
                           adminSelectedService.id === 'successioni' ? (
                                <Succession onBack={() => setAdminSelectedService(null)} />
                           ) : (
                                <ServiceUpload 
                                    service={adminSelectedService}
                                    onBack={() => setAdminSelectedService(null)}
                                />
                           )
                       )}
                    </>
                )}
            </div>
        )}
      </main>

      {view.type !== 'admin' && <Footer onLinkClick={handleNavClick} />}
      
      {/* Only show Assistant for customers */}
      {view.type !== 'admin' && <Assistant />}
    </div>
  );
}

export default App;