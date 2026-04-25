import React, { useState, useEffect } from 'react';
import { MoreVertical, ExternalLink, Loader2, Trash2 } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import './OrdersTable.css';

interface Order {
  _id: string; // MongoDB ID
  orderId: string;
  client: string;
  avatar: string;
  status: 'Completed' | 'Processing' | 'Hold';
  date: string;
  amount: string;
}

const OrdersTable: React.FC = () => {
  const [orders, setOrders] = useState<Order[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchOrders = async () => {
      try {
        setIsLoading(true);
        const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:5000';
        const response = await fetch(`${API_URL}/api/orders`);
        if (!response.ok) throw new Error('Failed to fetch orders');
        const data = await response.json();
        setOrders(data);
      } catch (err) {
        setError(err instanceof Error ? err.message : 'Something went wrong');
      } finally {
        setIsLoading(false);
      }
    };

    fetchOrders();
  }, []);

  const handleDelete = async (id: string) => {
    try {
      const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:5000';
      const response = await fetch(`${API_URL}/api/orders/${id}`, {
        method: 'DELETE',
      });
      if (!response.ok) throw new Error('Failed to delete order');
      setOrders(orders.filter(order => order._id !== id));
    } catch (err) {
      console.error('Error deleting order:', err);
      alert('Failed to delete order.');
    }
  };

  if (error) {
    return (
      <div className="orders-section glass error-state">
        <p>Error loading orders: {error}</p>
        <button onClick={() => window.location.reload()} className="glass-pill">Retry</button>
      </div>
    );
  }

  return (
    <div className="orders-section glass">
      <div className="orders-header">
        <div className="orders-title-group">
          <h3 className="section-title">Client Engagement</h3>
          <p className="section-subtitle">A detailed overview of recent architectural contract progress.</p>
        </div>
        <button className="view-all glass-pill">
          Export Data <ExternalLink size={14} />
        </button>
      </div>
      <div className="table-container">
        {isLoading ? (
          <div className="table-loader">
            <Loader2 className="animate-spin text-primary" size={32} />
            <span>Syncing with secure server...</span>
          </div>
        ) : (
          <table>
            <thead>
              <tr>
                <th>Order ID</th>
                <th>Partner</th>
                <th>Current Status</th>
                <th>Filing Date</th>
                <th className="amount-cell">Valuation</th>
                <th className="actions-cell"></th>
              </tr>
            </thead>
            <tbody>
              <AnimatePresence>
                {orders.map((order, index) => (
                  <motion.tr 
                    key={order._id}
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: index * 0.05 }}
                  >
                    <td className="order-id">{order.orderId}</td>
                    <td>
                      <div className="client-cell">
                        <div className="avatar-stack">
                          <img src={order.avatar} alt={order.client} className="client-avatar" />
                          <div className="status-ping"></div>
                        </div>
                        <span className="client-name">{order.client}</span>
                      </div>
                    </td>
                    <td>
                      <div className={`status-badge glass-pill status-${order.status.toLowerCase()}`}>
                        <span className="status-dot"></span>
                        {order.status}
                      </div>
                    </td>
                    <td className="date-cell">{order.date}</td>
                    <td className="amount-cell">
                      <span className="amount-value">{order.amount}</span>
                    </td>
                    <td className="actions-cell">
                      <button 
                        className="row-action-btn delete-btn" 
                        onClick={() => handleDelete(order._id)}
                        title="Delete Order"
                      >
                        <Trash2 size={18} />
                      </button>
                    </td>
                  </motion.tr>
                ))}
              </AnimatePresence>
            </tbody>
          </table>
        )}
      </div>
    </div>
  );
};

export default OrdersTable;

