
const customForm = document.querySelector('#create_customer_custom_form');

console.log(customForm);
customForm.addEventListener('submit', (e) => {
	e.preventDefault();

	window.dataLayer = window.dataLayer || [];
	window.dataLayer.push({
		'event': 'new_club_member'
	});
});