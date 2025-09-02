// ======================================
// Chart Management System
// ======================================

class ChartManager {
  constructor() {
    this.charts = new Map();
    this.defaultOptions = this.getDefaultOptions();
  }

  getDefaultOptions() {
    return {
      responsive: true,
      maintainAspectRatio: false,
      plugins: {
        legend: {
          position: 'bottom',
          labels: {
            padding: 20,
            usePointStyle: true,
            font: {
              family: 'Inter',
              size: 12
            }
          }
        },
        tooltip: {
          backgroundColor: 'rgba(0, 0, 0, 0.8)',
          titleColor: '#fff',
          bodyColor: '#fff',
          borderColor: '#1f4788',
          borderWidth: 1,
          cornerRadius: 8,
          displayColors: true
        }
      },
      scales: {
        x: {
          grid: {
            color: 'rgba(0, 0, 0, 0.05)'
          },
          ticks: {
            font: {
              family: 'Inter',
              size: 11
            },
            color: '#6c757d'
          }
        },
        y: {
          grid: {
            color: 'rgba(0, 0, 0, 0.05)'
          },
          ticks: {
            font: {
              family: 'Inter',
              size: 11
            },
            color: '#6c757d'
          }
        }
      },
      interaction: {
        intersect: false,
        mode: 'index'
      },
      animation: {
        duration: 800,
        easing: 'easeInOutQuart'
      }
    };
  }

  // Initialize charts for a dashboard
  async initializeDashboardCharts(domain) {
    try {
      // Initialize sparklines first
      this.initializeSparklines();
      
      // Then initialize main charts
      await this.createForecastChart(domain);
      await this.createTrendChart(domain);
      await this.createBreakdownChart(domain);
      
    } catch (error) {
      console.error('Error initializing dashboard charts:', error);
    }
  }

  // Initialize sparkline charts in KPI cards
  initializeSparklines() {
    const sparklines = document.querySelectorAll('.sparkline');
    
    sparklines.forEach(canvas => {
      const trendData = JSON.parse(canvas.dataset.trend || '[]');
      if (trendData.length === 0) return;
      
      const ctx = canvas.getContext('2d');
      const chartId = `sparkline-${Date.now()}-${Math.random()}`;
      
      const chart = new Chart(ctx, {
        type: 'line',
        data: {
          labels: trendData.map((_, index) => index + 1),
          datasets: [{
            data: trendData,
            borderColor: '#1f4788',
            backgroundColor: 'rgba(31, 71, 136, 0.1)',
            borderWidth: 2,
            tension: 0.4,
            pointRadius: 0,
            pointHoverRadius: 4,
            fill: true
          }]
        },
        options: {
          responsive: true,
          maintainAspectRatio: false,
          plugins: {
            legend: { display: false },
            tooltip: { enabled: false }
          },
          scales: {
            x: { display: false },
            y: { display: false }
          },
          elements: {
            point: { radius: 0 }
          },
          animation: {
            duration: 600
          }
        }
      });
      
      this.charts.set(chartId, chart);
    });
  }

  // Create forecast chart
  async createForecastChart(domain) {
    const canvas = document.getElementById(`forecast-chart-${domain}`);
    if (!canvas) return;

    const chartData = await mockData.getChartData('forecastData', domain);
    const ctx = canvas.getContext('2d');
    
    const options = {
      ...this.defaultOptions,
      plugins: {
        ...this.defaultOptions.plugins,
        title: {
          display: false
        },
        tooltip: {
          ...this.defaultOptions.plugins.tooltip,
          callbacks: {
            label: function(context) {
              const label = context.dataset.label || '';
              const value = context.parsed.y;
              return `${label}: €${value.toFixed(1)}M`;
            }
          }
        }
      },
      scales: {
        ...this.defaultOptions.scales,
        y: {
          ...this.defaultOptions.scales.y,
          beginAtZero: false,
          ticks: {
            ...this.defaultOptions.scales.y.ticks,
            callback: function(value) {
              return `€${value}M`;
            }
          }
        }
      },
      onClick: (event, elements) => {
        if (elements.length > 0) {
          const element = elements[0];
          const dataIndex = element.index;
          this.handleChartClick('forecast', domain, dataIndex);
        }
      }
    };

    const chart = new Chart(ctx, {
      type: 'line',
      data: chartData,
      options: options
    });

    this.charts.set(`forecast-chart-${domain}`, chart);
  }

  // Create trend chart
  async createTrendChart(domain) {
    const canvas = document.getElementById(`trend-chart-${domain}`);
    if (!canvas) return;

    const chartData = await mockData.getChartData('trendData', domain);
    const ctx = canvas.getContext('2d');
    
    const options = {
      ...this.defaultOptions,
      plugins: {
        ...this.defaultOptions.plugins,
        tooltip: {
          ...this.defaultOptions.plugins.tooltip,
          callbacks: {
            label: function(context) {
              const label = context.dataset.label || '';
              const value = context.parsed.y;
              return `${label}: ${value}%`;
            }
          }
        }
      },
      scales: {
        ...this.defaultOptions.scales,
        y: {
          ...this.defaultOptions.scales.y,
          min: 70,
          max: 100,
          ticks: {
            ...this.defaultOptions.scales.y.ticks,
            callback: function(value) {
              return `${value}%`;
            }
          }
        }
      },
      onClick: (event, elements) => {
        if (elements.length > 0) {
          const element = elements[0];
          const dataIndex = element.index;
          this.handleChartClick('trend', domain, dataIndex);
        }
      }
    };

    const chart = new Chart(ctx, {
      type: 'line',
      data: chartData,
      options: options
    });

    this.charts.set(`trend-chart-${domain}`, chart);
  }

