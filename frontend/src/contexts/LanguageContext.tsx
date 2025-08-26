import React, { createContext, useContext, useState, ReactNode } from 'react';
import zhCN from '../locales/zh-CN';
import enUS from '../locales/en-US';

// 定义语言类型
export type Language = 'zh-CN' | 'en-US';

// 定义语言包类型
export type LocaleMessages = typeof zhCN;

// 语言包映射
const locales = {
  'zh-CN': zhCN,
  'en-US': enUS,
};

// 语言上下文接口
interface LanguageContextType {
  language: Language;
  messages: LocaleMessages;
  setLanguage: (lang: Language) => void;
  t: (key: string) => any;
}

// 创建上下文
const LanguageContext = createContext<LanguageContextType | undefined>(undefined);

// 语言提供者组件
interface LanguageProviderProps {
  children: ReactNode;
}

export const LanguageProvider: React.FC<LanguageProviderProps> = ({ children }) => {
  // 从localStorage获取默认语言，如果没有则默认为中文
  const [language, setLanguageState] = useState<Language>(() => {
    const savedLanguage = localStorage.getItem('language') as Language;
    return savedLanguage || 'zh-CN';
  });

  // 设置语言
  const setLanguage = (lang: Language) => {
    setLanguageState(lang);
    localStorage.setItem('language', lang);
  };

  // 获取当前语言包
  const messages = locales[language];

  // 翻译函数
  const t = (key: string): any => {
    const keys = key.split('.');
    let value: any = messages;
    
    for (const k of keys) {
      if (value && typeof value === 'object' && k in value) {
        value = value[k];
      } else {
        return key; // 如果找不到翻译，返回原key
      }
    }
    
    return value;
  };

  const contextValue: LanguageContextType = {
    language,
    messages,
    setLanguage,
    t,
  };

  return (
    <LanguageContext.Provider value={contextValue}>
      {children}
    </LanguageContext.Provider>
  );
};

// 使用语言上下文的钩子
export const useLanguage = (): LanguageContextType => {
  const context = useContext(LanguageContext);
  if (context === undefined) {
    throw new Error('useLanguage must be used within a LanguageProvider');
  }
  return context;
}; 