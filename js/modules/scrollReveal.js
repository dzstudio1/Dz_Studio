/**
 * ============================================
 * SCROLL REVEAL – VERSÃO MAIS SIMPLES (OPÇÃO 3)
 * ============================================
 * Apenas adiciona classe 'visible' após delay
 * Não usa Intersection Observer
 */

export function initScrollReveal() {
    console.log('🔄 initScrollReveal (simples) iniciado');

    const elements = document.querySelectorAll(
        '.section-title, .sobre__text, .sobre__fundador, .contato__link, .card-obra'
    );

    if (elements.length === 0) {
        console.warn('⚠️ Nenhum elemento encontrado');
        return;
    }

    // Adiciona classe reveal
    elements.forEach((el, index) => {
        if (!el.classList.contains('reveal')) {
            el.classList.add('reveal');
        }
        // Delay progressivo
        const delay = (index % 4) * 100;
        el.style.transitionDelay = `${delay}ms`;
    });

    // Função que verifica visibilidade
    function checkVisibility() {
        let anyVisible = false;
        elements.forEach(el => {
            const rect = el.getBoundingClientRect();
            const windowHeight = window.innerHeight || document.documentElement.clientHeight;
            const isVisible = rect.top < windowHeight - 40;

            if (isVisible && !el.classList.contains('visible')) {
                el.classList.add('visible');
                anyVisible = true;
                console.log('✅ Elemento revelado:', el);
            }
        });
        return anyVisible;
    }

    // Verifica imediatamente
    checkVisibility();

    // Verifica no scroll (com throttle)
    let lastScroll = 0;
    window.addEventListener('scroll', () => {
        const now = Date.now();
        if (now - lastScroll > 50) {
            checkVisibility();
            lastScroll = now;
        }
    });

    // Verifica no resize
    window.addEventListener('resize', () => {
        setTimeout(checkVisibility, 200);
    });

    console.log('✅ ScrollReveal simples iniciado');
}