
import React from 'react';
import { useLanguage } from '@/contexts/LanguageContext';
import { Globe } from 'lucide-react';

const LanguageSwitcher: React.FC = () => {
  const { language, setLanguage } = useLanguage();

  return (
    <div className="flex items-center space-x-2">
      <Globe size={18} className="text-orange-600" />
      <select
        value={language}
        onChange={(e) => setLanguage(e.target.value as 'en' | 'mr')}
        className="bg-transparent text-orange-800 border border-orange-300 rounded px-2 py-1 text-sm focus:outline-none focus:ring-2 focus:ring-orange-500"
      >
        <option value="en">English</option>
        <option value="mr">मराठी</option>
      </select>
    </div>
  );
};

export default LanguageSwitcher;
