function animateCount(el, target, duration = 2000) {
    let start = 0;
    let startTime = null;
  
    const step = (timestamp) => {
      if (!startTime) startTime = timestamp;
      const progress = Math.min((timestamp - startTime) / duration, 1);
      el.textContent = Math.floor(progress * target);
      if (progress < 1) {
        requestAnimationFrame(step);
      } else {
        el.textContent = target;
      }
    };
  
    requestAnimationFrame(step);
  }
  
  // Стежимо, коли .statistics з’явиться на екрані
  const observer = new IntersectionObserver(
    (entries, observer) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          const numbers = document.querySelectorAll('.number');
          numbers.forEach(num => {
            const target = parseInt(num.dataset.target, 10);
            animateCount(num, target);
          });
          observer.unobserve(entry.target); // не спрацьовує повторно
        }
      });
    },
    {
      threshold: 0.5, // коли 50% блоку видно
    }
  );
  
  // Запуск спостереження за секцією
  const statsSection = document.querySelector('.statistics');
  if (statsSection) {
    observer.observe(statsSection);
  }
  