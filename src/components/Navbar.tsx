import React from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';

interface NavbarProps {
  onJoinWaitlistClick?: () => void;
  backgroundColor?: string;
}

export const Navbar = ({ onJoinWaitlistClick, backgroundColor }: NavbarProps) => {
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
    <header className={`fixed top-0 left-0 w-full flex items-center px-4 py-4 sm:px-9 shadow-md z-50 ${backgroundColor ? backgroundColor : 'bg-[#0854e4]'}`}>
      <div className="flex items-center justify-between w-full">
        <Link to="/" className="flex items-center gap-2" onClick={handleHomeClick}>
          <img
            className="w-24 h-8 sm:w-32 sm:h-10 object-contain"
            alt="Lumi"
            src="https://assets.lumime.ai/primary_icon_1.png"
          />
        </Link>
        <div className="flex items-center gap-4">
          <Link
            to="/blog"
            className={`px-4 py-2 rounded-lg font-semibold text-base transition-all hover:underline ${backgroundColor ? 'text-[#6EC7FF]' : 'text-white'}`}
          >
            Blog
          </Link>
          {onJoinWaitlistClick && (
            <button
              onClick={onJoinWaitlistClick}
              className="px-4 py-2 bg-white text-[#0854e4] rounded-lg font-semibold text-base shadow hover:bg-gray-100 transition-all"
            >
              Join Waitlist
            </button>
          )}
        </div>
      </div>
    </header>
  );
};