'use client';

import { useState } from 'react';
import Link from 'next/link';
import { Menu, X, Home, User, Settings, Info, Grid } from 'lucide-react';

const Sidebar = ({ onToggle }: { onToggle: (isOpen: boolean) => void }) => {
  const [isOpen, setIsOpen] = useState(false);

  const handleToggle = () => {
    setIsOpen(!isOpen);
    onToggle(!isOpen);
  };

  return (
    <div className=" ">
      {/* Sidebar Toggle Button */}
      <button 
        className="p-2 m-4 text-gray-700 rounded-md focus:outline-none focus:ring-2 focus:ring-gray-500"
        onClick={handleToggle}
      >
        {isOpen ? <X size={24} /> : <Menu size={24} />}
      </button>
      
      {/* Sidebar */}
      <div className={`fixed left-0 top-0 h-full bg-gray-900 text-white w-64 p-5 transform ${isOpen ? 'translate-x-0' : '-translate-x-full'} transition-transform duration-300 ease-in-out`}> 
        <h2 className="flex gap-5 text-lg font-semibold mb-6">
          Chat Sidebar 
          <X className="cursor-pointer" onClick={handleToggle} />
        </h2>
        <nav className="flex flex-col space-y-4">
          <Link href="/">
            <span className="flex items-center p-2 hover:bg-gray-700 rounded-md cursor-pointer">
              <Home size={20} className="mr-3" /> Home
            </span>
          </Link>
          <Link href="/profile">
            <span className="flex items-center p-2 hover:bg-gray-700 rounded-md cursor-pointer">
              <User size={20} className="mr-3" /> Profile
            </span>
          </Link>
          <Link href="/settings">
            <span className="flex items-center p-2 hover:bg-gray-700 rounded-md cursor-pointer">
              <Settings size={20} className="mr-3" /> Settings
            </span>
          </Link>
          <Link href="/about">
            <span className="flex items-center p-2 hover:bg-gray-700 rounded-md cursor-pointer">
              <Info size={20} className="mr-3" /> About
            </span>
          </Link>
          <Link href="/about">
            <span className="flex items-center p-2 hover:bg-gray-700 rounded-md cursor-pointer">
              <Grid size={20} className="mr-3" /> Dashboard
            </span>
          </Link>
        </nav>
      </div>
    
    </div>
  );
};

export default Sidebar;
