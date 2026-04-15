import React from 'react';
import { Rocket } from 'lucide-react';
import './ProjectVelocity.css';

const ProjectVelocity: React.FC = () => {
  return (
    <div className="velocity-card">
      <div className="velocity-header">
        <h3>Project Velocity</h3>
        <p>
          Your team is currently operating at 112% capacity. 
          Consider scaling the development sprint.
        </p>
      </div>

      <div className="velocity-footer">
        <div className="milestone-badge">
          <div className="milestone-icon">
            <Rocket size={20} />
          </div>
          <div className="milestone-info">
            <span className="milestone-label">Next Milestone</span>
            <span className="milestone-value">Horizon Alpha Launch</span>
          </div>
        </div>

        <div className="progress-container">
          <div className="progress-bar-bg">
            <div className="progress-bar-fill" style={{ width: '85%' }}></div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProjectVelocity;
