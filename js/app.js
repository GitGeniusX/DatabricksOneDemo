/* ---------- Utilities & data ---------- */
function rand(seed){ let x = Math.sin(seed)*10000; return x - Math.floor(x); }
function formatPct(n){return (n>=0?'+':'') + (n*100).toFixed(1)+'%';}
function fmtCurrency(n){return '€' + (n/1e6).toFixed(1) + 'M';}

function series(n, base, vol, trend=0, seed=1){
  const a=[]; let v=base;
  for(let i=0;i<n;i++){
    v += (rand(seed+i)-0.5)*vol + trend;
    a.push(Math.max(0, v));
  }
  return a;
}
function band(s, width){ return s.map(v => [Math.max(0, v*(1-width)), v*(1+width)]); }

/* ---------- Canvas mini-chart engine ---------- */
function drawGrid(ctx, pad, innerW, innerH){
  ctx.strokeStyle = '#eceaf6'; ctx.lineWidth = 1;
  for(let i=0;i<=4;i++){
    const y = pad + i*(innerH/4);
    ctx.beginPath(); ctx.moveTo(pad,y); ctx.lineTo(pad+innerW,y); ctx.stroke();
  }
}

// Enhanced area chart function
function drawAreaChart(ctx, data, options={}){
  const {w=ctx.canvas.width, h=ctx.canvas.height, yMax, yMin=0, color='#6b5b95', fillColor='rgba(107,91,149,0.3)'} = options;
  ctx.clearRect(0,0,w,h);
  const pad = 8;
  const innerW = w - pad*2, innerH = h - pad*2;
  const n = data.length;
  const ymax = yMax ?? Math.max(...data)*1.2;
  const ymin = yMin;
  const sx = innerW/(n-1), sy = innerH/(ymax-ymin);
  
  // Create path for area fill
  ctx.fillStyle = fillColor;
  ctx.beginPath();
  ctx.moveTo(pad, pad + innerH); // Start at bottom left
  for(let i=0; i<n; i++){
    const x = pad + i*sx;
    const y = pad + innerH - (data[i]-ymin)*sy;
    ctx.lineTo(x, y);
  }
  ctx.lineTo(pad + (n-1)*sx, pad + innerH); // End at bottom right
  ctx.closePath();
  ctx.fill();
  
  // Draw line on top
  ctx.strokeStyle = color; ctx.lineWidth = 2;
  ctx.beginPath();
  for(let i=0; i<n; i++){
    const x = pad + i*sx;
    const y = pad + innerH - (data[i]-ymin)*sy;
    if(i===0) ctx.moveTo(x,y); else ctx.lineTo(x,y);
  }
  ctx.stroke();
}

// Mini bar chart function
function drawMiniBarChart(ctx, data, options={}){
  const {w=ctx.canvas.width, h=ctx.canvas.height, horizontal=false, colors=['#6b5b95']} = options;
  ctx.clearRect(0,0,w,h);
  const pad = 4;
  const innerW = w - pad*2, innerH = h - pad*2;
  const max = Math.max(...data);
  
  if(horizontal){
    const barHeight = innerH / data.length;
    data.forEach((val, i) => {
      const barWidth = (val/max) * innerW;
      const y = pad + i * barHeight;
      ctx.fillStyle = colors[i % colors.length];
      ctx.fillRect(pad, y + 2, barWidth, barHeight - 4);
    });
  } else {
    const barWidth = innerW / data.length;
    data.forEach((val, i) => {
      const barHeight = (val/max) * innerH;
      const x = pad + i * barWidth;
      ctx.fillStyle = colors[i % colors.length];
      ctx.fillRect(x + 2, pad + innerH - barHeight, barWidth - 4, barHeight);
    });
  }
}

// Mini doughnut chart function
function drawMiniDoughnut(ctx, data, options={}){
  const {w=ctx.canvas.width, h=ctx.canvas.height, colors=['#6b5b95']} = options;
  ctx.clearRect(0,0,w,h);
  const centerX = w/2, centerY = h/2;
  const outerRadius = Math.min(w,h)/2 - 4;
  const innerRadius = outerRadius * 0.6;
  const total = data.reduce((a,b)=>a+b,0);
  
  let startAngle = -Math.PI/2;
  data.forEach((val, i) => {
    const sliceAngle = (val/total) * 2 * Math.PI;
    ctx.fillStyle = colors[i % colors.length];
    ctx.beginPath();
    ctx.arc(centerX, centerY, outerRadius, startAngle, startAngle + sliceAngle);
    ctx.arc(centerX, centerY, innerRadius, startAngle + sliceAngle, startAngle, true);
    ctx.closePath();
    ctx.fill();
    startAngle += sliceAngle;
  });
}

