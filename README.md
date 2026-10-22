<!doctype html><html><head><meta charset=utf8><meta name=viewport content="width=device-width,initial-scale=1,viewport-fit=cover"><style>:root{color-scheme:light;box-sizing:border-box;padding-top:env(safe-area-inset-top,0px);padding-bottom:env(safe-area-inset-bottom,0px)}html{scroll-padding-top:env(safe-area-inset-top,0px)}body{margin:0;padding:0;font:14px -apple-system,BlinkMacSystemFont,sans-serif;background:#fff;color:#000}img{max-width:100%}[hidden]:not([hidden=until-found i]){display:none!important}</style></head><body>
<title>Vagas-Hub</title>
<meta name="claude:viewport-fit-sides" content="cover">
<link rel="stylesheet" href="https://fonts.googleapis.com/css2?family=IBM+Plex+Mono:wght@400;600;700&family=IBM+Plex+Sans:ital,wght@0,300;0,400;0,500;0,600;1,400&display=swap">

<style>
/* ============================================================
   DESIGN PLAN
   Layout: single-column doc, max-width 860px, centered
   Color: dark-first, deep navy base, cyan accent (job "match" green-teal)
   Type: IBM Plex Mono (headings/title), IBM Plex Sans (body), monospace (code)
   ============================================================ */

:root {
  --bg:           #07090f;
  --surface:      #0d1117;
  --surface-2:    #161b27;
  --surface-3:    #1e2535;
  --border:       #252d3d;
  --border-light: #1a2030;

  --text:         #d4ddf5;
  --text-muted:   #6b7799;
  --text-dim:     #3d4a63;

  --accent:       #4af0b8;
  --accent-dim:   #1a3d32;
  --accent-text:  #2ed4a0;

  --green:        #50d890;
  --green-dim:    #112b1e;
  --red:          #f07070;
  --red-dim:      #2d1010;
  --yellow:       #f0c060;
  --yellow-dim:   #2a2010;
  --blue:         #7eb8f0;
  --blue-dim:     #0e1e30;

  --code-bg:      #0b0e16;
  --code-border:  #1a2030;

  color-scheme: dark;
}

@media (prefers-color-scheme: light) {
  :root:not([data-theme="dark"]) {
    --bg:           #f4f6fb;
    --surface:      #ffffff;
    --surface-2:    #f0f3fa;
    --surface-3:    #e8ecf5;
    --border:       #d0d8ec;
    --border-light: #e4e9f5;

    --text:         #1a2040;
    --text-muted:   #6070a0;
    --text-dim:     #b0bbda;

    --accent:       #0ebb8c;
    --accent-dim:   #d0f5ec;
    --accent-text:  #0aaa7f;

    --green:        #1a9a50;
    --green-dim:    #d8f5e8;
    --red:          #d44040;
    --red-dim:      #fce8e8;
    --yellow:       #b88000;
    --yellow-dim:   #fff5d5;
    --blue:         #2a6ac0;
    --blue-dim:     #e0eeff;

    --code-bg:      #f0f3fa;
    --code-border:  #d0d8ec;

    color-scheme: light;
  }
}

:root[data-theme="light"] {
  --bg:           #f4f6fb;
  --surface:      #ffffff;
  --surface-2:    #f0f3fa;
  --surface-3:    #e8ecf5;
  --border:       #d0d8ec;
  --border-light: #e4e9f5;
  --text:         #1a2040;
  --text-muted:   #6070a0;
  --text-dim:     #b0bbda;
  --accent:       #0ebb8c;
  --accent-dim:   #d0f5ec;
  --accent-text:  #0aaa7f;
  --green:        #1a9a50;
  --green-dim:    #d8f5e8;
  --red:          #d44040;
  --red-dim:      #fce8e8;
  --yellow:       #b88000;
  --yellow-dim:   #fff5d5;
  --blue:         #2a6ac0;
  --blue-dim:     #e0eeff;
  --code-bg:      #f0f3fa;
  --code-border:  #d0d8ec;
  color-scheme: light;
}

*, *::before, *::after { box-sizing: border-box; margin: 0; padding: 0; }

body {
  background: var(--bg);
  color: var(--text);
  font-family: 'IBM Plex Sans', system-ui, sans-serif;
  font-size: 15px;
  line-height: 1.7;
  padding-left: max(16px, env(safe-area-inset-left, 0px));
  padding-right: max(16px, env(safe-area-inset-right, 0px));
  padding-block: 0 56px;
}

/* ─── Layout ─────────────────────────────────────── */

.page {
  max-width: 860px;
  margin: 0 auto;
}

/* ─── Header ─────────────────────────────────────── */

.header {
  border-bottom: 1px solid var(--border);
  padding-bottom: 32px;
  padding-top: 48px;
}

.project-label {
  font-family: 'IBM Plex Mono', monospace;
  font-size: 11px;
  font-weight: 600;
  letter-spacing: .12em;
  text-transform: uppercase;
  color: var(--accent-text);
  margin-bottom: 12px;
}

.project-title {
  font-family: 'IBM Plex Mono', monospace;
  font-size: clamp(2rem, 6vw, 3.2rem);
  font-weight: 700;
  color: var(--text);
  line-height: 1.1;
  letter-spacing: -.02em;
  margin-bottom: 16px;
}

.project-title .accent { color: var(--accent); }

.tagline {
  font-size: 17px;
  color: var(--text-muted);
  font-weight: 300;
  max-width: 600px;
  line-height: 1.6;
  margin-bottom: 24px;
}

.badges {
  display: flex;
  flex-wrap: wrap;
  gap: 8px;
}

.badge {
  display: inline-flex;
  align-items: center;
  gap: 5px;
  font-family: 'IBM Plex Mono', monospace;
  font-size: 11px;
  font-weight: 600;
  padding: 4px 10px;
  border-radius: 4px;
  border: 1px solid;
  white-space: nowrap;
}

.badge-node   { background: var(--green-dim);  border-color: var(--green);  color: var(--green);  }
.badge-ts     { background: var(--blue-dim);   border-color: var(--blue);   color: var(--blue);   }
.badge-sqlite { background: var(--yellow-dim); border-color: var(--yellow); color: var(--yellow); }
.badge-free   { background: var(--accent-dim); border-color: var(--accent); color: var(--accent); }
.badge-tg     { background: var(--blue-dim);   border-color: var(--blue);   color: var(--blue);   }

/* ─── Section ────────────────────────────────────── */

section {
  padding-top: 48px;
}

.section-eyebrow {
  font-family: 'IBM Plex Mono', monospace;
  font-size: 10px;
  font-weight: 600;
  letter-spacing: .15em;
  text-transform: uppercase;
  color: var(--text-dim);
  margin-bottom: 8px;
}

h2 {
  font-family: 'IBM Plex Mono', monospace;
  font-size: clamp(1.1rem, 3vw, 1.4rem);
  font-weight: 700;
  color: var(--text);
  letter-spacing: -.02em;
  margin-bottom: 20px;
  padding-bottom: 12px;
  border-bottom: 1px solid var(--border-light);
}

h3 {
  font-family: 'IBM Plex Mono', monospace;
  font-size: .95rem;
  font-weight: 600;
  color: var(--text);
  letter-spacing: -.01em;
  margin-bottom: 10px;
  margin-top: 28px;
}

p {
  color: var(--text);
  margin-bottom: 14px;
  max-width: 72ch;
}

p:last-child { margin-bottom: 0; }

/* ─── Pain Points ────────────────────────────────── */

.problems-grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(240px, 1fr));
  gap: 12px;
  margin-top: 4px;
}

