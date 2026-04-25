import React from 'react';
import './SkeletonLoader.css';

const SkeletonLoader: React.FC = () => {
  return (
    <div className="skeleton-container">
      <div className="skeleton-header">
        <div className="skeleton-title"></div>
        <div className="skeleton-button"></div>
      </div>
      
      <div className="skeleton-grid">
        {[1, 2, 3, 4].map((i) => (
          <div key={i} className="skeleton-card glass">
            <div className="skeleton-card-header">
              <div className="skeleton-circle"></div>
              <div className="skeleton-badge"></div>
            </div>
            <div className="skeleton-line sm"></div>
            <div className="skeleton-line lg"></div>
            <div className="skeleton-progress"></div>
          </div>
        ))}
      </div>

      <div className="skeleton-middle">
        <div className="skeleton-chart glass"></div>
        <div className="skeleton-side glass"></div>
      </div>

      <div className="skeleton-table glass"></div>
    </div>
  );
};

export default SkeletonLoader;
