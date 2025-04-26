(() => {
    const menuBtnRef = document.querySelector('[data-menu-btn]');
    const mobileMenuRef = document.querySelector('[data-hamburger-menu]');
    const menuLinks = document.querySelectorAll('.site-nav a');

    function closeMenu() {
        // Додаємо клас для плавного закриття
        mobileMenuRef.classList.add('is-closing');
        
        // Чекаємо, поки анімація завершиться (запускаємо через затримку)
        setTimeout(() => {
            menuBtnRef.classList.remove('is-open');
            menuBtnRef.setAttribute('aria-expanded', 'false');
            mobileMenuRef.classList.remove('is-open', 'is-closing');
            
            menuLinks.forEach(link => {
                link.removeEventListener('click', closeMenu);
            });
        }, 300);
    }

    menuBtnRef.addEventListener('click', () => {
        const expanded = menuBtnRef.getAttribute('aria-expanded') === "true" || false;

        menuBtnRef.classList.toggle('is-open');
        menuBtnRef.setAttribute('aria-expanded', !expanded);
        mobileMenuRef.classList.toggle('is-open');

        if (!expanded) {
            menuLinks.forEach(link => {
                link.addEventListener('click', closeMenu);
            });
        } else {
            menuLinks.forEach(link => {
                link.removeEventListener('click', closeMenu);
            });
        }
    });
})();
