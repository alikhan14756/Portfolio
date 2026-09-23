/* ============================================================
   SCRIPT.JS — Muhammad Ali Portfolio v2.0
   Awwwards-Tier: Split-text, Spotlight, Horizontal Scroll,
   Terminal, Drawers, Estimator, Physics Badges, Web Audio
   ============================================================ */

'use strict';

/* ─────────────────────────────────────────────
   UTILITY: isTouchDevice — disables cursor & spotlight on touch
   ───────────────────────────────────────────── */
const isTouchDevice = () =>
  window.matchMedia('(hover: none) and (pointer: coarse)').matches;

/* ─────────────────────────────────────────────
   1. SCROLL PROGRESS BAR
   ───────────────────────────────────────────── */
(function initScrollProgress() {
  const bar = document.createElement('div');
  bar.id = 'scroll-progress-bar';
  document.body.prepend(bar);
  window.addEventListener('scroll', () => {
    const max = document.body.scrollHeight - window.innerHeight;
    bar.style.width = (window.scrollY / max * 100) + '%';
  }, { passive: true });
})();

/* ─────────────────────────────────────────────
   2. PRELOADER
   ───────────────────────────────────────────── */
document.addEventListener('DOMContentLoaded', () => {
  setTimeout(() => {
    const preloader = document.getElementById('preloader');
    if (preloader) {
      preloader.classList.add('hidden');
      setTimeout(() => preloader.remove(), 700);
    }
    try { initSplitText(); } catch(e){}
    try { initCounters(); } catch(e){}
  }, 1200);
});
// Fallback just in case
window.addEventListener('load', () => {
  const preloader = document.getElementById('preloader');
  if (preloader) {
    preloader.classList.add('hidden');
    setTimeout(() => preloader.remove(), 700);
  }
});


/* ─────────────────────────────────────────────
   3. THEME TOGGLE
   ───────────────────────────────────────────── */
(function initTheme() {
  const toggle = document.getElementById('theme-toggle');
  const icon   = document.getElementById('theme-icon');
  if (!toggle) return;

  const syncIcon = () => {
    const t = document.documentElement.getAttribute('data-theme') || 'dark';
    icon.className = t === 'dark' ? 'fas fa-moon' : 'fas fa-sun';
  };
  syncIcon();

  toggle.addEventListener('click', () => {
    const next = document.documentElement.getAttribute('data-theme') === 'dark' ? 'light' : 'dark';
    document.documentElement.setAttribute('data-theme', next);
    localStorage.setItem('theme', next);
    syncIcon();
    playSound('click');
  });
})();

/* ─────────────────────────────────────────────
   4. WEB AUDIO SOUNDS (off by default, zero network overhead)
   ───────────────────────────────────────────── */
let soundEnabled = false;
let audioCtx = null;

function getAudioCtx() {
  if (!audioCtx) audioCtx = new (window.AudioContext || window.webkitAudioContext)();
  return audioCtx;
}

function playSound(type) {
  if (!soundEnabled) return;
  try {
    const ctx = getAudioCtx();
    const osc = ctx.createOscillator();
    const gain = ctx.createGain();
    osc.connect(gain);
    gain.connect(ctx.destination);

    const presets = {
      click:  { freq: 800,  dur: 0.05, type: 'sine',   vol: 0.12 },
      hover:  { freq: 600,  dur: 0.04, type: 'sine',   vol: 0.06 },
      open:   { freq: 440,  dur: 0.12, type: 'triangle',vol: 0.10 },
      close:  { freq: 300,  dur: 0.10, type: 'triangle',vol: 0.08 },
      success:{ freq: 1000, dur: 0.18, type: 'sine',   vol: 0.12 },
    };

    const p = presets[type] || presets.click;
    osc.type = p.type;
    osc.frequency.setValueAtTime(p.freq, ctx.currentTime);
    osc.frequency.exponentialRampToValueAtTime(p.freq * 0.6, ctx.currentTime + p.dur);
    gain.gain.setValueAtTime(p.vol, ctx.currentTime);
    gain.gain.exponentialRampToValueAtTime(0.0001, ctx.currentTime + p.dur + 0.02);

    osc.start(ctx.currentTime);
    osc.stop(ctx.currentTime + p.dur + 0.05);
  } catch (e) { /* silent fail */ }
}

(function initSoundToggle() {
  const btn  = document.getElementById('sound-toggle');
  const icon = document.getElementById('sound-icon');
  if (!btn) return;

  const update = () => {
    icon.className = soundEnabled ? 'fas fa-volume-high' : 'fas fa-volume-xmark';
    btn.title = soundEnabled ? 'Sound: ON' : 'Sound: OFF';
  };
  update();

  btn.addEventListener('click', () => {
    soundEnabled = !soundEnabled;
    update();
    if (soundEnabled) playSound('click');
  });
})();

/* ─────────────────────────────────────────────
   5. PARTICLE CANVAS BACKGROUND
   ───────────────────────────────────────────── */
