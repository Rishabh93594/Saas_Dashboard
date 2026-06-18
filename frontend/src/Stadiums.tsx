import React, { useState } from 'react';
import { motion, AnimatePresence, type Variants } from 'framer-motion';
import { MapPin, Users, Calendar, Trophy, Search, Grid3X3, List, Star } from 'lucide-react';
import { STADIUMS, STADIUM_STATS, type Stadium } from './data/stadiums';
import './Stadiums.css';

const containerVariants: Variants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.08, delayChildren: 0.2 },
  },
  exit: { opacity: 0, transition: { duration: 0.2 } },
};

const itemVariants: Variants = {
  hidden: { y: 24, opacity: 0 },
  visible: {
    y: 0,
    opacity: 1,
    transition: { type: 'spring', stiffness: 100, damping: 14 },
  },
};

const Stadiums: React.FC = () => {
  const [search, setSearch] = useState('');
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid');
  const [selectedStadium, setSelectedStadium] = useState<Stadium | null>(null);
  const [sortBy, setSortBy] = useState<'capacity' | 'matches' | 'name'>('capacity');

  const filtered = STADIUMS.filter(
    (s) =>
      s.name.toLowerCase().includes(search.toLowerCase()) ||
      s.city.toLowerCase().includes(search.toLowerCase()) ||
      s.location.toLowerCase().includes(search.toLowerCase())
  ).sort((a, b) => {
    if (sortBy === 'capacity') return b.capacity - a.capacity;
    if (sortBy === 'matches') return b.matchesHosted - a.matchesHosted;
    return a.name.localeCompare(b.name);
  });

  const formatCapacity = (n: number) =>
    n >= 1000 ? `${(n / 1000).toFixed(1)}K` : n.toString();

  return (
    <motion.div
      className="content-wrapper"
      variants={containerVariants}
      initial="hidden"
      animate="visible"
      exit={{ opacity: 0 }}
    >
      {/* Header */}
      <motion.header className="page-header" variants={itemVariants}>
        <div className="page-title-group">
          <div className="flex items-center gap-4">
            <motion.div
              className="title-icon glass"
              whileHover={{ rotate: 15, scale: 1.1 }}
            >
              <MapPin size={24} className="text-warning" />
            </motion.div>
            <h1>World Cup Stadiums</h1>
          </div>
          <p>All 8 official venues for FIFA World Cup Qatar 2022 — capacity, location, and key stats.</p>
        </div>
      </motion.header>

      {/* Summary Stats */}
      <motion.div className="stadium-summary-grid" variants={itemVariants}>
        {[
          { label: 'Total Venues', value: STADIUMS.length, icon: <Trophy size={18} />, color: '#f59e0b' },
          { label: 'Combined Capacity', value: `${(STADIUM_STATS.totalCapacity / 1000).toFixed(0)}K`, icon: <Users size={18} />, color: '#8b5cf6' },
          { label: 'Matches Hosted', value: STADIUM_STATS.totalMatches, icon: <Calendar size={18} />, color: '#22c55e' },
          { label: 'Host Cities', value: STADIUM_STATS.venueCities, icon: <MapPin size={18} />, color: '#0ea5e9' },
        ].map((stat) => (
          <motion.div
            key={stat.label}
            className="stadium-stat-card glass"
            whileHover={{ y: -4, scale: 1.02 }}
            transition={{ type: 'spring', stiffness: 300, damping: 20 }}
          >
            <div className="stat-icon-wrap" style={{ background: `${stat.color}20`, color: stat.color }}>
              {stat.icon}
            </div>
            <div>
              <div className="stat-val">{stat.value}</div>
              <div className="stat-lbl">{stat.label}</div>
            </div>
          </motion.div>
        ))}
      </motion.div>

      {/* Toolbar */}
      <motion.div className="stadium-toolbar glass" variants={itemVariants}>
        <div className="search-wrap">
          <Search size={16} className="search-icon-inner" />
          <input
            type="text"
            placeholder="Search by name or city…"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="stadium-search"
          />
        </div>

        <div className="toolbar-right">
          <select
            className="sort-select glass-pill"
            value={sortBy}
            onChange={(e) => setSortBy(e.target.value as any)}
          >
            <option value="capacity">Sort: Capacity</option>
            <option value="matches">Sort: Matches</option>
            <option value="name">Sort: Name</option>
          </select>

          <div className="view-toggle">
            <button
              className={`toggle-btn ${viewMode === 'grid' ? 'active' : ''}`}
              onClick={() => setViewMode('grid')}
              title="Grid View"
            >
              <Grid3X3 size={16} />
            </button>
            <button
              className={`toggle-btn ${viewMode === 'list' ? 'active' : ''}`}
              onClick={() => setViewMode('list')}
              title="List View"
            >
              <List size={16} />
            </button>
          </div>
        </div>
      </motion.div>

      {/* Cards / List */}
      <AnimatePresence mode="wait">
        {viewMode === 'grid' ? (
          <motion.div
            key="grid"
            className="stadiums-grid"
            variants={containerVariants}
            initial="hidden"
            animate="visible"
            exit={{ opacity: 0 }}
          >
            {filtered.map((stadium) => (
              <motion.div
                key={stadium.id}
                className={`stadium-card glass ${stadium.finalVenue ? 'final-venue' : ''}`}
                variants={itemVariants}
                whileHover={{ y: -8, scale: 1.02 }}
                transition={{ type: 'spring', stiffness: 280, damping: 20 }}
                onClick={() => setSelectedStadium(stadium)}
                style={{ cursor: 'pointer' }}
              >
                {/* Color Banner */}
                <div className="card-banner" style={{ background: stadium.gradient }}>
                  <img src={stadium.image} alt={stadium.name} className="banner-image" />
                  <div className="banner-overlay" />
                  <span className="banner-icon">{stadium.icon}</span>
                  {stadium.finalVenue && (
                    <span className="final-badge">
                      <Star size={10} fill="currentColor" /> FINAL
                    </span>
                  )}
                </div>

                <div className="card-body">
                  <h3 className="stadium-name">{stadium.name}</h3>

                  <div className="stadium-meta">
                    <span className="meta-chip">
                      <MapPin size={12} />
                      {stadium.city}
                    </span>
                    <span className="meta-chip capacity-chip">
                      <Users size={12} />
                      {formatCapacity(stadium.capacity)}
                    </span>
                  </div>

                  <p className="stadium-desc">{stadium.description}</p>

                  <div className="card-footer-stats">
                    <div className="foot-stat">
                      <span className="foot-val">{stadium.matchesHosted}</span>
                      <span className="foot-lbl">Matches</span>
                    </div>
                    <div className="foot-divider" />
                    <div className="foot-stat">
                      <span className="foot-val">{stadium.openedYear}</span>
                      <span className="foot-lbl">Opened</span>
                    </div>
                    <div className="foot-divider" />
                    <div className="foot-stat">
                      <span className="foot-val">{stadium.surface === 'Natural Grass' ? '🌱' : '🏟️'}</span>
                      <span className="foot-lbl">Surface</span>
                    </div>
                  </div>
                </div>
              </motion.div>
            ))}
          </motion.div>
        ) : (
          <motion.div
            key="list"
            className="stadiums-list"
            variants={containerVariants}
            initial="hidden"
            animate="visible"
            exit={{ opacity: 0 }}
          >
            {/* List Header */}
            <div className="list-header glass">
              <span>Stadium</span>
              <span>Location</span>
              <span>Capacity</span>
              <span>Matches</span>
              <span>Opened</span>
              <span>Architect</span>
            </div>

            {filtered.map((stadium, index) => (
              <motion.div
                key={stadium.id}
                className={`list-row glass ${stadium.finalVenue ? 'final-row' : ''}`}
                variants={itemVariants}
                custom={index}
                whileHover={{ x: 6 }}
                transition={{ type: 'spring', stiffness: 300, damping: 25 }}
                onClick={() => setSelectedStadium(stadium)}
                style={{ cursor: 'pointer' }}
              >
                <div className="list-name-cell">
                  <img src={stadium.image} alt="" className="list-thumbnail" />
                  <div>
                    <span className="list-stadium-name">{stadium.name}</span>
                    {stadium.finalVenue && <span className="list-final-tag">⭐ Final</span>}
                  </div>
                </div>
                <div className="list-cell">
                  <MapPin size={12} className="list-cell-icon" />
                  {stadium.city}
                </div>
                <div className="list-cell capacity-highlight">
                  <Users size={12} className="list-cell-icon" />
                  {stadium.capacity.toLocaleString()}
                </div>
                <div className="list-cell">{stadium.matchesHosted} matches</div>
                <div className="list-cell">{stadium.openedYear}</div>
                <div className="list-cell architect-cell">{stadium.architect}</div>
              </motion.div>
            ))}
          </motion.div>
        )}
      </AnimatePresence>

      {/* Detail Modal */}
      <AnimatePresence>
        {selectedStadium && (
          <motion.div
            className="modal-overlay"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setSelectedStadium(null)}
          >
            <motion.div
              className="stadium-modal glass"
              initial={{ y: 60, opacity: 0, scale: 0.94 }}
              animate={{ y: 0, opacity: 1, scale: 1 }}
              exit={{ y: 60, opacity: 0, scale: 0.94 }}
              transition={{ type: 'spring', stiffness: 260, damping: 22 }}
              onClick={(e) => e.stopPropagation()}
            >
              {/* Modal Banner */}
              <div
                className="modal-banner"
                style={{ background: selectedStadium.gradient }}
              >
                <img src={selectedStadium.image} alt={selectedStadium.name} className="modal-banner-image" />
                <div className="modal-banner-overlay" />
                <span className="modal-banner-icon">{selectedStadium.icon}</span>
                {selectedStadium.finalVenue && (
                  <div className="modal-final-badge">
                    <Star size={12} fill="currentColor" /> World Cup Final Venue
                  </div>
                )}
                <button
                  className="modal-close-btn"
                  onClick={() => setSelectedStadium(null)}
                >
                  ✕
                </button>
              </div>

              <div className="modal-body">
                <h2 className="modal-title">{selectedStadium.name}</h2>
                <p className="modal-location">
                  <MapPin size={14} /> {selectedStadium.location}
                </p>

                <p className="modal-description">{selectedStadium.description}</p>

                <div className="modal-stats-grid">
                  {[
                    { label: 'Capacity', value: selectedStadium.capacity.toLocaleString(), icon: <Users size={16} /> },
                    { label: 'Matches Hosted', value: selectedStadium.matchesHosted, icon: <Calendar size={16} /> },
                    { label: 'Year Opened', value: selectedStadium.openedYear, icon: <Trophy size={16} /> },
                    { label: 'Surface', value: selectedStadium.surface, icon: '🌱' },
                  ].map((item) => (
                    <div key={item.label} className="modal-stat glass">
                      <div className="modal-stat-icon">{item.icon}</div>
                      <div className="modal-stat-value">{item.value}</div>
                      <div className="modal-stat-label">{item.label}</div>
                    </div>
                  ))}
                </div>

                <div className="modal-detail-row">
                  <div className="detail-item">
                    <span className="detail-label">City</span>
                    <span className="detail-value">{selectedStadium.city}</span>
                  </div>
                  <div className="detail-item">
                    <span className="detail-label">Architect</span>
                    <span className="detail-value">{selectedStadium.architect}</span>
                  </div>
                  <div className="detail-item">
                    <span className="detail-label">Country</span>
                    <span className="detail-value">🇶🇦 Qatar</span>
                  </div>
                </div>

                {/* Capacity bar */}
                <div className="capacity-bar-wrap">
                  <div className="capacity-bar-label">
                    <span>Capacity vs Largest (Lusail 89K)</span>
                    <span>{Math.round((selectedStadium.capacity / 89000) * 100)}%</span>
                  </div>
                  <div className="capacity-bar-track">
                    <motion.div
                      className="capacity-bar-fill"
                      style={{ background: selectedStadium.gradient }}
                      initial={{ width: 0 }}
                      animate={{ width: `${(selectedStadium.capacity / 89000) * 100}%` }}
                      transition={{ duration: 0.8, ease: 'easeOut' }}
                    />
                  </div>
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      <motion.footer className="footer" variants={itemVariants}>
        FIFA World Cup Analytics Dashboard • Qatar 2022 ™ • Built with ⚽ for Football
      </motion.footer>
    </motion.div>
  );
};

export default Stadiums;
