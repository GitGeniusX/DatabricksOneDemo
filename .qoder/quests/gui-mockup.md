# Consulting Analytics Dashboard - GUI Mockup Design

## Overview

This design outlines the GUI mockup for a comprehensive consulting analytics dashboard featuring domain-specific views for Financial Performance, Delivery & Operations, People & Talent, Client Success, and Strategic/Board metrics. The mockup will be implemented as a clickable HTML prototype demonstrating navigation flows, interactions, and visual layouts without backend connectivity.

## Technology Stack & Dependencies

### Frontend Framework
- **HTML5/CSS3/JavaScript**: Core foundation for mockup prototype
- **CSS Grid & Flexbox**: Responsive layout system
- **Chart.js**: Interactive chart visualization library
- **Font Awesome**: Icon library for UI elements
- **Google Fonts**: Typography (Inter/Roboto family)

### UI Components
- Custom CSS component library following design system
- Responsive grid system (12-column layout)
- Interactive elements with hover/click states
- Modal dialogs and side panels
- Loading states and transitions

## Component Architecture

### Component Definition

#### Core Layout Components
```
AppShell
├── NavigationHeader
│   ├── Logo
│   ├── GlobalSearch
│   ├── UserProfile
│   └── NotificationBell
├── SideNavigation
│   ├── DomainMenuItem (x5)
│   ├── SearchMenuItem
│   └── AskMenuItem
├── MainContent
│   ├── BreadcrumbNav
│   ├── PageHeader
│   └── ContentArea
└── FooterBar
```

#### Domain Dashboard Components
```
DomainDashboard
├── KPIHeaderRow
│   └── KPICard (x5)
├── ForecastLane
│   ├── ForecastChart
│   ├── TrendChart
│   └── WaterfallChart
├── InteractionPanel
│   ├── FilterButtons
│   ├── SegmentToggles
│   └── ExplainVarianceButton
└── DetailVisualization
    ├── HeatmapChart
    ├── LineChart
    ├── StackedAreaChart
    └── TreemapChart
```

#### Interactive Components
```
SearchInterface
├── SearchInput
├── FilterDropdowns
└── ResultsPanel
    ├── KPIResults
    ├── DashboardResults
    ├── ProjectResults
    ├── ClientResults
    ├── PeopleResults
    └── DocsResults

AskInterface
├── NLQInput
├── ExampleQueries
└── AnswerPanel
    ├── SummaryBullets
    ├── LinkedVisuals
    └── ReproducibleQuery
```

### Component Hierarchy

```mermaid
graph TD
    A[AppShell] --> B[NavigationHeader]
    A --> C[SideNavigation]
    A --> D[MainContent]
    A --> E[FooterBar]
    
    D --> F[HomePage]
    D --> G[FinancialDashboard]
    D --> H[DeliveryDashboard]
    D --> I[PeopleDashboard]
    D --> J[ClientDashboard]
    D --> K[StrategicDashboard]
    D --> L[SearchPage]
    D --> M[AskPage]
    
    G --> N[KPIHeaderRow]
    G --> O[ForecastLane]
    G --> P[InteractionPanel]
    
    N --> Q[KPICard]
    O --> R[Chart Components]
    P --> S[Filter Controls]
```

### Props/State Management

#### Global State Structure
```javascript
// Global application state (managed via sessionStorage for mockup)
globalState = {
  currentDomain: 'home',
  activeFilters: {
    timeRange: '12m',
    businessUnit: 'all',
    country: 'all',
    serviceLine: 'all',
    clientTier: 'all'
  },
  navigation: {
    breadcrumb: [],
    activeMenuItem: 'home'
  },
  user: {
    role: 'manager',
    permissions: ['financial', 'delivery', 'people'],
    region: 'nordic'
  }
}
```

#### Component Props Interface
```javascript
// KPICard Props
KPICard = {
  title: string,
  value: string,
  change: number,
  changeType: 'positive' | 'negative' | 'neutral',
  trend: array,
  onClick: function,
  isClickable: boolean
}

// Chart Props
Chart = {
  type: 'line' | 'bar' | 'area' | 'heatmap' | 'treemap',
  data: array,
  config: object,
  height: number,
  interactive: boolean,
  onPointClick: function
}
```

### Lifecycle Methods/Hooks

