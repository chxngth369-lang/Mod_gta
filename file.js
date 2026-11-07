/* ==========================================================================
   MODFORGE — script.js
   Pure vanilla JS: data, rendering, filtering, modal, cart, toasts & effects
   --------------------------------------------------------------------------
   1. Data              7.  Hero particles         13. Cart & drawer
   2. Config & state    8.  3D tilt                14. Toast notifications
   3. Helpers           9.  Filtering & rendering  15. Stats counters
   4. Boot / preloader  10. Grid interactions      16. Testimonials carousel
   5. Custom cursor     11. Downloads & wishlist   17. Pricing, newsletter, misc
   6. Navbar & menu     12. Mod detail modal       18. Scroll reveal & keyboard
   ========================================================================== */
'use strict';

/* ---------- 1. DATA ---------- */
const MODS = [
  {
    id: 1, title: 'Neon Nights Reshade Ultra', creator: 'NeonVisions', game: 'Cyberpunk 2077', category: 'graphics',
    rating: 4.9, reviews: 12480, downloads: 2480000, size: '1.2 GB', version: '3.2.0', updated: '2025-05-02',
    price: 0, tag: 'Trending', seed: 'neon-city',
    description: "A cinematic ReShade preset that rebuilds Night City's lighting from the ground up. Volumetric neon bloom, rain-soaked reflections and a filmic color pipeline turn every street corner into a wallpaper — with tuned performance profiles for every GPU tier.",
    features: ['Physically-based neon bloom', 'Wet-surface SSR reflections', '4 performance presets', 'Photo-mode LUT pack']
  },
  {
    id: 2, title: 'Ascension: Total Overhaul', creator: 'Valkyr Studios', game: 'Skyrim SE', category: 'overhaul',
    rating: 4.8, reviews: 8920, downloads: 1920000, size: '4.6 GB', version: '7.1.4', updated: '2025-04-18',
    price: 9.99, tag: 'PRO', seed: 'nordic-mountain',
    description: 'Reworks combat, magic, perks and AI into a cohesive, challenging RPG experience — then adds a fully voiced 40-hour questline across three new regions. Built to play nicely with the most popular graphics and UI mods.',
    features: ['Directional combat & stamina rework', '3 new hand-crafted regions', '120+ fully voiced NPCs', 'Smarter, faction-aware AI']
  },
  {
    id: 3, title: 'Arsenal Reforged: 200+ Weapons', creator: 'IronForge', game: 'Fallout 4', category: 'weapons',
    rating: 4.7, reviews: 6310, downloads: 980000, size: '3.1 GB', version: '2.8.1', updated: '2025-03-27',
    price: 4.99, tag: 'Hot', seed: 'wasteland-gun',
    description: 'Over 200 lore-friendly firearms and melee weapons with brand-new animations, recorded-from-scratch audio and fully leveled-list integration. Every weapon supports the vanilla modification system.',
    features: ['200+ new weapons', 'Custom reload animations', 'Studio-recorded sound design', 'Leveled-list & crafting integration']
  },
  {
    id: 4, title: 'Tarnished Couture Armor Pack', creator: 'Moonveil Arts', game: 'Elden Ring', category: 'skins',
    rating: 4.8, reviews: 5120, downloads: 740000, size: '860 MB', version: '1.6.0', updated: '2025-05-10',
    price: 0, tag: 'New', seed: 'dark-knight',
    description: '38 meticulously sculpted armor sets inspired by the Lands Between, each with 4K PBR textures, cloth physics and dye support. Swap looks freely without touching your stats.',
    features: ['38 complete armor sets', '4K PBR textures', 'Cloth & cape physics', 'Full dye-channel support']
  },
  {
    id: 5, title: 'HUD Master Pro', creator: 'Pixelsmith', game: 'Starfield', category: 'utilities',
    rating: 4.6, reviews: 3980, downloads: 612000, size: '48 MB', version: '4.0.2', updated: '2025-04-30',
    price: 0, tag: 'Free', seed: 'space-station',
    description: 'A fully modular, drag-and-drop HUD editor. Resize, recolor and reposition every element, add new widgets like a ship-status panel and compass markers, and share layouts with a single code.',
    features: ['Drag-and-drop HUD editor', '20+ new widgets', 'Shareable layout codes', 'Ultrawide & 4K scaling']
  },
  {
    id: 6, title: 'Los Santos RTX Lighting', creator: 'Photon Labs', game: 'GTA V', category: 'graphics',
    rating: 4.9, reviews: 15200, downloads: 3120000, size: '2.7 GB', version: '5.0.0', updated: '2025-05-06',
    price: 6.99, tag: 'PRO', seed: 'city-night',
    description: 'A complete lighting, weather and atmosphere rework that makes Los Santos look like a next-gen release. Dynamic global illumination, realistic sun-scattering and 30+ hand-tuned weather states.',
    features: ['Dynamic GI approximation', '30+ weather presets', 'Realistic headlights & street lamps', 'Cinematic photo mode']
  },
  {
    id: 7, title: 'Witcher Next-Gen 4K Textures', creator: 'Halcyon Mods', game: 'The Witcher 3', category: 'graphics',
    rating: 4.7, reviews: 9870, downloads: 1450000, size: '8.4 GB', version: '2.3.0', updated: '2025-02-14',
    price: 0, tag: 'Free', seed: 'forest-mist',
    description: 'Over 4,000 hand-upscaled and repainted textures for environments, characters and monsters. Designed to stay faithful to the original art direction while bringing it fully into 4K.',
    features: ['4,000+ remastered textures', 'Faithful art direction', 'Optimized VRAM streaming', 'Compatible with next-gen patch']
  },
  {
    id: 8, title: 'Mythic Creatures Expansion', creator: 'BlockForge', game: 'Minecraft', category: 'overhaul',
    rating: 4.8, reviews: 21400, downloads: 4860000, size: '320 MB', version: '1.21.3', updated: '2025-05-12',
    price: 0, tag: 'Trending', seed: 'fantasy-world',
    description: 'Adds 60+ mythical creatures, new biomes, boss dungeons and a tameable-dragon progression system. Every mob has unique AI behaviors, loot tables and fully animated models.',
    features: ['60+ new creatures', '8 new biomes', 'Tameable dragon progression', 'Multiplayer server-ready']
  },
  {
    id: 9, title: 'Phantom Ember Skin Collection', creator: 'Kairo Designs', game: 'Counter-Strike 2', category: 'skins',
    rating: 4.5, reviews: 2740, downloads: 388000, size: '210 MB', version: '1.2.0', updated: '2025-04-08',
    price: 2.99, tag: 'New', seed: 'ember-fire',
    description: 'A premium collection of animated, ember-themed weapon finishes for offline and workshop servers. Features reactive glow that intensifies with kill streaks.',
    features: ['24 animated finishes', 'Kill-streak reactive glow', 'Custom inspect animations', 'Workshop-server compatible']
  },
  {
    id: 10, title: 'ModOrganizer Nexus+', creator: 'CoreLoader Team', game: 'Multi-Game', category: 'utilities',
    rating: 4.9, reviews: 18600, downloads: 5240000, size: '96 MB', version: '3.0.1', updated: '2025-05-14',
    price: 0, tag: 'Essential', seed: 'circuit-board',
    description: 'The essential mod manager. Auto-sorts load orders, resolves dependencies, detects conflicts before they break your save and supports one-click profiles across 300+ games.',
    features: ['Automatic load-order sorting', 'Conflict & dependency resolver', 'Per-game profiles', 'Cloud backup of setups']
  },
  {
    id: 11, title: "Tav's Expanded Arsenal", creator: 'Gilded Quill', game: "Baldur's Gate 3", category: 'weapons',
    rating: 4.7, reviews: 4410, downloads: 690000, size: '540 MB', version: '1.9.2', updated: '2025-03-19',
    price: 0, tag: 'Free', seed: 'ancient-sword',
    description: '90 new magical weapons with unique enchantments, class synergies and hand-written item lore. Distributed naturally through vendors, loot and hidden encounters across all three acts.',
    features: ['90 enchanted weapons', 'Class-specific synergies', 'Lore-friendly distribution', 'Multiplayer compatible']
  },
  {
    id: 12, title: 'Frontier Living Overhaul', creator: 'Dustwind Collective', game: 'Red Dead Redemption 2', category: 'overhaul',
    rating: 4.8, reviews: 7020, downloads: 1180000, size: '2.2 GB', version: '2.0.5', updated: '2025-04-22',
    price: 7.99, tag: 'PRO', seed: 'desert-sunset',
    description: 'Deepens survival, economy and wildlife systems for a slower, more immersive frontier life. Adds homesteading, dynamic towns that grow over time and a reworked bounty system.',
    features: ['Homesteading & property', 'Dynamic, growing towns', 'Reworked economy', 'Smarter wildlife ecosystem']
  }
];

