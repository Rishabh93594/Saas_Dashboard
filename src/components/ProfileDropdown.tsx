import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { User, Settings, CreditCard, Shield, LogOut, ChevronRight } from 'lucide-react';
import './ProfileDropdown.css';

interface ProfileDropdownProps {
  isOpen: boolean;
}

const ProfileDropdown: React.FC<ProfileDropdownProps> = ({ isOpen }) => {
  const menuItems = [
    { icon: <User size={18} />, label: 'My Profile', desc: 'Account settings and more' },
    { icon: <CreditCard size={18} />, label: 'Billing', desc: 'Manage your subscription' },
    { icon: <Shield size={18} />, label: 'Security', desc: 'Password and 2FA' },
    { icon: <Settings size={18} />, label: 'Preferences', desc: 'Theme and notifications' },
  ];

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div 
          className="profile-dropdown glass"
          initial={{ opacity: 0, y: 10, scale: 0.95 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          exit={{ opacity: 0, y: 10, scale: 0.95 }}
          transition={{ type: "spring", stiffness: 300, damping: 25 }}
        >
          <div className="dropdown-header">
            <div className="user-info">
              <span className="user-name">Alex Sterling</span>
              <span className="user-email">alex@arch-admin.com</span>
            </div>
            <div className="pro-label">PRO</div>
          </div>

          <div className="dropdown-menu">
            {menuItems.map((item, index) => (
              <motion.div 
                key={index}
                className="menu-item"
                whileHover={{ x: 5, background: "rgba(255, 255, 255, 0.05)" }}
              >
                <div className="item-icon">{item.icon}</div>
                <div className="item-content">
                  <span className="item-label">{item.label}</span>
                  <span className="item-desc">{item.desc}</span>
                </div>
                <ChevronRight size={14} className="item-arrow" />
              </motion.div>
            ))}
          </div>

          <div className="dropdown-footer">
            <button className="logout-btn">
              <LogOut size={18} />
              Logout
            </button>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default ProfileDropdown;
