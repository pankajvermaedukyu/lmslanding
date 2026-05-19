const menuToggle = document.querySelector('.menu-toggle');
const mobileMenu = document.getElementById('mobileMenu');
const toastBanner = document.getElementById('toastBanner');
const toastClose = document.getElementById('toastClose');

if (menuToggle && mobileMenu) {
  menuToggle.addEventListener('click', () => {
    mobileMenu.classList.toggle('open');
    menuToggle.textContent = mobileMenu.classList.contains('open') ? 'Close' : 'Menu';
    document.body.style.overflow = mobileMenu.classList.contains('open') ? 'hidden' : '';
  });

  // Close mobile menu when a link is clicked
  const mobileMenuLinks = mobileMenu.querySelectorAll('a');
  mobileMenuLinks.forEach(link => {
    link.addEventListener('click', () => {
      mobileMenu.classList.remove('open');
      menuToggle.textContent = 'Menu';
      document.body.style.overflow = '';
    });
  });

  // Close mobile menu when clicking outside
  document.addEventListener('click', (e) => {
    if (!mobileMenu.contains(e.target) && !menuToggle.contains(e.target) && mobileMenu.classList.contains('open')) {
      mobileMenu.classList.remove('open');
      menuToggle.textContent = 'Menu';
      document.body.style.overflow = '';
    }
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
