
window.addEventListener('DOMContentLoaded', () => {
	let collapsibles = document.querySelectorAll('.product__accordion .accordion__content');
	for (let i = 0; i < collapsibles.length; i++) {
		let child = collapsibles[i].children;
		if (child.length === 0) {
			$(collapsibles[i]).parents(".product__accordion").remove();
		}
	}
});
