import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Bell, Zap, Shield, CheckCircle } from 'lucide-react';
import './ActivityFeed.css';

interface ActivityItem {
  id: string;
  text: string;
  icon: React.ReactNode;
  time: string;
}

const ActivityFeed: React.FC = () => {
  const [activities] = useState<ActivityItem[]>([
    { id: '1', text: 'System load optimized to 12%', icon: <Zap size={14} />, time: 'Just now' },
    { id: '2', text: 'New partner verified', icon: <Shield size={14} />, time: '2m ago' },
    { id: '3', text: 'Monthly report generated', icon: <CheckCircle size={14} />, time: '15m ago' },
  ]);

  return (
    <div className="activity-feed-container">
      <div className="feed-header">
        <Bell size={16} />
        <span>Recent Activity</span>
      </div>
      <div className="feed-list">
        <AnimatePresence initial={false}>
          {activities.map((item) => (
            <motion.div
              key={item.id}
              className="activity-item glass"
              initial={{ x: 20, opacity: 0 }}
              animate={{ x: 0, opacity: 1 }}
              exit={{ x: -20, opacity: 0 }}
            >
              <div className="activity-icon-sm">{item.icon}</div>
              <div className="activity-content-sm">
                <p>{item.text}</p>
                <span>{item.time}</span>
              </div>
            </motion.div>
          ))}
        </AnimatePresence>
      </div>
    </div>
  );
};

export default ActivityFeed;