const TESTIMONIALS = [
  { name: 'Kira "Vex" Tanaka', role: 'Top Creator · 4.2M downloads', avatar: 47, rating: 5, badge: 'Creator',
    text: "ModForge's creator dashboard is the first one that actually feels built for modders. Analytics, versioning, payouts — I shipped my overhaul in a weekend instead of a month." },
  { name: 'Marcus Hale', role: 'Competitive gamer', avatar: 12, rating: 5, badge: 'Pro Member',
    text: 'One-click installs, zero broken load orders. The dependency resolver alone saves me hours of troubleshooting every single patch day.' },
  { name: 'Elena Voss', role: 'Graphics modder · ReShade Guild', avatar: 32, rating: 5, badge: 'Creator',
    text: 'I went from hobbyist to full-time modder in eight months. The 90% revenue share and the exposure from the Featured grid are unmatched anywhere.' },
  { name: 'Dev "Byte" Okafor', role: 'Streamer · 380K followers', avatar: 15, rating: 5, badge: 'Partner',
    text: 'My chat discovers a mod, I preview it in the quick view and it is installed before the ad break ends. The whole flow is ridiculously smooth.' },
  { name: 'Sora Lindqvist', role: 'Skyrim veteran · 900+ mods', avatar: 44, rating: 4.5, badge: 'Pro Member',
    text: 'Every upload is virus-scanned and version-tracked, so I finally trust what I install. The changelogs are clean and the community reviews are actually useful.' },
  { name: 'Jaylen Brooks', role: 'Indie game developer', avatar: 53, rating: 5, badge: 'Studio',
    text: 'We officially support ModForge in our game now. The API docs are excellent and our player retention jumped 31% after launching mod support.' }
];

/* ---------- 2. CONFIG & STATE ---------- */
const CATEGORY_LABELS = {
  graphics: 'Graphics', overhaul: 'Overhauls', weapons: 'Weapons', skins: 'Skins', utilities: 'Utilities'
};

const TAG_META = {
  Trending:  { cls: 'tag-trending',  icon: 'fa-fire' },
  PRO:       { cls: 'tag-pro',       icon: 'fa-crown' },
  Free:      { cls: 'tag-free',      icon: 'fa-gift' },
  New:       { cls: 'tag-new',       icon: 'fa-bolt' },
  Hot:       { cls: 'tag-hot',       icon: 'fa-fire-flame-curved' },
  Essential: { cls: 'tag-essential', icon: 'fa-gem' }
};

const STORAGE = { cart: 'modforge-cart', wishlist: 'modforge-wishlist' };

const state = {
  filter: 'all',
  search: '',
  sort: 'popular',
  cart: loadJSON(STORAGE.cart, []),
  wishlist: new Set(loadJSON(STORAGE.wishlist, [])),
  activeModal: null,
  countdownTimer: null,
  gallery: null,
  lastFocus: null
};

let setMenuOpen = () => {};   // assigned in initMobileMenu
let renderToken = 0;          // guards against overlapping filter renders

/* ---------- 3. HELPERS ---------- */
const $ = (sel, ctx = document) => ctx.querySelector(sel);
const $$ = (sel, ctx = document) => [...ctx.querySelectorAll(sel)];

const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
const isTouchDevice = window.matchMedia('(hover: none), (pointer: coarse)').matches;

const imgUrl = (seed, w = 800, h = 500) => `https://picsum.photos/seed/${encodeURIComponent(seed)}/${w}/${h}`;
const avatarUrl = (n) => `https://i.pravatar.cc/120?img=${n}`;
const compact = (n) => new Intl.NumberFormat('en', { notation: 'compact', maximumFractionDigits: 1 }).format(n);
const formatPrice = (p) => (p === 0 ? 'FREE' : `$${p.toFixed(2)}`);
const handle = (name) => `@${name.replace(/[^a-z0-9]/gi, '')}`;
const getMod = (id) => MODS.find((m) => m.id === Number(id));

function debounce(fn, ms = 200) {
  let t;
  return (...args) => { clearTimeout(t); t = setTimeout(() => fn(...args), ms); };
}

function loadJSON(key, fallback) {
  try {
    const value = JSON.parse(localStorage.getItem(key));
    return value ?? fallback;
  } catch { return fallback; }
}

function saveJSON(key, value) {
  try { localStorage.setItem(key, JSON.stringify(value)); } catch { /* storage unavailable */ }
}

function parseDate(str) {
  const [y, m, d] = str.split('-').map(Number);
  return new Date(y, m - 1, d);
}

const formatDate = (date) => date.toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' });

function escapeHTML(str) {
  return str.replace(/[&<>"']/g, (c) => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[c]));
}

function starsHTML(rating) {
  let html = '';
  for (let i = 1; i <= 5; i++) {
    if (rating >= i) html += '<i class="fa-solid fa-star"></i>';
    else if (rating >= i - 0.5) html += '<i class="fa-solid fa-star-half-stroke"></i>';
    else html += '<i class="fa-regular fa-star"></i>';
  }
  return html;
}

/** Locks page scroll while the modal or cart drawer is open */
function syncScrollLock() {
  const locked = $('#modModal').classList.contains('open') || $('#cartDrawer').classList.contains('open');
  document.body.classList.toggle('no-scroll', locked);
}

/* ---------- 4. BOOT / PRELOADER ---------- */
document.addEventListener('DOMContentLoaded', () => {
  initCursor();
  initNavbar();
  initMobileMenu();
  initParticles();
  initHeroPreview();
  initMarquee();
  initFilters();
  renderMods(false);
  initGridEvents();
  initModal();
  initCart();
  initCounters();
  initCarousel();
  initPricing();
  initNewsletter();
  initMisc();
  initKeyboard();
  hidePreloader();
});

function hidePreloader() {
  const preloader = $('#preloader');
  let done = false;
  const finish = () => {
    if (done) return;
    done = true;
    preloader?.classList.add('hidden');
    document.body.classList.add('loaded');
    initReveal(); // start reveals only once the page is visible
  };
  window.addEventListener('load', () => setTimeout(finish, 400));
  setTimeout(finish, 2500); // fallback for slow image CDNs
}

/* ---------- 5. CUSTOM CURSOR ---------- */
function initCursor() {
  if (isTouchDevice || prefersReducedMotion) return;

  const root = document.documentElement;
  const dot = $('.cursor-dot');
  const ring = $('.cursor-ring');
  const glow = $('.cursor-glow');
  root.classList.add('custom-cursor');

  const pos = { x: innerWidth / 2, y: innerHeight / 2 };
  const ringPos = { ...pos };
  const glowPos = { ...pos };

  window.addEventListener('mousemove', (e) => {
    pos.x = e.clientX;
    pos.y = e.clientY;
    dot.style.transform = `translate3d(${pos.x}px, ${pos.y}px, 0)`;
    root.classList.remove('cursor-hidden');
  }, { passive: true });

  // Ring and ambient glow trail the pointer with linear interpolation
  (function loop() {
    ringPos.x += (pos.x - ringPos.x) * 0.18;
    ringPos.y += (pos.y - ringPos.y) * 0.18;
    glowPos.x += (pos.x - glowPos.x) * 0.07;
    glowPos.y += (pos.y - glowPos.y) * 0.07;
    ring.style.transform = `translate3d(${ringPos.x}px, ${ringPos.y}px, 0)`;
    glow.style.transform = `translate3d(${glowPos.x}px, ${glowPos.y}px, 0)`;
    requestAnimationFrame(loop);
  })();

  const hoverables = 'a, button, select, input, label, .mod-card, .category-tile, .thumb';
  document.addEventListener('mouseover', (e) => ring.classList.toggle('is-hover', !!e.target.closest(hoverables)));
  document.addEventListener('mousedown', () => ring.classList.add('is-click'));
  document.addEventListener('mouseup', () => ring.classList.remove('is-click'));
  root.addEventListener('mouseleave', () => root.classList.add('cursor-hidden'));
}

/* ---------- 6. NAVBAR & MOBILE MENU ---------- */
function initNavbar() {
  const nav = $('#navbar');
  const onScroll = () => nav.classList.toggle('scrolled', window.scrollY > 20);
  onScroll();
  window.addEventListener('scroll', onScroll, { passive: true });

  // Highlight the link of the section currently in view
  const links = $$('.nav-link');
  const sections = links.map((l) => $(l.getAttribute('href'))).filter(Boolean);
  const io = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      if (!entry.isIntersecting) return;
      links.forEach((l) => l.classList.toggle('active', l.getAttribute('href') === `#${entry.target.id}`));
    });
  }, { rootMargin: '-45% 0px -50% 0px' });
  sections.forEach((s) => io.observe(s));
}

