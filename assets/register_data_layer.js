let customForm =
	document.querySelector("#create_customer_custom_form") ||
	document.querySelector("#create_customer_custom_loyalty_form");

if (customForm !== null) {
	customForm.addEventListener("submit", (e) => {
		// Push the dataLayer event first, no preventDefault for normal behavior
		window.dataLayer = window.dataLayer || [];
		window.dataLayer.push({
			event: "new_club_member",
		});

		// Optional - Delay the execution slightly for GTM sync
		// Allow form to process naturally after dataLayer push
	});
}
