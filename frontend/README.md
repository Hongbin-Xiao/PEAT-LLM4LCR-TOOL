# 合同上传系统前端

这是一个基于 React + Ant Design 的合同上传系统前端项目。

## 功能特性

- 现代化的用户界面设计
- 支持拖拽上传文件
- 支持 PDF、DOCX、DOC、TXT 格式文件
- 响应式设计，适配不同屏幕尺寸
- 完整的导航栏和用户界面

## 技术栈

- React 19.1.0
- TypeScript 4.9.5
- Ant Design 5.26.6
- React Scripts 5.0.1

## 安装和运行

1. 安装依赖：

```bash
npm install
```

2. 启动开发服务器：

```bash
npm start
```

3. 构建生产版本：

```bash
npm run build
```

## 项目结构

```
src/
├── Components/
│   ├── index.tsx          # 主页面组件
│   └── UploadPage/
│       ├── UploadPage.tsx # 上传页面组件
│       └── UploadPage.css # 样式文件
├── index.tsx              # 应用入口
└── index.css              # 全局样式
```

## 主要组件

### UploadPage

- 包含完整的页面布局
- 顶部导航栏（律己 AI、LawCheck 等导航项）
- 文件上传区域（支持拖拽上传）
- 文件格式验证
- 响应式设计

## 使用说明

1. 打开应用后，您会看到顶部导航栏和主要的上传区域
2. 可以通过拖拽文件到上传区域或点击上传按钮来选择文件
3. 支持的文件格式：PDF、DOCX、DOC、TXT
4. 文件上传后会显示上传状态和结果

## 开发说明

- 组件采用函数式组件和 Hooks
- 使用 TypeScript 进行类型检查
- 样式采用 CSS 模块化设计
- 遵循 Ant Design 设计规范
