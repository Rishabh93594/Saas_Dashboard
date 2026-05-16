import { Routes, Route, useLocation } from 'react-router-dom';
import { AnimatePresence } from 'framer-motion';
import Sidebar from './components/Sidebar';
import Topbar from './components/Topbar';
import Dashboard from './Dashboard';
import Billing from './Billing';
import Projects from './Projects';
import BackgroundBlobs from './components/BackgroundBlobs';
import './App.css';

function App() {
  const location = useLocation();

  return (
    <div className="layout">
      <div className="noise-overlay" />
      <BackgroundBlobs />
      
      <Sidebar />
      
      <main className="main-content">
        <Topbar />
        
        <AnimatePresence mode="wait">
          <Routes location={location} key={location.pathname}>
            <Route path="/" element={<Dashboard />} />
            <Route path="/billing" element={<Billing />} />
            <Route path="/projects" element={<Projects />} />
          </Routes>
        </AnimatePresence>
      </main>
    </div>
  );
}

export default App;
