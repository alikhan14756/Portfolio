/* ============================================================
   SCRIPT.JS — Muhammad Ali Portfolio
   All animations, interactions, and dynamic behavior
   ============================================================ */

'use strict';

/* ──────────────────────────────────────
   1. PRELOADER
────────────────────────────────────── */
window.addEventListener('load', () => {
  setTimeout(() => {
    const preloader = document.getElementById('preloader');
    if (preloader) {
      preloader.classList.add('hidden');
      setTimeout(() => preloader.remove(), 500);
    }
    // Trigger hero animations
    document.querySelectorAll('.hero .reveal-up, .hero .reveal-right').forEach((el, i) => {
      setTimeout(() => el.classList.add('revealed'), i * 150);
    });
    initCounters();
  }, 2200);
});

/* ──────────────────────────────────────
   1.5. THEME TOGGLE
────────────────────────────────────── */
(function initTheme() {
  const themeToggle = document.getElementById('theme-toggle');
  const themeIcon = document.getElementById('theme-icon');
  if (!themeToggle || !themeIcon) return;

  // Sync icon class with document theme (already set by head inline script)
  const syncIcon = () => {
    const currentTheme = document.documentElement.getAttribute('data-theme') || 'dark';
    themeIcon.className = currentTheme === 'dark' ? 'fas fa-moon' : 'fas fa-sun';
  };

  syncIcon();

  themeToggle.addEventListener('click', () => {
    const current = document.documentElement.getAttribute('data-theme') || 'dark';
    const next = current === 'dark' ? 'light' : 'dark';
    document.documentElement.setAttribute('data-theme', next);
    localStorage.setItem('theme', next);
    syncIcon();
  });
})();

