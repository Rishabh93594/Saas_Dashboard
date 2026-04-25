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
import { motion } from 'framer-motion';
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
        <motion.div 
          className="logo-icon"
          whileHover={{ rotate: 180 }}
          transition={{ duration: 0.5 }}
        >
          <div className="icon-inner"></div>
        </motion.div>
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
              <motion.li 
                key={item.name}
                className={`nav-item ${activeItem === item.name ? 'active' : ''}`}
                onClick={() => setActiveItem(item.name)}
                whileHover={{ x: 5 }}
                whileTap={{ scale: 0.98 }}
              >
                <div className="nav-icon">{item.icon}</div>
                <span className="nav-text">{item.name}</span>
                {activeItem === item.name && (
                  <motion.div 
                    layoutId="active-pill"
                    className="active-pill"
                    transition={{ type: "spring", stiffness: 300, damping: 30 }}
                  />
                )}
                {activeItem === item.name && <ChevronRight size={14} className="active-arrow" />}
              </motion.li>
            ))}
          </ul>
        </div>
      </nav>

      <div className="sidebar-footer">
        <ul className="nav-list secondary">
          {footerItems.map((item) => (
            <motion.li 
              key={item.name}
              className={`nav-item ${activeItem === item.name ? 'active' : ''}`}
              onClick={() => setActiveItem(item.name)}
              whileHover={{ x: 5 }}
            >
              <div className="nav-icon">{item.icon}</div>
              <span className="nav-text">{item.name}</span>
            </motion.li>
          ))}
        </ul>
        
        <motion.div 
          className="pro-badge glass"
          whileHover={{ y: -5 }}
        >
          <div className="pro-badge-content">
            <span className="badge-title">Pro Plan</span>
            <span className="badge-desc">Unlock advanced tools</span>
          </div>
          <button className="badge-btn">Upgrade</button>
        </motion.div>
      </div>
    </aside>
  );
};

export default Sidebar;
