
let customForm = document.querySelector('#create_customer_custom_form') || document.querySelector('#create_customer_custom_loyalty_form');

if (customForm !== null) {
	customForm.addEventListener('submit', (e) => {
		e.preventDefault();

		window.dataLayer = window.dataLayer || [];
		window.dataLayer.push({
			'event': 'new_club_member'
		});
		customForm.submit();
	});
}
