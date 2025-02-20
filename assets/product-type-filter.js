document.addEventListener("DOMContentLoaded", () => {
	// Delegated click handler for filter links
	document.addEventListener("click", (event) => {
		const link = event.target.closest(".product-type-filter .tops-menu-link");
		if (!link) return; // not a filter link, ignore

		event.preventDefault();
		console.log("Filter link clicked:", link.dataset.productType);

		// Use the current URL to preserve all filters
		const currentUrl = new URL(window.location.href);
		const productType = link.textContent.trim();
		console.log("Product Type:", productType);

		// Get all current filter values
		const existingFilters = currentUrl.searchParams.getAll("filter.p.product_type");

		if (existingFilters.includes(productType)) {
			// Remove this filter only, leaving others intact
			const newFilters = existingFilters.filter((filter) => filter !== productType);
			currentUrl.searchParams.delete("filter.p.product_type");
			newFilters.forEach((filter) => currentUrl.searchParams.append("filter.p.product_type", filter));
			link.classList.remove("active");
		} else {
			// Add the new filter to the existing ones
			currentUrl.searchParams.append("filter.p.product_type", productType);
			link.classList.add("active");
		}

		// Ensure sort_by is maintained
		currentUrl.searchParams.set("sort_by", "manual");

		// Push the updated URL state so that the full set of filters persists
		window.history.pushState({}, "", currentUrl.toString());

		const searchParamsString = currentUrl.searchParams.toString();

		// Call renderPage so it works with the complete filter set
		FacetFiltersForm.renderPage(searchParamsString, event, true);

		// Use MutationObserver to wait until the products re-render before updating active state
		const targetNode = document.querySelector("#ProductGridContainer");
		if (targetNode) {
			const observer = new MutationObserver(() => {
				setTimeout(() => {
					updateActiveState();
					observer.disconnect(); // Disconnect after update
				}, 300); // 100ms delay; adjust as needed
			});
			observer.observe(targetNode, { childList: true, subtree: true });
		} else {
			// Fallback in case re-render container isn't found yet
			requestAnimationFrame(updateActiveState);
		}
	});

	// Function to update the active state of filter links based on current URL
	function updateActiveState() {
		const currentUrl = new URL(window.location.href);
		const existingFilters = currentUrl.searchParams.getAll("filter.p.product_type");
		const links = document.querySelectorAll(".product-type-filter .tops-menu-link");
		links.forEach((link) => {
			// Use textContent.trim() instead of dataset.productType
			const productType = link.textContent.trim();
			if (existingFilters.includes(productType)) {
				link.classList.add("active");
				console.log("Adding active class to:", productType);
			} else {
				link.classList.remove("active");
			}
		});
	}

	// Initial active state update on page load
	updateActiveState();
});
