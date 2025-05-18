import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { Navbar } from '../components/Navbar';
import fm from 'front-matter';

// Vite 支持 import.meta.glob 读取 src 目录下的 md 文件
const blogFiles = import.meta.glob('../blogs/*.md', { query: '?raw', eager: true });

interface BlogMeta {
  slug: string;
  title: string;
  author: string;
  date: string;
  summary: string;
  cover?: string;
}

export const BlogListPage = () => {
  const [blogs, setBlogs] = useState<BlogMeta[]>([]);

  useEffect(() => {
    const blogList: BlogMeta[] = [];
    for (const path in blogFiles) {
      const raw = (blogFiles[path] as any).default as string;
      const { attributes } = fm(raw);
      const meta = attributes as any;
      // slug 取文件名（去掉扩展名和路径）
      const slug = path.split('/').pop()?.replace(/\.md$/, '') || '';
      blogList.push({
        slug,
        title: meta.title || slug,
        author: meta.author || '',
        date: meta.date || '',
        summary: meta.summary || '',
        cover: meta.cover || '',
      });
    }
    // 按日期倒序
    blogList.sort((a, b) => b.date.localeCompare(a.date));
    setBlogs(blogList);
  }, []);

  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar />
      <div className="max-w-3xl mx-auto px-4 py-12 pt-16">
        {/* <h1 className="text-4xl font-bold mb-8 text-center text-[#0854e4]">Blog</h1> */}
        <div className="flex flex-col gap-8">
          {blogs.length === 0 && (
            <div className="text-center text-gray-400">No blog posts yet.</div>
          )}
          {blogs.map(blog => (
            <Link
              to={`/blog/${blog.slug}`}
              key={blog.slug}
              className="flex flex-col bg-white rounded-xl shadow hover:shadow-lg transition-shadow overflow-hidden group"
            >
              {blog.cover && (
                <img
                  src={blog.cover}
                  alt={blog.title}
                  className="w-full md:w-56 h-40 md:h-40 object-cover group-hover:scale-105 transition-transform duration-300"
                />
              )}
              <div className="flex-1 p-6 flex flex-col justify-between">
                <div>
                  <h2 className="text-2xl font-semibold text-[#0854e4] group-hover:underline mb-2">{blog.title}</h2>
                  <p className="text-gray-600 mb-4 line-clamp-2">{blog.summary}</p>
                </div>
                <div className="flex items-center text-sm text-gray-400 gap-4">
                  <span>{blog.author}</span>
                  <span>{String(blog.date).slice(0, 10)}</span>
                </div>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
}; 