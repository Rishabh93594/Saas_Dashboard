import React from 'react';
import { Rocket, Zap } from 'lucide-react';
import './ProjectVelocity.css';

const ProjectVelocity: React.FC = () => {
  return (
    <div className="velocity-card">
      <div className="velocity-bg-glow"></div>
      <div className="velocity-header">
        <div className="velocity-title-group">
          <h3 className="section-title">Operational Velocity</h3>
          <div className="velocity-badge glass-pill">
            <Zap size={12} fill="currentColor" /> 112% Performance
          </div>
        </div>
        <p>
          Your squad is outperforming current benchmarks. 
          Optimization recommended for the next sprint.
        </p>
      </div>

      <div className="velocity-footer">
        <label className="milestone-container">
          <div className="milestone-badge glass">
            <div className="milestone-icon">
              <Rocket size={18} fill="white" />
            </div>
            <div className="milestone-info">
              <span className="milestone-label">Target Milestone</span>
              <span className="milestone-value">Horizon Alpha Launch</span>
            </div>
          </div>
          <span className="milestone-pct">85%</span>
        </label>

        <div className="progress-container">
          <div className="progress-bar-bg">
            <div className="progress-bar-fill" style={{ width: '85%' }}>
              <div className="progress-shimmer"></div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProjectVelocity;
