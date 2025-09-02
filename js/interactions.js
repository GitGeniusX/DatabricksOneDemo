// ======================================
// Interaction Management System
// ======================================

class InteractionManager {
  constructor() {
    this.currentFilters = this.getDefaultFilters();
    this.searchTimeout = null;
    this.init();
  }

  init() {
    this.setupEventListeners();
  }

  getDefaultFilters() {
    return {
      timeRange: '12m',
      businessUnit: 'all',
      country: 'all',
      serviceLine: 'all',
      clientTier: 'all',
      horizon: '12'
    };
  }

  setupEventListeners() {
    // Set up global event listeners that don't depend on page content
    document.addEventListener('click', (e) => {
      // Handle modal closes
      if (e.target.classList.contains('modal-overlay')) {
        this.closeModal(e.target);
      }
      if (e.target.classList.contains('modal-close')) {
        this.closeModal(e.target.closest('.modal-overlay'));
      }
    });

    // Keyboard shortcuts
    document.addEventListener('keydown', (e) => {
      if (e.key === 'Escape') {
        this.closeAllModals();
      }
      if (e.key === '/' && !e.target.matches('input, textarea')) {
        e.preventDefault();
        this.focusGlobalSearch();
      }
    });
  }

  // Handle KPI card clicks
  handleKPIClick(cardElement, domain) {
    const kpiId = cardElement.dataset.kpi;
    console.log(`KPI clicked: ${kpiId} in ${domain}`);
    
    // Add visual feedback
    this.addClickFeedback(cardElement);
    
    // Apply KPI filter to charts
    this.applyKPIFilter(kpiId, domain);
    
    // Show explanation panel (demo)
    this.showKPIExplanation(kpiId, domain);
  }

  addClickFeedback(element) {
    element.style.transform = 'scale(0.98)';
    setTimeout(() => {
      element.style.transform = '';
    }, 150);
  }

  applyKPIFilter(kpiId, domain) {
    // Show loading state
    app.showLoading();
    
    // Simulate filter application
    setTimeout(() => {
      // Update charts with KPI filter
      const kpiFilter = { kpi: kpiId };
      charts.updateCharts(domain, { ...this.currentFilters, ...kpiFilter });
      
      // Show notification
      this.showFilterNotification(`Filtered by ${kpiId}`);
      
      app.hideLoading();
    }, 500);
  }

  showKPIExplanation(kpiId, domain) {
    const explanations = {
      'revenue': 'Revenue performance is driven by increased billing rates (+1.2%) and higher utilization (+3.1%). New client acquisitions contributed €180K.',
      'gross-margin': 'Margin decline primarily due to increased delivery costs in Cloud BU. Rate pressure from competitive bids also contributed.',
      'billable-utilization': 'Utilization improvement driven by better resource allocation and reduced bench time. Cloud and Digital BUs performing above target.',
      'nps': 'NPS improvement reflects enhanced client communication and faster issue resolution. RetailCo and TechCorp scores increased significantly.',
      'ebitda': 'EBITDA growth driven by revenue increase (+12.3%) and controlled cost growth (+8.9%). Operational efficiency initiatives contributing.'
    };

    const explanation = explanations[kpiId] || 'Detailed analysis available in the full report.';
    
    this.showToast('KPI Analysis', explanation, 'info', 5000);
  }

  // Handle filter changes
  handleFilterChange(selectElement) {
    const filterType = selectElement.dataset.filter;
    const filterValue = selectElement.value;
    
    // Update current filters
    this.currentFilters[filterType] = filterValue;
    
    // Apply filters to current page
    this.applyFilters();
    
    console.log(`Filter changed: ${filterType} = ${filterValue}`);
  }

  handleFilterButtonClick(buttonElement) {
    const filterType = Object.keys(buttonElement.dataset)[0]; // Get first data attribute
    const filterValue = buttonElement.dataset[filterType];
    
    // Update button states
    const buttonGroup = buttonElement.parentElement;
    buttonGroup.querySelectorAll('.filter-button').forEach(btn => {
      btn.classList.remove('active');
    });
    buttonElement.classList.add('active');
    
    // Update current filters
    this.currentFilters[filterType] = filterValue;
    
    // Apply filters
    this.applyFilters();
    
    console.log(`Filter button clicked: ${filterType} = ${filterValue}`);
  }

  applyFilters() {
    // Show loading state
    app.showLoading();
    
    // Get current domain
    const currentDomain = nav.currentPage;
    
    // Simulate filter application delay
    setTimeout(() => {
      // Update charts if on a dashboard page
      if (['financial', 'delivery', 'people', 'client', 'strategic'].includes(currentDomain)) {
        charts.updateCharts(currentDomain, this.currentFilters);
      }
      
      // Update KPI cards
      this.updateKPICards(currentDomain);
      
      // Show filter notification
      this.showFilterNotification('Filters applied');
      
      app.hideLoading();
    }, 300);
  }