.problem-card {
  background: var(--surface);
  border: 1px solid var(--border);
  border-radius: 8px;
  padding: 16px 18px;
  min-width: 0;
}

.problem-icon {
  font-size: 18px;
  margin-bottom: 8px;
  display: block;
}

.problem-title {
  font-weight: 600;
  font-size: 13px;
  color: var(--text);
  margin-bottom: 4px;
}

.problem-desc {
  font-size: 13px;
  color: var(--text-muted);
  line-height: 1.5;
  max-width: none;
  margin: 0;
}

/* ─── Pipeline Diagram ────────────────────────────── */

.pipeline {
  display: flex;
  align-items: stretch;
  gap: 0;
  overflow-x: auto;
  padding: 24px 0;
  position: relative;
}

.pipeline-step {
  flex: 1;
  min-width: 110px;
  display: flex;
  flex-direction: column;
  align-items: center;
  position: relative;
}

.pipeline-step + .pipeline-step::before {
  content: '';
  position: absolute;
  left: 0;
  top: 24px;
  width: 1px;
  height: 48px;
  background: var(--border);
  transform: translateY(-50%);
}

.pipeline-arrow {
  position: absolute;
  left: -1px;
  top: 23px;
  width: 20px;
  height: 2px;
  background: var(--border);
  z-index: 1;
}

.pipeline-arrow::after {
  content: '';
  position: absolute;
  right: -1px;
  top: -4px;
  border: 4px solid transparent;
  border-left-color: var(--accent);
  border-right: none;
}

@media (max-width: 600px) {
  .pipeline {
    flex-direction: column;
    align-items: flex-start;
    gap: 0;
    padding-left: 16px;
  }
  .pipeline-step {
    flex-direction: row;
    align-items: flex-start;
    gap: 14px;
    padding: 0 0 24px 0;
    width: 100%;
  }
  .pipeline-step + .pipeline-step::before { display: none; }
  .pipeline-step-content { text-align: left; }
}

.pipeline-node {
  width: 48px;
  height: 48px;
  border-radius: 12px;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 20px;
  margin-bottom: 12px;
  flex-shrink: 0;
  border: 1px solid;
}

.node-scrape  { background: var(--blue-dim);   border-color: var(--blue);   }
.node-filter  { background: var(--red-dim);    border-color: var(--red);    }
.node-analyze { background: var(--yellow-dim); border-color: var(--yellow); }
.node-dedup   { background: var(--surface-3);  border-color: var(--border); }
.node-notify  { background: var(--accent-dim); border-color: var(--accent); }

.pipeline-step-content {
  text-align: center;
}

.pipeline-step-name {
  font-family: 'IBM Plex Mono', monospace;
  font-size: 11px;
  font-weight: 600;
  color: var(--text);
  margin-bottom: 4px;
}

.pipeline-step-detail {
  font-size: 11px;
  color: var(--text-muted);
  line-height: 1.4;
}

.pipeline-connector {
  flex-shrink: 0;
  display: flex;
  align-items: center;
  padding: 0 4px;
  padding-bottom: 36px;
  color: var(--accent);
  font-size: 18px;
  align-self: center;
}

@media (max-width: 600px) {
  .pipeline-connector { display: none; }
}

/* ─── Tech Stack ─────────────────────────────────── */

.tech-grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(170px, 1fr));
  gap: 10px;
  margin-top: 4px;
}

.tech-card {
  background: var(--surface);
  border: 1px solid var(--border);
  border-radius: 8px;
  padding: 14px 16px;
  min-width: 0;
}