function initMobileMenu() {
  const btn = $('#hamburger');
  const menu = $('#navLinks');

  setMenuOpen = (open) => {
    btn.classList.toggle('active', open);
    menu.classList.toggle('open', open);
    btn.setAttribute('aria-expanded', String(open));
  };

  btn.addEventListener('click', (e) => {
    e.stopPropagation();
    setMenuOpen(!menu.classList.contains('open'));
  });
  $$('.nav-link', menu).forEach((link) => link.addEventListener('click', () => setMenuOpen(false)));
  document.addEventListener('click', (e) => {
    if (menu.classList.contains('open') && !menu.contains(e.target)) setMenuOpen(false);
  });
  window.addEventListener('resize', () => { if (window.innerWidth >= 1024) setMenuOpen(false); });
}

/* ---------- 7. HERO PARTICLES & PREVIEW ---------- */
function initParticles() {
  const canvas = $('#heroCanvas');
  if (!canvas) return;
  const ctx = canvas.getContext('2d');
  const hero = canvas.parentElement;
  const COLORS = ['0,240,255', '168,85,247', '16,245,160'];
  const LINK_DIST = 120;
  const MOUSE_DIST = 170;
  const mouse = { x: -9999, y: -9999 };
  let w = 0, h = 0, particles = [], running = false, rafId = null;

  function resize() {
    const dpr = Math.min(window.devicePixelRatio || 1, 2);
    w = hero.clientWidth;
    h = hero.clientHeight;
    canvas.width = w * dpr;
    canvas.height = h * dpr;
    canvas.style.width = `${w}px`;
    canvas.style.height = `${h}px`;
    ctx.setTransform(dpr, 0, 0, dpr, 0, 0);

    const count = Math.min(120, Math.max(35, Math.floor((w * h) / 13000)));
    particles = Array.from({ length: count }, () => ({
      x: Math.random() * w,
      y: Math.random() * h,
      vx: (Math.random() - 0.5) * 0.45,
      vy: (Math.random() - 0.5) * 0.45,
      r: Math.random() * 1.8 + 0.6,
      c: COLORS[(Math.random() * COLORS.length) | 0]
    }));
    if (!running) drawFrame();
  }

  function drawFrame() {
    ctx.clearRect(0, 0, w, h);

    // Move & draw particles
    for (const p of particles) {
      p.x += p.vx;
      p.y += p.vy;
      if (p.x < 0 || p.x > w) p.vx *= -1;
      if (p.y < 0 || p.y > h) p.vy *= -1;

      // Gentle repulsion from the cursor
      const dx = p.x - mouse.x;
      const dy = p.y - mouse.y;
      const dist = Math.hypot(dx, dy);
      if (dist < MOUSE_DIST && dist > 0) {
        const force = (MOUSE_DIST - dist) / MOUSE_DIST;
        p.x += (dx / dist) * force * 1.6;
        p.y += (dy / dist) * force * 1.6;
      }
      p.x = Math.max(0, Math.min(w, p.x));
      p.y = Math.max(0, Math.min(h, p.y));

      ctx.beginPath();
      ctx.arc(p.x, p.y, p.r, 0, Math.PI * 2);
      ctx.fillStyle = `rgba(${p.c},0.85)`;
      ctx.shadowBlur = 8;
      ctx.shadowColor = `rgba(${p.c},0.8)`;
      ctx.fill();
    }
    ctx.shadowBlur = 0;

    // Connecting lines (particle ↔ particle, particle ↔ cursor)
    ctx.lineWidth = 0.6;
    for (let i = 0; i < particles.length; i++) {
      const a = particles[i];
      for (let j = i + 1; j < particles.length; j++) {
        const b = particles[j];
        const d = Math.hypot(a.x - b.x, a.y - b.y);
        if (d < LINK_DIST) {
          ctx.strokeStyle = `rgba(${a.c},${(1 - d / LINK_DIST) * 0.22})`;
          ctx.beginPath();
          ctx.moveTo(a.x, a.y);
          ctx.lineTo(b.x, b.y);
          ctx.stroke();
        }
      }
      const md = Math.hypot(a.x - mouse.x, a.y - mouse.y);
      if (md < MOUSE_DIST) {
        ctx.strokeStyle = `rgba(0,240,255,${(1 - md / MOUSE_DIST) * 0.35})`;
        ctx.beginPath();
        ctx.moveTo(a.x, a.y);
        ctx.lineTo(mouse.x, mouse.y);
        ctx.stroke();
      }
    }
  }

  function loop() {
    if (!running) return;
    drawFrame();
    rafId = requestAnimationFrame(loop);
  }

  hero.addEventListener('mousemove', (e) => {
    const rect = canvas.getBoundingClientRect();
    mouse.x = e.clientX - rect.left;
    mouse.y = e.clientY - rect.top;
  });
  hero.addEventListener('mouseleave', () => { mouse.x = mouse.y = -9999; });

  resize();
  window.addEventListener('resize', debounce(resize, 200));
  if (prefersReducedMotion) return; // keep a single static frame

  // Pause animation when the hero is off-screen (saves battery/CPU)
  new IntersectionObserver(([entry]) => {
    running = entry.isIntersecting;
    cancelAnimationFrame(rafId);
    if (running) loop();
  }).observe(hero);
}

function initHeroPreview() {
  const bar = $('#installBar');
  const pct = $('#installPct');
  let progress = 0;
  let hold = 0;

  setInterval(() => {
    if (progress >= 100) {
      if (++hold < 8) return;          // pause on "Ready" for a moment
      hold = 0;
      progress = 0;
      bar.style.transition = 'none';
      bar.style.width = '0%';
      void bar.offsetWidth;             // force reflow so the reset isn't animated
      bar.style.transition = '';
    }
    progress = Math.min(100, progress + Math.random() * 7 + 1);
    bar.style.width = `${progress}%`;
    pct.textContent = progress >= 100 ? 'Ready ✓' : `${Math.floor(progress)}%`;
  }, 260);

  attachTilt($('#previewCard'), 12);
}