#### Page Initialization Flow
```javascript
// Page load sequence
1. loadGlobalState()
2. validateUserPermissions()
3. renderNavigationShell()
4. loadDomainContent()
5. attachEventListeners()
6. enableInteractivity()
```

#### Component Update Cycle
```javascript
// Filter change workflow
onFilterChange() {
  updateGlobalState(newFilters)
  showLoadingState()
  simulateDataRefresh()
  rerenderCharts()
  updateKPICards()
  hideLoadingState()
}
```

### Example Component Usage

#### KPI Header Implementation
```html
<div class="kpi-header-row">
  <div class="kpi-card clickable" onclick="filterByRevenue()">
    <div class="kpi-title">Revenue (YTD)</div>
    <div class="kpi-value">€2.4M</div>
    <div class="kpi-change positive">+12.3%</div>
    <div class="kpi-trend">
      <canvas class="sparkline" data-trend="[2.1,2.2,2.3,2.4]"></canvas>
    </div>
  </div>
  <!-- Repeat for 4 more KPI cards -->
</div>
```

## Routing & Navigation

### Page Structure
```
/
├── home (Dashboard hub with domain tiles)
├── financial (Financial Performance domain)
├── delivery (Delivery & Operations domain)
├── people (People & Talent domain)
├── client (Client Success domain)
├── strategic (Strategic/Board domain)
├── search (Search interface)
├── ask (NLQ/GenAI interface)
└── detail
    ├── project/:id
    ├── client/:id
    └── consultant/:id
```

### Navigation Flow
```mermaid
graph LR
    A[Home Page] --> B[Financial Dashboard]
    A --> C[Delivery Dashboard]
    A --> D[People Dashboard]
    A --> E[Client Dashboard]
    A --> F[Strategic Dashboard]
    A --> G[Search Page]
    A --> H[Ask Page]
    
    B --> I[Project Detail]
    C --> I
    D --> J[Consultant Detail]
    E --> K[Client Detail]
    
    I --> A
    J --> A
    K --> A
```

### URL Hash Navigation (for mockup)
```javascript
// Simple hash-based routing for prototype
const routes = {
  '#/': renderHomePage,
  '#/financial': renderFinancialDashboard,
  '#/delivery': renderDeliveryDashboard,
  '#/people': renderPeopleDashboard,
  '#/client': renderClientDashboard,
  '#/strategic': renderStrategicDashboard,
  '#/search': renderSearchPage,
  '#/ask': renderAskPage
}
```

## Styling Strategy

### Design System Foundation
```css
/* Color Palette */
:root {
  --primary-blue: #1f4788;
  --secondary-blue: #4a90a4;
  --accent-orange: #ff6b35;
  --success-green: #28a745;
  --warning-amber: #ffc107;
  --danger-red: #dc3545;
  --neutral-gray: #6c757d;
  --light-gray: #f8f9fa;
  --dark-gray: #343a40;
}

/* Typography Scale */
.text-hero { font-size: 2.5rem; font-weight: 700; }
.text-h1 { font-size: 2rem; font-weight: 600; }
.text-h2 { font-size: 1.5rem; font-weight: 600; }
.text-body { font-size: 1rem; font-weight: 400; }
.text-caption { font-size: 0.875rem; font-weight: 400; }

/* Spacing System */
.spacing-xs { margin: 0.25rem; }
.spacing-sm { margin: 0.5rem; }
.spacing-md { margin: 1rem; }
.spacing-lg { margin: 1.5rem; }
.spacing-xl { margin: 2rem; }
```

### Component-Specific Styles
```css
/* KPI Card Styling */
.kpi-card {
  background: white;
  border-radius: 8px;
  padding: 1.5rem;
  box-shadow: 0 2px 8px rgba(0,0,0,0.1);
  transition: transform 0.2s ease;
}

.kpi-card.clickable:hover {
  transform: translateY(-2px);
  box-shadow: 0 4px 16px rgba(0,0,0,0.15);
  cursor: pointer;
}

/* Chart Container */
.chart-container {
  background: white;
  border-radius: 12px;
  padding: 2rem;
  margin-bottom: 1.5rem;
  box-shadow: 0 2px 12px rgba(0,0,0,0.08);
}

/* Dashboard Grid */
.dashboard-grid {
  display: grid;
  grid-template-columns: repeat(12, 1fr);
  gap: 1.5rem;
  padding: 2rem;
}
```

