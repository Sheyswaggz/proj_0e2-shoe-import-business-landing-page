/**
 * About Section Component
 * Handles scroll-triggered reveal animations and image lazy loading for the about section
 */

const initAboutScrollRevealAnimations = () => {
  const revealElements = document.querySelectorAll('#about [data-reveal]');

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

  let revealIndex = 0;

  const observerCallback = entries => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        const currentIndex = revealIndex;
        revealIndex += 1;

        setTimeout(() => {
          entry.target.style.opacity = '1';
          entry.target.style.transform = 'translateY(0)';
        }, currentIndex * 100);

        observer.unobserve(entry.target);
      }
    });
  };

  const observer = new IntersectionObserver(observerCallback, observerOptions);

  revealElements.forEach(element => {
    observer.observe(element);
  });
};

const initAboutImageLazyLoading = () => {
  const aboutSection = document.getElementById('about');

  if (!aboutSection) {
    return;
  }

  const images = aboutSection.querySelectorAll('img[loading="lazy"]');

  if (!images.length) {
    return;
  }

  if (!('IntersectionObserver' in window)) {
    return;
  }

  const imageObserverOptions = {
    root: null,
    rootMargin: '50px',
    threshold: 0.01,
  };

  const imageObserverCallback = (entries, imgObserver) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        const img = entry.target;

        if (img.dataset.loaded) {
          return;
        }

        const loadImage = () => {
          img.classList.add('fade-in');
          img.dataset.loaded = 'true';

          img.removeEventListener('load', loadImage);
        };

        img.addEventListener('load', loadImage);

        if (img.complete) {
          loadImage();
        }

        imgObserver.unobserve(img);
      }
    });
  };

  const imageObserver = new IntersectionObserver(imageObserverCallback, imageObserverOptions);

  images.forEach(img => {
    imageObserver.observe(img);
  });
};

const initAboutInteractiveElements = () => {
  const aboutSection = document.getElementById('about');

  if (!aboutSection) {
    return;
  }

  const cards = aboutSection.querySelectorAll('.card');

  if (!cards.length) {
    return;
  }

  cards.forEach(card => {
    card.addEventListener('mouseenter', () => {
      card.style.transform = 'translateY(-4px)';
      card.style.transition = 'transform 0.3s ease-out, box-shadow 0.3s ease-out';
      card.style.boxShadow =
        '0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04)';
    });

    card.addEventListener('mouseleave', () => {
      card.style.transform = 'translateY(0)';
      card.style.boxShadow = '';
    });

    card.addEventListener('focus', () => {
      card.style.transform = 'translateY(-4px)';
      card.style.transition = 'transform 0.3s ease-out, box-shadow 0.3s ease-out';
      card.style.boxShadow =
        '0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04)';
    });

    card.addEventListener('blur', () => {
      card.style.transform = 'translateY(0)';
      card.style.boxShadow = '';
    });
  });
};

const handleReducedMotion = () => {
  const mediaQuery = window.matchMedia('(prefers-reduced-motion: reduce)');

  const disableAnimations = () => {
    const revealElements = document.querySelectorAll('#about [data-reveal]');
    revealElements.forEach(element => {
      element.style.opacity = '1';
      element.style.transform = 'translateY(0)';
      element.style.transition = 'none';
    });
  };

  if (mediaQuery.matches) {
    disableAnimations();
  }

  mediaQuery.addEventListener('change', event => {
    if (event.matches) {
      disableAnimations();
    }
  });
};

const initAbout = () => {
  try {
    const aboutSection = document.getElementById('about');

    if (!aboutSection) {
      console.warn('About section not found in DOM');
      return;
    }

    initAboutScrollRevealAnimations();

    initAboutImageLazyLoading();

    initAboutInteractiveElements();

    handleReducedMotion();

    console.log('About section initialized successfully');
  } catch (error) {
    console.error('Error initializing about section:', error);
  }
};

export { initAbout, initAboutScrollRevealAnimations, initAboutImageLazyLoading };
