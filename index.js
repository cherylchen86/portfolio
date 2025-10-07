window.addEventListener('DOMContentLoaded', () => {
  let lastScrollY = window.scrollY;
  const menu = document.getElementById('menu-buttons');

  window.addEventListener('scroll', () => {
    const currentScrollY = window.scrollY;

    if (currentScrollY < lastScrollY) {
      menu.classList.remove('hidden');
    } else {
      menu.classList.add('hidden');
    }

    lastScrollY = currentScrollY;
  });
});