/* ──────────────────────────────────────
   2. PARTICLE BACKGROUND
────────────────────────────────────── */
(function initParticles() {
  const canvas = document.getElementById('particle-canvas');
  if (!canvas) return;
  const ctx = canvas.getContext('2d');
  let W, H, particles = [], mouse = { x: -1000, y: -1000 };

  function resize() {
    W = canvas.width = window.innerWidth;
    H = canvas.height = window.innerHeight;
  }

  class Particle {
    constructor() { this.reset(); }
    reset() {
      this.x = Math.random() * W;
      this.y = Math.random() * H;
      this.vx = (Math.random() - 0.5) * 0.4;
      this.vy = (Math.random() - 0.5) * 0.4;
      this.r = Math.random() * 2 + 0.5;
      this.alpha = Math.random() * 0.5 + 0.1;
      this.color = Math.random() > 0.7 ? '#f97316' : '#3b82f6';
    }
    update() {
      const dx = mouse.x - this.x;
      const dy = mouse.y - this.y;
      const dist = Math.sqrt(dx * dx + dy * dy);
      if (dist < 120) {
        this.x -= dx * 0.02;
        this.y -= dy * 0.02;
      }
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
        const dist = Math.sqrt(dx * dx + dy * dy);
        if (dist < 100) {
          ctx.save();
          ctx.globalAlpha = (1 - dist / 100) * 0.15;
          ctx.strokeStyle = '#f97316';
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
  for (let i = 0; i < 80; i++) particles.push(new Particle());

  window.addEventListener('resize', resize);
  window.addEventListener('mousemove', e => { mouse.x = e.clientX; mouse.y = e.clientY; });

  loop();
})();

/* ──────────────────────────────────────
   3. CUSTOM CURSOR
────────────────────────────────────── */
(function initCursor() {
  const dot = document.getElementById('cursor-dot');
  const ring = document.getElementById('cursor-ring');
  if (!dot || !ring) return;

  let dotX = 0, dotY = 0, ringX = 0, ringY = 0;

  document.addEventListener('mousemove', e => {
    dotX = e.clientX;
    dotY = e.clientY;
  });

  function animateCursor() {
    dot.style.left = dotX + 'px';
    dot.style.top = dotY + 'px';

    ringX += (dotX - ringX) * 0.12;
    ringY += (dotY - ringY) * 0.12;
    ring.style.left = ringX + 'px';
    ring.style.top = ringY + 'px';

    requestAnimationFrame(animateCursor);
  }
  animateCursor();

  const hoverEls = document.querySelectorAll('a, button, .project-card, .service-card, .testi-card, .blog-card, .testi-dot');
  hoverEls.forEach(el => {
    el.addEventListener('mouseenter', () => ring.classList.add('hovered'));
    el.addEventListener('mouseleave', () => ring.classList.remove('hovered'));
  });
})();

/* ──────────────────────────────────────
   4. NAVBAR
────────────────────────────────────── */
(function initNavbar() {
  const navbar = document.getElementById('navbar');
  const hamburger = document.getElementById('hamburger');
  const overlay = document.getElementById('mobile-nav-overlay');
  const mobileLinks = document.querySelectorAll('.mobile-nav-link');
  const navLinks = document.querySelectorAll('.nav-link');

  // Scroll behavior
  window.addEventListener('scroll', () => {
    navbar.classList.toggle('scrolled', window.scrollY > 20);

    // Back to top visibility
    const btt = document.getElementById('back-to-top');
    if (btt) btt.classList.toggle('visible', window.scrollY > 400);

    // Active nav link
    const sections = document.querySelectorAll('section[id]');
    let current = '';
    sections.forEach(s => {
      if (window.scrollY >= s.offsetTop - 120) current = s.id;
    });
    navLinks.forEach(l => {
      l.classList.toggle('active', l.getAttribute('href') === '#' + current);
    });
  });

  // Hamburger
  hamburger?.addEventListener('click', () => {
    hamburger.classList.toggle('active');
    overlay.classList.toggle('open');
    document.body.style.overflow = overlay.classList.contains('open') ? 'hidden' : '';
  });

  mobileLinks.forEach(link => {
    link.addEventListener('click', () => {
      hamburger.classList.remove('active');
      overlay.classList.remove('open');
      document.body.style.overflow = '';
    });
  });

  // Back to top
  document.getElementById('back-to-top')?.addEventListener('click', () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  });
})();

/* ──────────────────────────────────────
   5. SCROLL REVEAL ANIMATION
────────────────────────────────────── */
(function initScrollReveal() {
  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        const el = entry.target;
        const delay = el.dataset.delay || 0;
        setTimeout(() => {
          el.classList.add('revealed');
          // Trigger skill bars
          if (el.classList.contains('skill-item')) {
            const fill = el.querySelector('.skill-fill');
            if (fill) fill.style.width = fill.dataset.width + '%';
          }
          // Trigger timeline dot
          if (el.classList.contains('timeline-item')) {
            const dot = el.querySelector('.timeline-dot');
            if (dot && !dot.classList.contains('active')) {
              dot.style.borderColor = 'var(--accent)';
            }
          }
        }, delay);
        observer.unobserve(el);
      }
    });
  }, { threshold: 0.12, rootMargin: '0px 0px -40px 0px' });

  // Add stagger delays to grids
  document.querySelectorAll('.projects-grid .project-card').forEach((el, i) => {
    el.dataset.delay = i * 100;
  });
  document.querySelectorAll('.services-grid .service-card').forEach((el, i) => {
    el.dataset.delay = i * 100;
  });
  document.querySelectorAll('.blog-grid .blog-card').forEach((el, i) => {
    el.dataset.delay = i * 100;
  });
  document.querySelectorAll('.testimonials-slider .testi-card').forEach((el, i) => {
    el.dataset.delay = i * 100;
  });

  document.querySelectorAll('.reveal-up, .reveal-left, .reveal-right').forEach(el => {
    // Skip hero elements - they are handled on load
    if (!el.closest('.hero')) observer.observe(el);
  });
})();

/* ──────────────────────────────────────
   6. COUNTER ANIMATION
────────────────────────────────────── */
function initCounters() {
  document.querySelectorAll('.stat-number').forEach(el => {
    const target = parseInt(el.dataset.target);
    const duration = 1800;
    const start = performance.now();
    function update(now) {
      const elapsed = now - start;
      const progress = Math.min(elapsed / duration, 1);
      const eased = 1 - Math.pow(1 - progress, 4);
      el.textContent = Math.floor(eased * target);
      if (progress < 1) requestAnimationFrame(update);
      else el.textContent = target;
    }
    requestAnimationFrame(update);
  });
}

