/* =====================================================
   IARONE — DESIGN SWITCHER JS
   v0: Iarone v5 Dark | v1: Neon Plexus | v2: Iris Dual
   ===================================================== */

(function () {
  'use strict';

  /* ── CONSTANTS ── */
  const STORAGE_KEY = 'iarone-design-variant';
  const VARIANTS = [
    {
      id: 'v0',
      name: 'Iarone v5 Dark',
      desc: 'Mevcut tasarım · İndigo',
      swatchClass: 'ds-swatch-v0'
    },
    {
      id: 'v1',
      name: 'Neon Plexus',
      desc: 'Siyan/Mor · Parçacık ağı',
      swatchClass: 'ds-swatch-v1'
    },
    {
      id: 'v2',
      name: 'Iris Dual',
      desc: 'Mor hero · Beyaz body',
      swatchClass: 'ds-swatch-v2'
    }
  ];

  /* ── STATE ── */
  let currentVariant = localStorage.getItem(STORAGE_KEY) || 'v0';
  let plexusCanvas = null;
  let plexusCtx = null;
  let plexusAnimId = null;
  let plexusParticles = [];
  let panelOpen = false;

  /* ── APPLY VARIANT ── */
  function applyVariant(id, save) {
    currentVariant = id;
    document.documentElement.setAttribute('data-design', id);
    if (save !== false) localStorage.setItem(STORAGE_KEY, id);

    // Sync active class in panel
    document.querySelectorAll('.ds-option').forEach(opt => {
      opt.classList.toggle('active', opt.dataset.variant === id);
    });

    // Handle Plexus canvas
    if (id === 'v1') {
      startPlexus();
    } else {
      stopPlexus();
    }

    // Handle Iris: force dark logo visible regardless of light theme
    if (id === 'v2') {
      document.documentElement.setAttribute('data-theme', 'dark');
    }
  }

  /* ── PLEXUS BACKGROUND ── */
  function ensurePlexusCanvas() {
    if (plexusCanvas) return;
    plexusCanvas = document.createElement('canvas');
    plexusCanvas.id = 'ds-plexus-canvas';
    plexusCanvas.setAttribute('aria-hidden', 'true');
    document.body.prepend(plexusCanvas);
    plexusCtx = plexusCanvas.getContext('2d');
    resizePlexus();
    window.addEventListener('resize', resizePlexus);
  }

  function resizePlexus() {
    if (!plexusCanvas) return;
    plexusCanvas.width = window.innerWidth;
    plexusCanvas.height = window.innerHeight;
  }

  class PlexusParticle {
    constructor(w, h) {
      this.x = Math.random() * w;
      this.y = Math.random() * h;
      this.vx = (Math.random() - 0.5) * 0.38;
      this.vy = (Math.random() - 0.5) * 0.38;
      this.r = Math.random() * 1.5 + 0.8;
    }
    update(w, h) {
      this.x += this.vx;
      this.y += this.vy;
      if (this.x < 0) this.x = w;
      if (this.x > w) this.x = 0;
      if (this.y < 0) this.y = h;
      if (this.y > h) this.y = 0;
    }
    draw(ctx) {
      ctx.beginPath();
      ctx.arc(this.x, this.y, this.r, 0, Math.PI * 2);
      ctx.fillStyle = 'rgba(0,180,255,0.35)';
      ctx.fill();
    }
  }

  function startPlexus() {
    if (plexusAnimId) return; // already running
    ensurePlexusCanvas();
    const count = window.innerWidth < 768 ? 35 : 70;
    const W = plexusCanvas.width;
    const H = plexusCanvas.height;
    plexusParticles = Array.from({ length: count }, () => new PlexusParticle(W, H));

    function tick() {
      if (document.documentElement.getAttribute('data-design') !== 'v1') {
        plexusAnimId = null;
        plexusCtx.clearRect(0, 0, plexusCanvas.width, plexusCanvas.height);
        return;
      }
      const w = plexusCanvas.width;
      const h = plexusCanvas.height;
      plexusCtx.clearRect(0, 0, w, h);
      const D = 120;

      for (let i = 0; i < plexusParticles.length; i++) {
        const p = plexusParticles[i];
        p.update(w, h);
        p.draw(plexusCtx);
        for (let j = i + 1; j < plexusParticles.length; j++) {
          const q = plexusParticles[j];
          const dx = p.x - q.x;
          const dy = p.y - q.y;
          const dist = Math.sqrt(dx * dx + dy * dy);
          if (dist < D) {
            const alpha = (1 - dist / D) * 0.22;
            plexusCtx.beginPath();
            plexusCtx.moveTo(p.x, p.y);
            plexusCtx.lineTo(q.x, q.y);
            plexusCtx.strokeStyle = `rgba(0,180,255,${alpha})`;
            plexusCtx.lineWidth = 0.7;
            plexusCtx.stroke();
          }
        }
      }
      plexusAnimId = requestAnimationFrame(tick);
    }
    plexusAnimId = requestAnimationFrame(tick);
  }

  function stopPlexus() {
    if (plexusAnimId) {
      cancelAnimationFrame(plexusAnimId);
      plexusAnimId = null;
    }
    if (plexusCtx && plexusCanvas) {
      plexusCtx.clearRect(0, 0, plexusCanvas.width, plexusCanvas.height);
    }
  }

  /* ── BUILD HTML ── */
  function buildSwitcher() {
    // FAB button
    const fab = document.createElement('button');
    fab.id = 'ds-fab';
    fab.title = 'Tasarım Varyasyonu Değiştir';
    fab.setAttribute('aria-label', 'Tasarım varyasyonu değiştir');
    fab.innerHTML = `
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
        <path d="M12 22C6.477 22 2 17.523 2 12S6.477 2 12 2s10 4.477 10 10-4.477 10-10 10z"/>
        <path d="M12 8l4 4-4 4M8 12h8"/>
      </svg>`;

    // Panel
    const panel = document.createElement('div');
    panel.id = 'ds-panel';
    panel.setAttribute('role', 'dialog');
    panel.setAttribute('aria-label', 'Tasarım varyasyonu seçici');
    panel.innerHTML = `
      <div id="ds-panel-header">
        <span id="ds-panel-title">🎨 Tasarım Varyasyonu</span>
        <button id="ds-panel-close" aria-label="Kapat">✕</button>
      </div>
      <div id="ds-options">
        ${VARIANTS.map(v => `
          <div class="ds-option${v.id === currentVariant ? ' active' : ''}" data-variant="${v.id}" role="button" tabindex="0" aria-pressed="${v.id === currentVariant}">
            <div class="ds-swatch ${v.swatchClass}"></div>
            <div class="ds-option-text">
              <span class="ds-option-name">${v.name}</span>
              <span class="ds-option-desc">${v.desc}</span>
            </div>
            <div class="ds-check">
              <svg class="ds-check-svg" viewBox="0 0 12 12" fill="none"><polyline points="1.5,6 5,9.5 10.5,2.5"/></svg>
            </div>
          </div>`).join('')}
      </div>
      <div id="ds-panel-footer">IARONE Demo · Tasarım Sistemi</div>`;

    document.body.appendChild(fab);
    document.body.appendChild(panel);

    /* ── EVENTS ── */
    fab.addEventListener('click', e => {
      e.stopPropagation();
      panelOpen = !panelOpen;
      panel.classList.toggle('open', panelOpen);
      fab.classList.toggle('open', panelOpen);
    });

    document.getElementById('ds-panel-close').addEventListener('click', e => {
      e.stopPropagation();
      panelOpen = false;
      panel.classList.remove('open');
      fab.classList.remove('open');
    });

    document.addEventListener('click', () => {
      if (panelOpen) {
        panelOpen = false;
        panel.classList.remove('open');
        fab.classList.remove('open');
      }
    });

    panel.addEventListener('click', e => e.stopPropagation());

    panel.querySelectorAll('.ds-option').forEach(opt => {
      opt.addEventListener('click', () => {
        const id = opt.dataset.variant;
        applyVariant(id, true);
        panelOpen = false;
        panel.classList.remove('open');
        fab.classList.remove('open');
      });
      opt.addEventListener('keydown', e => {
        if (e.key === 'Enter' || e.key === ' ') {
          e.preventDefault();
          opt.click();
        }
      });
    });
  }

  /* ── INIT ── */
  function init() {
    buildSwitcher();
    applyVariant(currentVariant, false);
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
  } else {
    init();
  }

})();
