import React, { useEffect, useState } from 'react';
import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';
import { useParams, Link } from 'react-router-dom';
import 'github-markdown-css/github-markdown-light.css';
import { Navbar } from '../components/Navbar';

const MARKDOWN_TYPES = ['privacy-policy', 'terms-of-service'];

export const MarkdownPage = () => {
  const [content, setContent] = useState('');
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(true);
  const { type } = useParams();
  
  useEffect(() => {
    const fetchContent = async () => {
      try {
        setIsLoading(true);
        setError('');
        
        if (!type || !MARKDOWN_TYPES.includes(type)) {
          throw new Error('Invalid page type');
        }

        const fileName = type === 'terms-of-service' ? 'term_of_use.md' : 'privacy_policy.md';
        const response = await fetch(`/${fileName}`);

        if (!response.ok) {
          throw new Error(`Failed to load content (HTTP ${response.status})`);
        }
        
        const content = await response.text();
        setContent(content);
      } catch (err) {
        console.error('Error details:', err);
        setError('Unable to load the content. Please try again later.');
      } finally {
        setIsLoading(false);
      }
    };
    
    fetchContent();
  }, [type]);

  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar />
      <div className="container mx-auto px-4 py-8 pt-16">
        <div className="bg-white rounded-lg shadow-sm p-8">
          <article className="prose prose-slate max-w-none markdown-body">
            {isLoading && (
              <div className="text-gray-600 animate-pulse">Loading...</div>
            )}
            {error && (
              <div className="text-red-600 bg-red-50 p-4 rounded-md">{error}</div>
            )}
            {!isLoading && !error && (
              <ReactMarkdown 
                remarkPlugins={[remarkGfm]}
                components={{
                  h1: ({node, ...props}) => <h1 className="text-3xl font-bold mb-6" {...props} />,
                  h2: ({node, ...props}) => <h2 className="text-2xl font-bold mt-8 mb-4" {...props} />,
                  h3: ({node, ...props}) => <h3 className="text-xl font-bold mt-6 mb-3" {...props} />,
                  p: ({node, ...props}) => <p className="mb-4 leading-relaxed" {...props} />,
                  ul: ({node, ...props}) => <ul className="list-disc pl-6 mb-4" {...props} />,
                  ol: ({node, ...props}) => <ol className="list-decimal pl-6 mb-4" {...props} />,
                  li: ({node, ...props}) => <li className="mb-2" {...props} />,
                  a: ({node, ...props}) => (
                    <a 
                      className="text-blue-600 hover:text-blue-800 underline" 
                      target="_blank"
                      rel="noopener noreferrer"
                      {...props} 
                    />
                  ),
                }}
              >
                {content}
              </ReactMarkdown>
            )}
          </article>
        </div>
      </div>
    </div>
  );
};