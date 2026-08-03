// ================================================
// CONFIGURAÇÃO CENTRAL
// ================================================
function paginasFatiadas(pasta, total) {
    return Array.from({ length: total }, (_, index) =>
        `${pasta}/pagina-${String(index + 1).padStart(2, '0')}.webp`
    );
}

const CONFIG = {
    nome: 'DZ Studio',
    subtitulo: 'Universos, personagens e histórias autorais — para quem acredita que o tempo é feito de pequenos momentos que valem a pena guardar.',
    sobreTexto: 'DZ Studio nasceu da vontade de criar mundos onde as pessoas pudessem encontrar um pedaço de si mesmas. Somos um estúdio criativo independente, feito por poucas mãos e muito cuidado, dedicado a quadrinhos autorais que exploram tempo, amor, amizade e crescimento.',
    autorTexto: 'Danieruuz é um artista e contador de histórias que encontrou nos quadrinhos a forma mais autêntica de se expressar. Inspirado por slice of life, mangás e pela beleza dos dias comuns, ele cria mundos onde o tempo ganha significado através das conexões humanas.',

    formspreeId: 'xpqvpvqg',

    // ===== PERSONAGENS =====
    personagens: [
        {
            id: 'daren',
            nome: 'Daren',
            papel: 'Protagonista',
            emoji: '🧑‍🎨',
            imagem: 'assets/images/personagens/daren.png',
            descricao: 'Ao lado de Delyah, Daren atravessa diferentes momentos da vida — passado, presente e futuro — carregando dúvidas, erros e aprendizados que o tornam, acima de tudo, humano.',
            tags: ['Protagonista', 'Humano, imperfeito', 'Em constante transformação']
        },
        {
            id: 'delyah',
            nome: 'Delyah',
            papel: 'Protagonista',
            emoji: '👩‍🎨',
            imagem: 'assets/images/personagens/delyah.png',
            descricao: 'Junto de Daren, Delyah vive uma história que se estende pelo tempo. Nem sempre acerta, nem sempre entende — mas cada escolha, certa ou errada, constrói quem ela é.',
            tags: ['Protagonista', 'Humana, imperfeita', 'Em constante transformação']
        },
        {
            id: 'victor',
            nome: 'Victor',
            papel: 'Presença constante',
            emoji: '🧑‍💻',
            imagem: 'assets/images/personagens/victor.png',
            descricao: 'Victor caminha ao lado de Daren e Delyah por diferentes fases da vida deles, influenciando decisões e sentimentos de formas que só o tempo revela.',
            tags: ['Próximo dos protagonistas', 'Influência emocional e social', 'Presente em várias fases da história']
        },
        {
            id: 'kavya',
            nome: 'Kavya',
            papel: 'Presença constante',
            emoji: '👩‍🌾',
            imagem: 'assets/images/personagens/kavya.png',
            descricao: 'Assim como Victor, Kavya também acompanha essa jornada — mais perto do que parece, e presente em momentos que ainda vão se revelar ao longo da história.',
            tags: ['Próxima dos protagonistas', 'Influência emocional e social', 'Presente em várias fases da história']
        }
    ],

    // ===== HISTÓRIAS COM CAPÍTULOS (IMAGENS INTERNAS) =====
    historias: [{
        id: 'entre-tempos',
        titulo: 'Entre Tempos',
        genero: 'Slice of Life · Drama',
        emoji: '📖',
        status: 'Em publicação',
        capa: 'assets/images/obras/entre-tempos-card.jpg',
        banner: 'assets/images/obras/entre-tempos-banner.jpg',
        sinopse: 'Uma história sobre tempo, amizade e crescimento.',
        descricaoCompleta: 'Entre Tempos acompanha personagens comuns lidando com o peso invisível do tempo — amizades que se transformam, silêncios que dizem mais que palavras, e a beleza de crescer mesmo quando dói.',
        capitulos: [
            { 
                numero: 1, 
                titulo: 'Capítulo 1 - Pessoas Mudam',
                paginas: paginasFatiadas('assets/images/capitulos/entre-tempos/cap1', 5)
            },
            { 
                numero: 2, 
                titulo: 'Capítulo 2 - Burnout',
                paginas: paginasFatiadas('assets/images/capitulos/entre-tempos/cap2', 3)
            },
            { 
                numero: 3, 
                titulo: 'Capítulo 3 - Aquele Dia',
                paginas: paginasFatiadas('assets/images/capitulos/entre-tempos/cap3', 4)
            }
        ]
    }, {
        id: 'nos',
        titulo: 'Nós',
        genero: 'Slice of Life · Romance',
        emoji: '💕',
        status: 'Em publicação',
        capa: 'assets/images/obras/nos-card.jpg',
        banner: 'assets/images/obras/nos-banner.jpg',
        sinopse: 'Dante e Dahlin vivem o tipo de amor que aquece o peito sem fazer barulho.',
        descricaoCompleta: 'Nós é a história de dois corações que encontraram o próprio ritmo. Nos pequenos gestos do dia a dia, Dante e Dahlin constroem o tipo de amor que não precisa de grandes cenas para ser verdadeiro.',
        capitulos: [
            { 
                numero: 1, 
                titulo: 'Capítulo 1',
                paginas: paginasFatiadas('assets/images/capitulos/nos/cap1', 8)
            }
        ]
    }],

    redes: [
        { nome: 'Instagram', icone: 'assets/icons/instagram.svg', link: 'https://www.instagram.com/danieruuz.artt/' },
        { nome: 'TikTok', icone: 'assets/icons/tiktok.svg', link: 'https://www.tiktok.com/@danieruuzart' },
        { nome: 'YouTube', icone: 'assets/icons/youtube.svg', link: 'https://www.youtube.com/@Danieruuz.Arttsz' },
        { nome: 'Karikari', icone: 'assets/icons/karikari.svg', link: 'https://karikari.app/obra/entre-tempos' }
    ]
};

