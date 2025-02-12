//// filepath: /Users/ishaymac/Downloads/Strongful/strongful2.0/assets/card-product-variant-switcher.js
document.addEventListener("DOMContentLoaded", function () {
	// Loop over each product card
	document.querySelectorAll(".product-card-wrapper").forEach(function (card) {
		var swatches = card.querySelectorAll(".card-color-swatches label.swatch");
		if (!swatches.length) return;

		swatches.forEach(function (swatch) {
			swatch.addEventListener("click", function () {
				// Mark clicked swatch as active and remove active on siblings.
				swatches.forEach(function (el) {
					el.classList.remove("active");
				});
				swatch.classList.add("active");

				// Read the variant id and new image from swatch's data attributes.
				var variantId = swatch.getAttribute("data-variant-id");
				var variantImage = swatch.getAttribute("data-variant-image");

				// Update the hidden input for the variant (if present).
				var hiddenInput = card.querySelector('input[name="id"]');
				if (hiddenInput && variantId) {
					hiddenInput.value = variantId;
				}

				// Update the main card image.
				var mainImg = card.querySelector(".card__media img");
				if (mainImg && variantImage) {
					mainImg.src = variantImage;
					// Optionally update srcset or sizes if needed.
				}

				// Optionally change text such as color name or quick add attributes.
				var colorNameElem = card.querySelector(".card__color-name");
				if (colorNameElem) {
					colorNameElem.textContent = swatch.getAttribute("data-variant-color");
				}
			});
		});
	});
});
