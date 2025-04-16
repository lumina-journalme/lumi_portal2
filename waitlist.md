# 使用 GitHub Issues 的 Waitlist 解决方案

本文档概述了使用 GitHub Issues 作为后端来收集 Waitlist 注册信息的解决方案，旨在确保安全性和成本效益。

## 1. 方案概述

本方案不依赖第三方服务或复杂的后端基础设施，而是利用了 GitHub 的内置功能：

*   **前端:** 部署在 GitHub Pages 上的现有 React 应用展示 Waitlist 表单。
*   **后端/数据存储:** 使用一个**私有** GitHub 仓库，每次 Waitlist 提交都作为单独的 GitHub Issue 存储。
*   **自动化:** GitHub Actions 自动化处理表单提交后创建这些 Issue 的过程。

这种方法将 Waitlist 数据安全地保存在你控制的私有仓库中，并利用了 GitHub 对公共仓库的免费额度。

## 2. 工作原理

流程如下：

1.  **用户提交表单:** 用户在实时网站（托管于 GitHub Pages）上填写 Waitlist 表单。
2.  **前端发送事件:** 前端 JavaScript 代码（使用在构建过程中注入的特定 GitHub 个人访问令牌 PAT，即 `VITE_GITHUB_TOKEN`）向托管网站代码的**公共** GitHub 仓库（例如 `你的用户名/你的公共仓库名`）发送一个 `repository_dispatch` 事件。此事件包含提交的表单数据（姓名、邮箱、电话）作为 payload。
3.  **触发 GitHub Action:** `repository_dispatch` 事件触发在**公共**仓库中定义的 `waitlist.yml` 工作流。此工作流运行使用的是分配给公共仓库的**免费 Actions 分钟数**。
4.  **创建 Issue:** `waitlist.yml` 工作流使用相同的 PAT（在 Action 环境中通过 GitHub Secrets `secrets.WAITLIST_TOKEN` 访问）和私有仓库名称（通过 `secrets.WAITLIST_REPO` 访问，例如 `你的用户名/你的私有仓库名`）向 GitHub API 进行身份验证。
5.  **存储数据:** 工作流执行 `gh issue create` 命令，在**私有**仓库（`你的用户名/你的私有仓库名`）中创建一个新的 Issue。Issue 的正文包含从事件 payload 中提取的姓名、邮箱和电话号码。

## 3. 安全性考虑

*   **私有仓库:** Waitlist 数据（Issues）存储在一个**私有**仓库中，只有你授权的协作者可以访问。
*   **个人访问令牌 (PAT):** 使用具有最低所需权限的 PAT (`WAITLIST_TOKEN`)（例如，触发 `repository_dispatch` 的 `repo` 范围以及对私有仓库的 `issues:write` 权限）。
*   **GitHub Secrets:** PAT 和私有仓库名称作为 **Secrets** 存储在公共仓库的 GitHub 设置中。它们在运行时被注入到 Actions 环境中，**不会**直接暴露在代码或日志中。
*   **前端 Token:** 虽然 PAT 被注入到前端构建中 (`VITE_GITHUB_TOKEN`)，但它仅用于发送 `repository_dispatch` 事件。如果暴露，它不会授予对你账户的广泛访问权限，但仍应谨慎对待（使用最低所需权限有助于降低风险）。

## 4. 局限性

*   **依赖 GitHub:** 该解决方案完全依赖于 GitHub Actions 和 GitHub Issues 的可用性。服务中断可能会暂时影响提交或数据访问。
*   **PAT 管理:** PAT 可能过期或被意外撤销，这将导致工作流中断。可能需要定期检查或使用无过期时间的 Fine-Grained PAT。
*   **速率限制:** 虽然额度很宽松，但 GitHub API 和 Actions 存在速率限制。极高的提交量（例如 DDoS 攻击）可能会达到这些限制，尽管对于典型的 Waitlist 使用来说不太可能。
*   **数据导出:** 导出数据需要手动步骤或编写脚本（见下文）。它不像查询数据库那样直接。
*   **异步性:** 由于 Actions 工作流的执行时间，从表单提交到 Issue 出现在私有仓库之间存在轻微延迟。
*   **基本存储:** GitHub Issues 提供基本的文本存储。与专用数据库或 CRM 相比，直接在 GitHub Issues 中进行复杂查询、过滤或数据分析受到限制。

## 5. 如何导出 Waitlist 数据 (Issues)

1.  **导航到私有仓库:** 访问你的**私有**仓库的 GitHub 页面（例如 `https://github.com/你的用户名/你的私有仓库名`）。
2.  **转到 Issues 标签页:** 点击 “Issues” 标签页。
3.  **查看数据:** 你将看到提交列表，每个 Issue 的标题表明提交日期，正文包含用户详细信息。
4.  **手动导出 (简单):** 对于少量条目，你可以手动从 Issue 正文中复制和粘贴信息。
5.  **通过 GitHub CLI 导出 (推荐用于较大数据量):**
    *   安装 GitHub CLI (`gh`)。
    *   验证 CLI (`gh auth login`)。
    *   在终端中运行以下命令（替换占位符）：
        ```bash
        gh issue list --repo 你的用户名/你的私有仓库名 --limit 1000 --json title,body --jq '.[] | {title: .title, name: (.body | capture("Name: (?<name>.*)") | .name), email: (.body | capture("Email: (?<email>.*)") | .email), phone: (.body | capture("Phone: (?<phone>.*)") | .phone)}' > waitlist_export.json
        ```
        *   此命令获取最多 1000 个 Issue，提取标题和正文，使用 `jq` 从正文中解析姓名、邮箱和电话（假设格式为 “Name: ...\nEmail: ...\nPhone: ...”），并将结构化数据保存到 `waitlist_export.json` 文件中。你可能需要根据确切的正文格式和 Issue 数量调整 `--limit` 和 `jq` 查询。
    *   或者，导出原始正文内容：
        ```bash
        gh issue list --repo 你的用户名/你的私有仓库名 --limit 1000 --json body -q '.[].body' > waitlist_export.txt
        ```
        这将仅将每个 Issue 的正文内容导出到一个文本文件，然后你可以手动或使用其他脚本进行解析。

## 6. 成本

该解决方案旨在在 GitHub 的**免费套餐**内运行：

*   `waitlist.yml` 使用的 GitHub Actions 分钟数消耗自**公共**仓库的**无限**免费分钟数。
*   在私有仓库中将数据存储为 Issues 是**免费**的。
*   `repository_dispatch` 的 API 请求在正常使用情况下符合免费套餐宽松的速率限制。

因此，这种 Waitlist 收集方法不应产生任何来自 GitHub 的直接费用。 