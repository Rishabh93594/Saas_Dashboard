import React, { useState, useEffect } from 'react';
import { MoreVertical, ExternalLink, Loader2, Trash2, Plus, ArrowUpDown, ChevronDown, LayoutGrid, List } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import OrdersKanban from './OrdersKanban';
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

type SortKey = 'date' | 'amount' | 'client';
type SortDirection = 'asc' | 'desc';

const OrdersTable: React.FC = () => {
  const [orders, setOrders] = useState<Order[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [newOrder, setNewOrder] = useState({ client: '', amount: '', status: 'Processing' });
  const [isSubmitting, setIsSubmitting] = useState(false);
  
  // New features state
  const [selectedOrders, setSelectedOrders] = useState<string[]>([]);
  const [sortConfig, setSortConfig] = useState<{ key: SortKey; direction: SortDirection } | null>(null);
  const [viewMode, setViewMode] = useState<'table' | 'kanban'>('table');

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
      setSelectedOrders(prev => prev.filter(selectedId => selectedId !== id));
    } catch (err) {
      console.error('Error deleting order:', err);
      alert('Failed to delete order.');
    }
  };

  const handleBulkDelete = async () => {
    if (!window.confirm(`Are you sure you want to delete ${selectedOrders.length} orders?`)) return;
    setIsLoading(true);
    for (const id of selectedOrders) {
      await handleDelete(id);
    }
    setSelectedOrders([]);
    setIsLoading(false);
  };

  const handleUpdateStatus = async (id: string, newStatus: string) => {
    try {
      const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:5000';
      const response = await fetch(`${API_URL}/api/orders/${id}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ status: newStatus }),
      });
      if (!response.ok) throw new Error('Failed to update order');
      const updatedOrder = await response.json();
      setOrders(orders.map(o => (o._id === id ? updatedOrder : o)));
    } catch (err) {
      console.error('Error updating status:', err);
      alert('Failed to update status.');
    }
  };

  const handleAddOrder = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    try {
      const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:5000';
      const orderId = `#ORD-${Math.floor(10000 + Math.random() * 90000)}`;
      const date = new Date().toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' });
      const avatar = `https://i.pravatar.cc/150?u=${orderId}`;
      
      const response = await fetch(`${API_URL}/api/orders`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ ...newOrder, orderId, date, avatar }),
      });
      
      if (!response.ok) throw new Error('Failed to create order');
      const createdOrder = await response.json();
      setOrders([createdOrder, ...orders]);
      setIsModalOpen(false);
      setNewOrder({ client: '', amount: '', status: 'Processing' });
    } catch (err) {
      console.error('Error adding order:', err);
      alert('Failed to add order.');
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleSort = (key: SortKey) => {
    let direction: SortDirection = 'asc';
    if (sortConfig && sortConfig.key === key && sortConfig.direction === 'asc') {
      direction = 'desc';
    }
    setSortConfig({ key, direction });
  };

  const sortedOrders = React.useMemo(() => {
    let sortableOrders = [...orders];
    if (sortConfig !== null) {
      sortableOrders.sort((a, b) => {
        if (sortConfig.key === 'amount') {
          const amountA = parseFloat(a.amount.replace(/[^0-9.-]+/g, ""));
          const amountB = parseFloat(b.amount.replace(/[^0-9.-]+/g, ""));
          return sortConfig.direction === 'asc' ? amountA - amountB : amountB - amountA;
        }
        if (sortConfig.key === 'date') {
          const dateA = new Date(a.date).getTime();
          const dateB = new Date(b.date).getTime();
          return sortConfig.direction === 'asc' ? dateA - dateB : dateB - dateA;
        }
        if (a[sortConfig.key] < b[sortConfig.key]) {
          return sortConfig.direction === 'asc' ? -1 : 1;
        }
        if (a[sortConfig.key] > b[sortConfig.key]) {
          return sortConfig.direction === 'asc' ? 1 : -1;
        }
        return 0;
      });
    }
    return sortableOrders;
  }, [orders, sortConfig]);

  const toggleSelectAll = () => {
    if (selectedOrders.length === orders.length) {
      setSelectedOrders([]);
    } else {
      setSelectedOrders(orders.map(o => o._id));
    }
  };

  const toggleSelectOrder = (id: string) => {
    if (selectedOrders.includes(id)) {
      setSelectedOrders(selectedOrders.filter(selectedId => selectedId !== id));
    } else {
      setSelectedOrders([...selectedOrders, id]);
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
        <div className="header-actions">
          <div className="view-toggle">
            <button 
              className={`toggle-btn ${viewMode === 'table' ? 'active' : ''}`}
              onClick={() => setViewMode('table')}
              title="List View"
            >
              <List size={16} />
            </button>
            <button 
              className={`toggle-btn ${viewMode === 'kanban' ? 'active' : ''}`}
              onClick={() => setViewMode('kanban')}
              title="Board View"
            >
              <LayoutGrid size={16} />
            </button>
          </div>
          <AnimatePresence>
            {selectedOrders.length > 0 && viewMode === 'table' && (
              <motion.button 
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.9 }}
                className="view-all glass-pill bulk-delete-btn" 
                onClick={handleBulkDelete}
                style={{ color: '#ef4444', borderColor: 'rgba(239, 68, 68, 0.2)' }}
              >
                <Trash2 size={14} /> Delete Selected ({selectedOrders.length})
              </motion.button>
            )}
          </AnimatePresence>
          <button className="view-all glass-pill" onClick={() => setIsModalOpen(true)}>
            <Plus size={14} /> New Order
          </button>
          <button className="view-all glass-pill hidden-mobile">
            Export Data <ExternalLink size={14} />
          </button>
        </div>
      </div>
      
      {viewMode === 'kanban' ? (
        <OrdersKanban orders={orders} isLoading={isLoading} onUpdateStatus={handleUpdateStatus} />
      ) : (
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
                  <th style={{ width: '40px' }}>
                    <input 
                      type="checkbox" 
                      className="custom-checkbox"
                      checked={selectedOrders.length === orders.length && orders.length > 0}
                      onChange={toggleSelectAll}
                    />
                  </th>
                  <th>Order ID</th>
                  <th className="sortable" onClick={() => handleSort('client')}>
                    Partner <ArrowUpDown size={12} className="sort-icon" />
                  </th>
                  <th>Current Status</th>
                  <th className="sortable" onClick={() => handleSort('date')}>
                    Filing Date <ArrowUpDown size={12} className="sort-icon" />
                  </th>
                  <th className="sortable amount-cell" onClick={() => handleSort('amount')}>
                    Valuation <ArrowUpDown size={12} className="sort-icon" />
                  </th>
                  <th className="actions-cell"></th>
                </tr>
              </thead>
              <tbody>
                <AnimatePresence>
                  {sortedOrders.map((order, index) => (
                    <motion.tr 
                      key={order._id}
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: index * 0.05 }}
                      className={selectedOrders.includes(order._id) ? 'selected-row' : ''}
                    >
                      <td>
                        <input 
                          type="checkbox" 
                          className="custom-checkbox"
                          checked={selectedOrders.includes(order._id)}
                          onChange={() => toggleSelectOrder(order._id)}
                        />
                      </td>
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
                        <div className="status-select-wrapper">
                          <select 
                            className={`status-select status-${order.status.toLowerCase()}`}
                            value={order.status}
                            onChange={(e) => handleUpdateStatus(order._id, e.target.value)}
                          >
                            <option value="Completed">Completed</option>
                            <option value="Processing">Processing</option>
                            <option value="Hold">Hold</option>
                          </select>
                          <ChevronDown size={12} className="select-chevron" />
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
      )}

      <AnimatePresence>
        {isModalOpen && (
          <motion.div 
            className="modal-overlay"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          >
            <motion.div 
              className="modal-content glass"
              initial={{ y: 50, opacity: 0, scale: 0.95 }}
              animate={{ y: 0, opacity: 1, scale: 1 }}
              exit={{ y: 50, opacity: 0, scale: 0.95 }}
            >
              <h3 className="modal-title">Create New Order</h3>
              <form onSubmit={handleAddOrder}>
                <div className="form-group">
                  <label>Client Name</label>
                  <input 
                    type="text" 
                    required 
                    value={newOrder.client} 
                    onChange={e => setNewOrder({...newOrder, client: e.target.value})}
                    placeholder="e.g. Acme Corp"
                  />
                </div>
                <div className="form-group">
                  <label>Valuation</label>
                  <input 
                    type="text" 
                    required 
                    value={newOrder.amount} 
                    onChange={e => setNewOrder({...newOrder, amount: e.target.value})}
                    placeholder="e.g. $5,000.00"
                  />
                </div>
                <div className="form-group">
                  <label>Status</label>
                  <select 
                    value={newOrder.status} 
                    onChange={e => setNewOrder({...newOrder, status: e.target.value as any})}
                  >
                    <option value="Processing">Processing</option>
                    <option value="Completed">Completed</option>
                    <option value="Hold">Hold</option>
                  </select>
                </div>
                <div className="modal-actions">
                  <button type="button" className="glass-pill cancel-btn" onClick={() => setIsModalOpen(false)}>Cancel</button>
                  <button type="submit" className="glass-pill submit-btn" disabled={isSubmitting}>
                    {isSubmitting ? <Loader2 className="animate-spin" size={16} /> : 'Create Order'}
                  </button>
                </div>
              </form>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default OrdersTable;
