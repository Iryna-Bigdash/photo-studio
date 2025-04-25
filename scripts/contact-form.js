(() => {
  const form = document.querySelector('.js-contact-form');

  form.addEventListener('submit', e => {
    e.preventDefault();

    let isValid = true;
    const requiredFields = form.querySelectorAll('input[required], textarea[required]');

    for (const input of requiredFields) {
      const errorSpan = input.parentElement.querySelector('.error-message');
      const value = input.value.trim();

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

      input.classList.remove('input-error');
      errorSpan.textContent = '';
    }

    if (!isValid) return;

    document.getElementById("message-time").value = new Date().toLocaleString();

    const formData = new FormData(form);


    formData.forEach((value, name) => {
      console.log(`${name}: ${value}`);
    });


    emailjs.sendForm('service_2a13psh', 'template_nuzg4bh', form, 't10X5nNiREB4IW_nG')
      .then(() => {
        alert('Your massage was send!');

        form.reset();
        form.querySelectorAll('.form-field input, .form-field textarea').forEach(el => {
          el.classList.remove('filled');
        });
      })
      .catch(error => {
        console.error('Send error:', error);
        alert('Error!Try again later .');
      });
  });


  form.querySelectorAll('input, textarea').forEach(field => {
    field.addEventListener('input', () => {
      field.classList.remove('input-error');
      const errorSpan = field.parentElement.querySelector('.error-message');
      if (errorSpan) errorSpan.textContent = '';
    });
  });


  function triggerShakeAnimation(input) {
    input.classList.remove('input-error');
    void input.offsetWidth;
    input.classList.add('input-error');
  }
})();