/* ──────────────────────────────────────
   7. TYPEWRITER EFFECT (Hero Name)
────────────────────────────────────── */
(function initTypewriter() {
  // We apply to the hero badge text
  const subtitles = [
    'WordPress & Elementor Expert',
    'Frontend Developer & Creator',
    'UI/UX & Speed Specialist',
    'Freelance Web Developer'
  ];
  const badge = document.querySelector('.hero-badge');
  if (!badge) return;

  const dot = badge.querySelector('.badge-dot');
  let idx = 0;
  let charIdx = 0;
  let deleting = false;
  let textNode;

  // Create text node after dot
  textNode = document.createTextNode(subtitles[0]);
  badge.appendChild(textNode);

  // Remove original text content
  badge.childNodes.forEach(n => {
    if (n.nodeType === 3 && n !== textNode) n.remove();
  });

  function type() {
    const current = subtitles[idx];
    if (!deleting) {
      charIdx++;
      textNode.textContent = ' ' + current.slice(0, charIdx);
      if (charIdx === current.length) {
        deleting = true;
        setTimeout(type, 2000);
        return;
      }
    } else {
      charIdx--;
      textNode.textContent = ' ' + current.slice(0, charIdx);
      if (charIdx === 0) {
        deleting = false;
        idx = (idx + 1) % subtitles.length;
        setTimeout(type, 300);
        return;
      }
    }
    setTimeout(type, deleting ? 40 : 80);
  }

  setTimeout(type, 2500);
})();

/* ──────────────────────────────────────
   8. TESTIMONIALS SLIDER
────────────────────────────────────── */
(function initTestimonials() {
  const cards = document.querySelectorAll('.testi-card');
  const dots = document.querySelectorAll('.testi-dot');
  const slider = document.getElementById('testimonials-slider');

  if (!slider || cards.length === 0) return;

  const isMobile = () => window.innerWidth < 900;

  function updateDots() {
    if (!isMobile()) return;
    const scrollPos = slider.scrollLeft;
    const cardWidth = cards[0].offsetWidth;
    const gap = 24;
    const idx = Math.round(scrollPos / (cardWidth + gap));
    
    dots.forEach((d, i) => {
      d.classList.toggle('active', i === idx);
    });
  }

  function goTo(idx) {
    if (isMobile()) {
      const cardWidth = cards[0].offsetWidth;
      const gap = 24;
      slider.scrollTo({
        left: idx * (cardWidth + gap),
        behavior: 'smooth'
      });
    }
  }

  slider.addEventListener('scroll', updateDots);

  dots.forEach(dot => {
    dot.addEventListener('click', () => {
      goTo(parseInt(dot.dataset.index));
    });
  });

  // Auto slide
  let autoSlide;
  function startAuto() { 
    if (!isMobile()) return;
    autoSlide = setInterval(() => {
      const scrollPos = slider.scrollLeft;
      const cardWidth = cards[0].offsetWidth;
      const gap = 24;
      let idx = Math.round(scrollPos / (cardWidth + gap));
      idx = (idx + 1) % cards.length;
      goTo(idx);
    }, 4000); 
  }
  function stopAuto() { clearInterval(autoSlide); }

  slider.addEventListener('touchstart', stopAuto);
  slider.addEventListener('touchend', startAuto);
  slider.addEventListener('mouseenter', stopAuto);
  slider.addEventListener('mouseleave', startAuto);

  function init() {
    if (isMobile()) {
      startAuto();
    } else {
      stopAuto();
    }
  }

  init();
  window.addEventListener('resize', () => {
    stopAuto();
    init();
  });
})();


