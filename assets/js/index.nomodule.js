document.documentElement.classList.add('js');

let preloaderHidden = false;
const MIN_SHOW = 1200;
const startTime = (typeof performance !== 'undefined' && performance.now) ? performance.now() : Date.now();
function hidePreloader() {
  if (preloaderHidden) return;
  const preloader = document.getElementById('preloader');
  if (!preloader) return;
  preloaderHidden = true;
  preloader.style.opacity = '0';
  setTimeout(() => { preloader.style.display = 'none'; }, 500);
}
function scheduleHide(baseDelay) {
  const now = (typeof performance !== 'undefined' && performance.now) ? performance.now() : Date.now();
  const elapsed = now - startTime;
  const remaining = Math.max(MIN_SHOW - elapsed, 0);
  const delay = Math.max(remaining, baseDelay || 0);
  setTimeout(hidePreloader, delay);
}
if (document.readyState === 'complete') {
  scheduleHide(500);
}
window.addEventListener('load', () => {
  scheduleHide(500);
});
document.addEventListener('DOMContentLoaded', () => {
  scheduleHide(1500);
});
setTimeout(() => scheduleHide(0), 4000);

window.addEventListener('scroll', function () {
  const header = document.querySelector('.site-header');
  if (!header) return;
  if (window.scrollY > 0) {
    header.classList.add('scrolled');
  } else {
    header.classList.remove('scrolled');
  }
});

const observerOptions = {
  threshold: 0.05,
  rootMargin: '0px 0px -20px 0px',
};
let observer = null;
if (typeof IntersectionObserver !== 'undefined') {
  observer = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        const el = entry.target;
        if (el.classList.contains('produto-card')) {
          el.classList.add('visible');
        } else if (el.classList.contains('player-card')) {
          el.style.opacity = '1';
          el.style.transform = 'translateY(0)';
          el.classList.add('active');
        } else {
          el.classList.add('active');
        }
      }
    });
  }, observerOptions);
}
function initReveals() {
  const reveals = document.querySelectorAll('.reveal');
  if (!observer) {
    reveals.forEach((el) => el.classList.add('active'));
  } else {
    reveals.forEach((el) => observer.observe(el));
  }
  const cards = document.querySelectorAll('.produto-card');
  cards.forEach((card) => {
    card.style.opacity = '0';
    card.style.transform = 'translateY(10px)';
    card.style.transition = 'opacity 0.8s ease, transform 0.8s ease';
    if (!observer) {
      card.style.opacity = '1';
      card.style.transform = 'translateY(0)';
      card.classList.add('active');
    } else {
      observer.observe(card);
    }
  });
  const historyItems = document.querySelectorAll('.history-item');
  historyItems.forEach((item, idx) => {
    item.style.opacity = '0';
    item.style.transform = 'translateY(16px)';
    item.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
    item.style.transitionDelay = `${idx * 120}ms`;
    if (!observer) {
      item.classList.add('active');
    } else {
      observer.observe(item);
    }
  });
  const playerCards = document.querySelectorAll('.card-grid .player-card');
  playerCards.forEach((card, idx) => {
    card.style.opacity = '0';
    card.style.transform = 'translateY(20px)';
    card.style.transition = 'opacity 0.7s ease, transform 0.7s ease';
    card.style.transitionDelay = `${idx * 120}ms`;
    if (!observer) {
      card.style.opacity = '1';
      card.style.transform = 'translateY(0)';
      card.classList.add('active');
    } else {
      observer.observe(card);
    }
  });
}
if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', initReveals);
} else {
  initReveals();
}
function initSponsorLogos() {
  const items = document.querySelectorAll('.sponsor-item');
  items.forEach((anchor) => {
    const img = anchor.querySelector('img');
    if (!img) return;
    if (!img.hasAttribute('loading')) img.setAttribute('loading', 'lazy');
    if (!img.hasAttribute('decoding')) img.setAttribute('decoding', 'async');
    const label = anchor.getAttribute('aria-label') || img.getAttribute('alt') || anchor.getAttribute('title') || 'Logo';
    anchor.setAttribute('aria-label', label);
    img.addEventListener('error', () => {
      anchor.style.display = 'none';
    }, { once: true });
  });
}
if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', initSponsorLogos);
} else {
  initSponsorLogos();
}
