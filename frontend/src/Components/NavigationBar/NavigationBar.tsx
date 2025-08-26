import { Layout, Menu, Button, Space, Avatar, Tag } from "antd";
import { UserOutlined } from "@ant-design/icons";
import { useLanguage } from "../../contexts/LanguageContext";
import LanguageSwitch from "../LanguageSwitch/LanguageSwitch";
import "./NavigationBar.css";

// 定义页面类型
type PageType = "homePage" | "quickreview" | "contractdraft" | "templates" | "about";

interface NavigationBarProps {
  currentPage: PageType;
  onPageChange: (page: PageType) => void;
}

export default function NavigationBar({ currentPage, onPageChange }: NavigationBarProps) {
  const { t } = useLanguage();

  const menuItems = [
    { key: "homePage", label: t("nav.home") },
    { key: "quickreview", label: t("nav.quickReview") },
    { key: "contractdraft", label: t("nav.contractDraft") },
    { key: "templates", label: t("nav.templates") },
    { key: "about", label: t("nav.about") },
  ];

  const handleMenuClick = ({ key }: { key: string }) => {
    onPageChange(key as PageType);
  };

  return (
    <div className="header-content">
      <div className="header-left">PEAT-LLM4LCR</div>
      <div className="header-middle">
        <Menu mode="horizontal" items={menuItems} className="nav-menu" selectedKeys={[currentPage]} onClick={handleMenuClick} />
      </div>
      <div className="header-right">
        <LanguageSwitch />
      </div>
    </div>
  );
}