(function initParticles() {
  const canvas = document.getElementById('particle-canvas');
  if (!canvas) return;
  const ctx = canvas.getContext('2d');
  let W, H, particles = [], mouse = { x: -1000, y: -1000 };

  function resize() {
    W = canvas.width  = window.innerWidth;
    H = canvas.height = window.innerHeight;
  }

  class Particle {
    constructor() { this.reset(); }
    reset() {
      this.x = Math.random() * W;
      this.y = Math.random() * H;
      this.vx = (Math.random() - 0.5) * 0.35;
      this.vy = (Math.random() - 0.5) * 0.35;
      this.r = Math.random() * 1.8 + 0.4;
      this.alpha = Math.random() * 0.45 + 0.08;
      this.color = Math.random() > 0.65 ? '#D4FF00' : '#3b82f6';
    }
    update() {
      const dx = mouse.x - this.x, dy = mouse.y - this.y;
      const dist = Math.hypot(dx, dy);
      if (dist < 110) { this.x -= dx * 0.018; this.y -= dy * 0.018; }
      this.x += this.vx;
      this.y += this.vy;
      if (this.x < 0 || this.x > W || this.y < 0 || this.y > H) this.reset();
    }
    draw() {
      ctx.save();
      ctx.globalAlpha = this.alpha;
      ctx.fillStyle = this.color;
      ctx.beginPath();
      ctx.arc(this.x, this.y, this.r, 0, Math.PI * 2);
      ctx.fill();
      ctx.restore();
    }
  }

  function connect() {
    for (let i = 0; i < particles.length; i++) {
      for (let j = i + 1; j < particles.length; j++) {
        const dx = particles[i].x - particles[j].x;
        const dy = particles[i].y - particles[j].y;
        const d = Math.hypot(dx, dy);
        if (d < 90) {
          ctx.save();
          ctx.globalAlpha = (1 - d / 90) * 0.12;
          ctx.strokeStyle = '#D4FF00';
          ctx.lineWidth = 0.5;
          ctx.beginPath();
          ctx.moveTo(particles[i].x, particles[i].y);
          ctx.lineTo(particles[j].x, particles[j].y);
          ctx.stroke();
          ctx.restore();
        }
      }
    }
  }

  function loop() {
    ctx.clearRect(0, 0, W, H);
    particles.forEach(p => { p.update(); p.draw(); });
    connect();
    requestAnimationFrame(loop);
  }

  resize();
  for (let i = 0; i < 75; i++) particles.push(new Particle());
  window.addEventListener('resize', resize, { passive: true });
  window.addEventListener('mousemove', e => { mouse.x = e.clientX; mouse.y = e.clientY; }, { passive: true });
  loop();
})();

/* ─────────────────────────────────────────────
   6. CUSTOM CURSOR + SPOTLIGHT (desktop only)
   ───────────────────────────────────────────── */
(function initCursor() {
  if (isTouchDevice()) return;

  const dot      = document.getElementById('cursor-dot');
  const ring     = document.getElementById('cursor-ring');
  const label    = document.getElementById('cursor-label');
  const spotlight= document.getElementById('cursor-spotlight');
  if (!dot || !ring) return;

  let dotX = 0, dotY = 0, ringX = 0, ringY = 0;

  document.addEventListener('mousemove', e => {
    dotX = e.clientX;
    dotY = e.clientY;
    if (spotlight) {
      spotlight.style.left = dotX + 'px';
      spotlight.style.top  = dotY + 'px';
    }
  }, { passive: true });

  function tick() {
    dot.style.left = dotX + 'px';
    dot.style.top  = dotY + 'px';
    ringX += (dotX - ringX) * 0.11;
    ringY += (dotY - ringY) * 0.11;
    ring.style.left = ringX + 'px';
    ring.style.top  = ringY + 'px';
    requestAnimationFrame(tick);
  }
  tick();

  // Hover effects
  function addHover(selector, cursorLabel, textMode) {
    document.querySelectorAll(selector).forEach(el => {
      el.addEventListener('mouseenter', () => {
        if (textMode) {
          ring.classList.add('hovered-text');
          if (label) label.textContent = cursorLabel;
        } else {
          ring.classList.add('hovered');
        }
        playSound('hover');
      });
      el.addEventListener('mouseleave', () => {
        ring.classList.remove('hovered', 'hovered-text');
        if (label) label.textContent = '';
      });
    });
  }

  addHover('.btn-primary, .btn-whatsapp, .est-wa-btn', 'GO →', true);
  addHover('.btn-secondary, .btn-resume, .btn-email', 'OPEN', true);
  addHover('.bento-card, .open-drawer-btn', 'CASE →', true);
  addHover('.project-title-hover', 'VIEW →', true);
  addHover('a[href^="#"], .nav-link, .mobile-nav-link', '', false);
  addHover('.service-card, .testi-card, .blog-card, .playground-card', '', false);
})();

/* ─────────────────────────────────────────────
   7. NAVBAR — scroll + active link + hamburger
   ───────────────────────────────────────────── */
(function initNavbar() {
  const navbar    = document.getElementById('navbar');
  const hamburger = document.getElementById('hamburger');
  const overlay   = document.getElementById('mobile-nav-overlay');
  const closeBtn  = document.getElementById('mobile-nav-close');
  const mobileLinks = document.querySelectorAll('.mobile-nav-link');
  const navLinks  = document.querySelectorAll('.nav-link');
  const bttBtn    = document.getElementById('back-to-top');

  const closeMobile = () => {
    hamburger?.classList.remove('active');
    hamburger?.setAttribute('aria-expanded', 'false');
    overlay?.classList.remove('open');
    document.body.style.overflow = '';
  };

  window.addEventListener('scroll', () => {
    navbar?.classList.toggle('scrolled', window.scrollY > 20);
    bttBtn?.classList.toggle('visible', window.scrollY > 400);

    const sections = document.querySelectorAll('section[id]');
    let current = '';
    sections.forEach(s => {
      if (window.scrollY >= s.offsetTop - 140) current = s.id;
    });
    navLinks.forEach(l =>
      l.classList.toggle('active', l.getAttribute('href') === '#' + current)
    );
  }, { passive: true });

  hamburger?.addEventListener('click', () => {
    const isOpen = overlay?.classList.contains('open');
    if (isOpen) {
      closeMobile();
    } else {
      hamburger.classList.add('active');
      hamburger.setAttribute('aria-expanded', 'true');
      overlay?.classList.add('open');
      document.body.style.overflow = 'hidden';
    }
    playSound('click');
  });

  closeBtn?.addEventListener('click', closeMobile);
  mobileLinks.forEach(l => l.addEventListener('click', closeMobile));

  bttBtn?.addEventListener('click', () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
    playSound('click');
  });
})();

