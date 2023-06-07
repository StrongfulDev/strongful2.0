function quickAdd() {
  let $ = jQuery;

  $('.variant_selector').each(function (index, element) {
    element = $(element);
    if (element.find('input[checked="checked"]').length === 0) {
      element.find('.add_to_cart').attr('disabled', 'disabled');
    }
  })

  $('.product_size_picker__button.default_input').parents('.variant_selector').find('.add_to_cart').removeAttr("disabled");

  $('.variant_selector input[type="radio"]').on("change", function (e) {
    const element = $(this);
    element.parents('.variant_selector').find('.add_to_cart').removeAttr("disabled");
  })

  $("#MainContent")
    .on("click", '.variant_selector.submit_on_click .size_variant_button:not(.disabled-variant-button)', function (e) {
      const element = $(this);
			let productPageIdentifier = document.querySelector(".products-product-size-picker");
	    if (productPageIdentifier !== null) {
				const variantButtons = document.querySelectorAll("variant-radios .product-form__input input[type='radio']");
				if (variantButtons.length === 0) {
					setTimeout(() => {
						$(".sticky-cart-cta .variant_selector").toggle();
						$(".sticky-cart-cta-overlay").toggle();
						$(".similiar").siblings("div").find("button.product-form__submit.button.button--full-width.button--primary span").click();
					}, 2000);
				} else {
					const elementText = element.find("span").first().text().replace(/\s/g,'').slice(0, -27);
					for (let i = 0; i < variantButtons.length; i++) {
						let actualVariantId = $(variantButtons[i]).data("variant-id");
						let relatedProductVariantId = element.find('input').data("variant-id");
						if (relatedProductVariantId !== actualVariantId) {
							element.find(".size_variant_button_add").hide();
							element.find(".loading-overlay").css("display", "flex");
							element.find(".loading-overlay__spinner").removeClass("hidden");
							setTimeout(() => {
								element.parents("form").find('[type="submit"]').click();
							}, 500);
							setTimeout(() => {
								element.find(".loading-overlay").css("display", "none");
								element.find(".loading-overlay__spinner").addClass("hidden");
								element.find(".icon-checkmark").show();
							}, 1000);
							setTimeout(() => {
								element.find(".icon-checkmark").hide();
								element.find(".size_variant_button_add").show();
							}, 3500);
							break;
						} else {
							if (variantButtons[i].value === elementText) {
								variantButtons[i].click();
								element.find(".size_variant_button_add").hide();
								element.find(".loading-overlay").css("display", "flex");
								element.find(".loading-overlay__spinner").removeClass("hidden");
								setTimeout(() => {
									element.parents("form").find('[type="submit"]').click();
								}, 500);
								setTimeout(() => {
									element.find(".loading-overlay").css("display", "none");
									element.find(".loading-overlay__spinner").addClass("hidden");
									element.find(".icon-checkmark").show();
								}, 1000);
								setTimeout(() => {
									element.find(".icon-checkmark").hide();
									element.find(".size_variant_button_add").show();
								}, 3500);
								setTimeout(() => {
									$(".sticky-cart-cta .variant_selector").toggle();
									$(".sticky-cart-cta-overlay").toggle();
									$("variant-radios").siblings("div").find("button.product-form__submit.button.button--full-width.button--primary span").click();
								}, 2000);
								break;
							}
						}
					}
				}
	    } else {
		    element.find(".size_variant_button_add").hide();
				element.find(".loading-overlay").css("display", "flex");
		    element.find(".loading-overlay__spinner").removeClass("hidden");
		    setTimeout(() => {
			    element.parents("form").find('[type="submit"]').click();
		    }, 500);
		    setTimeout(() => {
			    element.find(".loading-overlay").css("display", "none");
			    element.find(".loading-overlay__spinner").addClass("hidden");
			    element.find(".icon-checkmark").show();
		    }, 1000);
		    setTimeout(() => {
			    element.find(".icon-checkmark").hide();
			    element.find(".size_variant_button_add").show();
		    }, 3500);
	    }
    })
    .on("click", ".variant_modal__toggle_button, .variant_modal__toggle_button svg", function (e) {
        const element = $(this);
        const modalId = element.data("modal-id");
        const modal = $(".variant_modal#" + modalId) || $(".variant_selector#" + modalId);
        const modalOverlay = $(".variant_modal_overlay#" + modalId + "-overlay");

        modal.show();
				setTimeout(() => {
					modal.addClass("active");
				}, 100);
        modalOverlay.show();
        modalOverlay.on("click", () => {
	        modal.removeClass("active");
          setTimeout(() => {
	          modal.hide();
          }, 1000);
          modalOverlay.hide()
        })
        modal.find('.quick_add_modal__close').on("click", () => {
	        modal.removeClass("active");
	        setTimeout(() => {
		        modal.hide();
	        }, 1000);
	        modalOverlay.hide()
        })
      }
    )
}

window.addEventListener('DOMContentLoaded', () => {
	quickAdd();
});