import React from 'react';
import { motion } from 'framer-motion';
import { Plus, ArrowRight, Trophy, Star, Shield } from 'lucide-react';
import PlayerAvatar from './components/PlayerAvatar';
import { PLAYERS } from './data/players';
import './Projects.css';

interface TeamData {
  id: number;
  title: string;
  description: string;
  image: string;
  flag: string;
  status: string;
  statusColor: string;
  progress: number;
  players: Array<{ name: string; number: number; teamColor: string; accentColor?: string }>;
  stats: { wins: number; draws: number; losses: number; goals: number };
}

const projectsData: TeamData[] = [
  {
    id: 1,
    title: 'Argentina',
    description: 'FIFA World Cup Qatar 2022 Champions — winning their third global title with a historic penalty shootout victory.',
    image: '/images/argentina_flag.png',
    flag: '🇦🇷',
    status: 'CHAMPIONS',
    statusColor: '#ffd700',
    progress: 100,
    players: [PLAYERS.messi, PLAYERS.diMaria, PLAYERS.martinez, PLAYERS.alvarez, PLAYERS.otamendi],
    stats: { wins: 5, draws: 1, losses: 1, goals: 15 }
  },
  {
    id: 2,
    title: 'France',
    description: 'Qatar 2022 Runners-up. Displaying extreme resilience with Mbappé\'s hat-trick in the final.',
    image: '/images/france_flag.png',
    flag: '🇫🇷',
    status: 'RUNNERS-UP',
    statusColor: '#c0c0c0',
    progress: 92,
    players: [PLAYERS.mbappe, PLAYERS.griezmann, PLAYERS.giroud, PLAYERS.dembele],
    stats: { wins: 5, draws: 0, losses: 2, goals: 16 }
  },
  {
    id: 3,
    title: 'Morocco',
    description: 'Sensational historic fourth-place run — first African nation to reach the World Cup Semifinals.',
    image: '/images/morocco_flag.png',
    flag: '🇲🇦',
    status: 'SEMIFINALS',
    statusColor: '#10b981',
    progress: 78,
    players: [PLAYERS.hakimi, PLAYERS.enNesyri, PLAYERS.amrabat],
    stats: { wins: 3, draws: 2, losses: 2, goals: 6 }
  },
  {
    id: 4,
    title: 'Croatia',
    description: 'Consistent semifinalists and third-place finishers, led by the legendary midfield maestro Luka Modrić.',
    image: '/images/france_flag.png', // We'll use the flag image or fallback
    flag: '🇭🇷',
    status: 'THIRD PLACE',
    statusColor: '#cd7f32',
    progress: 75,
    players: [PLAYERS.modric, PLAYERS.gvardiol],
    stats: { wins: 2, draws: 3, losses: 2, goals: 8 }
  }
];

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.1, delayChildren: 0.2 }
  }
};

const itemVariants = {
  hidden: { y: 30, opacity: 0 },
  visible: {
    y: 0,
    opacity: 1,
    transition: { type: "spring" as const, stiffness: 100, damping: 14 }
  }
};

