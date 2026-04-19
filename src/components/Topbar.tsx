import React, { useState, useRef, useEffect } from 'react';
import { Search, Bell, Moon, Sun } from 'lucide-react';
import { motion } from 'framer-motion';
import { useTheme } from '../ThemeContext';
import ProfileDropdown from './ProfileDropdown';
import './Topbar.css';

const Topbar: React.FC = () => {
  const { theme, toggleTheme } = useTheme();
  const [isProfileOpen, setIsProfileOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsProfileOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  return (
    <header className="topbar">
      <div className="search-container glass">
        <Search size={18} className="search-icon" />
        <input type="text" placeholder="Search architectural data..." />
        <kbd className="search-kbd">⌘K</kbd>
      </div>

      <div className="topbar-actions">
        <motion.button 
          className="icon-btn glass" 
          onClick={toggleTheme} 
          aria-label="Toggle Theme"
          whileHover={{ scale: 1.1, rotate: 15 }}
          whileTap={{ scale: 0.9 }}
        >
          {theme === 'light' ? <Moon size={20} /> : <Sun size={20} />}
        </motion.button>

        <motion.button 
          className="icon-btn glass"
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.9 }}
        >
          <Bell size={20} />
          <span className="notification-dot"></span>
        </motion.button>

        <div className="user-profile-container" ref={dropdownRef}>
          <motion.div 
            className={`user-profile glass ${isProfileOpen ? 'active' : ''}`}
            onClick={() => setIsProfileOpen(!isProfileOpen)}
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
          >
            <div className="user-info">
              <span className="user-name">Alex Sterling</span>
              <span className="user-role">Lead Architect</span>
            </div>
            <div className="avatar-wrapper">
              <img
                src="https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?auto=format&fit=facearea&facepad=2&w=256&h=256&q=80"
                alt="User Avatar"
                className="user-avatar"
              />
              <div className="status-indicator online"></div>
            </div>
          </motion.div>
          <ProfileDropdown isOpen={isProfileOpen} />
        </div>
      </div>
    </header>
  );
};

export default Topbar;


