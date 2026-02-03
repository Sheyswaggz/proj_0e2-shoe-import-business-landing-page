/**
 * Testimonials and Social Proof Component
 * Handles carousel functionality, counter animations, and keyboard navigation
 */

export function initTestimonials() {
  // Initialize counter animations
  initCounterAnimations();

  // Initialize keyboard navigation for testimonial cards
  initKeyboardNavigation();

  // Initialize hover effects for trust badges
  initTrustBadgeAnimations();
}

/**
 * Animate counters when they come into view
 */
function initCounterAnimations() {
  const counters = document.querySelectorAll('[data-counter-target]');

  const observerOptions = {
    threshold: 0.5,
    rootMargin: '0px 0px -100px 0px'
  };

  const counterObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting && !entry.target.classList.contains('counted')) {
        animateCounter(entry.target);
        entry.target.classList.add('counted');
      }
    });
  }, observerOptions);

  counters.forEach(counter => {
    counterObserver.observe(counter);
  });
}

/**
 * Animate a single counter element
 * @param {HTMLElement} element - The counter element to animate
 */
function animateCounter(element) {
  const target = element.getAttribute('data-counter-target');
  const text = element.textContent;

  // Extract number from text (e.g., "50+" -> 50, "2.5M+" -> 2500000)
  let targetValue = parseTargetValue(target);
  const suffix = text.match(/[^\d.,]+$/)?.[0] || '';

  const duration = 2000; // 2 seconds
  const startTime = performance.now();
  const startValue = 0;

  function updateCounter(currentTime) {
    const elapsed = currentTime - startTime;
    const progress = Math.min(elapsed / duration, 1);

    // Easing function (ease-out)
    const easeOut = 1 - Math.pow(1 - progress, 3);
    const currentValue = Math.floor(startValue + (targetValue - startValue) * easeOut);

    // Format the number based on the original format
    element.textContent = formatCounterValue(currentValue, text) + suffix;

    if (progress < 1) {
      requestAnimationFrame(updateCounter);
    } else {
      element.textContent = text; // Restore original text
    }
  }

  requestAnimationFrame(updateCounter);
}

/**
 * Parse target value from string (handles formats like "50", "2500000", etc.)
 * @param {string} target - The target value string
 * @returns {number} - The parsed numeric value
 */
function parseTargetValue(target) {
  const numStr = target.replace(/[^\d.]/g, '');
  return parseFloat(numStr);
}

/**
 * Format counter value to match original format
 * @param {number} value - The current counter value
 * @param {string} originalText - The original text format
 * @returns {string} - The formatted value
 */
function formatCounterValue(value, originalText) {
  if (originalText.includes('.')) {
    // Handle decimal values (e.g., "2.5M+")
    return (value / 1000000).toFixed(1);
  } else if (originalText.includes('%')) {
    return value.toString();
  } else if (value >= 1000000) {
    return (value / 1000000).toFixed(1) + 'M';
  } else if (value >= 1000) {
    return (value / 1000).toFixed(0) + 'K';
  }
  return value.toString();
}

/**
 * Initialize keyboard navigation for testimonial cards
 */
function initKeyboardNavigation() {
  const testimonialCards = document.querySelectorAll('#testimonials .card');

  testimonialCards.forEach((card, index) => {
    // Make cards focusable
    card.setAttribute('tabindex', '0');
    card.setAttribute('role', 'article');
    card.setAttribute('aria-label', `Customer testimonial ${index + 1}`);

    // Add keyboard event listeners
    card.addEventListener('keydown', (e) => {
      handleCardKeyNavigation(e, testimonialCards, index);
    });

    // Add focus styles
    card.addEventListener('focus', () => {
      card.style.outline = '2px solid #2563eb';
      card.style.outlineOffset = '4px';
    });

    card.addEventListener('blur', () => {
      card.style.outline = 'none';
    });
  });
}

/**
 * Handle keyboard navigation between testimonial cards
 * @param {KeyboardEvent} e - The keyboard event
 * @param {NodeList} cards - All testimonial cards
 * @param {number} currentIndex - Current card index
 */
function handleCardKeyNavigation(e, cards, currentIndex) {
  let targetIndex;

  switch (e.key) {
    case 'ArrowRight':
    case 'ArrowDown':
      e.preventDefault();
      targetIndex = (currentIndex + 1) % cards.length;
      cards[targetIndex].focus();
      break;

    case 'ArrowLeft':
    case 'ArrowUp':
      e.preventDefault();
      targetIndex = (currentIndex - 1 + cards.length) % cards.length;
      cards[targetIndex].focus();
      break;

    case 'Home':
      e.preventDefault();
      cards[0].focus();
      break;

    case 'End':
      e.preventDefault();
      cards[cards.length - 1].focus();
      break;
  }
}

/**
 * Initialize animations for trust badges
 */
function initTrustBadgeAnimations() {
  const trustBadges = document.querySelectorAll('.bg-primary-50.p-8.rounded-2xl');

  trustBadges.forEach(badge => {
    badge.addEventListener('mouseenter', () => {
      badge.style.transform = 'translateY(-4px)';
      badge.style.transition = 'transform 0.3s ease, shadow 0.3s ease';
    });

    badge.addEventListener('mouseleave', () => {
      badge.style.transform = 'translateY(0)';
    });
  });
}

/**
 * Utility function to add smooth scroll behavior to testimonial section
 */
export function smoothScrollToTestimonials() {
  const testimonialsSection = document.getElementById('testimonials');
  if (testimonialsSection) {
    testimonialsSection.scrollIntoView({
      behavior: 'smooth',
      block: 'start'
    });
  }
}

/**
 * Add accessibility enhancements for screen readers
 */
export function enhanceTestimonialAccessibility() {
  const testimonialSection = document.getElementById('testimonials');
  if (!testimonialSection) return;

  // Add live region for counter announcements
  const liveRegion = document.createElement('div');
  liveRegion.setAttribute('aria-live', 'polite');
  liveRegion.setAttribute('aria-atomic', 'true');
  liveRegion.className = 'sr-only';
  testimonialSection.appendChild(liveRegion);

  // Add descriptive labels to statistics
  const stats = testimonialSection.querySelectorAll('[data-counter-target]');
  stats.forEach(stat => {
    const label = stat.nextElementSibling?.textContent;
    if (label) {
      stat.setAttribute('aria-label', `${stat.textContent} ${label}`);
    }
  });
}

// Export initialization function
export default {
  init: initTestimonials,
  smoothScroll: smoothScrollToTestimonials,
  enhanceAccessibility: enhanceTestimonialAccessibility
};
