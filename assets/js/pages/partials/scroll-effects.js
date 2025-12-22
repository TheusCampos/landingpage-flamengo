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

/**
 * Inicializa melhorias de acessibilidade e robustez para logos de patrocinadores.
 * - Garante atributos `loading="lazy"` e `decoding="async"` nas imagens
 * - Adiciona `aria-label` aos links baseado no `alt`/`title`
 * - Oculta logos que falharem ao carregar para não quebrar o layout
 */
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
