import React, { useState, useEffect } from 'react';
import { 
  User, 
  Trophy, 
  Activity, 
  Calendar,
  Download,
  Target
} from 'lucide-react';
import { motion, AnimatePresence, type Variants } from 'framer-motion';
import StatsCard from './components/StatsCard';
import RevenueChart from './components/RevenueChart';
import ProjectVelocity from './components/ProjectVelocity';
import OrdersTable from './components/OrdersTable';
import ActivityTimeline from './components/ActivityTimeline';
import SkeletonLoader from './components/SkeletonLoader';

const containerVariants: Variants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1,
      delayChildren: 0.3
    }
  },
  exit: { 
    opacity: 0,
    transition: { duration: 0.2 }
  }
};

const itemVariants: Variants = {
  hidden: { y: 20, opacity: 0 },
  visible: {
    y: 0,
    opacity: 1,
    transition: {
      type: "spring",
      stiffness: 100,
      damping: 12
    }
  }
};

const Dashboard: React.FC = () => {
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 1500); // Simulate data fetching
    return () => clearTimeout(timer);
  }, []);

  return (
    <AnimatePresence mode="wait">
      {isLoading ? (
        <motion.div
          key="loader"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.3 }}
        >
          <SkeletonLoader />
        </motion.div>
      ) : (
        <motion.div 
          key="content"
          className="content-wrapper"
          variants={containerVariants}
          initial="hidden"
          animate="visible"
        >
          <motion.header className="page-header" variants={itemVariants}>
            <div className="page-title-group">
              <div className="flex items-center gap-4">
                <motion.div 
                  className="title-icon glass"
                  whileHover={{ rotate: 15, scale: 1.1 }}
                >
                  <Trophy size={24} className="text-warning" />
                </motion.div>
                <h1>FIFA Cup Analytics</h1>
              </div>
              <p>Real-time tournament tracking, match stats, and squad performance console.</p>
            </div>
            <motion.button 
              className="btn-primary"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              <Download size={18} />
              Generate Stats Report
            </motion.button>
          </motion.header>

          <motion.div className="stats-grid" variants={itemVariants}>
            <StatsCard 
              icon={<Target size={20} />} 
              label="Total Goals Scored" 
              value="172" 
              trend="+15.3%" 
              trendType="up" 
            />
            <StatsCard 
              icon={<Calendar size={20} />} 
              label="Matches Played" 
              value="64 / 64" 
              trend="100%" 
              trendType="neutral" 
            />
            <StatsCard 
              icon={<Activity size={20} />} 
              label="Avg Goals / Match" 
              value="2.69" 
              trend="High Velocity" 
              trendType="up" 
            />
            <StatsCard 
              icon={<User size={20} />} 
              label="Total Attendance" 
              value="3.40M" 
              trend="+11.8%" 
              trendType="up" 
            />
          </motion.div>

          <motion.div className="dashboard-middle" variants={itemVariants}>
            <RevenueChart />
            <ProjectVelocity />
          </motion.div>

          <motion.div className="dashboard-bottom" variants={itemVariants}>
            <div className="orders-wrapper">
              <OrdersTable />
            </div>
            <div className="timeline-wrapper">
              <ActivityTimeline />
            </div>
          </motion.div>

          <motion.footer className="footer" variants={itemVariants}>
            FIFA World Cup Analytics Dashboard • Qatar 2022 ™ • Built with ⚽ for Football
          </motion.footer>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default Dashboard;
