import React, { useState } from "react";
import { Card, Row, Col, Tag, Button, Typography, Modal, Spin, message } from "antd";
import { DownloadOutlined, EyeOutlined, ArrowLeftOutlined } from "@ant-design/icons";
import { useLanguage } from "../../contexts/LanguageContext";
import "./Template.css";

const { Title, Text } = Typography;

interface TemplateItem {
  id: string;
  title: string;
  category: string;
  description: string;
  tags: string[];
  filePath: string; // 模板文件路径
  fileName: string; // 文件名
}

const Template: React.FC = () => {
  const { t, language } = useLanguage();
  const [previewVisible, setPreviewVisible] = useState(false);
  const [previewContent, setPreviewContent] = useState("");
  const [previewTitle, setPreviewTitle] = useState("");
  const [previewLoading, setPreviewLoading] = useState(false);
  const [currentTemplate, setCurrentTemplate] = useState<TemplateItem | null>(null);

  // 模拟模板数据
  const templates: TemplateItem[] = [
    {
      id: "1",
      title: t("template.templates.industrial.title"),
      category: t("template.categories.trade"),
      description: t("template.templates.industrial.description"),
      tags: [
        t("template.templates.industrial.tags.industrial"),
        t("template.templates.industrial.tags.sales"),
        t("template.templates.industrial.tags.standard"),
      ],
      filePath: "/templates/industrial_product_sales_contract.txt",
      fileName: language === "zh-CN" ? "工业品买卖合同.txt" : "Industrial Product Sales Contract.txt",
    },
    {
      id: "2",
      title: t("template.templates.car.title"),
      category: t("template.categories.trade"),
      description: t("template.templates.car.description"),
      tags: [t("template.templates.car.tags.car"), t("template.templates.car.tags.sales"), t("template.templates.car.tags.vehicle")],
      filePath: "/templates/second_hand_car_sales_contract.txt",
      fileName: language === "zh-CN" ? "二手车买卖合同.txt" : "Second-hand Car Sales Contract.txt",
    },
    {
      id: "3",
      title: t("template.templates.labor.title"),
      category: t("template.categories.labor"),
      description: t("template.templates.labor.description"),
      tags: [t("template.templates.labor.tags.contract"), t("template.templates.labor.tags.employment"), t("template.templates.labor.tags.standard")],
      filePath: "/templates/labor_contract_template.txt",
      fileName: language === "zh-CN" ? "劳动合同模板.txt" : "Labor Contract Template.txt",
    },
    {
      id: "4",
      title: t("template.templates.rental.title"),
      category: t("template.categories.rental"),
      description: t("template.templates.rental.description"),
      tags: [t("template.templates.rental.tags.rental"), t("template.templates.rental.tags.property"), t("template.templates.rental.tags.standard")],
      filePath: "/templates/house_rental_contract.txt",
      fileName: language === "zh-CN" ? "房屋租赁合同.txt" : "House Rental Contract.txt",
    },
    {
      id: "5",
      title: t("template.templates.trade.title"),
      category: t("template.categories.trade"),
      description: t("template.templates.trade.description"),
      tags: [t("template.templates.trade.tags.purchase"), t("template.templates.trade.tags.trade"), t("template.templates.trade.tags.goods")],
      filePath: "/templates/purchase_sale_contract.txt",
      fileName: language === "zh-CN" ? "购销合同模板.txt" : "Purchase Sale Contract.txt",
    },
    {
      id: "6",
      title: t("template.templates.tech.title"),
      category: t("template.categories.tech"),
      description: t("template.templates.tech.description"),
      tags: [t("template.templates.tech.tags.development"), t("template.templates.tech.tags.ip"), t("template.templates.tech.tags.project")],
      filePath: "/templates/tech_development_contract.txt",
      fileName: language === "zh-CN" ? "技术开发合同.txt" : "Tech Development Contract.txt",
    },
    {
      id: "7",
      title: t("template.templates.equity.title"),
      category: t("template.categories.governance"),
      description: t("template.templates.equity.description"),
      tags: [t("template.templates.equity.tags.equity"), t("template.templates.equity.tags.transfer"), t("template.templates.equity.tags.company")],
      filePath: "/templates/equity_transfer_agreement.txt",
      fileName: language === "zh-CN" ? "股权转让协议.txt" : "Equity Transfer Agreement.txt",
    },
    {
      id: "8",
      title: t("template.templates.confidentiality.title"),
      category: t("template.categories.ip"),
      description: t("template.templates.confidentiality.description"),
      tags: [
        t("template.templates.confidentiality.tags.confidentiality"),
        t("template.templates.confidentiality.tags.secret"),
        t("template.templates.confidentiality.tags.employee"),
      ],
      filePath: "/templates/confidentiality_agreement.txt",
      fileName: language === "zh-CN" ? "保密协议模板.txt" : "Confidentiality Agreement.txt",
    },
  ];

  const handleDownload = async (template: TemplateItem) => {
    try {
      const response = await fetch(`http://localhost:8000/downloadTemplate`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          filePath: template.filePath,
          fileName: template.fileName,
        }),
      });

      if (response.ok) {
        const blob = await response.blob();
        const url = window.URL.createObjectURL(blob);
        const a = document.createElement("a");
        a.href = url;
        a.download = template.fileName;
        document.body.appendChild(a);
        a.click();
        window.URL.revokeObjectURL(url);
        document.body.removeChild(a);
        message.success(t("template.downloadSuccess"));
      } else {
        message.error(t("template.downloadError"));
      }
    } catch (error) {
      console.error("下载错误:", error);
      message.error(t("template.downloadError"));
    }
  };

  const handlePreview = async (template: TemplateItem) => {
    setCurrentTemplate(template);
    setPreviewTitle(template.title);
    setPreviewLoading(true);
    setPreviewVisible(true);

    try {
      const response = await fetch(`http://localhost:8000/previewTemplate`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          filePath: template.filePath,
        }),
      });

      if (response.ok) {
        const data = await response.json();
        setPreviewContent(data.content);
      } else {
        message.error(t("template.previewError"));
        setPreviewVisible(false);
      }
    } catch (error) {
      console.error("预览错误:", error);
      message.error(t("template.previewError"));
      setPreviewVisible(false);
    } finally {
      setPreviewLoading(false);
    }
  };

  const handlePreviewClose = () => {
    setPreviewVisible(false);
    setPreviewContent("");
    setPreviewTitle("");
    setCurrentTemplate(null);
  };

  return (
    <div className="template-container">
      <div className="template-content">
        <Row gutter={[24, 24]}>
          {templates.map((template: TemplateItem) => (
            <Col xs={24} sm={12} lg={8} xl={6} key={template.id}>
              <Card
                className="template-card"
                hoverable
                actions={[
                  <Button type="text" icon={<EyeOutlined />} onClick={() => handlePreview(template)}>
                    {t("template.preview")}
                  </Button>,
                  <Button type="primary" icon={<DownloadOutlined />} onClick={() => handleDownload(template)}>
                    {t("template.download")}
                  </Button>,
                ]}
              >
                <div className="template-card-header">
                  <Title level={4} className="template-card-title">
                    {template.title}
                  </Title>
                </div>

                <div className="template-card-category">
                  <Tag color="blue">{template.category}</Tag>
                </div>

                <Text className="template-card-description">{template.description}</Text>

                <div className="template-card-tags">
                  {template.tags.map((tag: string) => (
                    <Tag key={tag} className="template-tag-item">
                      {tag}
                    </Tag>
                  ))}
                </div>
              </Card>
            </Col>
          ))}
        </Row>
      </div>

      {/* 预览模态框 */}
      <Modal
        title={
          <div style={{ display: "flex", alignItems: "center", gap: "8px" }}>
            <Button type="text" icon={<ArrowLeftOutlined />} onClick={handlePreviewClose} style={{ marginRight: "8px" }}>
              {t("template.back")}
            </Button>
            {previewTitle}
          </div>
        }
        open={previewVisible}
        onCancel={handlePreviewClose}
        footer={[
          <Button key="back" onClick={handlePreviewClose}>
            {t("template.back")}
          </Button>,
          <Button key="download" type="primary" icon={<DownloadOutlined />} onClick={() => currentTemplate && handleDownload(currentTemplate)}>
            {t("template.download")}
          </Button>,
        ]}
        width={800}
        style={{ top: 20 }}
      >
        <div className="preview-content">
          {previewLoading ? (
            <div style={{ textAlign: "center", padding: "40px" }}>
              <Spin size="large" />
              <div style={{ marginTop: "16px" }}>{t("template.loading")}</div>
            </div>
          ) : (
            <div className="template-preview-text" dangerouslySetInnerHTML={{ __html: previewContent }} />
          )}
        </div>
      </Modal>
    </div>
  );
};

export default Template;
