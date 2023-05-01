$(document).ready(function () {
  $('.model-switch').change(function () {
    const modelSize = $(this).val();
    if (modelSize) {
      changeModel(modelSize);
      updateVariantRadios(modelSize);
    }
  });

  $('variant-radios input[name="Size"]').on('change', function () {
    const modelSize = $(this).val();
    changeModel(modelSize);
    updateModelSwitch(modelSize);
  });
});


function changeModel(modelSize) {
  const list = $('.product__media-list');

  const imagesToHide = list.find(`.product__media-item:not([data-model-size="${modelSize}"])`);
  const imagesToShow = list.find(`.product__media-item[data-model-size="${modelSize}"]`);

  imagesToHide.hide();
  imagesToShow.show();
}

function updateVariantRadios(modelSize) {
  $(`variant-radios input[name="Size"][value="${modelSize}"]`).prop('checked', true);
}

function updateModelSwitch(modelSize) {
  $('select.model-switch option')
    .removeAttr('selected')
    .filter(`[value="${modelSize}"]`)
    .attr('selected', true);
}