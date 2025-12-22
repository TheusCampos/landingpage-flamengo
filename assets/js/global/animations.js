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