.tech-role {
  font-family: 'IBM Plex Mono', monospace;
  font-size: 10px;
  font-weight: 600;
  letter-spacing: .1em;
  text-transform: uppercase;
  color: var(--text-dim);
  margin-bottom: 4px;
}

.tech-name {
  font-size: 13px;
  font-weight: 600;
  color: var(--text);
}

.tech-detail {
  font-size: 12px;
  color: var(--text-muted);
  margin-top: 2px;
  max-width: none;
  margin-bottom: 0;
}

/* ─── Analyzer ───────────────────────────────────── */

.analyzer-grid {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 12px;
}

@media (max-width: 580px) {
  .analyzer-grid { grid-template-columns: 1fr; }
}

.rule-card {
  background: var(--surface);
  border: 1px solid var(--border);
  border-radius: 8px;
  padding: 16px 18px;
  min-width: 0;
}

.rule-card.approve { border-left: 3px solid var(--green); }
.rule-card.reject  { border-left: 3px solid var(--red);   }
.rule-card.block   { border-left: 3px solid var(--yellow); }

.rule-header {
  display: flex;
  align-items: center;
  gap: 8px;
  margin-bottom: 12px;
}

.rule-dot {
  width: 8px;
  height: 8px;
  border-radius: 50%;
  flex-shrink: 0;
}

.dot-approve { background: var(--green); }
.dot-reject  { background: var(--red);   }
.dot-block   { background: var(--yellow);}

.rule-title {
  font-family: 'IBM Plex Mono', monospace;
  font-size: 12px;
  font-weight: 600;
  color: var(--text);
}

.tag-list {
  display: flex;
  flex-wrap: wrap;
  gap: 5px;
}

.tag {
  font-family: 'IBM Plex Mono', monospace;
  font-size: 11px;
  padding: 2px 7px;
  border-radius: 3px;
  line-height: 1.4;
}

.tag-approve { background: var(--green-dim); color: var(--green); }
.tag-reject  { background: var(--red-dim);   color: var(--red);   }
.tag-block   { background: var(--yellow-dim);color: var(--yellow);}
.tag-company { background: var(--surface-3); color: var(--text-muted); }

/* ─── Code / File tree ───────────────────────────── */

.code-block {
  background: var(--code-bg);
  border: 1px solid var(--code-border);
  border-radius: 8px;
  overflow-x: auto;
  margin: 4px 0 0;
}

.code-block pre {
  font-family: 'IBM Plex Mono', monospace;
  font-size: 12.5px;
  line-height: 1.75;
  padding: 20px 22px;
  color: var(--text);
  min-width: 0;
  overflow-x: auto;
}

.code-block pre .dir   { color: var(--blue);   }
.code-block pre .file  { color: var(--text-muted); }
.code-block pre .label { color: var(--accent-text); }

/* inline code */
code {
  font-family: 'IBM Plex Mono', monospace;
  font-size: .88em;
  background: var(--code-bg);
  border: 1px solid var(--code-border);
  border-radius: 3px;
  padding: 1px 5px;
  color: var(--accent-text);
}

/* ─── Steps ──────────────────────────────────────── */

.steps {
  counter-reset: steps;
  display: flex;
  flex-direction: column;
  gap: 0;
  border: 1px solid var(--border);
  border-radius: 10px;
  overflow: hidden;
  background: var(--surface);
}

.step {
  counter-increment: steps;
  display: flex;
  gap: 18px;
  padding: 18px 20px;
  border-bottom: 1px solid var(--border-light);
  align-items: flex-start;
  min-width: 0;
}

.step:last-child { border-bottom: none; }

.step-number {
  font-family: 'IBM Plex Mono', monospace;
  font-size: 11px;
  font-weight: 700;
  color: var(--accent);
  background: var(--accent-dim);
  border: 1px solid var(--accent);
  border-radius: 50%;
  width: 26px;
  height: 26px;
  display: flex;
  align-items: center;
  justify-content: center;
  flex-shrink: 0;
  margin-top: 1px;
}

.step-body {
  min-width: 0;
  flex: 1;
}

.step-title {
  font-weight: 600;
  font-size: 14px;
  color: var(--text);
  margin-bottom: 6px;
}

.step-body .code-block {
  margin-top: 8px;
}

.step-body p {
  font-size: 13.5px;
  color: var(--text-muted);
  max-width: none;
  margin-bottom: 6px;
}

/* ─── Env table ──────────────────────────────────── */

.env-table-wrap {
  overflow-x: auto;
  border: 1px solid var(--border);
  border-radius: 8px;
  background: var(--surface);
}

table {
  width: 100%;
  border-collapse: collapse;
  font-size: 13px;
  min-width: 480px;
}

th {
  font-family: 'IBM Plex Mono', monospace;
  font-size: 10px;
  font-weight: 700;
  letter-spacing: .1em;
  text-transform: uppercase;
  color: var(--text-dim);
  padding: 10px 16px;
  text-align: left;
  border-bottom: 1px solid var(--border);
  background: var(--surface-2);
}

td {
  padding: 11px 16px;
  border-bottom: 1px solid var(--border-light);
  vertical-align: top;
  color: var(--text);
}

tr:last-child td { border-bottom: none; }

td:first-child {
  font-family: 'IBM Plex Mono', monospace;
  font-size: 12px;
  color: var(--accent-text);
  white-space: nowrap;
}

td .required {
  font-family: 'IBM Plex Mono', monospace;
  font-size: 10px;
  padding: 1px 5px;
  border-radius: 3px;
  margin-left: 6px;
  background: var(--red-dim);
  color: var(--red);
  vertical-align: middle;
}

