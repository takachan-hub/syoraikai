
// ── Header scroll effect ──────────────────────
const header = document.getElementById('header');
window.addEventListener('scroll', () => {
  header.classList.toggle('scrolled', window.scrollY > 40);
}, { passive: true });

// ── Hero bg zoom on load ──────────────────────
const heroBg = document.getElementById('heroBg');
window.addEventListener('load', () => {
  setTimeout(() => heroBg.classList.add('loaded'), 100);
});

// ── Hamburger / Mobile menu ───────────────────
const hamburger   = document.getElementById('hamburger');
const mobileMenu  = document.getElementById('mobileMenu');
const mobileLinks = mobileMenu.querySelectorAll('a');

function toggleMenu(force) {
  const open = force !== undefined ? force : !hamburger.classList.contains('open');
  hamburger.classList.toggle('open', open);
  mobileMenu.classList.toggle('open', open);
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
  