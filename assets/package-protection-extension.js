const extendPackageProtection = () => {
	const itemsContainer = document.querySelector(`[data-order-summary-section="line-items"]`);

	subscribe('PackageProtection/addToCard', (data) => {
		console.log('packageProtection/addToCart', data);
		const templateElement = itemsContainer.querySelector(".product").cloneNode(true);
		templateElement.querySelector(".product-thumbnail__image").src = data.product.image;
		templateElement.querySelector(".product__description__name").innerText = data.product.name;
		templateElement.querySelector(".product__description__variant").remove();
		templateElement.dataset.variantId = data.product.id.toString();
		templateElement.querySelector(".product__price .order-summary__emphasis").innerText = data.product.price;
		// templateElement.querySelectorAll(".product-thumbnail__quantity, .product__quantity:has( :not(.visually-hidden))").remove()
		itemsContainer.appendChild(templateElement);
	})

	subscribe('PackageProtection/removeFromCart', (data) => {
		console.log('packageProtection/removeFromCart', data);
		itemsContainer.querySelector(`[data-variant-id="${data.product.id}"]`).remove();
		// window.location = window.location;
	})
}

extendPackageProtection();