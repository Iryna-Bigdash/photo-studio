(() => {
  const form = document.querySelector('.js-contact-form');

  emailjs.init('t10X5nNiREB4IW_nG');

  form.addEventListener('submit', e => {
    e.preventDefault();

    let isValid = true;
    const requiredFields = form.querySelectorAll('input[required], textarea[required]');

    for (const input of requiredFields) {
      const errorSpan = input.parentElement.querySelector('.error-message');
      const value = input.value.trim();

      // Reset the error state before validating
      input.classList.remove('input-error');
      if (errorSpan) errorSpan.textContent = '';

      if (!value) {
        isValid = false;
        triggerShakeAnimation(input);
        errorSpan.textContent = 'This field is required.';
        continue;
      }

      if (input.name === 'phone') {
        const phoneRegex = /^[0-9+\s()-]+$/;
        if (!phoneRegex.test(value)) {
          isValid = false;
          triggerShakeAnimation(input);
          errorSpan.textContent = 'Enter a valid phone number.';
          continue;
        }
      }
    }

    if (!isValid) return;

    // Add the current time when the form is submitted
    document.getElementById("message-time").value = new Date().toLocaleString();

    // Send the form via emailjs
    emailjs.sendForm('service_2a13psh', 'template_nuzg4bh', form, 't10X5nNiREB4IW_nG')
      .then(() => {
        showToast('Your message was sent successfully!', 'success');
        resetFormFields();
      })
      .catch(error => {
        console.error('Send error:', error);
        showToast('Error! Try again later.', 'error');
      });
  });

  form.querySelectorAll('input, textarea').forEach(field => {
    field.addEventListener('input', () => {
      field.classList.remove('input-error');
      const errorSpan = field.parentElement.querySelector('.error-message');
      if (errorSpan) errorSpan.textContent = '';

      // Recheck the field validity if necessary
      if (field.value.trim() === '' && field.required) {
        errorSpan.textContent = 'This field is required.';
      }
    });
  });


  function triggerShakeAnimation(input) {
    input.classList.remove('input-error');
    void input.offsetWidth;  // Trigger reflow to reset animation
    input.classList.add('input-error');
  }

  function resetFormFields() {
    form.reset();
    form.querySelectorAll('.form-field input, .form-field textarea').forEach(el => {
      el.classList.remove('filled');
    });
  }
})();