// Mini scatter plot function
function drawMiniScatter(ctx, data, options={}){
  const {w=ctx.canvas.width, h=ctx.canvas.height, color='#6b5b95'} = options;
  ctx.clearRect(0,0,w,h);
  const pad = 8;
  const innerW = w - pad*2, innerH = h - pad*2;
  
  const xValues = data.map(d => d.x);
  const yValues = data.map(d => d.y);
  const xMin = Math.min(...xValues), xMax = Math.max(...xValues);
  const yMin = Math.min(...yValues), yMax = Math.max(...yValues);
  
  ctx.fillStyle = color;
  data.forEach(point => {
    const x = pad + ((point.x - xMin) / (xMax - xMin)) * innerW;
    const y = pad + innerH - ((point.y - yMin) / (yMax - yMin)) * innerH;
    ctx.beginPath();
    ctx.arc(x, y, 3, 0, 2 * Math.PI);
    ctx.fill();
  });
}

function drawLineChart(ctx, data, options={}){
  const {w=ctx.canvas.width, h=ctx.canvas.height, yMax, yMin=0, bandData, grid=true, clear=true, color='#6b5b95', dash=[]} = options;
  if (clear) ctx.clearRect(0,0,w,h);
  const pad = 28;
  const innerW = w - pad*2, innerH = h - pad*2;
  const n = data.length;
  const ymax = yMax ?? Math.max(...data)*1.2;
  const ymin = yMin;
  const sx = innerW/(n-1), sy = innerH/(ymax-ymin);
  if (grid && clear) drawGrid(ctx, pad, innerW, innerH);
  // band (only when clear)
  if (bandData && clear){
    ctx.fillStyle = 'rgba(140,120,210,0.18)';
    ctx.beginPath();
    bandData.forEach((b,i)=>{
      const x = pad + i*sx;
      const yLower = pad + innerH - (b[0]-ymin)*sy;
      if(i===0) ctx.moveTo(x, yLower);
      else ctx.lineTo(x, yLower);
    });
    for(let i=bandData.length-1;i>=0;i--){
      const x = pad + i*sx;
      const yUpper = pad + innerH - (bandData[i][1]-ymin)*sy;
      ctx.lineTo(x, yUpper);
    }
    ctx.closePath(); ctx.fill();
  }
  // line
  ctx.strokeStyle = color; ctx.lineWidth = 2; ctx.setLineDash(dash);
  ctx.beginPath();
  data.forEach((v,i)=>{
    const x = pad + i*sx;
    const y = pad + innerH - (v - ymin)*sy;
    if(i===0) ctx.moveTo(x,y); else ctx.lineTo(x,y);
  });
  ctx.stroke(); ctx.setLineDash([]);
}

function drawBars(ctx, data, options={}){
  const {w=ctx.canvas.width, h=ctx.canvas.height, yMax, yMin=0, color='#b492f0'} = options;
  ctx.clearRect(0,0,w,h);
  const pad=28, innerW=w-pad*2, innerH=h-pad*2;
  const ymax = yMax ?? Math.max(...data)*1.2;
  const ymin = yMin;
  const n = data.length;
  const bw = innerW/n * 0.7;
  drawGrid(ctx, pad, innerW, innerH);
  ctx.fillStyle = color;
  data.forEach((v,i)=>{
    const x = pad + i*(innerW/n) + (innerW/n - bw)/2;
    const y = pad + innerH - (v - ymin) * (innerH / (ymax-ymin));
    const hgt = pad + innerH - y;
    ctx.fillRect(x, y, bw, hgt);
  });
}

function drawArea(ctx, data, options={}){
  const {w=ctx.canvas.width, h=ctx.canvas.height, yMax, yMin=0, colorFill='rgba(180,146,240,0.35)', colorLine='#6b5b95'} = options;
  ctx.clearRect(0,0,w,h);
  const pad=28, innerW=w-pad*2, innerH=h-pad*2;
  const ymax = yMax ?? Math.max(...data)*1.2;
  const ymin = yMin;
  const n = data.length;
  const sx = innerW/(n-1), sy = innerH/(ymax-ymin);
  drawGrid(ctx, pad, innerW, innerH);
  ctx.fillStyle = colorFill;
  ctx.beginPath();
  for(let i=0;i<n;i++){
    const v = data[i];
    const x = pad + i*sx;
    const y = pad + innerH - (v - ymin)*sy;
    if(i===0) ctx.moveTo(x, pad+innerH);
    ctx.lineTo(x,y);
  }
  ctx.lineTo(pad+innerW, pad+innerH); ctx.closePath(); ctx.fill();
  ctx.strokeStyle=colorLine; ctx.lineWidth=1.5;
  ctx.beginPath();
  for(let i=0;i<n;i++){
    const v = data[i];
    const x = pad + i*sx; const y = pad + innerH - (v - ymin)* sy;
    if(i===0) ctx.moveTo(x,y); else ctx.lineTo(x,y);
  }
  ctx.stroke();
}

