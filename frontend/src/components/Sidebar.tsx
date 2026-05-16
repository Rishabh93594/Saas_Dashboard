import React from 'react';
import { 
  LayoutDashboard, 
  BarChart3, 
  Users, 
  FolderLock, 
  FileText, 
  CreditCard,
  HelpCircle, 
  LogOut,
  ChevronRight
} from 'lucide-react';
import { motion } from 'framer-motion';
import { useNavigate, useLocation } from 'react-router-dom';
import './Sidebar.css';

const Sidebar: React.FC = () => {
  const navigate = useNavigate();
  const location = useLocation();

  // Helper to determine if a route is active
  const isActive = (path: string) => location.pathname === path;

  const navItems = [
    { name: 'Dashboard', path: '/', icon: <LayoutDashboard size={20} /> },
    { name: 'Analytics', path: '#', icon: <BarChart3 size={20} /> },
    { name: 'Team', path: '#', icon: <Users size={20} /> },
    { name: 'Projects', path: '/projects', icon: <FolderLock size={20} /> },
    { name: 'Billing', path: '/billing', icon: <CreditCard size={20} /> },
  ];

  const footerItems = [
    { name: 'Reports', path: '#', icon: <FileText size={20} /> },
    { name: 'Help', path: '#', icon: <HelpCircle size={20} /> },
  ];

  const handleNav = (path: string) => {
    if (path !== '#') {
      navigate(path);
    }
  };

  return (
    <aside className="sidebar glass">
      <div className="sidebar-logo" onClick={() => navigate('/')} style={{ cursor: 'pointer' }}>
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
                className={`nav-item ${isActive(item.path) && item.path !== '#' ? 'active' : ''}`}
                onClick={() => handleNav(item.path)}
                whileHover={{ x: 5 }}
                whileTap={{ scale: 0.98 }}
              >
                <div className="nav-icon">{item.icon}</div>
                <span className="nav-text">{item.name}</span>
                {isActive(item.path) && item.path !== '#' && (
                  <motion.div 
                    layoutId="active-pill"
                    className="active-pill"
                    transition={{ type: "spring", stiffness: 300, damping: 30 }}
                  />
                )}
                {isActive(item.path) && item.path !== '#' && <ChevronRight size={14} className="active-arrow" />}
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
              className="nav-item"
              onClick={() => handleNav(item.path)}
              whileHover={{ x: 5 }}
            >
              <div className="nav-icon">{item.icon}</div>
              <span className="nav-text">{item.name}</span>
            </motion.li>
          ))}
          <motion.li className="nav-item" whileHover={{ x: 5 }}>
            <div className="nav-icon"><LogOut size={20} /></div>
            <span className="nav-text">Logout</span>
          </motion.li>
        </ul>
        
        <motion.div 
          className="pro-badge glass"
          whileHover={{ y: -5 }}
          onClick={() => navigate('/billing')}
          style={{ cursor: 'pointer' }}
        >
          <div className="pro-badge-content">
            <span className="badge-title">Pro Plan</span>
            <span className="badge-desc">Unlock advanced tools</span>
          </div>
          <button className="badge-btn" onClick={(e) => { e.stopPropagation(); navigate('/billing'); }}>Upgrade</button>
        </motion.div>
      </div>
    </aside>
  );
};

export default Sidebar;
