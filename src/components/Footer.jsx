import { useTranslation } from 'react-i18next';
import { Sparkles, Mail, MapPin, Phone, ExternalLink } from 'lucide-react';

export default function Footer() {
  const { t } = useTranslation();
  
  return (
    <footer className="bg-slate-900 text-slate-300 py-12 border-t border-slate-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          
          {/* Brand */}
          <div className="col-span-1 md:col-span-1">
            <div className="flex items-center space-x-2 mb-4">
              <Sparkles className="w-6 h-6 text-ai-cyan" />
              <span className="font-bold text-xl text-white">AntiGravity AI</span>
            </div>
            <p className="text-sm text-slate-400 mb-6">
              {t('hero.slogan')}
            </p>
            <div className="flex space-x-4">
              <a href="#" className="text-slate-400 hover:text-ai-cyan transition-colors"><ExternalLink className="w-5 h-5" /></a>
              <a href="#" className="text-slate-400 hover:text-ai-cyan transition-colors"><ExternalLink className="w-5 h-5" /></a>
              <a href="#" className="text-slate-400 hover:text-ai-cyan transition-colors"><ExternalLink className="w-5 h-5" /></a>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="text-white font-semibold mb-4">Quick Links</h3>
            <ul className="space-y-2 text-sm">
              <li><a href="#home" className="hover:text-ai-cyan transition-colors">{t('nav.home')}</a></li>
              <li><a href="#chatbot" className="hover:text-ai-cyan transition-colors">{t('nav.chatbot')}</a></li>
              <li><a href="#dashboard" className="hover:text-ai-cyan transition-colors">{t('nav.dashboard')}</a></li>
              <li><a href="#map" className="hover:text-ai-cyan transition-colors">{t('nav.map')}</a></li>
            </ul>
          </div>

          {/* Projects */}
          <div>
            <h3 className="text-white font-semibold mb-4">Features</h3>
            <ul className="space-y-2 text-sm">
              <li><a href="#" className="hover:text-ai-cyan transition-colors">AI Survival Guide</a></li>
              <li><a href="#" className="hover:text-ai-cyan transition-colors">Emotional Support AI</a></li>
              <li><a href="#" className="hover:text-ai-cyan transition-colors">Student Community</a></li>
              <li><a href="#" className="hover:text-ai-cyan transition-colors">Recommendation System</a></li>
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h3 className="text-white font-semibold mb-4">Contact</h3>
            <ul className="space-y-3 text-sm">
              <li className="flex items-start space-x-3">
                <MapPin className="w-4 h-4 text-ai-cyan mt-1" />
                <span>Kyungmin University, Uijeongbu, South Korea</span>
              </li>
              <li className="flex items-center space-x-3">
                <Mail className="w-4 h-4 text-ai-cyan" />
                <span>hello@antigravity.ai</span>
              </li>
              <li className="flex items-center space-x-3">
                <Phone className="w-4 h-4 text-ai-cyan" />
                <span>+82 10-XXXX-XXXX</span>
              </li>
            </ul>
          </div>
        </div>

        <div className="border-t border-slate-800 mt-12 pt-8 flex flex-col md:flex-row justify-between items-center text-sm text-slate-500">
          <p>&copy; {new Date().getFullYear()} AntiGravity AI. All rights reserved.</p>
          <div className="flex space-x-4 mt-4 md:mt-0">
            <a href="#" className="hover:text-slate-300">Privacy Policy</a>
            <a href="#" className="hover:text-slate-300">Terms of Service</a>
          </div>
        </div>
      </div>
    </footer>
  );
}