  updateKPICards(domain) {
    const kpiCards = document.querySelectorAll('.kpi-card');
    
    kpiCards.forEach(card => {
      // Add subtle animation to indicate update
      card.style.opacity = '0.7';
      setTimeout(() => {
        card.style.opacity = '';
      }, 200);
    });
  }

  // Handle search input
  handleSearchInput(query) {
    // Clear previous timeout
    if (this.searchTimeout) {
      clearTimeout(this.searchTimeout);
    }
    
    // Debounce search
    this.searchTimeout = setTimeout(() => {
      this.performSearch(query);
    }, 300);
  }

  async performSearch(query) {
    const resultsContainer = document.getElementById('search-results');
    if (!resultsContainer) return;
    
    if (!query.trim()) {
      resultsContainer.innerHTML = '<p class="text-muted text-center">Enter a search term to see results</p>';
      return;
    }
    
    // Show loading state
    resultsContainer.innerHTML = '<div class="text-center"><i class="fas fa-spinner fa-spin"></i> Searching...</div>';
    
    try {
      const results = await mockData.search(query, this.currentFilters);
      this.displaySearchResults(results, query);
    } catch (error) {
      console.error('Search error:', error);
      resultsContainer.innerHTML = '<p class="text-danger">Search failed. Please try again.</p>';
    }
  }

  displaySearchResults(results, query) {
    const resultsContainer = document.getElementById('search-results');
    
    let html = '';
    let totalResults = 0;
    
    Object.keys(results).forEach(category => {
      const items = results[category];
      if (items.length === 0) return;
      
      totalResults += items.length;
      
      const categoryIcons = {
        kpis: 'fa-chart-line',
        dashboards: 'fa-tachometer-alt',
        projects: 'fa-project-diagram',
        clients: 'fa-handshake',
        people: 'fa-users',
        documents: 'fa-file-alt'
      };
      
      const categoryNames = {
        kpis: 'KPIs',
        dashboards: 'Dashboards',
        projects: 'Projects',
        clients: 'Clients',
        people: 'People',
        documents: 'Documents'
      };
      
      html += `
        <div class="search-result-group">
          <h3 class="search-result-group-title">
            <i class="fas ${categoryIcons[category]} search-result-group-icon"></i>
            ${categoryNames[category]} (${items.length})
          </h3>
          ${items.map(item => `
            <div class="search-result-item" onclick="interactions.handleSearchResultClick('${category}', '${item.title}')">
              <div class="search-result-item-title">${this.highlightSearchTerm(item.title, query)}</div>
              <div class="search-result-item-description">${this.highlightSearchTerm(item.description, query)}</div>
            </div>
          `).join('')}
        </div>
      `;
    });
    
    if (totalResults === 0) {
      html = `
        <div class="text-center p-xl">
          <i class="fas fa-search text-muted" style="font-size: 3rem; margin-bottom: 1rem;"></i>
          <h3>No results found</h3>
          <p class="text-muted">Try different keywords or check your spelling</p>
        </div>
      `;
    }
    
    resultsContainer.innerHTML = html;
  }

  highlightSearchTerm(text, term) {
    if (!term.trim()) return text;
    
    const regex = new RegExp(`(${term.replace(/[.*+?^${}()|[\]\\]/g, '\\$&')})`, 'gi');
    return text.replace(regex, '<mark style="background: #fff3cd; padding: 1px 2px;">$1</mark>');
  }

  handleSearchResultClick(category, title) {
    console.log(`Search result clicked: ${category} - ${title}`);
    
    // In a real application, this would navigate to the specific item
    this.showToast('Navigation', `Would navigate to ${category}: ${title}`, 'info', 3000);
  }

  // Handle Ask AI functionality
  async handleAskQuestion(question) {
    if (!question.trim()) {
      this.showToast('Error', 'Please enter a question', 'danger', 3000);
      return;
    }
    
    const responseContainer = document.getElementById('ask-response');
    const askButton = document.getElementById('ask-button');
    
    if (!responseContainer || !askButton) return;
    
    // Show loading state
    askButton.disabled = true;
    askButton.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Thinking...';
    responseContainer.style.display = 'block';
    responseContainer.innerHTML = `
      <div class="text-center p-xl">
        <i class="fas fa-brain text-primary" style="font-size: 2rem; margin-bottom: 1rem; animation: pulse 1.5s infinite;"></i>
        <p>Analyzing your question...</p>
      </div>
    `;
    
    try {
      const response = await mockData.askQuestion(question);
      this.displayAskResponse(response, question);
    } catch (error) {
      console.error('Ask error:', error);
      responseContainer.innerHTML = '<p class="text-danger">Failed to process question. Please try again.</p>';
    } finally {
      askButton.disabled = false;
      askButton.innerHTML = '<i class="fas fa-paper-plane"></i> Ask Question';
    }
  }