### Responsive Design
```css
/* Mobile-first approach */
@media (max-width: 768px) {
  .dashboard-grid {
    grid-template-columns: 1fr;
    padding: 1rem;
  }
  
  .kpi-header-row {
    flex-direction: column;
  }
  
  .side-navigation {
    transform: translateX(-100%);
    position: fixed;
    z-index: 1000;
  }
}

@media (min-width: 769px) and (max-width: 1024px) {
  .dashboard-grid {
    grid-template-columns: repeat(6, 1fr);
  }
}
```

## State Management

### Local Storage Schema
```javascript
// Mockup data stored in localStorage
mockupData = {
  kpis: {
    financial: {
      revenue: { value: "€2.4M", change: 12.3, trend: [2.1,2.2,2.3,2.4] },
      grossMargin: { value: "34.5%", change: -2.1, trend: [36,35,34.5] },
      revenuePerConsultant: { value: "€85K", change: 5.8, trend: [80,82,85] },
      averageBillingRate: { value: "€950", change: 1.2, trend: [940,945,950] },
      pipelineCoverage: { value: "78%", change: -5.3, trend: [82,80,78] }
    },
    delivery: {
      billableUtilization: { value: "82%", change: 3.1, trend: [79,81,82] },
      benchPercentage: { value: "12%", change: -1.8, trend: [14,13,12] },
      projectOverrunRate: { value: "8%", change: -2.3, trend: [10,9,8] },
      onTimeDelivery: { value: "94%", change: 2.1, trend: [92,93,94] }
    }
    // ... other domains
  },
  charts: {
    // Mock chart data for visualization
  },
  filters: {
    timeRanges: ["3m", "6m", "12m"],
    businessUnits: ["Cloud", "Digital", "Analytics", "Strategy"],
    countries: ["Sweden", "Norway", "Denmark", "Finland"],
    serviceLines: ["Advisory", "Implementation", "Support"],
    clientTiers: ["Enterprise", "Mid-Market", "SMB"]
  }
}
```

### State Update Patterns
```javascript
// Filter state management
function updateFilters(newFilters) {
  const currentState = getGlobalState();
  const updatedState = {
    ...currentState,
    activeFilters: {
      ...currentState.activeFilters,
      ...newFilters
    }
  };
  setGlobalState(updatedState);
  refreshDashboard();
}

// Navigation state
function navigateTo(domain) {
  updateBreadcrumb(domain);
  setActiveMenuItem(domain);
  loadDomainContent(domain);
  updateURL(domain);
}
```

## API Integration Layer

### Mock API Service
```javascript
// Simulated API calls for mockup
class MockAPIService {
  static async getKPIData(domain, filters) {
    // Simulate network delay
    await this.delay(300);
    
    // Return filtered mock data
    return this.applyFilters(mockupData.kpis[domain], filters);
  }
  
  static async getChartData(chartType, filters) {
    await this.delay(500);
    return this.generateChartData(chartType, filters);
  }
  
  static async searchEntities(query, filters) {
    await this.delay(200);
    return this.mockSearchResults(query);
  }
  
  static async askQuestion(question) {
    await this.delay(800);
    return this.generateAIResponse(question);
  }
  
  static delay(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
  }
}
```

### Data Transformation Layer
```javascript
// Transform mock data for different chart types
class DataTransformer {
  static toLineChart(data) {
    return {
      labels: data.labels,
      datasets: [{
        label: data.metric,
        data: data.values,
        borderColor: 'var(--primary-blue)',
        backgroundColor: 'rgba(31, 71, 136, 0.1)',
        tension: 0.4
      }]
    };
  }
  
  static toHeatmap(data) {
    return data.map(row => ({
      x: row.team,
      y: row.week,
      v: row.utilization
    }));
  }
}
```

## Testing Strategy

### Manual Testing Checklist
```
Navigation Testing:
□ All menu items navigate correctly
□ Breadcrumb navigation works
□ Back button functionality
□ URL hash updates properly

Interaction Testing:
□ KPI cards clickable and filter correctly
□ Chart points clickable with proper tooltips
□ Filter dropdowns update content
□ Search returns grouped results
□ Ask interface shows mock responses

Responsive Testing:
□ Mobile layout adapts correctly
□ Tablet view maintains usability
□ Desktop layout fully functional
□ Touch interactions work on mobile

Performance Testing:
□ Page loads under 2.5s
□ Chart rendering under 1s
□ Smooth animations and transitions
□ No memory leaks during navigation
```