/* ─────────────────────────────────────────────
   8. SCROLL REVEAL (Intersection Observer)
   ───────────────────────────────────────────── */
(function initScrollReveal() {
  const io = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (!entry.isIntersecting) return;
      const el = entry.target;
      const delay = parseInt(el.dataset.delay || 0);
      setTimeout(() => {
        el.classList.add('revealed');
        // Trigger skill rings
        el.querySelectorAll('.skill-ring-fill').forEach(animateRing);
      }, delay);
      io.unobserve(el);
    });
  }, { threshold: 0.1, rootMargin: '0px 0px -40px 0px' });

  // Stagger delays on grid items
  document.querySelectorAll('.bento-grid .bento-card').forEach((el, i) => { el.dataset.delay = i * 80; });
  document.querySelectorAll('.playground-grid .playground-card').forEach((el, i) => { el.dataset.delay = i * 70; });
  document.querySelectorAll('.services-grid .service-card').forEach((el, i) => { el.dataset.delay = i * 90; });
  document.querySelectorAll('.blog-grid .blog-card').forEach((el, i) => { el.dataset.delay = i * 90; });
  document.querySelectorAll('.skills-rings-grid .skill-ring-item').forEach((el, i) => { el.dataset.delay = i * 80; });

  document.querySelectorAll('.reveal-up, .reveal-left, .reveal-right').forEach(el => {
    if (!el.closest('.hero')) io.observe(el);
  });
})();

/* ─────────────────────────────────────────────
   9. SPLIT-TEXT HERO ANIMATION
   ───────────────────────────────────────────── */
function initSplitText() {
  const words = document.querySelectorAll('.split-word .w');
  words.forEach((w, i) => {
    setTimeout(() => w.classList.add('revealed'), 200 + i * 120);
  });
}

/* ─────────────────────────────────────────────
   10. HERO ROTATING WORD
   ───────────────────────────────────────────── */
(function initRotatingWord() {
  const el = document.getElementById('hero-rotating-word');
  if (!el) return;
  const words = ['Convert.', 'Impress.', 'Perform.', 'Win.'];
  let idx = 0;

  setInterval(() => {
    el.style.opacity = '0';
    setTimeout(() => {
      idx = (idx + 1) % words.length;
      el.textContent = words[idx];
      el.style.opacity = '1';
    }, 300);
  }, 3200);
})();

/* ─────────────────────────────────────────────
   11. COUNTER ANIMATION
   ───────────────────────────────────────────── */
function initCounters() {
  document.querySelectorAll('.stat-number').forEach(el => {
    const target = parseInt(el.dataset.target);
    const duration = 1800;
    const start = performance.now();
    function update(now) {
      const t = Math.min((now - start) / duration, 1);
      const eased = 1 - Math.pow(1 - t, 4);
      el.textContent = Math.floor(eased * target);
      if (t < 1) requestAnimationFrame(update);
      else el.textContent = target;
    }
    requestAnimationFrame(update);
  });
}

/* ─────────────────────────────────────────────
   12. CSS 3D BADGE PARALLAX (mouse-based, no physics engine)
   ───────────────────────────────────────────── */
(function initBadgeParallax() {
  if (isTouchDevice()) return;
  const badges = document.querySelectorAll('.float-badge');
  if (!badges.length) return;

  const heroEl = document.querySelector('.hero');

  document.addEventListener('mousemove', e => {
    if (!heroEl) return;
    const rect = heroEl.getBoundingClientRect();
    if (e.clientY < rect.top || e.clientY > rect.bottom) return;

    const cx = window.innerWidth / 2;
    const cy = window.innerHeight / 2;
    const dx = (e.clientX - cx) / cx;
    const dy = (e.clientY - cy) / cy;

    badges.forEach(badge => {
      const depth = parseFloat(badge.dataset.depth || 1);
      const mx = dx * depth * 14;
      const my = dy * depth * 14;
      badge.style.transform = `translate(${mx}px, ${my}px)`;
    });
  }, { passive: true });
})();

/* ─────────────────────────────────────────────
   13. SVG SKILL RING ANIMATION
   ───────────────────────────────────────────── */
function animateRing(ring) {
  const pct = parseFloat(ring.dataset.pct) || 0;
  const r = parseFloat(ring.getAttribute('r'));
  const circ = 2 * Math.PI * r;
  ring.style.strokeDasharray = circ;
  ring.style.strokeDashoffset = circ;
  requestAnimationFrame(() => {
    ring.style.strokeDashoffset = circ - (pct / 100) * circ;
  });
}

/* ─────────────────────────────────────────────
   14. HORIZONTAL SCROLL PIN (desktop ≥1024px only)
   Vanilla JS, no GSAP dependency
   ───────────────────────────────────────────── */