  displayAskResponse(response, question) {
    const responseContainer = document.getElementById('ask-response');
    
    const html = `
      <div class="ask-response-header">
        <i class="fas fa-robot ask-response-icon"></i>
        <h3 class="ask-response-title">AI Analysis</h3>
      </div>
      
      <div class="ask-response-content">
        <h4 style="margin-bottom: 1rem; color: var(--text-primary);">Question: "${question}"</h4>
        
        <div style="margin-bottom: 2rem;">
          <h5 style="margin-bottom: 1rem; color: var(--primary-blue);">Key Insights:</h5>
          ${response.summary.map(point => `
            <div class="ask-response-bullet">${point}</div>
          `).join('')}
        </div>
        
        <div style="margin-bottom: 2rem;">
          <h5 style="margin-bottom: 1rem; color: var(--primary-blue);">Related Visuals:</h5>
          <div class="flex-container gap-sm" style="flex-wrap: wrap;">
            ${response.linkedVisuals.map(visual => `
              <button class="btn btn-secondary btn-sm" onclick="interactions.handleVisualLink('${visual}')">
                <i class="fas fa-chart-bar"></i> ${visual}
              </button>
            `).join('')}
          </div>
        </div>
        
        <div style="background: var(--bg-light); padding: 1rem; border-radius: 8px; border-left: 4px solid var(--primary-blue);">
          <h6 style="margin-bottom: 0.5rem; color: var(--text-secondary);">Data Query Used:</h6>
          <code style="font-family: 'Monaco', 'Consolas', monospace; font-size: 0.85rem; color: var(--text-primary);">
            ${response.query}
          </code>
        </div>
      </div>
    `;
    
    responseContainer.innerHTML = html;
  }

  handleVisualLink(visualName) {
    console.log(`Visual link clicked: ${visualName}`);
    this.showToast('Navigation', `Would show ${visualName}`, 'info', 3000);
  }

  // Utility functions
  focusGlobalSearch() {
    const searchInput = document.getElementById('global-search-input');
    if (searchInput) {
      searchInput.focus();
      searchInput.select();
    }
  }

  showFilterNotification(message) {
    this.showToast('Filters', message, 'success', 2000);
  }

  showToast(title, message, type = 'info', duration = 3000) {
    const toast = document.createElement('div');
    toast.className = `toast toast-${type}`;
    
    const colors = {
      success: '#28a745',
      info: '#1f4788',
      warning: '#ffc107',
      danger: '#dc3545'
    };
    
    const icons = {
      success: 'fa-check-circle',
      info: 'fa-info-circle',
      warning: 'fa-exclamation-triangle',
      danger: 'fa-times-circle'
    };
    
    toast.style.cssText = `
      position: fixed;
      top: 90px;
      right: 20px;
      background: ${colors[type]};
      color: white;
      padding: 16px 20px;
      border-radius: 8px;
      z-index: 1000;
      min-width: 300px;
      box-shadow: 0 4px 12px rgba(0,0,0,0.15);
      animation: slideInRight 0.3s ease-out;
    `;
    
    toast.innerHTML = `
      <div style="display: flex; align-items: flex-start; gap: 12px;">
        <i class="fas ${icons[type]}" style="margin-top: 2px;"></i>
        <div style="flex: 1;">
          <div style="font-weight: 600; margin-bottom: 4px;">${title}</div>
          <div style="font-size: 14px; opacity: 0.9;">${message}</div>
        </div>
        <button onclick="this.parentElement.parentElement.remove()" 
                style="background: none; border: none; color: white; cursor: pointer; padding: 0; font-size: 16px;">
          <i class="fas fa-times"></i>
        </button>
      </div>
    `;
    
    document.body.appendChild(toast);
    
    // Auto remove
    setTimeout(() => {
      if (toast.parentElement) {
        toast.style.animation = 'slideOutRight 0.3s ease-in forwards';
        setTimeout(() => toast.remove(), 300);
      }
    }, duration);
  }

  closeModal(modalElement) {
    if (modalElement) {
      modalElement.classList.remove('active');
    }
  }

  closeAllModals() {
    document.querySelectorAll('.modal-overlay.active').forEach(modal => {
      modal.classList.remove('active');
    });
  }

  // Reset all filters
  resetFilters() {
    this.currentFilters = this.getDefaultFilters();
    
    // Update UI
    document.querySelectorAll('.filter-select').forEach(select => {
      const filterType = select.dataset.filter;
      if (this.currentFilters[filterType]) {
        select.value = this.currentFilters[filterType];
      }
    });
    
    document.querySelectorAll('.filter-button').forEach(button => {
      button.classList.remove('active');
    });
    
    document.querySelectorAll('.filter-button[data-horizon="12"]').forEach(button => {
      button.classList.add('active');
    });
    
    // Apply reset filters
    this.applyFilters();
    
    this.showToast('Filters', 'All filters reset', 'info', 2000);
  }
}

// Add CSS for toasts
const toastStyles = document.createElement('style');
toastStyles.textContent = `
  @keyframes pulse {
    0%, 100% { opacity: 1; }
    50% { opacity: 0.7; }
  }
  
  .toast {
    font-family: 'Inter', sans-serif;
  }
`;
document.head.appendChild(toastStyles);

// Initialize interaction manager
const interactions = new InteractionManager();