let currentIndex = 0;
const sliderContainer = document.querySelector('.slider-container');
const slides = document.querySelectorAll('.slide');
const sliderDots = document.querySelector('.slider-dots');
let autoSlideInterval;

// Function to update the slider's position
function updateSlider() {
    sliderContainer.style.transform = `translateX(-${currentIndex * 100}%)`;
    updateDots();
}

// Function to go to the next slide
function nextSlide() {
    currentIndex = (currentIndex + 1) % slides.length;
    updateSlider();
}

// Function to go to the previous slide
function prevSlide() {
    currentIndex = (currentIndex - 1 + slides.length) % slides.length;
    updateSlider();
}

// Create and initialize dots
function createDots() {
    slides.forEach((_, index) => {
        const dot = document.createElement('button');
        dot.addEventListener('click', () => {
            currentIndex = index;
            updateSlider();
            restartAutoSlide();
        });
        sliderDots.appendChild(dot);
    });
}

// Update active dot
function updateDots() {
    const dots = sliderDots.querySelectorAll('button');
    dots.forEach((dot, index) => {
        dot.classList.toggle('active', index === currentIndex);
    });
}

// Start automatic slide movement
function startAutoSlide() {
    autoSlideInterval = setInterval(nextSlide, 5000); // Change slide every 5 seconds
}

// Stop automatic slide movement (e.g., when user interacts with controls)
function stopAutoSlide() {
    clearInterval(autoSlideInterval);
}

// Restart the auto-slide movement after user interaction
function restartAutoSlide() {
    stopAutoSlide();
    startAutoSlide();
}

// Event listeners for manual controls
document.querySelector('.controls button:first-child').addEventListener('click', () => {
    prevSlide();
    restartAutoSlide();
});

document.querySelector('.controls button:last-child').addEventListener('click', () => {
    nextSlide();
    restartAutoSlide();
});

// Initialize the slider and dots
createDots();
updateDots();
startAutoSlide();
