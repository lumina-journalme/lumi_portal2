import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { Frame } from "./screens/Frame";
import { MarkdownPage } from "./screens/MarkdownPage";
import { BlogListPage } from "./screens/BlogListPage";
import { BlogDetailPage } from "./screens/BlogDetailPage";

createRoot(document.getElementById("app") as HTMLElement).render(
  <StrictMode>
    <Router>
      <Routes>
        <Route path="/" element={<Frame />} />
        <Route path="/:type" element={<MarkdownPage />} />
        <Route path="/blog" element={<BlogListPage />} />
        <Route path="/blog/:slug" element={<BlogDetailPage />} />
      </Routes>
    </Router>
  </StrictMode>,
);