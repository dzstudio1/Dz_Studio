/**
 * ============================================
 * OBRASDATA.JS – DADOS DAS OBRAS
 * ============================================
 * Caminhos das imagens: assets/images/obras/
 * Se as imagens não existirem, um placeholder será exibido
 */

export const obras = [
    {
        id: 'entre-tempos',
        titulo: 'ENTRE TEMPOS',
        categoria: ['Drama', 'Romance', 'Slice of Life'],
        status: 'Em andamento',
        statusClass: '',
        cor: '#D96C92',
        capa: 'assets/images/obras/entre-tempos.jpg',
        banner: 'assets/images/obras/entre-tempos-banner.jpg',
        sinopse: 'Uma história sobre encontros e desencontros, onde o tempo parece sempre estar contra dois corações que insistem em se encontrar. Entre idas e vindas, memórias e promessas, cada página revela que o amor não cabe em relógios.',
        autor: 'Daniel',
        ano: 2025,
        capitulos: [
            { titulo: 'Capítulo 1', disponivel: true },
            { titulo: 'Capítulo 2', disponivel: true },
            { titulo: 'Capítulo 3', disponivel: true },
        ],
        reserva: {
            tiragem: 15,
            reservados: 6,
        },
    },
    {
        id: 'nos',
        titulo: 'NÓS',
        categoria: ['One Shot', 'Drama', 'Romance'],
        status: 'Completo',
        statusClass: 'card-obra__status--gold',
        cor: '#E8DCD0',
        capa: 'assets/images/obras/nos.jpg',
        banner: 'assets/images/obras/nos-banner.jpg',
        sinopse: 'Nós é uma história sobre dois estranhos que se encontram em uma noite chuvosa e, sem saber, mudam para sempre a trajetória um do outro. Uma reflexão sobre conexões efêmeras e o peso das escolhas.',
        autor: 'Daniel',
        ano: 2024,
        capitulos: [],
        reserva: {
            tiragem: 10,
            reservados: 4,
        },
    },
];

export function getObraById(id) {
    return obras.find(obra => obra.id === id);
}