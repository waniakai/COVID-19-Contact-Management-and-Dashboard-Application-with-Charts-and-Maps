import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { FaUser, FaChartBar } from 'react-icons/fa';

const Sidebar: React.FC = () => {
  const location = useLocation();

  const links = [
    { to: '/contacts', label: 'Contacts', icon: <FaUser className="mr-2" /> },
    { to: '/chartandmap', label: 'Chart', icon: <FaChartBar className="mr-2" /> },
  ];

  return (
    <aside
      className={`bg-green-200 p-4 ${
        window.innerWidth <= 640 ? 'fixed bottom-0 left-0 w-full z-50' : 'sm:w-1/4 md:w-1/5 lg:w-1/6'
      }`}
      style={{
        marginTop: '4rem',
        position: 'fixed',
        height: window.innerWidth <= 640 ? 'auto' : '100vh', // Set height to auto for mobile view
        zIndex: 50, // Set the z-index to 50 to make it on top
      }}
    >
      <ul className={`flex ${window.innerWidth <= 640 ? 'justify-between' : 'flex-col'}`}>
        {links.map((link) => (
          <li key={link.to} className={`my-2 ${window.innerWidth <= 640 ? 'flex-grow mx-2' : ''}`}>
            <Link
              to={link.to}
              className={`flex items-center shadow-lg rounded-2xl block w-full py-2 px-4 text-black-500 font-bold hover:text-gray-700 ${
                location.pathname === link.to ? 'bg-yellow-400' : 'bg-yellow-200'
              }`}
            >
              <div className={`flex items-center ${window.innerWidth <= 640 ? 'justify-center' : ''}`}>
                <span className="text-lg">{link.icon}</span>
                <span className={`ml-2 ${window.innerWidth <= 640 ? 'block' : ''}`}>{link.label}</span>
              </div>
            </Link>
          </li>
        ))}
      </ul>
    </aside>
  );
};

export default Sidebar;
