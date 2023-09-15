window.addEventListener('DOMContentLoaded', function(event) {
	$('.variant_selector').each(function (index, element) {
		element = $(element);
		if (element.find('input[checked="checked"]').length === 0) {
			// element.find('.add_to_cart').attr('disabled', 'disabled');
		}
	})

	$('.product_size_picker__button.default_input').parents('.variant_selector').find('.add_to_cart').removeAttr("disabled");

	$('.variant_selector input[type="radio"]').on("change", function (e) {
		// $(this).parents('.variant_selector').find('.add_to_cart').removeAttr("disabled");
	})

	function closeModal(element, elementOverlay) {
		element.removeClass("active");
		setTimeout(() => {
			element.hide();
		}, 500);
		element.parents("section").removeClass('high-z-index');
		elementOverlay.hide()
	}

	$("body")
		.on("click", '.variant_selector.submit_on_click .size_variant_button:not(.disabled-variant-button)', function (e) {
			let modal = $(".variant_modal") || $(".variant_selector");
			let modalOverlay = $(".variant_modal_overlay");
				$(this).find(".size_variant_button_add").hide();
				$(this).find(".loading-overlay").css("display", "flex");
				$(this).siblings().find(".loading-overlay").css("display", "none");
				$(this).find(".loading-overlay__spinner").removeClass("hidden");
				setTimeout(() => {
					$(this).parents("form").find('[type="submit"]').click();
				}, 500);
				setTimeout(() => {
					$(this).find(".loading-overlay").css("display", "none");
					$(this).find(".loading-overlay__spinner").addClass("hidden");
					$(this).find(".icon-checkmark").show();
				}, 1000);
				setTimeout(() => {
					$(this).find(".icon-checkmark").hide();
					$(this).find(".size_variant_button_add").show();
					closeModal(modal, modalOverlay);
				}, 2000);
		})
		.on("click", ".variant_modal__toggle_button, .variant_modal__toggle_button svg", openModal)
	$("cart-drawer .card__inner").click(openModal);

	function openModal(e) {
		let modalId = $(this).data("modal-id") || $(this).find(".variant_modal__toggle_button").data("modal-id");
		let modal = $(".variant_modal#" + modalId) || $(".variant_selector#" + modalId);
		let modalOverlay = $(".variant_modal_overlay#" + modalId + "-overlay");

		modal.show();
		setTimeout(() => {
			modal.addClass("active");
			modal.parents("section").addClass('high-z-index');
		}, 10);
		modalOverlay.show();
		modalOverlay.on("click", () => {
			closeModal(modal, modalOverlay);
		})
		modal.find('.quick_add_modal__close').on("click", () => {
			closeModal(modal, modalOverlay);
		});
	}
});