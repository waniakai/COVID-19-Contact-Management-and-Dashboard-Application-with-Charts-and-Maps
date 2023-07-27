import React from 'react';
import { FaLinkedin } from 'react-icons/fa';

const Header: React.FC = () => {
  return (
    <header className="bg-green-500 p-4 text-white flex flex-col justify-center items-center sm:flex-row sm:justify-between fixed top-0 left-0 w-full z-50">
      <h1 className="text-2xl text-black font-bold mb-2 sm:mb-0">Contacts Management App</h1>
      <a
        href="https://www.linkedin.com/in/wanbiangmi-iakai-673613185/"
        target="_blank"
        rel="noopener noreferrer"
        className="text-white flex items-center gap-2 transition-colors hover:text-blue-400"
      >
        <p className="hidden sm:block">Click to visit my LinkedIn Profile</p>
        <FaLinkedin className="w-6 h-6" /> {/* Adjust the size with w-* and h-* classes */}
      </a>
    </header>
  );
};

export default Header;
