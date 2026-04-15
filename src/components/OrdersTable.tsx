import React from 'react';
import './OrdersTable.css';

interface Order {
  id: string;
  client: string;
  avatar: string;
  status: 'Completed' | 'Processing' | 'On Hold';
  date: string;
  amount: string;
}

const orders: Order[] = [
  {
    id: '#ORD-28492',
    client: 'Urban Nexus Inc.',
    avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=100&h=100&fit=crop',
    status: 'Completed',
    date: 'Oct 24, 2024',
    amount: '$12,400.00'
  },
  {
    id: '#ORD-28493',
    client: 'Global Logistics Ltd.',
    avatar: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=100&h=100&fit=crop',
    status: 'Processing',
    date: 'Oct 25, 2024',
    amount: '$8,250.00'
  },
  {
    id: '#ORD-28494',
    client: 'EcoSystems Agency',
    avatar: 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=100&h=100&fit=crop',
    status: 'On Hold',
    date: 'Oct 26, 2024',
    amount: '$3,120.00'
  },
  {
    id: '#ORD-28495',
    client: 'Stellar Venture Group',
    avatar: 'https://images.unsplash.com/photo-1552058544-f2b08422138a?w=100&h=100&fit=crop',
    status: 'Completed',
    date: 'Oct 27, 2024',
    amount: '$22,000.00'
  }
];

const OrdersTable: React.FC = () => {
  return (
    <div className="orders-section animate-in">
      <div className="orders-header">
        <div className="orders-title-group">
          <h3>Recent Orders</h3>
          <p>Transaction history and project status across your client base.</p>
        </div>
        <a href="#" className="view-all">View All Transactions</a>
      </div>
      <div className="table-container">
        <table>
          <thead>
            <tr>
              <th>Order ID</th>
              <th>Client Name</th>
              <th>Status</th>
              <th>Order Date</th>
              <th className="amount-cell">Amount</th>
            </tr>
          </thead>
          <tbody>
            {orders.map((order) => (
              <tr key={order.id}>
                <td className="order-id">{order.id}</td>
                <td>
                  <div className="client-cell">
                    <img src={order.avatar} alt={order.client} className="client-avatar" />
                    <span className="client-name">{order.client}</span>
                  </div>
                </td>
                <td>
                  <span className={`status-badge status-${order.status.toLowerCase().replace(' ', '')}`}>
                    <span className="status-dot"></span>
                    {order.status}
                  </span>
                </td>
                <td className="date-cell">{order.date}</td>
                <td className="amount-cell">{order.amount}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default OrdersTable;
