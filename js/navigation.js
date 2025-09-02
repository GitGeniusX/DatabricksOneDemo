// ======================================
// Navigation System
// ======================================

class NavigationManager {
  constructor() {
    this.currentPage = 'home';
    this.breadcrumb = ['Home'];
    this.init();
  }

  init() {
    this.setupEventListeners();
    this.loadInitialPage();
    this.setupMobileMenu();
  }

  setupEventListeners() {
    // Navigation menu items
    document.querySelectorAll('.nav-item').forEach(item => {
      item.addEventListener('click', (e) => {
        const page = e.currentTarget.dataset.page;
        this.navigateTo(page);
      });
    });

    // Handle browser back/forward
    window.addEventListener('popstate', (e) => {
      if (e.state && e.state.page) {
        this.navigateTo(e.state.page, false);
      }
    });

    // Global search
    const globalSearch = document.getElementById('global-search-input');
    if (globalSearch) {
      globalSearch.addEventListener('keypress', (e) => {
        if (e.key === 'Enter') {
          this.handleGlobalSearch(e.target.value);
        }
      });
    }
  }

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
    // Initialize domain tile click handlers
    document.querySelectorAll('.domain-tile').forEach(tile => {
      tile.addEventListener('click', (e) => {
        const domain = e.currentTarget.dataset.domain;
        this.navigateTo(domain);
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
      <div class="home-hero">
        <h1 class="home-hero-title">Analytics Hub</h1>
        <p class="home-hero-subtitle">
          Comprehensive consulting analytics across Financial Performance, Delivery Operations, 
          People & Talent, Client Success, and Strategic metrics.
        </p>
        <div class="home-hero-metrics">
          <div class="home-hero-metric">
            <span class="home-hero-metric-value">€2.4M</span>
            <span class="home-hero-metric-label">YTD Revenue</span>
          </div>
          <div class="home-hero-metric">
            <span class="home-hero-metric-value">82%</span>
            <span class="home-hero-metric-label">Utilization</span>
          </div>
          <div class="home-hero-metric">
            <span class="home-hero-metric-value">8.2</span>
            <span class="home-hero-metric-label">Client NPS</span>
          </div>
        </div>
      </div>

      <div class="domain-tiles">
        <div class="domain-tile financial" data-domain="financial">
          <div class="domain-tile-icon">
            <i class="fas fa-chart-bar"></i>
          </div>
          <h3 class="domain-tile-title">Financial Performance</h3>
          <p class="domain-tile-description">
            Revenue tracking, margin analysis, billing rates, and pipeline coverage metrics.
          </p>
          <div class="domain-tile-metrics">
            <div class="domain-tile-metric">
              <div class="domain-tile-metric-value">€2.4M</div>
              <div class="domain-tile-metric-label">Revenue</div>
            </div>
            <div class="domain-tile-metric">
              <div class="domain-tile-metric-value">34.5%</div>
              <div class="domain-tile-metric-label">Margin</div>
            </div>
            <div class="domain-tile-metric">
              <div class="domain-tile-metric-value">€950</div>
              <div class="domain-tile-metric-label">Avg Rate</div>
            </div>
          </div>
        </div>

        <div class="domain-tile delivery" data-domain="delivery">
          <div class="domain-tile-icon">
            <i class="fas fa-tasks"></i>
          </div>
          <h3 class="domain-tile-title">Delivery & Operations</h3>
          <p class="domain-tile-description">
            Utilization tracking, project delivery, resource allocation, and operational efficiency.
          </p>
          <div class="domain-tile-metrics">
            <div class="domain-tile-metric">
              <div class="domain-tile-metric-value">82%</div>
              <div class="domain-tile-metric-label">Utilization</div>
            </div>
            <div class="domain-tile-metric">
              <div class="domain-tile-metric-value">12%</div>
              <div class="domain-tile-metric-label">Bench</div>
            </div>
            <div class="domain-tile-metric">
              <div class="domain-tile-metric-value">94%</div>
              <div class="domain-tile-metric-label">On-Time</div>
            </div>
          </div>
        </div>

        <div class="domain-tile people" data-domain="people">
          <div class="domain-tile-icon">
            <i class="fas fa-users"></i>
          </div>
          <h3 class="domain-tile-title">People & Talent</h3>
          <p class="domain-tile-description">
            Headcount management, attrition tracking, skills development, and talent analytics.
          </p>
          <div class="domain-tile-metrics">
            <div class="domain-tile-metric">
              <div class="domain-tile-metric-value">235</div>
              <div class="domain-tile-metric-label">Headcount</div>
            </div>
            <div class="domain-tile-metric">
              <div class="domain-tile-metric-value">8.5%</div>
              <div class="domain-tile-metric-label">Attrition</div>
            </div>
            <div class="domain-tile-metric">
              <div class="domain-tile-metric-value">15d</div>
              <div class="domain-tile-metric-label">Time to Staff</div>
            </div>
          </div>
        </div>

        <div class="domain-tile client" data-domain="client">
          <div class="domain-tile-icon">
            <i class="fas fa-handshake"></i>
          </div>
          <h3 class="domain-tile-title">Client Success</h3>
          <p class="domain-tile-description">
            NPS tracking, retention analysis, repeat business, and client relationship metrics.
          </p>
          <div class="domain-tile-metrics">
            <div class="domain-tile-metric">
              <div class="domain-tile-metric-value">8.2</div>
              <div class="domain-tile-metric-label">NPS</div>
            </div>
            <div class="domain-tile-metric">
              <div class="domain-tile-metric-value">68%</div>
              <div class="domain-tile-metric-label">Repeat</div>
            </div>
            <div class="domain-tile-metric">
              <div class="domain-tile-metric-value">€185K</div>
              <div class="domain-tile-metric-label">Avg Deal</div>
            </div>
          </div>
        </div>

        <div class="domain-tile strategic" data-domain="strategic">
          <div class="domain-tile-icon">
            <i class="fas fa-chess"></i>
          </div>
          <h3 class="domain-tile-title">Strategic / Board</h3>
          <p class="domain-tile-description">
            EBITDA analysis, innovation metrics, service mix evolution, and balanced scorecard.
          </p>
          <div class="domain-tile-metrics">
            <div class="domain-tile-metric">
              <div class="domain-tile-metric-value">18.2%</div>
              <div class="domain-tile-metric-label">EBITDA</div>
            </div>
            <div class="domain-tile-metric">
              <div class="domain-tile-metric-value">35%</div>
              <div class="domain-tile-metric-label">Digital</div>
            </div>
            <div class="domain-tile-metric">
              <div class="domain-tile-metric-value">12%</div>
              <div class="domain-tile-metric-label">Innovation</div>
            </div>
          </div>
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
                    placeholder="Ask a question about your business data..."></textarea>
          
          <div class="ask-examples">
            <div class="ask-examples-title">Try these examples:</div>
            <div class="ask-example-buttons">
              <button class="ask-example-button">Why did margin drop last month in Cloud BU?</button>
              <button class="ask-example-button">Forecast bench in Sweden for 8 weeks</button>
              <button class="ask-example-button">Which clients are at churn risk next quarter?</button>
              <button class="ask-example-button">Show top performers by utilization</button>
            </div>
          </div>
          
          <div class="page-actions">
            <button id="ask-button" class="btn btn-primary">
              <i class="fas fa-paper-plane"></i>
              Ask Question
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
            <option value="cloud">Cloud</option>
            <option value="digital">Digital</option>
            <option value="analytics">Analytics</option>
            <option value="strategy">Strategy</option>
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