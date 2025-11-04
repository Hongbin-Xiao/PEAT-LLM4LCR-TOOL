# PEAT-LLM4LCR: Chinese Legal Contract Automatic Review Tool

[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)
[![Python](https://img.shields.io/badge/python-v3.10+-blue.svg)](https://www.python.org/downloads/)
[![Node.js](https://img.shields.io/badge/node.js-v16+-green.svg)](https://nodejs.org/)

> **PEAT-LLM4LCR** (Prompt Engineering and Agent Technology with Large Language Models for Legal Contract Review) is the first comprehensive automated contract review solution specifically designed for Chinese legal documents, integrating prompt engineering with multi-agent collaboration technology.

## 🎥 Demo

Watch our demonstration video: [YouTube Demo](https://www.youtube.com/watch?v=eyIikQDkv0E)

<img width="1873" height="884" alt="main png" src="https://github.com/user-attachments/assets/ef97fe69-5873-4d56-8207-e3ad5dacbc49" />



## 🎯 Key Features

- **🔍 Multi-dimensional Analysis**: Three core modules for essential elements review, high-risk clause identification, and intellectual property evaluation
- **🤖 AI-Powered Intelligence**: Natural language interaction with intelligent contract analysis
- **📊 Structured Reports**: Comprehensive risk assessment with actionable modification recommendations
- **🌐 Multi-format Support**: Process DOCX, DOC, and TXT contract documents
- **🎨 User-friendly Interface**: Intuitive web interface built with React and Ant Design
- **🔧 Template Library**: Rich collection of standard contract templates across multiple domains

## 📈 Performance Metrics

- **34% efficiency improvement** compared to traditional manual review methods
- **50% accuracy enhancement** in recommendation quality
- Supports both **Chinese and English** contract processing
- Tested across **3 expertise levels** with **6 participants**

## 🏗️ Architecture Overview

<img width="1864" height="1474" alt="softwareX图片_01" src="https://github.com/user-attachments/assets/28c85429-e466-4c3a-ae90-1ce54c6802ef" />



## 🚀 Quick Start

<img width="2529" height="1037" alt="flow_01" src="https://github.com/user-attachments/assets/04088afa-8a7c-422b-9dca-bdd32e7ef930" />



### Prerequisites

- Python ≥ 3.10
- Node.js ≥ 16
- OpenAI API Key

### Installation

1. **Clone the repository**
   ```bash
   git clone https://github.com/Hongbin-Xiao/PEAT-LLM4LCR-TOOL.git
   cd PEAT-LLM4LCR-TOOL
   ```

2. **Backend Setup**
   ```bash
   # Install Python dependencies
   pip install fastapi uvicorn openai langchain pydantic

   # Set up environment variables
   export OPENAI_API_KEY="your-api-key-here"

   # Start the backend server
   uvicorn main:app --reload
   ```

3. **Frontend Setup**
   ```bash
   # Navigate to frontend directory
   cd frontend

   # Install Node.js dependencies
   npm install

   # Start the development server
   npm start
   ```



## 📋 Core Modules

### 1. Essential Element Review
- Contract subject standardization
- Invoice types validation
- Acceptance matters verification
- Party information compliance

### 2. High-Risk Clause Identification
- Performance location analysis
- Breach responsibility assessment
- Dispute resolution clauses
- Payment and delivery terms

### 3. Intellectual Property Review
- IP ownership agreements
- Patent and trademark clauses
- Confidentiality provisions
- Technology transfer terms

## 🎯 Target Users

- **Legal Professionals**: Lawyers, in-house counsel, legal consultants
- **Business Stakeholders**: Procurement, operations, contract managers
- **SMEs**: Small-medium enterprises with limited legal resources

## 📊 Evaluation Results

| User Group | Quality Score (No Tool) | Quality Score (With Tool) | Time Improvement |
|------------|-------------------------|---------------------------|------------------|
| Novice     | 0/5 cases ≥2 points    | 5/5 cases ≥2 points     | Significant      |
| Professional| 2/5 cases ≥2 points   | 4/5 cases ≥3 points     | Moderate         |
| Expert     | 5/5 cases = 4 points   | 5/5 cases = 4 points    | 34% faster       |

## 🛠️ Technology Stack

**Backend:**
- FastAPI (Web framework)
- LangChain (LLM orchestration)
- OpenAI API/SDK
- Pydantic (Data validation)
- Uvicorn (ASGI server)

**Frontend:**
- React (UI framework)
- TypeScript (Type safety)
- Ant Design (UI components)
- HTML5/CSS3

## 📖 Documentation

- [Installation Guide](docs/installation.md)
- [API Documentation](docs/api.md)
- [User Manual](docs/user-guide.md)
- [Developer Guide](docs/development.md)



## 🤝 Contributing

We welcome contributions! Please see our [Contributing Guidelines](CONTRIBUTING.md) for details.

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 📞 Contact & Support

- **Email**: hongbinxiao@stu.gxnu.edu.cn
- **Issues**: [GitHub Issues](https://github.com/Hongbin-Xiao/PEAT-LLM4LCR-TOOL/issues)
- **Discussions**: [GitHub Discussions](https://github.com/Hongbin-Xiao/PEAT-LLM4LCR-TOOL/discussions)

## 🏆 Acknowledgments

This work was supported by:
- National Natural Science Foundation of China (Grant No.62362006)
- Guangxi Science and Technology Program (Grant No.GuiKeAB24010343)
- Guangxi Graduate Education Innovation Project (Grant No.XYCBZ2024024)

Special thanks to all professionals who participated in evaluating our research tool.

## 📚 Citation

If you use this tool in your research, please cite:

```bibtex
@article{xiao2025peat,
  title={PEAT-LLM4LCR: Chinese Legal Contract Automatic Review Tool Integrating Prompt Engineering and Agent Technology},
  author={Xiao, Hongbin and Tan, Shuru and Liu, Wanglong and Li, Ye and Zhou, Xin and Li, Zhi and Xie, Xiaolan},
  journal={SoftwareX},
  year={2025}
}
```

---

<div align="center">
  <strong>Made with ❤️ for the Legal Technology Community</strong>
</div>