// ================================================
// ESTADO DO LEITOR
// ================================================
let leitorEstado = {
    historiaId: null,
    capituloIndex: 0,
    paginaIndex: 0,
    capitulos: [],
    totalPaginas: 0
};

// ================================================
// INICIALIZAÇÃO
// ================================================
document.addEventListener('DOMContentLoaded', function() {
    setTimeout(function() {
        const loading = document.getElementById('loading');
        if (loading) loading.classList.add('hidden');
    }, 700);

    aplicarConfig();
    initNav();
    initTheme();
    initScrollReveal();
    initForms();
    initModal();
    initReader();
});

// ================================================
// APLICAR CONFIGURAÇÃO
// ================================================
function aplicarConfig() {
    const heroSubtitle = document.getElementById('heroSubtitle');
    if (heroSubtitle) heroSubtitle.textContent = CONFIG.subtitulo;
    
    const aboutText = document.getElementById('aboutText');
    if (aboutText) aboutText.textContent = CONFIG.sobreTexto;
    
    const authorText = document.getElementById('authorText');
    if (authorText) authorText.textContent = CONFIG.autorTexto;

    // Personagens
    const charGrid = document.getElementById('charactersGrid');
    if (charGrid) {
        charGrid.innerHTML = CONFIG.personagens.map((p, i) => `
            <div class="character-card reveal" style="transition-delay:${i*0.1}s">
                <div class="character-image">
                    <img src="${p.imagem}" alt="${p.nome}" onerror="this.style.display='none'; this.parentElement.textContent='${p.emoji}'">
                </div>
                <h3 class="character-name">${p.nome}</h3>
                <div class="character-role">${p.papel}</div>
                <p class="character-desc">${p.descricao}</p>
                <div class="character-tags">
                    ${p.tags.map(tag => `<span class="character-tag">${tag}</span>`).join('')}
                </div>
            </div>
        `).join('');
    }

    // Histórias
    const grid = document.getElementById('storiesGrid');
    if (grid) {
        grid.innerHTML = CONFIG.historias.map((h, i) => `
            <div class="story-card reveal" style="transition-delay:${i*0.1}s" onclick="abrirPrevia('${h.id}')">
                <div class="story-cover">
                    <img src="${h.capa || ''}" alt="${h.titulo}" loading="lazy" onerror="this.style.display='none'; this.parentElement.innerHTML='<span class=\\'cover-emoji\\'>${h.emoji}</span>'">
                </div>
                <div class="story-body">
                    <div class="story-meta">
                        <span class="story-genre">${h.genero}</span>
                        <span class="story-status ${h.status === 'Em breve' ? 'breve' : ''}">${h.status}</span>
                    </div>
                    <h3>${h.titulo}</h3>
                    <p>${h.sinopse}</p>
                    <div class="story-actions">
                        <button class="btn-small" onclick="event.stopPropagation(); abrirPrevia('${h.id}')">📖 Ler Agora</button>
                        <a href="#reservar" class="btn-small btn-small-outline" onclick="event.stopPropagation();">📦 Reservar</a>
                    </div>
                </div>
            </div>
        `).join('');
    }

    // Redes
    const social = document.getElementById('socialGrid');
    if (social) {
        social.innerHTML = CONFIG.redes.map(r => `
            <a href="${r.link}" target="_blank" rel="noopener" class="social-btn reveal">
                <span class="social-icon"><img src="${r.icone}" alt="" aria-hidden="true"></span>
                <span>${r.nome}</span>
            </a>
        `).join('');
    }

    // Formspree
    const formId = CONFIG.formspreeId || 'SEU_FORM_ID';
    const reserveForm = document.getElementById('reserveForm');
    const contactForm = document.getElementById('contactForm');
    if (reserveForm) reserveForm.action = `https://formspree.io/f/${formId}`;
    if (contactForm) contactForm.action = `https://formspree.io/f/${formId}`;

    const footerYear = document.getElementById('footerYear');
    if (footerYear) footerYear.textContent = new Date().getFullYear();
}