td .optional {
  font-family: 'IBM Plex Mono', monospace;
  font-size: 10px;
  padding: 1px 5px;
  border-radius: 3px;
  margin-left: 6px;
  background: var(--surface-3);
  color: var(--text-muted);
  vertical-align: middle;
}

.example-val {
  font-family: 'IBM Plex Mono', monospace;
  font-size: 11px;
  color: var(--text-muted);
  display: block;
  margin-top: 3px;
}

/* ─── Schema table ───────────────────────────────── */

.schema-table th:nth-child(3),
.schema-table td:nth-child(3) { color: var(--text-muted); }

td .type {
  font-family: 'IBM Plex Mono', monospace;
  font-size: 11px;
  color: var(--yellow);
}

td .pk {
  font-family: 'IBM Plex Mono', monospace;
  font-size: 10px;
  padding: 1px 5px;
  border-radius: 3px;
  background: var(--blue-dim);
  color: var(--blue);
  margin-left: 6px;
}

/* ─── Roadmap ─────────────────────────────────────── */

.roadmap {
  display: flex;
  flex-direction: column;
  gap: 6px;
}

.roadmap-item {
  display: flex;
  align-items: flex-start;
  gap: 12px;
  padding: 12px 16px;
  background: var(--surface);
  border: 1px solid var(--border);
  border-radius: 8px;
  min-width: 0;
}

.roadmap-item.done {
  background: var(--green-dim);
  border-color: var(--green);
  opacity: .8;
}

.roadmap-item.planned {
  opacity: 1;
}

.check-icon {
  flex-shrink: 0;
  width: 18px;
  height: 18px;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 10px;
  margin-top: 1px;
}

