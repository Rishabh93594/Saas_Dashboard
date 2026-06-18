import React from 'react';
import { 
  LayoutDashboard, 
  Users, 
  Trophy,
  FileText, 
  HelpCircle, 
  LogOut,
  ChevronRight,
  MapPin
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
    { name: 'Teams', path: '/teams', icon: <Users size={20} /> },
    { name: 'Players & Fixtures', path: '/players', icon: <Trophy size={20} /> },
    { name: 'Stadiums', path: '/stadiums', icon: <MapPin size={20} /> },
  ];

  const footerItems = [
    { name: 'Insights', path: '#', icon: <FileText size={20} /> },
    { name: 'Help Hub', path: '#', icon: <HelpCircle size={20} /> },
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
          whileHover={{ scale: 1.1 }}
          style={{ background: 'transparent', boxShadow: 'none', display: 'flex', alignItems: 'center', justifyContent: 'center' }}
        >
          <img src="/images/fifa_logo.png" alt="FIFA Logo" style={{ width: '44px', height: '44px', objectFit: 'contain', borderRadius: '8px' }} />
        </motion.div>
        <div className="logo-text">
          <h1>FIFA Cup</h1>
          <span>Analytics Hub</span>
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
          onClick={() => navigate('/players')}
          style={{ cursor: 'pointer', background: 'linear-gradient(135deg, rgba(34, 197, 94, 0.1) 0%, rgba(253, 224, 71, 0.1) 100%)' }}
        >
          <div className="pro-badge-content">
            <span className="badge-title" style={{ color: 'var(--warning)' }}>Qatar 2022</span>
            <span className="badge-desc">Historic Finals Stats</span>
          </div>
          <button className="badge-btn" onClick={(e) => { e.stopPropagation(); navigate('/players'); }} style={{ background: 'var(--grad-primary)', color: 'white' }}>View</button>
        </motion.div>
      </div>
    </aside>
  );
};

export default Sidebar;
