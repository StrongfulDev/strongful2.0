
window.addEventListener('DOMContentLoaded', () => {


	const similarVendors = document.querySelectorAll('.productVendor');
	const productVendorText = document.querySelector('.product__title').dataset.productColor;
	similarVendors.forEach((vendor) => {
		if (vendor.textContent === productVendorText) {
			vendor.closest(".similiar-child").classList.add("first-similar-item");
		}
	});
});
