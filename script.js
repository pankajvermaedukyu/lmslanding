const menuToggle = document.querySelector('.menu-toggle');
const mobileMenu = document.getElementById('mobileMenu');
const toastBanner = document.getElementById('toastBanner');
const toastClose = document.getElementById('toastClose');
const siteHeader = document.querySelector('.site-header');

// ── Sticky navbar ─────────────────────────────────────────
// Uses IntersectionObserver on a 1px sentinel at the top of the hero.
// When the sentinel leaves the viewport (user scrolled past hero top),
// the header turns solid white. When it re-enters, it goes transparent.
if (siteHeader) {
  const sentinel = document.querySelector('.hero-sentinel');

  if (sentinel && 'IntersectionObserver' in window) {
    const observer = new IntersectionObserver(
      ([entry]) => {
        siteHeader.classList.toggle('scrolled', !entry.isIntersecting);
        // keep mobile menu background in sync
        if (mobileMenu && mobileMenu.classList.contains('open')) {
          mobileMenu.style.top = siteHeader.offsetHeight + 'px';
        }
      },
      { threshold: 0, rootMargin: '0px' }
    );
    observer.observe(sentinel);
  } else {
    // Fallback for browsers without IntersectionObserver
    const hero = document.querySelector('.hero');
    const onScroll = () => {
      const heroBottom = hero ? hero.getBoundingClientRect().bottom : 0;
      siteHeader.classList.toggle('scrolled', heroBottom <= siteHeader.offsetHeight);
    };
    window.addEventListener('scroll', onScroll, { passive: true });
    onScroll();
  }

  // Set CSS var for mobile menu offset
  const setHeaderHeight = () => {
    document.documentElement.style.setProperty('--header-h', siteHeader.offsetHeight + 'px');
  };
  setHeaderHeight();
  window.addEventListener('resize', setHeaderHeight);
}

if (menuToggle && mobileMenu) {
  menuToggle.addEventListener('click', () => {
    const isOpen = mobileMenu.classList.toggle('open');
    menuToggle.setAttribute('aria-label', isOpen ? 'Close menu' : 'Open menu');
    menuToggle.setAttribute('aria-expanded', isOpen);
    // position mobile menu flush below the header
    mobileMenu.style.top = siteHeader.offsetHeight + 'px';
    document.body.style.overflow = isOpen ? 'hidden' : '';
  });

  // Close mobile menu when a link is clicked
  const mobileMenuLinks = mobileMenu.querySelectorAll('a');
  mobileMenuLinks.forEach(link => {
    link.addEventListener('click', () => {
      mobileMenu.classList.remove('open');
      menuToggle.setAttribute('aria-label', 'Open menu');
      menuToggle.setAttribute('aria-expanded', false);
      document.body.style.overflow = '';
    });
  });

  // Close mobile menu when clicking outside
  document.addEventListener('click', (e) => {
    if (!mobileMenu.contains(e.target) && !menuToggle.contains(e.target) && mobileMenu.classList.contains('open')) {
      mobileMenu.classList.remove('open');
      menuToggle.setAttribute('aria-label', 'Open menu');
      menuToggle.setAttribute('aria-expanded', false);
      document.body.style.overflow = '';
    }
  });
}

if (toastClose && toastBanner) {
  toastClose.addEventListener('click', () => {
    toastBanner.classList.add('hiding');
    toastBanner.addEventListener('animationend', () => {
      toastBanner.style.display = 'none';
    }, { once: true });
  });
}

function scrollToContact() {
  document.querySelector('#contact')?.scrollIntoView({ behavior: 'smooth', block: 'start' });
}

// ── Scroll to Top ─────────────────────────────────────────
const scrollTopBtn = document.getElementById('scrollTop');
if (scrollTopBtn) {
  window.addEventListener('scroll', () => {
    scrollTopBtn.classList.toggle('visible', window.scrollY > 400);
  }, { passive: true });

  scrollTopBtn.addEventListener('click', () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  });
}

// ── Navbar: scroll-spy active tab ────────────────────────
(function () {
  const navTabs = document.querySelectorAll('.nav-tab[data-section]');
  if (!navTabs.length) return;

  const observableSections = Array.from(navTabs)
    .map(t => document.getElementById(t.dataset.section))
    .filter(Boolean);

  function setActive(id) {
    navTabs.forEach(t => t.classList.toggle('active', t.dataset.section === id));
  }

  setActive('home');

  if (!('IntersectionObserver' in window)) return;

  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        setActive(entry.target.id);
      }
    });
  }, {
    rootMargin: '-40% 0px -55% 0px',
    threshold: 0
  });

  observableSections.forEach(s => observer.observe(s));
})();

(function () {
  const tabs = document.querySelectorAll('.features-tab');
  const panels = document.querySelectorAll('.features-panel');
  if (!tabs.length || !panels.length) return;

  function activateTab(index) {
    tabs.forEach((t, i) => {
      const isActive = i === index;
      t.classList.toggle('active', isActive);
      t.setAttribute('aria-selected', isActive);
    });
    panels.forEach((p, i) => {
      if (i === index) {
        p.classList.remove('hidden');
        // re-trigger animation
        p.style.animation = 'none';
        p.offsetHeight; // reflow
        p.style.animation = '';
      } else {
        p.classList.add('hidden');
      }
    });
  }

  tabs.forEach((tab, i) => {
    tab.addEventListener('click', () => activateTab(i));
    tab.addEventListener('keydown', (e) => {
      if (e.key === 'Enter' || e.key === ' ') { e.preventDefault(); activateTab(i); }
      if (e.key === 'ArrowDown') { e.preventDefault(); activateTab(Math.min(i + 1, tabs.length - 1)); tabs[Math.min(i + 1, tabs.length - 1)].focus(); }
      if (e.key === 'ArrowUp')   { e.preventDefault(); activateTab(Math.max(i - 1, 0)); tabs[Math.max(i - 1, 0)].focus(); }
    });
  });
})();
