import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { Frame } from "./screens/Frame";
import { MarkdownPage } from "./screens/MarkdownPage";
import { BlogListPage } from "./screens/BlogListPage";
import { BlogDetailPage } from "./screens/BlogDetailPage";
import RedesignPage from "./screens/RedesignPage";
import { SimpleRedesignPage } from "./screens/SimpleRedesignPage";
import { ManusRedesignPage } from "./screens/ManusRedesignPage";
import { FinalRedesignPage } from "./screens/FinalRedesignPage";
import FloatingCloudVoicesPage from "./screens/FloatingCloudVoicesPage";
import { AugRedesignPage } from "./screens/AugRedesignPage";

createRoot(document.getElementById("app") as HTMLElement).render(
  <StrictMode>
    <Router>
      <Routes>
        <Route path="/" element={<Frame />} />
        <Route path="/redesign" element={<RedesignPage />} />
        <Route path="/simple-redesign" element={<SimpleRedesignPage />} />
        <Route path="/manus-redesign" element={<ManusRedesignPage />} />
        <Route path="/final-redesign" element={<FinalRedesignPage />} />
        <Route path="/:type" element={<MarkdownPage />} />
        <Route path="/blog" element={<BlogListPage />} />
        <Route path="/blog/:slug" element={<BlogDetailPage />} />
        <Route path="/cloud-voices" element={<FloatingCloudVoicesPage />} />
        <Route path="/aug-redesign" element={<AugRedesignPage />} />
      </Routes>
    </Router>
  </StrictMode>,
);