function initMarquee() {
  const track = $('#marqueeTrack');
  if (track) track.innerHTML += track.innerHTML; // duplicate for a seamless loop
}

/* ---------- 8. 3D TILT ---------- */
function attachTilt(el, max = 8) {
  if (!el || isTouchDevice || prefersReducedMotion) return;

  el.addEventListener('mousemove', (e) => {
    const rect = el.getBoundingClientRect();
    const x = (e.clientX - rect.left) / rect.width;
    const y = (e.clientY - rect.top) / rect.height;
    el.style.setProperty('--ry', `${(x - 0.5) * max * 2}deg`);
    el.style.setProperty('--rx', `${(0.5 - y) * max * 2}deg`);
    el.style.setProperty('--mx', `${x * 100}%`);
    el.style.setProperty('--my', `${y * 100}%`);
  });

  el.addEventListener('mouseleave', () => {
    el.style.setProperty('--rx', '0deg');
    el.style.setProperty('--ry', '0deg');
  });
}

/* ---------- 9. FILTERING & RENDERING ---------- */
function initFilters() {
  const pills = $('#filterPills');
  const modSearch = $('#modSearch');
  const navSearch = $('#navSearch');

  // Fill in category counts
  $$('.pill', pills).forEach((pill) => {
    const f = pill.dataset.filter;
    const count = f === 'all' ? MODS.length : MODS.filter((m) => m.category === f).length;
    const badge = $('.pill-count', pill);
    if (badge) badge.textContent = count;
  });

  pills.addEventListener('click', (e) => {
    const pill = e.target.closest('.pill');
    if (pill) setFilter(pill.dataset.filter);
  });

  // Search: both inputs stay in sync
  const debouncedRender = debounce(() => renderMods(), 250);
  const onInput = (source) => {
    state.search = source.value.trim();
    [modSearch, navSearch].forEach((input) => { if (input !== source) input.value = source.value; });
    debouncedRender();
  };
  modSearch.addEventListener('input', () => onInput(modSearch));
  navSearch.addEventListener('input', () => onInput(navSearch));
  navSearch.addEventListener('keydown', (e) => {
    if (e.key === 'Enter') {
      e.preventDefault();
      $('#mods').scrollIntoView({ behavior: 'smooth' });
    }
  });

  $('#sortSelect').addEventListener('change', (e) => {
    state.sort = e.target.value;
    renderMods();
  });

  // Category tiles jump to the grid with the filter applied
  $$('.category-tile').forEach((tile) => tile.addEventListener('click', () => {
    setFilter(tile.dataset.category);
    $('#mods').scrollIntoView({ behavior: 'smooth' });
  }));

  $('#resetFilters').addEventListener('click', resetFilters);

  requestAnimationFrame(moveIndicator);
  document.fonts?.ready.then(moveIndicator);
  window.addEventListener('resize', debounce(moveIndicator, 100));
}

function setFilter(filter) {
  if (state.filter === filter) return;
  state.filter = filter;
  $$('.pill').forEach((p) => {
    const active = p.dataset.filter === filter;
    p.classList.toggle('active', active);
    p.setAttribute('aria-selected', String(active));
  });
  moveIndicator();
  renderMods();
}

function resetFilters() {
  state.search = '';
  state.sort = 'popular';
  $('#modSearch').value = '';
  $('#navSearch').value = '';
  $('#sortSelect').value = 'popular';
  if (state.filter !== 'all') setFilter('all');
  else renderMods();
}

/** Slides the gradient highlight beneath the active pill */
function moveIndicator() {
  const pills = $('#filterPills');
  const active = $('.pill.active', pills);
  const indicator = $('.pill-indicator', pills);
  if (!active || !indicator) return;
  indicator.style.width = `${active.offsetWidth}px`;
  indicator.style.transform = `translateX(${active.offsetLeft}px)`;
  pills.scrollTo({ left: active.offsetLeft - (pills.clientWidth - active.offsetWidth) / 2, behavior: 'smooth' });
}

function getVisibleMods() {
  const q = state.search.toLowerCase();
  const sorters = {
    popular: (a, b) => b.downloads - a.downloads,
    rating: (a, b) => b.rating - a.rating || b.reviews - a.reviews,
    newest: (a, b) => parseDate(b.updated) - parseDate(a.updated),
    'price-low': (a, b) => a.price - b.price || b.downloads - a.downloads,
    'price-high': (a, b) => b.price - a.price || b.downloads - a.downloads
  };

  return MODS
    .filter((m) => {
      const matchesCategory = state.filter === 'all' || m.category === state.filter;
      const haystack = `${m.title} ${m.creator} ${m.game} ${CATEGORY_LABELS[m.category]}`.toLowerCase();
      return matchesCategory && (!q || haystack.includes(q));
    })
    .sort(sorters[state.sort] || sorters.popular);
}

/** Re-renders the grid with an exit → enter transition */
function renderMods(animate = true) {
  const grid = $('#modsGrid');
  const token = ++renderToken;
  const list = getVisibleMods();

  const paint = () => {
    if (token !== renderToken) return; // a newer render superseded this one
    grid.innerHTML = list.map(modCardHTML).join('');
    $$('.mod-card', grid).forEach((card) => attachTilt(card, 7));
    $('#emptyState').hidden = list.length > 0;
    updateResultsMeta(list.length);
  };

  const current = $$('.mod-card', grid);
  if (animate && current.length && !prefersReducedMotion) {
    current.forEach((card) => card.classList.add('is-leaving'));
    setTimeout(paint, 280);
  } else {
    paint();
  }
}

function updateResultsMeta(count) {
  let text = `Showing <strong>${count}</strong> of ${MODS.length} featured mods`;
  if (state.filter !== 'all') text += ` in <strong>${CATEGORY_LABELS[state.filter]}</strong>`;
  if (state.search) text += ` matching “<strong>${escapeHTML(state.search)}</strong>”`;
  $('#resultsMeta').innerHTML = text;
}

function cartButtonHTML(inCart) {
  return inCart
    ? '<i class="fa-solid fa-check"></i><span>In Cart</span>'
    : '<i class="fa-solid fa-cart-plus"></i><span>Add</span>';
}

function modCardHTML(m, i) {
  const tag = TAG_META[m.tag] || TAG_META.New;
  const inCart = state.cart.includes(m.id);
  const wished = state.wishlist.has(m.id);

  const primaryAction = m.price === 0
    ? '<button class="btn btn-sm btn-primary" data-action="download"><i class="fa-solid fa-download"></i><span>Download</span></button>'
    : `<button class="btn btn-sm btn-primary ${inCart ? 'in-cart' : ''}" data-action="cart">${cartButtonHTML(inCart)}</button>`;

  return `
    <article class="mod-card" data-id="${m.id}" style="--i:${i}" tabindex="0" aria-label="${m.title} by ${m.creator}">
      <div class="card-glow"></div>
      <div class="card-media">
        <img src="${imgUrl(m.seed)}" alt="${m.title} screenshot" loading="lazy" width="800" height="500" />
        <span class="card-tag ${tag.cls}"><i class="fa-solid ${tag.icon}"></i>${m.tag}</span>
        <button class="wish-btn ${wished ? 'active' : ''}" data-action="wish" aria-label="Toggle wishlist" aria-pressed="${wished}">
          <i class="fa-${wished ? 'solid' : 'regular'} fa-heart"></i>
        </button>
        <span class="card-game"><i class="fa-solid fa-gamepad"></i>${m.game}</span>
      </div>
      <div class="card-body">
        <div class="card-meta-top">
          <span class="card-cat">${CATEGORY_LABELS[m.category]}</span>
          <span class="card-rating"><i class="fa-solid fa-star"></i>${m.rating.toFixed(1)}<small>(${compact(m.reviews)})</small></span>
        </div>
        <h3 class="card-title">${m.title}</h3>
        <p class="card-creator">by <span>${handle(m.creator)}</span> <i class="fa-solid fa-circle-check verified" title="Verified creator"></i></p>
        <div class="card-stats">
          <span><i class="fa-solid fa-download"></i><b data-downloads>${compact(m.downloads)}</b></span>
          <span><i class="fa-solid fa-hard-drive"></i>${m.size}</span>
          <span><i class="fa-solid fa-code-branch"></i>v${m.version}</span>
        </div>
        <div class="card-footer">
          <span class="price ${m.price === 0 ? 'free' : ''}">${formatPrice(m.price)}</span>
          <div class="card-actions">
            <button class="icon-btn" data-action="preview" aria-label="Quick preview"><i class="fa-solid fa-eye"></i></button>
            ${primaryAction}
          </div>
        </div>
      </div>
    </article>`;
}