.check-done    { background: var(--green); color: #fff; }
.check-pending { background: var(--surface-3); border: 1px solid var(--border); color: transparent; }

.roadmap-text {
  font-size: 13.5px;
  min-width: 0;
  flex: 1;
}

.roadmap-subtitle {
  font-size: 12px;
  margin-top: 2px;
}

/* ─── Callout ─────────────────────────────────────── */

.callout {
  display: flex;
  gap: 12px;
  padding: 14px 18px;
  border-radius: 8px;
  border: 1px solid;
  margin: 20px 0;
  align-items: flex-start;
}

.callout-info {
  background: var(--blue-dim);
  border-color: var(--blue);
}

.callout-icon {
  font-size: 16px;
  flex-shrink: 0;
  line-height: 1.5;
}

.callout-body {
  font-size: 13.5px;
  color: var(--text);
  min-width: 0;
  flex: 1;
  max-width: none;
  margin: 0;
}

.callout-body strong { color: var(--blue); }

/* ─── Footer ──────────────────────────────────────── */

.footer {
  margin-top: 56px;
  padding-top: 24px;
  border-top: 1px solid var(--border);
  display: flex;
  flex-wrap: wrap;
  align-items: center;
  justify-content: space-between;
  gap: 12px;
}

.footer-text {
  font-size: 13px;
  color: var(--text-muted);
  max-width: none;
  margin: 0;
}

.footer-stack {
  display: flex;
  gap: 8px;
  flex-wrap: wrap;
}

.footer-tag {
  font-family: 'IBM Plex Mono', monospace;
  font-size: 11px;
  color: var(--text-dim);
  padding: 3px 8px;
  background: var(--surface);
  border: 1px solid var(--border);
  border-radius: 4px;
}

/* ─── Divider ─────────────────────────────────────── */
.divider {
  border: none;
  border-top: 1px solid var(--border-light);
  margin: 36px 0 0;
}

/* ─── Sub-section separator ──────────────────────── */
.sub-section { margin-top: 32px; }
</style>

<div class="page">

  <!-- ══════════════ HEADER ══════════════ -->
  <header class="header">
    <p class="project-label">// projeto open-source · Node.js + TypeScript</p>
    <h1 class="project-title">Vagas<span class="accent">-</span>Hub</h1>
    <p class="tagline">
      Agrega, filtra e entrega vagas de TI Junior/Estágio diretamente no Telegram —
      sem busca manual, sem spam de recrutadora gringa.
    </p>
    <div class="badges">
      <span class="badge badge-node">Node.js 20+</span>
      <span class="badge badge-ts">TypeScript</span>
      <span class="badge badge-sqlite">SQLite · Prisma</span>
      <span class="badge badge-free">scraping nativo</span>
      <span class="badge badge-tg">Telegram Bot</span>
    </div>
  </header>

  <!-- ══════════════ PROBLEMA ══════════════ -->
  <section>
    <p class="section-eyebrow">// motivação</p>
    <h2>O problema que isso resolve</h2>
    <div class="problems-grid">
      <div class="problem-card">
        <span class="problem-icon">🔍</span>
        <p class="problem-title">Busca manual diária</p>
        <p class="problem-desc">Navegar pelo LinkedIn todo dia é exaustivo e ineficiente. O worker faz isso automaticamente, coletando vagas das últimas 72h.</p>
      </div>
      <div class="problem-card">
        <span class="problem-icon">🚫</span>
        <p class="problem-title">Vagas Sênior disfarçadas</p>
        <p class="problem-desc">Muitos anúncios "Júnior" escondem requisitos de Pleno/Sênior. O analisador rejeita qualquer cargo fora do nível de entrada.</p>
      </div>
      <div class="problem-card">
        <span class="problem-icon">🌐</span>
        <p class="problem-title">Consultorias de gringa</p>
        <p class="problem-desc">BairesDev, Turing, Jobbol e similares poluem os resultados. A blacklist de empresas elimina essas fontes antes mesmo da análise.</p>
      </div>
      <div class="problem-card">
        <span class="problem-icon">🔁</span>
        <p class="problem-title">Notificações repetidas</p>
        <p class="problem-desc">Sem deduplicação, a mesma vaga aparece toda vez. O histórico local em SQLite garante que cada vaga seja notificada uma única vez.</p>
      </div>
    </div>
  </section>

  <!-- ══════════════ PIPELINE ══════════════ -->
  <section>
    <p class="section-eyebrow">// arquitetura</p>
    <h2>Como o pipeline funciona</h2>
    <p>Cada execução do worker percorre cinco etapas em sequência. Uma falha em qualquer etapa é registrada no <code>ExecutionLog</code> sem derrubar o processo inteiro.</p>
    <div class="pipeline">
      <div class="pipeline-step">
        <div class="pipeline-node node-scrape">🕸</div>
        <div class="pipeline-step-content">
          <p class="pipeline-step-name">Scraping</p>
          <p class="pipeline-step-detail">Axios + Cheerio<br>Paginação profunda<br>LinkedIn nativo</p>
        </div>
      </div>
      <div class="pipeline-connector">→</div>
      <div class="pipeline-step">
        <div class="pipeline-node node-filter">🛡</div>
        <div class="pipeline-step-content">
          <p class="pipeline-step-name">Anti-Spam</p>
          <p class="pipeline-step-detail">Blacklist de<br>empresas e<br>plataformas</p>
        </div>
      </div>
      <div class="pipeline-connector">→</div>
      <div class="pipeline-step">
        <div class="pipeline-node node-analyze">🧠</div>
        <div class="pipeline-step-content">
          <p class="pipeline-step-name">Analyzer</p>
          <p class="pipeline-step-detail">Heurística com<br>safeRegex · valida<br>stack + senioridade</p>
        </div>
      </div>
      <div class="pipeline-connector">→</div>
      <div class="pipeline-step">
        <div class="pipeline-node node-dedup">💾</div>
        <div class="pipeline-step-content">
          <p class="pipeline-step-name">Deduplicação</p>
          <p class="pipeline-step-detail">Persiste no SQLite<br>via Prisma ORM<br>Evita re-notificar</p>
        </div>
      </div>
      <div class="pipeline-connector">→</div>
      <div class="pipeline-step">
        <div class="pipeline-node node-notify">📲</div>
        <div class="pipeline-step-content">
          <p class="pipeline-step-name">Notificação</p>
          <p class="pipeline-step-detail">Bot API Telegram<br>Mensagem HTML<br>formatada</p>
        </div>
      </div>
    </div>
    <div class="callout callout-info">
      <span class="callout-icon">ℹ️</span>
      <p class="callout-body"><strong>Scraping 100% gratuito:</strong> o projeto não usa Apify nem qualquer API paga. A coleta é feita diretamente nas páginas públicas do LinkedIn usando queries compostas com filtros de data, localização e trabalho remoto (<code>f_WA=1</code>).</p>
    </div>
  </section>

  <!-- ══════════════ TECH STACK ══════════════ -->
  <section>
    <p class="section-eyebrow">// tecnologias</p>
    <h2>Stack técnica</h2>
    <div class="tech-grid">
      <div class="tech-card">
        <p class="tech-role">Runtime</p>
        <p class="tech-name">Node.js 20+</p>
        <p class="tech-detail">TypeScript com strict mode</p>
      </div>
      <div class="tech-card">
        <p class="tech-role">Scraping</p>
        <p class="tech-name">Axios + Cheerio</p>
        <p class="tech-detail">HTTP nativo + parsing de HTML</p>
      </div>
      <div class="tech-card">
        <p class="tech-role">Banco de Dados</p>
        <p class="tech-name">SQLite</p>
        <p class="tech-detail">Arquivo local, zero config</p>
      </div>
      <div class="tech-card">
        <p class="tech-role">ORM</p>
        <p class="tech-name">Prisma</p>
        <p class="tech-detail">Migrations + repositórios tipados</p>
      </div>
      <div class="tech-card">
        <p class="tech-role">Notificações</p>
        <p class="tech-name">Telegram Bot API</p>
        <p class="tech-detail">Mensagens em HTML5 formatado</p>
      </div>
      <div class="tech-card">
        <p class="tech-role">Agendamento</p>
        <p class="tech-name">npm scripts</p>
        <p class="tech-detail">Execução manual ou via PM2/cron</p>
      </div>
    </div>
  </section>

  <!-- ══════════════ ANALYZER ══════════════ -->
  <section>
    <p class="section-eyebrow">// lógica central</p>
    <h2>Motor de análise (Analyzer)</h2>
    <p>O Analyzer aplica regras em cascata ao título e à descrição de cada vaga. A aprovação exige que <em>todos</em> os critérios sejam satisfeitos; qualquer falha rejeita a vaga imediatamente.</p>
    <div class="analyzer-grid" style="margin-top:20px;">
      <div class="rule-card approve">
        <div class="rule-header">
          <div class="rule-dot dot-approve"></div>
          <p class="rule-title">✅ Front-end aprovado</p>
        </div>
        <div class="tag-list">
          <span class="tag tag-approve">Vue.js</span>
          <span class="tag tag-approve">Nuxt</span>
          <span class="tag tag-approve">React</span>
          <span class="tag tag-approve">Next.js</span>
          <span class="tag tag-approve">TypeScript</span>
        </div>
      </div>
      <div class="rule-card approve">
        <div class="rule-header">
          <div class="rule-dot dot-approve"></div>
          <p class="rule-title">✅ Back-end aprovado</p>
        </div>
        <div class="tag-list">
          <span class="tag tag-approve">Java</span>
          <span class="tag tag-approve">Spring Boot</span>
          <span class="tag tag-approve">Node.js</span>
          <span class="tag tag-approve">Express</span>
          <span class="tag tag-approve">AdonisJS</span>
        </div>
      </div>
      <div class="rule-card reject">
        <div class="rule-header">
          <div class="rule-dot dot-reject"></div>
          <p class="rule-title">🚫 Senioridade rejeitada</p>
        </div>
        <div class="tag-list">
          <span class="tag tag-reject">Pleno</span>
          <span class="tag tag-reject">Sênior</span>
          <span class="tag tag-reject">Sr.</span>
          <span class="tag tag-reject">Tech Lead</span>
          <span class="tag tag-reject">Arquiteto</span>
          <span class="tag tag-reject">Especialista</span>
        </div>
      </div>
      <div class="rule-card block">
        <div class="rule-header">
          <div class="rule-dot dot-block"></div>
          <p class="rule-title">⛔ Stacks fora do escopo</p>
        </div>
        <div class="tag-list">
          <span class="tag tag-block">Python</span>
          <span class="tag tag-block">.NET / C#</span>
          <span class="tag tag-block">PHP</span>
          <span class="tag tag-block">C++</span>
          <span class="tag tag-block">Salesforce</span>
          <span class="tag tag-block">Ruby</span>
        </div>
      </div>
    </div>
    <div class="sub-section">
      <h3>Blacklist de empresas</h3>
      <p>Plataformas de recrutamento e "body shops" são removidas antes da análise de conteúdo, evitando desperdício de processamento:</p>
      <div class="tag-list" style="margin-top:10px;">
        <span class="tag tag-company">BairesDev</span>
        <span class="tag tag-company">Turing</span>
        <span class="tag tag-company">Jobbol</span>
        <span class="tag tag-company">Revelo</span>
        <span class="tag tag-company">TopTal</span>
        <span class="tag tag-company">Anywhere.club</span>
        <span class="tag tag-company">Lemon.io</span>
      </div>
    </div>
    <div class="sub-section">
      <h3>Nível de entrada permitido</h3>
      <div class="tag-list">
        <span class="tag tag-approve">Júnior</span>
        <span class="tag tag-approve">Jr.</span>
        <span class="tag tag-approve">Estágio</span>
        <span class="tag tag-approve">Estagiário</span>
        <span class="tag tag-approve">Trainee</span>
        <span class="tag tag-approve">Entry-level</span>
      </div>
    </div>
  </section>

  <!-- ══════════════ ESTRUTURA ══════════════ -->
  <section>
    <p class="section-eyebrow">// código-fonte</p>
    <h2>Estrutura do projeto</h2>
    <div class="code-block">
      <pre><span class="dir">vagas-hub/</span>
├── <span class="dir">prisma/</span>
│   └── <span class="file">schema.prisma</span>        <span class="label"># Schema SQLite + modelos Job e ExecutionLog</span>
├── <span class="dir">src/</span>
│   ├── <span class="dir">adapters/</span>
│   │   └── <span class="file">linkedin-native.adapter.ts</span>  <span class="label"># Scraper Axios/Cheerio com paginação e anti-spam</span>
│   ├── <span class="dir">analyzer/</span>
│   │   └── <span class="file">index.ts</span>             <span class="label"># Motor de regras: safeRegex, filtros de stack/senioridade</span>
│   ├── <span class="dir">bot/</span>
│   │   └── <span class="file">telegram.ts</span>          <span class="label"># Integração com Bot API do Telegram (HTML mode)</span>
│   ├── <span class="dir">database/</span>
│   │   ├── <span class="file">client.ts</span>            <span class="label"># Instância singleton do PrismaClient</span>
│   │   └── <span class="file">job.repository.ts</span>    <span class="label"># CRUD de vagas e verificação de duplicatas</span>
│   ├── <span class="dir">scheduler/</span>
│   │   └── <span class="file">index.ts</span>             <span class="label"># Orquestrador: coleta → filtra → analisa → persiste → notifica</span>
│   └── <span class="file">index.ts</span>                 <span class="label"># Entry point do worker</span>
├── <span class="file">.env</span>                         <span class="label"># Variáveis de ambiente (não versionar)</span>
├── <span class="file">package.json</span>
└── <span class="file">README.md</span></pre>
    </div>
  </section>

  <!-- ══════════════ SCHEMA ══════════════ -->
  <section>
    <p class="section-eyebrow">// banco de dados</p>
    <h2>Modelagem (SQLite)</h2>
    <div class="sub-section" style="margin-top:0;">
      <h3>Tabela <code>Job</code></h3>
      <div class="env-table-wrap schema-table" style="margin-top:10px;">
        <table class="schema-table">
          <thead>
            <tr>
              <th>Campo</th>
              <th>Tipo</th>
              <th>Descrição</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>id <span class="pk">PK</span></td>
              <td><span class="type">String (UUID)</span></td>
              <td>Identificador único interno gerado pelo Prisma</td>
            </tr>
            <tr>
              <td>externalJobId</td>
              <td><span class="type">String</span></td>
              <td>ID original da vaga na plataforma (usado para deduplicação)</td>
            </tr>
            <tr>
              <td>platform</td>
              <td><span class="type">String</span></td>
              <td>Plataforma de origem — ex: <code>LINKEDIN</code></td>
            </tr>
            <tr>
              <td>title</td>
              <td><span class="type">String</span></td>
              <td>Título completo do cargo</td>
            </tr>
            <tr>
              <td>company</td>
              <td><span class="type">String</span></td>
              <td>Razão social ou nome fantasia da empresa</td>
            </tr>
            <tr>
              <td>location</td>
              <td><span class="type">String</span></td>
              <td>Cidade/estado ou <code>Remoto</code></td>
            </tr>
            <tr>
              <td>jobUrl</td>
              <td><span class="type">String</span></td>
              <td>URL direta para a vaga na plataforma de origem</td>
            </tr>
            <tr>
              <td>matchedKeywords</td>
              <td><span class="type">String[]</span></td>
              <td>Tecnologias identificadas pelo Analyzer (ex: <code>["Java","Spring"]</code>)</td>
            </tr>
            <tr>
              <td>status</td>
              <td><span class="type">String</span></td>
              <td>Estado do fluxo: <code>NEW</code> → <code>SENT</code></td>
            </tr>
            <tr>
              <td>postedAt</td>
              <td><span class="type">DateTime</span></td>
              <td>Data de publicação original extraída do LinkedIn</td>
            </tr>
            <tr>
              <td>createdAt</td>
              <td><span class="type">DateTime</span></td>
              <td>Timestamp de inserção no banco local</td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
    <div class="sub-section">
      <h3>Tabela <code>ExecutionLog</code></h3>
      <p>Registra cada execução do worker para monitoramento de saúde e rastreabilidade de erros.</p>
      <div class="env-table-wrap" style="margin-top:10px;">
        <table>
          <thead>
            <tr><th>Campo</th><th>Tipo</th><th>Descrição</th></tr>
          </thead>
          <tbody>
            <tr><td>id <span class="pk">PK</span></td><td><span class="type">Int</span></td><td>Autoincremento</td></tr>
            <tr><td>startedAt</td><td><span class="type">DateTime</span></td><td>Início da execução</td></tr>
            <tr><td>finishedAt</td><td><span class="type">DateTime?</span></td><td>Término (nulo se ainda em andamento)</td></tr>
            <tr><td>jobsFound</td><td><span class="type">Int</span></td><td>Total de vagas coletadas no ciclo</td></tr>
            <tr><td>jobsSent</td><td><span class="type">Int</span></td><td>Vagas novas enviadas ao Telegram</td></tr>
            <tr><td>error</td><td><span class="type">String?</span></td><td>Mensagem de erro, se houver</td></tr>
          </tbody>
        </table>
      </div>
    </div>
  </section>

  <!-- ══════════════ SETUP ══════════════ -->
  <section>
    <p class="section-eyebrow">// instalação</p>
    <h2>Como executar</h2>
    <div class="steps">
      <div class="step">
        <div class="step-number">1</div>
        <div class="step-body">
          <p class="step-title">Clone o repositório</p>
          <div class="code-block">
            <pre>git clone https://github.com/seu-usuario/vagas-hub.git
cd vagas-hub</pre>
          </div>
        </div>
      </div>
      <div class="step">
        <div class="step-number">2</div>
        <div class="step-body">
          <p class="step-title">Instale as dependências</p>
          <div class="code-block">
            <pre>npm install</pre>
          </div>
        </div>
      </div>
      <div class="step">
        <div class="step-number">3</div>
        <div class="step-body">
          <p class="step-title">Configure as variáveis de ambiente</p>
          <p>Crie um arquivo <code>.env</code> na raiz. Veja a tabela de configuração abaixo para detalhes de cada variável.</p>
          <div class="code-block">
            <pre>cp .env.example .env
# edite .env com suas credenciais</pre>
          </div>
        </div>
      </div>
      <div class="step">
        <div class="step-number">4</div>
        <div class="step-body">
          <p class="step-title">Sincronize o banco de dados</p>
          <p>Cria o arquivo <code>vagas.db</code> e aplica o schema do Prisma.</p>
          <div class="code-block">
            <pre>npm run db:push</pre>
          </div>
        </div>
      </div>
      <div class="step">
        <div class="step-number">5</div>
        <div class="step-body">
          <p class="step-title">Execute o worker</p>
          <p>Para um ciclo único de teste:</p>
          <div class="code-block">
            <pre>npm run worker:run-once</pre>
          </div>
          <p style="margin-top:10px;">Para execução contínua via PM2:</p>
          <div class="code-block">
            <pre>pm2 start npm --name "vagas-hub" -- run worker:start
pm2 save</pre>
          </div>
        </div>
      </div>
    </div>
  </section>

  <!-- ══════════════ CONFIG ══════════════ -->
  <section>
    <p class="section-eyebrow">// configuração</p>
    <h2>Variáveis de ambiente (<code>.env</code>)</h2>
    <div class="env-table-wrap" style="margin-top:8px;">
      <table>
        <thead>
          <tr>
            <th>Variável</th>
            <th>Obrigatório</th>
            <th>Descrição e exemplo</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td>DATABASE_URL</td>
            <td><span class="required">req</span></td>
            <td>
              Caminho para o banco SQLite
              <span class="example-val">file:./vagas.db</span>
            </td>
          </tr>
          <tr>
            <td>TELEGRAM_BOT_TOKEN</td>
            <td><span class="required">req</span></td>
            <td>
              Token do bot obtido via @BotFather no Telegram
              <span class="example-val">123456789:AAHx...</span>
            </td>
          </tr>
          <tr>
            <td>TELEGRAM_CHAT_ID</td>
            <td><span class="required">req</span></td>
            <td>
              ID do canal ou grupo onde as vagas serão enviadas
              <span class="example-val">-1001234567890</span>
            </td>
          </tr>
          <tr>
            <td>LINKEDIN_SEARCH_KEYWORDS</td>
            <td><span class="optional">opt</span></td>
            <td>
              Palavras-chave customizadas para a query do LinkedIn
              <span class="example-val">Java Junior OR React Junior OR Vue Junior</span>
            </td>
          </tr>
          <tr>
            <td>LINKEDIN_GEO_ID</td>
            <td><span class="optional">opt</span></td>
            <td>
              ID geográfico do LinkedIn para filtrar por região
              <span class="example-val">106057199 (Brasil)</span>
            </td>
          </tr>
          <tr>
            <td>MAX_PAGES</td>
            <td><span class="optional">opt</span></td>
            <td>
              Número máximo de páginas de resultados a coletar (padrão: 3)
              <span class="example-val">5</span>
            </td>
          </tr>
          <tr>
            <td>NODE_ENV</td>
            <td><span class="optional">opt</span></td>
            <td>
              Ambiente de execução
              <span class="example-val">development | production</span>
            </td>
          </tr>
        </tbody>
      </table>
    </div>
    <div class="callout callout-info" style="margin-top:16px;">
      <span class="callout-icon">💡</span>
      <p class="callout-body">Para encontrar o <strong>Chat ID</strong> do seu canal, adicione o bot como administrador e acesse <code>https://api.telegram.org/bot&lt;TOKEN&gt;/getUpdates</code> após enviar uma mensagem no canal.</p>
    </div>
  </section>

  <!-- ══════════════ ROADMAP ══════════════ -->
  <section>
    <p class="section-eyebrow">// evolução</p>
    <h2>Roadmap</h2>
    <h3 style="margin-top:16px;">Concluído</h3>
    <div class="roadmap" style="margin-top:10px;">
      <div class="roadmap-item done">
        <div class="check-icon check-done">✓</div>
        <div>
          <p class="roadmap-text">Scraping nativo gratuito com Axios + Cheerio</p>
        </div>
      </div>
      <div class="roadmap-item done">
        <div class="check-icon check-done">✓</div>
        <div>
          <p class="roadmap-text">Suporte multi-stack: Front-end (Vue/React/TS) e Back-end (Java/Node)</p>
        </div>
      </div>
      <div class="roadmap-item done">
        <div class="check-icon check-done">✓</div>
        <div>
          <p class="roadmap-text">Blacklist de empresas e paginação profunda</p>
        </div>
      </div>
      <div class="roadmap-item done">
        <div class="check-icon check-done">✓</div>
        <div>
          <p class="roadmap-text">Deduplicação via SQLite (evita reenvio da mesma vaga)</p>
        </div>
      </div>
      <div class="roadmap-item done">
        <div class="check-icon check-done">✓</div>
        <div>
          <p class="roadmap-text">Notificações formatadas em HTML no Telegram</p>
        </div>
      </div>
      <div class="roadmap-item done">
        <div class="check-icon check-done">✓</div>
        <div>
          <p class="roadmap-text">ExecutionLog para rastreabilidade de erros e saúde do worker</p>
        </div>
      </div>
    </div>
    <h3 style="margin-top:24px;">Planejado</h3>
    <div class="roadmap" style="margin-top:10px;">
      <div class="roadmap-item planned">
        <div class="check-icon check-pending"></div>
        <div>
          <p class="roadmap-text">Automação periódica via PM2 + Cron Job</p>
          <p class="roadmap-subtitle">Executar o worker automaticamente a cada N horas sem intervenção manual</p>
        </div>
      </div>
      <div class="roadmap-item planned">
        <div class="check-icon check-pending"></div>
        <div>
          <p class="roadmap-text">IA no Analyzer: substituir heurística por LLM (GPT-4o Mini)</p>
          <p class="roadmap-subtitle">Análise semântica para melhor precisão na triagem de descrições longas</p>
        </div>
      </div>
      <div class="roadmap-item planned">
        <div class="check-icon check-pending"></div>
        <div>
          <p class="roadmap-text">Expansão para Gupy e Indeed</p>
          <p class="roadmap-subtitle">Novos adapters seguindo a mesma interface do linkedin-native.adapter.ts</p>
        </div>
      </div>
      <div class="roadmap-item planned">
        <div class="check-icon check-pending"></div>
        <div>
          <p class="roadmap-text">Painel administrativo web</p>
          <p class="roadmap-subtitle">Interface para visualizar vagas salvas, gerenciar blacklists e ver métricas de execução</p>
        </div>
      </div>
      <div class="roadmap-item planned">
        <div class="check-icon check-pending"></div>
        <div>
          <p class="roadmap-text">Filtros avançados configuráveis</p>
          <p class="roadmap-subtitle">Exclusão por faixa salarial mínima, modelo de trabalho e empresas específicas via .env ou painel</p>
        </div>
      </div>
    </div>
  </section>

  <!-- ══════════════ FOOTER ══════════════ -->
  <footer class="footer">
    <p class="footer-text">Desenvolvido para automatizar a busca de oportunidades em TI nível Júnior no mercado brasileiro.</p>
    <div class="footer-stack">
      <span class="footer-tag">Node.js</span>
      <span class="footer-tag">TypeScript</span>
      <span class="footer-tag">Prisma</span>
      <span class="footer-tag">SQLite</span>
      <span class="footer-tag">Telegram</span>
    </div>
  </footer>

</div>

</body></html>
