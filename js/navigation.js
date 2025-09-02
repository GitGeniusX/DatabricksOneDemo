// Navigation functionality handled in app.js for this Sprint 0 version
// This file is kept for compatibility but functionality moved to app.js
console.log('Navigation module loaded - functionality in app.js');

  setupMobileMenu() {
    // Add mobile menu toggle if screen is small
    if (window.innerWidth <= 768) {
      this.createMobileMenuToggle();
    }

    // Handle window resize
    window.addEventListener('resize', () => {
      if (window.innerWidth <= 768) {
        this.createMobileMenuToggle();
      } else {
        this.removeMobileMenuToggle();
      }
    });
  }

  createMobileMenuToggle() {
    if (document.querySelector('.mobile-menu-toggle')) return;

    const toggle = document.createElement('button');
    toggle.className = 'mobile-menu-toggle';
    toggle.innerHTML = '<i class="fas fa-bars"></i>';
    toggle.addEventListener('click', () => this.toggleMobileMenu());

    const navLeft = document.querySelector('.nav-left');
    navLeft.insertBefore(toggle, navLeft.firstChild);

    // Create overlay
    const overlay = document.createElement('div');
    overlay.className = 'mobile-menu-overlay';
    overlay.addEventListener('click', () => this.closeMobileMenu());
    document.body.appendChild(overlay);
  }

  removeMobileMenuToggle() {
    const toggle = document.querySelector('.mobile-menu-toggle');
    const overlay = document.querySelector('.mobile-menu-overlay');
    if (toggle) toggle.remove();
    if (overlay) overlay.remove();
  }

  toggleMobileMenu() {
    const sideNav = document.getElementById('side-nav');
    const overlay = document.querySelector('.mobile-menu-overlay');
    
    sideNav.classList.toggle('active');
    overlay.classList.toggle('active');
  }

  closeMobileMenu() {
    const sideNav = document.getElementById('side-nav');
    const overlay = document.querySelector('.mobile-menu-overlay');
    
    sideNav.classList.remove('active');
    overlay.classList.remove('active');
  }

  navigateTo(page, updateHistory = true) {
    if (page === this.currentPage) return;

    // Update navigation state
    this.setActivePage(page);
    this.updateBreadcrumb(page);
    
    // Load page content
    this.loadPageContent(page);
    
    // Update browser history
    if (updateHistory) {
      const url = page === 'home' ? '/' : `/#/${page}`;
      history.pushState({ page }, '', url);
    }

    // Close mobile menu if open
    this.closeMobileMenu();
    
    this.currentPage = page;
  }

  setActivePage(page) {
    // Update navigation menu
    document.querySelectorAll('.nav-item').forEach(item => {
      item.classList.remove('active');
      if (item.dataset.page === page) {
        item.classList.add('active');
      }
    });
    
    // Update main container layout for home page
    const mainContainer = document.querySelector('.main-container');
    if (page === 'home') {
      mainContainer.classList.add('home-layout');
    } else {
      mainContainer.classList.remove('home-layout');
    }
  }

  updateBreadcrumb(page) {
    const breadcrumbElement = document.getElementById('breadcrumb');
    const pageNames = {
      'home': 'Home',
      'financial': 'Financial Performance',
      'delivery': 'Delivery & Operations', 
      'people': 'People & Talent',
      'client': 'Client Success',
      'strategic': 'Strategic / Board',
      'search': 'Search',
      'ask': 'Ask AI'
    };

    let breadcrumbHTML = '';
    
    if (page === 'home') {
      breadcrumbHTML = '<span class="breadcrumb-item active">Home</span>';
    } else {
      breadcrumbHTML = `
        <span class="breadcrumb-item" onclick="nav.navigateTo('home')">Home</span>
        <span class="breadcrumb-item active">${pageNames[page]}</span>
      `;
    }

    breadcrumbElement.innerHTML = breadcrumbHTML;
  }

  loadPageContent(page) {
    const contentArea = document.getElementById('content-area');
    
    // Show loading state
    app.showLoading();

    // Simulate loading delay for demo
    setTimeout(() => {
      switch (page) {
        case 'home':
          contentArea.innerHTML = this.getHomePageContent();
          break;
        case 'financial':
          contentArea.innerHTML = this.getFinancialPageContent();
          break;
        case 'delivery':
          contentArea.innerHTML = this.getDeliveryPageContent();
          break;
        case 'people':
          contentArea.innerHTML = this.getPeoplePageContent();
          break;
        case 'client':
          contentArea.innerHTML = this.getClientPageContent();
          break;
        case 'strategic':
          contentArea.innerHTML = this.getStrategicPageContent();
          break;
        case 'search':
          contentArea.innerHTML = this.getSearchPageContent();
          break;
        case 'ask':
          contentArea.innerHTML = this.getAskPageContent();
          break;
        default:
          contentArea.innerHTML = this.getNotFoundContent();
      }

      // Initialize page-specific functionality
      this.initializePageContent(page);
      
      app.hideLoading();
    }, 300);
  }

  initializePageContent(page) {
    switch (page) {
      case 'home':
        this.initHomePage();
        break;
      case 'financial':
      case 'delivery':
      case 'people':
      case 'client':
      case 'strategic':
        this.initDashboardPage(page);
        break;
      case 'search':
        this.initSearchPage();
        break;
      case 'ask':
        this.initAskPage();
        break;
    }
  }

  initHomePage() {
    // Initialize domain card click handlers
    document.querySelectorAll('.hero-card[data-domain]').forEach(card => {
      card.addEventListener('click', (e) => {
        const domain = e.currentTarget.dataset.domain;
        this.navigateTo(domain);
      });
    });
    
    // Initialize search toggle buttons
    document.querySelectorAll('.toggle-btn').forEach(btn => {
      btn.addEventListener('click', (e) => {
        // Remove active class from all buttons
        document.querySelectorAll('.toggle-btn').forEach(b => b.classList.remove('active'));
        // Add active class to clicked button
        e.currentTarget.classList.add('active');
        
        const mode = e.currentTarget.dataset.mode;
        const placeholder = mode === 'search' ? 'Search datasets, tables, dashboards in Databricks...' : 'Ask anything about your Databricks data and analytics...';
        document.getElementById('main-search-input').placeholder = placeholder;
      });
    });
    
    // Initialize main search input
    const searchInput = document.getElementById('main-search-input');
    const searchBtn = document.querySelector('.search-submit-btn');
    
    if (searchInput && searchBtn) {
      const handleSearch = () => {
        const query = searchInput.value.trim();
        if (query) {
          const activeMode = document.querySelector('.toggle-btn.active').dataset.mode;
          sessionStorage.setItem('searchQuery', query);
          this.navigateTo(activeMode === 'ask' ? 'ask' : 'search');
        }
      };
      
      searchBtn.addEventListener('click', handleSearch);
      searchInput.addEventListener('keypress', (e) => {
        if (e.key === 'Enter') {
          handleSearch();
        }
      });
    }
    
    // Initialize navigation chips
    document.querySelectorAll('.nav-chip').forEach(chip => {
      chip.addEventListener('click', (e) => {
        // Remove active class from all chips
        document.querySelectorAll('.nav-chip').forEach(c => c.classList.remove('active'));
        // Add active class to clicked chip
        e.currentTarget.classList.add('active');
        
        const tab = e.currentTarget.dataset.tab;
        console.log(`Navigation chip clicked: ${tab}`);
        // Future: implement tab-specific content filtering
      });
    });
  }

  initDashboardPage(domain) {
    // Initialize KPI card interactions
    document.querySelectorAll('.kpi-card.clickable').forEach(card => {
      card.addEventListener('click', (e) => {
        interactions.handleKPIClick(e.currentTarget, domain);
      });
    });

    // Initialize filter controls
    document.querySelectorAll('.filter-select').forEach(select => {
      select.addEventListener('change', (e) => {
        interactions.handleFilterChange(e.target);
      });
    });

    document.querySelectorAll('.filter-button').forEach(button => {
      button.addEventListener('click', (e) => {
        interactions.handleFilterButtonClick(e.currentTarget);
      });
    });

    // Initialize charts
    charts.initializeDashboardCharts(domain);
  }

  initSearchPage() {
    const searchInput = document.getElementById('search-input');
    if (searchInput) {
      searchInput.addEventListener('input', (e) => {
        interactions.handleSearchInput(e.target.value);
      });
    }
  }

  initAskPage() {
    const askInput = document.getElementById('ask-input');
    const askButton = document.getElementById('ask-button');
    
    if (askInput && askButton) {
      askButton.addEventListener('click', () => {
        interactions.handleAskQuestion(askInput.value);
      });

      askInput.addEventListener('keypress', (e) => {
        if (e.key === 'Enter' && e.ctrlKey) {
          interactions.handleAskQuestion(askInput.value);
        }
      });
    }

    // Initialize example buttons
    document.querySelectorAll('.ask-example-button').forEach(button => {
      button.addEventListener('click', (e) => {
        askInput.value = e.currentTarget.textContent;
      });
    });
  }

  handleGlobalSearch(query) {
    if (query.trim()) {
      // Store search query and navigate to search page
      sessionStorage.setItem('searchQuery', query);
      this.navigateTo('search');
    }
  }

  loadInitialPage() {
    // Check URL hash to determine initial page
    const hash = window.location.hash;
    let initialPage = 'home';
    
    if (hash && hash.startsWith('#/')) {
      const page = hash.substring(2);
      if (['financial', 'delivery', 'people', 'client', 'strategic', 'search', 'ask'].includes(page)) {
        initialPage = page;
      }
    }
    
    this.navigateTo(initialPage, false);
  }

  // Page content templates will be imported from separate files
  getHomePageContent() {
    return pageTemplates.home();
  }

  getFinancialPageContent() {
    return pageTemplates.financial();
  }

  getDeliveryPageContent() {
    return pageTemplates.delivery();
  }

  getPeoplePageContent() {
    return pageTemplates.people();
  }

  getClientPageContent() {
    return pageTemplates.client();
  }

  getStrategicPageContent() {
    return pageTemplates.strategic();
  }

  getSearchPageContent() {
    return pageTemplates.search();
  }

  getAskPageContent() {
    return pageTemplates.ask();
  }

  getNotFoundContent() {
    return `
      <div class="page-header">
        <h1 class="page-title">Page Not Found</h1>
        <p class="page-subtitle">The page you're looking for doesn't exist.</p>
        <div class="page-actions">
          <button class="btn btn-primary" onclick="nav.navigateTo('home')">
            <i class="fas fa-home"></i>
            Go Home
          </button>
        </div>
      </div>
    `;
  }
}

