import React from 'react';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import HeroSection from './components/HeroSection';
import HighlightedProjects from './components/HighlightedProjects';
import AIChatbot from './components/AIChatbot';
import StudentDashboard from './components/StudentDashboard';
import SmartMap from './components/SmartMap';

function App() {
  return (
    <div className="min-h-screen flex flex-col bg-slate-50 dark:bg-ai-dark transition-colors duration-300">
      <Navbar />
      
      <main className="flex-grow pt-16">
        <HeroSection />
        
        <HighlightedProjects />
        
        <section id="chatbot" className="relative">
          {/* Decorative background element */}
          <div className="absolute inset-0 bg-gradient-to-b from-transparent via-ai-purple/5 to-transparent skew-y-3 transform origin-top-left -z-10"></div>
          <AIChatbot />
        </section>
        
        <section id="dashboard" className="relative">
          <StudentDashboard />
        </section>
        
        <section id="map" className="relative">
          {/* Decorative background element */}
          <div className="absolute inset-0 bg-slate-100 dark:bg-slate-900/50 -z-10"></div>
          <SmartMap />
        </section>
      </main>

      <Footer />
    </div>
  );
}

export default App;
