import React from 'react';
import { Info, Award, Shield, Target, Zap, TrendingUp, Star, Trophy } from 'lucide-react';
import { motion } from 'framer-motion';
import PlayerAvatar from './components/PlayerAvatar';
import { PLAYERS } from './data/players';
import './Billing.css';

const TournamentHistory = [
  { id: '2022', host: 'Qatar', hostFlag: '🇶🇦', winner: 'Argentina', winnerFlag: '🇦🇷', score: '3 - 3 (4-2 Pen)', runnerUp: 'France', runnerUpFlag: '🇫🇷', goldenBoot: 'K. Mbappé (8)' },
  { id: '2018', host: 'Russia', hostFlag: '🇷🇺', winner: 'France', winnerFlag: '🇫🇷', score: '4 - 2', runnerUp: 'Croatia', runnerUpFlag: '🇭🇷', goldenBoot: 'H. Kane (6)' },
  { id: '2014', host: 'Brazil', hostFlag: '🇧🇷', winner: 'Germany', winnerFlag: '🇩🇪', score: '1 - 0 (AET)', runnerUp: 'Argentina', runnerUpFlag: '🇦🇷', goldenBoot: 'J. Rodríguez (6)' },
  { id: '2010', host: 'South Africa', hostFlag: '🇿🇦', winner: 'Spain', winnerFlag: '🇪🇸', score: '1 - 0 (AET)', runnerUp: 'Netherlands', runnerUpFlag: '🇳🇱', goldenBoot: 'T. Müller (5)' },
  { id: '2006', host: 'Germany', hostFlag: '🇩🇪', winner: 'Italy', winnerFlag: '🇮🇹', score: '1 - 1 (5-3 Pen)', runnerUp: 'France', runnerUpFlag: '🇫🇷', goldenBoot: 'M. Klose (5)' },
];

const topScorers = [
  { ...PLAYERS.mbappe, goals: 8, assists: 2, matches: 7, rating: 8.7 },
  { ...PLAYERS.messi, goals: 7, assists: 3, matches: 7, rating: 8.9 },
  { ...PLAYERS.alvarez, goals: 4, assists: 1, matches: 7, rating: 7.6 },
  { ...PLAYERS.giroud, goals: 4, assists: 0, matches: 6, rating: 7.2 },
  { ...PLAYERS.enNesyri, goals: 3, assists: 0, matches: 7, rating: 7.0 },
];

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.1, delayChildren: 0.15 }
  }
};

const itemVariants = {
  hidden: { y: 20, opacity: 0 },
  visible: {
    y: 0,
    opacity: 1,
    transition: { type: "spring" as const, stiffness: 100, damping: 14 }
  }
};

