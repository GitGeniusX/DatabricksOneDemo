1) Product overview

Name: Knowit Performance Hub
Purpose: One place to search, monitor, and forecast the firm’s Financials, Delivery, People, and Client Success.
Primary users: CIO (you), BU leaders, Delivery managers, Finance controllers, HR/Talent leads, Account directors.

Top outcomes

1-click view of current health (KPIs) and the next 6–12 weeks (forecasts).

Self-serve drilldowns to project/client/consultant without leaving the hub.

Natural-language “Ask” to explain drivers and generate actions.

2) Information architecture

Home (as in the provided design)

Global search box with Search (keyword) and Ask (NLQ) toggles.

Four hero tiles (cards) visible by default; scrollable:

Financial Performance

Delivery & Operations

People & Talent

Client Success

Optional tiles: Strategic/Board, Sales Pipeline Analytics.

Chip navigation (bottom of hero, copied from screenshot):

For you (personalized KPIs), Genie Spaces (saved NLQ boards), Domains, Dashboards, Apps.

Second level (Domain pages)

Each domain opens a dashboard with: Global filters (Time, BU, Service Line, Country, Client), KPI header, Forecast lane, Detailed visuals, and a “Driver analysis” panel.

Third level (Detail pages)

Drilldown pages for Project, Client, Consultant, Opportunity.

3) Visual language & layout

Aesthetic (mirror your image):

Light gradient background, subtle shadowed cards, rounded corners (16–24px), generous white space.

Typography: Large friendly headline (e.g., “Hi, Johan”), medium-weight labels, numeric emphasis on KPIs.

Iconography: Simple duotone glyphs per domain (Finance, People, Delivery, Clients).

Grid & spacing

12-column grid, 24px gutters. Card padding 20–24px. KPI tiles 1x1; large charts 2x2 or 3x2.

States

Loading: shimmering card skeletons.

Empty: friendly illustration + “Connect data/Change filter”.

Error: inline alert with retry and diagnostics link.

Theme

Default light; dark mode follows same hierarchy and contrast rules (AA compliant).

4) Home screen spec (pixel/behavioral)

Header

Logo (left), user menu (right).

No global nav bar to keep the clean hero focus (as in screenshot).

Hero

Greeting: “Hi, Johan. What would you like to know?”

Search field (full width, pill):

Left chip: Search (icon: magnifier)

Left chip: Ask (icon: chat bubble)

Right: submit arrow button.

Keyboard: ⏎ triggers last-used mode; / focuses input.

Featured tiles (cards)

Financial Performance (domain)

Delivery & Operations (domain)

People & Talent (domain)

Client Success (domain)

Optional: Sales Pipeline Analytics (as in your screenshot).

Each card: title, domain label, small icon, hover state, click opens domain page.

Chip row

For you | Genie Spaces | Domains | Dashboards | Apps (exact wording retained for familiarity).

5) Domain dashboard specs (KPIs → charts → interactions)
5.1 Financial Performance

KPI header (5 cards)

Revenue (MTD, QTD, YTD) vs plan

Gross Margin % and € by service line

Revenue per Consultant (Billable FTE)

Average Billing Rate

Pipeline Coverage (next 90 days)

Forecast lane

Revenue Forecast vs Actuals (line with 80% confidence band; toggle horizon 3/6/12 months)

Rolling 12-Month Growth (column + line trend)

Profitability by Service Line (waterfall per month)

Interactions

Click a point/bar → filter downstream tiles.

Segment toggles: BU, Country, Service Line, Client tier.

“Explain variance” button opens right-side panel with drivers (rate, utilization, mix).

5.2 Delivery & Operations

KPIs

Billable Utilization % (overall + by BU)

Bench % (and count)

Project Overrun Rate

On-Time Delivery %

Visuals

Utilization Heatmap (Teams × Weeks, forecast overlay)

Bench Forecast (line 12 weeks)

Resource Allocation (stacked area by BU)

On-Time Delivery Trend (line)

Interactions

Click a cell (team/week) → staffing suggestions (skill fit, available people).

Overrun rate bar → list projects in risk with owner and ETA.

5.3 People & Talent

KPIs

Headcount (Billable/Non-billable)

Attrition % (voluntary vs involuntary)

Time to Staff (median)