  // Create breakdown chart
  async createBreakdownChart(domain) {
    const canvas = document.getElementById(`breakdown-chart-${domain}`);
    if (!canvas) return;

    const chartData = await mockData.getChartData('breakdownData', domain);
    const ctx = canvas.getContext('2d');
    
    const options = {
      ...this.defaultOptions,
      plugins: {
        ...this.defaultOptions.plugins,
        tooltip: {
          ...this.defaultOptions.plugins.tooltip,
          callbacks: {
            label: function(context) {
              const label = context.dataset.label || '';
              const value = context.parsed.y;
              return `${label}: €${value}K`;
            }
          }
        }
      },
      scales: {
        ...this.defaultOptions.scales,
        y: {
          ...this.defaultOptions.scales.y,
          beginAtZero: true,
          ticks: {
            ...this.defaultOptions.scales.y.ticks,
            callback: function(value) {
              return `€${value}K`;
            }
          }
        }
      },
      onClick: (event, elements) => {
        if (elements.length > 0) {
          const element = elements[0];
          const dataIndex = element.index;
          this.handleChartClick('breakdown', domain, dataIndex);
        }
      }
    };

    const chart = new Chart(ctx, {
      type: 'bar',
      data: chartData,
      options: options
    });

    this.charts.set(`breakdown-chart-${domain}`, chart);
  }

  // Handle chart clicks
  handleChartClick(chartType, domain, dataIndex) {
    console.log(`Chart clicked: ${chartType} in ${domain}, data point ${dataIndex}`);
    
    // Show a simple notification for demo purposes
    this.showChartClickNotification(chartType, domain, dataIndex);
    
    // In a real application, this would:
    // 1. Apply filters to other charts
    // 2. Show drill-down data
    // 3. Navigate to detail views
  }

  showChartClickNotification(chartType, domain, dataIndex) {
    // Create a temporary notification
    const notification = document.createElement('div');
    notification.className = 'chart-click-notification';
    notification.style.cssText = `
      position: fixed;
      top: 80px;
      right: 20px;
      background: #1f4788;
      color: white;
      padding: 12px 20px;
      border-radius: 8px;
      z-index: 1000;
      font-size: 14px;
      box-shadow: 0 4px 12px rgba(0,0,0,0.15);
      animation: slideInRight 0.3s ease-out;
    `;
    notification.innerHTML = `
      <i class="fas fa-info-circle" style="margin-right: 8px;"></i>
      Chart point clicked: ${chartType} #${dataIndex + 1}
    `;
    
    document.body.appendChild(notification);
    
    // Remove after 3 seconds
    setTimeout(() => {
      notification.style.animation = 'slideOutRight 0.3s ease-in forwards';
      setTimeout(() => notification.remove(), 300);
    }, 3000);
  }

  // Update charts with new data (for filter changes)
  async updateCharts(domain, filters) {
    try {
      // Update forecast chart
      const forecastChart = this.charts.get(`forecast-chart-${domain}`);
      if (forecastChart) {
        const newData = await mockData.getChartData('forecastData', domain, filters);
        forecastChart.data = newData;
        forecastChart.update('active');
      }

      // Update trend chart
      const trendChart = this.charts.get(`trend-chart-${domain}`);
      if (trendChart) {
        const newData = await mockData.getChartData('trendData', domain, filters);
        trendChart.data = newData;
        trendChart.update('active');
      }

      // Update breakdown chart
      const breakdownChart = this.charts.get(`breakdown-chart-${domain}`);
      if (breakdownChart) {
        const newData = await mockData.getChartData('breakdownData', domain, filters);
        breakdownChart.data = newData;
        breakdownChart.update('active');
      }
      
    } catch (error) {
      console.error('Error updating charts:', error);
    }
  }

  // Destroy chart by ID
  destroyChart(chartId) {
    const chart = this.charts.get(chartId);
    if (chart) {
      chart.destroy();
      this.charts.delete(chartId);
    }
  }

  // Destroy all charts
  destroyAllCharts() {
    this.charts.forEach((chart, chartId) => {
      chart.destroy();
    });
    this.charts.clear();
  }

  // Resize all charts (for responsive behavior)
  resizeCharts() {
    this.charts.forEach(chart => {
      chart.resize();
    });
  }

  // Export chart as image
  exportChart(chartId, filename = 'chart.png') {
    const chart = this.charts.get(chartId);
    if (!chart) return;

    const url = chart.toBase64Image();
    const link = document.createElement('a');
    link.download = filename;
    link.href = url;
    link.click();
  }

  // Create heatmap chart (for delivery domain)
  createHeatmapChart(domain) {
    // This would be implemented with a different charting library
    // like D3.js or a specialized heatmap library
    console.log(`Heatmap chart would be created for ${domain}`);
  }

  // Create treemap chart (for client domain)
  createTreemapChart(domain) {
    // This would be implemented with D3.js or similar
    console.log(`Treemap chart would be created for ${domain}`);
  }
}

// Add CSS for chart notifications
const chartNotificationStyles = document.createElement('style');
chartNotificationStyles.textContent = `
  @keyframes slideInRight {
    from {
      transform: translateX(100%);
      opacity: 0;
    }
    to {
      transform: translateX(0);
      opacity: 1;
    }
  }
  
  @keyframes slideOutRight {
    from {
      transform: translateX(0);
      opacity: 1;
    }
    to {
      transform: translateX(100%);
      opacity: 0;
    }
  }
`;
document.head.appendChild(chartNotificationStyles);

// Initialize chart manager
const charts = new ChartManager();

// Handle window resize for responsive charts
window.addEventListener('resize', () => {
  charts.resizeCharts();
});