function drawHeatmap(ctx, grid, options={}){
  const {w=ctx.canvas.width, h=ctx.canvas.height, min=0, max=100} = options;
  ctx.clearRect(0,0,w,h);
  const rows = grid.length, cols = grid[0].length;
  const pad=28, innerW=w-pad*2, innerH=h-pad*2;
  const cw = innerW/cols, ch = innerH/rows;
  // draw cells
  for(let r=0;r<rows;r++){
    for(let c=0;c<cols;c++){
      const v = grid[r][c];
      const t = (v-min)/(max-min);
      const col = `rgba(107,91,149,${0.08 + t*0.6})`;
      ctx.fillStyle = col;
      ctx.fillRect(pad + c*cw, pad + r*ch, cw-1, ch-1);
      // value
      ctx.fillStyle = '#4b4f74';
      ctx.font='10px system-ui';
      ctx.globalAlpha=0.7;
      ctx.fillText(Math.round(v)+'%', pad + c*cw + 4, pad + r*ch + 12);
      ctx.globalAlpha=1;
    }
  }
  // outer grid
  ctx.strokeStyle='#eceaf6'; ctx.lineWidth=1;
  for(let i=0;i<=rows;i++){
    const y = pad + i*ch; ctx.beginPath(); ctx.moveTo(pad, y); ctx.lineTo(pad+innerW, y); ctx.stroke();
  }
  for(let j=0;j<=cols;j++){
    const x = pad + j*cw; ctx.beginPath(); ctx.moveTo(x, pad); ctx.lineTo(x, pad+innerH); ctx.stroke();
  }
}

function drawGroupedBars(ctx, seriesList, options={}){
  const {labels=Array.from({length:seriesList[0].length}, (_,i)=>i+1), colors=['#6b5b95','#88a1ff'], yMin=0, yMax} = options;
  const w=ctx.canvas.width, h=ctx.canvas.height;
  ctx.clearRect(0,0,w,h);
  const pad=28, innerW=w-pad*2, innerH=h-pad*2;
  const ymax = yMax ?? Math.max(...seriesList.flat())*1.2;
  const groupCount = labels.length;
  const groupW = innerW/groupCount;
  const barW = groupW/(seriesList.length+1);
  drawGrid(ctx, pad, innerW, innerH);
  seriesList.forEach((series, si)=>{
    ctx.fillStyle = colors[si%colors.length];
    series.forEach((v, i)=>{
      const x = pad + i*groupW + (si+0.2)*barW;
      const y = pad + innerH - (v-yMin)*(innerH/(ymax-yMin));
      const hgt = pad + innerH - y;
      ctx.fillRect(x,y,barW*0.8,hgt);
    });
  });
}

/* ---------- App state ---------- */
const App = {
  mode: 'ask', // default to Ask AI as per spec
  page: 'home',
  data: {
    finance(h=3){
      return {
        kpis: [
          {name:'Revenue (YTD)', val: fmtCurrency(92e6), delta:'+6.2% vs plan'},
          {name:'Gross Margin %', val:'31.4%', delta:'+1.2pp'},
          {name:'Revenue / Consultant', val:'€198k', delta:'+3.1%'},
          {name:'Average Billing Rate', val:'€118/h', delta:'+1.5%'},
          {name:'Pipeline Coverage (90d)', val:'1.3×', delta:'-0.1×'}
        ],
        revActual: series(12, 18, 3, 0.4, 7),
        revForecast: series(h, 25, 2, 0.6, 8),
        revBand: band(series(h, 25, 2, 0.6, 8), 0.15),
        margin: [28,30,31,29,33,32,30,31,32,33,35,34],
        growth: [3,4,5,6,4,3,5,7,6,8,7,6],
        rate: [110,112,111,113,115,116,118,119,120,118,119,121]
      }
    },
    delivery(weeks=6){
      const utilGrid = Array.from({length:3}, (_,r)=>Array.from({length:weeks}, (_,c)=> 70 + Math.round( (rand(r*10+c)*30-10) )));
      return {
        kpis: [
          {name:'Utilization', val:'78.4%', delta:'+2.3pp'},
          {name:'Bench %', val:'6.8%', delta:'-0.9pp'},
          {name:'Overrun Rate', val:'12.5%', delta:'-1.2pp'},
          {name:'On-Time Delivery', val:'92.0%', delta:'+0.8pp'},
          {name:'Avg Project Duration', val:'14.2w', delta:'-0.4w'},
        ],
        heat: utilGrid,
        bench: series(weeks, 8, 1.2, -0.05, 21).map(v=>Math.max(2, 12 - v)), // pseudo decreasing
        alloc: series(weeks, 100, 20, 2, 13),
        otd: series(weeks, 89, 2, 0.3, 17)
      }
    },
    people(h=6){
      return {
        kpis: [
          {name:'Headcount', val:'3,980', delta:'+25 MoM'},
          {name:'Attrition', val:'12.2%', delta:'-0.4pp'},
          {name:'Time to Staff', val:'6.1d', delta:'-0.3d'},
          {name:'Training Hours / FTE', val:'3.8h', delta:'+0.5h'},
          {name:'Certification Rate', val:'41%', delta:'+2pp'},
        ],
        hc: series(h, 3800, 25, 10, 31),
        demand: series(h, 3850, 25, 8, 32),
        attr: series(h, 10, 1.5, -0.05, 33),
        skillNeed: [100,120,140,100,90,80,130,110],
        skillHave: [95,110,120,92,88,85,120,108],
        mobility: [20,24,22,28,32,30,34,38,36,40,42,45]
      }
    },
    clients(h=6){
      return {
        kpis: [
          {name:'NPS', val:'55', delta:'+3'},
          {name:'Repeat Business', val:'68%', delta:'+1pp'},
          {name:'Top-5 Concentration', val:'41%', delta:'-2pp'},
          {name:'Avg Deal Size', val:'€186k', delta:'+4.4%'},
          {name:'Churn Probability', val:'6.1%', delta:'-0.6pp'},
        ],
        retention: series(h, 94, 2, -0.2, 41),
        churn: series(h, 7, 1.2, -0.05, 42),
        cohort: series(12, 2.5, 0.8, 0.2, 43),
        mix: Array.from({length:10},()=> Math.max(0.05, rand(Math.random())) ),
        nps: series(12, 50, 8, 0.2, 44),
        revGrowth: series(12, 0, 2, 0.5, 45)
      }
    }
  }
};

