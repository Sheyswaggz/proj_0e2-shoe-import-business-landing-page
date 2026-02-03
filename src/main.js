import { initNavigation } from './components/navigation.js';
import { initServices } from './components/services.js';
import { initAbout } from './components/about.js';
import { initTestimonials, enhanceTestimonialAccessibility } from './components/testimonials.js';
import { initContact } from './components/contact.js';

const initSmoothScroll = () => {
  const links = document.querySelectorAll('a[href^="#"]');

  links.forEach(link => {
    link.addEventListener('click', event => {
      const href = link.getAttribute('href');

      if (href === '#' || !href) {
        return;
      }

      const targetId = href.substring(1);
      const targetElement = document.getElementById(targetId);

      if (targetElement) {
        event.preventDefault();

        const headerOffset = 80;
        const elementPosition = targetElement.getBoundingClientRect().top;
        const offsetPosition = elementPosition + window.pageYOffset - headerOffset;

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
};

const initLazyLoading = () => {
  const lazyImages = document.querySelectorAll('img[loading="lazy"]');

  if ('IntersectionObserver' in window) {
    const imageObserver = new IntersectionObserver(
      (entries, observer) => {
        entries.forEach(entry => {
          if (entry.isIntersecting) {
            const img = entry.target;
            if (img.dataset.src) {
              img.src = img.dataset.src;
              img.removeAttribute('data-src');
            }
            observer.unobserve(img);
          }
        });
      },
      { rootMargin: '50px' }
    );

    lazyImages.forEach(img => imageObserver.observe(img));
  }
};

const initPerformanceOptimizations = () => {
  if ('requestIdleCallback' in window) {
    requestIdleCallback(() => {
      initLazyLoading();
    });
  } else {
    setTimeout(() => {
      initLazyLoading();
    }, 100);
  }

  if ('connection' in navigator) {
    const connection = navigator.connection;
    if (connection && connection.saveData) {
      document.body.classList.add('save-data-mode');
      console.log('Save data mode enabled');
    }
  }
};

const init = () => {
  try {
    initNavigation();

    initSmoothScroll();

    initServices();

    initAbout();

    initTestimonials();

    enhanceTestimonialAccessibility();

    initContact();

    initPerformanceOptimizations();

    console.log('ShoeImport Pro landing page initialized successfully');
  } catch (error) {
    console.error('Error initializing landing page:', error);
  }
};

if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', init);
} else {
  init();
}

export { initSmoothScroll };
