// ======================================
// Mock Data Service
// ======================================

class MockDataService {
  constructor() {
    this.init();
  }

  init() {
    // Initialize mock data if not already set
    if (!localStorage.getItem('mockupData')) {
      this.resetMockData();
    }
  }

  resetMockData() {
    const mockupData = {
      kpis: {
        financial: [
          {
            id: 'revenue',
            title: 'Revenue (YTD)',
            value: '€2.4M',
            change: 12.3,
            changeType: 'positive',
            trend: [2.1, 2.15, 2.2, 2.25, 2.3, 2.35, 2.4]
          },
          {
            id: 'gross-margin',
            title: 'Gross Margin %',
            value: '34.5%',
            change: -2.1,
            changeType: 'negative',
            trend: [36.8, 36.2, 35.8, 35.2, 34.8, 34.6, 34.5]
          },
          {
            id: 'revenue-per-consultant',
            title: 'Revenue per Consultant',
            value: '€85K',
            change: 5.8,
            changeType: 'positive',
            trend: [78, 80, 82, 83, 84, 84.5, 85]
          },
          {
            id: 'avg-billing-rate',
            title: 'Average Billing Rate',
            value: '€950',
            change: 1.2,
            changeType: 'positive',
            trend: [940, 942, 945, 947, 948, 949, 950]
          },
          {
            id: 'pipeline-coverage',
            title: 'Pipeline Coverage',
            value: '78%',
            change: -5.3,
            changeType: 'negative',
            trend: [85, 84, 82, 81, 80, 79, 78]
          }
        ],
        delivery: [
          {
            id: 'billable-utilization',
            title: 'Billable Utilization %',
            value: '82%',
            change: 3.1,
            changeType: 'positive',
            trend: [78, 79, 80, 80.5, 81, 81.5, 82]
          },
          {
            id: 'bench-percentage',
            title: 'Bench %',
            value: '12%',
            change: -1.8,
            changeType: 'positive',
            trend: [15, 14.5, 14, 13.5, 13, 12.5, 12]
          },
          {
            id: 'project-overrun-rate',
            title: 'Project Overrun Rate',
            value: '8%',
            change: -2.3,
            changeType: 'positive',
            trend: [11, 10.5, 10, 9.5, 9, 8.5, 8]
          },
          {
            id: 'on-time-delivery',
            title: 'On-Time Delivery %',
            value: '94%',
            change: 2.1,
            changeType: 'positive',
            trend: [91, 92, 92.5, 93, 93.2, 93.5, 94]
          }
        ],
        people: [
          {
            id: 'headcount',
            title: 'Total Headcount',
            value: '235',
            change: 8.5,
            changeType: 'positive',
            trend: [215, 218, 222, 225, 228, 232, 235]
          },
          {
            id: 'attrition',
            title: 'Attrition %',
            value: '8.5%',
            change: -1.2,
            changeType: 'positive',
            trend: [10.2, 9.8, 9.5, 9.2, 8.9, 8.7, 8.5]
          },
          {
            id: 'time-to-staff',
            title: 'Time to Staff',
            value: '15 days',
            change: -3.8,
            changeType: 'positive',
            trend: [18, 17.5, 17, 16.5, 16, 15.5, 15]
          },
          {
            id: 'training-hours',
            title: 'Training Hours',
            value: '42h',
            change: 15.2,
            changeType: 'positive',
            trend: [32, 34, 36, 38, 39, 40, 42]
          }
        ],
        client: [
          {
            id: 'nps',
            title: 'Net Promoter Score',
            value: '8.2',
            change: 0.8,
            changeType: 'positive',
            trend: [7.1, 7.3, 7.5, 7.8, 7.9, 8.0, 8.2]
          },
          {
            id: 'repeat-business',
            title: 'Repeat Business %',
            value: '68%',
            change: 5.2,
            changeType: 'positive',
            trend: [62, 63, 64, 65, 66, 67, 68]
          },
          {
            id: 'client-concentration',
            title: 'Top-5 Client %',
            value: '45%',
            change: -2.1,
            changeType: 'positive',
            trend: [50, 49, 48, 47, 46, 45.5, 45]
          },
          {
            id: 'avg-deal-size',
            title: 'Average Deal Size',
            value: '€185K',
            change: 12.5,
            changeType: 'positive',
            trend: [155, 160, 165, 170, 175, 180, 185]
          }
        ],
        strategic: [
          {
            id: 'ebitda',
            title: 'EBITDA %',
            value: '18.2%',
            change: 1.8,
            changeType: 'positive',
            trend: [16.5, 16.8, 17.2, 17.5, 17.8, 18.0, 18.2]
          },
          {
            id: 'innovation-revenue',
            title: 'Innovation Revenue %',
            value: '12%',
            change: 3.2,
            changeType: 'positive',
            trend: [8, 9, 9.5, 10, 10.5, 11, 12]
          },
          {
            id: 'digital-projects',
            title: 'Digital Project %',
            value: '35%',
            change: 8.1,
            changeType: 'positive',
            trend: [25, 27, 29, 31, 32, 33, 35]
          }
        ]
      },
      charts: {
        forecastData: this.generateForecastData(),
        trendData: this.generateTrendData(),
        breakdownData: this.generateBreakdownData()
      },
      filters: {
        timeRanges: ['3m', '6m', '12m'],
        businessUnits: ['all', 'cloud', 'digital', 'analytics', 'strategy'],
        countries: ['all', 'sweden', 'norway', 'denmark', 'finland'],
        serviceLines: ['advisory', 'implementation', 'support'],
        clientTiers: ['enterprise', 'mid-market', 'smb']
      },
      searchResults: this.generateSearchResults(),
      askResponses: this.generateAskResponses()
    };

    localStorage.setItem('mockupData', JSON.stringify(mockupData));
  }

