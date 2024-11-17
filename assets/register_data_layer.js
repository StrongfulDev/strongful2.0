let customForm =
	document.querySelector("#create_customer_custom_form") ||
	document.querySelector("#create_customer_custom_loyalty_form");

if (customForm !== null) {
	customForm.addEventListener("submit", (e) => {
		// Prevent form submission only if needed for async actions (like dataLayer push)
		e.preventDefault();

		// Ensure data is pushed to dataLayer first
		window.dataLayer = window.dataLayer || [];
		window.dataLayer.push({
			event: "new_club_member",
		});

		// Submit the form after pushing dataLayer
		setTimeout(() => {
			customForm.submit(); // Manually submit the form after the dataLayer push
		}, 100); // Small delay to ensure data is pushed before form submission
	});
}
