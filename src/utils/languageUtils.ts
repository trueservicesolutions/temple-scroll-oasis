
import { Language } from '@/types/language';
import { translations } from '@/data/translations';

export const getTranslation = (key: string, language: Language): string => {
  const keys = key.split('.');
  let value: any = translations[language];
  
  for (const k of keys) {
    value = value?.[k];
  }
  
  return value || key;
};

export const getSupportedLanguages = (): Language[] => {
  return ['en', 'mr'];
};

export const getLanguageName = (language: Language): string => {
  const names = {
    en: 'English',
    mr: 'मराठी'
  };
  return names[language];
};