  getData() {
    return JSON.parse(localStorage.getItem('mockupData'));
  }

  updateData(data) {
    localStorage.setItem('mockupData', JSON.stringify(data));
  }

  // Simulate API delay
  async delay(ms = 300) {
    return new Promise(resolve => setTimeout(resolve, ms));
  }

  // Get KPI data for a specific domain
  getKPIData(domain) {
    const data = this.getData();
    return data.kpis[domain] || [];
  }

  // Get chart data
  async getChartData(chartType, domain, filters = {}) {
    await this.delay();
    
    const data = this.getData();
    const baseData = data.charts[chartType];
    
    // Apply filters (simplified for demo)
    return this.applyFilters(baseData, filters);
  }

  // Apply filters to data
  applyFilters(data, filters) {
    // In a real application, this would apply actual filtering logic
    // For demo purposes, we'll just return the data with minor variations
    
    if (filters.timeRange === '3m') {
      // Return last 3 months of data
      return this.truncateData(data, 3);
    } else if (filters.timeRange === '6m') {
      // Return last 6 months of data
      return this.truncateData(data, 6);
    }
    
    return data;
  }

  truncateData(data, months) {
    if (Array.isArray(data)) {
      const pointsPerMonth = Math.floor(data.length / 12);
      const startIndex = Math.max(0, data.length - (months * pointsPerMonth));
      return data.slice(startIndex);
    }
    return data;
  }

  // Search functionality
  async search(query, filters = {}) {
    await this.delay(200);
    
    const data = this.getData();
    const allResults = data.searchResults;
    
    if (!query.trim()) {
      return allResults;
    }
    
    // Simple text matching for demo
    const filteredResults = {};
    
    Object.keys(allResults).forEach(category => {
      filteredResults[category] = allResults[category].filter(item => 
        item.title.toLowerCase().includes(query.toLowerCase()) ||
        item.description.toLowerCase().includes(query.toLowerCase())
      );
    });
    
    return filteredResults;
  }

  // Ask AI functionality
  async askQuestion(question) {
    await this.delay(800); // Longer delay to simulate AI processing
    
    const data = this.getData();
    const responses = data.askResponses;
    
    // Simple keyword matching for demo responses
    const lowerQuestion = question.toLowerCase();
    
    if (lowerQuestion.includes('margin') || lowerQuestion.includes('profit')) {
      return responses.margin;
    } else if (lowerQuestion.includes('bench') || lowerQuestion.includes('utilization')) {
      return responses.bench;
    } else if (lowerQuestion.includes('churn') || lowerQuestion.includes('client')) {
      return responses.churn;
    } else if (lowerQuestion.includes('performer') || lowerQuestion.includes('top')) {
      return responses.performers;
    }
    
    return responses.default;
  }

