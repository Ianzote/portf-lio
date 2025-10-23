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


// ===============================
// SLIDER DE PROJETOS (cards horizontais)
// ===============================

const grid = document.querySelector('.grid2');
const cards = document.querySelectorAll('.card2');
const next2 = document.getElementById('next2');
const prev2 = document.getElementById('prev2');

let index2 = 0;
const totalCards = cards.length;

// Atualiza o slide horizontal
function updateProjectSlide() {
    const offset = -index2 * (cards[0].offsetWidth + 20); // 20 = gap
    grid.style.transform = `translateX(${offset}px)`;
}

// Próximo e anterior
function nextProjectSlide() {
    index2 = (index2 + 1) % totalCards;
    updateProjectSlide();
}

function prevProjectSlide() {
    index2 = (index2 - 1 + totalCards) % totalCards;
    updateProjectSlide();
}

// Botões
next2.addEventListener('click', () => {
    prevProjectSlide();
    resetProjectAuto();
});

prev2.addEventListener('click', () => {
    nextProjectSlide();
    resetProjectAuto();
});

// Slide automático dos projetos
function autoProjectSlide() {
    index2 = (index2 + 1) % totalCards;
    updateProjectSlide();
}

let projectInterval = setInterval(autoProjectSlide, 5000);

// Reinicia o slide dos projetos após interação
function resetProjectAuto() {
    clearInterval(projectInterval);
    projectInterval = setInterval(autoProjectSlide, 6000);
}

// Pausa o slide ao passar o mouse
grid.addEventListener('mouseenter', () => clearInterval(projectInterval));
grid.addEventListener('mouseleave', resetProjectAuto);
