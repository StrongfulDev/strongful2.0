function quickAdd() {
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

  $('.variant_selector.submit_on_click .size_variant_button:not(.disabled-variant-button)').on("click", function (e) {
    const element = $(this);
    let myElement = this;
    $(myElement).find(".size_variant_button_add").hide();
    $(myElement).find(".size-picker-loading").addClass("block");
    setTimeout(() => {
      element.parents("form").find('[type="submit"]').click()
    }, 100);
    setTimeout(() => {
      $(myElement).find(".size_variant_button_add").show();
      $(myElement).find(".size-picker-loading").removeClass("block");
    }, 500);
  });

  $('#MainContent').on("click", ".variant_modal__toggle_button, .variant_modal__toggle_button svg", function (e) {
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
}

window.onload = () => {
  quickAdd();
}