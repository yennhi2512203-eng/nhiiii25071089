import { useState, useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { Moon, Sun, Globe, Menu, X, Sparkles } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

export default function Navbar() {
  const { t, i18n } = useTranslation();
  const [isScrolled, setIsScrolled] = useState(false);
  const [isDark, setIsDark] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isLangMenuOpen, setIsLangMenuOpen] = useState(false);

  const languages = [
    { code: 'vi', label: 'Tiếng Việt' },
    { code: 'ko', label: '한국어' },
    { code: 'en', label: 'English' },
    { code: 'zh', label: '中文' },
    { code: 'mn', label: 'Монгол хэл' },
    { code: 'uk', label: 'Українська' }
  ];

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    
    // Check initial theme
    if (document.documentElement.classList.contains('dark') || 
        (!('theme' in localStorage) && window.matchMedia('(prefers-color-scheme: dark)').matches)) {
      setIsDark(true);
      document.documentElement.classList.add('dark');
    }

    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const toggleDarkMode = () => {
    setIsDark(!isDark);
    if (!isDark) {
      document.documentElement.classList.add('dark');
      localStorage.setItem('theme', 'dark');
    } else {
      document.documentElement.classList.remove('dark');
      localStorage.setItem('theme', 'light');
    }
  };

  const changeLanguage = (code) => {
    i18n.changeLanguage(code);
    setIsLangMenuOpen(false);
    setIsMobileMenuOpen(false);
  };

  return (
    <nav className={`fixed top-0 left-0 w-full z-50 transition-all duration-300 ${
      isScrolled ? 'glass dark:glass-dark py-3' : 'bg-transparent py-5'
    }`}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center">
          
          {/* Logo */}
          <div className="flex items-center space-x-2">
            <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-ai-cyan to-ai-purple flex items-center justify-center shadow-lg shadow-ai-purple/30">
              <Sparkles className="w-6 h-6 text-white" />
            </div>
            <span className="font-bold text-xl md:text-2xl tracking-tight">
              AntiGravity <span className="text-gradient">AI</span>
            </span>
          </div>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-8">
            <a href="#home" className="text-slate-600 hover:text-ai-purple dark:text-slate-300 dark:hover:text-ai-cyan font-medium transition-colors">
              {t('nav.home')}
            </a>
            <a href="#chatbot" className="text-slate-600 hover:text-ai-purple dark:text-slate-300 dark:hover:text-ai-cyan font-medium transition-colors">
              {t('nav.chatbot')}
            </a>
            <a href="#dashboard" className="text-slate-600 hover:text-ai-purple dark:text-slate-300 dark:hover:text-ai-cyan font-medium transition-colors">
              {t('nav.dashboard')}
            </a>
            <a href="#map" className="text-slate-600 hover:text-ai-purple dark:text-slate-300 dark:hover:text-ai-cyan font-medium transition-colors">
              {t('nav.map')}
            </a>
          </div>

          {/* Actions: Lang + Dark Mode */}
          <div className="hidden md:flex items-center space-x-4">
            
            {/* Language Switcher */}
            <div className="relative">
              <button 
                onClick={() => setIsLangMenuOpen(!isLangMenuOpen)}
                className="p-2 rounded-full hover:bg-slate-200 dark:hover:bg-slate-800 transition-colors flex items-center space-x-1"
              >
                <Globe className="w-5 h-5 text-slate-700 dark:text-slate-300" />
                <span className="text-sm font-medium uppercase">{i18n.language?.split('-')[0] || 'en'}</span>
              </button>
              
              <AnimatePresence>
                {isLangMenuOpen && (
                  <motion.div 
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: 10 }}
                    className="absolute right-0 mt-2 w-48 rounded-xl bg-white dark:bg-slate-800 shadow-xl border border-slate-200 dark:border-slate-700 overflow-hidden"
                  >
                    {languages.map((lang) => (
                      <button
                        key={lang.code}
                        onClick={() => changeLanguage(lang.code)}
                        className={`w-full text-left px-4 py-2 text-sm hover:bg-ai-cyan/10 hover:text-ai-cyan transition-colors ${
                          i18n.language.startsWith(lang.code) ? 'bg-ai-cyan/10 text-ai-cyan font-semibold' : 'text-slate-700 dark:text-slate-300'
                        }`}
                      >
                        {lang.label}
                      </button>
                    ))}
                  </motion.div>
                )}
              </AnimatePresence>
            </div>

            {/* Dark Mode Toggle */}
            <button 
              onClick={toggleDarkMode}
              className="p-2 rounded-full hover:bg-slate-200 dark:hover:bg-slate-800 transition-colors"
            >
              {isDark ? (
                <Sun className="w-5 h-5 text-yellow-400" />
              ) : (
                <Moon className="w-5 h-5 text-slate-700" />
              )}
            </button>
          </div>

          {/* Mobile Menu Button */}
          <div className="md:hidden flex items-center">
            <button 
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className="p-2 rounded-lg text-slate-700 dark:text-slate-300"
            >
              {isMobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            className="md:hidden glass dark:glass-dark border-t border-slate-200/20 mt-3"
          >
            <div className="px-4 py-4 flex flex-col space-y-4">
              <a href="#home" onClick={() => setIsMobileMenuOpen(false)} className="text-lg font-medium">{t('nav.home')}</a>
              <a href="#chatbot" onClick={() => setIsMobileMenuOpen(false)} className="text-lg font-medium">{t('nav.chatbot')}</a>
              <a href="#dashboard" onClick={() => setIsMobileMenuOpen(false)} className="text-lg font-medium">{t('nav.dashboard')}</a>
              <a href="#map" onClick={() => setIsMobileMenuOpen(false)} className="text-lg font-medium">{t('nav.map')}</a>
              
              <div className="h-px w-full bg-slate-200 dark:bg-slate-700 my-2"></div>
              
              <div className="flex justify-between items-center">
                <span className="font-medium">Theme</span>
                <button onClick={toggleDarkMode} className="p-2 rounded-lg bg-slate-200 dark:bg-slate-800">
                  {isDark ? <Sun className="w-5 h-5 text-yellow-400" /> : <Moon className="w-5 h-5" />}
                </button>
              </div>

              <div className="flex flex-col space-y-2 mt-2">
                <span className="font-medium">Language</span>
                <div className="grid grid-cols-2 gap-2">
                  {languages.map((lang) => (
                    <button
                      key={lang.code}
                      onClick={() => changeLanguage(lang.code)}
                      className={`px-3 py-2 rounded-lg text-sm border ${
                        i18n.language.startsWith(lang.code) 
                          ? 'border-ai-cyan text-ai-cyan bg-ai-cyan/10' 
                          : 'border-slate-300 dark:border-slate-700'
                      }`}
                    >
                      {lang.label}
                    </button>
                  ))}
                </div>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
}
