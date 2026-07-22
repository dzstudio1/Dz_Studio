export function initNavbar() {
    const hamburger = document.getElementById('hamburger');
    const menu = document.getElementById('navbarMenu');
    const links = document.querySelectorAll('[data-nav]');

    if (!hamburger || !menu) return;

    hamburger.addEventListener('click', () => {
        const isOpen = menu.classList.toggle('open');
        hamburger.classList.toggle('active');
        hamburger.setAttribute('aria-expanded', isOpen);
    });

    links.forEach(link => {
        link.addEventListener('click', () => {
            menu.classList.remove('open');
            hamburger.classList.remove('active');
            hamburger.setAttribute('aria-expanded', 'false');
        });
    });

    document.addEventListener('click', (e) => {
        if (!menu.contains(e.target) && !hamburger.contains(e.target)) {
            menu.classList.remove('open');
            hamburger.classList.remove('active');
            hamburger.setAttribute('aria-expanded', 'false');
        }
    });

    const navbar = document.getElementById('navbar');
    window.addEventListener('scroll', () => {
        if (window.scrollY > 20) {
            navbar.style.background = 'rgba(248, 248, 246, 0.85)';
        } else {
            navbar.style.background = 'rgba(248, 248, 246, 0.72)';
        }
    });
}