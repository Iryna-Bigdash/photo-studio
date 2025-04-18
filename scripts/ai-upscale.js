document.addEventListener('DOMContentLoaded', () => {
  const slider = document.querySelector('.slider');
  const resizer = document.querySelector('.resizer');
  const handle = document.querySelector('.handle');
  const section = document.querySelector('[data-compare]');

  if (!slider || !resizer || !handle || !section) return;

  let isDragging = false;
  let isAnimated = false;
  let animationCount = 0;
  const MAX_ANIMATIONS = 2;

  const setPosition = percentage => {
    const clamped = Math.max(0, Math.min(percentage, 1));
    resizer.style.width = `${clamped * 100}%`;
    handle.style.left = `${clamped * 99}%`;
  };

  const getPercentageFromEvent = clientX => {
    const rect = slider.getBoundingClientRect();
    return (clientX - rect.left) / rect.width;
  };

  const updatePosition = clientX => {
    if (!isDragging) return;
    setPosition(getPercentageFromEvent(clientX));
  };

  const startDrag = e => {
    isDragging = true;
    e.preventDefault(); // запобігає виділенню тексту
  };

  const endDrag = () => (isDragging = false);

  // Mouse events
  slider.addEventListener('mousedown', startDrag);
  slider.addEventListener('mouseup', endDrag);
  slider.addEventListener('mouseleave', endDrag);
  slider.addEventListener('mousemove', e => updatePosition(e.clientX));

  // Touch events
  slider.addEventListener('touchstart', startDrag);
  slider.addEventListener('touchend', endDrag, { passive: true });
  slider.addEventListener('touchcancel', endDrag, { passive: true });
  slider.addEventListener(
    'touchmove',
    e => {
      if (e.touches.length > 0) updatePosition(e.touches[0].clientX);
    },
    { passive: true },
  );

  const animateSlider = () => {
    if (animationCount >= MAX_ANIMATIONS || isDragging || isAnimated) return;
    isAnimated = true;

    const frames = 60;

    const direction = animationCount % 2 === 0 ? 1 : -1;
    const start = direction === 1 ? 0 : 1;
    const end = direction === 1 ? 1 : 0;

    let frame = 0;

    const animateStep = () => {
      if (isDragging) return;

      const progress = frame / frames;
      const percentage = start + (end - start) * progress;
      setPosition(percentage);
      frame++;

      if (frame <= frames) {
        requestAnimationFrame(animateStep);
      } else {
        animationCount++;
        isAnimated = false;

        if (animationCount === 1) {
          setPosition(1);
          setTimeout(animateSlider, 300);
        } else if (animationCount === 2) {
          setPosition(0.5);
        }
      }
    };

    requestAnimationFrame(animateStep);
  };

  const observer = new IntersectionObserver(
    ([entry]) => {
      if (entry.isIntersecting && animationCount < MAX_ANIMATIONS) {
        animateSlider();
      }
    },
    { threshold: 0.2 },
  );

  observer.observe(section);
});
