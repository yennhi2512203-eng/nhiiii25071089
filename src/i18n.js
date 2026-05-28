import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
import LanguageDetector from 'i18next-browser-languagedetector';

const resources = {
  en: {
    translation: {
      "nav": {
        "home": "Home",
        "chatbot": "AI Chatbot",
        "dashboard": "Dashboard",
        "map": "Smart Map"
      },
      "hero": {
        "title": "Welcome to AntiGravity AI",
        "slogan": "Your Smart AI Assistant for International Student Life",
        "cta": "Get Started"
      }
    }
  },
  vi: {
    translation: {
      "nav": {
        "home": "Trang chủ",
        "chatbot": "AI Chatbot",
        "dashboard": "Bảng điều khiển",
        "map": "Bản đồ thông minh"
      },
      "hero": {
        "title": "Chào mừng đến với AntiGravity AI",
        "slogan": "Trợ lý AI thông minh cho đời sống du học sinh",
        "cta": "Bắt đầu ngay"
      }
    }
  },
  ko: {
    translation: {
      "nav": {
        "home": "홈",
        "chatbot": "AI 챗봇",
        "dashboard": "대시보드",
        "map": "스마트 맵"
      },
      "hero": {
        "title": "AntiGravity AI에 오신 것을 환영합니다",
        "slogan": "유학생을 위한 스마트 AI 비서",
        "cta": "시작하기"
      }
    }
  },
  zh: {
    translation: {
      "nav": {
        "home": "首页",
        "chatbot": "AI 聊天机器人",
        "dashboard": "仪表板",
        "map": "智能地图"
      },
      "hero": {
        "title": "欢迎来到 AntiGravity AI",
        "slogan": "您的留学生生活智能 AI 助手",
        "cta": "开始使用"
      }
    }
  },
  mn: {
    translation: {
      "nav": {
        "home": "Нүүр",
        "chatbot": "AI Чатбот",
        "dashboard": "Хяналтын самбар",
        "map": "Ухаалаг газрын зураг"
      },
      "hero": {
        "title": "AntiGravity AI-д тавтай морил",
        "slogan": "Олон улсын оюутны амьдралд зориулсан ухаалаг AI туслах",
        "cta": "Эхлэх"
      }
    }
  },
  uk: {
    translation: {
      "nav": {
        "home": "Головна",
        "chatbot": "AI Чат-бот",
        "dashboard": "Панель керування",
        "map": "Смарт-карта"
      },
      "hero": {
        "title": "Ласкаво просимо до AntiGravity AI",
        "slogan": "Ваш розумний AI-помічник для життя іноземного студента",
        "cta": "Почати"
      }
    }
  }
};

i18n
  .use(LanguageDetector)
  .use(initReactI18next)
  .init({
    resources,
    fallbackLng: 'en',
    interpolation: {
      escapeValue: false 
    }
  });

export default i18n;