### User Acceptance Criteria
```
□ Home page renders with 4 domain tiles matching design
□ Each domain shows KPI header with 5 cards
□ Forecast lane displays 3+ interactive charts
□ Global filters persist across domain navigation
□ Search interface returns categorized results
□ Ask interface shows AI-style responses with linked visuals
□ Forecast charts display confidence bands
□ KPI clicks filter charts within 300ms
□ Responsive design works on mobile/tablet
□ All interactive elements have proper hover states
```

### Accessibility Testing
```
WCAG 2.1 AA Compliance:
□ Color contrast ratios meet 4.5:1 minimum
□ All interactive elements keyboard accessible
□ Screen reader compatible with proper ARIA labels
□ Focus indicators visible and logical
□ Skip links available for navigation
□ Error messages use text + icons
□ Chart data accessible via data tables
```

## Implementation Structure

### File Organization
```
mockup/
├── index.html (Main entry point)
├── css/
│   ├── main.css (Global styles)
│   ├── components.css (Component styles)
│   ├── layout.css (Grid and layout)
│   └── responsive.css (Media queries)
├── js/
│   ├── app.js (Main application)
│   ├── navigation.js (Routing logic)
│   ├── charts.js (Chart rendering)
│   ├── data.js (Mock data service)
│   └── interactions.js (Click handlers)
├── assets/
│   ├── icons/ (SVG icons)
│   └── images/ (Screenshots, logos)
└── data/
    └── mock-data.json (Sample datasets)
```

### Progressive Enhancement
```javascript
// Feature detection and graceful degradation
if (typeof Storage !== "undefined") {
  // Use localStorage for state persistence
} else {
  // Fallback to session-only state
}

if (window.IntersectionObserver) {
  // Use lazy loading for charts
} else {
  // Load all charts immediately
}
```

### Performance Optimization
```javascript
// Chart virtualization for large datasets
class VirtualizedChart {
  constructor(container, data) {
    this.container = container;
    this.fullData = data;
    this.visibleRange = { start: 0, end: 100 };
  }
  
  render() {
    const visibleData = this.fullData.slice(
      this.visibleRange.start, 
      this.visibleRange.end
    );
    this.renderChart(visibleData);
  }
}

// Debounced filter updates
const debouncedFilterUpdate = debounce(updateFilters, 300);
```

## Visual Layout Specifications

### Home Page Layout
```
┌─────────────────────────────────────────────────────────┐
│ Header: Logo | Global Search | User Profile | Alerts    │
├─────────────────────────────────────────────────────────┤
│ Nav │ Hero Section: Welcome + Key Metrics Overview      │
│     │                                                   │
│ •   │ ┌─────────────┐ ┌─────────────┐                 │
│ •   │ │ Financial   │ │ Delivery &  │                 │
│ •   │ │ Performance │ │ Operations  │                 │
│ •   │ │   📊 €2.4M  │ │   ⚡ 82%    │                 │
│ •   │ └─────────────┘ └─────────────┘                 │
│     │                                                   │
│     │ ┌─────────────┐ ┌─────────────┐                 │
│     │ │ People &    │ │ Client      │                 │
│     │ │ Talent      │ │ Success     │                 │
│     │ │   👥 235    │ │   😊 8.2    │                 │
│     │ └─────────────┘ └─────────────┘                 │
│     │                                                   │
│     │ ┌─────────────────────────────┐                 │
│     │ │ Strategic Overview          │                 │
│     │ │        📈 Board View        │                 │
│     │ └─────────────────────────────┘                 │
└─────────────────────────────────────────────────────────┘
```

### Domain Dashboard Layout
```
┌─────────────────────────────────────────────────────────┐
│ Breadcrumb: Home > Financial Performance                │
├─────────────────────────────────────────────────────────┤
│ KPI Header Row                                          │
│ ┌─────┐ ┌─────┐ ┌─────┐ ┌─────┐ ┌─────┐               │
│ │Rev  │ │Margin│ │Rev/ │ │Avg  │ │Pipe │               │
│ │€2.4M│ │34.5%│ │Cons │ │Rate │ │Cov  │               │
│ │+12%│ │-2.1%│ │€85K │ │€950 │ │78% │               │
│ └─────┘ └─────┘ └─────┘ └─────┘ └─────┘               │
├─────────────────────────────────────────────────────────┤
│ Forecast Lane                                           │
│ ┌─────────────────┐ ┌─────────────────┐               │
│ │ Revenue Forecast│ │ Rolling Growth  │               │
│ │   📈 Line +Band │ │   📊 Column+Line│               │
│ └─────────────────┘ └─────────────────┘               │
│ ┌─────────────────────────────────────┐               │
│ │ Profitability Waterfall             │               │
│ │        💰 Monthly Breakdown         │               │
│ └─────────────────────────────────────┘               │
├─────────────────────────────────────────────────────────┤
│ Interaction Panel                                       │
│ [BU▼] [Country▼] [Service▼] [Tier▼] [Explain Variance] │
└─────────────────────────────────────────────────────────┘
```

