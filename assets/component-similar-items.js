
window.addEventListener('DOMContentLoaded', () => {
	const similarVendors = document.querySelectorAll('.productVendor');
	const productVendorText = document.querySelector('.product-vendor').innerText;
	similarVendors.forEach((vendor) => {
		if (vendor.textContent === productVendorText) {
			vendor.closest(".similiar-child").classList.add("first-similar-item");
		}
	});
});
