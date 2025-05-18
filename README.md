# Lumi Portal 2

Lumi Portal 2 是一个基于现代 Web 技术栈构建的前端项目，主打情绪陪伴与 waitlist 收集。

## 技术栈

- **前端框架**: React 18
- **开发语言**: TypeScript
- **构建工具**: Vite
- **样式框架**: Tailwind CSS
- **UI 组件库**:
  - Shadcn UI（基于 Radix UI）
  - Radix UI
  - Lucide React（图标）
  - class-variance-authority、tailwind-merge（样式工具）
- **路由**: React Router
- **Markdown 支持**: React Markdown + remark-gfm
- **自定义 API**: Deno Edge Functions（可选，当前未集成）

## 目录结构

```
lumi_portal2/
├── src/                # 源代码目录
│   ├── components/     # 可复用组件
│   │   └── ui/         # UI 原子组件（Button, Dialog, Input, Card 等）
│   ├── screens/        # 页面级组件
│   ├── lib/            # 工具函数和配置
│   └── index.tsx       # 应用入口
├── public/             # 静态资源（图片、svg、md 文件等）
├── docs/               # 文档
├── package.json        # 项目配置和依赖
├── vite.config.ts      # Vite 配置
└── ...
```

## 安装与本地开发

1. 克隆项目
```bash
git clone [项目地址]
cd lumi_portal2
```
2. 安装依赖
```bash
npm install
```
3. 启动开发环境
```bash
npm run dev
```
开发服务器将在 http://localhost:5173 启动。

## 生产环境构建

```bash
npm run build
```
构建后的文件将位于 `dist` 目录中。

## 部署

- 本项目已配置 GitHub Actions 自动部署到 GitHub Pages。
- 详见 `.github/workflows/` 目录下的 CI 配置。

## 主要依赖

- react: ^18.2.0
- react-dom: ^18.2.0
- react-router-dom: ^6.8.1
- tailwindcss: 3.4.16
- vite: 6.0.4
- shadcn/ui, radix-ui, lucide-react, class-variance-authority, tailwind-merge, react-markdown, remark-gfm, github-markdown-css 等

## 注意事项

1. 前端无需配置任何后端环境变量。
2. 开发时建议使用 Chrome 或 Firefox 的最新版本。
3. 如果遇到依赖问题，可以尝试删除 node_modules 后重新安装。

## 贡献指南

1. Fork 项目
2. 创建特性分支 (`git checkout -b feature/AmazingFeature`)
3. 提交更改 (`git commit -m 'Add some AmazingFeature'`)
4. 推送到分支 (`git push origin feature/AmazingFeature`)
5. 创建 Pull Request

## 许可证

[在此添加许可证信息]

## 博客（Blog）内容录入与管理

### 如何写博客

1. **每篇博客为一个 Markdown 文件**，放在 `src/blogs/` 目录下，文件名建议格式为：
   
   ```
   src/blogs/YYYY-MM-DD-slug.md
   ```
   例如：`src/blogs/2025-05-18-hello-world.md`

2. **每个 Markdown 须包含 YAML frontmatter**，示例：
   
   ```markdown
   ---
   title: 博客标题（必填）
   author: 作者（建议填写）
   date: 2025-05-18  # 建议用 YYYY-MM-DD
   summary: 博客摘要（建议填写，显示在列表页）
   cover: /path/to/cover.jpg  # 可选，封面图片（如无可省略）
   ---

   正文内容支持标准 Markdown 语法。
   ```

3. **图片引用**
   - 推荐将图片放在 `public/blogs/` 或其它静态目录，frontmatter 里的 `cover` 字段用绝对路径（如 `/blogs/cover1.jpg`）。
   - 正文内图片同理：`![描述](/blogs/cover1.jpg)`

4. **自动上线**
   - 只需将 `.md` 文件放入 `src/blogs/`，保存后前端会自动读取并渲染，无需重启或手动刷新。
   - 增删改博客都只需操作 markdown 文件。

5. **注意事项**
   - `date` 字段建议用 `YYYY-MM-DD`，否则排序或显示可能异常。
   - **强烈建议：`date` 字段必须加英文引号（如 `date: "2025-05-19"`），否则可能被解析为非字符串，导致前端报错。**
   - 没有 `cover` 字段的博客不会显示封面图。
   - 列表页和详情页均自动解析 frontmatter，无需额外配置。

---