(function initFeaturedScroll() {
  if (window.innerWidth < 1024) return;

  const section   = document.getElementById('featured');
  const wrapper   = document.getElementById('featured-pin-wrapper');
  const container = document.getElementById('featured-container');
  const dots      = document.querySelectorAll('.featured-dot');

  if (!section || !container) return;

  const cards = container.querySelectorAll('.featured-card');
  const total = cards.length;
  if (!total) return;

  let currentIdx = 0;

  function goToCard(idx) {
    currentIdx = Math.max(0, Math.min(total - 1, idx));
    const translateX = currentIdx * -100;
    container.style.transform = `translateX(${translateX}vw)`;
    container.style.transition = 'transform 0.6s cubic-bezier(0.22, 1, 0.36, 1)';
    dots.forEach((d, i) => d.classList.toggle('active', i === currentIdx));
    cards.forEach((c, i) => c.classList.toggle('active-card', i === currentIdx));
  }

  // Style the container for desktop pinning
  container.style.display = 'flex';
  container.style.width = `${total * 100}vw`;
  container.style.overflow = 'visible';
  cards.forEach(c => {
    c.style.flex = `0 0 100vw`;
    c.style.maxWidth = '100vw';
    c.style.width = '100vw';
  });

  // Scroll-driven: detect scroll within the section's "virtual track"
  const trackHeight = window.innerHeight * (total + 0.5);

  // Insert spacer so the section creates scroll room
  const spacer = document.createElement('div');
  spacer.style.height = `${trackHeight}px`;
  spacer.style.pointerEvents = 'none';
  section.style.position = 'relative';
  section.appendChild(spacer);

  // Pin the wrapper
  wrapper.style.position = 'sticky';
  wrapper.style.top = '0';
  wrapper.style.zIndex = '10';

  let ticking = false;
  window.addEventListener('scroll', () => {
    if (ticking) return;
    requestAnimationFrame(() => {
      const sectionTop = section.getBoundingClientRect().top + window.scrollY;
      const scrolled   = window.scrollY - sectionTop;
      const progress   = scrolled / (trackHeight - window.innerHeight);
      const rawIdx     = Math.floor(progress * total);
      const clamped    = Math.max(0, Math.min(total - 1, rawIdx));
      if (clamped !== currentIdx) goToCard(clamped);
      ticking = false;
    });
    ticking = true;
  }, { passive: true });

  // Dot clicks
  dots.forEach(d => d.addEventListener('click', () => goToCard(parseInt(d.dataset.idx || 0))));

  goToCard(0);
})();

/* ─────────────────────────────────────────────
   15. CURSOR-ATTACHED PROJECT PREVIEW (desktop only)
   ───────────────────────────────────────────── */
(function initProjectPreview() {
  if (isTouchDevice()) return;

  const previewEl  = document.getElementById('project-preview-cursor');
  const previewImg = document.getElementById('project-preview-img');
  if (!previewEl || !previewImg) return;

  let rafId;

  document.querySelectorAll('.project-title-hover').forEach(el => {
    const src = el.dataset.preview;
    if (!src) return;

    el.addEventListener('mouseenter', () => {
      previewImg.src = src;
      previewEl.classList.add('visible');
    });

    el.addEventListener('mousemove', e => {
      cancelAnimationFrame(rafId);
      rafId = requestAnimationFrame(() => {
        previewEl.style.left = e.clientX + 'px';
        previewEl.style.top  = e.clientY + 'px';
      });
    });

    el.addEventListener('mouseleave', () => {
      previewEl.classList.remove('visible');
      cancelAnimationFrame(rafId);
    });
  });
})();

/* ─────────────────────────────────────────────
   16. CASE STUDY DRAWERS
   — Body scroll lock, ESC close, overlay close
   ───────────────────────────────────────────── */
(function initCaseDrawers() {
  const overlay = document.getElementById('drawer-overlay');
  let activeDrawer = null;

  function openDrawer(id) {
    const drawer = document.getElementById('drawer-' + id);
    if (!drawer) return;

    // Close any open drawer first
    if (activeDrawer && activeDrawer !== drawer) closeDrawer();

    activeDrawer = drawer;
    drawer.classList.add('open');
    drawer.setAttribute('aria-hidden', 'false');
    overlay?.classList.add('open');

    // Scroll lock
    document.body.style.overflow = 'hidden';

    // Focus close button for a11y
    const closeBtn = drawer.querySelector('.drawer-close-btn');
    setTimeout(() => closeBtn?.focus(), 100);

    playSound('open');
  }

  function closeDrawer() {
    if (!activeDrawer) return;
    activeDrawer.classList.remove('open');
    activeDrawer.setAttribute('aria-hidden', 'true');
    overlay?.classList.remove('open');
    document.body.style.overflow = '';
    activeDrawer = null;
    playSound('close');
  }

  // Open buttons (cards, bento, featured)
  document.querySelectorAll('.open-drawer-btn').forEach(btn => {
    btn.addEventListener('click', () => {
      const id = btn.dataset.drawer;
      if (id) { openDrawer(id); }
    });
    // Keyboard support
    btn.addEventListener('keydown', e => {
      if (e.key === 'Enter' || e.key === ' ') {
        e.preventDefault();
        const id = btn.dataset.drawer;
        if (id) openDrawer(id);
      }
    });
  });

  // Close buttons inside drawers
  document.querySelectorAll('.drawer-close-btn').forEach(btn => {
    btn.addEventListener('click', closeDrawer);
  });

  // Overlay click closes
  overlay?.addEventListener('click', closeDrawer);

  // ESC key closes
  document.addEventListener('keydown', e => {
    if (e.key === 'Escape' && activeDrawer) closeDrawer();
  });
})();

/* ─────────────────────────────────────────────
   17. TERMINAL DRAWER
   — Commands, history, tab-complete, chips, ESC
   ───────────────────────────────────────────── */
