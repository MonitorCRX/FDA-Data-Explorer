import React from 'react';
import { Search, Globe2 } from 'lucide-react';

interface HeaderProps {
  language: 'en' | 'zh';
  onLanguageChange: (lang: 'en' | 'zh') => void;
}

export default function Header({ language, onLanguageChange }: HeaderProps) {
  return (
    <header className="bg-white shadow-sm">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
        <div className="flex justify-between items-center">
          <div className="flex items-center space-x-4">
            <img 
              src="https://open.fda.gov/img/logo.png" 
              alt="openFDA Logo" 
              className="h-8"
            />
            <h1 className="text-xl font-semibold text-gray-900">
              {language === 'en' ? 'FDA Data Explorer' : 'FDA 数据浏览器'}
            </h1>
          </div>
          <div className="flex items-center space-x-4">
            <button
              onClick={() => onLanguageChange(language === 'en' ? 'zh' : 'en')}
              className="flex items-center space-x-2 text-gray-600 hover:text-gray-900"
            >
              <Globe2 className="w-5 h-5" />
              <span>{language === 'en' ? '中文' : 'English'}</span>
            </button>
          </div>
        </div>
      </div>
    </header>
  );
}