### Chart Interaction Patterns
```mermaid
sequenceDiagram
    participant User
    participant KPICard
    participant FilterSystem
    participant Charts
    
    User->>KPICard: Click Revenue Card
    KPICard->>FilterSystem: Apply Revenue Filter
    FilterSystem->>Charts: Update Data Query
    Charts->>Charts: Animate Transition
    Charts->>User: Show Filtered Results
    
    User->>Charts: Click Chart Point
    Charts->>FilterSystem: Drill Down Filter
    FilterSystem->>Charts: Load Detail View
    Charts->>User: Show Detail Panel
```

## Interactive Behavior Specifications

### Click-to-Filter Flow
```javascript
// KPI Card Click Handler
function handleKPIClick(kpiType, currentValue) {
  // 1. Visual feedback
  showLoadingSpinner();
  highlightActiveKPI(kpiType);
  
  // 2. Apply filter
  const filterCriteria = {
    metric: kpiType,
    value: currentValue,
    operator: 'focus'
  };
  
  // 3. Update all charts
  updateChartsWithFilter(filterCriteria);
  
  // 4. Update URL state
  updateURLParams({ filter: kpiType });
  
  // 5. Show filtered state indicator
  showActiveFilterBadge(kpiType);
}
```

### Chart Point Click Behavior
```javascript
// Chart point interaction
function handleChartPointClick(chartType, dataPoint) {
  const actions = {
    'utilization-heatmap': (point) => {
      showStaffingSuggestions(point.team, point.week);
    },
    'overrun-rate': (point) => {
      showProjectRiskList(point.period);
    },
    'skills-gap': (point) => {
      showHiringRecommendations(point.skill);
    },
    'client-revenue': (point) => {
      navigateToClientDetail(point.clientId);
    }
  };
  
  if (actions[chartType]) {
    actions[chartType](dataPoint);
  }
}
```

### Side Panel Interactions
```javascript
// Explain Variance Panel
function showExplainVariancePanel(metric) {
  const panel = {
    title: `${metric} Variance Analysis`,
    content: {
      drivers: [
        { factor: 'Rate Changes', impact: '+€120K', percentage: '60%' },
        { factor: 'Utilization', impact: '-€45K', percentage: '23%' },
        { factor: 'Mix Shift', impact: '+€25K', percentage: '17%' }
      ],
      recommendations: [
        'Focus on premium service lines',
        'Optimize bench allocation',
        'Review pricing strategy'
      ]
    }
  };
  
  renderSidePanel(panel);
}
```

## Search & Ask Interface Design

### Search Results Layout
```
┌─────────────────────────────────────────────────────────┐
│ Search: "cloud revenue"                    [🔍]         │
├─────────────────────────────────────────────────────────┤
│ Filters: [Domain▼] [Date▼] [BU▼]                       │
├─────────────────────────────────────────────────────────┤
│ 📊 KPIs (3)                                            │
│   • Cloud Revenue YTD: €1.2M (+15%)                    │
│   • Cloud Margin: 28.5% (-1.2%)                        │
│   • Cloud Utilization: 85% (+3%)                       │
├─────────────────────────────────────────────────────────┤
│ 📈 Dashboards (2)                                      │
│   • Financial Performance > Cloud BU                   │
│   • Delivery Operations > Cloud Projects               │
├─────────────────────────────────────────────────────────┤
│ 📋 Projects (5)                                        │
│   • Nordea Cloud Migration (€450K, 85% complete)       │
│   • SEB Analytics Platform (€320K, 60% complete)       │
│   • ... 3 more                                         │
├─────────────────────────────────────────────────────────┤
│ 👥 People (3)                                          │
│   • Lars Andersen (Cloud Architect, 92% util)          │
│   • ... 2 more                                         │
└─────────────────────────────────────────────────────────┘
```

