import React from "react";
import { Card, Typography, Row, Col, Button, Space } from "antd";
import { 
  RobotOutlined, 
  FileTextOutlined, 
  SafetyOutlined, 
  ThunderboltOutlined,
  PlayCircleOutlined,
  BulbOutlined,
  RocketOutlined,
  CrownOutlined,
  StarOutlined
} from "@ant-design/icons";
import { useLanguage } from "../../contexts/LanguageContext";
import "./HomePage.css";

const { Title, Paragraph, Text } = Typography;

// 定义页面类型
type PageType = "homePage" | "quickreview" | "contractdraft" | "templates" | "about";

interface HomePageProps {
  onPageChange: (page: PageType) => void;
}

export default function HomePage({ onPageChange }: HomePageProps) {
  const { t } = useLanguage();
  
  const features = [
    {
      icon: <RobotOutlined className="feature-icon" />,
      title: t('home.features.aiReview'),
      description: t('home.features.aiReviewDesc')
    },
    {
      icon: <FileTextOutlined className="feature-icon" />,
      title: t('home.features.professionalAnalysis'),
      description: t('home.features.professionalAnalysisDesc')
    },
    {
      icon: <SafetyOutlined className="feature-icon" />,
      title: t('home.features.riskIdentification'),
      description: t('home.features.riskIdentificationDesc')
    },
    {
      icon: <ThunderboltOutlined className="feature-icon" />,
      title: t('home.features.efficientProcessing'),
      description: t('home.features.efficientProcessingDesc')
    }
  ];

  const advantages = [
    {
      icon: <BulbOutlined className="advantage-icon" />,
      title: t('home.advantages.innovation'),
      description: t('home.advantages.innovationDesc')
    },
    {
      icon: <RocketOutlined className="advantage-icon" />,
      title: t('home.advantages.efficiency'),
      description: t('home.advantages.efficiencyDesc')
    },
    {
      icon: <CrownOutlined className="advantage-icon" />,
      title: t('home.advantages.quality'),
      description: t('home.advantages.qualityDesc')
    },
    {
      icon: <StarOutlined className="advantage-icon" />,
      title: t('home.advantages.expertise'),
      description: t('home.advantages.expertiseDesc')
    }
  ];

  // 按钮点击事件处理
  const handleStartReview = () => {
    onPageChange("quickreview");
  };

  const handleLearnMore = () => {
    onPageChange("about");
  };

  return (
    <div className="homepage-container">
      <div className="homepage-content">
        {/* 主横幅区域 */}
        <div className="hero-section">
          <div className="hero-content">
            <Title level={1} className="main-title">
              {t('home.title')}
            </Title>
            <Title level={3} className="subtitle">
              {t('home.subtitle')}
            </Title>
            <Paragraph className="hero-description">
              {t('home.description')}
            </Paragraph>
            <Space size="large" className="action-buttons">
              <Button 
                type="primary" 
                size="large" 
                icon={<PlayCircleOutlined />}
                onClick={handleStartReview}
                className="start-button"
              >
                {t('home.startReview')}
              </Button>
              <Button 
                size="large"
                onClick={handleLearnMore}
                className="learn-button"
              >
                {t('home.learnMore')}
              </Button>
            </Space>
          </div>
        </div>

        {/* 功能展示区域 */}
        <div className="features-section">
          <div className="features-container">
            {/* 核心特色 */}
            <div className="features-column">
              <Title level={2} className="section-title">
                {t('home.coreFeatures')}
              </Title>
              <Row gutter={[16, 16]} className="features-grid">
                {features.map((feature, index) => (
                  <Col xs={24} sm={12} key={index}>
                    <Card className="feature-card" hoverable>
                      <div className="feature-content">
                        {feature.icon}
                        <Title level={4} className="feature-title">{feature.title}</Title>
                        <Text className="feature-description">{feature.description}</Text>
                      </div>
                    </Card>
                  </Col>
                ))}
              </Row>
            </div>

            {/* 技术优势 */}
            <div className="advantages-column">
              <Title level={2} className="section-title">
                {t('home.technicalAdvantages')}
              </Title>
              <Row gutter={[16, 16]} className="advantages-grid">
                {advantages.map((advantage, index) => (
                  <Col xs={24} sm={12} key={index}>
                    <Card className="advantage-card" hoverable>
                      <div className="advantage-content">
                        {advantage.icon}
                        <Title level={4} className="advantage-title">{advantage.title}</Title>
                        <Text className="advantage-description">{advantage.description}</Text>
                      </div>
                    </Card>
                  </Col>
                ))}
              </Row>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}