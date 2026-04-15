import React from 'react';
import {
  Chart as ChartJS,
  registerables
} from 'chart.js';
import { Bar } from 'react-chartjs-2';
import './RevenueChart.css';

ChartJS.register(...registerables);

const RevenueChart: React.FC = () => {
  const options = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        position: 'top' as const,
        align: 'end' as const,
        labels: {
          padding: 20,
          usePointStyle: true,
          pointStyle: 'circle',
          font: {
            family: "'Plus Jakarta Sans', sans-serif",
            size: 12,
            weight: 600,
          },
          color: '#475569',
        },
      },
      tooltip: {
        backgroundColor: '#0f172a',
        padding: 12,
        titleFont: {
          family: "'Plus Jakarta Sans', sans-serif",
          size: 14,
          weight: 700,
        },
        bodyFont: {
          family: "'Plus Jakarta Sans', sans-serif",
          size: 13,
        },
        cornerRadius: 8,
        displayColors: false,
      },
    },
    scales: {
      x: {
        grid: {
          display: false,
        },
        ticks: {
          font: {
            family: "'Plus Jakarta Sans', sans-serif",
            size: 12,
            weight: 600,
          },
          color: '#94a3b8',
        },
      },
      y: {
        beginAtZero: true,
        grid: {
          color: '#f1f5f9',
          drawBorder: false,
        },
        ticks: {
          font: {
            family: "'Plus Jakarta Sans', sans-serif",
            size: 12,
            weight: 600,
          },
          color: '#94a3b8',
          callback: (value: any) => `${value}%`,
        },
      },
    },
    elements: {
      bar: {
        borderRadius: 8,
      },
    },
  };

  const labels = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun'];

  const data = {
    labels,
    datasets: [
      {
        label: 'Current Year',
        data: [40, 65, 55, 85, 75, 95],
        backgroundColor: '#2563eb',
        hoverBackgroundColor: '#1d4ed8',
        barThickness: 24,
      },
      {
        label: 'Previous Year',
        data: [30, 45, 50, 70, 60, 80],
        backgroundColor: '#cbd5e1',
        hoverBackgroundColor: '#94a3b8',
        barThickness: 24,
      },
    ],
  };

  return (
    <div className="revenue-chart-container animate-in">
      <div className="chart-header">
        <div className="chart-title-group">
          <h3>Revenue Growth</h3>
          <span>January — June 2024</span>
        </div>
      </div>

      <div className="chart-body">
        <Bar options={options} data={data} />
      </div>
    </div>
  );
};

export default RevenueChart;
