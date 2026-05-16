import React from 'react';
import { motion } from 'framer-motion';
import { Plus, ArrowRight } from 'lucide-react';
import './Projects.css';

const projectsData = [
  {
    id: 1,
    title: 'Metropolitan Tower',
    description: 'Mixed-use commercial development in the business district.',
    image: '/images/metropolitan_tower.png',
    status: 'ACTIVE',
    progress: 65,
    avatars: ['https://i.pravatar.cc/150?img=11', 'https://i.pravatar.cc/150?img=12'],
    extraAvatars: 3
  },
  {
    id: 2,
    title: 'Azure Villa',
    description: 'High-end residential seaside sanctuary.',
    image: '/images/azure_villa.png',
    status: 'IN REVIEW',
    progress: 92,
    avatars: ['https://i.pravatar.cc/150?img=33', 'https://i.pravatar.cc/150?img=47'],
    extraAvatars: 0
  },
  {
    id: 3,
    title: 'The Nexus Campus',
    description: 'Sustainable tech headquarters and research lab.',
    image: '/images/nexus_campus.png',
    status: 'COMPLETED',
    progress: 100,
    avatars: ['https://i.pravatar.cc/150?img=60'],
    extraAvatars: 8
  }
];

const Projects: React.FC = () => {
  return (
    <div className="content-wrapper projects-page">
      <motion.div 
        className="projects-header"
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
      >
        <div className="header-text">
          <span className="subtitle blue-text">PROJECT PORTFOLIO</span>
          <h1>Active Developments</h1>
          <p>Manage and track high-end architectural ventures from conceptual design to final construction delivery.</p>
        </div>
        <button className="btn-solid-blue">
          <Plus size={18} />
          Create New Project
        </button>
      </motion.div>

      <motion.div 
        className="projects-stats-grid"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.1 }}
      >
        <div className="stat-card glass">
          <h2>12</h2>
          <span>ACTIVE PROJECTS</span>
        </div>
        <div className="stat-card glass">
          <h2>04</h2>
          <span>IN REVIEW</span>
        </div>
        <div className="stat-card glass">
          <h2>28</h2>
          <span>COMPLETED</span>
        </div>
        <div className="stat-card glass">
          <h2 className="blue-text">$4.2M</h2>
          <span>TOTAL VALUATION</span>
        </div>
      </motion.div>

      <motion.div 
        className="projects-grid"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.2 }}
      >
        {projectsData.map((project) => (
          <div key={project.id} className="project-card glass">
            <div className="project-image-container">
              <img src={project.image} alt={project.title} className="project-image" />
              <div className={`status-badge ${project.status.toLowerCase().replace(' ', '-')}`}>
                {project.status}
              </div>
            </div>
            
            <div className="project-content">
              <h3>{project.title}</h3>
              <p>{project.description}</p>
              
              <div className="project-progress">
                <div className="progress-header">
                  <span>Project Progress</span>
                  <span className={`progress-percentage ${project.status === 'IN REVIEW' ? 'orange-text' : 'blue-text'}`}>{project.progress}%</span>
                </div>
                <div className="progress-track">
                  <div 
                    className={`progress-fill ${project.status === 'IN REVIEW' ? 'orange-bg' : project.status === 'COMPLETED' ? 'dark-bg' : 'blue-bg'}`} 
                    style={{ width: `${project.progress}%` }}
                  ></div>
                </div>
              </div>

              <div className="project-footer">
                <div className="avatar-group">
                  {project.avatars.map((avatar, idx) => (
                    <img key={idx} src={avatar} alt="Team member" className="avatar" />
                  ))}
                  {project.extraAvatars > 0 && (
                    <div className="avatar-more">+{project.extraAvatars}</div>
                  )}
                </div>
                <button className="view-details-btn">
                  View Details
                  <ArrowRight size={14} />
                </button>
              </div>
            </div>
          </div>
        ))}

        {/* Initiate New Build Card */}
        <div className="project-card new-build-card">
          <div className="new-build-icon">
            <Plus size={24} />
          </div>
          <h3>Initiate New Build</h3>
          <p>Start a new architectural project and assign your team.</p>
        </div>
      </motion.div>
    </div>
  );
};

export default Projects;
