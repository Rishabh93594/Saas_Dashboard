import React from 'react';
import {
  Chart as ChartJS,
  registerables,
  Filler
} from 'chart.js';
import { Line } from 'react-chartjs-2';
import { useTheme } from '../ThemeContext';
import './RevenueChart.css';

ChartJS.register(...registerables, Filler);

const RevenueChart: React.FC = () => {
  const { theme } = useTheme();

  const isDark = theme === 'dark';
  const textColor = isDark ? '#94a3b8' : '#64748b';
  const gridColor = isDark ? 'rgba(255, 255, 255, 0.05)' : '#f1f5f9';

  const options = {
    responsive: true,
    maintainAspectRatio: false,
    interaction: {
      mode: 'index' as const,
      intersect: false,
    },
    plugins: {
      legend: {
        position: 'top' as const,
        align: 'end' as const,
        labels: {
          padding: 20,
          usePointStyle: true,
          pointStyle: 'circle',
          font: {
            family: "'Outfit', sans-serif",
            size: 12,
            weight: 700,
          },
          color: textColor,
        },
      },
      tooltip: {
        backgroundColor: isDark ? '#1e293b' : '#0f172a',
        padding: 12,
        titleFont: {
          family: "'Plus Jakarta Sans', sans-serif",
          size: 14,
          weight: 700,
        },
        bodyFont: {
          family: "'Plus Jakarta Sans', sans-serif",
          size: 13,
          weight: 500,
        },
        cornerRadius: 8,
        displayColors: true,
        boxPadding: 6,
      },
    },
    scales: {
      x: {
        grid: {
          display: false,
        },
        ticks: {
          font: {
            family: "'Outfit', sans-serif",
            size: 12,
            weight: 600,
          },
          color: textColor,
        },
      },
      y: {
        beginAtZero: true,
        grid: {
          color: gridColor,
          drawBorder: false,
        },
        ticks: {
          font: {
            family: "'Outfit', sans-serif",
            size: 12,
            weight: 600,
          },
          color: textColor,
          callback: (value: any) => `$${value}k`,
        },
      },
    },
    elements: {
      line: {
        tension: 0.4,
      },
      point: {
        radius: 0,
        hoverRadius: 6,
        backgroundColor: '#2563eb',
        borderWidth: 3,
        borderColor: '#fff',
      },
    },
  };

  const labels = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun'];

  const data = {
    labels,
    datasets: [
      {
        fill: true,
        label: 'Revenue',
        data: [32, 45, 42, 68, 55, 74],
        borderColor: '#6366f1',
        backgroundColor: (context: any) => {
          const ctx = context.chart.ctx;
          const gradient = ctx.createLinearGradient(0, 0, 0, 400);
          gradient.addColorStop(0, 'rgba(99, 102, 241, 0.2)');
          gradient.addColorStop(1, 'rgba(99, 102, 241, 0)');
          return gradient;
        },
        borderWidth: 3,
      },
      {
        fill: true,
        label: 'Projections',
        data: [25, 38, 45, 52, 60, 68],
        borderColor: '#94a3b8',
        borderDash: [5, 5],
        backgroundColor: 'transparent',
        borderWidth: 2,
      },
    ],
  };

  return (
    <div className="revenue-chart-container glass">
      <div className="chart-header">
        <div className="chart-title-group">
          <h3 className="section-title">Revenue Dynamics</h3>
          <span className="chart-subtitle">Regional performance for H1 2024</span>
        </div>
        <div className="chart-actions">
          <select className="glass-pill chart-select">
            <option>Last 6 Months</option>
            <option>Last Year</option>
          </select>
        </div>
      </div>

      <div className="chart-body">
        <Line options={options} data={data} />
      </div>
    </div>
  );
};

export default RevenueChart;