// Initialize navigation when DOM is loaded
window.addEventListener('DOMContentLoaded', function() {
  console.log('Knowit Performance Hub - Sprint 0 Canvas');
  
  // Set initial mode to "Ask AI"
  App.mode = 'ask';
  const askBtn = document.getElementById('mode-ask');
  const searchBtn = document.getElementById('mode-search');
  if (askBtn && searchBtn) {
    askBtn.classList.add('active');
    searchBtn.classList.remove('active');
  }
  
  // Initialize theme and logo handling
  initializeThemeAndLogo();
  
  // Initialize new navigation system
  if (typeof NavigationManager !== 'undefined') {
    window.nav = new NavigationManager();
    nav.init();
    nav.loadInitialPage();
  } else {
    // Fallback to old system
    if (typeof showPage === 'function') {
      showPage('home');
    }
    
    // Set up all event listeners
    setupEventListeners();
    
    // Render mini charts on home page
    renderHomeMinis();
  }
});

/* ---------- Theme and Logo Management ---------- */
function initializeThemeAndLogo() {
  // Force light theme as per specifications
  document.body.setAttribute('data-theme', 'light');
  
  // Update logo based on theme
  updateLogoForTheme('light');
  
  // Listen for system theme changes (optional future feature)
  if (window.matchMedia) {
    const mediaQuery = window.matchMedia('(prefers-color-scheme: dark)');
    mediaQuery.addListener(handleThemeChange);
  }
}

function updateLogoForTheme(theme) {
  const logoImg = document.querySelector('.brand .logo');
  if (logoImg) {
    if (theme === 'dark') {
      logoImg.src = 'assets/icons/Logotype-Knowit-Digital-White.svg';
    } else {
      logoImg.src = 'assets/icons/Logotype-Knowit-Digital-Black.svg';
    }
  }
}

function handleThemeChange(e) {
  // Currently forcing light theme, but this could be used for future dark mode support
  // if (e.matches) {
  //   updateLogoForTheme('dark');
  // } else {
  //   updateLogoForTheme('light');
  // }
  
  // Force light theme as per current specifications
  updateLogoForTheme('light');
}

/* ---------- Navigation ---------- */
function setupEventListeners() {
  const home = document.getElementById('home');
  
  // Card click navigation
  document.querySelectorAll('.card').forEach(card=>{
    card.addEventListener('click', ()=>{
      showPage(card.dataset.page);
    });
  });
  
  // Back button navigation
  document.querySelectorAll('[data-back]').forEach(b=>b.addEventListener('click', ()=>showPage('home')));
  
  // Search & Ask mode toggle
  const modeSearch = document.getElementById('mode-search');
  const modeAsk = document.getElementById('mode-ask');
  if (modeSearch && modeAsk) {
    modeSearch.addEventListener('click', ()=>{App.mode='search'; modeSearch.classList.add('active'); modeAsk.classList.remove('active');});
    modeAsk.addEventListener('click', ()=>{App.mode='ask'; modeAsk.classList.add('active'); modeSearch.classList.remove('active');});
  }
  
  // Search functionality
  const goButton = document.getElementById('goButton');
  const searchInput = document.getElementById('searchInput');
  if (goButton) goButton.addEventListener('click', runQuery);
  if (searchInput) searchInput.addEventListener('keydown', (e)=>{ if(e.key==='Enter') runQuery(); });
  
  // Panel close
  const panelClose = document.getElementById('panel-close');
  if (panelClose) panelClose.addEventListener('click', ()=>document.getElementById('panel').classList.remove('open'));
  
  // Finance horizon buttons
  document.querySelectorAll('#fin-horizon button').forEach(b=> b.addEventListener('click', ()=>{ 
    document.querySelectorAll('#fin-horizon button').forEach(x=>x.classList.remove('active')); 
    b.classList.add('active'); 
    if (App.page === 'finance') renderFinance(); 
  }));
  
  // Delivery horizon buttons
  document.querySelectorAll('#del-horizon button').forEach(b=> b.addEventListener('click', ()=>{ 
    document.querySelectorAll('#del-horizon button').forEach(x=>x.classList.remove('active')); 
    b.classList.add('active'); 
    if (App.page === 'delivery') renderDelivery(); 
  }));
  
  // People horizon buttons
  document.querySelectorAll('#peo-horizon button').forEach(b=> b.addEventListener('click', ()=>{ 
    document.querySelectorAll('#peo-horizon button').forEach(x=>x.classList.remove('active')); 
    b.classList.add('active'); 
    if (App.page === 'people') renderPeople(); 
  }));
  
  // Clients horizon buttons
  document.querySelectorAll('#cli-horizon button').forEach(b=> b.addEventListener('click', ()=>{ 
    document.querySelectorAll('#cli-horizon button').forEach(x=>x.classList.remove('active')); 
    b.classList.add('active'); 
    if (App.page === 'clients') renderClients(); 
  }));
}

