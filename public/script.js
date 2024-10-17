document.getElementById('search-btn').addEventListener('click', function() {
    const query = document.getElementById('search-input').value;
    alert('You searched for: ' + query);
});

//slider container
let slideIndex = 0;

function showSlides() {
    const slides = document.querySelectorAll('.slide');
    if (slideIndex >= slides.length) {
        slideIndex = 0;
    } else if (slideIndex < 0) {
        slideIndex = slides.length - 1;
    }
    document.querySelector('.slider').style.transform = `translateX(${-slideIndex * 100}%)`;
}

function nextSlide() {
    slideIndex++;
    showSlides();
}

function prevSlide() {
    slideIndex--;
    showSlides();
}

document.addEventListener('DOMContentLoaded', () => {
    showSlides();
    setInterval(nextSlide, 5000); // Change slide every 5 seconds
});
