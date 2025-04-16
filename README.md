# Lumi Portal 2

Lumi Portal 2 是一个基于现代 Web 技术栈构建的前端项目。

## 技术栈

- **前端框架**: React 18
- **开发语言**: TypeScript
- **构建工具**: Vite
- **样式框架**: Tailwind CSS
- **UI 组件库**: 
  - Shadcn UI
  - Radix UI
- **路由**: React Router
- **图标**: Lucide React
- **后端集成**: Supabase
- **Markdown 支持**: React Markdown

## 系统要求

- Node.js (推荐使用 LTS 版本)
- npm 或 yarn

## 安装步骤

1. 克隆项目
```bash
git clone [项目地址]
cd lumi_portal2
```

2. 安装依赖
```bash
npm install
```

## 开发环境运行

```bash
npm run dev
```

开发服务器将在 http://localhost:5173 启动。

## 生产环境构建

```bash
npm run build
```

构建后的文件将位于 `dist` 目录中。

## 项目结构

```
lumi_portal2/
├── src/                # 源代码目录
│   ├── components/     # 可复用组件
│   ├── screens/        # 页面级组件
│   ├── lib/           # 工具函数和配置
│   └── index.tsx      # 应用入口
├── public/            # 静态资源
├── supabase/         # Supabase 配置
└── package.json      # 项目配置和依赖
```

## 主要依赖

- react: ^18.2.0
- react-dom: ^18.2.0
- react-router-dom: ^6.8.1
- tailwindcss: 3.4.16
- vite: 6.0.4

## 开发工具

- TypeScript
- Vite
- Tailwind CSS
- ESLint (如果配置了的话)

## 注意事项

1. 确保已正确配置 Supabase 环境变量
2. 开发时建议使用 Chrome 或 Firefox 的最新版本
3. 如果遇到依赖问题，可以尝试删除 node_modules 后重新安装

## 贡献指南

1. Fork 项目
2. 创建特性分支 (`git checkout -b feature/AmazingFeature`)
3. 提交更改 (`git commit -m 'Add some AmazingFeature'`)
4. 推送到分支 (`git push origin feature/AmazingFeature`)
5. 创建 Pull Request

## 许可证

[在此添加许可证信息]
