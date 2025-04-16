document.addEventListener("DOMContentLoaded", () => {
	const sliders = document.querySelectorAll("[data-slider]");
	sliders.forEach((slider) => {
		const prevButton = slider.querySelector(".slider-button--prev");
		const nextButton = slider.querySelector(".slider-button--next");
		const slides = slider.querySelectorAll(".slider__slide");
		let currentIndex = 0;

		const updateSlider = () => {
			slides.forEach((slide, index) => {
				slide.style.transform = `translateX(${(index - currentIndex) * 100}%)`;
			});
		};

		prevButton.addEventListener("click", () => {
			currentIndex = currentIndex > 0 ? currentIndex - 1 : slides.length - 1;
			updateSlider();
		});

		nextButton.addEventListener("click", () => {
			currentIndex = currentIndex < slides.length - 1 ? currentIndex + 1 : 0;
			updateSlider();
		});

		updateSlider();
	});
});
