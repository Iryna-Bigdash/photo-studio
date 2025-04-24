document.querySelectorAll('.faq-question').forEach(item => {
    item.addEventListener('click', () => {
      const faqItem = item.closest('.faq-item');
      faqItem.classList.toggle('active');
    });
  });