  // Generate mock forecast data
  generateForecastData() {
    const months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
    const actual = [1.8, 1.9, 2.1, 2.0, 2.2, 2.3, 2.1, 2.4, 2.2, 2.3, 2.4, 2.5];
    const forecast = [1.9, 2.0, 2.2, 2.1, 2.3, 2.4, 2.2, 2.5, 2.3, 2.4, 2.5, 2.6];
    const upperBound = forecast.map(val => val * 1.1);
    const lowerBound = forecast.map(val => val * 0.9);
    
    return {
      labels: months,
      datasets: [
        {
          label: 'Actual Revenue (€M)',
          data: actual,
          borderColor: '#1f4788',
          backgroundColor: 'rgba(31, 71, 136, 0.1)',
          borderWidth: 3,
          tension: 0.4
        },
        {
          label: 'Forecast Revenue (€M)',
          data: forecast,
          borderColor: '#4a90a4',
          backgroundColor: 'rgba(74, 144, 164, 0.1)',
          borderWidth: 2,
          borderDash: [5, 5],
          tension: 0.4
        },
        {
          label: 'Upper Bound',
          data: upperBound,
          borderColor: 'rgba(74, 144, 164, 0.3)',
          backgroundColor: 'rgba(74, 144, 164, 0.1)',
          borderWidth: 1,
          fill: '+1'
        },
        {
          label: 'Lower Bound',
          data: lowerBound,
          borderColor: 'rgba(74, 144, 164, 0.3)',
          backgroundColor: 'rgba(74, 144, 164, 0.1)',
          borderWidth: 1,
          fill: false
        }
      ]
    };
  }

  // Generate mock trend data
  generateTrendData() {
    const weeks = [];
    for (let i = 1; i <= 12; i++) {
      weeks.push(`Week ${i}`);
    }
    
    return {
      labels: weeks,
      datasets: [
        {
          label: 'Utilization %',
          data: [78, 79, 81, 80, 82, 84, 83, 85, 84, 86, 85, 82],
          borderColor: '#28a745',
          backgroundColor: 'rgba(40, 167, 69, 0.1)',
          borderWidth: 2,
          tension: 0.4
        },
        {
          label: 'Target %',
          data: Array(12).fill(85),
          borderColor: '#ffc107',
          borderWidth: 2,
          borderDash: [3, 3]
        }
      ]
    };
  }

  // Generate mock breakdown data
  generateBreakdownData() {
    return {
      labels: ['Cloud', 'Digital', 'Analytics', 'Strategy'],
      datasets: [
        {
          label: 'Q4 2024',
          data: [850, 620, 480, 320],
          backgroundColor: '#1f4788',
          borderWidth: 0
        },
        {
          label: 'Q1 2025 Forecast',
          data: [920, 680, 520, 380],
          backgroundColor: '#4a90a4',
          borderWidth: 0
        }
      ]
    };
  }