(function initTerminal() {
  const drawer  = document.getElementById('terminal-drawer');
  const overlay = document.getElementById('terminal-overlay');
  const input   = document.getElementById('terminal-input');
  const output  = document.getElementById('terminal-output');
  const openBtns = [
    document.getElementById('terminal-float-btn'),
    document.getElementById('nav-terminal-btn'),
  ];
  const closeBtn = document.getElementById('terminal-close-btn');

  if (!drawer) return;

  let history = [], histIdx = -1;

  function openTerminal() {
    drawer.classList.add('open');
    drawer.setAttribute('aria-hidden', 'false');
    overlay?.classList.add('open');
    document.body.style.overflow = 'hidden';
    setTimeout(() => input?.focus(), 300);
    playSound('open');
  }

  function closeTerminal() {
    drawer.classList.remove('open');
    drawer.setAttribute('aria-hidden', 'true');
    overlay?.classList.remove('open');
    document.body.style.overflow = '';
    playSound('close');
  }

  openBtns.forEach(btn => btn?.addEventListener('click', openTerminal));
  closeBtn?.addEventListener('click', closeTerminal);
  overlay?.addEventListener('click', closeTerminal);

  // Keyboard shortcuts
  document.addEventListener('keydown', e => {
    if ((e.ctrlKey || e.metaKey) && e.key === 'k') {
      e.preventDefault();
      drawer.classList.contains('open') ? closeTerminal() : openTerminal();
    }
    if (e.key === '`' && !drawer.classList.contains('open') &&
        document.activeElement.tagName !== 'INPUT' &&
        document.activeElement.tagName !== 'TEXTAREA') {
      openTerminal();
    }
    if (e.key === 'Escape' && drawer.classList.contains('open')) {
      closeTerminal();
    }
  });

  // Traffic light red dot = close
  document.querySelector('.td-red')?.addEventListener('click', closeTerminal);

  // Command definitions
  const COMMANDS = {
    help: () => [
      { cls: 'accent',  text: '╔══════════════════════════════╗' },
      { cls: 'accent',  text: '║  Available Commands          ║' },
      { cls: 'accent',  text: '╚══════════════════════════════╝' },
      { cls: '',        text: '  about     → about me' },
      { cls: '',        text: '  projects  → all projects' },
      { cls: '',        text: '  skills    → skills & stack' },
      { cls: '',        text: '  contact   → contact info' },
      { cls: '',        text: '  hire      → open WhatsApp' },
      { cls: '',        text: '  blog      → latest articles' },
      { cls: '',        text: '  clear     → clear terminal' },
      { cls: 'dim',     text: '  ─────────────────────────────' },
      { cls: 'dim',     text: '  Tip: Use ↑/↓ for history, Tab to complete' },
    ],

    about: () => [
      { cls: 'accent',  text: '┌─ ABOUT ─────────────────────────────' },
      { cls: '',        text: '│  Muhammad Ali' },
      { cls: '',        text: '│  Frontend Developer & Digital Creator' },
      { cls: '',        text: '│  📍 Pakistan' },
      { cls: 'dim',     text: '│' },
      { cls: '',        text: '│  I build fast, beautiful websites for' },
      { cls: '',        text: '│  businesses using WordPress, Elementor,' },
      { cls: '',        text: '│  and clean vanilla code.' },
      { cls: 'dim',     text: '│' },
      { cls: 'accent',  text: '│  2+ yrs experience │ 10+ projects' },
      { cls: 'accent',  text: '└────────────────────────────────────' },
    ],

    projects: () => [
      { cls: 'accent',  text: '┌─ PROJECTS ───────────────────────────' },
      { cls: '',        text: '│  CLIENT WORK:' },
      { cls: 'accent',  text: '│  [1] ivanalexx.com     → live site' },
      { cls: 'accent',  text: '│  [2] Arshad Tiles      → arshadtiles.com' },
      { cls: 'accent',  text: '│  [3] Malik Hassan Vet  → vetclinic site' },
      { cls: 'accent',  text: '│  [4] Shah-Sweet        → shah-sweet.com' },
      { cls: 'dim',     text: '│' },
      { cls: '',        text: '│  PLAYGROUND:' },
      { cls: '',        text: '│  [5] Quiz App  [6] Calculator' },
      { cls: '',        text: '│  [7] Animation [8] Ball Bounce' },
      { cls: '',        text: '│  [9] QR Generator' },
      { cls: 'dim',     text: '└────────────────────────────────────' },
    ],

    skills: () => [
      { cls: 'accent',  text: '┌─ SKILLS ─────────────────────────────' },
      { cls: '',        text: '│  WordPress   ██████████ 90%' },
      { cls: '',        text: '│  Elementor   ██████████ 90%' },
      { cls: '',        text: '│  Responsive  ██████████ 90%' },
      { cls: '',        text: '│  HTML/CSS    █████████░ 85%' },
      { cls: '',        text: '│  JavaScript  ████████░░ 80%' },
      { cls: '',        text: '│  UI/UX       █████████░ 88%' },
      { cls: 'dim',     text: '│' },
      { cls: 'accent',  text: '│  Currently learning:' },
      { cls: '',        text: '│  React │ GSAP │ Next.js │ Three.js' },
      { cls: 'dim',     text: '└────────────────────────────────────' },
    ],

    contact: () => [
      { cls: 'accent',  text: '┌─ CONTACT ────────────────────────────' },
      { cls: '',        text: '│  📧 alikhanwebdeveloper@gmail.com' },
      { cls: '',        text: '│  📱 +92 305 5389967 (WhatsApp)' },
      { cls: '',        text: '│  📍 Pakistan' },
      { cls: 'dim',     text: '│' },
      { cls: 'accent',  text: '│  🟢 Available for freelance projects' },
      { cls: 'dim',     text: '└────────────────────────────────────' },
    ],

    hire: () => {
      setTimeout(() => window.open('https://wa.me/923055389967?text=Hi%20Ali%2C%20I%20found%20you%20via%20your%20portfolio%20terminal!', '_blank'), 500);
      return [
        { cls: 'accent',  text: '▶ Opening WhatsApp...' },
        { cls: '',        text: '  Connecting to +92 305 5389967' },
        { cls: 'accent',  text: '  ✓ WhatsApp opened!' },
      ];
    },

    blog: () => [
      { cls: 'accent',  text: '┌─ BLOG ───────────────────────────────' },
      { cls: '',        text: '│  [1] WordPress Speed Optimization' },
      { cls: 'dim',     text: '│      May 18, 2026 · 5 min read' },
      { cls: '',        text: '│  [2] Mastering Elementor Templates' },
      { cls: 'dim',     text: '│      May 10, 2026 · 8 min read' },
      { cls: '',        text: '│  [3] Immersive Scroll Animations' },
      { cls: 'dim',     text: '│      Apr 28, 2026 · 6 min read' },
      { cls: 'dim',     text: '└────────────────────────────────────' },
    ],

    clear: () => {
      output.innerHTML = '';
      return [];
    },
  };

  const CMD_KEYS = Object.keys(COMMANDS);

  function print(lines) {
    lines.forEach(({ cls, text }) => {
      const div = document.createElement('div');
      div.className = 'term-line' + (cls ? ` term-line--${cls}` : '');
      div.textContent = text;
      output.appendChild(div);
    });
    // Scroll to bottom
    const body = document.getElementById('terminal-body');
    if (body) body.scrollTop = body.scrollHeight;
  }

  function run(cmd) {
    cmd = cmd.trim().toLowerCase();
    if (!cmd) return;

    // Print the typed command
    const cmdLine = document.createElement('div');
    cmdLine.className = 'term-line term-line--cmd';
    cmdLine.textContent = cmd;
    output.appendChild(cmdLine);

    if (COMMANDS[cmd]) {
      const result = COMMANDS[cmd]();
      if (result && result.length) print(result);
    } else {
      print([
        { cls: 'error', text: `Command not found: ${cmd}` },
        { cls: 'dim',   text: 'Type "help" for available commands.' },
      ]);
    }

    // Add to history
    if (history[history.length - 1] !== cmd) history.push(cmd);
    histIdx = history.length;

    const body = document.getElementById('terminal-body');
    if (body) body.scrollTop = body.scrollHeight;
    playSound('click');
  }

  // Input handling
  input?.addEventListener('keydown', e => {
    if (e.key === 'Enter') {
      run(input.value);
      input.value = '';
    } else if (e.key === 'ArrowUp') {
      e.preventDefault();
      if (histIdx > 0) { histIdx--; input.value = history[histIdx]; }
    } else if (e.key === 'ArrowDown') {
      e.preventDefault();
      if (histIdx < history.length - 1) { histIdx++; input.value = history[histIdx]; }
      else { histIdx = history.length; input.value = ''; }
    } else if (e.key === 'Tab') {
      e.preventDefault();
      const partial = input.value.toLowerCase();
      const match = CMD_KEYS.find(k => k.startsWith(partial) && k !== partial);
      if (match) input.value = match;
    }
  });

  // Quick-action chips
  document.querySelectorAll('.term-chip').forEach(chip => {
    chip.addEventListener('click', () => {
      const cmd = chip.dataset.cmd;
      if (cmd) { run(cmd); }
    });
  });
})();

