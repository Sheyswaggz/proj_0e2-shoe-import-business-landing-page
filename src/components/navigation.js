/**
 * Navigation Component
 * Handles smooth scroll navigation, mobile menu toggle, active section highlighting,
 * sticky navigation behavior, and keyboard navigation support
 */

export function initNavigation() {
  try {
    initMobileMenu();
    initStickyNav();
    initActiveSectionHighlight();
    initKeyboardNavigation();
    initSmoothScrollNav();
    console.log('Navigation initialized successfully');
  } catch (error) {
    console.error('Error initializing navigation:', error);
  }
}

/**
 * Initialize mobile menu toggle functionality
 */
function initMobileMenu() {
  const mobileMenuToggle = document.getElementById('mobile-menu-toggle');
  const mobileMenu = document.getElementById('mobile-menu');

  if (!mobileMenuToggle || !mobileMenu) {
    console.warn('Mobile menu elements not found');
    return;
  }

  const hamburgerIcon = mobileMenuToggle.querySelector('.hamburger-icon');
  const closeIcon = mobileMenuToggle.querySelector('.close-icon');

  mobileMenuToggle.addEventListener('click', () => {
    const isExpanded = mobileMenuToggle.getAttribute('aria-expanded') === 'true';

    mobileMenuToggle.setAttribute('aria-expanded', !isExpanded);
    mobileMenu.classList.toggle('hidden');

    if (hamburgerIcon && closeIcon) {
      hamburgerIcon.classList.toggle('hidden');
      closeIcon.classList.toggle('hidden');
    }

    if (!isExpanded) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
  });

  const mobileMenuLinks = mobileMenu.querySelectorAll('a');
  mobileMenuLinks.forEach(link => {
    link.addEventListener('click', () => {
      mobileMenu.classList.add('hidden');
      mobileMenuToggle.setAttribute('aria-expanded', 'false');

      if (hamburgerIcon && closeIcon) {
        hamburgerIcon.classList.remove('hidden');
        closeIcon.classList.add('hidden');
      }

      document.body.style.overflow = '';
    });
  });

  document.addEventListener('click', event => {
    if (
      !mobileMenuToggle.contains(event.target) &&
      !mobileMenu.contains(event.target) &&
      mobileMenuToggle.getAttribute('aria-expanded') === 'true'
    ) {
      mobileMenu.classList.add('hidden');
      mobileMenuToggle.setAttribute('aria-expanded', 'false');

      if (hamburgerIcon && closeIcon) {
        hamburgerIcon.classList.remove('hidden');
        closeIcon.classList.add('hidden');
      }

      document.body.style.overflow = '';
    }
  });

  window.addEventListener('resize', () => {
    if (window.innerWidth >= 768) {
      mobileMenu.classList.add('hidden');
      mobileMenuToggle.setAttribute('aria-expanded', 'false');

      if (hamburgerIcon && closeIcon) {
        hamburgerIcon.classList.remove('hidden');
        closeIcon.classList.add('hidden');
      }

      document.body.style.overflow = '';
    }
  });
}

/**
 * Initialize sticky navigation behavior
 */
function initStickyNav() {
  const header = document.querySelector('header[role="banner"]');

  if (!header) {
    console.warn('Header element not found');
    return;
  }

  let lastScrollY = window.pageYOffset;
  let isScrollingUp = false;

  const handleScroll = () => {
    const currentScrollY = window.pageYOffset;

    if (currentScrollY > 100) {
      header.classList.add('nav-scrolled');
    } else {
      header.classList.remove('nav-scrolled');
    }

    isScrollingUp = currentScrollY < lastScrollY;

    if (currentScrollY > 300 && !isScrollingUp) {
      header.classList.add('nav-hidden');
    } else {
      header.classList.remove('nav-hidden');
    }

    lastScrollY = currentScrollY;
  };

  let ticking = false;
  window.addEventListener('scroll', () => {
    if (!ticking) {
      window.requestAnimationFrame(() => {
        handleScroll();
        ticking = false;
      });
      ticking = true;
    }
  });
}

/**
 * Initialize active section highlighting
 */
function initActiveSectionHighlight() {
  const sections = document.querySelectorAll('section[id]');
  const navLinks = document.querySelectorAll('nav a[href^="#"]');

  if (sections.length === 0 || navLinks.length === 0) {
    return;
  }

  const observerOptions = {
    root: null,
    rootMargin: '-20% 0px -70% 0px',
    threshold: 0,
  };

  const activeSection = new Map();

  const observer = new IntersectionObserver(entries => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        activeSection.set(entry.target.id, true);
      } else {
        activeSection.delete(entry.target.id);
      }
    });

    const activeSectionId = Array.from(activeSection.keys())[0];

    navLinks.forEach(link => {
      const href = link.getAttribute('href');
      if (href && href.startsWith('#')) {
        const targetId = href.substring(1);

        if (targetId === activeSectionId) {
          link.classList.add('nav-link-active');
          link.setAttribute('aria-current', 'location');
        } else {
          link.classList.remove('nav-link-active');
          link.removeAttribute('aria-current');
        }
      }
    });
  }, observerOptions);

  sections.forEach(section => {
    observer.observe(section);
  });
}

/**
 * Initialize keyboard navigation support
 */
function initKeyboardNavigation() {
  const navLinks = document.querySelectorAll('nav a');

  navLinks.forEach(link => {
    link.addEventListener('keydown', event => {
      if (event.key === 'Enter' || event.key === ' ') {
        event.preventDefault();
        link.click();
      }
    });
  });

  document.addEventListener('keydown', event => {
    if (event.key === 'Escape') {
      const mobileMenuToggle = document.getElementById('mobile-menu-toggle');
      const mobileMenu = document.getElementById('mobile-menu');

      if (mobileMenuToggle && mobileMenu) {
        const isExpanded = mobileMenuToggle.getAttribute('aria-expanded') === 'true';

        if (isExpanded) {
          mobileMenu.classList.add('hidden');
          mobileMenuToggle.setAttribute('aria-expanded', 'false');

          const hamburgerIcon = mobileMenuToggle.querySelector('.hamburger-icon');
          const closeIcon = mobileMenuToggle.querySelector('.close-icon');

          if (hamburgerIcon && closeIcon) {
            hamburgerIcon.classList.remove('hidden');
            closeIcon.classList.add('hidden');
          }

          document.body.style.overflow = '';
          mobileMenuToggle.focus();
        }
      }
    }
  });
}

/**
 * Initialize smooth scroll navigation
 */
function initSmoothScrollNav() {
  const navLinks = document.querySelectorAll('a[href^="#"]');

  navLinks.forEach(link => {
    link.addEventListener('click', event => {
      const href = link.getAttribute('href');

      if (href === '#' || !href) {
        return;
      }

      const targetId = href.substring(1);
      const targetElement = document.getElementById(targetId);

      if (targetElement) {
        event.preventDefault();

        const header = document.querySelector('header[role="banner"]');
        const headerHeight = header ? header.offsetHeight : 80;
        const elementPosition = targetElement.getBoundingClientRect().top;
        const offsetPosition = elementPosition + window.pageYOffset - headerHeight;

        window.scrollTo({
          top: offsetPosition,
          behavior: 'smooth',
        });

        if (targetElement.hasAttribute('tabindex')) {
          targetElement.focus();
        } else {
          targetElement.setAttribute('tabindex', '-1');
          targetElement.focus();
          targetElement.addEventListener(
            'blur',
            () => {
              targetElement.removeAttribute('tabindex');
            },
            { once: true }
          );
        }
      }
    });
  });
}

export { initNavigation as default };
