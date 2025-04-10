// function adjustHeroPadding() {
//     const header = document.querySelector('.page-header');
//     const hero = document.querySelector('.section-hero');
  
//     if (!header || !hero) return;
  
//     const headerHeight = header.offsetHeight;
//     const heroStyles = window.getComputedStyle(hero);
//     const paddingBottom = parseFloat(heroStyles.paddingBottom) || 0;
  
//     const calculatedPaddingTop = headerHeight + paddingBottom;
//     hero.style.paddingTop = `${calculatedPaddingTop}px`;
//   }
  
//   function handleScroll() {
//     const header = document.querySelector('.page-header');
//     const hero = document.querySelector('.section-hero');
  
//     if (!header || !hero) return;
  
//     const heroBottom = hero.getBoundingClientRect().bottom;
  
//     if (heroBottom <= header.offsetHeight) {
//       header.classList.add('white-bg');
//     } else {
//       header.classList.remove('white-bg');
//     }
//   }
  
//   window.addEventListener('DOMContentLoaded', () => {
//     adjustHeroPadding();
//     handleScroll();
//   });
  
//   window.addEventListener('resize', adjustHeroPadding);
//   window.addEventListener('scroll', handleScroll);
  

function adjustHeroPadding() {
  const header = document.querySelector('.page-header');
  const hero = document.querySelector('.section-hero');

  if (!header || !hero) return;

  const headerHeight = header.offsetHeight;
  const heroStyles = window.getComputedStyle(hero);
  const paddingBottom = parseFloat(heroStyles.paddingBottom) || 0;

  const calculatedPaddingTop = headerHeight + paddingBottom;
  hero.style.paddingTop = `${calculatedPaddingTop}px`;
}

function handleScroll() {
  const header = document.querySelector('.page-header');
  const heroTitle = document.querySelector('.section-hero h1');

  if (!header || !heroTitle) return;

  const titleTop = heroTitle.getBoundingClientRect().top;

  if (titleTop <= header.offsetHeight) {
    header.classList.add('white-bg');
  } else {
    header.classList.remove('white-bg');
  }
}

window.addEventListener('DOMContentLoaded', () => {
  adjustHeroPadding();
  handleScroll();
});

window.addEventListener('resize', adjustHeroPadding);
window.addEventListener('scroll', handleScroll);
