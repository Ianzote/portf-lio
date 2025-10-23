// ===============================
// SLIDER PRINCIPAL (imagens)
// ===============================

// Seleciona elementos
const items = document.querySelectorAll('.slider .list .item');
const thumbs = document.querySelectorAll('.thumbnail .item');
const next = document.getElementById('next');
const prev = document.getElementById('prev');

let current = 0; // índice do slide atual
let slideInterval = setInterval(autoSlide, 9800); // slide automático
let isPaused = false; // controla se o slide está pausado

// Mostra o slide e thumbnail corretos
function showSlide(index) {
    items.forEach((item, i) => item.classList.toggle('active', i === index));
    thumbs.forEach((thumb, i) => thumb.classList.toggle('active', i === index));
    current = index;
}

// Próximo e anterior slide
function nextSlide() {
    showSlide((current + 1) % items.length);
}

function prevSlide() {
    showSlide((current - 1 + items.length) % items.length);
}

// Slide automático
function autoSlide() {
    if (!isPaused) {
        nextSlide();
    }
}

// Pausar e reiniciar o slide automático
function pauseSlide() {
    isPaused = true;
    clearInterval(slideInterval);
}

function restartSlide() {
    if (isPaused) {
        isPaused = false;
        slideInterval = setInterval(autoSlide, 3000);
    }
}

// Eventos de clique nas setas
next.addEventListener('click', () => {
    nextSlide();
    pauseSlide();
});

prev.addEventListener('click', () => {
    prevSlide();
    pauseSlide();
});

// Eventos de clique nas miniaturas
thumbs.forEach((thumb, i) => {
    thumb.addEventListener('click', () => {
        showSlide(i);
        pauseSlide();
    });
});

// Reinicia o slide quando o usuário rolar a página
window.addEventListener('scroll', () => {
    restartSlide();
});

// Espera o DOM (HTML e CSS) carregar completamente
// ===============================
// SLIDER DE PROJETOS (cards horizontais) - VERSÃO CORRIGIDA
// ===============================

document.addEventListener('DOMContentLoaded', () => {

    // --- 1. SELECIONA OS ELEMENTOS ---
    const slider2 = document.querySelector('.slider2');
    const grid = document.querySelector('.grid2');
    const cards = document.querySelectorAll('.card2');

    // Verificação para evitar erros se os elementos não existirem
    if (!slider2 || !grid || cards.length === 0) {
        console.warn('Elementos do slider de projetos não foram encontrados.');
        return; 
    }

    let index2 = 0;
    const totalCards = cards.length;
    const gap = 20; // Deve ser o mesmo 'gap' do seu CSS
    
    // Pega a largura real do card SÓ DEPOIS que a página carregou
    const cardWidth = cards[0].offsetWidth;
    // Pega o offset inicial que você definiu
    const initialOffset = 70; 

    // --- 2. CRIA OS BOTÕES ---
    const prev2 = document.createElement('button');
    prev2.id = 'prev2';
    prev2.className = 'arrow'; 
    prev2.innerHTML = '&#10094;'; // Seta esquerda

    const next2 = document.createElement('button');
    next2.id = 'next2';
    next2.className = 'arrow'; 
    next2.innerHTML = '&#10095;'; // Seta direita

    // --- 3. ADICIONA OS BOTÕES AO SLIDER ---
    slider2.style.position = 'relative'; // Garante que o slider possa posicionar os botões
    slider2.appendChild(prev2);
    slider2.appendChild(next2);

    // --- 4. FUNÇÃO PARA ATUALIZAR A POSIÇÃO ---
    function updateProjectSlide() {
        // *** CORREÇÃO APLICADA AQUI ***
        // Usando a variável 'cardWidth' que já foi lida, em vez de 'cards[0].offsetWidth'
        const offset = -index2 * (cardWidth + gap) + initialOffset;
        grid.style.transform = `translateX(${offset}px)`;
    }
    
    updateProjectSlide(); // Posição inicial

    // --- 5. ESTILIZA OS BOTÕES (Via JS) ---
    const buttonStyles = `
        position: absolute;
        top: 50%;
        transform: translateY(-50%);
        z-index: 100;
        background: rgba(232, 73, 29, 0.8);
        color: white;
        border: none;
        width: 50px;
        height: 50px;
        border-radius: 50%;
        cursor: pointer;
        font-size: 2rem;
        transition: background 0.3s ease;
    `;
    
    prev2.style.cssText = buttonStyles + `left: 10px;`;
    next2.style.cssText = buttonStyles + `right: 10px;`;

    // Efeito hover simples
    [prev2, next2].forEach(btn => {
        btn.addEventListener('mouseenter', () => btn.style.background = 'rgba(232, 73, 29, 1)');
        btn.addEventListener('mouseleave', () => btn.style.background = 'rgba(232, 73, 29, 0.8)');
    });


    // --- 6. EVENTOS DE CLIQUE NOS BOTÕES ---
    next2.addEventListener('click', () => {
        if (index2 < totalCards - 1) { // Se não for o último
            index2++; // Avança
            updateProjectSlide();
        }
    });

    prev2.addEventListener('click', () => {
        if (index2 > 0) { // Se não for o primeiro
            index2--; // Volta
            updateProjectSlide();
        }
    });

    // --- 7. SLIDE AUTOMÁTICO ---
    // Função para avançar (para não repetir código)
    function autoNextSlide() {
        if (index2 < totalCards - 1) {
            index2++;
        } else {
            index2 = 0; // Volta ao início
        }
        updateProjectSlide();
    }

    let projectInterval = setInterval(autoNextSlide, 7000);

    // --- 8. PAUSA AO PASSAR O MOUSE ---
    slider2.addEventListener('mouseenter', () => {
        clearInterval(projectInterval);
    });

    slider2.addEventListener('mouseleave', () => {
       projectInterval = setInterval(autoNextSlide, 7000);
    });


// Seleciona todos os cards sem link
const noLinkCards = document.querySelectorAll('.card2.no-link');
const lightbox = document.getElementById('lightbox-overlay');
const lightboxImg = document.getElementById('lightbox-img');
const lightboxClose = document.getElementById('lightbox-close');
const prevBtn = document.getElementById('lightbox-prev');
const nextBtn = document.getElementById('lightbox-next');

let currentImages = [];
let currentIndex = 0;

noLinkCards.forEach(card => {
    card.addEventListener('click', () => {
        // Pega as imagens do dataset
        if(!card.dataset.img) return; // se não houver dataset, ignora
        const images = card.dataset.img.split(',');
        currentImages = images;
        currentIndex = 0;
        if(currentImages.length > 0){
            lightboxImg.src = currentImages[currentIndex];
            lightbox.classList.add('active');
        }
    });
});

nextBtn.addEventListener('click', () => {
    if(currentImages.length > 0){
        currentIndex = (currentIndex + 1) % currentImages.length;
        lightboxImg.src = currentImages[currentIndex];
    }
});

prevBtn.addEventListener('click', () => {
    if(currentImages.length > 0){
        currentIndex = (currentIndex - 1 + currentImages.length) % currentImages.length;
        lightboxImg.src = currentImages[currentIndex];
    }
});

lightboxClose.addEventListener('click', () => {
    lightbox.classList.remove('active');
});

lightbox.addEventListener('click', (e) => {
    if(e.target === lightbox){
        lightbox.classList.remove('active');
    }
});



});