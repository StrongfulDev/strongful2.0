
    window.addEventListener('DOMContentLoaded', () => {

	    const slides = document.querySelectorAll('.announcement-bar');
	    let currentIndex = 0;

	    function showSlide(index) {
		    slides.forEach((slide, i) => {
			    slide.classList.toggle('active', i === index);
		    });
	    }

	    function nextSlide() {
		    currentIndex = (currentIndex + 1) % slides.length;
		    showSlide(currentIndex);
	    }

	    if (window.screen.width < 990) {
				setInterval(nextSlide, 5000);
	    }
    });
