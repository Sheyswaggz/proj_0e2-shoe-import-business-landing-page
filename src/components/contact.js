/**
 * Contact Form Component
 * Handles form validation, submission, and morphing button interactions
 */

export function initContact() {
  const form = document.getElementById('contact-form');
  if (!form) {
    console.error('Contact form not found');
    return;
  }

  setupFormValidation(form);
  setupFormSubmission(form);
  setupMorphingButton();
}

/**
 * Setup client-side form validation
 * @param {HTMLFormElement} form - The contact form element
 */
function setupFormValidation(form) {
  const inputs = form.querySelectorAll('input, textarea');

  inputs.forEach(input => {
    input.addEventListener('blur', () => validateField(input));
    input.addEventListener('input', () => {
      if (input.classList.contains('border-accent-600')) {
        validateField(input);
      }
    });
  });
}

/**
 * Validate a single form field
 * @param {HTMLInputElement|HTMLTextAreaElement} field - The field to validate
 * @returns {boolean} - Whether the field is valid
 */
function validateField(field) {
  const value = field.value.trim();
  const fieldName = field.name;
  let errorMessage = '';
  let isValid = true;

  if (field.hasAttribute('required') && !value) {
    errorMessage = 'This field is required';
    isValid = false;
  } else if (fieldName === 'email' && value) {
    if (!validateEmail(value)) {
      errorMessage = 'Please enter a valid email address';
      isValid = false;
    }
  } else if (fieldName === 'phone' && value) {
    if (!validatePhone(value)) {
      errorMessage = 'Please enter a valid phone number';
      isValid = false;
    }
  } else if (fieldName === 'name' && value && value.length < 2) {
    errorMessage = 'Name must be at least 2 characters';
    isValid = false;
  } else if (fieldName === 'company' && value && value.length < 2) {
    errorMessage = 'Company name must be at least 2 characters';
    isValid = false;
  } else if (fieldName === 'message' && value && value.length < 10) {
    errorMessage = 'Message must be at least 10 characters';
    isValid = false;
  } else if (fieldName === 'terms' && field.type === 'checkbox' && !field.checked) {
    errorMessage = 'You must agree to the privacy policy';
    isValid = false;
  }

  updateFieldValidationState(field, isValid, errorMessage);
  return isValid;
}

/**
 * Validate email format
 * @param {string} email - Email address to validate
 * @returns {boolean} - Whether the email is valid
 */
function validateEmail(email) {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email);
}

/**
 * Validate phone format
 * @param {string} phone - Phone number to validate
 * @returns {boolean} - Whether the phone is valid
 */
function validatePhone(phone) {
  const phoneRegex = /^[\d\s+()-]{10,}$/;
  return phoneRegex.test(phone);
}

/**
 * Update field validation state UI
 * @param {HTMLElement} field - The field to update
 * @param {boolean} isValid - Whether the field is valid
 * @param {string} errorMessage - Error message to display
 */
function updateFieldValidationState(field, isValid, errorMessage) {
  const errorElement = document.getElementById(`${field.id}-error`);

  if (isValid) {
    field.classList.remove('border-accent-600');
    field.classList.add('border-secondary-300');
    field.setAttribute('aria-invalid', 'false');

    if (errorElement) {
      errorElement.textContent = '';
      errorElement.classList.add('hidden');
    }
  } else {
    field.classList.add('border-accent-600');
    field.classList.remove('border-secondary-300');
    field.setAttribute('aria-invalid', 'true');

    if (errorElement) {
      errorElement.textContent = errorMessage;
      errorElement.classList.remove('hidden');
    }
  }
}

/**
 * Validate entire form
 * @param {HTMLFormElement} form - The form to validate
 * @returns {boolean} - Whether the form is valid
 */
function validateForm(form) {
  const inputs = form.querySelectorAll('input, textarea');
  let isValid = true;

  inputs.forEach(input => {
    if (!validateField(input)) {
      isValid = false;
    }
  });

  const termsCheckbox = form.querySelector('#terms');
  if (termsCheckbox && !validateField(termsCheckbox)) {
    isValid = false;
  }

  return isValid;
}

/**
 * Setup form submission handling
 * @param {HTMLFormElement} form - The contact form element
 */
function setupFormSubmission(form) {
  form.addEventListener('submit', async event => {
    event.preventDefault();

    if (!validateForm(form)) {
      showFormMessage('error', 'Please fix the errors above before submitting.');
      return;
    }

    await handleFormSubmission(form);
  });
}

/**
 * Handle form submission with loading states
 * @param {HTMLFormElement} form - The form to submit
 */