/* ---------- 10. GRID INTERACTIONS ---------- */
function initGridEvents() {
  const grid = $('#modsGrid');

  grid.addEventListener('click', (e) => {
    const card = e.target.closest('.mod-card');
    if (!card) return;
    const mod = getMod(card.dataset.id);
    const btn = e.target.closest('[data-action]');

    if (!btn) { openModal(mod.id); return; }

    switch (btn.dataset.action) {
      case 'preview': openModal(mod.id); break;
      case 'download': quickDownload(mod, btn); break;
      case 'cart': addToCart(mod.id); break;
      case 'wish': toggleWishlist(mod.id, btn); break;
    }
  });

  // Keyboard access: Enter / Space on a focused card opens the quick view
  grid.addEventListener('keydown', (e) => {
    if ((e.key === 'Enter' || e.key === ' ') && e.target.classList.contains('mod-card')) {
      e.preventDefault();
      openModal(e.target.dataset.id);
    }
  });
}

/* ---------- 11. DOWNLOADS & WISHLIST ---------- */
function quickDownload(mod, btn) {
  if (btn.disabled) return;
  const original = btn.innerHTML;
  btn.disabled = true;
  btn.innerHTML = '<span class="spinner"></span><span>0%</span>';
  const label = btn.lastElementChild;
  let progress = 0;

  toast({ type: 'download', title: 'Download started', message: `<b>${mod.title}</b> (${mod.size}) is on its way…` });

  const timer = setInterval(() => {
    progress = Math.min(100, progress + Math.random() * 18 + 6);
    label.textContent = `${Math.floor(progress)}%`;
    if (progress >= 100) {
      clearInterval(timer);
      completeDownload(mod);
      btn.classList.add('is-success');
      btn.innerHTML = '<i class="fa-solid fa-check"></i><span>Done</span>';
      setTimeout(() => {
        btn.disabled = false;
        btn.classList.remove('is-success');
        btn.innerHTML = original;
      }, 2200);
    }
  }, 180);
}

function completeDownload(mod) {
  mod.downloads += 1;
  $$(`.mod-card[data-id="${mod.id}"] [data-downloads]`).forEach((el) => { el.textContent = compact(mod.downloads); });
  const modalStat = $('#modalDownloads');
  if (modalStat && state.activeModal === mod.id) modalStat.textContent = compact(mod.downloads);
  toast({ type: 'success', title: 'Download complete', message: `<b>${mod.title}</b> is ready to install. Happy modding!` });
}

function toggleWishlist(id, btn) {
  const mod = getMod(id);
  const adding = !state.wishlist.has(id);
  adding ? state.wishlist.add(id) : state.wishlist.delete(id);
  saveJSON(STORAGE.wishlist, [...state.wishlist]);

  // Sync every wishlist button for this mod (card + modal)
  $$(`[data-wish-id="${id}"], .mod-card[data-id="${id}"] [data-action="wish"]`).concat(btn ? [btn] : [])
    .forEach((b) => {
      b.classList.toggle('active', adding);
      b.setAttribute('aria-pressed', String(adding));
      b.innerHTML = `<i class="fa-${adding ? 'solid' : 'regular'} fa-heart"></i>`;
    });

  toast({
    type: adding ? 'success' : 'info',
    title: adding ? 'Added to wishlist' : 'Removed from wishlist',
    message: `<b>${mod.title}</b>`
  });
}

/* ---------- 12. MOD DETAIL MODAL ---------- */
function buildChangelog(mod) {
  const [maj, min, patch] = mod.version.split('.').map(Number);
  const updated = parseDate(mod.updated);
  const daysAgo = (n) => { const d = new Date(updated); d.setDate(d.getDate() - n); return formatDate(d); };

  return [
    { version: mod.version, date: formatDate(updated), latest: true,
      notes: ['Compatibility with the latest game patch', 'Up to 18% faster load times', 'Fixed a rare crash when loading older saves'] },
    { version: `${maj}.${Math.max(0, min - 1)}.${min > 0 ? 3 : Math.max(0, patch - 1)}`, date: daysAgo(34),
      notes: ['New in-game configuration menu', 'Improved compatibility with popular UI mods', 'Localization: FR, DE, ES, PT-BR, JA'] },
    { version: `${Math.max(1, maj - 1)}.0.0`, date: daysAgo(120),
      notes: ['Major rewrite of core systems', 'Brand-new installer with automatic backups'] }
  ];
}

