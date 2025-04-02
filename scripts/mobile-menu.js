(()=>{
    const menuBtnRef = document.querySelector('[data-menu-btn]');
    const mobileMenuRef = document.querySelector('[data-hamburger-menu]');
 
    menuBtnRef.addEventListener('click', ()=>{
        const expended = menuBtnRef.getAttribute('aria-expanded') === "true" || false;

        menuBtnRef.classList.toggle('is-open');
        menuBtnRef.setAttribute('aria-expanded', !expended)

        mobileMenuRef.classList.toggle('is-open');
    });
 })();