import React from 'react';
import { Info, Download, Filter, FileText, Receipt, LifeBuoy, CreditCard as CardIcon } from 'lucide-react';
import { motion } from 'framer-motion';
import './Billing.css';

const BillingHistory = [
  { id: 'INV-2024-009', date: 'Sep 24, 2024', amount: '$499.00', status: 'PAID' },
  { id: 'INV-2024-008', date: 'Aug 24, 2024', amount: '$499.00', status: 'PAID' },
  { id: 'INV-2024-007', date: 'Jul 24, 2024', amount: '$542.50', status: 'PAID' },
  { id: 'INV-2024-006', date: 'Jun 24, 2024', amount: '$499.00', status: 'PAID' },
];

const Billing: React.FC = () => {
  return (
    <div className="content-wrapper billing-page-new">
      <motion.div 
        className="billing-header-row"
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
      >
        <h1>Billing & Subscription</h1>
      </motion.div>

      <div className="billing-top-grid">
        {/* Current Plan Card */}
        <motion.div 
          className="billing-card current-plan-card glass"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
        >
          <div className="card-top-section">
            <div className="plan-title-area">
              <span className="subtitle blue-text">CURRENT PLAN</span>
              <h2>Enterprise Architect</h2>
            </div>
            <button className="btn-solid-blue">Upgrade Plan</button>
          </div>

          <div className="usage-stats-row">
            <div className="usage-stat">
              <div className="usage-stat-header">
                <span className="stat-label">API Requests</span>
                <span className="stat-value"><strong>850k</strong> / 1M</span>
              </div>
              <div className="progress-track">
                <div className="progress-fill" style={{ width: '85%', background: 'var(--primary)' }}></div>
              </div>
            </div>
            
            <div className="usage-stat">
              <div className="usage-stat-header">
                <span className="stat-label">Storage Capacity</span>
                <span className="stat-value"><strong>42.8 GB</strong> / 100 GB</span>
              </div>
              <div className="progress-track">
                <div className="progress-fill" style={{ width: '42.8%', background: 'var(--text-muted)' }}></div>
              </div>
            </div>
          </div>

          <div className="billing-cycle-info">
            <Info size={16} className="blue-text" />
            <span>Your next billing cycle starts on <strong>October 24, 2024</strong></span>
          </div>
        </motion.div>

        {/* Payment Method Card */}
        <motion.div 
          className="billing-card payment-method-card glass"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
        >
          <span className="subtitle">PAYMENT METHOD</span>
          
          <div className="credit-card-mock">
            <div className="cc-top">
              <div className="contactless-icon">
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M8.5 14c-.6-.7-1-1.6-1-2.5s.4-1.8 1-2.5"></path>
                  <path d="M12 16.5c-1.3-1.4-2-3.2-2-5.5s.7-4.1 2-5.5"></path>
                  <path d="M15.5 19c-2-2-3-4.5-3-8s1-6 3-8"></path>
                </svg>
              </div>
              <div className="mastercard-logo">
                <div className="circle red"></div>
                <div className="circle yellow"></div>
              </div>
            </div>
            
            <div className="cc-number">
              <span>••••</span>
              <span>••••</span>
              <span>••••</span>
              <span>8842</span>
            </div>
            
            <div className="cc-bottom">
              <div className="cc-field">
                <span className="cc-label">CARD HOLDER</span>
                {/* <span className="cc-value">Alex Sterling</span> */}
              </div>
              <div className="cc-field text-right">
                <span className="cc-label">EXPIRES</span>
                {/* <span className="cc-value">12/26</span> */}
              </div>
            </div>
          </div>

          <button className="btn-glass-gray">Manage Methods</button>
        </motion.div>
      </div>

      {/* Billing History Section */}
      <motion.div 
        className="billing-card history-card glass"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.3 }}
      >
        <div className="history-header">
          <h3>Billing History</h3>
          <div className="history-actions">
            <button className="btn-outline-small">Filter</button>
            <button className="btn-outline-small">Export CSV</button>
          </div>
        </div>

        <div className="history-table-container">
          <table className="history-table">
            <thead>
              <tr>
                <th>INVOICE ID</th>
                <th>DATE</th>
                <th>AMOUNT</th>
                <th>STATUS</th>
                <th>ACTIONS</th>
              </tr>
            </thead>
            <tbody>
              {BillingHistory.map((invoice) => (
                <tr key={invoice.id}>
                  <td className="font-mono text-muted">{invoice.id}</td>
                  <td>{invoice.date}</td>
                  <td className="font-bold">{invoice.amount}</td>
                  <td>
                    <span className="status-badge-green">PAID</span>
                  </td>
                  <td>
                    <button className="action-icon-btn">
                      <Download size={18} />
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        
        <div className="view-all-row">
          <button className="view-all-link">View All Billing History</button>
        </div>
      </motion.div>

      {/* Footer Support Cards */}
      <div className="billing-footer-grid">
        <motion.div 
          className="support-card glass"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
        >
          <div className="support-icon blue-bg">
            <Receipt size={24} />
          </div>
          <div className="support-content">
            <h4>Tax & Tax ID</h4>
            <p>Need to add a VAT or TAX ID to your invoices? You can update your billing details in the profile section.</p>
            <button className="support-link">Edit Billing Profile</button>
          </div>
        </motion.div>

        <motion.div 
          className="support-card glass"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5 }}
        >
          <div className="support-icon purple-bg">
            <LifeBuoy size={24} />
          </div>
          <div className="support-content">
            <h4>Billing Support</h4>
            <p>Questions about your current invoice or need to downgrade? Our support team is here to help you 24/7.</p>
            <button className="support-link">Contact Support</button>
          </div>
        </motion.div>
      </div>

    </div>
  );
};

export default Billing;
