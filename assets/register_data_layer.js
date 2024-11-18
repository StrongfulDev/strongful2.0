let customForm =
	document.querySelector("#create_customer_custom_form") ||
	document.querySelector("#create_customer_custom_loyalty_form");

if (customForm !== null) {
	customForm.addEventListener("submit", (e) => {
		e.preventDefault(); // Prevent immediate form submission

		window.dataLayer = window.dataLayer || [];
		window.dataLayer.push({
			event: "new_club_member",
		});

		// Delay form submission to allow GTM to process the event
		setTimeout(() => {
			customForm.submit();
		}, 500); // Adjust the delay as needed (500ms is usually sufficient)
	});
}