function showPage(name){
  const home = document.getElementById('home');
  document.querySelectorAll('.page').forEach(p=>p.classList.remove('active'));
  if(name==='home'){ 
    if (home) home.style.display='block'; 
  } else { 
    if (home) home.style.display='none'; 
    const page = document.getElementById('page-'+name);
    if (page) page.classList.add('active'); 
  }
  App.page = name;
  if(name==='finance') renderFinance();
  if(name==='delivery') renderDelivery();
  if(name==='people') renderPeople();
  if(name==='clients') renderClients();
}

function runQuery(){
  const q = document.getElementById('searchInput').value.trim();
  const panel = document.getElementById('panel');
  const content = document.getElementById('panel-content');
  if(!panel || !content) return;
  
  if(App.mode==='search'){
    content.innerHTML = '<strong>Search results (mock)</strong><ul><li>Dashboard: Financial Performance</li><li>Project: Experience Migration Alfa</li><li>Client: Contoso AB</li><li>Doc: Rate Card FY25</li></ul>';
  } else {
    content.innerHTML = '<strong>Answer (mock)</strong><p>Margin dipped 0.8pp in May due to lower utilization in Data BU (-3.1pp) and higher subcontractor mix (+2.4pp). Recovery expected in 6\u20138 weeks as pipeline converts (1.3\u00d7 coverage).</p>';
  }
  panel.classList.add('open');
}

/* ---------- Renderers ---------- */
// Home mini-charts
function renderHomeMinis(){
  // Finance: area chart with gradient
  const financeCanvas = document.getElementById('mini-finance');
  if (financeCanvas) {
    const fctx = financeCanvas.getContext('2d');
    const f = App.data.finance(3);
    const data = f.revActual.slice(-8).concat(f.revForecast.slice(0,2));
    drawAreaChart(fctx, data, {yMin:0, color:'#6b5b95', fillColor:'rgba(107,91,149,0.3)'});
  }
  
  // Delivery: horizontal bar chart for utilization
  const deliveryCanvas = document.getElementById('mini-delivery');
  if (deliveryCanvas) {
    const dctx = deliveryCanvas.getContext('2d');
    const d = App.data.delivery(12);
    const utilData = [82, 87, 75, 91, 78];
    drawMiniBarChart(dctx, utilData, {horizontal: true, colors: ['#6b5b95', '#88a1ff', '#b492f0', '#9ca3af', '#f59e0b']});
  }
  
  // People: doughnut chart for skills distribution
  const peopleCanvas = document.getElementById('mini-people');
  if (peopleCanvas) {
    const pctx = peopleCanvas.getContext('2d');
    const skillData = [25, 30, 20, 15, 10];
    drawMiniDoughnut(pctx, skillData, {colors: ['#6b5b95', '#88a1ff', '#b492f0', '#9ca3af', '#f59e0b']});
  }
  
  // Clients: scatter plot for NPS vs Revenue
  const clientsCanvas = document.getElementById('mini-clients');
  if (clientsCanvas) {
    const cctx = clientsCanvas.getContext('2d');
    const scatterData = [
      {x: 65, y: 1.2}, {x: 72, y: 2.1}, {x: 58, y: 0.8}, 
      {x: 81, y: 3.2}, {x: 77, y: 2.8}, {x: 69, y: 1.9}
    ];
    drawMiniScatter(cctx, scatterData, {color: '#6b5b95'});
  }
}

