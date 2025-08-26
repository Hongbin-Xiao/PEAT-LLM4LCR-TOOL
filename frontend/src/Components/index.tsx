import React, { useState } from "react";
import "antd/dist/reset.css";
import UploadPage from "./UploadPage/UploadPage";
import ReviewResults from "./ReviewResults/ReviewResults";
import NavigationBar from "./NavigationBar/NavigationBar";
import HomePage from "./HomePage/HomePage";
import Template from "./Template/Template";
import { Layout } from "antd";
import { LanguageProvider, useLanguage } from "../contexts/LanguageContext";
import "./index.css";

const { Content, Header } = Layout;

interface ReviewData {
  fileText: string;
  reviewItems: Array<Array<{
    id: string;
    type: "error" | "warning" | "suggestion";
    title: string;
    description: string;
    original_text: string;
    suggestion?: string;
  }>>;
}

// 定义页面类型
type PageType = "homePage" | "quickreview" | "contractdraft" | "templates" | "about";

// 内部组件，用于使用语言钩子
function AppContent() {
  const [currentPage, setCurrentPage] = useState<PageType>("homePage");
  const [reviewData, setReviewData] = useState<ReviewData | null>(null);
  const { t } = useLanguage();

  const handleUploadComplete = (data: ReviewData) => {
    setReviewData(data);
    setCurrentPage("quickreview"); // 上传完成后跳转到快速审查页面
  };

  const handlePageChange = (page: PageType) => {
    setCurrentPage(page);
    // 如果跳转到其他页面，清除审查数据
    if (page !== "quickreview") {
      setReviewData(null);
    }
  };

  // 渲染页面内容
  const renderPageContent = () => {
    switch (currentPage) {
      case "homePage":
        return <HomePage onPageChange={handlePageChange} />;
      case "quickreview":
        return reviewData ? (
          <ReviewResults originalText={reviewData.fileText} results={reviewData.reviewItems} />
        ) : (
          <UploadPage onUploadComplete={handleUploadComplete} />
        );
      case "contractdraft":
        return (
          <div style={{ 
            display: 'flex', 
            justifyContent: 'center', 
            alignItems: 'center', 
            height: '100%',
            fontSize: '24px',
            color: '#666'
          }}>
            {t("developing.contractDraft")}
          </div>
        );
      case "templates":
        return <Template />;
      case "about":
        return (
          <div style={{ 
            display: 'flex', 
            justifyContent: 'center', 
            alignItems: 'center', 
            height: '100%',
            fontSize: '24px',
            color: '#666'
          }}>
            {t("developing.about")}
          </div>
        );
      default:
        return <UploadPage onUploadComplete={handleUploadComplete} />;
    }
  };

  return (
    <Layout className="layout-page">
      <Header className="header">
        <NavigationBar currentPage={currentPage} onPageChange={handlePageChange} />
      </Header>
      <Content className="main-content">
        {renderPageContent()}
      </Content>
    </Layout>
  );
}

export default function Index() {
  return (
    <LanguageProvider>
      <AppContent />
    </LanguageProvider>
  );
}
