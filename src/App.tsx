import { 
  User, 
  Wallet, 
  LineChart, 
  ShoppingBag 
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
              <h1>Executive Dashboard</h1>
              <p>Overview of your firm's performance metrics and growth indicators.</p>
            </div>
            <button className="btn-primary">Generate Report</button>
          </header>

          <div className="stats-grid">
            <StatsCard 
              icon={<User size={20} />} 
              label="Active Users" 
              value="12,842" 
              trend="+12.5%" 
              trendType="up" 
            />
            <StatsCard 
              icon={<Wallet size={20} />} 
              label="Monthly Revenue" 
              value="$42.5k" 
              trend="+8.2%" 
              trendType="up" 
            />
            <StatsCard 
              icon={<LineChart size={20} />} 
              label="Market Growth" 
              value="18.4%" 
              trend="Optimal" 
              trendType="neutral" 
            />
            <StatsCard 
              icon={<ShoppingBag size={20} />} 
              label="Total Orders" 
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
            © 2024 Architectural Dashboard • Proprietary Admin Access Only
          </footer>
        </div>
      </main>
    </div>
  );
}

export default App;
