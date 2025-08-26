export default {
  // 导航栏
  nav: {
    home: "首页",
    quickReview: "快速审查",
    contractDraft: "合同起草",
    templates: "合同模版",
    about: "关于"
  },

  // 首页
  home: {
    title: "PEAT-LLM4LCR",
    subtitle: "融合提示词工程与Agent技术的大语言模型法律合同审查方法",
    description: "PEAT-LLM4LCR充分考虑了法律合同审查的复杂性和多样性。分析过程结合先进的自然语言处理技术和法律专业知识，采用思维链和提示工程微调大语言模型，融合设计Agent-GoTFlow，模拟专业律师的合同审核能力，实现高效且准确的买卖合同审查，并给出专业的修改意见，提升合同审查效率并减少人为错误。",
    startReview: "开始审查",
    learnMore: "了解更多",
    coreFeatures: "核心特色",
    features: {
      aiReview: "AI智能审查",
      aiReviewDesc: "基于大语言模型的智能合同审查，模拟专业律师的审核能力",
      professionalAnalysis: "专业分析",
      professionalAnalysisDesc: "结合法律专业知识和自然语言处理技术，提供准确的分析结果",
      riskIdentification: "风险识别",
      riskIdentificationDesc: "自动识别合同中的潜在风险点，并提供专业的修改建议",
      efficientProcessing: "高效处理",
      efficientProcessingDesc: "大幅提升合同审查效率，减少人为错误，节省时间和成本"
    },
    technicalAdvantages: "技术优势",
    advantages: {
      innovation: "技术创新",
      innovationDesc: "融合提示词工程与Agent技术，实现智能化合同审查",
      efficiency: "高效处理",
      efficiencyDesc: "采用思维链和提示工程，大幅提升审查效率",
      quality: "专业质量",
      qualityDesc: "模拟专业律师能力，确保审查质量",
      expertise: "技术专长",
      expertiseDesc: "结合法律专业知识，提供准确分析结果"
    }
  },

  // 上传页面
  upload: {
    title: "上传合同文件",
    description: "在这里上传您的合同",
    hint: "支持 DOCX, DOC, TXT 格式文件",
    uploadButton: "上传",
    uploadSuccess: "文件上传成功",
    uploadError: "文件上传失败",
    formatError: "只支持 DOCX, DOC, TXT 格式文件！",
    noFileWarning: "请先上传文件！",
    processingSuccess: "合同审查完成！",
    processingError: "处理失败：",
    uploadFailed: "上传失败，请重试！"
  },

  // 审查结果页面
  review: {
    originalText: "合同原文",
    reviewResults: "Q 审查结果",
    aiChat: "AI 助手",
    noIssues: "🎉 恭喜！未发现重大问题",
    noIssuesSub: "该类别审查通过",
    chatPlaceholder: "输入您的问题...",
    sendButton: "发送",
    typing: "正在输入...",
    online: "在线",
    wordCount: "字数",
    issuesFound: "发现问题",
    problem: "存在问题：",
    originalTextIssue: "问题所在原文：",
    suggestion: "建议：",
    risk: "风险",
    tabTitles: ["主体与基本要素", "高风险条款", "知识产权"],
    aiAssistantGreeting: "您好！我是您的合同审查助手。我可以帮您分析审查结果，回答相关问题，并提供修改建议。请问有什么需要帮助的吗？",
    aiAssistantError: "抱歉，我暂时无法回复您的问题。请稍后重试。",
    aiAssistantTimeout: "请求超时，请稍后重试。",
    aiAssistantNetworkError: "网络连接失败，请检查网络设置。",
    aiAssistantGeneralError: "AI助手暂时无法回复，请稍后重试。"
  },

  // 模板页面
  template: {
    title: "精选模板",
    subtitle: "律己AI严选高质量模板，助您快速起草专业合同",
    searchPlaceholder: "搜索模板名称、描述或标签",
    categoryAll: "全部",
    categories: {
      labor: "劳动用工",
      rental: "房产租赁",
      trade: "商业贸易",
      tech: "技术服务",
      governance: "公司治理",
      ip: "知识产权"
    },
    templates: {
      industrial: {
        title: "工业品买卖合同",
        description: "标准工业品买卖合同模板，适用于各类工业产品销售交易",
        tags: {
          industrial: "工业品",
          sales: "销售",
          standard: "标准版"
        }
      },
      car: {
        title: "二手车买卖合同",
        description: "二手车交易标准合同模板，保障买卖双方权益",
        tags: {
          car: "二手车",
          sales: "销售",
          vehicle: "车辆"
        }
      },
      labor: {
        title: "劳动合同模板",
        description: "标准劳动合同模板，包含完整的劳动条款和权益保护内容",
        tags: {
          contract: "劳动合同",
          employment: "用工",
          standard: "标准版"
        }
      },
      rental: {
        title: "房屋租赁合同",
        description: "适用于房屋租赁的标准合同模板，保障双方权益",
        tags: {
          rental: "租赁",
          property: "房产",
          standard: "标准版"
        }
      },
      trade: {
        title: "购销合同模板",
        description: "商品购销合同标准模板，适用于各类商品交易",
        tags: {
          purchase: "购销",
          trade: "贸易",
          goods: "商品"
        }
      },
      tech: {
        title: "技术开发合同",
        description: "技术开发项目合同模板，包含知识产权保护条款",
        tags: {
          development: "技术开发",
          ip: "知识产权",
          project: "项目"
        }
      },
      equity: {
        title: "股权转让协议",
        description: "股权转让标准协议模板，适用于公司股权变更",
        tags: {
          equity: "股权",
          transfer: "转让",
          company: "公司"
        }
      },
      confidentiality: {
        title: "保密协议模板",
        description: "商业秘密保护协议，适用于员工保密义务约定",
        tags: {
          confidentiality: "保密",
          secret: "商业秘密",
          employee: "员工"
        }
      }
    },
    preview: "预览",
    download: "下载",
    back: "返回",
    loading: "正在加载模板内容...",
    downloadSuccess: "模板下载成功！",
    downloadError: "下载失败，请重试！",
    previewError: "预览失败，请重试！",
    noTemplates: "暂无符合条件的模板"
  },

  // 通用
  common: {
    loading: "加载中...",
    error: "错误",
    success: "成功",
    cancel: "取消",
    confirm: "确认",
    save: "保存",
    edit: "编辑",
    delete: "删除",
    search: "搜索",
    filter: "筛选",
    clear: "清除",
    submit: "提交",
    reset: "重置"
  },

  // 开发中页面
  developing: {
    contractDraft: "合同起草功能开发中...",
    about: "关于页面开发中..."
  }
}; 