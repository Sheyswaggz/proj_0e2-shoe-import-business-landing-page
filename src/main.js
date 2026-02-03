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

const initScrollReveal = () => {
  const observerOptions = {
    root: null,
    rootMargin: '0px',
    threshold: 0.1,
  };

  const observerCallback = entries => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('opacity-100', 'translate-y-0');
        entry.target.classList.remove('opacity-0', 'translate-y-8');
      }
    });
  };

  const observer = new IntersectionObserver(observerCallback, observerOptions);

  const revealElements = document.querySelectorAll(
    'section[id]:not(#hero), .card, .btn, footer[role="contentinfo"]'
  );

  revealElements.forEach(element => {
    element.classList.add('opacity-0', 'translate-y-8', 'transition-all', 'duration-700');
    observer.observe(element);
  });
};

const initMobileMenu = () => {
  const nav = document.querySelector('nav[role="navigation"]');

  if (!nav) {
    return;
  }

  const mobileMenuButton = document.createElement('button');
  mobileMenuButton.className = 'md:hidden p-2 text-secondary-700 hover:text-primary-600 focus-ring';
  mobileMenuButton.setAttribute('aria-label', 'Toggle navigation menu');
  mobileMenuButton.setAttribute('aria-expanded', 'false');
  mobileMenuButton.innerHTML = `
    <svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 6h16M4 12h16M4 18h16"></path>
    </svg>
  `;

  const navContainer = nav.querySelector('.flex.items-center.justify-between');
  const buttonContainer = navContainer.querySelector('.flex.items-center.space-x-4');

  if (buttonContainer) {
    buttonContainer.insertBefore(mobileMenuButton, buttonContainer.firstChild);
  }

  const navList = nav.querySelector('ul[role="list"]');

  if (navList) {
    navList.setAttribute('id', 'mobile-menu');
    navList.setAttribute('aria-hidden', 'true');

    mobileMenuButton.addEventListener('click', () => {
      const isExpanded = mobileMenuButton.getAttribute('aria-expanded') === 'true';
      mobileMenuButton.setAttribute('aria-expanded', String(!isExpanded));
      navList.setAttribute('aria-hidden', String(isExpanded));
      navList.classList.toggle('hidden');
      navList.classList.toggle('flex');
      navList.classList.toggle('flex-col');
      navList.classList.toggle('absolute');
      navList.classList.toggle('top-full');
      navList.classList.toggle('left-0');
      navList.classList.toggle('right-0');
      navList.classList.toggle('bg-white');
      navList.classList.toggle('shadow-lg');
      navList.classList.toggle('p-4');
      navList.classList.toggle('space-x-0');
      navList.classList.toggle('space-y-4');
    });

    navList.querySelectorAll('a').forEach(link => {
      link.addEventListener('click', () => {
        mobileMenuButton.setAttribute('aria-expanded', 'false');
        navList.setAttribute('aria-hidden', 'true');
        navList.classList.add('hidden');
        navList.classList.remove(
          'flex',
          'flex-col',
          'absolute',
          'top-full',
          'left-0',
          'right-0',
          'bg-white',
          'shadow-lg',
          'p-4',
          'space-y-4'
        );
        navList.classList.add('space-x-8');
      });
    });
  }
};

const initButtonMorphing = () => {
  const buttons = document.querySelectorAll('.btn');

  buttons.forEach(button => {
    button.addEventListener('mouseenter', () => {
      button.style.transform = 'translateY(-2px) scale(1.02)';
    });

    button.addEventListener('mouseleave', () => {
      button.style.transform = 'translateY(0) scale(1)';
    });

    button.addEventListener('mousedown', () => {
      button.style.transform = 'translateY(0) scale(0.98)';
    });

    button.addEventListener('mouseup', () => {
      button.style.transform = 'translateY(-2px) scale(1.02)';
    });
  });
};

const initHeaderScroll = () => {
  const header = document.querySelector('header[role="banner"]');

  if (!header) {
    return;
  }

  let lastScroll = 0;

  window.addEventListener('scroll', () => {
    const currentScroll = window.pageYOffset;

    if (currentScroll <= 0) {
      header.classList.remove('shadow-lg');
      header.classList.add('shadow-md');
      return;
    }

    if (currentScroll > lastScroll && currentScroll > 100) {
      header.style.transform = 'translateY(-100%)';
    } else {
      header.style.transform = 'translateY(0)';
      header.classList.add('shadow-lg');
      header.classList.remove('shadow-md');
    }

    lastScroll = currentScroll;
  });

  header.style.transition = 'transform 0.3s ease-in-out, box-shadow 0.2s ease-in-out';
};

const init = () => {
  try {
    initSmoothScroll();
    initScrollReveal();
    initMobileMenu();
    initButtonMorphing();
    initHeaderScroll();

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

export { initSmoothScroll, initScrollReveal, initMobileMenu, initButtonMorphing, initHeaderScroll };
