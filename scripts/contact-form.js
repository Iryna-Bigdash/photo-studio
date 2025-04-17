(() => {
  document
    .querySelector('.js-contact-form')
    .addEventListener('submit', e => {
      e.preventDefault();

      document.getElementById("message-time").value = new Date().toLocaleString();

      const form = e.currentTarget;
      const formData = new FormData(form);

      formData.forEach((value, name) => {
        console.log(`${name}: ${value}`);
      });

      emailjs.sendForm('service_2a13psh', 'template_nuzg4bh', form, 't10X5nNiREB4IW_nG')
        .then(() => {
          alert('Ваше повідомлення надіслано!');

          form.querySelectorAll('input, textarea').forEach(el => {
            el.value = '';
          });

          form.querySelectorAll('.form-field input, .form-field textarea').forEach(el => {
            el.classList.remove('filled');
          });
        })
        .catch(error => {
          console.error('Помилка при надсиланні:', error);

          form.querySelectorAll('input, textarea').forEach(el => {
            el.value = '';
          });
        });
    });
})();
