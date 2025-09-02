# Consulting Analytics Dashboard - GUI Mockup

A comprehensive clickable HTML mockup of a consulting analytics dashboard featuring domain-specific views for Financial Performance, Delivery & Operations, People & Talent, Client Success, and Strategic/Board metrics.

## 🚀 Quick Start

### Option 1: Local File
1. Open `index.html` directly in your web browser

### Option 2: HTTP Server (Recommended)
1. Start a local server:
   ```bash
   cd /path/to/project
   python3 -m http.server 8080
   ```
2. Open http://localhost:8080 in your browser

## 📋 Features

### 🏠 Home Dashboard
- Overview tiles for each domain with key metrics
- Hero section with company-wide KPIs
- Click tiles to navigate to domain-specific dashboards

### 📊 Domain Dashboards
Each domain includes:
- **KPI Header**: 5 key performance indicators with trends
- **Forecast Lane**: Interactive charts with confidence bands
- **Filter Controls**: Time range, business unit, country filters
- **Interactive Charts**: Clickable data points with drill-down

#### Domains:
1. **Financial Performance** - Revenue, margins, billing rates, pipeline
2. **Delivery & Operations** - Utilization, bench, project delivery
3. **People & Talent** - Headcount, attrition, skills, training
4. **Client Success** - NPS, retention, deal size, concentration
5. **Strategic / Board** - EBITDA, innovation, digital transformation

### 🔍 Search Interface
- Global search across KPIs, dashboards, projects, clients, people, documents
- Categorized results with highlighting
- Real-time search with debouncing

### 🤖 Ask AI Interface
- Natural language queries about business data
- Example questions provided
- Mock AI responses with:
  - Key insights and bullet points
  - Links to related visualizations
  - Reproducible data queries

## 🎮 Interactions

### Navigation
- **Home**: Click domain tiles to navigate
- **Sidebar**: Always visible navigation menu
- **Breadcrumbs**: Track current location

### Filters
- **Time Range**: 3M, 6M, 12M options
- **Business Unit**: All, Solutions, Experience, Insight, Connectivity
- **Country**: All, Sweden, Norway, Denmark, Finland
- **Horizon**: Toggle forecast periods

### Charts
- **Click Data Points**: Trigger filtering and drill-down
- **Hover**: View detailed tooltips
- **Export**: Chart export functionality (demo)

### KPI Cards
- **Click**: Apply KPI-specific filters to charts
- **Trend Lines**: Sparkline visualizations
- **Change Indicators**: Color-coded performance changes

## ⌨️ Keyboard Shortcuts

| Shortcut | Action |
|----------|--------|
| `/` | Focus global search |
| `Ctrl+K` | Open search page |
| `Alt+H` | Go to home |
| `Alt+1-5` | Navigate to domains (Financial, Delivery, People, Client, Strategic) |
| `Esc` | Close modals |

## 🎨 Design System

### Colors
- **Primary Blue**: `#1f4788` - Main brand color
- **Secondary Blue**: `#4a90a4` - Supporting actions
- **Accent Orange**: `#ff6b35` - Highlights and CTAs
- **Success Green**: `#28a745` - Positive indicators
- **Warning Amber**: `#ffc107` - Attention items
- **Danger Red**: `#dc3545` - Negative indicators

### Typography
- **Font Family**: Inter (Google Fonts)
- **Scale**: 12px to 48px with consistent ratios
- **Weights**: 300, 400, 500, 600, 700

### Layout
- **Grid System**: 12-column responsive grid
- **Breakpoints**: Mobile-first (320px, 480px, 768px, 1024px, 1440px+)
- **Spacing**: 4px base unit with 8-point scale

## 📱 Responsive Design

### Mobile (< 768px)
- Collapsed sidebar navigation
- Stacked domain tiles
- Single-column KPI cards
- Touch-optimized interactions

### Tablet (768px - 1024px)
- Condensed sidebar
- 2-column layouts
- Horizontal scrolling for charts

### Desktop (1024px+)
- Full sidebar with labels
- Multi-column layouts
- Hover interactions
- Keyboard shortcuts

## ♿ Accessibility Features

### WCAG 2.1 AA Compliance
- **Color Contrast**: 4.5:1 minimum ratios
- **Keyboard Navigation**: Full keyboard accessibility
- **Screen Readers**: ARIA labels and live regions
- **Focus Management**: Visible focus indicators
- **Skip Links**: Navigation shortcuts

