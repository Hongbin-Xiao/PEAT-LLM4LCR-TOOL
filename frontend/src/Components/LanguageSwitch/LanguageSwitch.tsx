import React from 'react';
import { Select } from 'antd';
import { GlobalOutlined } from '@ant-design/icons';
import { useLanguage, Language } from '../../contexts/LanguageContext';
import './LanguageSwitch.css';

const { Option } = Select;

const LanguageSwitch: React.FC = () => {
  const { language, setLanguage } = useLanguage();

  const handleLanguageChange = (value: Language) => {
    setLanguage(value);
  };

  return (
    <div className="language-switch">
      <Select
        value={language}
        onChange={handleLanguageChange}
        style={{ width: 100 }}
        suffixIcon={<GlobalOutlined />}
        dropdownMatchSelectWidth={false}
      >
        <Option value="zh-CN">中文</Option>
        <Option value="en-US">English</Option>
      </Select>
    </div>
  );
};

export default LanguageSwitch; 