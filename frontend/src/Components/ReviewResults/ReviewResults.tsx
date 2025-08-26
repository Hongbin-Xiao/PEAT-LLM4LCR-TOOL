import React, { useState } from "react";
import { Card, Typography, Tag, Input, Button, Space, Divider, Tabs, message } from "antd";
import { SendOutlined, FileTextOutlined, SearchOutlined, RobotOutlined } from "@ant-design/icons";
import { useLanguage } from "../../contexts/LanguageContext";
import "./ReviewResults.css";

// 后端API地址
const BACKEND_API_URL = "http://localhost:8000";

const { Title, Text, Paragraph } = Typography;

interface ReviewResult {
  id: string;
  type: "error" | "warning" | "suggestion";
  title: string;
  description: string;
  original_text: string;
  suggestion?: string;
}

interface ChatMessage {
  id: string;
  type: "user" | "ai";
  content: string;
  timestamp: Date;
}

interface ReviewResultsProps {
  originalText: string;
  results: ReviewResult[][]; // 4个子数组，需要重新组织为3类
}

const ReviewResults: React.FC<ReviewResultsProps> = ({ originalText, results }) => {
  const { t } = useLanguage();
  
  const [chatMessages, setChatMessages] = useState<ChatMessage[]>([
    {
      id: "1",
      type: "ai",
      content: t('review.aiAssistantGreeting'),
      timestamp: new Date(),
    },
  ]);
  const [newMessage, setNewMessage] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  // 重新组织数据：将4类改为3类
  // results[0]: 审核建议 -> 主体与基本要素
  // results[1]: 辅助审核款项 + results[2]: 知识产权审核建议 -> 高风险条款
  // results[3]: 审核分项建议 -> 知识产权
  const reorganizedResults = [
    results[0] || [], // 审核建议 -> 主体与基本要素
    [...(results[1] || []), ...(results[2] || [])], // 辅助审核款项 + 知识产权审核建议 -> 高风险条款
    results[3] || [], // 审核分项建议 -> 知识产权
  ];

  // 定义3个选项卡的标题
  const tabTitles = t('review.tabTitles');

  const handleSendMessage = async () => {
    if (!newMessage.trim()) return;

    const userMessage: ChatMessage = {
      id: Date.now().toString(),
      type: "user",
      content: newMessage,
      timestamp: new Date(),
    };

    setChatMessages((prev) => [...prev, userMessage]);
    setNewMessage("");
    setIsLoading(true);

    try {
      // 构建请求数据，包含合同原文、审查结果和用户问题
      const requestData = {
        userQuestion: newMessage,
        originalText: originalText,
        reviewResults: reorganizedResults.flat().map(item => ({
          title: item.title,
          description: item.description,
          original_text: item.original_text,
          suggestion: item.suggestion
        }))
      };

      // 创建AbortController用于超时控制
      const controller = new AbortController();
      const timeoutId = setTimeout(() => controller.abort(), 30000); // 30秒超时

      const response = await fetch(`${BACKEND_API_URL}/aiChat`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(requestData),
        signal: controller.signal,
      });

      clearTimeout(timeoutId);

      if (!response.ok) {
        throw new Error(`API请求失败: ${response.status}`);
      }

      const data = await response.json();
      
      if (data.response) {
        const aiMessage: ChatMessage = {
          id: (Date.now() + 1).toString(),
          type: "ai",
          content: data.response,
          timestamp: new Date(),
        };
        setChatMessages((prev) => [...prev, aiMessage]);
      } else {
        throw new Error('API返回数据格式错误');
      }
    } catch (error) {
      console.error('AI对话错误:', error);
      
      let errorContent = t('review.aiAssistantError');
      
      if (error instanceof Error) {
        if (error.name === 'AbortError') {
          errorContent = t('review.aiAssistantTimeout');
          message.error(t('review.aiAssistantTimeout'));
        } else if (error.message.includes('API请求失败')) {
          errorContent = t('review.aiAssistantNetworkError');
          message.error(t('review.aiAssistantNetworkError'));
        } else {
          message.error(t('review.aiAssistantGeneralError'));
        }
      } else {
        message.error(t('review.aiAssistantGeneralError'));
      }
      
      // 添加错误提示消息
      const errorMessage: ChatMessage = {
        id: (Date.now() + 1).toString(),
        type: "ai",
        content: errorContent,
        timestamp: new Date(),
      };
      setChatMessages((prev) => [...prev, errorMessage]);
    } finally {
      setIsLoading(false);
    }
  };

  // 渲染单个审查结果列表
  const renderResultsList = (resultList: ReviewResult[]) => {
    if (resultList.length === 0) {
      return (
        <div className="no-issues">
          <Text type="success" style={{ fontSize: "16px" }}>
            {t('review.noIssues')}
          </Text>
          <br />
          <Text type="secondary">{t('review.noIssuesSub')}</Text>
        </div>
      );
    }

    return resultList.map((result) => (
      <Card key={result.id} className="result-item" size="small" style={{ marginBottom: "12px" }}>
        <Space direction="vertical" style={{ width: "100%" }}>
          <Space align="start">
            <Tag color="red">{t('review.risk')}</Tag>
            <Title level={5} style={{ margin: 0 }}>
              {result.title}
            </Title>
          </Space>

          {/* 如果有description和original_text，显示详细信息 */}
          {result.description || result.original_text ? (
            <>
              {result.description && (
                <div className="problem-section">
                  <Text strong>{t('review.problem')}</Text>
                  <br />
                  <Text type="secondary">{result.description}</Text>
                </div>
              )}

              {result.original_text && (
                <div className="original-text-section">
                  <Text strong>{t('review.originalTextIssue')}</Text>
                  <br />
                  <Text type="secondary">{result.original_text}</Text>
                </div>
              )}
            </>
          ) : (
            <Text>{result.description}</Text>
          )}

          {result.suggestion && (
            <div className="suggestion">
              <Text strong>{t('review.suggestion')}</Text>
              <br />
              <Text type="secondary">{result.suggestion}</Text>
            </div>
          )}
        </Space>
      </Card>
    ));
  };

  // 计算总问题数
  const totalIssues = reorganizedResults.reduce((sum, resultList) => sum + resultList.length, 0);

  // 生成选项卡内容
  const tabItems = reorganizedResults.map((resultList, index) => ({
    key: index.toString(),
    label: (
      <Space>
        <span>{(tabTitles as string[])[index]}</span>
        <Tag color={resultList.length > 0 ? "red" : "green"}>{resultList.length} 个问题</Tag>
      </Space>
    ),
    children: <div className="results-list">{renderResultsList(resultList)}</div>,
  }));

  return (
    <div className="review-results-container">
      <div className="main-content">
        {/* 左侧：原文展示区 */}
        <Card
          className="original-text-section"
          title={
            <Space>
              <FileTextOutlined />
              <span>{t('review.originalText')}</span>
            </Space>
          }
          extra={<Text type="secondary">{t('review.wordCount')}：{originalText.length}</Text>}
        >
          <div className="text-content-wrapper">
            <Paragraph className="text-content">{originalText}</Paragraph>
          </div>
        </Card>

        {/* 中间：审查结果展示区 */}
        <Card
          className="review-results-section"
          title={
            <Space>
              <SearchOutlined />
              <span>{t('review.reviewResults')}</span>
            </Space>
          }
          extra={<Text type="secondary">{t('review.issuesFound')}：{totalIssues} 个</Text>}
        >
          <Tabs 
            defaultActiveKey="0" 
            items={tabItems} 
            type="card" 
            size="small" 
            animated={true}
            style={{ width: '100%' }}
            tabBarStyle={{ 
              width: '100%',
              marginBottom: 0
            }}
          />
        </Card>

        {/* 右侧：AI对话框 */}
        <Card
          className="ai-chat-section"
          title={
            <Space>
              <RobotOutlined />
              <span>{t('review.aiChat')}</span>
            </Space>
          }
          extra={<Text type="secondary">{isLoading ? t('review.typing') : t('review.online')}</Text>}
        >
          <div className="chat-container">
            <div className="chat-messages">
              {chatMessages.map((message) => (
                <div key={message.id} className={`message ${message.type}`}>
                  <Card
                    size="small"
                    className="message-content"
                    style={{
                      maxWidth: "80%",
                      backgroundColor: message.type === "user" ? "#e6f7ff" : "#f5f5f5",
                    }}
                  >
                    <Text>{message.content}</Text>
                    <br />
                    <Text type="secondary" style={{ fontSize: "12px" }}>
                      {message.timestamp.toLocaleTimeString()}
                    </Text>
                  </Card>
                </div>
              ))}
              {isLoading && (
                <div className="message ai">
                  <Card size="small" className="message-content">
                    <div className="typing-indicator">
                      <span></span>
                      <span></span>
                      <span></span>
                    </div>
                  </Card>
                </div>
              )}
            </div>
            <Divider style={{ margin: "12px 0" }} />
            <Space.Compact style={{ width: "100%" }}>
              <Input
                value={newMessage}
                onChange={(e) => setNewMessage(e.target.value)}
                onPressEnter={handleSendMessage}
                placeholder={t('review.chatPlaceholder')}
                disabled={isLoading}
              />
              <Button type="primary" icon={<SendOutlined />} onClick={handleSendMessage} disabled={isLoading || !newMessage.trim()}>
                {t('review.sendButton')}
              </Button>
            </Space.Compact>
          </div>
        </Card>
      </div>
    </div>
  );
};

export default ReviewResults;
