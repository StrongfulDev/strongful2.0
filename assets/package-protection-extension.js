const extendPackageProtection = () => {
	const itemsContainer = document.querySelector(`[data-order-summary-section="line-items"]`);

	subscribe('PackageProtection/addToCard', (data) => {
		window.location.reload();
		const templateElement = itemsContainer.querySelector(".product").cloneNode(true);
		console.log(data);
		console.log(data.product);
		templateElement.querySelector(".product-thumbnail__image").src = data.product.image.replace("https:", "");
		templateElement.querySelector(".product__description__name").innerText = data.product.title;
		templateElement.querySelector(".product__description__variant").remove();
		templateElement.dataset.variantId = data.product.id.toString();
		templateElement.querySelector(".product__price .order-summary__emphasis").innerText = "₪" + parseFloat(data.product.price / 100);
		itemsContainer.appendChild(templateElement);
	})

	subscribe('PackageProtection/removeFromCart', (data) => {
		itemsContainer.querySelector(`[data-variant-id="${data.product.id}"]`).remove();
		window.location.reload();
	})
}

extendPackageProtection();