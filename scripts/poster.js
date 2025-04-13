//   const container = document.querySelector('.ba-container');
//   const afterImg = container.querySelector('.ba-img-after');
//   const handle = container.querySelector('.ba-handle');

//   container.addEventListener('mousemove', (e) => {
//     const rect = container.getBoundingClientRect();
//     let offsetX = e.clientX - rect.left;

//     if (offsetX < 0) offsetX = 0;
//     if (offsetX > rect.width) offsetX = rect.width;

//     const percent = (offsetX / rect.width) * 100;
//     afterImg.style.clipPath = `inset(0 ${100 - percent}% 0 0)`;
//     handle.style.left = `${percent}%`;
//   });

//   container.addEventListener('touchmove', (e) => {
//     if (e.touches.length === 1) {
//       const touch = e.touches[0];
//       const rect = container.getBoundingClientRect();
//       let offsetX = touch.clientX - rect.left;

//       if (offsetX < 0) offsetX = 0;
//       if (offsetX > rect.width) offsetX = rect.width;

//       const percent = (offsetX / rect.width) * 100;
//       afterImg.style.clipPath = `inset(0 ${100 - percent}% 0 0)`;
//       handle.style.left = `${percent}%`;
//     }
//   });

  const slider = document.querySelector('.slider');
  const resizer = document.querySelector('.resizer');
  const handle = document.querySelector('.handle');

  slider.addEventListener('mousemove', (e) => {
    if (e.buttons !== 1) return; // only drag with mouse button held
    const rect = slider.getBoundingClientRect();
    const offsetX = e.clientX - rect.left;
    const percentage = Math.max(0, Math.min(offsetX / rect.width, 1));
    resizer.style.width = `${percentage * 100}%`;
    handle.style.left = `${percentage * 100}%`;
  });

  slider.addEventListener('mousedown', (e) => {
    e.preventDefault();
  });