// ================================================
// MODAL DE PRÉVIA COM CAPÍTULOS
// ================================================
function abrirPrevia(id) {
    const historia = CONFIG.historias.find(h => h.id === id);
    if (!historia) return;

    const modalEmoji = document.getElementById('modalEmoji');
    const modalTitle = document.getElementById('modalTitle');
    const modalGenre = document.getElementById('modalGenre');
    const modalDescription = document.getElementById('modalDescription');
    const modalBanner = document.getElementById('modalBanner');
    const modalCapitulos = document.getElementById('modalCapitulos');

    if (modalEmoji) modalEmoji.textContent = historia.emoji;
    if (modalTitle) modalTitle.textContent = historia.titulo;
    if (modalGenre) modalGenre.textContent = historia.genero;
    if (modalDescription) modalDescription.textContent = historia.descricaoCompleta || historia.sinopse;

    // Banner
    if (modalBanner) {
        if (historia.banner) {
            modalBanner.src = historia.banner;
            modalBanner.style.display = 'block';
            modalBanner.onerror = function() { this.style.display = 'none'; };
        } else {
            modalBanner.style.display = 'none';
        }
    }

    // Capítulos
    if (modalCapitulos) {
        if (historia.capitulos && historia.capitulos.length > 0) {
            modalCapitulos.innerHTML = historia.capitulos.map((cap, index) => `
                <button class="capitulo-link" onclick="fecharPrevia(); abrirLeitor('${historia.id}', ${index})">
                    <span class="capitulo-numero">#${cap.numero}</span>
                    <span class="capitulo-titulo">${cap.titulo}</span>
                    <span class="capitulo-icone">📖</span>
                </button>
            `).join('');
            modalCapitulos.style.display = 'flex';
        } else {
            modalCapitulos.innerHTML = '<p style="color: var(--text-secondary); font-size: 0.9rem;">Nenhum capítulo disponível ainda.</p>';
            modalCapitulos.style.display = 'block';
        }
    }

    const previaModal = document.getElementById('previaModal');
    if (previaModal) {
        previaModal.classList.add('active');
        document.body.style.overflow = 'hidden';
    }
}

