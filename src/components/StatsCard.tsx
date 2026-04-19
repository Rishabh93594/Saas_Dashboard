import React, { type ReactNode } from 'react';
import { motion, useMotionValue, useSpring, useTransform } from 'framer-motion';
import './StatsCard.css';

interface StatsCardProps {
  icon: ReactNode;
  label: string;
  value: string;
  trend: string;
  trendType: 'up' | 'down' | 'neutral';
}

const StatsCard = ({ icon, label, value, trend, trendType }: StatsCardProps) => {
  const x = useMotionValue(0);
  const y = useMotionValue(0);

  const mouseXSpring = useSpring(x);
  const mouseYSpring = useSpring(y);

  const rotateX = useTransform(mouseYSpring, [-0.5, 0.5], ["7deg", "-7deg"]);
  const rotateY = useTransform(mouseXSpring, [-0.5, 0.5], ["-7deg", "7deg"]);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const width = rect.width;
    const height = rect.height;
    const mouseX = e.clientX - rect.left;
    const mouseY = e.clientY - rect.top;

    const xPct = mouseX / width - 0.5;
    const yPct = mouseY / height - 0.5;

    x.set(xPct);
    y.set(yPct);
  };

  const handleMouseLeave = () => {
    x.set(0);
    y.set(0);
  };

  return (
    <motion.div 
      className={`stats-card glass trend-glow-${trendType}`}
      style={{ rotateX, rotateY, transformStyle: "preserve-3d" }}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      whileHover={{ scale: 1.02 }}
      transition={{ type: "spring", stiffness: 300, damping: 20 }}
    >
      <div className="card-content" style={{ transform: "translateZ(50px)" }}>
        <div className="stats-card-header">
          <div className={`stats-icon-wrapper icon-${trendType}`}>
            {icon}
          </div>
          <div className={`trend-badge trend-${trendType} glass-pill`}>
            {trendType === 'up' && <span className="trend-arrow">↑</span>}
            {trendType === 'down' && <span className="trend-arrow">↓</span>}
            {trend}
          </div>
        </div>
        <div className="stats-card-body">
          <span className="stats-label">{label}</span>
          <h3 className="stats-value">{value}</h3>
          <div className="stats-progress">
            <div className={`progress-bar progress-${trendType}`} style={{ width: '65%' }}></div>
          </div>
        </div>
      </div>
    </motion.div>
  );
};

export default StatsCard;
