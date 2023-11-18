
window.addEventListener('DOMContentLoaded', () => {
	setTimeout(() => {
		const accordions = document.querySelectorAll('.product__accordion .accordion__content');
		for (let i = 0; i < accordions.length; i++) {
			let accordion = accordions[i];
			let accordionHeight = accordions[i].clientHeight;
			if (accordionHeight === 0) {
				accordion.parentElement.parentElement.remove();
			}
		}
	}, 1000);
});
