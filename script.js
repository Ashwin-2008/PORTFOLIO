/* ===== Custom Cursor ===== */
const cursor = document.getElementById('cursor');
const cursorDot = document.getElementById('cursor-dot');
let mx = 0, my = 0, cx = 0, cy = 0;

document.addEventListener('mousemove', e => {
  mx = e.clientX; my = e.clientY;
  cursorDot.style.left = mx + 'px';
  cursorDot.style.top = my + 'px';
});

(function animCursor() {
  cx += (mx - cx) * 0.12;
  cy += (my - cy) * 0.12;
  if (cursor) { cursor.style.left = cx + 'px'; cursor.style.top = cy + 'px'; }
  requestAnimationFrame(animCursor);
})();

document.querySelectorAll('a, button, .btn, .tags span').forEach(el => {
  el.addEventListener('mouseenter', () => cursor?.classList.add('hover'));
  el.addEventListener('mouseleave', () => cursor?.classList.remove('hover'));
});

/* ===== Scroll Progress ===== */
const progressBar = document.getElementById('scroll-progress');
window.addEventListener('scroll', () => {
  const pct = (window.scrollY / (document.body.scrollHeight - window.innerHeight)) * 100;
  if (progressBar) progressBar.style.width = pct + '%';
});

/* ===== Mobile Nav ===== */
const hamburger = document.getElementById('hamburger');
const navLinks = document.getElementById('navLinks');
hamburger.addEventListener('click', () => {
  hamburger.classList.toggle('open');
  navLinks.classList.toggle('open');
});
navLinks.querySelectorAll('a').forEach(link => {
  link.addEventListener('click', () => {
    hamburger.classList.remove('open');
    navLinks.classList.remove('open');
  });
});

/* ===== Scroll-to-top ===== */
const scrollTopBtn = document.getElementById('scrollTop');
window.addEventListener('scroll', () => {
  scrollTopBtn.classList.toggle('show', window.scrollY > 400);
});
scrollTopBtn.addEventListener('click', () => window.scrollTo({ top: 0, behavior: 'smooth' }));

/* ===== Active Nav ===== */
const sections = document.querySelectorAll('section');
const navItems = document.querySelectorAll('.nav-links a');
const navObserver = new IntersectionObserver(entries => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      navItems.forEach(a => a.classList.remove('active'));
      const active = document.querySelector(`.nav-links a[href="#${entry.target.id}"]`);
      if (active) active.classList.add('active');
    }
  });
}, { rootMargin: '-40% 0px -55% 0px' });
sections.forEach(s => navObserver.observe(s));

/* ===== Typed Effect ===== */
const typedEl = document.getElementById('typed');
const phrases = ['Full Stack Developer', 'AI / ML Enthusiast', 'Problem Solver', 'Open Source Contributor'];
let pi = 0, ci = 0, deleting = false;
function type() {
  if (!typedEl) return;
  const phrase = phrases[pi];
  typedEl.textContent = deleting ? phrase.slice(0, ci--) : phrase.slice(0, ci++);
  let delay = deleting ? 50 : 90;
  if (!deleting && ci > phrase.length) { deleting = true; delay = 1600; }
  else if (deleting && ci < 0) { deleting = false; pi = (pi + 1) % phrases.length; ci = 0; delay = 400; }
  setTimeout(type, delay);
}
type();

/* ===== Fade-in on Scroll ===== */
const fadeEls = document.querySelectorAll(
  '.about-card, .project-card, .cert-card, .achieve-card, .timeline-item, .fade-in, .skill-category, .stat-item, .contact-card'
);
fadeEls.forEach(el => el.classList.add('fade-in'));

const fadeObserver = new IntersectionObserver(entries => {
  entries.forEach((entry, i) => {
    if (entry.isIntersecting) {
      setTimeout(() => entry.target.classList.add('visible'), i * 80);
      fadeObserver.unobserve(entry.target);
    }
  });
}, { threshold: 0.1 });
fadeEls.forEach(el => fadeObserver.observe(el));

/* ===== Skill Bars ===== */
const barObserver = new IntersectionObserver(entries => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.querySelectorAll('.bar-fill').forEach(bar => {
        bar.style.width = bar.dataset.width + '%';
      });
      barObserver.unobserve(entry.target);
    }
  });
}, { threshold: 0.3 });
document.querySelectorAll('.skill-bars').forEach(el => barObserver.observe(el));

/* ===== Stats Counter ===== */
const counterObserver = new IntersectionObserver(entries => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.querySelectorAll('.stat-num').forEach(el => {
        const target = +el.dataset.target;
        let count = 0;
        const step = Math.ceil(target / 60);
        const timer = setInterval(() => {
          count = Math.min(count + step, target);
          el.textContent = count + (target > 10 ? '+' : '');
          if (count >= target) clearInterval(timer);
        }, 25);
      });
      counterObserver.unobserve(entry.target);
    }
  });
}, { threshold: 0.5 });
const statsStrip = document.getElementById('stats-strip');
if (statsStrip) counterObserver.observe(statsStrip);

/* ===== Tilt Cards ===== */
document.querySelectorAll('.project-card, .cert-card, .achieve-card').forEach(card => {
  card.addEventListener('mousemove', e => {
    const r = card.getBoundingClientRect();
    const x = ((e.clientX - r.left) / r.width - 0.5) * 12;
    const y = ((e.clientY - r.top) / r.height - 0.5) * -12;
    card.style.transform = `perspective(600px) rotateY(${x}deg) rotateX(${y}deg) translateY(-4px)`;
  });
  card.addEventListener('mouseleave', () => {
    card.style.transform = '';
  });
});

/* ===== Ripple Button ===== */
document.querySelectorAll('.btn').forEach(btn => {
  btn.addEventListener('click', function (e) {
    const r = this.getBoundingClientRect();
    const size = Math.max(r.width, r.height);
    const ripple = document.createElement('span');
    ripple.className = 'ripple';
    ripple.style.cssText = `width:${size}px;height:${size}px;left:${e.clientX-r.left-size/2}px;top:${e.clientY-r.top-size/2}px`;
    this.appendChild(ripple);
    setTimeout(() => ripple.remove(), 600);
  });
});

/* ===== Contact Form ===== */
document.getElementById('contactForm').addEventListener('submit', function (e) {
  e.preventDefault();
  const status = document.getElementById('formStatus');
  status.textContent = '✅ Message sent! I\'ll get back to you soon.';
  this.reset();
  setTimeout(() => status.textContent = '', 4000);
});
