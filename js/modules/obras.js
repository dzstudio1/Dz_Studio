import { obras } from '../data/obrasData.js';

export function renderObras() {
    const grid = document.getElementById('obrasGrid');
    if (!grid) return;

    grid.innerHTML = obras.map(obra => `
        <div class="card-obra reveal" data-id="${obra.id}">
            <div class="card-obra__image">
                <img 
                    src="${obra.capa}" 
                    alt="${obra.titulo}" 
                    loading="lazy"
                    onerror="this.style.display='none'; this.parentElement.innerHTML=\`
                        <div style=\`
                            width:100%;height:100%;
                            background:${obra.cor};
                            display:flex;align-items:center;justify-content:center;
                            color:#fff;font-family:Outfit,sans-serif;
                            font-size:1.5rem;font-weight:700;
                            text-align:center;padding:1rem;
                        \`>
                            ${obra.titulo}
                        </div>
                    \`"
                />
            </div>
            <div class="card-obra__body">
                <h3 class="card-obra__title">${obra.titulo}</h3>
                <div class="card-obra__meta">
                    <span>${obra.categoria.join(' · ')}</span>
                </div>
                <span class="card-obra__status ${obra.statusClass || ''}">${obra.status}</span>
                <div>
                    <button class="card-obra__btn" data-id="${obra.id}">Ver Obra</button>
                </div>
            </div>
        </div>
    `).join('');
}

export function initObraCards() {
    const grid = document.getElementById('obrasGrid');
    if (!grid) return;

    grid.addEventListener('click', (e) => {
        const btn = e.target.closest('.card-obra__btn');
        if (!btn) return;
        const id = btn.dataset.id;
        if (id) {
            const event = new CustomEvent('openObra', { detail: { id } });
            document.dispatchEvent(event);
        }
    });
}

export function renderObras() {
    const grid = document.getElementById('obrasGrid');
    if (!grid) return;

    grid.innerHTML = obras.map(obra => `
        <div class="card-obra reveal" data-id="${obra.id}">
            <div class="card-obra__image">
                <img src="${obra.capa}" alt="${obra.titulo}" loading="lazy" />
            </div>
            <div class="card-obra__body">
                <h3 class="card-obra__title">${obra.titulo}</h3>
                <div class="card-obra__meta">
                    <span>${obra.categoria.join(' · ')}</span>
                </div>
                <span class="card-obra__status ${obra.statusClass || ''}">${obra.status}</span>
                <div>
                    <button class="card-obra__btn" data-id="${obra.id}">Ver Obra</button>
                </div>
            </div>
        </div>
    `).join('');
}

export function initObraCards() {
    const grid = document.getElementById('obrasGrid');
    if (!grid) return;

    grid.addEventListener('click', (e) => {
        const btn = e.target.closest('.card-obra__btn');
        if (!btn) return;
        const id = btn.dataset.id;
        if (id) {
            const event = new CustomEvent('openObra', { detail: { id } });
            document.dispatchEvent(event);
        }
    });
}