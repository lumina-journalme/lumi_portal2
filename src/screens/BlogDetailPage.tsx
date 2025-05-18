import React from 'react';
import { useParams } from 'react-router-dom';
import { Navbar } from '../components/Navbar';
import ReactMarkdown from 'react-markdown';
import fm from 'front-matter';

const blogFiles = import.meta.glob('../blogs/*.md', { query: '?raw', eager: true });

export const BlogDetailPage = () => {
  const { slug } = useParams();
  let blog = null;
  for (const path in blogFiles) {
    const raw = (blogFiles[path] as any).default as string;
    const { attributes, body } = fm(raw);
    const meta = attributes as any;
    const fileSlug = path.split('/').pop()?.replace(/\.md$/, '') || '';
    if (fileSlug === slug) {
      blog = { ...meta, body };
      break;
    }
  }

  if (!blog) {
    return (
      <div className="min-h-screen bg-gray-50">
        <Navbar />
        <div className="max-w-2xl mx-auto px-4 py-12 pt-16 text-center text-gray-500">Blog not found.</div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar />
      <div className="max-w-2xl mx-auto px-4 py-12 pt-16">
        <h1 className="text-3xl font-bold mb-2 text-[#0854e4]">{blog.title}</h1>
        <div className="flex items-center text-sm text-gray-400 gap-4 mb-6">
          <span>{blog.author}</span>
          <span>{String(blog.date).slice(0, 10)}</span>
        </div>
        <div className="prose prose-slate max-w-none bg-white rounded-xl p-6 shadow">
          <ReactMarkdown>{blog.body}</ReactMarkdown>
        </div>
      </div>
    </div>
  );
}; 