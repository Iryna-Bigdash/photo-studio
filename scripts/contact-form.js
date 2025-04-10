// key: t10X5nNiREB4IW_nG
// user-id: user_t10X5nNiREB4IW_nG
// service-id: service_2a13psh
// temlate-id: template_nuzg4bh

(() => {
  document
    .querySelector('.js-contact-form')
    .addEventListener('submit', e => {
      e.preventDefault();

      // встановлюємо час перед надсиланням
      document.getElementById("message-time").value = new Date().toLocaleString();

      const formData = new FormData(e.currentTarget);

      // Виводимо всі поля у консоль
      formData.forEach((value, name) => {
        console.log(`${name}: ${value}`);
      });

      // ТУТ додаємо відправку через EmailJS, якщо потрібно
      emailjs.sendForm('service_2a13psh', 'template_nuzg4bh', e.currentTarget, 't10X5nNiREB4IW_nG')
        .then(() => {
          alert('Ваше повідомлення надіслано!');
          e.currentTarget.reset(); // очистити форму
        })
        .catch(error => {
          console.error('Помилка при надсиланні:', error);
          alert('Помилка при надсиланні. Спробуйте ще раз.');
        });
    });
})();
