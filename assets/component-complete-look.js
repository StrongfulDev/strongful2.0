window.onload = () => {
    let $ = jQuery;

    $('.variant_selector').each(function (index, element) {
        element = $(element);
        if (element.find('input[checked="checked"]').length === 0) {
            element.find('.add_to_cart').attr('disabled', 'disabled');
        }
    })

    $('.variant_selector input[type="radio"]').on("change", function (elem) {
        const element = $(this);
        element.parents('.variant_selector').find('.add_to_cart').removeAttr("disabled");
    })
}