/* ─────────────────────────────────────────────
   18. 3-STEP PROJECT ESTIMATOR
   — WhatsApp pre-filled message on Step 3
   ───────────────────────────────────────────── */
(function initEstimator() {
  let selectedType = null, selectedMinBase = 0, selectedMaxBase = 0, selectedBaseTime = '';

  const steps    = [1, 2, 3].map(i => document.getElementById(`est-step-${i}`));
  const stepDots = document.querySelectorAll('.est-step-dot');
  const next1    = document.getElementById('est-next-1');
  const next2    = document.getElementById('est-next-2');
  const back2    = document.getElementById('est-back-2');
  const restart  = document.getElementById('est-restart');
  const waBtn    = document.getElementById('est-wa-btn');
  const options  = document.querySelectorAll('.est-option');

  if (!steps[0]) return;

  function showStep(n) {
    steps.forEach((s, i) => s?.classList.toggle('active', i === n - 1));
    stepDots.forEach((d, i) => d?.classList.toggle('active', i <= n - 1));
    playSound('click');
  }

  // Step 1: option selection
  options.forEach(opt => {
    opt.addEventListener('click', () => {
      options.forEach(o => o.classList.remove('selected'));
      opt.classList.add('selected');
      selectedType     = opt.dataset.type;
      selectedMinBase  = parseInt(opt.dataset.baseMin) || 0;
      selectedMaxBase  = parseInt(opt.dataset.baseMax) || 0;
      selectedBaseTime = opt.dataset.baseTime || '';
      if (next1) next1.disabled = false;
      playSound('click');
    });
  });

  next1?.addEventListener('click', () => { if (selectedType) showStep(2); });
  back2?.addEventListener('click', () => showStep(1));

  next2?.addEventListener('click', () => {
    // Calculate totals
    let addMin = 0, addMax = 0, addDays = 0;
    const selectedFeatures = [];

    document.querySelectorAll('.est-feature-cb input:checked').forEach(cb => {
      addMin += parseInt(cb.dataset.addMin) || 0;
      addMax += parseInt(cb.dataset.addMax) || 0;
      addDays += parseInt(cb.dataset.addDays) || 0;
      const feat = cb.dataset.feature;
      if (feat && feat !== 'WhatsApp Integration') selectedFeatures.push(feat);
    });

    const totalMin = selectedMinBase + addMin;
    const totalMax = selectedMaxBase + addMax;

    // Parse timeline
    const baseWeeks = parseInt(selectedBaseTime) || 2;
    const extraDaysToWeeks = Math.ceil(addDays / 7);
    const timelineStr = addDays > 0
      ? `${selectedBaseTime} + ~${addDays} days extra`
      : selectedBaseTime;

    // Update UI
    document.getElementById('est-price-value').textContent    = `$${totalMin} – $${totalMax}`;
    document.getElementById('est-timeline-value').textContent = timelineStr;

    const summary = document.getElementById('est-summary-list');
    const allFeats = ['WhatsApp Integration'];
    document.querySelectorAll('.est-feature-cb input:checked').forEach(cb => {
      if (cb.dataset.feature) allFeats.push(cb.dataset.feature);
    });
    summary.textContent = `Service: ${selectedType}\nIncludes: ${allFeats.join(', ')}`;

    // WhatsApp pre-filled message
    waBtn.onclick = () => {
      const msg = encodeURIComponent(
        `Hi Ali, I used your portfolio estimator!\n\n` +
        `• Service: ${selectedType}\n` +
        `• Features: ${allFeats.join(', ')}\n` +
        `• Est. Budget: $${totalMin} – $${totalMax}\n` +
        `• Est. Timeline: ${timelineStr}\n\n` +
        `Let's discuss my project!`
      );
      window.open(`https://wa.me/923055389967?text=${msg}`, '_blank');
      playSound('success');
    };

    showStep(3);
  });

  restart?.addEventListener('click', () => {
    selectedType = null; selectedMinBase = 0; selectedMaxBase = 0; selectedBaseTime = '';
    options.forEach(o => o.classList.remove('selected'));
    document.querySelectorAll('.est-feature-cb input').forEach(cb => {
      cb.checked = cb.dataset.feature === 'Speed Optimization' || cb.dataset.feature === 'WhatsApp Integration';
    });
    if (next1) next1.disabled = true;
    showStep(1);
  });
})();

