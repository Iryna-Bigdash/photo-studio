document.addEventListener("DOMContentLoaded", () => {
  const slider = document.querySelector('.slider');
  const resizer = document.querySelector('.resizer');
  const handle = document.querySelector('.handle');
  const hint = document.querySelector('.hint');
  const section = document.querySelector('[data-compare]');
  
  if (!slider || !resizer || !handle || !section) return;

  let isDragging = false;
  let isAnimated = false;
  let animationCount = 0;
  const MAX_ANIMATIONS = 3;

  const setPosition = (percentage) => {
    percentage = Math.max(0, Math.min(percentage, 1));
    resizer.style.width = `${percentage * 100}%`;
    handle.style.left = `${percentage * 99}%`;
  };

  const handleMouseMove = (e) => {
    if (!isDragging) return;
    const rect = slider.getBoundingClientRect();
    const offsetX = e.clientX - rect.left;
    const percentage = offsetX / rect.width;
    setPosition(percentage);
  };

  const startDrag = () => {
    isDragging = true;
  };

  const endDrag = () => {
    isDragging = false;
  };

  slider.addEventListener('mousedown', startDrag);
  slider.addEventListener('mouseup', endDrag);
  slider.addEventListener('mouseleave', endDrag);
  slider.addEventListener('mousemove', handleMouseMove);

  // Touch support
  slider.addEventListener('touchstart', startDrag);
  slider.addEventListener('touchend', endDrag);
  slider.addEventListener('touchcancel', endDrag);
  slider.addEventListener('touchmove', (e) => {
    if (!isDragging) return;
    const touch = e.touches[0];
    const rect = slider.getBoundingClientRect();
    const offsetX = touch.clientX - rect.left;
    const percentage = offsetX / rect.width;
    setPosition(percentage);
  });

  // Animation
  const animateSlider = () => {
    if (animationCount >= MAX_ANIMATIONS || isDragging || isAnimated) return;
    isAnimated = true;

    let progress = 0;
    const duration = 2000;
    const direction = animationCount % 2 === 0 ? 1 : -1;
    const start = direction === 1 ? 0 : 1;
    const end = direction === 1 ? 1 : 0;
    const steps = 60;
    const interval = duration / steps;

    const animateStep = () => {
      if (isDragging) return;
      const percentage = start + (end - start) * (progress / steps);
      setPosition(percentage);
      progress++;

      if (progress <= steps) {
        requestAnimationFrame(animateStep);
      } else {
        animationCount++;
        isAnimated = false;
        if (animationCount < MAX_ANIMATIONS) {
          setTimeout(animateSlider, 300);
        }
      }
    };

    requestAnimationFrame(animateStep);
  };

  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting && animationCount < MAX_ANIMATIONS) {
        animateSlider();
      }
    });
  }, {
    threshold: 0.2
  });

  observer.observe(section);
});
