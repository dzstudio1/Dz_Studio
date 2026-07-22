/**
 * ============================================
 * RESERVA.JS – SISTEMA DE DISPONIBILIDADE
 * ============================================
 * Altere os números abaixo para ajustar as reservas.
 */

const reservaConfig = {
    'entre-tempos': 6,
    'nos': 4,
};

function atualizarReserva(obraId) {
    const container = document.querySelector(`.obra-modal__reserva[data-id="${obraId}"]`);
    if (!container) return;

    const tiragemText = container.querySelector('.tiragem')?.textContent || '0';
    const tiragem = parseInt(tiragemText.replace(/[^0-9]/g, '')) || 0;
    const reservados = reservaConfig[obraId] ?? 0;

    const dispSpan = container.querySelector('.disponibilidade span');
    if (dispSpan) {
        dispSpan.textContent = `${reservados} de ${tiragem} reservados`;
    }

    const barra = container.querySelector('.barra');
    if (barra) {
        const total = tiragem;
        const ocupados = Math.min(reservados, total);
        barra.innerHTML = Array.from({ length: total }, (_, i) =>
            i < ocupados ? '<span class="ocupado"></span>' : '<span></span>'
        ).join('');
    }
}

export function initReserva() {
    // Botões "Reservar" dentro do modal
    document.querySelectorAll('.reservar-btn-acao, .reservar-btn').forEach(btn => {
        // Remove listeners duplicados
        btn.removeEventListener('click', handleReserva);
        btn.addEventListener('click', handleReserva);
    });

    // Atualiza todas as reservas visíveis
    document.querySelectorAll('.obra-modal__reserva').forEach(el => {
        const id = el.dataset.id;
        if (id && reservaConfig[id] !== undefined) {
            atualizarReserva(id);
        }
    });
}

function handleReserva(e) {
    e.stopPropagation();
    const btn = e.currentTarget;
    const reservaBox = btn.closest('.obra-modal__reserva');
    if (!reservaBox) return;
    const obraId = reservaBox.dataset.id;
    if (!obraId) return;

    if (reservaConfig[obraId] !== undefined) {
        const tiragemText = reservaBox.querySelector('.tiragem')?.textContent || '0';
        const tiragem = parseInt(tiragemText.replace(/[^0-9]/g, '')) || 0;

        if (reservaConfig[obraId] < tiragem) {
            reservaConfig[obraId] += 1;
            atualizarReserva(obraId);
            // Feedback visual
            btn.textContent = 'Reservado!';
            btn.style.background = 'var(--green-secondary)';
            setTimeout(() => {
                btn.textContent = 'Reservar';
                btn.style.background = '';
            }, 1500);
        } else {
            alert('Todos os exemplares já foram reservados.');
        }
    }
}