const Projects: React.FC = () => {
  return (
    <div className="content-wrapper projects-page">
      <motion.div 
        className="projects-header"
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
      >
        <div className="header-text">
          <span className="subtitle" style={{ color: 'var(--primary)', fontWeight: 700, letterSpacing: '0.1em', fontSize: '0.75rem' }}>
            <Shield size={14} style={{ display: 'inline', verticalAlign: 'middle', marginRight: '0.4rem' }} />
            NATIONAL TEAMS
          </span>
          <h1>Tournament Teams</h1>
          <p>Analyze and track details of the top football squads competing on the global stage.</p>
        </div>
        <motion.button 
          className="btn-solid-blue" 
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          style={{ background: 'var(--grad-primary)', border: 'none', color: 'white', display: 'flex', alignItems: 'center', gap: '0.5rem', padding: '0.75rem 1.5rem', borderRadius: 'var(--radius-md)', fontWeight: 'bold' }}
        >
          <Plus size={18} />
          Register New Squad
        </motion.button>
      </motion.div>

      <motion.div 
        className="projects-stats-grid"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.1 }}
      >
        <div className="stat-card glass">
          <h2>32</h2>
          <span>TEAMS REGISTERED</span>
        </div>
        <div className="stat-card glass">
          <h2>16</h2>
          <span>KNOCKOUT STAGE</span>
        </div>
        <div className="stat-card glass">
          <h2>64</h2>
          <span>MATCHES PLAYED</span>
        </div>
        <div className="stat-card glass">
          <h2 style={{ color: 'var(--warning)' }}>8</h2>
          <span>GROUPS</span>
        </div>
      </motion.div>

      <motion.div 
        className="projects-grid"
        variants={containerVariants}
        initial="hidden"
        animate="visible"
      >
        {projectsData.map((project) => (
          <motion.div key={project.id} className="project-card glass" variants={itemVariants}>
            <div className="project-image-container">
              <div className="team-flag-overlay">
                <span className="team-flag-emoji">{project.flag}</span>
              </div>
              <img src={project.image} alt={project.title} className="project-image" />
              <div 
                className="status-badge"
                style={{
                  background: `${project.statusColor}20`,
                  color: project.statusColor,
                  border: `1px solid ${project.statusColor}60`
                }}
              >
                {project.status === 'CHAMPIONS' && <Trophy size={12} style={{ marginRight: '4px' }} />}
                {project.status === 'THIRD PLACE' && <Star size={12} style={{ marginRight: '4px' }} />}
                {project.status}
              </div>
            </div>
            
            <div className="project-content">
              <h3>{project.title}</h3>
              <p>{project.description}</p>

              {/* Team Stats Row */}
              <div className="team-stats-row">
                <div className="team-stat">
                  <span className="team-stat-value" style={{ color: 'var(--success)' }}>{project.stats.wins}</span>
                  <span className="team-stat-label">W</span>
                </div>
                <div className="team-stat">
                  <span className="team-stat-value" style={{ color: 'var(--warning)' }}>{project.stats.draws}</span>
                  <span className="team-stat-label">D</span>
                </div>
                <div className="team-stat">
                  <span className="team-stat-value" style={{ color: 'var(--danger)' }}>{project.stats.losses}</span>
                  <span className="team-stat-label">L</span>
                </div>
                <div className="team-stat">
                  <span className="team-stat-value" style={{ color: 'var(--primary)' }}>{project.stats.goals}</span>
                  <span className="team-stat-label">GF</span>
                </div>
              </div>
              
              <div className="project-progress">
                <div className="progress-header">
                  <span>Squad Performance Rating</span>
                  <span style={{ color: project.statusColor, fontWeight: 700 }}>{project.progress}%</span>
                </div>
                <div className="progress-track">
                  <motion.div 
                    className="progress-fill" 
                    initial={{ width: 0 }}
                    animate={{ width: `${project.progress}%` }}
                    transition={{ duration: 1.2, ease: "easeOut", delay: 0.3 }}
                    style={{ 
                      background: project.status === 'CHAMPIONS' 
                        ? 'linear-gradient(90deg, #ffd700, #f59e0b)' 
                        : 'var(--primary)' 
                    }}
                  />
                </div>
              </div>

              <div className="project-footer">
                <div className="avatar-group">
                  {project.players.slice(0, 4).map((player, idx) => (
                    <motion.div 
                      key={idx} 
                      className="player-avatar-wrapper"
                      whileHover={{ scale: 1.2, zIndex: 10, y: -4 }}
                      title={player.name}
                      style={{ zIndex: project.players.length - idx }}
                    >
                      <PlayerAvatar 
                        name={player.name} 
                        number={player.number} 
                        teamColor={player.teamColor} 
                        accentColor={player.accentColor}
                        size={36} 
                      />
                    </motion.div>
                  ))}
                  {project.players.length > 4 && (
                    <div className="avatar-more">+{project.players.length - 4}</div>
                  )}
                  <div className="avatar-more squad-count">24 players</div>
                </div>
                <motion.button 
                  className="view-details-btn"
                  whileHover={{ x: 4 }}
                >
                  View Squad
                  <ArrowRight size={14} />
                </motion.button>
              </div>
            </div>
          </motion.div>
        ))}

        {/* Initiate New Build Card */}
        <motion.div 
          className="project-card new-build-card glass" 
          variants={itemVariants}
          whileHover={{ scale: 1.02, borderColor: 'var(--primary)' }}
          style={{ border: '1px dashed var(--border-glass)', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', textAlign: 'center', padding: '2rem', borderRadius: 'var(--radius-lg)' }}
        >
          <motion.div 
            className="new-build-icon" 
            whileHover={{ rotate: 90 }}
            transition={{ type: "spring", stiffness: 200 }}
            style={{ background: 'var(--grad-primary)', color: 'white', width: '56px', height: '56px', borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center', marginBottom: '1rem', boxShadow: '0 4px 20px rgba(30, 215, 96, 0.3)' }}
          >
            <Plus size={26} />
          </motion.div>
          <h3>Register Custom Squad</h3>
          <p>Register a custom national team to simulate matches and forecast ratings.</p>
        </motion.div>
      </motion.div>
    </div>
  );
};

export default Projects;