/* ──────────────────────────────────────
   10. CONTACT FORM — DUAL BUTTONS
────────────────────────────────────── */
(function initContactForm() {
  const form = document.getElementById('contact-form');
  if (!form) return;

  const waBtn = document.getElementById('whatsapp-btn');
  const emailBtn = document.getElementById('email-btn');

  function getFormData() {
    const name = document.getElementById('name')?.value?.trim() || '';
    const email = document.getElementById('email')?.value?.trim() || '';
    const subject = document.getElementById('subject')?.value?.trim() || '';
    const message = document.getElementById('message')?.value?.trim() || '';
    return { name, email, subject, message };
  }

  function validateForm() {
    const { name, email, subject, message } = getFormData();
    if (!name || !email || !subject || !message) {
      // Trigger native validation
      form.reportValidity();
      return false;
    }
    return true;
  }

  function showSuccess(btn, text) {
    const span = btn.querySelector('span');
    const original = span.textContent;
    span.textContent = text;
    btn.style.opacity = '0.8';
    form.reset();
    setTimeout(() => {
      span.textContent = original;
      btn.style.opacity = '1';
    }, 3000);
  }

  // WhatsApp handler
  waBtn?.addEventListener('click', () => {
    if (!validateForm()) return;
    const { name, email, subject, message } = getFormData();

    const waSpan = waBtn.querySelector('span');
    waSpan.textContent = 'Opening WhatsApp...';

    const formattedText = `*New Portfolio Message*%0A%0A*Name:* ${encodeURIComponent(name)}%0A*Email:* ${encodeURIComponent(email)}%0A*Subject:* ${encodeURIComponent(subject)}%0A*Message:* ${encodeURIComponent(message)}`;
    const waUrl = `https://wa.me/923055389967?text=${formattedText}`;

    setTimeout(() => {
      window.open(waUrl, '_blank');
      showSuccess(waBtn, '✓ Opened WhatsApp!');
    }, 600);
  });

  // Email handler
  emailBtn?.addEventListener('click', () => {
    if (!validateForm()) return;
    const { name, email, subject, message } = getFormData();

    const emSpan = emailBtn.querySelector('span');
    emSpan.textContent = 'Opening Email...';

    const body = `Hi Muhammad Ali,%0A%0AMy name is ${encodeURIComponent(name)} (${encodeURIComponent(email)}).%0A%0A${encodeURIComponent(message)}%0A%0ABest regards,%0A${encodeURIComponent(name)}`;
    const mailUrl = `mailto:alikhan1475623a@gmail.com?subject=${encodeURIComponent(subject)}&body=${body}`;

    setTimeout(() => {
      window.location.href = mailUrl;
      showSuccess(emailBtn, '✓ Opened Email!');
    }, 600);
  });

  // Prevent default form submit
  form.addEventListener('submit', e => e.preventDefault());
})();

/* ──────────────────────────────────────
   11. NEWSLETTER
────────────────────────────────────── */
document.getElementById('newsletter-btn')?.addEventListener('click', () => {
  const input = document.getElementById('newsletter-email');
  if (input && input.value) {
    const btn = document.getElementById('newsletter-btn');
    btn.innerHTML = '<i class="fas fa-check"></i>';
    btn.style.background = '#22c55e';
    input.value = '';
    setTimeout(() => {
      btn.innerHTML = '<i class="fas fa-arrow-right"></i>';
      btn.style.background = '';
    }, 2000);
  }
});

/* ──────────────────────────────────────
   12. TILT EFFECT ON PROJECT CARDS
────────────────────────────────────── */
(function initTilt() {
  document.querySelectorAll('.project-card, .service-card').forEach(card => {
    card.addEventListener('mousemove', e => {
      const rect = card.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;
      const cx = rect.width / 2;
      const cy = rect.height / 2;
      const rx = (y - cy) / cy * 5;
      const ry = (cx - x) / cx * 5;
      card.style.transform = `perspective(600px) rotateX(${rx}deg) rotateY(${ry}deg) translateY(-8px)`;
    });
    card.addEventListener('mouseleave', () => {
      card.style.transform = '';
    });
  });
})();

