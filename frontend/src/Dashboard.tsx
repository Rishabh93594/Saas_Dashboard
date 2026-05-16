import React, { useState, useEffect } from 'react';
import { 
  User, 
  Wallet, 
  LineChart, 
  ShoppingBag,
  Sparkles,
  Download
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
                  <Sparkles size={24} className="text-primary" />
                </motion.div>
                <h1>Executive Dashboard</h1>
              </div>
              <p>Real-time analytics and architectural project management console.</p>
            </div>
            <motion.button 
              className="btn-primary"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              <Download size={18} />
              Generate Insight Report
            </motion.button>
          </motion.header>

          <motion.div className="stats-grid" variants={itemVariants}>
            <StatsCard 
              icon={<User size={20} />} 
              label="Active Partners" 
              value="12,842" 
              trend="+12.5%" 
              trendType="up" 
            />
            <StatsCard 
              icon={<Wallet size={20} />} 
              label="Accrued Revenue" 
              value="$42.5k" 
              trend="+8.2%" 
              trendType="up" 
            />
            <StatsCard 
              icon={<LineChart size={20} />} 
              label="Market Velocity" 
              value="18.4%" 
              trend="Optimal" 
              trendType="neutral" 
            />
            <StatsCard 
              icon={<ShoppingBag size={20} />} 
              label="Open Contracts" 
              value="1,204" 
              trend="-2.4%" 
              trendType="down" 
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
            Design & Experience by Alex Sterling • Digital Architecture Framework v2.4
          </motion.footer>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default Dashboard;
