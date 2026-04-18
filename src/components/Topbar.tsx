import React from 'react';
import { Search, Bell, Settings, Moon, Sun } from 'lucide-react';
import { useTheme } from '../ThemeContext';
import './Topbar.css';

const Topbar: React.FC = () => {
  const { theme, toggleTheme } = useTheme();

  return (
    <header className="topbar">
      <div className="search-container">
        <Search size={18} className="search-icon" />
        <input type="text" placeholder="Search architectural data..." />
        <kbd className="search-kbd">⌘K</kbd>
      </div>

      <div className="topbar-actions">
        <button className="icon-btn" onClick={toggleTheme} aria-label="Toggle Theme">
          {theme === 'light' ? <Moon size={20} /> : <Sun size={20} />}
        </button>

        <button className="icon-btn">
          <Bell size={20} />
          <span className="notification-dot"></span>
        </button>

        <button className="icon-btn">
          <Settings size={20} />
        </button>

        <div className="user-profile">
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
        </div>
      </div>
    </header>
  );
};

export default Topbar;


