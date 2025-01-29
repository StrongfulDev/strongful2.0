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
				const existingFilters = currentUrl.searchParams.getAll("filter.p.product_type");
				if (existingFilters.includes(productType)) {
					// Remove the filter
					const newFilters = existingFilters.filter((filter) => filter !== productType);
					currentUrl.searchParams.delete("filter.p.product_type");
					newFilters.forEach((filter) => currentUrl.searchParams.append("filter.p.product_type", filter));
					link.classList.remove("active"); // Remove active class
				} else {
					// Add the filter
					currentUrl.searchParams.append("filter.p.product_type", productType);
					link.classList.add("active"); // Add active class
				}
				currentUrl.searchParams.set("sort_by", "manual");

				const searchParamsString = currentUrl.searchParams.toString();
				FacetFiltersForm.renderPage(searchParamsString, event, true);

				// Update the active state of the links
				updateActiveState();
			});
		});

		// Function to update the active state of the links
		function updateActiveState() {
			const currentUrl = new URL(window.location.href);
			const existingFilters = currentUrl.searchParams.getAll("filter.p.product_type");
			typeFilterLinks.forEach((link) => {
				const productType = link.textContent.trim();
				if (existingFilters.includes(productType)) {
					link.classList.add("active");
					console.log("Adding active class to:", link.classList);
				} else {
					link.classList.remove("active");
				}
			});
		}

		// Initial update of the active state
		updateActiveState();
});