// Finance
function renderFinance(){
  const horizonBtn = document.querySelector('#fin-horizon .active');
  const horizon = horizonBtn ? +horizonBtn.dataset.h : 3;
  const D = App.data.finance(horizon);
  const k = document.getElementById('fin-kpis');
  if (k) {
    k.innerHTML = '';
    D.kpis.forEach((i)=>{
      const el = document.createElement('div'); el.className='kpi';
      el.innerHTML = '<div class="name">'+i.name+'</div><div class="val">'+i.val+'</div><div class="delta">'+i.delta+'</div>';
      el.addEventListener('click', ()=>{
        const panel = document.getElementById('panel');
        const content = document.getElementById('panel-content');
        if (panel && content) {
          content.innerHTML = '<strong>'+i.name+'</strong><p>Quick insight (mock): metric is trending within target range. Click "Explain variance" for drivers.</p>';
          panel.classList.add('open');
        }
      });
      k.appendChild(el);
    });
  }
  
  const rev = D.revActual.concat(D.revForecast);
  const bandData = (D.revActual.map(v=>[v,v])).concat(D.revBand);
  const finRevCanvas = document.getElementById('fin-rev');
  if (finRevCanvas) {
    drawLineChart(finRevCanvas.getContext('2d'), rev, {bandData, yMin:0, color:getComputedStyle(document.documentElement).getPropertyValue('--primary') || '#6b5b95'});
  }
  
  const finMarginCanvas = document.getElementById('fin-margin');
  if (finMarginCanvas) {
    drawBars(finMarginCanvas.getContext('2d'), D.margin, {});
  }
  
  const finGrowCanvas = document.getElementById('fin-grow');
  if (finGrowCanvas) {
    drawBars(finGrowCanvas.getContext('2d'), D.growth, {});
  }
  
  const finRateCanvas = document.getElementById('fin-rate');
  if (finRateCanvas) {
    drawLineChart(finRateCanvas.getContext('2d'), D.rate, {});
  }
  
  const explainBtn = document.getElementById('fin-explain');
  if (explainBtn) {
    explainBtn.onclick = ()=>{
      const panel = document.getElementById('panel');
      const content = document.getElementById('panel-content');
      if (panel && content) {
        content.innerHTML = `
        <strong>Revenue variance drivers (mock)</strong>
        <ul>
          <li><b>Utilization</b>: +1.9pp vs plan, adds \u20ac1.2M</li>
          <li><b>Rate mix</b>: -\u20ac0.4M from discounting in two accounts</li>
          <li><b>Service mix</b>: +\u20ac0.6M from Experience projects</li>
        </ul>
        <p>Actions: tighten discount approvals, accelerate two Experience deals, reassign 8 consultants from bench.</p>`;
        panel.classList.add('open');
      }
    };
  }
}

// Delivery
function renderDelivery(){
  const horizonBtn = document.querySelector('#del-horizon .active');
  const horizon = horizonBtn ? +horizonBtn.dataset.h : 6;
  const D = App.data.delivery(horizon);
  const k = document.getElementById('del-kpis'); 
  if (k) {
    k.innerHTML='';
    D.kpis.forEach(i=>{
      const el = document.createElement('div'); el.className='kpi';
      el.innerHTML = '<div class="name">'+i.name+'</div><div class="val">'+i.val+'</div><div class="delta">'+i.delta+'</div>';
      k.appendChild(el);
    });
  }
  
  const delHeatCanvas = document.getElementById('del-heat');
  if (delHeatCanvas) {
    drawHeatmap(delHeatCanvas.getContext('2d'), D.heat, {min:60, max:95});
  }
  
  const delBenchCanvas = document.getElementById('del-bench');
  if (delBenchCanvas) {
    drawLineChart(delBenchCanvas.getContext('2d'), D.bench, {yMin:0});
  }
  
  const delAllocCanvas = document.getElementById('del-alloc');
  if (delAllocCanvas) {
    drawArea(delAllocCanvas.getContext('2d'), D.alloc, {yMin:0});
  }
  
  const delOtdCanvas = document.getElementById('del-otd');
  if (delOtdCanvas) {
    drawLineChart(delOtdCanvas.getContext('2d'), D.otd, {yMin:80, yMax:100});
  }
}

// People
function renderPeople(){
  const horizonBtn = document.querySelector('#peo-horizon .active');
  const horizon = horizonBtn ? +horizonBtn.dataset.h : 6;
  const D = App.data.people(horizon);
  const k = document.getElementById('peo-kpis'); 
  if (k) {
    k.innerHTML='';
    D.kpis.forEach(i=>{ 
      const el=document.createElement('div'); el.className='kpi'; 
      el.innerHTML = '<div class="name">'+i.name+'</div><div class="val">'+i.val+'</div><div class="delta">'+i.delta+'</div>'; 
      k.appendChild(el); 
    });
  }
  
  const peoHcCanvas = document.getElementById('peo-hc');
  if (peoHcCanvas) {
    const ctxHC = peoHcCanvas.getContext('2d');
    drawLineChart(ctxHC, D.hc, {yMin:3600, color:getComputedStyle(document.documentElement).getPropertyValue('--primary') || '#6b5b95'});
    drawLineChart(ctxHC, D.demand, {yMin:3600, clear:false, grid:false, color:getComputedStyle(document.documentElement).getPropertyValue('--primary-alt') || '#88a1ff', dash:[4,4]});
  }
  
  const peoAttrCanvas = document.getElementById('peo-attr');
  if (peoAttrCanvas) {
    drawLineChart(peoAttrCanvas.getContext('2d'), D.attr, {yMin:6, yMax:16});
  }
  
  const peoSkillCanvas = document.getElementById('peo-skill');
  if (peoSkillCanvas) {
    drawGroupedBars(peoSkillCanvas.getContext('2d'), [D.skillNeed, D.skillHave], {labels:['Solutions','Experience','AI','Dev','QA','PM','Security','UX']});
  }
  
  const peoMobCanvas = document.getElementById('peo-mob');
  if (peoMobCanvas) {
    drawBars(peoMobCanvas.getContext('2d'), D.mobility, {yMin:0});
  }
}

