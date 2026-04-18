import { type ReactNode } from 'react';
import './StatsCard.css';

interface StatsCardProps {
  icon: ReactNode;
  label: string;
  value: string;
  trend: string;
  trendType: 'up' | 'down' | 'neutral';
}

const StatsCard = ({ icon, label, value, trend, trendType }: StatsCardProps) => {
  return (
    <div className={`stats-card glass trend-glow-${trendType}`}>
      <div className="card-glow"></div>
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
  );
};

export default StatsCard;
