import { 
  User, 
  Wallet, 
  LineChart, 
  ShoppingBag,
  Sparkles,
  Download
} from 'lucide-react';
import Sidebar from './components/Sidebar';
import Topbar from './components/Topbar';
import StatsCard from './components/StatsCard';
import RevenueChart from './components/RevenueChart';
import ProjectVelocity from './components/ProjectVelocity';
import OrdersTable from './components/OrdersTable';
import './App.css';

function App() {
  return (
    <div className="layout">
      <Sidebar />
      <main className="main-content">
        <Topbar />
        
        <div className="content-wrapper">
          <header className="page-header">
            <div className="page-title-group">
              <div className="flex items-center gap-4">
                <div className="title-icon glass">
                  <Sparkles size={24} className="text-primary" />
                </div>
                <h1>Executive Dashboard</h1>
              </div>
              <p>Real-time analytics and architectural project management console.</p>
            </div>
            <button className="btn-primary">
              <Download size={18} />
              Generate Insight Report
            </button>
          </header>

          <div className="stats-grid">
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
          </div>

          <div className="dashboard-middle">
            <RevenueChart />
            <ProjectVelocity />
          </div>

          <OrdersTable />

          <footer className="footer">
            Design & Experience by Alex Sterling • Digital Architecture Framework v2.4
          </footer>
        </div>
      </main>
    </div>
  );
}

export default App;
