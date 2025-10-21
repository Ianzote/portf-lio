const items = document.querySelectorAll('.slider .list .item');
const thumbs = document.querySelectorAll('.thumbnail .item');
const next = document.getElementById('next');
const prev = document.getElementById('prev');

let current = 0;

function showSlide(index) {
    items.forEach((item, i) => item.classList.toggle('active', i === index));
    thumbs.forEach((thumb, i) => thumb.classList.toggle('active', i === index));
    current = index;
}

next.addEventListener('click', () => showSlide((current + 1) % items.length));
prev.addEventListener('click', () => showSlide((current - 1 + items.length) % items.length));

thumbs.forEach((thumb, i) => {
    thumb.addEventListener('click', () => showSlide(i));
});
