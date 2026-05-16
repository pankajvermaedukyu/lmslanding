const menuToggle = document.querySelector('.menu-toggle');
const mobileMenu = document.getElementById('mobileMenu');
const toastBanner = document.getElementById('toastBanner');
const toastClose = document.getElementById('toastClose');

if (menuToggle && mobileMenu) {
  menuToggle.addEventListener('click', () => {
    mobileMenu.classList.toggle('open');
    menuToggle.textContent = mobileMenu.classList.contains('open') ? 'Close' : 'Menu';
  });
}

if (toastClose && toastBanner) {
  toastClose.addEventListener('click', () => {
    toastBanner.style.display = 'none';
  });
}

function scrollToContact() {
  document.querySelector('#contact')?.scrollIntoView({ behavior: 'smooth', block: 'start' });
}
