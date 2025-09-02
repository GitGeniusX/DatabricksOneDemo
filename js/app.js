// ======================================
// Main Application Controller
// ======================================

class App {
  constructor() {
    this.isInitialized = false;
    this.init();
  }

  async init() {
    try {
      // Wait for DOM to be ready
      if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', () => this.initialize());
      } else {
        this.initialize();
      }
    } catch (error) {
      console.error('App initialization error:', error);
      this.showErrorState();
    }
  }

  async initialize() {
    // Show initial loading state
    this.showLoading();

    try {
      // Initialize navigation manager
      nav = new NavigationManager();
      
      // Set up global error handling
      this.setupErrorHandling();
      
      // Set up performance monitoring
      this.setupPerformanceMonitoring();
      
      // Initialize theme and accessibility features
      this.initializeAccessibility();
      
      // Set up keyboard shortcuts
      this.setupGlobalKeyboardShortcuts();
      
      // Initialize data freshness monitoring
      this.initializeDataFreshness();
      
      // Mark as initialized
      this.isInitialized = true;
      
      // Hide loading state
      this.hideLoading();
      
      console.log('Consulting Analytics Dashboard initialized successfully');
      
    } catch (error) {
      console.error('Failed to initialize app:', error);
      this.showErrorState();
    }
  }

  setupErrorHandling() {
    // Global error handler
    window.addEventListener('error', (event) => {
      console.error('Global error:', event.error);
      this.handleError(event.error);
    });

    // Promise rejection handler
    window.addEventListener('unhandledrejection', (event) => {
      console.error('Unhandled promise rejection:', event.reason);
      this.handleError(event.reason);
    });
  }

  handleError(error) {
    // In a real application, this would send errors to a logging service
    console.error('Application error:', error);
    
    // Show user-friendly error message
    interactions.showToast('Error', 'Something went wrong. Please refresh the page.', 'danger', 5000);
  }

  setupPerformanceMonitoring() {
    // Monitor page load performance
    window.addEventListener('load', () => {
      if (window.performance && window.performance.timing) {
        const timing = window.performance.timing;
        const loadTime = timing.loadEventEnd - timing.navigationStart;
        console.log(`Page load time: ${loadTime}ms`);
        
        // In a real app, send this data to analytics
        if (loadTime > 3000) {
          console.warn('Slow page load detected');
        }
      }
    });

    // Monitor Chart.js render times
    if (window.Chart) {
      Chart.defaults.onAnimationComplete = function() {
        console.log('Chart animation completed');
      };
    }
  }

  initializeAccessibility() {
    // Add skip links
    this.addSkipLinks();
    
    // Set up focus management
    this.setupFocusManagement();
    
    // Initialize screen reader announcements
    this.setupScreenReaderAnnouncements();
    
    // Set up keyboard navigation
    this.setupKeyboardNavigation();
  }

  addSkipLinks() {
    const skipLinks = document.createElement('div');
    skipLinks.innerHTML = `
      <a href="#main-content" class="skip-link">Skip to main content</a>
      <a href="#side-nav" class="skip-link">Skip to navigation</a>
    `;
    skipLinks.style.cssText = `
      position: absolute;
      top: -40px;
      left: 6px;
      z-index: 1000;
    `;
    
    document.body.insertBefore(skipLinks, document.body.firstChild);
  }

  setupFocusManagement() {
    // Manage focus when navigating between pages
    document.addEventListener('pageChanged', (event) => {
      const pageTitle = document.querySelector('.page-title');
      if (pageTitle) {
        pageTitle.focus();
      }
    });
  }

  setupScreenReaderAnnouncements() {
    // Create live region for announcements
    const liveRegion = document.createElement('div');
    liveRegion.setAttribute('aria-live', 'polite');
    liveRegion.setAttribute('aria-atomic', 'true');
    liveRegion.className = 'sr-only';
    liveRegion.id = 'live-region';
    document.body.appendChild(liveRegion);
  }

  announceToScreenReader(message) {
    const liveRegion = document.getElementById('live-region');
    if (liveRegion) {
      liveRegion.textContent = message;
    }
  }

  setupKeyboardNavigation() {
    // Tab trap for modals
    document.addEventListener('keydown', (event) => {
      if (event.key === 'Tab') {
        const activeModal = document.querySelector('.modal-overlay.active');
        if (activeModal) {
          this.trapFocus(event, activeModal);
        }
      }
    });
  }

  trapFocus(event, container) {
    const focusableElements = container.querySelectorAll(
      'button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])'
    );
    
    const firstElement = focusableElements[0];
    const lastElement = focusableElements[focusableElements.length - 1];

    if (event.shiftKey && document.activeElement === firstElement) {
      event.preventDefault();
      lastElement.focus();
    } else if (!event.shiftKey && document.activeElement === lastElement) {
      event.preventDefault();
      firstElement.focus();
    }
  }

  setupGlobalKeyboardShortcuts() {
    document.addEventListener('keydown', (event) => {
      // Only process shortcuts when not in input fields
      if (event.target.matches('input, textarea, select')) return;
      
      // Ctrl/Cmd + K for search
      if ((event.ctrlKey || event.metaKey) && event.key === 'k') {
        event.preventDefault();
        nav.navigateTo('search');
      }
      
      // Alt + 1-5 for domain navigation
      if (event.altKey && event.key >= '1' && event.key <= '5') {
        event.preventDefault();
        const domains = ['financial', 'delivery', 'people', 'client', 'strategic'];
        const index = parseInt(event.key) - 1;
        if (domains[index]) {
          nav.navigateTo(domains[index]);
        }
      }
      
      // Alt + H for home
      if (event.altKey && event.key === 'h') {
        event.preventDefault();
        nav.navigateTo('home');
      }
    });
  }

  initializeDataFreshness() {
    // Update data freshness indicators
    this.updateDataFreshness();
    
    // Set up periodic updates
    setInterval(() => {
      this.updateDataFreshness();
    }, 60000); // Every minute
  }

  updateDataFreshness() {
    const freshnessBadges = document.querySelectorAll('.data-freshness');
    
    freshnessBadges.forEach(badge => {
      // In a real app, this would check actual data timestamps
      const now = new Date();
      const timestamps = [
        new Date(now.getTime() - 2 * 60 * 60 * 1000), // 2 hours ago
        new Date(now.getTime() - 1 * 60 * 60 * 1000), // 1 hour ago
        new Date(now.getTime() - 3 * 60 * 60 * 1000), // 3 hours ago
      ];
      
      const randomTimestamp = timestamps[Math.floor(Math.random() * timestamps.length)];
      const timeDiff = now.getTime() - randomTimestamp.getTime();
      const hours = Math.floor(timeDiff / (1000 * 60 * 60));
      
      const dot = badge.querySelector('.data-freshness-dot');
      const text = badge.querySelector('span') || badge.childNodes[badge.childNodes.length - 1];
      
      if (hours <= 1) {
        badge.className = 'data-freshness';
        if (text) text.textContent = `Updated ${hours === 0 ? 'just now' : '1 hour ago'}`;
      } else if (hours <= 3) {
        badge.className = 'data-freshness stale';
        if (text) text.textContent = `Updated ${hours} hours ago`;
      } else {
        badge.className = 'data-freshness old';
        if (text) text.textContent = `Updated ${hours} hours ago`;
      }
    });
  }

  // Loading state management
  showLoading() {
    const loadingOverlay = document.getElementById('loading-overlay');
    if (loadingOverlay) {
      loadingOverlay.classList.add('active');
    }
  }

  hideLoading() {
    const loadingOverlay = document.getElementById('loading-overlay');
    if (loadingOverlay) {
      loadingOverlay.classList.remove('active');
    }
  }

  showErrorState() {
    const contentArea = document.getElementById('content-area');
    if (contentArea) {
      contentArea.innerHTML = `
        <div class="error-state" style="text-align: center; padding: 4rem;">
          <i class="fas fa-exclamation-triangle" style="font-size: 4rem; color: var(--danger-red); margin-bottom: 2rem;"></i>
          <h2>Something went wrong</h2>
          <p style="margin: 1rem 0 2rem; color: var(--text-secondary);">
            We're having trouble loading the dashboard. Please try refreshing the page.
          </p>
          <button class="btn btn-primary" onclick="window.location.reload()">
            <i class="fas fa-refresh"></i>
            Refresh Page
          </button>
        </div>
      `;
    }
    this.hideLoading();
  }

  // Export functionality
  exportData(format = 'csv') {
    console.log(`Exporting data in ${format} format`);
    interactions.showToast('Export', `Exporting data as ${format.toUpperCase()}...`, 'info', 3000);
    
    // In a real app, this would generate and download the file
    setTimeout(() => {
      interactions.showToast('Export', 'Export completed successfully', 'success', 3000);
    }, 2000);
  }

  // Print functionality
  printDashboard() {
    window.print();
  }

  // Help system
  showHelp() {
    const helpModal = this.createHelpModal();
    document.body.appendChild(helpModal);
    helpModal.classList.add('active');
  }

  createHelpModal() {
    const modal = document.createElement('div');
    modal.className = 'modal-overlay';
    modal.innerHTML = `
      <div class="modal-content" style="max-width: 600px;">
        <div class="modal-header">
          <h2 class="modal-title">Keyboard Shortcuts</h2>
          <button class="modal-close" aria-label="Close help">
            <i class="fas fa-times"></i>
          </button>
        </div>
        <div class="modal-body">
          <div style="display: grid; gap: 1rem;">
            <div style="display: flex; justify-content: space-between; padding: 0.5rem; background: var(--bg-light); border-radius: 4px;">
              <span><kbd>/</kbd></span>
              <span>Focus search</span>
            </div>
            <div style="display: flex; justify-content: space-between; padding: 0.5rem; background: var(--bg-light); border-radius: 4px;">
              <span><kbd>Ctrl</kbd> + <kbd>K</kbd></span>
              <span>Open search page</span>
            </div>
            <div style="display: flex; justify-content: space-between; padding: 0.5rem; background: var(--bg-light); border-radius: 4px;">
              <span><kbd>Alt</kbd> + <kbd>H</kbd></span>
              <span>Go to home</span>
            </div>
            <div style="display: flex; justify-content: space-between; padding: 0.5rem; background: var(--bg-light); border-radius: 4px;">
              <span><kbd>Alt</kbd> + <kbd>1-5</kbd></span>
              <span>Navigate to domains</span>
            </div>
            <div style="display: flex; justify-content: space-between; padding: 0.5rem; background: var(--bg-light); border-radius: 4px;">
              <span><kbd>Esc</kbd></span>
              <span>Close modals</span>
            </div>
          </div>
        </div>
      </div>
    `;
    
    return modal;
  }

  // Development utilities
  getDebugInfo() {
    return {
      isInitialized: this.isInitialized,
      currentPage: nav?.currentPage,
      activeFilters: interactions?.currentFilters,
      chartCount: charts?.charts?.size || 0,
      performance: window.performance?.timing
    };
  }

  // Clean up resources
  destroy() {
    charts?.destroyAllCharts();
    this.isInitialized = false;
  }
}

// Initialize application
const app = new App();

// Make app available globally for debugging
window.app = app;

// Export debug function for console use
window.getDebugInfo = () => app.getDebugInfo();

// Add helpful console messages
console.log('%c🚀 Consulting Analytics Dashboard', 'color: #1f4788; font-size: 16px; font-weight: bold;');
console.log('%cType getDebugInfo() in console for debug information', 'color: #6c757d; font-style: italic;');
console.log('%cKeyboard shortcuts: / (search), Ctrl+K (search page), Alt+H (home), Alt+1-5 (domains)', 'color: #6c757d;');