async function handleFormSubmission(form) {
  const submitBtn = form.querySelector('#submit-btn');
  const formData = new FormData(form);

  try {
    setButtonState(submitBtn, 'loading');
    showFormMessage('info', '');

    const response = await fetch(form.action, {
      method: 'POST',
      body: formData,
      headers: {
        Accept: 'application/json',
      },
    });

    if (response.ok) {
      setButtonState(submitBtn, 'success');
      showFormMessage(
        'success',
        'Thank you for your inquiry! We will get back to you within 24 hours.'
      );
      resetFormWithDelay(form, 3000);
    } else {
      throw new Error('Form submission failed');
    }
  } catch (error) {
    console.error('Form submission error:', error);
    setButtonState(submitBtn, 'error');
    showFormMessage(
      'error',
      'Sorry, something went wrong. Please try again or contact us directly at contact@shoeimportpro.com'
    );
  }
}

/**
 * Set button morphing state
 * @param {HTMLButtonElement} button - The button element
 * @param {string} state - The state to set (default, loading, success, error)
 */
function setButtonState(button, state) {
  const textSpan = button.querySelector('.btn-text');
  const spinnerSpan = button.querySelector('.btn-spinner');
  const successSpan = button.querySelector('.btn-success');

  textSpan.classList.toggle('hidden', state !== 'default');
  spinnerSpan.classList.toggle('hidden', state !== 'loading');
  successSpan.classList.toggle('hidden', state !== 'success');

  button.setAttribute('aria-busy', state === 'loading' ? 'true' : 'false');
  button.disabled = state === 'loading' || state === 'success';

  if (state === 'loading') {
    button.classList.add('opacity-75', 'cursor-not-allowed');
  } else if (state === 'success') {
    button.classList.remove('opacity-75', 'cursor-not-allowed');
    button.classList.add('bg-green-600', 'hover:bg-green-700');
  } else if (state === 'error') {
    button.classList.remove('opacity-75', 'cursor-not-allowed');
    setTimeout(() => setButtonState(button, 'default'), 2000);
  } else {
    button.classList.remove('opacity-75', 'cursor-not-allowed', 'bg-green-600', 'hover:bg-green-700');
  }
}

/**
 * Show form message feedback
 * @param {string} type - Message type (success, error, info)
 * @param {string} message - Message to display
 */
function showFormMessage(type, message) {
  const messageElement = document.getElementById('form-message');
  if (!messageElement) {
    return;
  }

  messageElement.classList.remove('hidden', 'bg-green-100', 'text-green-800', 'bg-red-100', 'text-red-800', 'bg-blue-100', 'text-blue-800');

  if (!message) {
    messageElement.classList.add('hidden');
    return;
  }

  if (type === 'success') {
    messageElement.classList.add('bg-green-100', 'text-green-800');
  } else if (type === 'error') {
    messageElement.classList.add('bg-red-100', 'text-red-800');
  } else {
    messageElement.classList.add('bg-blue-100', 'text-blue-800');
  }

  messageElement.textContent = message;
  messageElement.classList.remove('hidden');

  messageElement.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
}

/**
 * Reset form with delay
 * @param {HTMLFormElement} form - The form to reset
 * @param {number} delay - Delay in milliseconds
 */
function resetFormWithDelay(form, delay) {
  setTimeout(() => {
    resetForm(form);
  }, delay);
}

/**
 * Reset form to initial state
 * @param {HTMLFormElement} form - The form to reset
 */
function resetForm(form) {
  form.reset();

  const inputs = form.querySelectorAll('input, textarea');
  inputs.forEach(input => {
    input.classList.remove('border-accent-600');
    input.classList.add('border-secondary-300');
    input.setAttribute('aria-invalid', 'false');

    const errorElement = document.getElementById(`${input.id}-error`);
    if (errorElement) {
      errorElement.textContent = '';
      errorElement.classList.add('hidden');
    }
  });

  const submitBtn = form.querySelector('#submit-btn');
  if (submitBtn) {
    setButtonState(submitBtn, 'default');
  }

  showFormMessage('info', '');
}

/**
 * Setup morphing button interactions
 */
function setupMorphingButton() {
  const submitBtn = document.getElementById('submit-btn');
  if (!submitBtn) {
    return;
  }

  submitBtn.addEventListener('mouseenter', () => {
    if (!submitBtn.disabled) {
      submitBtn.classList.add('scale-105');
    }
  });

  submitBtn.addEventListener('mouseleave', () => {
    submitBtn.classList.remove('scale-105');
  });

  submitBtn.addEventListener('mousedown', () => {
    if (!submitBtn.disabled) {
      submitBtn.classList.add('scale-95');
    }
  });

  submitBtn.addEventListener('mouseup', () => {
    submitBtn.classList.remove('scale-95');
  });
}

export { initContact as default, validateEmail, validatePhone, validateForm, resetForm };