### Features
- Screen reader announcements for dynamic content
- High contrast mode support
- Reduced motion support
- Tab order management
- Error messaging with text + icons

## 🔧 Technical Implementation

### Frontend Stack
- **HTML5/CSS3/JavaScript**: Core technologies
- **Chart.js**: Interactive data visualizations
- **Font Awesome**: Icon library
- **Google Fonts**: Typography (Inter)

### Architecture
- **Component-based**: Reusable UI components
- **Responsive Grid**: CSS Grid and Flexbox
- **State Management**: Local storage and session state
- **Mock API**: Simulated data service with realistic delays

### Performance
- **Loading States**: Visual feedback during operations
- **Debounced Search**: Optimized search performance
- **Chart Virtualization**: Efficient rendering for large datasets
- **Lazy Loading**: On-demand resource loading

## 📊 Mock Data

### Realistic Business Metrics
- **Financial**: Revenue €2.4M (+12.3%), Margin 34.5% (-2.1%)
- **Delivery**: Utilization 82% (+3.1%), Bench 12% (-1.8%)
- **People**: Headcount 235 (+8.5%), Attrition 8.5% (-1.2%)
- **Client**: NPS 8.2 (+0.8), Repeat Business 68% (+5.2%)
- **Strategic**: EBITDA 18.2% (+1.8%), Digital Projects 35% (+8.1%)

### Dynamic Content
- **Time-based Updates**: Data freshness indicators
- **Trend Analysis**: 7-point trend lines for KPIs
- **Forecast Data**: 12-month projections with confidence bands
- **Search Results**: Categorized business entities

## 🧪 Demo Scenarios

### Financial Analysis
1. Navigate to Financial Performance
2. Click "Revenue (YTD)" KPI card
3. Observe chart filtering and explanation
4. Change time range filter to see data updates
5. Click "Explain Variance" for detailed analysis

### Resource Planning
1. Go to Delivery & Operations
2. Adjust country filter to "Sweden"
3. View utilization changes
4. Click chart data points for drill-down

### AI-Powered Insights
1. Navigate to Ask AI page
2. Try example: "Why did margin drop last month?"
3. Review AI analysis with linked visuals
4. Explore suggested related charts

### Search and Discovery
1. Use global search: "utilization"
2. View categorized results
3. Click search results for navigation
4. Try advanced filters

## 🎯 Use Cases

### Executive Reviews
- Strategic dashboard for board presentations
- High-level KPI overview with drill-down capability
- Scenario planning with forecast analysis

### Operational Management
- Resource allocation and utilization tracking
- Project delivery monitoring
- Performance variance analysis

### Client Relationship Management
- NPS tracking and churn risk identification
- Revenue concentration analysis
- Relationship health monitoring

### Talent Management
- Headcount planning and skills gap analysis
- Attrition forecasting and retention strategies
- Performance tracking and development planning

## 📈 Future Enhancements

### Planned Features
- **Real-time Updates**: WebSocket integration for live data
- **Advanced Filters**: Custom date ranges and complex queries
- **Export Options**: PDF reports and scheduled snapshots
- **Mobile App**: Native iOS/Android companion
- **What-if Analysis**: Interactive scenario modeling

### Integration Points
- **Data Sources**: ERP, CRM, HRIS, Project Management systems
- **Authentication**: SSO and role-based access control
- **Analytics**: User behavior tracking and optimization
- **Notifications**: Alert system for threshold breaches

## 🛠️ Development

### File Structure
```
├── index.html              # Main entry point
├── css/
│   ├── main.css            # Core styles and design system
│   ├── components.css      # UI component styles
│   ├── layout.css          # Grid system and layouts
│   └── responsive.css      # Media queries and responsive design
├── js/
│   ├── app.js              # Main application controller
│   ├── navigation.js       # Routing and page management
│   ├── data.js             # Mock data service
│   ├── charts.js           # Chart rendering and interactions
│   └── interactions.js     # User interaction handlers
└── README.md               # This file
```

### Browser Support
- **Modern Browsers**: Chrome 88+, Firefox 85+, Safari 14+, Edge 88+
- **Mobile Browsers**: iOS Safari 14+, Android Chrome 88+
- **Features**: ES6+, CSS Grid, Flexbox, Custom Properties

---

**Note**: This is a mockup for demonstration purposes. All data is simulated and not connected to real business systems.