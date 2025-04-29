let currentIndex = 0;
const sliderContainer = document.querySelector('.slider-container');
const slides = document.querySelectorAll('.slide');
let autoSlideInterval;

function updateSlider() {
    sliderContainer.style.transform = `translateX(-${currentIndex * 100}%)`;
}

// Function to go to the next slide
function nextSlide() {
    if (currentIndex < slides.length - 1) {
        currentIndex++;
    } else {
        currentIndex = 0;
    }
    updateSlider();
}

// Function to go to the previous slide
function prevSlide() {
    if (currentIndex > 0) {
        currentIndex--;
    } else {
        currentIndex = slides.length - 1;
    }
    updateSlider();
}

// Start automatic slide movement
function startAutoSlide() {
    autoSlideInterval = setInterval(() => {
        nextSlide();
    }, 5000); // Change slide every 5 seconds
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

// Initialize the slider
updateSlider();
startAutoSlide();