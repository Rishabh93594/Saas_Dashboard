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
  const textColor = isDark ? '#86efac' : '#1e5a38';
  const gridColor = isDark ? 'rgba(34, 197, 94, 0.08)' : '#f1f5f9';

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
        backgroundColor: isDark ? '#061f10' : '#f0fdf4',
        padding: 12,
        titleFont: {
          family: "'Outfit', sans-serif",
          size: 14,
          weight: 700,
        },
        bodyFont: {
          family: "'Outfit', sans-serif",
          size: 13,
          weight: 500,
        },
        cornerRadius: 8,
        displayColors: true,
        boxPadding: 6,
        titleColor: isDark ? '#f0fdf4' : '#062f17',
        bodyColor: isDark ? '#86efac' : '#1e5a38',
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
          callback: (value: any) => `${value}`,
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
        backgroundColor: '#1ed760',
        borderWidth: 3,
        borderColor: '#fff',
      },
    },
  };

  const labels = ['Group Stage', 'Round of 16', 'Quarter-Finals', 'Semi-Finals', 'Finals'];

  const data = {
    labels,
    datasets: [
      {
        fill: true,
        label: 'Qatar 2022 Goals',
        data: [120, 148, 158, 166, 172],
        borderColor: '#1ed760',
        backgroundColor: (context: any) => {
          const ctx = context.chart.ctx;
          const gradient = ctx.createLinearGradient(0, 0, 0, 400);
          gradient.addColorStop(0, 'rgba(30, 255, 120, 0.25)');
          gradient.addColorStop(1, 'rgba(30, 255, 120, 0)');
          return gradient;
        },
        borderWidth: 3,
      },
      {
        fill: false,
        label: 'Russia 2018 Goals',
        data: [122, 146, 157, 163, 169],
        borderColor: '#ffd700',
        borderWidth: 2,
        borderDash: [5, 5],
        backgroundColor: 'transparent',
      },
    ],
  };

  return (
    <div className="revenue-chart-container glass">
      <div className="chart-header">
        <div className="chart-title-group">
          <h3 className="section-title">Goal Scoring Dynamics</h3>
          <span className="chart-subtitle">Cumulative goals scored by tournament stage</span>
        </div>
        <div className="chart-actions">
          <select className="glass-pill chart-select">
            <option>FIFA Cup 2022</option>
            <option>FIFA Cup 2018</option>
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