// ======================================
// Page Templates
// ======================================

const pageTemplates = {
  home() {
    return `
      <div class="databricks-home">
        <div class="home-greeting">
          <h1 class="greeting-text">Hi, KYD!</h1>
          <p class="greeting-subtitle">What would you like to know?</p>
        </div>
        
        <div class="search-container">
          <div class="search-input-wrapper">
            <input type="text" class="main-search-input" placeholder="Ask anything about your Databricks data and analytics..." id="main-search-input">
            <button class="search-submit-btn">
              <i class="fas fa-paper-plane"></i>
            </button>
          </div>
          
          <div class="search-toggle-buttons">
            <button class="toggle-btn" data-mode="search">
              <i class="fas fa-search"></i>
              Search Data
            </button>
            <button class="toggle-btn active" data-mode="ask">
              <i class="fas fa-robot"></i>
              Ask AI
            </button>
          </div>
        </div>
        
        <div class="hero-cards">
          <div class="hero-card domain-card" data-domain="financial">
            <div class="card-header">
              <span class="card-type">Domain</span>
            </div>
            <div class="card-content">
              <div class="card-icon">
                <i class="fas fa-chart-bar"></i>
              </div>
              <h3 class="card-title">Financial Performance</h3>
            </div>
          </div>
          
          <div class="hero-card domain-card" data-domain="delivery">
            <div class="card-header">
              <span class="card-type">Domain</span>
            </div>
            <div class="card-content">
              <div class="card-icon">
                <i class="fas fa-tasks"></i>
              </div>
              <h3 class="card-title">Delivery & Operations</h3>
            </div>
          </div>
          
          <div class="hero-card domain-card" data-domain="people">
            <div class="card-header">
              <span class="card-type">Domain</span>
            </div>
            <div class="card-content">
              <div class="card-icon">
                <i class="fas fa-users"></i>
              </div>
              <h3 class="card-title">People & Talent</h3>
            </div>
          </div>
          
          <div class="hero-card genie-card">
            <div class="card-header">
              <span class="card-type">Genie Space</span>
            </div>
            <div class="card-content">
              <div class="card-icon">
                <i class="fas fa-magic"></i>
              </div>
              <h3 class="card-title">Q1 Performance Genie</h3>
            </div>
          </div>
          
          <div class="hero-card analytics-card" data-domain="client">
            <div class="card-preview">
              <div class="preview-charts">
                <div class="mini-chart">
                  <div class="chart-bars">
                    <div class="bar" style="height: 40%"></div>
                    <div class="bar" style="height: 60%"></div>
                    <div class="bar" style="height: 80%"></div>
                    <div class="bar" style="height: 45%"></div>
                  </div>
                </div>
                <div class="mini-pie">
                  <div class="pie-chart"></div>
                </div>
              </div>
            </div>
            <div class="card-content">
              <div class="card-icon-small">
                <i class="fas fa-chart-pie"></i>
              </div>
              <h3 class="card-title-small">Client Success Analytics</h3>
            </div>
          </div>
        </div>
        
        <div class="navigation-chips">
          <button class="nav-chip active" data-tab="for-you">
            For you
          </button>
          <button class="nav-chip" data-tab="genie-spaces">
            Genie Spaces
          </button>
          <button class="nav-chip" data-tab="domains">
            Domains
          </button>
          <button class="nav-chip" data-tab="dashboards">
            Dashboards
          </button>
          <button class="nav-chip" data-tab="apps">
            Apps
          </button>
        </div>
      </div>
    `;
  },

  financial() {
    return `
      <div class="page-header">
        <h1 class="page-title">Financial Performance</h1>
        <p class="page-subtitle">Revenue tracking, margin analysis, billing optimization, and pipeline forecasting</p>
        <div class="data-freshness">
          <div class="data-freshness-dot"></div>
          <span>Updated 2 hours ago</span>
        </div>
      </div>

      ${this.getFilterBar()}
      ${this.getKPIHeader('financial')}
      ${this.getForecastLane('financial')}
    `;
  },

  delivery() {
    return `
      <div class="page-header">
        <h1 class="page-title">Delivery & Operations</h1>
        <p class="page-subtitle">Utilization optimization, resource planning, and delivery excellence</p>
        <div class="data-freshness">
          <div class="data-freshness-dot"></div>
          <span>Updated 1 hour ago</span>
        </div>
      </div>

      ${this.getFilterBar()}
      ${this.getKPIHeader('delivery')}
      ${this.getForecastLane('delivery')}
    `;
  },

  people() {
    return `
      <div class="page-header">
        <h1 class="page-title">People & Talent</h1>
        <p class="page-subtitle">Workforce analytics, talent development, and organizational health</p>
        <div class="data-freshness">
          <div class="data-freshness-dot"></div>
          <span>Updated 3 hours ago</span>
        </div>
      </div>

      ${this.getFilterBar()}
      ${this.getKPIHeader('people')}
      ${this.getForecastLane('people')}
    `;
  },

  client() {
    return `
      <div class="page-header">
        <h1 class="page-title">Client Success</h1>
        <p class="page-subtitle">Client satisfaction, retention analysis, and relationship growth</p>
        <div class="data-freshness">
          <div class="data-freshness-dot"></div>
          <span>Updated 1 hour ago</span>
        </div>
      </div>

      ${this.getFilterBar()}
      ${this.getKPIHeader('client')}
      ${this.getForecastLane('client')}
    `;
  },

  strategic() {
    return `
      <div class="page-header">
        <h1 class="page-title">Strategic / Board</h1>
        <p class="page-subtitle">Executive insights, strategic metrics, and balanced scorecard</p>
        <div class="data-freshness">
          <div class="data-freshness-dot"></div>
          <span>Updated 4 hours ago</span>
        </div>
      </div>

      ${this.getFilterBar()}
      ${this.getKPIHeader('strategic')}
      ${this.getForecastLane('strategic')}
    `;
  },

  search() {
    return `
      <div class="search-container">
        <div class="search-input-container">
          <i class="fas fa-search search-input-icon"></i>
          <input type="text" id="search-input" class="search-input" 
                 placeholder="Search KPIs, dashboards, projects, clients, people, or documents...">
        </div>
        
        <div id="search-results" class="search-results">
          <!-- Search results will be populated here -->
        </div>
      </div>
    `;
  },

  ask() {
    return `
      <div class="ask-container">
        <div class="ask-input-container">
          <textarea id="ask-input" class="ask-input" 
                    placeholder="Ask a question about your Databricks data, analytics, or business metrics..."></textarea>
          
          <div class="ask-examples">
            <div class="ask-examples-title">Try these examples:</div>
            <div class="ask-example-buttons">
              <button class="ask-example-button">What are our top performing products by revenue this quarter?</button>
              <button class="ask-example-button">Show me customer churn trends in the last 6 months</button>
              <button class="ask-example-button">Which markets have the highest growth potential?</button>
              <button class="ask-example-button">Analyze utilization rates across all business units</button>
              <button class="ask-example-button">What's driving the revenue variance in Q1?</button>
            </div>
          </div>
          
          <div class="page-actions">
            <button id="ask-button" class="btn btn-primary">
              <i class="fas fa-robot"></i>
              Ask Databricks AI
            </button>
          </div>
        </div>
        
        <div id="ask-response" class="ask-response" style="display: none;">
          <!-- AI response will be populated here -->
        </div>
      </div>
    `;
  },

  getFilterBar() {
    return `
      <div class="filter-bar">
        <div class="filter-group">
          <label class="filter-label">Time Range</label>
          <select class="filter-select" data-filter="timeRange">
            <option value="3m">3 Months</option>
            <option value="6m">6 Months</option>
            <option value="12m" selected>12 Months</option>
          </select>
        </div>
        <div class="filter-group">
          <label class="filter-label">Business Unit</label>
          <select class="filter-select" data-filter="businessUnit">
            <option value="all" selected>All Units</option>
            <option value="solutions">Solutions</option>
            <option value="experience">Experience</option>
            <option value="insight">Insight</option>
            <option value="connectivity">Connectivity</option>
          </select>
        </div>
        <div class="filter-group">
          <label class="filter-label">Country</label>
          <select class="filter-select" data-filter="country">
            <option value="all" selected>All Countries</option>
            <option value="sweden">Sweden</option>
            <option value="norway">Norway</option>
            <option value="denmark">Denmark</option>
            <option value="finland">Finland</option>
          </select>
        </div>
        <div class="filter-group">
          <label class="filter-label">Horizon</label>
          <div class="filter-buttons">
            <button class="filter-button" data-horizon="3">3M</button>
            <button class="filter-button" data-horizon="6">6M</button>
            <button class="filter-button active" data-horizon="12">12M</button>
          </div>
        </div>
      </div>
    `;
  },

  getKPIHeader(domain) {
    const kpiData = mockData.getKPIData(domain);
    
    return `
      <div class="kpi-header">
        ${kpiData.map(kpi => `
          <div class="kpi-card clickable" data-kpi="${kpi.id}">
            <div class="kpi-title">${kpi.title}</div>
            <div class="kpi-value">${kpi.value}</div>
            <div class="kpi-change ${kpi.changeType}">
              ${Math.abs(kpi.change)}%
            </div>
            <div class="kpi-trend">
              <canvas class="sparkline" data-trend='${JSON.stringify(kpi.trend)}'></canvas>
            </div>
          </div>
        `).join('')}
      </div>
    `;
  },

  getForecastLane(domain) {
    return `
      <div class="forecast-lane">
        <div class="chart-container">
          <div class="chart-header">
            <div>
              <h3 class="chart-title">Revenue Forecast vs Actuals</h3>
              <p class="chart-subtitle">12-month rolling forecast with 80% confidence band</p>
            </div>
            <div class="chart-controls">
              <button class="btn btn-ghost">Export</button>
              <button class="btn btn-secondary">Explain Variance</button>
            </div>
          </div>
          <div class="chart-body">
            <canvas id="forecast-chart-${domain}" class="chart-canvas"></canvas>
          </div>
        </div>

        <div class="chart-container">
          <div class="chart-header">
            <div>
              <h3 class="chart-title">Growth Trends</h3>
              <p class="chart-subtitle">Rolling performance indicators</p>
            </div>
          </div>
          <div class="chart-body">
            <canvas id="trend-chart-${domain}" class="chart-canvas"></canvas>
          </div>
        </div>

        <div class="chart-container">
          <div class="chart-header">
            <div>
              <h3 class="chart-title">Performance Breakdown</h3>
              <p class="chart-subtitle">Detailed analysis by segment</p>
            </div>
          </div>
          <div class="chart-body">
            <canvas id="breakdown-chart-${domain}" class="chart-canvas"></canvas>
          </div>
        </div>
      </div>
    `;
  }
};

// Initialize navigation manager
let nav;