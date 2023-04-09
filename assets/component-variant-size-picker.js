window.onload = () => {
    let $ = jQuery;

    $('.variant_selector').each(function (index, element) {
        element = $(element);
        if (element.find('input[checked="checked"]').length === 0) {
            element.find('.add_to_cart').attr('disabled', 'disabled');
        }
    })

    $('.variant_selector input[type="radio"]').on("change", function (e) {
        const element = $(this);
        element.parents('.variant_selector').find('.add_to_cart').removeAttr("disabled");
    })

    $('.variant_selector.submit_on_click .size_variant_button').on("click", function (e) {
            const element = $(this);
            setTimeout(() => {
                element.parents("form").find('[type="submit"]').click()
            }, 100)
        }
    )

    $('.variant_modal__toggle_button').on("click", function (e) {
            const element = $(this);
            const modalId = element.data("modal-id");
            const modal = $(".variant_modal#" + modalId);
            const modalOverlay = $(".variant_modal_overlay#" + modalId + "-overlay");

            modal.show();
            modalOverlay.show()
            modalOverlay.on("click", () => {
                modal.hide()
                modalOverlay.hide()
            })
            modal.find('.quick_add_modal__close').on("click", () => {
                modal.hide()
                modalOverlay.hide()
            })
        }
    )


// $('.product_size_picker__form').submit((e) => {
//     e.preventDefault();
//     const checkedInput = $(e.currentTarget).find('input.product_size_picker__button:checked');
//     const variationId = checkedInput.val();
//     console.log(variationId)
//     // console.log(checkedInput, "VALALLAL", checkedInput.val(), e)
//     addProductToCart(variationId, 1).then((res) => {
//         alert("SUCCESS")
//     })
// })
}