/* ──────────────────────────────────────
   13. SMOOTH ANCHOR SCROLL
────────────────────────────────────── */
document.querySelectorAll('a[href^="#"]').forEach(a => {
  a.addEventListener('click', e => {
    const target = document.querySelector(a.getAttribute('href'));
    if (target) {
      e.preventDefault();
      target.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  });
});

/* ──────────────────────────────────────
   14. GLITCH HOVER ON LOGO
────────────────────────────────────── */
(function initLogoGlitch() {
  const logo = document.querySelector('.logo-text');
  if (!logo) return;

  const original = logo.innerHTML;
  let glitching = false;

  logo.addEventListener('mouseenter', () => {
    if (glitching) return;
    glitching = true;
    let count = 0;
    const chars = 'Ali.';
    const glitchChars = '4l!.@#$%^&*';

    const interval = setInterval(() => {
      let glitched = '';
      for (let c of chars) {
        glitched += Math.random() > 0.6 ? glitchChars[Math.floor(Math.random() * glitchChars.length)] : c;
      }
      logo.textContent = glitched;
      count++;
      if (count > 8) {
        clearInterval(interval);
        logo.innerHTML = original;
        glitching = false;
      }
    }, 60);
  });
})();

/* ──────────────────────────────────────
   15. FLOATING TAGS PARALLAX
────────────────────────────────────── */
(function initParallaxTags() {
  const tags = document.querySelectorAll('.float-tag');
  if (!tags.length) return;

  window.addEventListener('mousemove', e => {
    const cx = window.innerWidth / 2;
    const cy = window.innerHeight / 2;
    const dx = (e.clientX - cx) / cx;
    const dy = (e.clientY - cy) / cy;

    tags.forEach((tag, i) => {
      const factor = (i + 1) * 6;
      tag.style.transform = `translate(${dx * factor}px, ${dy * factor}px)`;
    });
  });
})();

/* ──────────────────────────────────────
   16. MAGNETIC BUTTONS
────────────────────────────────────── */
(function initMagneticBtns() {
  document.querySelectorAll('.btn-primary, .btn-secondary').forEach(btn => {
    btn.addEventListener('mousemove', e => {
      const rect = btn.getBoundingClientRect();
      const x = e.clientX - rect.left - rect.width / 2;
      const y = e.clientY - rect.top - rect.height / 2;
      btn.style.transform = `translate(${x * 0.2}px, ${y * 0.2}px) translateY(-2px)`;
    });
    btn.addEventListener('mouseleave', () => {
      btn.style.transform = '';
    });
  });
})();

/* ──────────────────────────────────────
   17. ACTIVE NAV UNDERLINE SMOOTH
────────────────────────────────────── */
(function initNavIndicator() {
  const navEl = document.querySelector('.nav-links');
  if (!navEl) return;

  const indicator = document.createElement('div');
  indicator.style.cssText = `
    position: absolute;
    bottom: 0;
    height: 2px;
    background: var(--accent);
    border-radius: 2px;
    transition: all 0.3s cubic-bezier(0.4,0,0.2,1);
    pointer-events: none;
  `;
  navEl.style.position = 'relative';
  navEl.appendChild(indicator);

  function updateIndicator() {
    const active = navEl.querySelector('.nav-link.active');
    if (!active) { indicator.style.opacity = '0'; return; }
    const rect = active.getBoundingClientRect();
    const navRect = navEl.getBoundingClientRect();
    indicator.style.opacity = '1';
    indicator.style.left = (rect.left - navRect.left + rect.width * 0.3) + 'px';
    indicator.style.width = (rect.width * 0.4) + 'px';
    indicator.style.bottom = '4px';
  }

  window.addEventListener('scroll', updateIndicator);
  updateIndicator();
})();

/* ──────────────────────────────────────
   18. SCROLL PROGRESS BAR
────────────────────────────────────── */
(function initScrollProgress() {
  const bar = document.createElement('div');
  bar.style.cssText = `
    position: fixed;
    top: 0; left: 0;
    width: 0%; height: 3px;
    background: linear-gradient(90deg, var(--accent), var(--accent-light));
    z-index: 10000;
    transition: width 0.1s linear;
    pointer-events: none;
  `;
  document.body.appendChild(bar);

  window.addEventListener('scroll', () => {
    const scrolled = window.scrollY;
    const max = document.body.scrollHeight - window.innerHeight;
    bar.style.width = (scrolled / max * 100) + '%';
  });
})();

/* ──────────────────────────────────────
   19. HOVER SHINE EFFECT ON CARDS
────────────────────────────────────── */
(function initShineEffect() {
  document.querySelectorAll('.service-card, .testi-card, .featured-block').forEach(card => {
    card.style.position = 'relative';
    card.style.overflow = 'hidden';

    const shine = document.createElement('div');
    shine.style.cssText = `
      position: absolute;
      top: 0; left: -100%;
      width: 60%;
      height: 100%;
      background: linear-gradient(90deg, transparent, rgba(255,255,255,0.04), transparent);
      transform: skewX(-15deg);
      transition: left 0.6s ease;
      pointer-events: none;
    `;
    card.appendChild(shine);

       card.addEventListener('mouseenter', () => { shine.style.left = '150%'; });
    card.addEventListener('mouseleave', () => { shine.style.left = '-100%'; });
  });
})();

/* ──────────────────────────────────────
   20. INIT ALL ON DOM READY
────────────────────────────────────── */
document.addEventListener('DOMContentLoaded', () => {
  console.log('%c Muhammad Ali Portfolio Loaded ✓', 'color:#f97316;font-size:18px;font-weight:bold;');
});