function modalHTML(mod) {
  const tag = TAG_META[mod.tag] || TAG_META.New;
  const inCart = state.cart.includes(mod.id);
  const wished = state.wishlist.has(mod.id);
  const shots = [0, 1, 2, 3, 4].map((i) => (i === 0 ? mod.seed : `${mod.seed}-${i}`));
  const changelog = buildChangelog(mod);
  const isFree = mod.price === 0;

  const purchaseButtons = isFree
    ? `<button class="btn btn-primary btn-lg" id="modalDownload"><i class="fa-solid fa-download"></i><span>Download Now</span></button>`
    : `<button class="btn btn-ghost" id="modalCart">${inCart ? '<i class="fa-solid fa-check"></i> In Cart' : '<i class="fa-solid fa-cart-plus"></i> Add to Cart'}</button>
       <button class="btn btn-primary" id="modalBuy"><i class="fa-solid fa-bolt"></i> Buy Now</button>`;

  return `
    <div class="modal-grid">
      <!-- Gallery -->
      <div class="modal-gallery">
        <div class="gallery-main">
          <img id="galleryMain" src="${imgUrl(shots[0], 1280, 800)}" alt="${mod.title} screenshot 1" />
          <span class="card-tag ${tag.cls}"><i class="fa-solid ${tag.icon}"></i>${mod.tag}</span>
          <button class="gallery-nav prev" data-gallery="prev" aria-label="Previous screenshot"><i class="fa-solid fa-chevron-left"></i></button>
          <button class="gallery-nav next" data-gallery="next" aria-label="Next screenshot"><i class="fa-solid fa-chevron-right"></i></button>
          <span class="gallery-counter" id="galleryCounter">1 / ${shots.length}</span>
        </div>
        <div class="gallery-thumbs">
          ${shots.map((s, i) => `
            <button class="thumb ${i === 0 ? 'active' : ''}" data-index="${i}" aria-label="Show screenshot ${i + 1}">
              <img src="${imgUrl(s, 320, 200)}" alt="" loading="lazy" />
            </button>`).join('')}
        </div>
      </div>

      <!-- Info -->
      <div class="modal-info">
        <div class="modal-badges">
          <span class="chip"><i class="fa-solid fa-gamepad"></i>${mod.game}</span>
          <span class="chip"><i class="fa-solid fa-tag"></i>${CATEGORY_LABELS[mod.category]}</span>
          <span class="chip"><i class="fa-solid fa-shield-halved"></i>Virus-scanned</span>
        </div>

        <h2 class="modal-title">${mod.title}</h2>

        <div class="modal-creator">
          <img src="${imgUrl(`creator-${mod.creator}`, 100, 100)}" alt="${mod.creator}" />
          <div>
            <strong>${handle(mod.creator)} <i class="fa-solid fa-circle-check verified"></i></strong>
            <small>${mod.creator} · Verified creator</small>
          </div>
          <button class="btn btn-ghost btn-sm" id="followBtn"><i class="fa-solid fa-user-plus"></i> Follow</button>
        </div>

        <div class="modal-stats">
          <div class="m-stat"><strong>${mod.rating.toFixed(1)}</strong><span class="stars">${starsHTML(mod.rating)}</span></div>
          <div class="m-stat"><strong id="modalDownloads">${compact(mod.downloads)}</strong><small>Downloads</small></div>
          <div class="m-stat"><strong>${mod.size}</strong><small>Size</small></div>
          <div class="m-stat"><strong>v${mod.version}</strong><small>Version</small></div>
        </div>

        <div class="modal-tabs" role="tablist">
          <button class="tab active" data-tab="overview" role="tab">Overview</button>
          <button class="tab" data-tab="changelog" role="tab">Changelog</button>
          <button class="tab" data-tab="requirements" role="tab">Requirements</button>
        </div>

        <div class="tab-panels">
          <div class="tab-panel active" data-panel="overview">
            <p>${mod.description}</p>
            <ul class="feature-list">
              ${mod.features.map((f) => `<li><i class="fa-solid fa-circle-check"></i>${f}</li>`).join('')}
            </ul>
          </div>
          <div class="tab-panel" data-panel="changelog">
            <div class="changelog">
              ${changelog.map((c) => `
                <div class="changelog-item">
                  <div class="cl-head">
                    <span class="cl-version">v${c.version}</span>
                    <span class="cl-date">${c.date}</span>
                    ${c.latest ? '<span class="cl-latest">Latest</span>' : ''}
                  </div>
                  <ul>${c.notes.map((n) => `<li>${n}</li>`).join('')}</ul>
                </div>`).join('')}
            </div>
          </div>
          <div class="tab-panel" data-panel="requirements">
            <ul class="req-list">
              <li><span>Game version</span><strong>Latest (Steam / GOG / Epic)</strong></li>
              <li><span>Disk space</span><strong>${mod.size}</strong></li>
              <li><span>Recommended GPU</span><strong>${mod.category === 'graphics' ? '8 GB VRAM or more' : 'Any DX11 GPU'}</strong></li>
              <li><span>Dependencies</span><strong>${mod.id === 10 ? 'None' : 'ModOrganizer Nexus+ (recommended)'}</strong></li>
              <li><span>Last updated</span><strong>${formatDate(parseDate(mod.updated))}</strong></li>
            </ul>
          </div>
        </div>

        <div class="download-countdown" id="countdown" hidden>
          <div class="countdown-ring" id="countdownRing"><span id="countdownNum">5</span></div>
          <div class="countdown-text">
            <strong id="countdownTitle">Your download will start shortly</strong>
            <small id="countdownStatus">Verifying files &amp; scanning for threats…</small>
          </div>
          <button class="countdown-cancel" id="countdownCancel">Cancel</button>
        </div>

        <div class="modal-purchase">
          <div class="modal-price">
            <small>Price</small>
            <strong class="${isFree ? 'free' : ''}">${formatPrice(mod.price)}</strong>
          </div>
          <div class="purchase-actions">
            <button class="icon-btn wish-modal ${wished ? 'active' : ''}" data-wish-id="${mod.id}" aria-label="Toggle wishlist" aria-pressed="${wished}">
              <i class="fa-${wished ? 'solid' : 'regular'} fa-heart"></i>
            </button>
            ${purchaseButtons}
          </div>
        </div>
      </div>
    </div>`;
}

function initModal() {
  $('#modModal').addEventListener('click', (e) => {
    if (e.target.closest('[data-close]')) closeModal();
  });
}

function openModal(id) {
  const mod = getMod(id);
  if (!mod) return;

  state.lastFocus = document.activeElement;
  state.activeModal = mod.id;

  const modal = $('#modModal');
  $('#modalBody').innerHTML = modalHTML(mod);
  $('#modalPanel').scrollTop = 0;
  modal.classList.add('open');
  modal.setAttribute('aria-hidden', 'false');
  syncScrollLock();
  bindModalEvents(mod);

  setTimeout(() => $('.modal-close', modal).focus({ preventScroll: true }), 60);
}

function closeModal() {
  const modal = $('#modModal');
  if (!modal.classList.contains('open')) return;
  cancelCountdown();
  modal.classList.remove('open');
  modal.setAttribute('aria-hidden', 'true');
  state.activeModal = null;
  state.gallery = null;
  syncScrollLock();
  state.lastFocus?.focus?.({ preventScroll: true });
}

function bindModalEvents(mod) {
  const body = $('#modalBody');
  const shots = [0, 1, 2, 3, 4].map((i) => imgUrl(i === 0 ? mod.seed : `${mod.seed}-${i}`, 1280, 800));
  const main = $('#galleryMain');
  const thumbs = $$('.thumb', body);
  const counter = $('#galleryCounter');
  let current = 0;

  // Gallery
  const show = (index) => {
    current = (index + shots.length) % shots.length;
    thumbs.forEach((t, i) => t.classList.toggle('active', i === current));
    counter.textContent = `${current + 1} / ${shots.length}`;
    main.classList.add('fading');
    setTimeout(() => {
      main.src = shots[current];
      main.alt = `${mod.title} screenshot ${current + 1}`;
      const reveal = () => main.classList.remove('fading');
      main.onload = reveal;
      setTimeout(reveal, 500); // fallback if the image is cached / slow
    }, 200);
  };
  state.gallery = { next: () => show(current + 1), prev: () => show(current - 1) };

  thumbs.forEach((t) => t.addEventListener('click', () => show(Number(t.dataset.index))));
  $$('[data-gallery]', body).forEach((b) => b.addEventListener('click', () => (b.dataset.gallery === 'next' ? state.gallery.next() : state.gallery.prev())));

  // Tabs
  $$('.tab', body).forEach((tab) => tab.addEventListener('click', () => {
    $$('.tab', body).forEach((t) => t.classList.toggle('active', t === tab));
    $$('.tab-panel', body).forEach((p) => p.classList.toggle('active', p.dataset.panel === tab.dataset.tab));
  }));

  // Follow
  const follow = $('#followBtn');
  follow.addEventListener('click', () => {
    const following = follow.classList.toggle('in-cart');
    follow.innerHTML = following ? '<i class="fa-solid fa-check"></i> Following' : '<i class="fa-solid fa-user-plus"></i> Follow';
    if (following) toast({ type: 'success', title: 'Following creator', message: `You'll be notified when <b>${handle(mod.creator)}</b> publishes updates.` });
  });

  // Wishlist
  const wishBtn = $('.wish-modal', body);
  wishBtn.addEventListener('click', () => toggleWishlist(mod.id, wishBtn));

  // Purchase / download
  if (mod.price === 0) {
    $('#modalDownload').addEventListener('click', () => startCountdown(mod));
    $('#countdownCancel').addEventListener('click', () => cancelCountdown(true));
  } else {
    $('#modalCart').addEventListener('click', () => addToCart(mod.id));
    $('#modalBuy').addEventListener('click', () => {
      addToCart(mod.id, { silent: true });
      closeModal();
      setTimeout(openDrawer, 300);
    });
  }
}

