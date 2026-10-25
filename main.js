
// ── Header scroll effect ──────────────────────
const header = document.getElementById('header');
window.addEventListener('scroll', () => {
  header.classList.toggle('scrolled', window.scrollY > 40);
}, { passive: true });

// ── Hero bg zoom on load ──────────────────────
const heroBg = document.getElementById('heroBg');
// window.load（全リソース完了）ではなく DOMContentLoaded で即トリガー
document.addEventListener('DOMContentLoaded', () => {
  setTimeout(() => heroBg.classList.add('loaded'), 50);
});

// ── Hamburger / Mobile menu ───────────────────
const hamburger   = document.getElementById('hamburger');
const mobileMenu  = document.getElementById('mobileMenu');
const mobileLinks = mobileMenu.querySelectorAll('a');

function toggleMenu(force) {
  const open = force !== undefined ? force : !hamburger.classList.contains('open');
  hamburger.classList.toggle('open', open);
  mobileMenu.classList.toggle('open', open);
  hamburger.setAttribute('aria-expanded', String(open));
  document.body.style.overflow = open ? 'hidden' : '';
}

hamburger.addEventListener('click', () => toggleMenu());
mobileLinks.forEach(link => {
  link.addEventListener('click', () => toggleMenu(false));
});

// ── Intersection Observer — fade-in ──────────
const fadeEls = document.querySelectorAll('.fade-in, .fade-in-left, .fade-in-right');
const observer = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.classList.add('visible');
      observer.unobserve(entry.target);
    }
  });
}, { threshold: 0.12, rootMargin: '0px 0px -40px 0px' });

fadeEls.forEach(el => observer.observe(el));

// ── Gold particles in hero ────────────────────
const particleContainer = document.getElementById('particles');
const PARTICLE_COUNT = 18;

function createParticle() {
  const p = document.createElement('div');
  p.className = 'particle';
  const x    = Math.random() * 100;
  const dur  = 4 + Math.random() * 6;
  const del  = Math.random() * 6;
  const size = 1 + Math.random() * 2;
  p.style.cssText = `
    left: ${x}%;
    bottom: 10%;
    width: ${size}px;
    height: ${size}px;
    animation-duration: ${dur}s;
    animation-delay: ${del}s;
  `;
  particleContainer.appendChild(p);
}
for (let i = 0; i < PARTICLE_COUNT; i++) createParticle();

// ── Smooth anchor scroll offset ───────────────
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
  anchor.addEventListener('click', function (e) {
    const target = document.querySelector(this.getAttribute('href'));
    if (!target) return;
    e.preventDefault();
    const headerH = parseInt(getComputedStyle(document.documentElement)
      .getPropertyValue('--header-h')) || 72;
    const top = target.getBoundingClientRect().top + window.scrollY - headerH;
    window.scrollTo({ top, behavior: 'smooth' });
  });
});

// ── Hero parallax (subtle) ────────────────────
window.addEventListener('scroll', () => {
  const scrollY = window.scrollY;
  if (scrollY < window.innerHeight) {
    heroBg.style.transform = `scale(1) translateY(${scrollY * 0.22}px)`;
  }
}, { passive: true });
  
// ── GA4: YouTube・Instagram のリンククリック計測 ──
// 仕様の正本は月次Webレポート docs/GA4_SETUP.md 6章（youtube_click / instagram_click + link_location）
// - GA4 タグは正式ホストでだけ読み込むため、プレビュー・GitHub Pages では window.gtag が無く何も送らない
// - 遷移は妨げない（preventDefault しない。リンクはすべて新しいタブで開く）
// - 同じリンクの連続クリック（ダブルクリック等）は1回だけ送る
(() => {
  const MAX_PARAM_LENGTH = 100;   // GA4 のイベントパラメータ値の上限
  const DUPLICATE_WINDOW_MS = 1000;
  const LINK_EVENTS = [
    { eventName: 'instagram_click', matches: (url) => /(^|\.)instagram\.com$/.test(url.hostname) },
    { eventName: 'youtube_click',   matches: (url) => /(^|\.)youtube\.com$/.test(url.hostname) || url.hostname === 'youtu.be' },
  ];
  const lastSentAt = new WeakMap();

  const linkText = (link) =>
    (link.textContent.replace(/\s+/g, ' ').trim() || link.getAttribute('aria-label') || '').slice(0, MAX_PARAM_LENGTH);

  document.addEventListener('click', (event) => {
    if (typeof window.gtag !== 'function') return;
    const link = event.target.closest('a[href]');
    if (!link) return;
    let url;
    try {
      url = new URL(link.href);
    } catch (error) {
      return;
    }
    const match = LINK_EVENTS.find((item) => item.matches(url));
    if (!match) return;

    const now = Date.now();
    if (now - (lastSentAt.get(link) || 0) < DUPLICATE_WINDOW_MS) return;
    lastSentAt.set(link, now);

    window.gtag('event', match.eventName, {
      link_location: link.dataset.gaLocation || 'other',
      link_text: linkText(link),
      link_url: `${url.origin}${url.pathname}`.slice(0, MAX_PARAM_LENGTH),
    });
  });
})();