function fecharPrevia() {
    const previaModal = document.getElementById('previaModal');
    if (previaModal) {
        previaModal.classList.remove('active');
        document.body.style.overflow = '';
    }
}

function initModal() {
    const modalClose = document.getElementById('modalClose');
    const modalFecharBtn = document.getElementById('modalFecharBtn');
    const previaModal = document.getElementById('previaModal');

    if (modalClose) modalClose.addEventListener('click', fecharPrevia);
    if (modalFecharBtn) modalFecharBtn.addEventListener('click', fecharPrevia);
    
    if (previaModal) {
        previaModal.addEventListener('click', function(e) {
            if (e.target === this) fecharPrevia();
        });
    }
    
    document.addEventListener('keydown', function(e) {
        if (e.key === 'Escape') fecharPrevia();
    });
}

// ================================================
// LEITOR DE CAPÍTULOS (INTERNO)
// ================================================
function abrirLeitor(historiaId, capituloIndex) {
    const historia = CONFIG.historias.find(h => h.id === historiaId);
    if (!historia || !historia.capitulos || historia.capitulos.length === 0) {
        alert('Nenhum capítulo disponível.');
        return;
    }

    leitorEstado.historiaId = historiaId;
    leitorEstado.capitulos = historia.capitulos;
    leitorEstado.capituloIndex = capituloIndex;
    leitorEstado.paginaIndex = 0;

    // Calcular total de páginas
    leitorEstado.totalPaginas = historia.capitulos.reduce((total, cap) => total + cap.paginas.length, 0);

    const readerTitle = document.getElementById('readerTitle');
    const sectionReader = document.getElementById('sectionReader');
    
    if (readerTitle) readerTitle.textContent = historia.titulo;
    if (sectionReader) {
        sectionReader.classList.add('active');
        sectionReader.scrollIntoView({ behavior: 'smooth' });
    }

    carregarPagina();
    atualizarBotoesCompra();
}

function carregarPagina() {
    const capitulo = leitorEstado.capitulos[leitorEstado.capituloIndex];
    const paginas = capitulo.paginas;
    const paginaAtual = leitorEstado.paginaIndex;

    const readerChapter = document.getElementById('readerChapter');
    const readerPageInfo = document.getElementById('readerPageInfo');
    const readerPages = document.getElementById('readerPages');

    if (readerChapter) readerChapter.textContent = `Capítulo ${capitulo.numero} - ${capitulo.titulo}`;
    if (readerPageInfo) readerPageInfo.textContent = `${paginaAtual + 1} / ${paginas.length}`;

    if (readerPages) {
        readerPages.innerHTML = `<img src="${paginas[paginaAtual]}" alt="Página ${paginaAtual + 1}" loading="lazy" onerror="this.src='data:image/svg+xml,%3Csvg xmlns=%22http://www.w3.org/2000/svg%22 width=%22800%22 height=%221200%22%3E%3Crect width=%22800%22 height=%221200%22 fill=%22%232A2A2A%22/%3E%3Ctext x=%2250%25%22 y=%2250%25%22 text-anchor=%22middle%22 fill=%22%234CAF50%22 font-size=%2224%22 font-family=%22serif%22%3EImagem não encontrada%3C/text%3E%3C/svg%3E'">`;
    }

    const isFirstPage = (leitorEstado.paginaIndex === 0 && leitorEstado.capituloIndex === 0);
    const isLastPage = (leitorEstado.paginaIndex === paginas.length - 1 && 
                        leitorEstado.capituloIndex === leitorEstado.capitulos.length - 1);

    const readerPrev = document.getElementById('readerPrev');
    const readerNext = document.getElementById('readerNext');
    
    if (readerPrev) readerPrev.disabled = isFirstPage;
    if (readerNext) readerNext.disabled = isLastPage;

    // Mostrar/esconder aba de compra
    const compraDiv = document.getElementById('readerCompra');
    if (compraDiv) {
        if (isLastPage) {
            compraDiv.style.display = 'block';
            setTimeout(() => {
                compraDiv.scrollIntoView({ behavior: 'smooth', block: 'center' });
            }, 300);
        } else {
            compraDiv.style.display = 'none';
        }
    }
}

