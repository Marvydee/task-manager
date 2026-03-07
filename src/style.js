const styles = `
  @import url('https://fonts.googleapis.com/css2?family=Barlow+Condensed:wght@400;500;600;700;800&family=Literata:ital,wght@0,300;0,400;1,300&display=swap');

  *, *::before, *::after { box-sizing: border-box; margin: 0; padding: 0; }

  :root {
    --paper:    #f2ead8;
    --paper2:   #e8dfc8;
    --paper3:   #ddd3ba;
    --ink:      #1a1510;
    --ink2:     #2e2820;
    --muted:    #8a7d68;
    --faint:    #c4b99e;
    --red:      #c0392b;
    --orange:   #d35400;
    --green:    #1e6b3c;
    --blue:     #1a4a7a;
    --yellow:   #c49a00;
    --font:     'Barlow Condensed', sans-serif;
    --body:     'Literata', serif;
  }

  html, body { height: 100%; }

  body {
    font-family: var(--body);
    background: var(--paper);
    color: var(--ink);
    min-height: 100vh;
    /* Grain texture overlay using SVG noise */
    background-image:
      url("data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noise'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noise)' opacity='0.04'/%3E%3C/svg%3E"),
      linear-gradient(160deg, #f5edd8 0%, #ede3ca 50%, #e6d9c0 100%);
  }

  /* ── APP SHELL ── */
  .app {
    max-width: 760px;
    margin: 0 auto;
    padding: 3rem 1.5rem 5rem;
  }

  /* ── HEADER ── */
  .header {
    margin-bottom: 3rem;
    border-bottom: 3px solid var(--ink);
    padding-bottom: 1.25rem;
    display: flex;
    align-items: flex-end;
    justify-content: space-between;
    gap: 1rem;
    flex-wrap: wrap;
  }
  .header-left h1 {
    font-family: var(--font);
    font-size: clamp(3rem, 8vw, 5.5rem);
    font-weight: 800;
    line-height: 0.9;
    letter-spacing: -1px;
    text-transform: uppercase;
  }
  /* The word "tasks" offset and italic — asymmetric heading */
  .header-left h1 em {
    display: block;
    font-style: italic;
    font-weight: 400;
    font-family: var(--body);
    font-size: 0.38em;
    color: var(--muted);
    letter-spacing: 3px;
    text-transform: lowercase;
    margin-bottom: 0.1em;
  }
  .header-date {
    font-family: var(--font);
    font-size: 0.8rem;
    color: var(--muted);
    letter-spacing: 2px;
    text-transform: uppercase;
    text-align: right;
    line-height: 1.6;
  }

  /* ── STATS STRIP ── */
  .stats-strip {
    display: grid;
    grid-template-columns: repeat(4, 1fr);
    border: 2px solid var(--ink);
    margin-bottom: 2rem;
    background: var(--ink);
    gap: 1px; /* thin ink line between cells */
  }
  .stat-cell {
    background: var(--paper);
    padding: 1rem;
    display: flex;
    flex-direction: column;
    gap: 0.2rem;
  }
  .stat-cell-label {
    font-family: var(--font);
    font-size: 0.68rem;
    text-transform: uppercase;
    letter-spacing: 2px;
    color: var(--muted);
    display: flex; align-items: center; gap: 0.3rem;
  }
  .stat-cell-label svg { color: var(--muted); }
  .stat-cell-num {
    font-family: var(--font);
    font-size: 2.2rem;
    font-weight: 800;
    line-height: 1;
    letter-spacing: -1px;
  }
  .stat-cell-num.done { color: var(--green); }
  .stat-cell-num.active { color: var(--orange); }
  .stat-cell-num.overdue { color: var(--red); }

  /* ── ADD TASK FORM ── */
  .add-form {
    border: 2px solid var(--ink);
    margin-bottom: 2rem;
    background: var(--paper2);
  }
  .add-form-header {
    background: var(--ink);
    color: var(--paper);
    padding: 0.6rem 1rem;
    font-family: var(--font);
    font-size: 0.75rem;
    letter-spacing: 2px;
    text-transform: uppercase;
    display: flex; align-items: center; gap: 0.5rem;
  }
  .add-form-body {
    padding: 1.25rem;
    display: flex;
    flex-direction: column;
    gap: 0.75rem;
  }

  /* Main text input */
  .task-input {
    width: 100%;
    background: var(--paper);
    border: 2px solid var(--ink);
    padding: 0.85rem 1rem;
    font-family: var(--body);
    font-size: 1rem;
    color: var(--ink);
    outline: none;
    transition: box-shadow 0.15s;
    border-radius: 0;
  }
  .task-input::placeholder { color: var(--faint); font-style: italic; }
  .task-input:focus { box-shadow: 4px 4px 0 var(--ink); }

  /* Row of selects below the input */
  .form-controls {
    display: grid;
    grid-template-columns: 1fr 1fr 1fr auto;
    gap: 0.6rem;
    align-items: center;
  }

  .select-wrap {
    position: relative;
    display: flex; align-items: center;
  }
  .select-wrap svg {
    position: absolute; left: 0.6rem;
    color: var(--muted); pointer-events: none;
    flex-shrink: 0;
  }
  .select-wrap select {
    width: 100%;
    appearance: none;
    background: var(--paper);
    border: 2px solid var(--ink);
    padding: 0.6rem 1.5rem 0.6rem 2rem;
    font-family: var(--font);
    font-size: 0.85rem;
    letter-spacing: 1px;
    color: var(--ink);
    cursor: pointer;
    outline: none;
    border-radius: 0;
  }
  .chevron {
    position: absolute; right: 0.5rem;
    color: var(--muted); pointer-events: none;
  }

  /* Date input */
  .date-input {
    appearance: none;
    background: var(--paper);
    border: 2px solid var(--ink);
    padding: 0.6rem 0.75rem 0.6rem 2rem;
    font-family: var(--font);
    font-size: 0.85rem;
    color: var(--ink);
    outline: none;
    width: 100%;
    border-radius: 0;
  }
  .date-input::-webkit-calendar-picker-indicator { opacity: 0.4; cursor: pointer; }

  /* Add button */
  .add-btn {
    background: var(--ink);
    color: var(--paper);
    border: 2px solid var(--ink);
    padding: 0.6rem 1.25rem;
    font-family: var(--font);
    font-size: 0.85rem;
    font-weight: 700;
    letter-spacing: 2px;
    text-transform: uppercase;
    cursor: pointer;
    display: flex; align-items: center; gap: 0.4rem;
    white-space: nowrap;
    transition: background 0.15s, color 0.15s;
    border-radius: 0;
  }
  .add-btn:hover { background: var(--paper); color: var(--ink); }
  .add-btn:disabled { opacity: 0.4; cursor: not-allowed; }

  /* ── FILTER TABS ── */
  .filter-tabs {
    display: flex;
    border-bottom: 2px solid var(--ink);
    margin-bottom: 1.5rem;
  }
  .tab {
    font-family: var(--font);
    font-size: 0.82rem;
    font-weight: 600;
    letter-spacing: 2px;
    text-transform: uppercase;
    padding: 0.65rem 1.25rem;
    background: none;
    border: none;
    border-right: 2px solid var(--ink);
    cursor: pointer;
    color: var(--muted);
    transition: background 0.15s, color 0.15s;
    display: flex; align-items: center; gap: 0.4rem;
    border-radius: 0;
  }
  .tab:last-child { border-right: none; }
  .tab:hover { background: var(--paper2); color: var(--ink); }
  .tab.active {
    background: var(--ink);
    color: var(--paper);
  }
  .tab-count {
    font-size: 0.68rem;
    background: var(--paper3);
    color: var(--ink);
    padding: 0.1rem 0.4rem;
    min-width: 18px; text-align: center;
  }
  .tab.active .tab-count { background: var(--paper3); color: var(--ink); }

  /* ── TASK LIST ── */
  .task-list {
    display: flex;
    flex-direction: column;
    gap: 2px; /* tight ink-gap between cards */
  }

  /* ── TASK CARD ── */
  .task-card {
    background: var(--paper);
    border: 2px solid var(--ink);
    display: grid;
    /* grip | check | content | priority | actions */
    grid-template-columns: 32px 36px 1fr auto auto;
    align-items: center;
    gap: 0;
    transition: transform 0.15s, box-shadow 0.15s;
    animation: slideIn 0.25s ease both;
    position: relative;
    overflow: hidden;
  }
  /* Left accent stripe — color changes with priority */
  .task-card::before {
    content: '';
    position: absolute;
    left: 0; top: 0; bottom: 0;
    width: 4px;
  }
  .task-card.high::before   { background: var(--red); }
  .task-card.medium::before { background: var(--orange); }
  .task-card.low::before    { background: var(--blue); }

  .task-card:hover { transform: translateX(3px); box-shadow: -4px 0 0 var(--ink); }
  .task-card.done  { opacity: 0.6; }
  .task-card.done .task-text { text-decoration: line-through; color: var(--muted); }
  .task-card.dragging { opacity: 0.4; transform: scale(0.98); }
  .task-card.drag-over { box-shadow: 0 -3px 0 var(--ink); }

  @keyframes slideIn {
    from { opacity: 0; transform: translateX(-12px); }
    to   { opacity: 1; transform: translateX(0); }
  }

  /* Drag grip */
  .grip {
    display: flex; align-items: center; justify-content: center;
    padding: 1rem 0;
    color: var(--faint);
    cursor: grab;
    border-right: 1px solid var(--paper3);
    height: 100%;
    transition: color 0.15s;
  }
  .grip:active { cursor: grabbing; }
  .task-card:hover .grip { color: var(--muted); }

  /* Check button */
  .check-btn {
    display: flex; align-items: center; justify-content: center;
    padding: 1rem 0.5rem;
    background: none; border: none;
    cursor: pointer;
    color: var(--faint);
    transition: color 0.15s, transform 0.15s;
    height: 100%;
  }
  .check-btn:hover { color: var(--green); transform: scale(1.15); }
  .check-btn.checked { color: var(--green); }

  /* Content area */
  .task-content {
    padding: 0.85rem 0.75rem;
    min-width: 0; /* allows text to truncate */
  }
  .task-text {
    font-family: var(--body);
    font-size: 0.97rem;
    line-height: 1.4;
    word-break: break-word;
    margin-bottom: 0.3rem;
  }
  .task-meta {
    display: flex; align-items: center; gap: 0.75rem;
    flex-wrap: wrap;
  }
  .task-meta-item {
    display: flex; align-items: center; gap: 0.25rem;
    font-family: var(--font);
    font-size: 0.68rem;
    letter-spacing: 1px;
    text-transform: uppercase;
    color: var(--muted);
  }
  .task-meta-item svg { flex-shrink: 0; }
  .task-meta-item.overdue { color: var(--red); font-weight: 700; }

  /* Priority badge */
  .priority-badge {
    padding: 0.85rem 0.5rem;
    display: flex; align-items: center;
  }
  .badge {
    font-family: var(--font);
    font-size: 0.62rem;
    font-weight: 700;
    letter-spacing: 1.5px;
    text-transform: uppercase;
    padding: 0.2rem 0.45rem;
    border: 1px solid;
    display: inline-flex;
    align-items: center;
    gap: 0.25rem;
  }
  .badge.high   { color: var(--red);    border-color: var(--red);    background: rgba(192,57,43,0.08); }
  .badge.medium { color: var(--orange); border-color: var(--orange); background: rgba(211,84,0,0.08); }
  .badge.low    { color: var(--blue);   border-color: var(--blue);   background: rgba(26,74,122,0.08); }

  /* Delete button */
  .del-btn {
    display: flex; align-items: center; justify-content: center;
    padding: 1rem 0.85rem;
    background: none; border: none;
    cursor: pointer;
    color: var(--faint);
    border-left: 1px solid var(--paper3);
    height: 100%;
    transition: color 0.15s, background 0.15s;
  }
  .del-btn:hover { color: var(--red); background: rgba(192,57,43,0.06); }

  /* ── EMPTY STATE ── */
  .empty {
    text-align: center;
    padding: 4rem 2rem;
    border: 2px dashed var(--faint);
    color: var(--muted);
  }
  .empty svg { margin-bottom: 1rem; opacity: 0.3; }
  .empty h3 {
    font-family: var(--font);
    font-size: 1.4rem; font-weight: 700;
    text-transform: uppercase; letter-spacing: 2px;
    margin-bottom: 0.4rem;
  }
  .empty p { font-family: var(--body); font-size: 0.88rem; font-style: italic; }

  /* ── FOOTER ── */
  .footer-bar {
    margin-top: 2rem;
    padding-top: 1rem;
    border-top: 1px solid var(--faint);
    display: flex; justify-content: space-between; align-items: center;
    flex-wrap: wrap; gap: 0.5rem;
  }
  .footer-bar span {
    font-family: var(--font);
    font-size: 0.72rem; color: var(--muted);
    text-transform: uppercase; letter-spacing: 1.5px;
  }
  .clear-btn {
    background: none;
    border: 1px solid var(--faint);
    padding: 0.3rem 0.75rem;
    font-family: var(--font);
    font-size: 0.72rem; letter-spacing: 1px;
    text-transform: uppercase; color: var(--muted);
    cursor: pointer; transition: all 0.15s;
    border-radius: 0;
  }
  .clear-btn:hover { border-color: var(--red); color: var(--red); }

  /* ── PROGRESS BAR ── */
  .progress-wrap {
    margin-bottom: 1.5rem;
    display: flex; flex-direction: column; gap: 0.4rem;
  }
  .progress-label {
    display: flex; justify-content: space-between;
    font-family: var(--font); font-size: 0.72rem;
    text-transform: uppercase; letter-spacing: 1.5px;
    color: var(--muted);
  }
  .progress-track {
    height: 6px; background: var(--paper3);
    border: 1px solid var(--ink);
    overflow: hidden;
  }
  .progress-fill {
    height: 100%; background: var(--green);
    transition: width 0.5s ease;
  }

  /* ── RESPONSIVE ── */
  @media (max-width: 580px) {
    .form-controls { grid-template-columns: 1fr 1fr; }
    .add-btn { grid-column: span 2; justify-content: center; }
    .stats-strip { grid-template-columns: 1fr 1fr; }
    .task-card { grid-template-columns: 28px 32px 1fr auto; }
    .priority-badge { display: none; }
    .filter-tabs { overflow-x: auto; }
    .tab { font-size: 0.72rem; padding: 0.55rem 0.9rem; }
  }
`;

export default styles;