// Clients
function renderClients(){
  const horizonBtn = document.querySelector('#cli-horizon .active');
  const horizon = horizonBtn ? +horizonBtn.dataset.h : 6;
  const D = App.data.clients(horizon);
  const k = document.getElementById('cli-kpis'); 
  if (k) {
    k.innerHTML='';
    D.kpis.forEach(i=>{ 
      const el=document.createElement('div'); el.className='kpi'; 
      el.innerHTML = '<div class="name">'+i.name+'</div><div class="val">'+i.val+'</div><div class="delta">'+i.delta+'</div>'; 
      k.appendChild(el); 
    });
  }
  
  const cliRetCanvas = document.getElementById('cli-ret');
  if (cliRetCanvas) {
    const ctxR = cliRetCanvas.getContext('2d');
    drawLineChart(ctxR, D.retention, {yMin:80, yMax:100, color:getComputedStyle(document.documentElement).getPropertyValue('--primary') || '#6b5b95'});
    drawLineChart(ctxR, D.churn.map(x=>100-x), {yMin:80, yMax:100, clear:false, grid:false, color:getComputedStyle(document.documentElement).getPropertyValue('--primary-alt') || '#88a1ff', dash:[5,3]});
  }
  
  const cliCohortCanvas = document.getElementById('cli-cohort');
  if (cliCohortCanvas) {
    drawBars(cliCohortCanvas.getContext('2d'), D.cohort, {yMin:0});
  }
  
  // simple row treemap
  const cliMixCanvas = document.getElementById('cli-mix');
  if (cliMixCanvas) {
    const ctxT = cliMixCanvas.getContext('2d');
    (function drawTreemap(values){
      const w = ctxT.canvas.width, h = ctxT.canvas.height; ctxT.clearRect(0,0,w,h);
      const pad=16; let x=pad, y=pad; const innerW=w-pad*2, innerH=h-pad*2;
      const total = values.reduce((a,b)=>a+b,0);
      let rowH = innerH/3; let row = 0;
      values.forEach((v,i)=>{
        const wFrac = (v/total)*innerW;
        ctxT.fillStyle = `rgba(107,91,149,${0.25 + 0.6*(v/Math.max(...values))})`;
        ctxT.fillRect(x,y,wFrac-4,rowH-4);
        ctxT.fillStyle = '#4b4f74'; ctxT.font='12px system-ui'; ctxT.fillText('Client '+(i+1), x+6, y+16);
        x += wFrac;
        if (x > pad + innerW*0.95){ x = pad; row++; y = pad + row*rowH; }
      });
    })(D.mix);
  }
  
  const cliNpsCanvas = document.getElementById('cli-nps');
  if (cliNpsCanvas) {
    const ctxN = cliNpsCanvas.getContext('2d');
    drawLineChart(ctxN, D.nps, {yMin:0, yMax:100, color:getComputedStyle(document.documentElement).getPropertyValue('--primary') || '#6b5b95'});
    drawLineChart(ctxN, D.revGrowth.map(v=>v*10+50), {yMin:0, yMax:100, clear:false, grid:false, color:getComputedStyle(document.documentElement).getPropertyValue('--primary-alt') || '#88a1ff', dash:[4,4]});
  }
}

// Export debug function for console use
window.getDebugInfo = () => app.getDebugInfo();

