import React from 'react';
import { 
  LayoutDashboard, 
  BarChart3, 
  Users, 
  FolderLock, 
  FileText, 
  HelpCircle, 
  LogOut 
} from 'lucide-react';
import './Sidebar.css';

const Sidebar: React.FC = () => {
  return (
    <aside className="sidebar">
      <div className="sidebar-logo">
        <h1>Architect</h1>
        <span>Admin Console</span>
      </div>

      <ul className="sidebar-nav">
        <li className="nav-item active">
          <LayoutDashboard size={20} />
          <span>Dashboard</span>
        </li>
        <li className="nav-item">
          <BarChart3 size={20} />
          <span>Analytics</span>
        </li>
        <li className="nav-item">
          <Users size={20} />
          <span>Team</span>
        </li>
        <li className="nav-item">
          <FolderLock size={20} />
          <span>Projects</span>
        </li>
        <li className="nav-item">
          <FileText size={20} />
          <span>Reports</span>
        </li>
      </ul>

      <ul className="sidebar-footer">
        <li className="nav-item">
          <HelpCircle size={20} />
          <span>Help</span>
        </li>
        <li className="nav-item">
          <LogOut size={20} />
          <span>Logout</span>
        </li>
      </ul>
    </aside>
  );
};

export default Sidebar;
