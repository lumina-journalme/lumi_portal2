# Lumina官方网站开发计划

## 一、项目概述

**需求**：
- 创建类似苹果官网风格的公司官网
- 展示团队和产品信息
- 提供iOS App Store链接
- 提供邮件注册waitlist功能  
- 实现精美滚动动画效果
- 适配PC和移动端设备
- 成本控制在最低水平

**设计参考**：已有Figma设计稿，包含UI元素、动画指引和色彩方案

## 二、技术选型

### 前端技术栈
- **核心框架**：Next.js (静态导出)
  - 理由：组件化开发，SEO友好，可静态导出
  
- **样式解决方案**：Tailwind CSS
  - 理由：快速开发，响应式设计，体积小

- **动画实现**：
  - GSAP (主要滚动动画)
  - Framer Motion (组件过渡效果)
  - 理由：专业动画效果，性能优化，易于实现视差效果

### 部署方案
- **代码托管**：GitHub (团队已有GitHub Team账户)
- **网站托管**：GitHub Pages (免费)
- **CDN加速**：Cloudflare (免费)
- **域名**：现有GoDaddy域名

### 表单/Waitlist解决方案
- **方案一**：Tally (免费额度内)
- **方案二**：Netlify Forms (如选择Netlify部署)

## 三、确认项目清单

- [x] 确认使用现有GoDaddy域名
- [x] 确认使用GitHub Pages + Cloudflare方案（不需要AWS）
- [x] 确认前端技术栈为Next.js + Tailwind CSS + GSAP
- [ ] 确认网站内容和结构
- [ ] 确认表单收集方案
- [ ] 确认团队中是否有前端开发人员，或需要外部资源
- [ ] 确认开发和发布时间线

## 四、开发计划

### 阶段一：环境搭建（1-2天）
1. 创建GitHub仓库
2. 设置Next.js项目
3. 配置Tailwind CSS
4. 配置GitHub Actions自动部署

### 阶段二：核心开发（1-2周）
1. 创建基础页面结构和布局
2. 实现响应式设计
3. 开发主要页面组件
4. 集成动画效果
   - 滚动视差效果
   - 元素淡入淡出
   - 数据可视化动画

### 阶段三：优化与测试（3-5天）
1. 性能优化
   - 图片优化
   - 代码分割
   - 动画性能优化
2. 跨浏览器测试
3. 移动端兼容性测试
4. 页面加载速度优化

### 阶段四：部署上线（1-2天）
1. 设置Cloudflare DNS
2. 配置GitHub Pages
3. 设置自定义域名
4. 配置SSL证书

## 六、成本分析

### 必要支出
- GoDaddy域名年费：约 $10-20/年（取决于TLD）

### 免费服务
- GitHub Pages：免费（有100GB/月流量限制）
- Cloudflare CDN：免费
- Cloudflare DNS：免费
- 表单收集服务：免费方案可选

### 预计总成本
- 初期：仅域名年费
- 长期：如流量增长，可能需要考虑升级方案

## 七、资源与参考

### 学习资源
- [Next.js官方文档](https://nextjs.org/docs)
- [Tailwind CSS文档](https://tailwindcss.com/docs)
- [GSAP ScrollTrigger教程](https://greensock.com/scrolltrigger/)

### 动画参考
- [Apple.com](https://www.apple.com/)
- [Stripe.com](https://stripe.com/)

## 八、下一步行动
1. 确认技术栈与部署方案
2. 准备开发环境
3. 细化网站结构和内容
4. 开始基础结构开发

---

*注：此计划基于当前讨论和需求，可能需要根据后续反馈进行调整。*