function initReader() {
    const readerBack = document.getElementById('readerBack');
    const readerPrev = document.getElementById('readerPrev');
    const readerNext = document.getElementById('readerNext');

    if (readerBack) {
        readerBack.addEventListener('click', function() {
            const sectionReader = document.getElementById('sectionReader');
            if (sectionReader) sectionReader.classList.remove('active');
            document.getElementById('hero').scrollIntoView({ behavior: 'smooth' });
        });
    }

    if (readerPrev) {
        readerPrev.addEventListener('click', function() {
            if (leitorEstado.paginaIndex > 0) {
                leitorEstado.paginaIndex--;
            } else if (leitorEstado.capituloIndex > 0) {
                leitorEstado.capituloIndex--;
                const capitulo = leitorEstado.capitulos[leitorEstado.capituloIndex];
                leitorEstado.paginaIndex = capitulo.paginas.length - 1;
            }
            carregarPagina();
        });
    }

    if (readerNext) {
        readerNext.addEventListener('click', function() {
            const capitulo = leitorEstado.capitulos[leitorEstado.capituloIndex];
            if (leitorEstado.paginaIndex < capitulo.paginas.length - 1) {
                leitorEstado.paginaIndex++;
            } else if (leitorEstado.capituloIndex < leitorEstado.capitulos.length - 1) {
                leitorEstado.capituloIndex++;
                leitorEstado.paginaIndex = 0;
            }
            carregarPagina();
        });
    }

    document.addEventListener('keydown', function(e) {
        const sectionReader = document.getElementById('sectionReader');
        if (!sectionReader || !sectionReader.classList.contains('active')) return;
        if (e.key === 'ArrowLeft') {
            const btn = document.getElementById('readerPrev');
            if (btn && !btn.disabled) btn.click();
        }
        if (e.key === 'ArrowRight') {
            const btn = document.getElementById('readerNext');
            if (btn && !btn.disabled) btn.click();
        }
    });
}

// ================================================
// ABA DE COMPRA - FUNÇÃO ATUALIZADA
// ================================================
function abrirReserva(formato) {
    // Pega o título da história atual
    const historia = CONFIG.historias.find(h => h.id === leitorEstado.historiaId);
    const titulo = historia ? historia.titulo : 'História';
    
    // Fecha o leitor
    const sectionReader = document.getElementById('sectionReader');
    if (sectionReader) sectionReader.classList.remove('active');
    
    // Preenche o formulário automaticamente
    const storySelect = document.getElementById('reserveStory');
    const formatSelect = document.getElementById('reserveFormat');
    
    if (storySelect) {
        const options = storySelect.options;
        for (let i = 0; i < options.length; i++) {
            if (options[i].value.includes(titulo)) {
                storySelect.selectedIndex = i;
                break;
            }
        }
    }
    
    if (formatSelect) {
        const formatText = formato === 'A5' ? 'A5 (R$ 12,00)' : 'A6 (R$ 8,00)';
        const options = formatSelect.options;
        for (let i = 0; i < options.length; i++) {
            if (options[i].value.includes(formato)) {
                formatSelect.selectedIndex = i;
                break;
            }
        }
    }
    
    // Adiciona uma mensagem automática sobre a região
    const messageField = document.getElementById('reserveMessage');
    if (messageField) {
        const regiaoMsg = 'Moro na região de Fazenda Rio Grande/PR. Se for da região escolar, posso entregar pessoalmente. Se for de outro estado, envio via Correios.';
        messageField.value = `Quero reservar a versão ${formato} de "${titulo}". ${regiaoMsg}`;
    }
    
    // Rola para a seção de reserva
    document.getElementById('reservar').scrollIntoView({ behavior: 'smooth' });
    
    // Destaque visual
    const reserveCard = document.querySelector('.reserve-card');
    if (reserveCard) {
        reserveCard.style.borderColor = 'var(--accent-primary)';
        reserveCard.style.transition = 'border-color 0.3s ease';
        setTimeout(() => {
            reserveCard.style.borderColor = 'var(--border-color)';
        }, 3000);
    }
}

