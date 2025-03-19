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
