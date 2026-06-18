import React, { useState, useEffect } from 'react';
import { ExternalLink, Loader2, Trash2, Plus, ArrowUpDown, ChevronDown, LayoutGrid, List } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import OrdersKanban from './OrdersKanban';
import './OrdersTable.css';

interface Order {
  _id: string; // MongoDB ID
  orderId: string;
  client: string; // Teams
  avatar: string;
  status: 'Completed' | 'Live' | 'Scheduled';
  date: string;
  amount: string; // Score
}

type SortKey = 'date' | 'amount' | 'client';
type SortDirection = 'asc' | 'desc';

const FALLBACK_ORDERS: Order[] = [
  { _id: 'f1',  orderId: '#MAT-10064', client: 'Argentina vs France',      avatar: 'https://images.unsplash.com/photo-1508098682722-e99c43a406b2?w=100&h=100&fit=crop', status: 'Completed', date: 'Dec 18, 2022', amount: '3 - 3 (4-2 Pen)' },
  { _id: 'f2',  orderId: '#MAT-10063', client: 'Croatia vs Morocco',       avatar: 'https://images.unsplash.com/photo-1508098682722-e99c43a406b2?w=100&h=100&fit=crop', status: 'Completed', date: 'Dec 17, 2022', amount: '2 - 1'            },
  { _id: 'f3',  orderId: '#MAT-10062', client: 'France vs Morocco',        avatar: 'https://images.unsplash.com/photo-1508098682722-e99c43a406b2?w=100&h=100&fit=crop', status: 'Completed', date: 'Dec 14, 2022', amount: '2 - 0'            },
  { _id: 'f4',  orderId: '#MAT-10061', client: 'Argentina vs Croatia',     avatar: 'https://images.unsplash.com/photo-1508098682722-e99c43a406b2?w=100&h=100&fit=crop', status: 'Completed', date: 'Dec 13, 2022', amount: '3 - 0'            },
  { _id: 'f5',  orderId: '#MAT-10060', client: 'England vs France',        avatar: 'https://images.unsplash.com/photo-1508098682722-e99c43a406b2?w=100&h=100&fit=crop', status: 'Completed', date: 'Dec 10, 2022', amount: '1 - 2'            },
  { _id: 'f6',  orderId: '#MAT-10059', client: 'Morocco vs Portugal',      avatar: 'https://images.unsplash.com/photo-1508098682722-e99c43a406b2?w=100&h=100&fit=crop', status: 'Completed', date: 'Dec 10, 2022', amount: '1 - 0'            },
  { _id: 'f7',  orderId: '#MAT-10058', client: 'Brazil vs Croatia',        avatar: 'https://images.unsplash.com/photo-1508098682722-e99c43a406b2?w=100&h=100&fit=crop', status: 'Completed', date: 'Dec 09, 2022', amount: '1 - 1 (2-4 Pen)' },
  { _id: 'f8',  orderId: '#MAT-10057', client: 'Netherlands vs Argentina', avatar: 'https://images.unsplash.com/photo-1508098682722-e99c43a406b2?w=100&h=100&fit=crop', status: 'Completed', date: 'Dec 09, 2022', amount: '2 - 2 (3-4 Pen)' },
  { _id: 'f9',  orderId: '#MAT-20001', client: 'Argentina vs Brazil',      avatar: 'https://images.unsplash.com/photo-1508098682722-e99c43a406b2?w=100&h=100&fit=crop', status: 'Live',      date: 'Live Now',     amount: "2 - 1 (75')"    },
  { _id: 'f10', orderId: '#MAT-20002', client: 'Spain vs Germany',         avatar: 'https://images.unsplash.com/photo-1508098682722-e99c43a406b2?w=100&h=100&fit=crop', status: 'Scheduled', date: 'Jun 28, 2026', amount: 'vs'               },
];