/** Free mods: animated 5-second countdown ring before the "download" */
function startCountdown(mod) {
  if (state.countdownTimer) return;
  const box = $('#countdown');
  const btn = $('#modalDownload');
  const num = $('#countdownNum');
  const ring = $('#countdownRing');
  const title = $('#countdownTitle');
  const status = $('#countdownStatus');
  const DURATION = 5000;
  const start = performance.now();

  box.hidden = false;
  btn.disabled = true;
  btn.classList.remove('is-success');
  btn.querySelector('span').textContent = 'Preparing…';
  title.textContent = 'Your download will start shortly';
  status.textContent = 'Verifying files & scanning for threats…';

  state.countdownTimer = setInterval(() => {
    const elapsed = performance.now() - start;
    const p = Math.min(1, elapsed / DURATION);
    ring.style.setProperty('--p', (p * 100).toFixed(1));
    num.textContent = Math.max(1, Math.ceil((DURATION - elapsed) / 1000));
    if (p > 0.5) status.textContent = 'Optimizing package for your system…';

    if (p >= 1) {
      clearInterval(state.countdownTimer);
      state.countdownTimer = null;
      num.innerHTML = '<i class="fa-solid fa-check"></i>';
      title.textContent = 'Download started!';
      status.textContent = 'Check your downloads folder or the ModForge app.';
      btn.disabled = false;
      btn.classList.add('is-success');
      btn.querySelector('span').textContent = 'Download Again';
      completeDownload(mod);
    }
  }, 50);
}

function cancelCountdown(notify = false) {
  const wasRunning = !!state.countdownTimer;
  clearInterval(state.countdownTimer);
  state.countdownTimer = null;

  const box = $('#countdown');
  const btn = $('#modalDownload');
  if (box && wasRunning) box.hidden = true;
  if (btn && wasRunning) {
    btn.disabled = false;
    btn.querySelector('span').textContent = 'Download Now';
    $('#countdownRing')?.style.setProperty('--p', 0);
  }
  if (notify && wasRunning) toast({ type: 'info', title: 'Download cancelled', message: 'No worries, you can start it again anytime.' });
}

function syncModalCartButton() {
  const btn = $('#modalCart');
  if (!btn || !state.activeModal) return;
  const inCart = state.cart.includes(state.activeModal);
  btn.classList.toggle('in-cart', inCart);
  btn.innerHTML = inCart ? '<i class="fa-solid fa-check"></i> In Cart' : '<i class="fa-solid fa-cart-plus"></i> Add to Cart';
}

/* ---------- 13. CART & DRAWER ---------- */
function initCart() {
  $('#cartBtn').addEventListener('click', openDrawer);
  $('#drawerClose').addEventListener('click', closeDrawer);
  $('#overlay').addEventListener('click', closeDrawer);
  $('#checkoutBtn').addEventListener('click', checkout);

  $('#cartItems').addEventListener('click', (e) => {
    const removeBtn = e.target.closest('[data-remove]');
    if (removeBtn) {
      const item = removeBtn.closest('.cart-item');
      item.classList.add('removing');
      setTimeout(() => removeFromCart(Number(removeBtn.dataset.remove)), 280);
      return;
    }
    if (e.target.closest('[data-close-drawer]')) {
      closeDrawer();
      $('#mods').scrollIntoView({ behavior: 'smooth' });
    }
  });

  // Drop stale IDs from storage
  state.cart = state.cart.filter((id) => getMod(id));
  updateCartUI();
}

function openDrawer() {
  setMenuOpen(false);
  $('#cartDrawer').classList.add('open');
  $('#cartDrawer').setAttribute('aria-hidden', 'false');
  $('#overlay').classList.add('show');
  syncScrollLock();
  setTimeout(() => $('#drawerClose').focus({ preventScroll: true }), 100);
}

function closeDrawer() {
  $('#cartDrawer').classList.remove('open');
  $('#cartDrawer').setAttribute('aria-hidden', 'true');
  $('#overlay').classList.remove('show');
  syncScrollLock();
}

function addToCart(id, { silent = false } = {}) {
  const mod = getMod(id);
  if (state.cart.includes(id)) {
    if (!silent) toast({ type: 'info', title: 'Already in your cart', message: `<b>${mod.title}</b> is waiting for you.`, action: { label: 'View cart', onClick: openDrawer } });
    return false;
  }
  state.cart.push(id);
  saveJSON(STORAGE.cart, state.cart);
  updateCartUI(true);
  if (!silent) {
    toast({ type: 'success', title: 'Added to cart', message: `<b>${mod.title}</b> · ${formatPrice(mod.price)}`, action: { label: 'View cart', onClick: openDrawer } });
  }
  return true;
}

function removeFromCart(id) {
  state.cart = state.cart.filter((x) => x !== id);
  saveJSON(STORAGE.cart, state.cart);
  updateCartUI();
}

function updateCartUI(bump = false) {
  const items = state.cart.map(getMod).filter(Boolean);
  const count = items.length;
  const badge = $('#cartCount');

  badge.textContent = count;
  badge.classList.toggle('show', count > 0);
  if (bump) {
    badge.classList.remove('bump');
    void badge.offsetWidth; // restart animation
    badge.classList.add('bump');
  }

  $('#drawerCount').textContent = `(${count})`;
  $('#cartItems').innerHTML = count
    ? items.map((m) => `
        <div class="cart-item">
          <img src="${imgUrl(m.seed, 160, 100)}" alt="" />
          <div class="cart-item-info">
            <h4>${m.title}</h4>
            <small>${m.game} · ${m.size}</small>
          </div>
          <span class="cart-item-price">${formatPrice(m.price)}</span>
          <button class="cart-remove" data-remove="${m.id}" aria-label="Remove ${m.title}"><i class="fa-solid fa-trash-can"></i></button>
        </div>`).join('')
    : `<div class="cart-empty">
         <i class="fa-solid fa-cart-shopping"></i>
         <h4>Your cart is empty</h4>
         <p>Premium mods you add will appear here.</p>
         <button class="btn btn-ghost btn-sm" data-close-drawer><i class="fa-solid fa-compass"></i> Browse mods</button>
       </div>`;

  const total = items.reduce((sum, m) => sum + m.price, 0);
  $('#cartTotal').textContent = `$${total.toFixed(2)}`;
  $('#checkoutBtn').disabled = count === 0;

  // Keep card buttons in sync
  $$('.mod-card [data-action="cart"]').forEach((btn) => {
    const inCart = state.cart.includes(Number(btn.closest('.mod-card').dataset.id));
    btn.classList.toggle('in-cart', inCart);
    btn.innerHTML = cartButtonHTML(inCart);
  });
  syncModalCartButton();
}

function checkout() {
  const btn = $('#checkoutBtn');
  if (!state.cart.length) return;

  const items = state.cart.map(getMod);
  const total = items.reduce((sum, m) => sum + m.price, 0);
  const original = btn.innerHTML;
  btn.disabled = true;
  btn.innerHTML = '<span class="spinner"></span> Processing secure payment…';

  setTimeout(() => {
    state.cart = [];
    saveJSON(STORAGE.cart, state.cart);
    btn.innerHTML = original;
    updateCartUI();
    closeDrawer();
    toast({
      type: 'success',
      title: 'Purchase complete!',
      message: `${items.length} mod${items.length > 1 ? 's' : ''} unlocked for $${total.toFixed(2)}. They're now in your library.`,
      duration: 5500
    });
  }, 1600);
}

