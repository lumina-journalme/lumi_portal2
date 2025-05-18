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
    <header className="fixed top-0 left-0 w-full h-[60px] flex items-center px-4 sm:px-9 bg-[#0854e4] shadow-md z-50">
      <div className="flex items-center gap-4 w-full">
        <Link to="/" className="flex items-center gap-2">
          <img
            className="w-24 h-8 sm:w-32 sm:h-10 object-contain"
            alt="Lumi"
            src="https://assets.lumime.ai/primary_icon_1.png"
          />
        </Link>
        <a
          href="/"
          onClick={handleHomeClick}
          className="ml-4 px-4 py-2 bg-white text-[#0854e4] rounded-lg font-semibold text-base shadow hover:bg-gray-100 transition-all"
        >
          Home
        </a>
        <Link
          to="/blog"
          className="ml-2 px-4 py-2 bg-white text-[#0854e4] rounded-lg font-semibold text-base shadow hover:bg-gray-100 transition-all"
        >
          Blog
        </Link>
      </div>
    </header>
  );
}; 