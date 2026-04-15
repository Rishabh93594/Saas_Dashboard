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
    <div className="stats-card">
      <div className="stats-card-header">
        <div className="stats-icon-wrapper">
          {icon}
        </div>
        <span className={`trend-badge trend-${trendType}`}>
          {trend}
        </span>
      </div>
      <div className="stats-card-body">
        <span className="stats-label">{label}</span>
        <h3 className="stats-value">{value}</h3>
      </div>
    </div>
  );
};

export default StatsCard;
