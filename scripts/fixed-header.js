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
    const hero = document.querySelector('.section-hero');
  
    if (!header || !hero) return;
  
    const heroBottom = hero.getBoundingClientRect().bottom;
  
    // Якщо нижній край герою менше або дорівнює висоті хедера → додаємо клас
    if (heroBottom <= header.offsetHeight) {
      header.classList.add('white-bg');
    } else {
      header.classList.remove('white-bg');
    }
  }
  
  window.addEventListener('DOMContentLoaded', () => {
    adjustHeroPadding();
    handleScroll(); // одразу перевірити
  });
  window.addEventListener('resize', adjustHeroPadding);
  window.addEventListener('scroll', handleScroll);
  