### Ask Interface Design
```
┌─────────────────────────────────────────────────────────┐
│ Ask Qoder Analytics                                     │
├─────────────────────────────────────────────────────────┤
│ 💬 "Why did margin drop last month in Cloud BU?"       │
│                                                [Ask]    │
├─────────────────────────────────────────────────────────┤
│ 🤖 Answer Summary:                                      │
│   • Rate compression (-€50/day avg) due to competitive │
│     pressure on 3 major deals                          │
│   • Increased junior staff ratio (65% vs 45% target)   │
│   • Project overruns on SEB engagement (+120hrs)       │
├─────────────────────────────────────────────────────────┤
│ 📊 Supporting Visuals:                                 │
│   [Chart: Cloud BU Rate Trend]                         │
│   [Chart: Staff Mix Evolution]                         │
│   [Chart: Project Budget vs Actual]                    │
├─────────────────────────────────────────────────────────┤
│ 🔍 Data Scope: Nordic • Cloud BU • Jan-Mar 2024       │
│ 📝 Reproducible Query: SHOW margin_analysis WHERE...   │
└─────────────────────────────────────────────────────────┘
```

### Example Questions for Ask Interface
```javascript
const exampleQuestions = [
  "Why did margin drop last month in Cloud BU?",
  "Forecast bench in Sweden for 8 weeks and propose redeployments",
  "Which clients are at churn risk next quarter?",
  "Show me top 5 projects by overrun risk",
  "What's the skills gap in our Analytics practice?",
  "Compare utilization across Nordic countries",
  "Which consultants should I assign to the new Volvo project?"
];
```

## Modal Dialog Specifications

### Project Detail Modal
```
┌─────────────────────────────────────────────────────────┐
│ Project: SEB Analytics Platform                    [×]  │
├─────────────────────────────────────────────────────────┤
│ Overview    Budget    Schedule    Team    Risks         │
├─────────────────────────────────────────────────────────┤
│ Status: 🟡 At Risk        Health Score: 72/100         │
│ Budget: €320K (75% spent) Margin: 22% (target: 28%)    │
│ Timeline: 8 weeks remain  Delivery: Mar 15, 2024       │
├─────────────────────────────────────────────────────────┤
│ Key Metrics:                                            │
│ ┌─────────────┐ ┌─────────────┐ ┌─────────────┐       │
│ │ Burn Rate   │ │ Completion  │ │ Client NPS  │       │
│ │   €15K/wk   │ │    60%      │ │     7.5     │       │
│ └─────────────┘ └─────────────┘ └─────────────┘       │
├─────────────────────────────────────────────────────────┤
│ 📈 Forecast to Complete (S-Curve)                      │
│ [Chart showing planned vs actual vs forecast]          │
├─────────────────────────────────────────────────────────┤
│ ⚠️ Active Risks:                                       │
│   • Scope creep in data migration (+3 weeks est.)      │
│   • Key resource (Lars) allocated to other project     │
│   • Client IT review delayed (medium impact)           │
└─────────────────────────────────────────────────────────┘
```

### Client Detail Modal
```
┌─────────────────────────────────────────────────────────┐
│ Client: SEB Bank                                   [×]  │
├─────────────────────────────────────────────────────────┤
│ Overview    Projects    Opportunities    Health         │
├─────────────────────────────────────────────────────────┤
│ Tier: Enterprise         Relationship: 4 years         │
│ Revenue YTD: €1.2M       Concentration: 12% of total   │
│ NPS Score: 8.2          Churn Risk: 🟢 Low            │
├─────────────────────────────────────────────────────────┤
│ 📊 Revenue Trend (24 months)                           │
│ [Line chart showing monthly revenue]                    │
├─────────────────────────────────────────────────────────┤
│ 🎯 Active Projects (3):                                │
│   • Analytics Platform (€320K, 60% complete)           │
│   • Cloud Migration Phase 2 (€180K, planning)         │
│   • Compliance Review (€45K, 90% complete)             │
├─────────────────────────────────────────────────────────┤
│ 💰 Pipeline (€890K):                                   │
│   • Digital Transformation (€650K, 70% confidence)     │
│   • Data Governance (€240K, 45% confidence)            │
├─────────────────────────────────────────────────────────┤
│ 📅 Key Dates:                                          │
│   • Contract Renewal: Dec 2024                         │
│   • QBR Scheduled: Apr 15, 2024                        │
└─────────────────────────────────────────────────────────┘
```

