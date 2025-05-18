import React from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';

export const Navbar = () => {
  const location = useLocation();
  const navigate = useNavigate();

  const handleHomeClick = (e: React.MouseEvent) => {
    if (location.pathname === '/') {
      e.preventDefault();
      window.scrollTo({ top: 0, behavior: 'smooth' });
    } else {
      navigate('/');
    }
  };

  return (
    <header className="fixed top-0 left-0 w-full h-[60px] flex items-center px-4 sm:px-9 bg-white border-b z-50">
      <div className="flex items-center gap-8 w-full">
        <Link to="/" className="flex items-center gap-2">
          <img
            className="w-24 h-8 sm:w-32 sm:h-10 object-contain"
            alt="Lumi"
            src="https://assets.lumime.ai/primary_icon_1.png"
          />
        </Link>
        <nav className="flex gap-6 ml-6">
          <a
            href="/"
            onClick={handleHomeClick}
            className="px-3 py-1 text-[15px] font-normal text-gray-800 bg-transparent rounded hover:bg-gray-100 hover:text-black transition duration-150 cursor-pointer select-none outline-none focus:bg-gray-200"
          >
            Home
          </a>
          <Link
            to="/blog"
            className="px-3 py-1 text-[15px] font-normal text-gray-800 bg-transparent rounded hover:bg-gray-100 hover:text-black transition duration-150 cursor-pointer select-none outline-none focus:bg-gray-200"
          >
            Blog
          </Link>
        </nav>
      </div>
    </header>
  );
}; 