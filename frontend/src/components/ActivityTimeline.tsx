import React from 'react';
import { motion } from 'framer-motion';
import { ShieldCheck, UserPlus, FileText, Server, CreditCard } from 'lucide-react';
import './ActivityTimeline.css';

const activities = [
  {
    id: 1,
    title: 'New Partner Onboarded',
    description: 'Acme Corp joined the platform.',
    time: '2 hours ago',
    icon: <UserPlus size={16} />,
    color: 'var(--primary)'
  },
  {
    id: 2,
    title: 'Server Sync Completed',
    description: 'All nodes successfully synchronized.',
    time: '4 hours ago',
    icon: <Server size={16} />,
    color: '#10b981'
  },
  {
    id: 3,
    title: 'Contract Approved',
    description: 'Project Zenith documentation signed.',
    time: '5 hours ago',
    icon: <FileText size={16} />,
    color: '#8b5cf6'
  },
  {
    id: 4,
    title: 'Payment Processed',
    description: 'Invoice #INV-2026 for $12,500 paid.',
    time: '1 day ago',
    icon: <CreditCard size={16} />,
    color: '#f59e0b'
  },
  {
    id: 5,
    title: 'Security Audit Passed',
    description: 'Monthly security compliance verified.',
    time: '2 days ago',
    icon: <ShieldCheck size={16} />,
    color: '#3b82f6'
  }
];

const ActivityTimeline: React.FC = () => {
  return (
    <div className="timeline-container glass">
      <div className="timeline-header">
        <h3>Activity Audit</h3>
        <button className="view-all-btn">View All</button>
      </div>
      
      <div className="timeline-list">
        {activities.map((activity, index) => (
          <motion.div 
            key={activity.id}
            className="timeline-item"
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: index * 0.1 }}
          >
            <div className="timeline-icon" style={{ backgroundColor: `${activity.color}20`, color: activity.color }}>
              {activity.icon}
            </div>
            
            <div className="timeline-content">
              <div className="timeline-title-row">
                <h4>{activity.title}</h4>
                <span className="timeline-time">{activity.time}</span>
              </div>
              <p className="timeline-description">{activity.description}</p>
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  );
};

export default ActivityTimeline;