  // Generate mock search results
  generateSearchResults() {
    return {
      kpis: [
        {
          title: 'Revenue (YTD)',
          description: 'Year-to-date revenue performance €2.4M (+12.3%)',
          type: 'financial'
        },
        {
          title: 'Billable Utilization',
          description: 'Current utilization rate 82% (+3.1%)',
          type: 'delivery'
        },
        {
          title: 'Net Promoter Score',
          description: 'Client satisfaction score 8.2 (+0.8)',
          type: 'client'
        }
      ],
      dashboards: [
        {
          title: 'Financial Performance',
          description: 'Revenue, margin, billing, and pipeline metrics',
          type: 'dashboard'
        },
        {
          title: 'Delivery & Operations',
          description: 'Utilization, projects, and operational metrics',
          type: 'dashboard'
        }
      ],
      projects: [
        {
          title: 'Digital Transformation - TechCorp',
          description: 'Cloud migration project, €450K budget, 85% complete',
          type: 'project'
        },
        {
          title: 'Analytics Platform - RetailCo',
          description: 'Data platform implementation, €280K budget, 60% complete',
          type: 'project'
        }
      ],
      clients: [
        {
          title: 'TechCorp AB',
          description: 'Enterprise client, €850K annual revenue, NPS 9.2',
          type: 'client'
        },
        {
          title: 'RetailCo Nordic',
          description: 'Mid-market client, €320K annual revenue, NPS 7.8',
          type: 'client'
        }
      ],
      people: [
        {
          title: 'Sarah Johnson',
          description: 'Senior Consultant, Cloud specialist, 92% utilization',
          type: 'consultant'
        },
        {
          title: 'Erik Andersson',
          description: 'Principal Consultant, Analytics lead, 88% utilization',
          type: 'consultant'
        }
      ],
      documents: [
        {
          title: 'Q4 Financial Report',
          description: 'Quarterly financial performance and forecasts',
          type: 'document'
        },
        {
          title: 'Client Success Playbook',
          description: 'Best practices for client relationship management',
          type: 'document'
        }
      ]
    };
  }

  // Generate mock AI responses
  generateAskResponses() {
    return {
      margin: {
        question: "Why did margin drop last month?",
        summary: [
          "Gross margin decreased by 2.1% primarily due to increased delivery costs",
          "Cloud BU experienced higher than expected implementation complexity",
          "Rate realization was impacted by competitive pricing pressures",
          "Bench costs increased due to delayed project starts"
        ],
        linkedVisuals: [
          "Margin Trend Analysis",
          "Cost Breakdown by BU",
          "Rate Realization Report"
        ],
        query: "SELECT margin, delivery_cost, rate FROM financial_data WHERE period = 'last_month'"
      },
      bench: {
        question: "Forecast bench utilization in Sweden",
        summary: [
          "Current bench rate in Sweden: 15% (35 consultants)",
          "Forecast shows gradual improvement over next 8 weeks",
          "Expected bench rate by week 8: 8-10%",
          "Recommended actions: accelerate 3 pipeline opportunities"
        ],
        linkedVisuals: [
          "Sweden Bench Forecast",
          "Pipeline Conversion Timeline",
          "Resource Allocation Plan"
        ],
        query: "SELECT * FROM bench_forecast WHERE country = 'Sweden' AND weeks <= 8"
      },
      churn: {
        question: "Which clients are at churn risk?",
        summary: [
          "3 clients identified at high churn risk next quarter",
          "RetailCo Nordic: NPS declined to 6.2, contract renewal in 60 days",
          "ManufacturingAB: Reduced engagement, 2 complaints last month",
          "FinanceCorpSE: Budget constraints, considering alternatives"
        ],
        linkedVisuals: [
          "Client Health Score Dashboard",
          "NPS Trend by Client",
          "Renewal Risk Matrix"
        ],
        query: "SELECT * FROM client_risk WHERE churn_probability > 0.7 AND renewal_date <= '2025-03-31'"
      },
      performers: {
        question: "Show top performers by utilization",
        summary: [
          "Top 10 consultants by utilization (12-month average)",
          "Sarah Johnson leads with 96% utilization (Cloud specialist)",
          "Erik Andersson: 94% utilization (Analytics practice)",
          "Average top-10 utilization: 91% vs company average 82%"
        ],
        linkedVisuals: [
          "Consultant Performance Ranking",
          "Utilization Distribution",
          "Skills vs Performance Matrix"
        ],
        query: "SELECT consultant, AVG(utilization) FROM performance_data GROUP BY consultant ORDER BY utilization DESC LIMIT 10"
      },
      default: {
        question: "General business question",
        summary: [
          "I can help you analyze your consulting business data",
          "Try asking about financial performance, delivery metrics, or client insights",
          "I can provide forecasts, identify trends, and explain variances",
          "Use specific questions for more detailed analysis"
        ],
        linkedVisuals: [
          "Business Overview Dashboard",
          "Key Metrics Summary",
          "Performance Trends"
        ],
        query: "SELECT * FROM business_summary WHERE period = 'current'"
      }
    };
  }
}

// Initialize mock data service
const mockData = new MockDataService();