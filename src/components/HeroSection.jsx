import { useTranslation } from 'react-i18next';
import { motion } from 'framer-motion';
import { Bot, ArrowRight, Sparkles } from 'lucide-react';

export default function HeroSection() {
  const { t } = useTranslation();

  return (
    <section id="home" className="relative min-h-screen flex items-center justify-center overflow-hidden">
      {/* Background Orbs */}
      <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-ai-cyan/20 rounded-full blur-[100px] animate-pulse"></div>
      <div className="absolute bottom-1/4 right-1/4 w-[30rem] h-[30rem] bg-ai-purple/20 rounded-full blur-[120px] animate-pulse" style={{ animationDelay: '2s' }}></div>

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
          className="flex flex-col items-center"
        >
          <div className="inline-flex items-center space-x-2 px-4 py-2 rounded-full glass dark:glass-dark mb-8">
            <Sparkles className="w-4 h-4 text-ai-cyan" />
            <span className="text-sm font-medium">New: GPT-4 Powered Chatbot Available</span>
          </div>

          <h1 className="text-5xl md:text-7xl font-bold tracking-tight mb-6 leading-tight">
            Welcome to <br />
            <span className="text-gradient">AntiGravity AI</span>
          </h1>

          <p className="text-lg md:text-2xl text-slate-600 dark:text-slate-300 mb-10 max-w-3xl mx-auto">
            {t('hero.slogan')}
          </p>

          <div className="flex flex-col sm:flex-row space-y-4 sm:space-y-0 sm:space-x-6">
            <a href="#chatbot" className="group relative inline-flex items-center justify-center px-8 py-4 text-lg font-bold text-white transition-all duration-200 bg-gradient-to-r from-ai-cyan to-ai-purple font-pj rounded-xl focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-ai-cyan hover:scale-105 hover:shadow-[0_0_40px_rgba(6,182,212,0.4)]">
              {t('hero.cta')}
              <ArrowRight className="ml-2 w-5 h-5 group-hover:translate-x-1 transition-transform" />
            </a>
            <a href="#dashboard" className="inline-flex items-center justify-center px-8 py-4 text-lg font-bold transition-all duration-200 glass dark:glass-dark rounded-xl hover:bg-slate-100 dark:hover:bg-slate-800 hover:scale-105">
              Explore Dashboard
            </a>
          </div>
        </motion.div>
        
        {/* Floating elements animation */}
        <motion.div 
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1, duration: 1 }}
          className="mt-20 flex justify-center"
        >
          <div className="glass dark:glass-dark p-6 rounded-2xl w-full max-w-4xl border border-white/20 shadow-2xl relative">
            <div className="absolute -top-6 -left-6 bg-gradient-to-br from-ai-cyan to-ai-purple w-16 h-16 rounded-2xl flex items-center justify-center shadow-lg transform rotate-12">
               <Bot className="text-white w-8 h-8" />
            </div>
            <div className="flex items-center space-x-4 mb-4">
               <div className="flex space-x-1.5">
                  <div className="w-3 h-3 rounded-full bg-red-400"></div>
                  <div className="w-3 h-3 rounded-full bg-yellow-400"></div>
                  <div className="w-3 h-3 rounded-full bg-green-400"></div>
               </div>
               <div className="text-sm text-slate-500 font-mono">antigravity-ai-terminal</div>
            </div>
            <div className="text-left font-mono text-sm space-y-2">
              <p className="text-ai-cyan">~ $ ai start --profile=student</p>
              <p className="text-slate-600 dark:text-slate-300">Loading modules...</p>
              <p className="text-green-500">[OK] Language models loaded (6 languages)</p>
              <p className="text-green-500">[OK] Visa tracking system connected</p>
              <p className="text-green-500">[OK] Kyungmin University Maps synced</p>
              <p className="text-ai-purple font-bold">System Ready. How can I help you today, Nhi?</p>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
