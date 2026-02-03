/**
 * Services Section Component
 * Handles scroll-triggered reveal animations and hover effects for service cards
 */

const initServiceCardHoverEffects = () => {
  const serviceCards = document.querySelectorAll('.service-card');

  if (!serviceCards.length) {
    return;
  }

  serviceCards.forEach(card => {
    card.addEventListener('mouseenter', () => {
      card.style.transform = 'translateY(-8px)';
      card.style.transition = 'transform 0.3s ease-out, box-shadow 0.3s ease-out';
      card.style.boxShadow = '0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04)';
    });

    card.addEventListener('mouseleave', () => {
      card.style.transform = 'translateY(0)';
      card.style.boxShadow = '';
    });

    card.addEventListener('focus', () => {
      card.style.transform = 'translateY(-8px)';
      card.style.transition = 'transform 0.3s ease-out, box-shadow 0.3s ease-out';
      card.style.boxShadow = '0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04)';
    });

    card.addEventListener('blur', () => {
      card.style.transform = 'translateY(0)';
      card.style.boxShadow = '';
    });
  });
};

const initScrollRevealAnimations = () => {
  const revealElements = document.querySelectorAll('[data-reveal]');

  if (!revealElements.length) {
    return;
  }

  if (!('IntersectionObserver' in window)) {
    revealElements.forEach(element => {
      element.style.opacity = '1';
      element.style.transform = 'translateY(0)';
    });
    return;
  }

  revealElements.forEach(element => {
    element.style.opacity = '0';
    element.style.transform = 'translateY(40px)';
    element.style.transition = 'opacity 0.6s ease-out, transform 0.6s ease-out';
  });

  const observerOptions = {
    root: null,
    rootMargin: '0px',
    threshold: 0.15,
  };

  const observerCallback = (entries, observer) => {
    entries.forEach((entry, index) => {
      if (entry.isIntersecting) {
        setTimeout(() => {
          entry.target.style.opacity = '1';
          entry.target.style.transform = 'translateY(0)';
        }, index * 100);

        observer.unobserve(entry.target);
      }
    });
  };

  const observer = new IntersectionObserver(observerCallback, observerOptions);

  revealElements.forEach(element => {
    observer.observe(element);
  });
};

const initServices = () => {
  try {
    const servicesSection = document.getElementById('services');

    if (!servicesSection) {
      return;
    }

    initScrollRevealAnimations();
    initServiceCardHoverEffects();

    const mediaQuery = window.matchMedia('(prefers-reduced-motion: reduce)');

    if (mediaQuery.matches) {
      const revealElements = document.querySelectorAll('[data-reveal]');
      revealElements.forEach(element => {
        element.style.opacity = '1';
        element.style.transform = 'translateY(0)';
        element.style.transition = 'none';
      });
    }

    mediaQuery.addEventListener('change', event => {
      if (event.matches) {
        const revealElements = document.querySelectorAll('[data-reveal]');
        revealElements.forEach(element => {
          element.style.opacity = '1';
          element.style.transform = 'translateY(0)';
          element.style.transition = 'none';
        });
      }
    });
  } catch (error) {
    console.error('Error initializing services section:', error);
  }
};

export { initServices, initServiceCardHoverEffects, initScrollRevealAnimations };