const Billing: React.FC = () => {
  return (
    <motion.div 
      className="content-wrapper billing-page-new"
      variants={containerVariants}
      initial="hidden"
      animate="visible"
    >
      <motion.div className="billing-header-row" variants={itemVariants}>
        <div>
          <h1>Player Analytics & Fixtures</h1>
          <p style={{ color: 'var(--text-muted)', marginTop: '0.25rem' }}>Golden Boot race, top scorers, and tournament history</p>
        </div>
      </motion.div>

      <motion.div className="billing-top-grid" variants={itemVariants}>
        {/* Golden Boot Leader Card */}
        <motion.div 
          className="billing-card current-plan-card glass"
        >
          <div className="card-top-section">
            <div className="plan-title-area">
              <span className="subtitle" style={{ color: 'var(--warning)', fontWeight: 700, letterSpacing: '0.1em', fontSize: '0.7rem', display: 'flex', alignItems: 'center', gap: '0.4rem' }}>
                <Trophy size={14} />
                GOLDEN BOOT WINNER
              </span>
              <h2 style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', marginTop: '0.5rem' }}>
                <PlayerAvatar 
                  name={PLAYERS.mbappe.name}
                  number={PLAYERS.mbappe.number}
                  teamColor={PLAYERS.mbappe.teamColor}
                  accentColor={PLAYERS.mbappe.accentColor}
                  size={48}
                />
                Kylian Mbappé
                <span style={{ fontSize: '1.2rem' }}>🇫🇷</span>
              </h2>
            </div>
            <motion.button 
              className="btn-solid-blue" 
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              style={{ background: 'var(--grad-primary)', color: 'white', border: 'none', padding: '0.5rem 1rem', borderRadius: 'var(--radius-md)', fontWeight: 'bold' }}
            >
              Compare Player
            </motion.button>
          </div>

          {/* Player Stats Grid */}
          <div className="player-stats-grid">
            <div className="player-stat-item">
              <Target size={16} style={{ color: 'var(--primary)' }} />
              <div className="player-stat-info">
                <span className="player-stat-number">8</span>
                <span className="player-stat-desc">Goals</span>
              </div>
            </div>
            <div className="player-stat-item">
              <Zap size={16} style={{ color: 'var(--warning)' }} />
              <div className="player-stat-info">
                <span className="player-stat-number">2</span>
                <span className="player-stat-desc">Assists</span>
              </div>
            </div>
            <div className="player-stat-item">
              <TrendingUp size={16} style={{ color: '#10b981' }} />
              <div className="player-stat-info">
                <span className="player-stat-number">8.7</span>
                <span className="player-stat-desc">Rating</span>
              </div>
            </div>
            <div className="player-stat-item">
              <Star size={16} style={{ color: '#f59e0b' }} />
              <div className="player-stat-info">
                <span className="player-stat-number">7</span>
                <span className="player-stat-desc">Matches</span>
              </div>
            </div>
          </div>

          <div className="usage-stats-row">
            <div className="usage-stat">
              <div className="usage-stat-header">
                <span className="stat-label">Goals Scored</span>
                <span className="stat-value"><strong>8 Goals</strong> / 10 Games</span>
              </div>
              <div className="progress-track">
                <motion.div 
                  className="progress-fill" 
                  initial={{ width: 0 }}
                  animate={{ width: '80%' }}
                  transition={{ duration: 1, ease: "easeOut" }}
                  style={{ background: 'var(--primary)' }}
                />
              </div>
            </div>
            
            <div className="usage-stat">
              <div className="usage-stat-header">
                <span className="stat-label">Passing Accuracy</span>
                <span className="stat-value"><strong>82.4%</strong> / 100%</span>
              </div>
              <div className="progress-track">
                <motion.div 
                  className="progress-fill" 
                  initial={{ width: 0 }}
                  animate={{ width: '82.4%' }}
                  transition={{ duration: 1, ease: "easeOut", delay: 0.2 }}
                  style={{ background: 'var(--warning)' }}
                />
              </div>
            </div>
          </div>

          <div className="billing-cycle-info">
            <Info size={16} style={{ color: 'var(--warning)' }} />
            <span>Golden Boot Winner awarded on <strong>December 18, 2022</strong></span>
          </div>
        </motion.div>

        {/* Digital Match Ticket Card */}
        <motion.div 
          className="billing-card payment-method-card glass"
        >
          <span className="subtitle" style={{ color: 'var(--text-muted)', fontWeight: 700, letterSpacing: '0.1em', fontSize: '0.7rem' }}>LUSAIL STADIUM TICKET</span>
          
          <div className="credit-card-mock" style={{ background: 'linear-gradient(135deg, #1b4332 0%, #061f10 100%)', border: '1px solid var(--border-glass)', position: 'relative', overflow: 'hidden' }}>
            {/* Pitch lines decoration */}
            <div style={{ position: 'absolute', top: '50%', left: '50%', transform: 'translate(-50%, -50%)', width: '60px', height: '60px', borderRadius: '50%', border: '1px solid rgba(255,255,255,0.08)' }} />
            <div style={{ position: 'absolute', top: 0, bottom: 0, left: '50%', width: '1px', background: 'rgba(255,255,255,0.05)' }} />
            
            <div className="cc-top">
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                <img src="/images/fifa_logo.png" alt="FIFA" style={{ width: '28px', height: '28px', objectFit: 'contain', borderRadius: '4px' }} />
                <span style={{ color: '#ffd700', fontSize: '0.65rem', fontWeight: 700, letterSpacing: '0.1em' }}>QATAR 2022™</span>
              </div>
              <div className="mastercard-logo">
                <div className="circle red" style={{ backgroundColor: 'var(--warning)' }}></div>
                <div className="circle yellow" style={{ backgroundColor: 'var(--primary)' }}></div>
              </div>
            </div>
            
            <div className="cc-number" style={{ fontStyle: 'normal', letterSpacing: '0.15em', fontWeight: 800 }}>
              <span style={{ display: 'flex', alignItems: 'center', gap: '0.3rem' }}>🇦🇷 ARG</span>
              <span style={{ color: '#ffd700', fontSize: '0.7rem' }}>VS</span>
              <span style={{ display: 'flex', alignItems: 'center', gap: '0.3rem' }}>FRA 🇫🇷</span>
              <span style={{ background: 'rgba(255,215,0,0.2)', padding: '0.15rem 0.5rem', borderRadius: '4px', color: '#ffd700', fontSize: '0.7rem' }}>FINAL</span>
            </div>
            
            <div className="cc-bottom">
              <div className="cc-field">
                <span className="cc-label">LOCATION</span>
                <span className="cc-value" style={{ color: '#fff' }}>Lusail Iconic Stadium</span>
              </div>
              <div className="cc-field">
                <span className="cc-label">SEAT</span>
                <span className="cc-value" style={{ color: '#fff' }}>SEC 12 • ROW F</span>
              </div>
              <div className="cc-field text-right">
                <span className="cc-label">DATE</span>
                <span className="cc-value" style={{ color: '#fff' }}>18 DEC 2022</span>
              </div>
            </div>
          </div>

          <motion.button 
            className="btn-glass-gray" 
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            style={{ border: '1px solid var(--border-glass)', color: 'var(--text-main)', padding: '0.5rem', borderRadius: 'var(--radius-md)', fontWeight: 'bold', width: '100%' }}
          >
            Download Ticket PDF
          </motion.button>
        </motion.div>
      </motion.div>

      {/* Top Scorers Section */}
      <motion.div className="billing-card glass" variants={itemVariants}>
        <div className="history-header">
          <h3 style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
            <Target size={20} style={{ color: 'var(--primary)' }} />
            Golden Boot Race — Top Scorers
          </h3>
        </div>
        <div className="top-scorers-grid">
          {topScorers.map((scorer, idx) => (
            <motion.div 
              key={scorer.name}
              className="scorer-card glass"
              whileHover={{ y: -4, boxShadow: '0 8px 24px rgba(0,0,0,0.15)' }}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: idx * 0.1 }}
            >
              <div className="scorer-rank" style={{ 
                background: idx === 0 ? '#ffd700' : idx === 1 ? '#c0c0c0' : idx === 2 ? '#cd7f32' : 'var(--border-glass)',
                color: idx < 3 ? '#000' : 'var(--text-muted)'
              }}>
                {idx + 1}
              </div>
              <PlayerAvatar 
                name={scorer.name}
                number={scorer.number}
                teamColor={scorer.teamColor}
                accentColor={scorer.accentColor}
                size={44}
              />
              <div className="scorer-info">
                <span className="scorer-name">{scorer.name}</span>
                <span className="scorer-detail">{scorer.goals} goals • {scorer.assists} assists • {scorer.matches} games</span>
              </div>
              <div className="scorer-rating" style={{ 
                color: scorer.rating >= 8.5 ? 'var(--warning)' : scorer.rating >= 7.5 ? 'var(--primary)' : 'var(--text-muted)',
                fontWeight: 800,
                fontSize: '1.1rem'
              }}>
                {scorer.rating}
              </div>
            </motion.div>
          ))}
        </div>
      </motion.div>

      {/* World Cup Finals History */}
      <motion.div 
        className="billing-card history-card glass"
        variants={itemVariants}
      >
        <div className="history-header">
          <h3 style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
            <Trophy size={20} style={{ color: 'var(--warning)' }} />
            World Cup Finals History
          </h3>
          <div className="history-actions">
            <button className="btn-outline-small glass-pill">Filter</button>
            <button className="btn-outline-small glass-pill">Export CSV</button>
          </div>
        </div>

        <div className="history-table-container">
          <table className="history-table">
            <thead>
              <tr>
                <th>YEAR</th>
                <th>HOST</th>
                <th>CHAMPION</th>
                <th>SCORE</th>
                <th>RUNNER-UP</th>
                <th>GOLDEN BOOT</th>
              </tr>
            </thead>
            <tbody>
              {TournamentHistory.map((history) => (
                <tr key={history.id}>
                  <td className="font-mono" style={{ fontWeight: 'bold' }}>{history.id}</td>
                  <td>
                    <span style={{ display: 'flex', alignItems: 'center', gap: '0.4rem' }}>
                      <span>{history.hostFlag}</span> {history.host}
                    </span>
                  </td>
                  <td style={{ fontWeight: 'bold', color: 'var(--warning)' }}>
                    <span style={{ display: 'flex', alignItems: 'center', gap: '0.4rem' }}>
                      <span>{history.winnerFlag}</span> {history.winner}
                    </span>
                  </td>
                  <td style={{ fontFamily: "'Outfit', monospace", fontWeight: 600 }}>{history.score}</td>
                  <td className="font-bold">
                    <span style={{ display: 'flex', alignItems: 'center', gap: '0.4rem' }}>
                      <span>{history.runnerUpFlag}</span> {history.runnerUp}
                    </span>
                  </td>
                  <td style={{ color: 'var(--primary)', fontWeight: 600 }}>{history.goldenBoot}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        
        <div className="view-all-row">
          <button className="view-all-link">View Full World Cup Archives</button>
        </div>
      </motion.div>
      
      {/* Footer Support Cards */}
      <div className="billing-footer-grid">
        <motion.div className="support-card glass" variants={itemVariants}>
          <div className="support-icon" style={{ backgroundColor: 'rgba(34, 197, 94, 0.15)', color: 'var(--primary)' }}>
            <Award size={24} />
          </div>
          <div className="support-content">
            <h4>Media & Press Guidelines</h4>
            <p>Need to register press badges for the upcoming tournament? Read our Match Day media manual.</p>
            <button className="support-link" style={{ color: 'var(--primary)', fontWeight: 'bold' }}>Access Media Portal</button>
          </div>
        </motion.div>

        <motion.div className="support-card glass" variants={itemVariants}>
          <div className="support-icon" style={{ backgroundColor: 'rgba(253, 224, 71, 0.15)', color: 'var(--warning)' }}>
            <Shield size={24} />
          </div>
          <div className="support-content">
            <h4>Tournament Integrity Panel</h4>
            <p>Match-fixing, reporting issues, or looking for official rule updates? Contact our Integrity Panel.</p>
            <button className="support-link" style={{ color: 'var(--warning)', fontWeight: 'bold' }}>Report Incident</button>
          </div>
        </motion.div>
      </div>

    </motion.div>
  );
};

export default Billing;

