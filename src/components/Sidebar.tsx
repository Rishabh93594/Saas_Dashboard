import React, { useState } from 'react';
import { 
  LayoutDashboard, 
  BarChart3, 
  Users, 
  FolderLock, 
  FileText, 
  HelpCircle, 
  LogOut,
  ChevronRight
} from 'lucide-react';
import './Sidebar.css';

const Sidebar: React.FC = () => {
  const [activeItem, setActiveItem] = useState('Dashboard');

  const navItems = [
    { name: 'Dashboard', icon: <LayoutDashboard size={20} /> },
    { name: 'Analytics', icon: <BarChart3 size={20} /> },
    { name: 'Team', icon: <Users size={20} /> },
    { name: 'Projects', icon: <FolderLock size={20} /> },
    { name: 'Reports', icon: <FileText size={20} /> },
  ];

  const footerItems = [
    { name: 'Help', icon: <HelpCircle size={20} /> },
    { name: 'Logout', icon: <LogOut size={20} /> },
  ];

  return (
    <aside className="sidebar glass">
      <div className="sidebar-logo">
        <div className="logo-icon">
          <div className="icon-inner"></div>
        </div>
        <div className="logo-text">
          <h1>Architect</h1>
          <span>Admin Console</span>
        </div>
      </div>

      <nav className="sidebar-nav">
        <div className="nav-section">
          <span className="nav-label">Main Menu</span>
          <ul className="nav-list">
            {navItems.map((item) => (
              <li 
                key={item.name}
                className={`nav-item ${activeItem === item.name ? 'active' : ''}`}
                onClick={() => setActiveItem(item.name)}
              >
                <div className="nav-icon">{item.icon}</div>
                <span className="nav-text">{item.name}</span>
                {activeItem === item.name && <ChevronRight size={14} className="active-arrow" />}
                <div className="active-pill"></div>
              </li>
            ))}
          </ul>
        </div>
      </nav>

      <div className="sidebar-footer">
        <ul className="nav-list secondary">
          {footerItems.map((item) => (
            <li 
              key={item.name}
              className={`nav-item ${activeItem === item.name ? 'active' : ''}`}
              onClick={() => setActiveItem(item.name)}
            >
              <div className="nav-icon">{item.icon}</div>
              <span className="nav-text">{item.name}</span>
            </li>
          ))}
        </ul>
        
        <div className="pro-badge glass">
          <div className="pro-badge-content">
            <span className="badge-title">Pro Plan</span>
            <span className="badge-desc">Unlock advanced tools</span>
          </div>
          <button className="badge-btn">Upgrade</button>
        </div>
      </div>
    </aside>
  );
};

export default Sidebar;
