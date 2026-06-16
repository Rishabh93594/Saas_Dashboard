import React from 'react';
import { motion } from 'framer-motion';
import { Target, Trophy, Play, Activity } from 'lucide-react';
import './ActivityTimeline.css';

const activities = [
  {
    id: 1,
    title: 'World Cup Champions!',
    description: 'Argentina wins 4-2 on penalties against France in an epic final.',
    time: 'Dec 18, 2022',
    icon: <Trophy size={16} />,
    color: 'var(--warning)'
  },
  {
    id: 2,
    title: 'Hat-trick Milestone',
    description: 'Kylian Mbappé scores a sensational hat-trick in the final.',
    time: '90+2\' Penalty',
    icon: <Target size={16} />,
    color: '#ef4444'
  },
  {
    id: 3,
    title: 'Penalty Goal',
    description: 'Lionel Messi scores from the spot to put Argentina back in front.',
    time: '108\' Goal',
    icon: <Target size={16} />,
    color: 'var(--primary)'
  },
  {
    id: 4,
    title: 'Historic Semifinalist',
    description: 'Morocco becomes the first African nation to reach the World Cup Semis.',
    time: 'Dec 10, 2022',
    icon: <Activity size={16} />,
    color: '#10b981'
  },
  {
    id: 5,
    title: 'Tournament Kickoff',
    description: 'FIFA World Cup Qatar 2022 begins at Al Bayt Stadium.',
    time: 'Nov 20, 2022',
    icon: <Play size={16} />,
    color: '#3b82f6'
  }
];

const ActivityTimeline: React.FC = () => {
  return (
    <div className="timeline-container glass">
      <div className="timeline-header">
        <h3>Match Events & Highlights</h3>
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