// ================================================
// FORMULÁRIOS
// ================================================
function initForms() {
    const reserveForm = document.getElementById('reserveForm');
    if (reserveForm) {
        reserveForm.addEventListener('submit', function(e) {
            e.preventDefault();
            const formData = new FormData(this);
            fetch(this.action, { method: 'POST', body: formData, headers: { 'Accept': 'application/json' } })
                .then(response => {
                    if (response.ok) {
                        const success = document.getElementById('reserveSuccess');
                        if (success) success.classList.add('show');
                        this.reset();
                        setTimeout(() => {
                            if (success) success.classList.remove('show');
                        }, 5000);
                    } else { alert('Erro ao enviar. Tente novamente.'); }
                }).catch(() => { alert('Erro ao enviar. Tente novamente.'); });
        });
    }

    const contactForm = document.getElementById('contactForm');
    if (contactForm) {
        contactForm.addEventListener('submit', function(e) {
            e.preventDefault();
            const formData = new FormData(this);
            fetch(this.action, { method: 'POST', body: formData, headers: { 'Accept': 'application/json' } })
                .then(response => {
                    if (response.ok) {
                        const success = document.getElementById('contactSuccess');
                        if (success) success.classList.add('show');
                        this.reset();
                        setTimeout(() => {
                            if (success) success.classList.remove('show');
                        }, 5000);
                    } else { alert('Erro ao enviar. Tente novamente.'); }
                }).catch(() => { alert('Erro ao enviar. Tente novamente.'); });
        });
    }
}

// ================================================
// NAVEGAÇÃO
// ================================================
function initNav() {
    const toggle = document.getElementById('navToggle');
    const menu = document.getElementById('navMenu');

    if (toggle && menu) {
        toggle.addEventListener('click', function() {
            menu.classList.toggle('active');
            this.classList.toggle('active');
        });

        document.querySelectorAll('.nav-link').forEach(link => {
            link.addEventListener('click', function() {
                menu.classList.remove('active');
                toggle.classList.remove('active');
            });
        });
    }

    window.addEventListener('scroll', function() {
        const navbar = document.getElementById('navbar');
        if (navbar) {
            navbar.classList.toggle('scrolled', window.scrollY > 50);
        }
    });
}

// ================================================
// TEMA
// ================================================
function initTheme() {
    const toggle = document.getElementById('themeToggle');
    const icon = document.getElementById('themeIcon');
    // A estética principal agora é clara e editorial; a opção noturna continua disponível.
    let theme = localStorage.getItem('nyex-theme') || 'light';

    function setTheme(t) {
        document.documentElement.setAttribute('data-theme', t);
        localStorage.setItem('nyex-theme', t);
        if (icon) icon.textContent = t === 'dark' ? '🌙' : '☀️';
        theme = t;
    }

    setTheme(theme);
    if (toggle) {
        toggle.addEventListener('click', () => setTheme(theme === 'dark' ? 'light' : 'dark'));
    }
}

// ================================================
// SCROLL REVEAL
// ================================================
function initScrollReveal() {
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(e => { if (e.isIntersecting) e.target.classList.add('visible'); });
    }, { threshold: 0.1 });
    document.querySelectorAll('.reveal').forEach(el => observer.observe(el));
}

// ================================================
// EXPOR FUNÇÕES GLOBAIS
// ================================================
window.abrirPrevia = abrirPrevia;
window.fecharPrevia = fecharPrevia;
window.abrirLeitor = abrirLeitor;
window.abrirReserva = abrirReserva;