/* ---------- 14. TOAST NOTIFICATIONS ---------- */
function toast({ type = 'info', title = '', message = '', duration = 4000, action = null } = {}) {
  const container = $('#toastContainer');
  const icons = { success: 'fa-circle-check', info: 'fa-circle-info', error: 'fa-triangle-exclamation', download: 'fa-cloud-arrow-down' };

  const el = document.createElement('div');
  el.className = `toast toast--${type}`;
  el.setAttribute('role', 'status');
  el.style.setProperty('--duration', `${duration}ms`);
  el.innerHTML = `
    <span class="toast-icon"><i class="fa-solid ${icons[type] || icons.info}"></i></span>
    <div class="toast-content">
      <strong>${title}</strong>
      <p>${message}</p>
      ${action ? `<button class="toast-action">${action.label} <i class="fa-solid fa-arrow-right"></i></button>` : ''}
    </div>
    <button class="toast-close" aria-label="Dismiss notification"><i class="fa-solid fa-xmark"></i></button>
    <span class="toast-progress"></span>`;

  container.appendChild(el);
  while (container.children.length > 4) container.firstElementChild.remove();
  requestAnimationFrame(() => requestAnimationFrame(() => el.classList.add('show')));

  // Auto-dismiss with pause-on-hover
  let remaining = duration;
  let startedAt = Date.now();
  let timer = setTimeout(dismiss, remaining);

  function dismiss() {
    clearTimeout(timer);
    el.classList.add('hide');
    setTimeout(() => el.remove(), 450);
  }

  el.addEventListener('mouseenter', () => {
    clearTimeout(timer);
    remaining -= Date.now() - startedAt;
    el.classList.add('paused');
  });
  el.addEventListener('mouseleave', () => {
    startedAt = Date.now();
    el.classList.remove('paused');
    timer = setTimeout(dismiss, Math.max(remaining, 600));
  });

  $('.toast-close', el).addEventListener('click', dismiss);
  if (action) $('.toast-action', el).addEventListener('click', () => { action.onClick(); dismiss(); });
}

/* ---------- 15. STATS COUNTERS ---------- */
function initCounters() {
  const counters = $$('.counter');
  if (!counters.length) return;

  const run = (el) => {
    const target = parseFloat(el.dataset.target);
    const decimals = parseInt(el.dataset.decimals || '0', 10);
    const fmt = (v) => v.toLocaleString('en-US', { minimumFractionDigits: decimals, maximumFractionDigits: decimals });
    if (prefersReducedMotion) { el.textContent = fmt(target); return; }

    const duration = 2200;
    const start = performance.now();
    const tick = (now) => {
      const t = Math.min(1, (now - start) / duration);
      const eased = t === 1 ? 1 : 1 - Math.pow(2, -10 * t); // easeOutExpo
      el.textContent = fmt(target * eased);
      if (t < 1) requestAnimationFrame(tick);
      else el.closest('.stat-card')?.classList.add('done');
    };
    requestAnimationFrame(tick);
  };

  const io = new IntersectionObserver((entries, obs) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) { run(entry.target); obs.unobserve(entry.target); }
    });
  }, { threshold: 0.5 });
  counters.forEach((c) => io.observe(c));
}

/* ---------- 16. TESTIMONIALS CAROUSEL ---------- */
function initCarousel() {
  const carousel = $('#carousel');
  const track = $('#carouselTrack');
  const dotsWrap = $('#carouselDots');

  track.innerHTML = TESTIMONIALS.map((t) => `
    <article class="testimonial-card">
      <div class="t-top">
        <div class="t-stars">${starsHTML(t.rating)}</div>
        <span class="t-badge">${t.badge}</span>
      </div>
      <i class="fa-solid fa-quote-right quote-icon"></i>
      <p class="t-text">“${t.text}”</p>
      <div class="t-author">
        <span class="t-avatar"><img src="${avatarUrl(t.avatar)}" alt="${t.name}" loading="lazy" draggable="false" /></span>
        <div><strong>${t.name}</strong><small>${t.role}</small></div>
      </div>
    </article>`).join('');

  const slides = $$('.testimonial-card', track);
  let index = 0, perView = 1, maxIndex = 0, timer = null;

  const update = () => {
    const gap = parseFloat(getComputedStyle(track).columnGap) || 0;
    const width = slides[0].getBoundingClientRect().width;
    track.style.transform = `translateX(${-index * (width + gap)}px)`;
    $$('button', dotsWrap).forEach((d, i) => d.classList.toggle('active', i === index));
    slides.forEach((s, i) => s.classList.toggle('is-visible', i >= index && i < index + perView));
  };

  const measure = () => {
    perView = parseInt(getComputedStyle(track).getPropertyValue('--per'), 10) || 1;
    maxIndex = Math.max(0, slides.length - perView);
    index = Math.min(index, maxIndex);
    dotsWrap.innerHTML = Array.from({ length: maxIndex + 1 }, (_, i) => `<button data-index="${i}" aria-label="Go to slide ${i + 1}"></button>`).join('');
    update();
  };

  const go = (i) => {
    index = i > maxIndex ? 0 : i < 0 ? maxIndex : i;
    update();
  };

  const stop = () => clearInterval(timer);
  const start = () => {
    if (prefersReducedMotion) return;
    stop();
    timer = setInterval(() => go(index + 1), 5000);
  };

  $('#nextBtn').addEventListener('click', () => { go(index + 1); start(); });
  $('#prevBtn').addEventListener('click', () => { go(index - 1); start(); });
  dotsWrap.addEventListener('click', (e) => {
    const dot = e.target.closest('button');
    if (dot) { go(Number(dot.dataset.index)); start(); }
  });

  carousel.addEventListener('mouseenter', stop);
  carousel.addEventListener('mouseleave', start);
  document.addEventListener('visibilitychange', () => (document.hidden ? stop() : start()));

  // Swipe / drag support
  let startX = null;
  track.addEventListener('pointerdown', (e) => { startX = e.clientX; });
  window.addEventListener('pointerup', (e) => {
    if (startX === null) return;
    const dx = e.clientX - startX;
    if (Math.abs(dx) > 50) { go(index + (dx < 0 ? 1 : -1)); start(); }
    startX = null;
  });

  window.addEventListener('resize', debounce(measure, 150));
  measure();
  start();
}

/* ---------- 17. PRICING, NEWSLETTER & MISC ---------- */
function initPricing() {
  const toggle = $('#billingToggle');
  const labels = $$('[data-billing-label]');

  toggle.addEventListener('click', () => {
    const yearly = toggle.getAttribute('aria-checked') !== 'true';
    toggle.setAttribute('aria-checked', String(yearly));
    labels.forEach((l) => l.classList.toggle('active', l.dataset.billingLabel === (yearly ? 'yearly' : 'monthly')));

    $$('.amount').forEach((el) => {
      el.classList.remove('flip');
      void el.offsetWidth;
      el.textContent = yearly ? el.dataset.yearly : el.dataset.monthly;
      el.classList.add('flip');
    });
    $$('.plan-note').forEach((n) => { n.textContent = yearly ? n.dataset.yearlyNote : n.dataset.monthlyNote; });
  });

  $$('[data-plan]').forEach((btn) => btn.addEventListener('click', () => {
    const plan = btn.dataset.plan;
    toast(plan === 'Explorer'
      ? { type: 'success', title: 'Welcome aboard, Explorer!', message: 'Your free account is ready. Start downloading mods right away.' }
      : { type: 'success', title: `${plan} plan selected`, message: 'Redirecting you to secure checkout… (demo)' });
  }));
}

function initNewsletter() {
  const form = $('#newsletterForm');
  form.addEventListener('submit', (e) => {
    e.preventDefault();
    const input = $('input', form);
    const email = input.value.trim();
    const valid = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(email);

    if (!valid) {
      form.classList.remove('shake');
      void form.offsetWidth;
      form.classList.add('shake');
      toast({ type: 'error', title: 'Invalid email', message: 'Please enter a valid email address.' });
      return;
    }
    toast({ type: 'success', title: "You're subscribed!", message: `Weekly mod drops will land in <b>${escapeHTML(email)}</b>.` });