/* ─────────────────────────────────────────────
   19. TESTIMONIALS SLIDER
   ───────────────────────────────────────────── */
(function initTestimonials() {
  const slider = document.getElementById('testimonials-slider');
  const dots   = document.querySelectorAll('.testi-dot');
  const prevBtn= document.getElementById('testi-prev');
  const nextBtn= document.getElementById('testi-next');
  if (!slider) return;

  const isMobile = () => window.innerWidth < 900;

  function updateDots() {
    if (!isMobile()) return;
    const cardW = slider.children[0]?.offsetWidth || 0;
    const idx   = Math.round(slider.scrollLeft / (cardW + 24));
    dots.forEach((d, i) => d.classList.toggle('active', i === idx));
  }

  function goTo(idx) {
    if (!isMobile()) return;
    const cardW = slider.children[0]?.offsetWidth || 0;
    slider.scrollTo({ left: idx * (cardW + 24), behavior: 'smooth' });
  }

  function getIdx() {
    const cardW = slider.children[0]?.offsetWidth || 0;
    return Math.round(slider.scrollLeft / (cardW + 24));
  }

  slider.addEventListener('scroll', updateDots, { passive: true });
  dots.forEach(d => d.addEventListener('click', () => goTo(parseInt(d.dataset.index || 0))));

  prevBtn?.addEventListener('click', () => { goTo(Math.max(0, getIdx() - 1)); playSound('click'); });
  nextBtn?.addEventListener('click', () => { goTo(Math.min(2, getIdx() + 1)); playSound('click'); });

  // Auto-slide on mobile
  let autoId;
  function startAuto() {
    if (!isMobile()) return;
    autoId = setInterval(() => goTo((getIdx() + 1) % 3), 4500);
  }
  function stopAuto() { clearInterval(autoId); }

  slider.addEventListener('touchstart', stopAuto, { passive: true });
  slider.addEventListener('touchend', startAuto, { passive: true });
  slider.addEventListener('mouseenter', stopAuto);
  slider.addEventListener('mouseleave', startAuto);

  startAuto();
  window.addEventListener('resize', () => { stopAuto(); startAuto(); });
})();

/* ─────────────────────────────────────────────
   20. CONTACT FORM — WhatsApp + Email buttons
   ───────────────────────────────────────────── */
(function initContactForm() {
  const form    = document.getElementById('contact-form');
  const waBtn   = document.getElementById('whatsapp-btn');
  const emailBtn= document.getElementById('email-btn');
  if (!form) return;

  function getData() {
    return {
      name:    document.getElementById('name')?.value?.trim()    || '',
      email:   document.getElementById('email')?.value?.trim()   || '',
      subject: document.getElementById('subject')?.value?.trim() || '',
      message: document.getElementById('message')?.value?.trim() || '',
    };
  }

  function validate() {
    const { name, email, subject, message } = getData();
    if (!name || !email || !subject || !message) { form.reportValidity(); return false; }
    return true;
  }

  function flashSuccess(btn, txt) {
    const span = btn.querySelector('span');
    const orig = span.textContent;
    span.textContent = txt;
    btn.style.opacity = '0.8';
    form.reset();
    setTimeout(() => { span.textContent = orig; btn.style.opacity = '1'; }, 3000);
    playSound('success');
  }

  waBtn?.addEventListener('click', () => {
    if (!validate()) return;
    const { name, email, subject, message } = getData();
    waBtn.querySelector('span').textContent = 'Opening...';
    const text = encodeURIComponent(
      `*New Message from Portfolio*\n\n*Name:* ${name}\n*Email:* ${email}\n*Subject:* ${subject}\n*Message:* ${message}`
    );
    setTimeout(() => {
      window.open(`https://wa.me/923055389967?text=${text}`, '_blank');
      flashSuccess(waBtn, '✓ Sent via WhatsApp!');
    }, 600);
  });

  emailBtn?.addEventListener('click', () => {
    if (!validate()) return;
    const { name, email, subject, message } = getData();
    emailBtn.querySelector('span').textContent = 'Opening...';
    const body = `Hi Muhammad Ali,%0A%0AMy name is ${encodeURIComponent(name)} (${encodeURIComponent(email)}).%0A%0A${encodeURIComponent(message)}%0A%0ABest regards,%0A${encodeURIComponent(name)}`;
    setTimeout(() => {
      window.location.href = `mailto:alikhan1475623a@gmail.com?subject=${encodeURIComponent(subject)}&body=${body}`;
      flashSuccess(emailBtn, '✓ Email client opened!');
    }, 600);
  });

  form.addEventListener('submit', e => e.preventDefault());
})();

/* ─────────────────────────────────────────────
   21. MAGNETIC BUTTONS
   ───────────────────────────────────────────── */