## Animation and Transition Specifications

### Page Transitions
```css
/* Smooth page transitions */
.page-transition {
  transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
}

.page-enter {
  opacity: 0;
  transform: translateX(20px);
}

.page-enter-active {
  opacity: 1;
  transform: translateX(0);
}

/* Chart loading animation */
.chart-loading {
  position: relative;
}

.chart-loading::before {
  content: '';
  position: absolute;
  top: 50%;
  left: 50%;
  width: 32px;
  height: 32px;
  border: 3px solid var(--light-gray);
  border-top: 3px solid var(--primary-blue);
  border-radius: 50%;
  animation: spin 1s linear infinite;
  transform: translate(-50%, -50%);
}

@keyframes spin {
  0% { transform: translate(-50%, -50%) rotate(0deg); }
  100% { transform: translate(-50%, -50%) rotate(360deg); }
}
```

### Hover Effects
```css
/* Interactive hover states */
.kpi-card:hover {
  transform: translateY(-4px);
  box-shadow: 0 8px 25px rgba(31, 71, 136, 0.15);
  transition: all 0.2s ease;
}

.chart-point:hover {
  r: 6;
  transition: r 0.2s ease;
}

.filter-button:hover {
  background: var(--primary-blue);
  color: white;
  transform: scale(1.05);
  transition: all 0.2s ease;
}
```

## Error Handling and Loading States

### Loading State Components
```javascript
// Skeleton loading for charts
function showChartSkeleton(container) {
  container.innerHTML = `
    <div class="skeleton-chart">
      <div class="skeleton-title"></div>
      <div class="skeleton-bars">
        <div class="skeleton-bar" style="height: 60%"></div>
        <div class="skeleton-bar" style="height: 80%"></div>
        <div class="skeleton-bar" style="height: 45%"></div>
        <div class="skeleton-bar" style="height: 90%"></div>
        <div class="skeleton-bar" style="height: 70%"></div>
      </div>
    </div>
  `;
}

// Loading states for different components
const loadingStates = {
  kpiCards: () => showKPISkeletons(),
  charts: (container) => showChartSkeleton(container),
  search: () => showSearchSpinner(),
  modal: () => showModalSpinner()
};
```

### Error States
```javascript
// Error handling for different scenarios
function handleError(type, error) {
  const errorMessages = {
    'data-load': 'Unable to load data. Please try again.',
    'chart-render': 'Chart could not be displayed.',
    'search': 'Search temporarily unavailable.',
    'filter': 'Filter could not be applied.'
  };
  
  showErrorToast(errorMessages[type] || 'An error occurred.');
  
  // Log error for debugging
  console.error(`${type} error:`, error);
}
```

## Browser Compatibility and Progressive Enhancement

### Feature Detection
```javascript
// Progressive enhancement strategy
const features = {
  localStorage: typeof Storage !== "undefined",
  intersectionObserver: 'IntersectionObserver' in window,
  cssGrid: CSS.supports('display', 'grid'),
  webGL: !!document.createElement('canvas').getContext('webgl')
};

// Fallback implementations
if (!features.localStorage) {
  // Use session-only state management
  window.mockStorage = {
    data: {},
    setItem: function(key, value) { this.data[key] = value; },
    getItem: function(key) { return this.data[key]; }
  };
}

if (!features.cssGrid) {
  // Fallback to flexbox layout
  document.documentElement.classList.add('no-grid');
}
```

### Performance Monitoring
```javascript
// Performance tracking for mockup
class PerformanceMonitor {
  static trackPageLoad(pageName) {
    const loadTime = performance.now();
    console.log(`${pageName} loaded in ${loadTime.toFixed(2)}ms`);
    
    // Check against targets
    const targets = { home: 2500, domain: 3500 };
    if (loadTime > targets[pageName]) {
      console.warn(`${pageName} load time exceeded target`);
    }
  }
  
  static trackChartRender(chartType) {
    const startTime = performance.mark('chart-start');
    // ... chart rendering logic
    const endTime = performance.mark('chart-end');
    const renderTime = performance.measure('chart-render', 'chart-start', 'chart-end');
    
    console.log(`${chartType} rendered in ${renderTime.duration.toFixed(2)}ms`);
  }
}
```