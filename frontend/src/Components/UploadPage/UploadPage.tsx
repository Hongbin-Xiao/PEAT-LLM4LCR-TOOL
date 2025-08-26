import React, { useState } from "react";
import { Upload, Button, message } from "antd";
import { UploadOutlined } from "@ant-design/icons";
import type { UploadFile, UploadProps, UploadListType } from "antd/es/upload/interface";
import { useLanguage } from "../../contexts/LanguageContext";
import "./UploadPage.css";

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

interface ErrorResponse {
  error: string;
  results: string[];
  score: number;
  reviewItems: any[];
}

interface UploadPageProps {
  onUploadComplete: (data: ReviewData) => void;
}

const UploadPage: React.FC<UploadPageProps> = ({ onUploadComplete }) => {
  const { t } = useLanguage();
  const [fileList, setFileList] = useState<UploadFile[]>([]);
  const [uploading, setUploading] = useState(false);

  const uploadProps: UploadProps = {
    accept: ".docx,.doc,.txt",
    showUploadList: true,
    fileList,
    listType: "picture" as UploadListType,
    maxCount: 1,
    beforeUpload: (file: File) => {
      const isValid = /\.(docx|doc|txt)$/i.test(file.name);
      if (!isValid) {
        message.error(t('upload.formatError'));
        return Upload.LIST_IGNORE; // 阻止文件加入列表
      }
      return false; // 阻止自动上传，手动控制
    },

    onChange(info) {
      setFileList(info.fileList);

      // 处理文件状态变化
      const { status } = info.file;
      if (status === "done") {
        message.success(t('upload.uploadSuccess'));
      } else if (status === "error") {
        message.error(t('upload.uploadError'));
      }
    },
  };

  const handleUpload = async () => {
    if (fileList.length === 0) {
      message.warning(t('upload.noFileWarning'));
      return;
    }

    setUploading(true);
    const formData = new FormData();
    formData.append("file", fileList[0].originFileObj as File);

    try {
      const response = await fetch("http://localhost:8000/contractReview", {
        method: "POST",
        body: formData,
      });

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const data: ReviewData | ErrorResponse = await response.json();

      // 检查是否有错误
      if ("error" in data && data.error) {
        message.error(`${t('upload.processingError')}${data.error}`);
        return;
      }

      // 将完整的审查数据传递给父组件
      onUploadComplete(data as ReviewData);
      message.success(t('upload.processingSuccess'));
    } catch (error) {
      console.error("上传错误:", error);
      message.error(t('upload.uploadFailed'));
    } finally {
      setUploading(false);
    }
  };

  return (
    <div className="upload-container">
      <div className="upload-area">
        <Upload.Dragger {...uploadProps}>
          <div className="upload-icon">
            <UploadOutlined style={{ fontSize: "48px", color: "#1890ff" }} />
          </div>
          <p className="upload-text">{t('upload.description')}</p>
          <p className="upload-hint">{t('upload.hint')}</p>
        </Upload.Dragger>

        <div className="upload-section">
          <Button type="primary" icon={<UploadOutlined />} loading={uploading} onClick={handleUpload}>
            {t('upload.uploadButton')}
          </Button>
        </div>
      </div>
    </div>
  );
};
export default UploadPage;
