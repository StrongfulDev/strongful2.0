async function addProductToCart(productId, quantity) {
    try {
        let formData = {
            items: [{
                id: productId,
                quantity
            }]
        };

        const response = await fetch(window.Shopify.routes.root + 'cart/add.js', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(formData)
        });

        const responseJson = await response.json();

        publish('product:add_to_cart:success', responseJson);

        return responseJson;
    } catch (e) {
        publish('product:add_to_cart:fail', e.message);
        return e;
    }
}