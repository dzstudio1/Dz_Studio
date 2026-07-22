/**
 * ============================================
 * MAIN.JS – PONTO DE ENTRADA
 * ============================================
 */

import { initNavbar } from './modules/navbar.js';
import { renderObras, initObraCards } from './modules/obras.js';
import { initObraModal } from './modules/obraModal.js';
import { initScrollReveal } from './modules/scrollReveal.js';
import { initReserva } from './modules/reserva.js';

console.log('🚀 DZ Studio - Inicializando...');

document.addEventListener('DOMContentLoaded', () => {
    console.log('📄 DOM carregado');

    // Inicializa todos os módulos
    initNavbar();
    renderObras();
    initObraCards();
    initObraModal();

    // Inicializa scroll reveal com pequeno delay
    setTimeout(() => {
        console.log('⏳ Iniciando ScrollReveal...');
        initScrollReveal();
    }, 200);

    // Inicializa reserva
    setTimeout(() => {
        initReserva();
    }, 500);

    console.log('✅ Todos os módulos inicializados');
});