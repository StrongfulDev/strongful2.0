document.addEventListener("DOMContentLoaded", () => {
	function updateFullWidthSlider() {
		const vpWidth = window.innerWidth;
		document.querySelectorAll(".full-width-slider").forEach((slider) => {
			if (vpWidth < 750) {
				// Force full bleed by setting width to viewport width
				slider.style.position = "absolute";
				slider.style.left = "50%";
				slider.style.transform = "translateX(-50%)";
				slider.style.width = vpWidth + "px";
			} else {
				// Reset styles on wider viewports
				slider.style.position = "";
				slider.style.left = "";
				slider.style.transform = "";
				slider.style.width = "";
			}
		});
	}
	updateFullWidthSlider();
	window.addEventListener("resize", updateFullWidthSlider);
});

document.addEventListener("DOMContentLoaded", function () {
	const sliderContainer = document.querySelector(".product__media-list");
	const slides = document.querySelectorAll(".product__media-list .slider__slide");

	if (!sliderContainer || slides.length === 0) return;

	const observerOptions = {
		root: sliderContainer,
		threshold: 0.5, // adjust so that the slide in the center reaches 50% visibility
	};

	const observerCallback = (entries) => {
		entries.forEach((entry) => {
			// When a slide is at least 50% visible, mark it as active
			if (entry.isIntersecting) {
				slides.forEach((slide) => slide.classList.remove("is-active"));
				entry.target.classList.add("is-active");

				// Optionally update a slide counter, etc.
			}
		});
	};

	const observer = new IntersectionObserver(observerCallback, observerOptions);
	slides.forEach((slide) => observer.observe(slide));
});
