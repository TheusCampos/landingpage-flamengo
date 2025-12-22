window.addEventListener('scroll', function () {
  const header = document.querySelector('.site-header');
  if (!header) return;
  if (window.scrollY > 0) {
    header.classList.add('scrolled');
  } else {
    header.classList.remove('scrolled');
  }
});
