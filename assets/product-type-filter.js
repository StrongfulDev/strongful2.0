document.addEventListener("DOMContentLoaded", () => {
	console.log("Product Type Filter JS Loaded"); // debug

	const typeFilterLinks = document.querySelectorAll(".product-type-filter .tops-menu-link");
	typeFilterLinks.forEach((link) => {
		link.addEventListener("click", (event) => {
			event.preventDefault();

			// debug
			console.log("Filter link clicked:", link.textContent);

			// Build a new URL based on the current page
			const currentUrl = new URL(window.location.href);
			const productType = link.textContent.trim();

			// Adjust the query parameters
			currentUrl.searchParams.set("filter.p.product_type", productType);
			currentUrl.searchParams.set("sort_by", "manual");

			const searchParamsString = currentUrl.searchParams.toString();
			FacetFiltersForm.renderPage(searchParamsString, event, true);
		});
	});
});
