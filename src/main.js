import { initServices } from './components/services.js';
import { initAbout } from './components/about.js';

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

const init = () => {
  try {
    initSmoothScroll();

    initServices();

    initAbout();

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
