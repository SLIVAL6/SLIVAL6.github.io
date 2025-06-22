const track = document.querySelector('.carousel-track');
const items = document.querySelectorAll('.carousel-item');
const dotsContainer = document.getElementById('carousel-dots');
const prevBtn = document.getElementById('prev');
const nextBtn = document.getElementById('next');

let currentIndex = 0;
let interval;

function updateCarousel() {
  const width = items[0].clientWidth;
  track.style.transform = `translateX(-${currentIndex * width}px)`;

  document.querySelectorAll('.carousel-dots span').forEach((dot, index) => {
    dot.classList.toggle('active', index === currentIndex);
  });
}

function createDots() {
  for (let i = 0; i < items.length; i++) {
    const dot = document.createElement('span');
    if (i === 0) dot.classList.add('active');
    dot.addEventListener('click', () => {
      currentIndex = i;
      updateCarousel();
      resetAutoplay();
    });
    dotsContainer.appendChild(dot);
  }
}

function prevSlide() {
  currentIndex = (currentIndex - 1 + items.length) % items.length;
  updateCarousel();
  resetAutoplay();
}

function nextSlide() {
  currentIndex = (currentIndex + 1) % items.length;
  updateCarousel();
  resetAutoplay();
}

function resetAutoplay() {
  clearInterval(interval);
  interval = setInterval(nextSlide, 5000);
}

prevBtn.addEventListener('click', prevSlide);
nextBtn.addEventListener('click', nextSlide);

createDots();
updateCarousel();
interval = setInterval(nextSlide, 5000);

function copyToClipboard(id, event) {
  const text = document.getElementById(id).textContent;
  navigator.clipboard.writeText(text).then(() => {
    const popup = document.getElementById('copy-popup');
    popup.style.left = `${event.clientX}px`;
    popup.style.top = `${event.clientY - 30}px`;
    popup.style.opacity = '1';
    popup.style.transform = 'translate(-50%, -50%) scale(1)';

    setTimeout(() => {
      popup.style.opacity = '0';
      popup.style.transform = 'translate(-50%, -50%) scale(0.95)';
    }, 1200);
  });
}
