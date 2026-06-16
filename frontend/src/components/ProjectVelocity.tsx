import React from 'react';
import { Trophy, Target } from 'lucide-react';
import './ProjectVelocity.css';

const ProjectVelocity: React.FC = () => {
  return (
    <div className="velocity-card">
      <div className="velocity-bg-glow"></div>
      <div className="velocity-header">
        <div className="velocity-title-group">
          <h3 className="section-title">Squad Performance Index</h3>
          <div className="velocity-badge glass-pill">
            <Trophy size={12} fill="currentColor" className="text-warning" /> 88% Match Efficiency
          </div>
        </div>
        <p>
          The squad's expected goals (xG) metrics are currently exceeding pre-tournament forecasts.
          Tactical setups are optimal for the upcoming fixtures.
        </p>
      </div>

      <div className="velocity-footer">
        <label className="milestone-container">
          <div className="milestone-badge glass">
            <div className="milestone-icon" style={{ background: 'var(--warning)' }}>
              <Target size={18} fill="white" />
            </div>
            <div className="milestone-info">
              <span className="milestone-label">Tournament Objective</span>
              <span className="milestone-value">World Cup Victory</span>
            </div>
          </div>
          <span className="milestone-pct" style={{ color: 'var(--warning)' }}>88%</span>
        </label>

        <div className="progress-container">
          <div className="progress-bar-bg">
            <div className="progress-bar-fill" style={{ width: '88%', background: 'var(--grad-primary)' }}>
              <div className="progress-shimmer"></div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProjectVelocity;