/* ---------- Chat Chart Modal Functions ---------- */
function openChatChart(chartName) {
  const modal = document.getElementById('chart-modal');
  const titleElement = document.getElementById('chart-modal-title-text');
  const bodyElement = document.getElementById('chart-modal-body');
  
  if (!modal || !titleElement || !bodyElement) return;
  
  // Set title
  titleElement.textContent = chartName;
  
  // Create mock chart content based on chart name
  const chartData = getChartMockData(chartName);
  
  bodyElement.innerHTML = `
    <div class="chart-placeholder">
      <div class="chart-placeholder-icon">
        <i class="fas fa-chart-${getChartIcon(chartName)}"></i>
      </div>
      <h4>${chartName}</h4>
      <div style="margin: 2rem 0; padding: 1rem; background: var(--bg-light); border-radius: 8px;">
        <p><strong>Interactive Features:</strong></p>
        <ul style="text-align: left; margin: 1rem 0; padding-left: 1.5rem;">
          <li>Drill-down by clicking data points</li>
          <li>Filter by time range, business unit, or geography</li>
          <li>Export to Excel/PDF</li>
          <li>Set up automated alerts</li>
          <li>Share permalink with colleagues</li>
        </ul>
        <p><strong>Current View:</strong> ${chartData.description}</p>
        <p><strong>Last Updated:</strong> ${chartData.lastUpdated}</p>
      </div>
      <div style="display: flex; gap: 1rem; justify-content: center; margin-top: 2rem;">
        <button class="btn btn-primary" onclick="showTooltip('Export functionality would be available in the full application')">
          <i class="fas fa-download"></i> Export Data
        </button>
        <button class="btn btn-secondary" onclick="showTooltip('Real-time drill-down would be available with live data')">
          <i class="fas fa-search-plus"></i> Drill Down
        </button>
        <button class="btn btn-ghost" onclick="closeChatChartModal()">
          <i class="fas fa-times"></i> Close
        </button>
      </div>
    </div>
  `;
  
  // Show modal
  modal.classList.add('active');
  
  // Add click outside to close
  modal.addEventListener('click', (e) => {
    if (e.target === modal) {
      closeChatChartModal();
    }
  });
}

function closeChatChartModal() {
  const modal = document.getElementById('chart-modal');
  if (modal) {
    modal.classList.remove('active');
  }
}

function getChartIcon(chartName) {
  const name = chartName.toLowerCase();
  if (name.includes('trend') || name.includes('forecast')) return 'line';
  if (name.includes('breakdown') || name.includes('cost')) return 'bar';
  if (name.includes('performance') || name.includes('ranking')) return 'chart-line';
  if (name.includes('distribution') || name.includes('matrix')) return 'chart-area';
  return 'bar';
}

function getChartMockData(chartName) {
  const mockData = {
    'Margin Trend Analysis': {
      description: '12-month margin progression with variance drivers and confidence intervals',
      lastUpdated: '2 hours ago'
    },
    'Cost Breakdown by BU': {
      description: 'Detailed cost analysis across business units with allocation methodology',
      lastUpdated: '1 hour ago'
    },
    'Rate Realization Report': {
      description: 'Billing rate achievement vs. target rates by service line and seniority',
      lastUpdated: '30 minutes ago'
    },
    'Sweden Bench Forecast': {
      description: '8-week rolling forecast of bench resources with utilization scenarios',
      lastUpdated: '45 minutes ago'
    },
    'Pipeline Conversion Timeline': {
      description: 'Sales pipeline progression with probability-weighted revenue forecasts',
      lastUpdated: '1 hour ago'
    },
    'Resource Allocation Plan': {
      description: 'Strategic resource planning across projects and business units',
      lastUpdated: '2 hours ago'
    },
    'Consultant Performance Ranking': {
      description: 'Individual performance metrics with utilization and client satisfaction scores',
      lastUpdated: '4 hours ago'
    },
    'Utilization Distribution': {
      description: 'Statistical distribution of consultant utilization rates with benchmarks',
      lastUpdated: '1 hour ago'
    },
    'Skills vs Performance Matrix': {
      description: 'Skill proficiency mapped against performance outcomes and career progression',
      lastUpdated: '6 hours ago'
    },
    'Business Overview Dashboard': {
      description: 'Executive summary of key business metrics with real-time updates',
      lastUpdated: '30 minutes ago'
    },
    'Key Metrics Summary': {
      description: 'Consolidated view of critical KPIs across all business functions',
      lastUpdated: '15 minutes ago'
    },
    'Performance Trends': {
      description: 'Historical performance analysis with trend identification and forecasting',
      lastUpdated: '1 hour ago'
    }
  };
  
  return mockData[chartName] || {
    description: 'Interactive business intelligence visualization with drill-down capabilities',
    lastUpdated: '1 hour ago'
  };
}

function showTooltip(message) {
  // Simple tooltip implementation
  const tooltip = document.createElement('div');
  tooltip.style.cssText = `
    position: fixed;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    background: rgba(0,0,0,0.9);
    color: white;
    padding: 1rem 1.5rem;
    border-radius: 8px;
    z-index: 10000;
    max-width: 300px;
    text-align: center;
    font-size: 14px;
    animation: fadeIn 0.3s ease-out;
  `;
  tooltip.textContent = message;
  document.body.appendChild(tooltip);
  
  setTimeout(() => {
    tooltip.remove();
  }, 3000);
}

// Add global event listener for escape key to close modals
document.addEventListener('keydown', (e) => {
  if (e.key === 'Escape') {
    closeChatChartModal();
  }
});

// Add helpful console messages
console.log('%c🚀 Consulting Analytics Dashboard', 'color: #1f4788; font-size: 16px; font-weight: bold;');
console.log('%cType getDebugInfo() in console for debug information', 'color: #6c757d; font-style: italic;');
console.log('%cKeyboard shortcuts: / (search), Ctrl+K (search page), Alt+H (home), Alt+1-5 (domains)', 'color: #6c757d;');