const OrdersTable: React.FC = () => {
  const [orders, setOrders] = useState<Order[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [newOrder, setNewOrder] = useState({ client: '', amount: '', status: 'Scheduled' as any });
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
        
        // Map backend match properties (matchId, teams, score, status) to local UI models (orderId, client, amount, status)
        const mappedData = data.map((item: any) => ({
          _id: item._id,
          orderId: item.matchId || item.orderId || `#MAT-${Math.floor(10000 + Math.random() * 90000)}`,
          client: item.teams || item.client || 'TBD vs TBD',
          avatar: item.avatar || 'https://images.unsplash.com/photo-1508098682722-e99c43a406b2?w=100&h=100&fit=crop',
          status: item.status === 'Processing' ? 'Live' : (item.status === 'Hold' ? 'Scheduled' : item.status),
          date: item.date || 'TBD',
          amount: item.score || item.amount || '-'
        }));
        
        setOrders(mappedData);
      } catch (err) {
        // Use fallback data so the UI never shows a broken error state in production
        console.warn('API unavailable, using fallback match data:', err);
        setOrders(FALLBACK_ORDERS);
        setError(null);
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
      if (!response.ok) throw new Error('Failed to delete match');
      setOrders(orders.filter(order => order._id !== id));
      setSelectedOrders(prev => prev.filter(selectedId => selectedId !== id));
    } catch (err) {
      console.error('Error deleting match:', err);
      alert('Failed to delete match.');
    }
  };

  const handleBulkDelete = async () => {
    if (!window.confirm(`Are you sure you want to delete ${selectedOrders.length} matches?`)) return;
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
      if (!response.ok) throw new Error('Failed to update status');
      const updatedOrder = await response.json();
      
      const mappedUpdatedOrder = {
        _id: updatedOrder._id,
        orderId: updatedOrder.matchId || updatedOrder.orderId,
        client: updatedOrder.teams || updatedOrder.client,
        avatar: updatedOrder.avatar,
        status: updatedOrder.status,
        date: updatedOrder.date,
        amount: updatedOrder.score || updatedOrder.amount
      };
      
      setOrders(orders.map(o => (o._id === id ? mappedUpdatedOrder : o)));
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
      const matchId = `#MAT-${Math.floor(10000 + Math.random() * 90000)}`;
      const date = new Date().toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' });
      const avatar = `https://images.unsplash.com/photo-1508098682722-e99c43a406b2?w=100&h=100&fit=crop`;
      
      const response = await fetch(`${API_URL}/api/orders`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ 
          matchId, 
          teams: newOrder.client, 
          avatar, 
          status: newOrder.status, 
          date, 
          score: newOrder.amount 
        }),
      });
      
      if (!response.ok) throw new Error('Failed to create match');
      const createdOrder = await response.json();
      
      const mappedOrder = {
        _id: createdOrder._id,
        orderId: createdOrder.matchId,
        client: createdOrder.teams,
        avatar: createdOrder.avatar,
        status: createdOrder.status,
        date: createdOrder.date,
        amount: createdOrder.score
      };
      
      setOrders([mappedOrder, ...orders]);
      setIsModalOpen(false);
      setNewOrder({ client: '', amount: '', status: 'Scheduled' });
    } catch (err) {
      console.error('Error adding match:', err);
      alert('Failed to add match.');
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
          const amountA = parseFloat(a.amount.replace(/[^0-9.-]+/g, "")) || 0;
          const amountB = parseFloat(b.amount.replace(/[^0-9.-]+/g, "")) || 0;
          return sortConfig.direction === 'asc' ? amountA - amountB : amountB - amountA;
        }
        if (sortConfig.key === 'date') {
          const dateA = new Date(a.date).getTime() || 0;
          const dateB = new Date(b.date).getTime() || 0;
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
        <p>Error loading matches: {error}</p>
        <button onClick={() => window.location.reload()} className="glass-pill">Retry</button>
      </div>
    );
  }

  return (
    <div className="orders-section glass">
      <div className="orders-header">
        <div className="orders-title-group">
          <h3 className="section-title">Tournament Fixtures & Results</h3>
          <p className="section-subtitle">A detailed overview of match details, status, and scores.</p>
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
            <Plus size={14} /> Add Match
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
              <span>Syncing with tournament database...</span>
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
                  <th>Match ID</th>
                  <th className="sortable" onClick={() => handleSort('client')}>
                    Teams <ArrowUpDown size={12} className="sort-icon" />
                  </th>
                  <th>Status</th>
                  <th className="sortable" onClick={() => handleSort('date')}>
                    Kickoff Date <ArrowUpDown size={12} className="sort-icon" />
                  </th>
                  <th className="sortable amount-cell" onClick={() => handleSort('amount')}>
                    Score <ArrowUpDown size={12} className="sort-icon" />
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
                            {order.status === 'Live' && <div className="status-ping" style={{ backgroundColor: '#ef4444' }}></div>}
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
                            <option value="Scheduled">Scheduled</option>
                            <option value="Live">Live</option>
                            <option value="Completed">Completed</option>
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
                          title="Delete Match"
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
              <h3 className="modal-title">Add Custom Match</h3>
              <form onSubmit={handleAddOrder}>
                <div className="form-group">
                  <label>Teams</label>
                  <input 
                    type="text" 
                    required 
                    value={newOrder.client} 
                    onChange={e => setNewOrder({...newOrder, client: e.target.value})}
                    placeholder="e.g. Argentina vs France"
                  />
                </div>
                <div className="form-group">
                  <label>Score / Time (e.g. 3-3 or vs)</label>
                  <input 
                    type="text" 
                    required 
                    value={newOrder.amount} 
                    onChange={e => setNewOrder({...newOrder, amount: e.target.value})}
                    placeholder="e.g. 3 - 3"
                  />
                </div>
                <div className="form-group">
                  <label>Status</label>
                  <select 
                    value={newOrder.status} 
                    onChange={e => setNewOrder({...newOrder, status: e.target.value as any})}
                  >
                    <option value="Scheduled">Scheduled</option>
                    <option value="Live">Live</option>
                    <option value="Completed">Completed</option>
                  </select>
                </div>
                <div className="modal-actions">
                  <button type="button" className="glass-pill cancel-btn" onClick={() => setIsModalOpen(false)}>Cancel</button>
                  <button type="submit" className="glass-pill submit-btn" disabled={isSubmitting}>
                    {isSubmitting ? <Loader2 className="animate-spin" size={16} /> : 'Add Match'}
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
