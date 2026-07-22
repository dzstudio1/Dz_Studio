import { getObraById } from '../data/obrasData.js';

const overlay = document.getElementById('obraOverlay');
const modal = document.getElementById('obraModal');
const content = document.getElementById('obraModalContent');
const closeBtn = document.getElementById('closeObra');

function buildObraHTML(obra) {
    const hasCapitulos = obra.capitulos && obra.capitulos.length > 0;

    let capitulosHTML = '';
    if (hasCapitulos) {
        capitulosHTML = `
            <div class="obra-modal__leitura">
                <h3>Capítulos</h3>
                ${obra.capitulos.map((cap, idx) => `
                    <div class="capitulo">
                        <span>${cap.titulo}</span>
                        <span>${cap.disponivel ? 'Prévia' : 'Em breve'}</span>
                    </div>
                `).join('')}
            </div>
        `;
    } else {
        capitulosHTML = `
            <div class="obra-modal__leitura">
                <h3>Leitura</h3>
                <p style="color: var(--text-secondary);">One Shot completo disponível para leitura.</p>
                <div class="capitulo">
                    <span>Prévia</span>
                    <span>Disponível</span>
                </div>
            </div>
        `;
    }

    const { tiragem, reservados } = obra.reserva;
    const barras = Array.from({ length: tiragem }, (_, i) =>
        i < reservados ? '<span class="ocupado"></span>' : '<span></span>'
    ).join('');

    return `
        <div class="obra-modal__banner">
            <img src="${obra.banner}" alt="${obra.titulo}" />
        </div>

        <div class="obra-modal__header">
            <div class="obra-modal__capa">
                <img src="${obra.capa}" alt="${obra.titulo}" />
            </div>
            <div class="obra-modal__info">
                <h2>${obra.titulo}</h2>
                <span class="status">${obra.status}</span>
                <div class="generos">${obra.categoria.join(' · ')}</div>
                <div class="autor">Autor: ${obra.autor}</div>
                <div class="ano">Ano: ${obra.ano}</div>
                <div class="obra-modal__actions">
                    <button class="btn btn--primary">Ler prévia</button>
                    <button class="btn btn--outline reservar-btn">Reservar edição física</button>
                    <button class="btn btn--outline">Instagram</button>
                </div>
            </div>
        </div>

        <div class="obra-modal__sinopse">
            <h3>Sinopse</h3>
            <p>${obra.sinopse}</p>
        </div>

        ${capitulosHTML}

        <div class="obra-modal__reserva" data-id="${obra.id}">
            <h4>Primeira Tiragem</h4>
            <div class="tiragem">${tiragem} exemplares</div>
            <div class="disponibilidade">
                <strong>Disponibilidade</strong>
                <div class="barra">${barras}</div>
                <span>${reservados} de ${tiragem} reservados</span>
            </div>
            <button class="btn btn--primary reservar-btn-acao">Reservar</button>
        </div>
    `;
}

export function openObraModal(obraId) {
    const obra = getObraById(obraId);
    if (!obra) return;

    content.innerHTML = buildObraHTML(obra);
    overlay.classList.add('open');
    document.body.style.overflow = 'hidden';

    // Re-inicializa a reserva para os novos botões
    import('./reserva.js').then(({ initReserva }) => {
        initReserva();
    });
}

export function closeObraModal() {
    overlay.classList.remove('open');
    document.body.style.overflow = '';
}

export function initObraModal() {
    document.addEventListener('openObra', (e) => {
        openObraModal(e.detail.id);
    });

    if (closeBtn) {
        closeBtn.addEventListener('click', closeObraModal);
    }

    overlay.addEventListener('click', (e) => {
        if (e.target === overlay) {
            closeObraModal();
        }
    });

    document.addEventListener('keydown', (e) => {
        if (e.key === 'Escape' && overlay.classList.contains('open')) {
            closeObraModal();
        }
    });
}