Training Hours / Consultant

Visuals

Headcount Forecast vs Demand (line with target)

Attrition Forecast (seasonality aware)

Skills Coverage (Needed vs Available matrix with gaps highlighted)

Internal Mobility (stacked bar)

Interactions

Click a gap → recommended hiring/upskilling cohorts.

5.4 Client Success

KPIs

NPS

Repeat Business %

Client Concentration (Top-5 %)

Average Deal Size

Visuals

Retention & Churn Forecast (line with churn probabilities)

Revenue by Client Cohort (cohort chart)

Client Mix Treemap (dependency risk)

NPS vs Revenue Growth (dual-axis)

Interactions

Click a client → client detail (NPS history, projects, revenue, CS notes).

5.5 Strategic/Board

KPIs

EBITDA %

Innovation Revenue Share

Digital/Cloud Project Share

Visuals

Scenario Forecasts (best/base/worst revenue & utilization)

Service Mix Evolution (area)

Balanced Scorecard Heatmap (Financial, People, Client, Internal)

6) Detail pages

Project detail

Budget vs Actual, Margin, Schedule health, Risks, Burn, Staffing plan.

Forecast to Complete (S-curve), Change orders list.

Client detail

Revenue trend, NPS, open opportunities, concentration risk, renewal dates.

Consultant detail

Utilization history, skills, certifications, bench periods, staffing suggestions.

7) Search & “Ask” behavior

Search (keyword)

Results grouped: KPIs • Dashboards • Projects • Clients • People • Docs.

Filters: domain, date, BU.

Ask (NLQ/GenAI)

Examples:

“Why did margin drop last month in Cloud BU?”

“Forecast bench in Sweden for 8 weeks and propose redeployments.”

“Which clients are at churn risk next quarter?”

Output panel shows:

Answer summary (bullet points)

Linked visuals that were used

Reproducible query (for auditing)

8) Data & metric definitions (succinct)

Core entities: Consultant, Team, Skill, Project, Time entry, Rate card, Invoice, Opportunity, Client, NPS Survey.

Key formulas

Billable Utilization % = Billable hours / Available hours.

Revenue per Consultant = Billings / Billable FTE.

Gross Margin % = (Revenue – Delivery cost) / Revenue.

Bench % = Unassigned billable capacity / Total billable capacity.

Pipeline Coverage = Next-90-day pipeline value / Next-90-day revenue plan.

9) Forecasting specification

Horizon options: 3 / 6 / 12 months (weekly granularity for Delivery; monthly for Finance).

Methods: automatic model selection among ETS/Prophet/ARIMA with holiday/seasonality; cross-validated.

Confidence: default 80% band; toggle 50/95%.

Guardrails: cap projections by capacity constraints; rate cards locked by contract periods.

10) Security & governance

Row-level security by BU, Country, Client; role-based access (Admin, Leader, Manager, Analyst, Viewer).

PII minimized; skill tags OK, no salary on shared dashboards.

All NL answers show data scope (“answered within: Nordic • Cloud BU • 2024–2026”).

11) Accessibility

WCAG 2.1 AA: color contrast, keyboard navigation, skip links.

Chart annotations readable by screen readers (aria-labels for series/points).

Focus indicators and error messaging with text + icon.

12) Telemetry & quality

Instrument: query latency, chart load time, most-used filters, failed NLQ intents.

Feedback widget on every page (“Was this helpful?” + free text).

Data freshness badge (e.g., “Updated 2h ago”).

13) Non-functional requirements

TTI < 2.5s on home, < 3.5s on domain pages (p95).

Charts virtualized for >10k points; server-side aggregation.

Export: PNG, CSV, and Scheduled email/PDF snapshots.

Internationalization: SEK/NOK/DKK/EUR currency switch; week numbers iso-8601.

14) Acceptance criteria (UAT)

Home renders hero + four domain tiles identical to the provided design language.

Each domain shows KPI header, forecast lane, and at least 3 drillable visuals.

Global filters persist across domains until cleared.

“Search” returns entities; “Ask” returns an explanation plus linked visuals.

Forecasts show bands and allow 3/6/12-month horizons.

Clicking any KPI filters all charts on the page within 300ms.

Row-level security prevents cross-BU leakage in drilldowns.