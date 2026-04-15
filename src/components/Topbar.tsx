import React from 'react';
import { Search, Bell, Settings } from 'lucide-react';
import './Topbar.css';

const Topbar: React.FC = () => {
  return (
    <header className="topbar">
      <div className="search-container">
        <Search size={18} className="text-muted" />
        <input type="text" placeholder="Search architectural data..." />
      </div>

      <div className="topbar-actions">
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
          <img 
            src="https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?auto=format&fit=facearea&facepad=2&w=256&h=256&q=80" 
            alt="User Avatar" 
            className="user-avatar" 
          />
        </div>
      </div>
    </header>
  );
};

export default Topbar;
