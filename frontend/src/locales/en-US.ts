export default {
  // Navigation
  nav: {
    home: "Home",
    quickReview: "Quick Review",
    contractDraft: "Contract Draft",
    templates: "Templates",
    about: "About"
  },

  // Home page
  home: {
    title: "PEAT-LLM4LCR",
    subtitle: "Large Language Model Legal Contract Review Method Integrating Prompt Engineering and Agent Technology",
    description: "PEAT-LLM4LCR fully considers the complexity and diversity of legal contract review. The analysis process combines advanced natural language processing technology and legal professional knowledge, uses chain-of-thought and prompt engineering to fine-tune large language models, integrates the design of Agent-GoTFlow, simulates the contract review capabilities of professional lawyers, achieves efficient and accurate sales contract review, and provides professional modification opinions, improving contract review efficiency and reducing human errors.",
    startReview: "Start Review",
    learnMore: "Learn More",
    coreFeatures: "Core Features",
    features: {
      aiReview: "AI Smart Review",
      aiReviewDesc: "Intelligent contract review based on large language models, simulating professional lawyer review capabilities",
      professionalAnalysis: "Professional Analysis",
      professionalAnalysisDesc: "Combining legal professional knowledge and natural language processing technology to provide accurate analysis results",
      riskIdentification: "Risk Identification",
      riskIdentificationDesc: "Automatically identify potential risk points in contracts and provide professional modification suggestions",
      efficientProcessing: "Efficient Processing",
      efficientProcessingDesc: "Significantly improve contract review efficiency, reduce human errors, save time and costs"
    },
    technicalAdvantages: "Technical Advantages",
    advantages: {
      innovation: "Technical Innovation",
      innovationDesc: "Integrating prompt engineering and Agent technology for intelligent contract review",
      efficiency: "Efficient Processing",
      efficiencyDesc: "Using chain-of-thought and prompt engineering to significantly improve review efficiency",
      quality: "Professional Quality",
      qualityDesc: "Simulating professional lawyer capabilities to ensure review quality",
      expertise: "Technical Expertise",
      expertiseDesc: "Combining legal professional knowledge to provide accurate analysis results"
    }
  },

  // Upload page
  upload: {
    title: "Upload Contract File",
    description: "Upload your contract here",
    hint: "Supports DOCX, DOC, TXT format files",
    uploadButton: "Upload",
    uploadSuccess: "File uploaded successfully",
    uploadError: "File upload failed",
    formatError: "Only DOCX, DOC, TXT format files are supported!",
    noFileWarning: "Please upload a file first!",
    processingSuccess: "Contract review completed!",
    processingError: "Processing failed: ",
    uploadFailed: "Upload failed, please try again!"
  },

  // Review results page
  review: {
    originalText: "Original Contract Text",
    reviewResults: "Q Review Results",
    aiChat: "AI Assistant",
    noIssues: "🎉 Congratulations! No major issues found",
    noIssuesSub: "This category review passed",
    chatPlaceholder: "Enter your question...",
    sendButton: "Send",
    typing: "Typing...",
    online: "Online",
    wordCount: "Word Count",
    issuesFound: "Issues Found",
    problem: "Issue Exists: ",
    originalTextIssue: "Original Text of Issue: ",
    suggestion: "Suggestion: ",
    risk: "Risk",
    tabTitles: ["Main Body & Basic Elements", "High-Risk Clauses", "Intellectual Property"],
    aiAssistantGreeting: "Hello! I am your contract review assistant. I can help you analyze review results, answer related questions, and provide modification suggestions. Is there anything you need help with?",
    aiAssistantError: "Sorry, I cannot reply to your question at the moment. Please try again later.",
    aiAssistantTimeout: "Request timeout, please try again later.",
    aiAssistantNetworkError: "Network connection failed, please check your network settings.",
    aiAssistantGeneralError: "AI assistant is temporarily unavailable, please try again later."
  },

  // Template page
  template: {
    title: "Featured Templates",
    subtitle: "Carefully selected high-quality templates to help you quickly draft professional contracts",
    searchPlaceholder: "Search template name, description or tags",
    categoryAll: "All",
    categories: {
      labor: "Labor & Employment",
      rental: "Property Rental",
      trade: "Commercial Trade",
      tech: "Technical Services",
      governance: "Corporate Governance",
      ip: "Intellectual Property"
    },
    templates: {
      industrial: {
        title: "Industrial Product Sales Contract",
        description: "Standard industrial product sales contract template for various industrial product transactions",
        tags: {
          industrial: "Industrial",
          sales: "Sales",
          standard: "Standard"
        }
      },
      car: {
        title: "Second-hand Car Sales Contract",
        description: "Standard second-hand car transaction contract template protecting both parties' rights",
        tags: {
          car: "Second-hand Car",
          sales: "Sales",
          vehicle: "Vehicle"
        }
      },
      labor: {
        title: "Labor Contract Template",
        description: "Standard labor contract template with complete labor terms and rights protection content",
        tags: {
          contract: "Labor Contract",
          employment: "Employment",
          standard: "Standard"
        }
      },
      rental: {
        title: "House Rental Contract",
        description: "Standard contract template for house rental, protecting both parties' rights",
        tags: {
          rental: "Rental",
          property: "Property",
          standard: "Standard"
        }
      },
      trade: {
        title: "Purchase Sale Contract",
        description: "Standard contract template for goods purchase and sale",
        tags: {
          purchase: "Purchase",
          trade: "Trade",
          goods: "Goods"
        }
      },
      tech: {
        title: "Tech Development Contract",
        description: "Technology development project contract template with IP protection clauses",
        tags: {
          development: "Development",
          ip: "IP",
          project: "Project"
        }
      },
      equity: {
        title: "Equity Transfer Agreement",
        description: "Standard equity transfer agreement template for company equity changes",
        tags: {
          equity: "Equity",
          transfer: "Transfer",
          company: "Company"
        }
      },
      confidentiality: {
        title: "Confidentiality Agreement",
        description: "Trade secret protection agreement for employee confidentiality obligations",
        tags: {
          confidentiality: "Confidentiality",
          secret: "Trade Secret",
          employee: "Employee"
        }
      }
    },
    preview: "Preview",
    download: "Download",
    back: "Back",
    loading: "Loading template content...",
    downloadSuccess: "Template downloaded successfully!",
    downloadError: "Download failed, please try again!",
    previewError: "Preview failed, please try again!",
    noTemplates: "No matching templates found"
  },

  // Common
  common: {
    loading: "Loading...",
    error: "Error",
    success: "Success",
    cancel: "Cancel",
    confirm: "Confirm",
    save: "Save",
    edit: "Edit",
    delete: "Delete",
    search: "Search",
    filter: "Filter",
    clear: "Clear",
    submit: "Submit",
    reset: "Reset"
  },

  // Developing pages
  developing: {
    contractDraft: "Contract Draft feature is under development...",
    about: "About page is under development..."
  }
}; 