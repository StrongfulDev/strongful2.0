document.addEventListener("DOMContentLoaded", function() {

	const currentPageTitle = document.querySelector(".rich-text__blocks.center h1").textContent;
	const blocks = document.querySelectorAll(".custom-link-grid-item");
	blocks.forEach(function(block) {
		const blockTitle = block.querySelector("h4").textContent;
		if (blockTitle === currentPageTitle) {
			block.classList.add("active");
		}
	});
});