(function initMagnetic() {
  if (isTouchDevice()) return;

  document.querySelectorAll('.magnetic-btn, .btn-primary, .btn-secondary').forEach(btn => {
    btn.addEventListener('mousemove', e => {
      const rect = btn.getBoundingClientRect();
      const x = (e.clientX - rect.left - rect.width  / 2) * 0.22;
      const y = (e.clientY - rect.top  - rect.height / 2) * 0.22;
      btn.style.transform = `translate(${x}px, ${y}px) translateY(-2px)`;
    });
    btn.addEventListener('mouseleave', () => { btn.style.transform = ''; });
  });
})();

/* ─────────────────────────────────────────────
   22. 3D CARD TILT (project/service cards)
   ───────────────────────────────────────────── */
(function initTilt() {
  if (isTouchDevice()) return;

  document.querySelectorAll('.service-card, .playground-card, .blog-card, .testi-card').forEach(card => {
    card.addEventListener('mousemove', e => {
      const rect = card.getBoundingClientRect();
      const x = e.clientX - rect.left, y = e.clientY - rect.top;
      const cx = rect.width / 2, cy = rect.height / 2;
      const rx = ((y - cy) / cy) * 5;
      const ry = ((cx - x) / cx) * 5;
      card.style.transform = `perspective(800px) rotateX(${rx}deg) rotateY(${ry}deg) translateY(-4px)`;
    });
    card.addEventListener('mouseleave', () => { card.style.transform = ''; });
  });
})();

/* ─────────────────────────────────────────────
   23. HOVER SHINE ON CARDS
   ───────────────────────────────────────────── */
(function initShine() {
  document.querySelectorAll('.service-card, .testi-card, .case-block').forEach(card => {
    card.style.position = 'relative';
    card.style.overflow = 'hidden';
    const shine = document.createElement('div');
    shine.style.cssText = `
      position:absolute; top:0; left:-100%; width:60%; height:100%;
      background:linear-gradient(90deg,transparent,rgba(255,255,255,0.04),transparent);
      transform:skewX(-15deg); transition:left 0.5s ease; pointer-events:none; z-index:1;
    `;
    card.appendChild(shine);
    card.addEventListener('mouseenter', () => { shine.style.left = '150%'; });
    card.addEventListener('mouseleave', () => { shine.style.left = '-100%'; });
  });
})();

/* ─────────────────────────────────────────────
   24. NAVBAR ACTIVE INDICATOR
   ───────────────────────────────────────────── */
(function initNavIndicator() {
  if (isTouchDevice()) return;
  const navEl = document.querySelector('.nav-links');
  if (!navEl) return;

  const indicator = document.createElement('div');
  indicator.style.cssText = `
    position:absolute; bottom:0; height:2px;
    background:var(--lime); border-radius:2px;
    transition:all 0.3s cubic-bezier(0.4,0,0.2,1);
    pointer-events:none; opacity:0;
  `;
  navEl.style.position = 'relative';
  navEl.appendChild(indicator);

  function update() {
    const active = navEl.querySelector('.nav-link.active');
    if (!active) { indicator.style.opacity = '0'; return; }
    const r = active.getBoundingClientRect();
    const nr = navEl.getBoundingClientRect();
    indicator.style.opacity = '1';
    indicator.style.left   = (r.left - nr.left + r.width * 0.25) + 'px';
    indicator.style.width  = (r.width * 0.5) + 'px';
    indicator.style.bottom = '3px';
  }

  window.addEventListener('scroll', update, { passive: true });
  update();
})();

/* ─────────────────────────────────────────────
   25. LOGO GLITCH EFFECT
   ───────────────────────────────────────────── */
(function initLogoGlitch() {
  const logo = document.querySelector('.logo-text');
  if (!logo || isTouchDevice()) return;
  const original = logo.innerHTML;
  let glitching = false;
  const glitchChars = '4l!.@#$%^';

  logo.addEventListener('mouseenter', () => {
    if (glitching) return;
    glitching = true;
    let count = 0;
    const id = setInterval(() => {
      let txt = '';
      for (const c of 'Ali.') {
        txt += Math.random() > 0.55
          ? `<span style="color:var(--lime)">${glitchChars[Math.floor(Math.random() * glitchChars.length)]}</span>`
          : c;
      }
      logo.innerHTML = txt;
      if (++count > 7) {
        clearInterval(id);
        logo.innerHTML = original;
        glitching = false;
      }
    }, 55);
  });
})();

/* ─────────────────────────────────────────────
   26. NEWSLETTER
   ───────────────────────────────────────────── */
document.getElementById('newsletter-btn')?.addEventListener('click', () => {
  const input = document.getElementById('newsletter-email');
  if (input?.value) {
    const btn = document.getElementById('newsletter-btn');
    btn.innerHTML = '<i class="fas fa-check"></i>';
    btn.style.background = '#22c55e';
    input.value = '';
    setTimeout(() => {
      btn.innerHTML = '<i class="fas fa-arrow-right"></i>';
      btn.style.background = '';
    }, 2500);
    playSound('success');
  }
});

/* ─────────────────────────────────────────────
   27. SMOOTH ANCHOR SCROLL
   ───────────────────────────────────────────── */
document.querySelectorAll('a[href^="#"]').forEach(a => {
  a.addEventListener('click', e => {
    const target = document.querySelector(a.getAttribute('href'));
    if (target) {
      e.preventDefault();
      target.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  });
});

/* ─────────────────────────────────────────────
   28. INIT LOG
   ───────────────────────────────────────────── */
document.addEventListener('DOMContentLoaded', () => {
  console.log(
    '%c Muhammad Ali Portfolio v2.0 ✓',
    'color:#D4FF00;background:#0a0a0b;font-size:16px;font-weight:bold;padding:8px 16px;border-radius:6px;'
  );
  console.log('%c Awwwards-Tier | Pure HTML + CSS + JS', 'color:#64748b;font-size:12px;');
});