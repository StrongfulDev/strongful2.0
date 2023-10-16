window.addEventListener('DOMContentLoaded', function(e) {

	setTimeout(function(event) {

		$(".model-switcher").removeClass("hidden");

		const arrowIcon = document.querySelector(".model-switch-button .icon-caret");
		hideUnAvailableModels();

		let defaultSize = $('input[name="Size"]:checked').val();
		console.log(defaultSize)
		updateVariantRadios(defaultSize);
		changeModel(defaultSize);
		updateModelSwitch(defaultSize);

		$('.model-switcher__item input').change(function () {
			let modelSize = $(this).val();
			if (modelSize) {
				updateVariantRadios(modelSize);
				changeModel(modelSize);
				updateModelSwitch(modelSize);
				$(this).parents().addClass("inactive");
				$(this).parents().siblings().removeClass("inactive");
			}
		});

		// $('variant-radios input[name="Size"]').on('change', function (e) {
		// 	const modelSize = $(this).val();
		// 	changeModel(modelSize);
		// 	updateModelSwitch(modelSize);
		// 	if (window.innerWidth < 990) {
		// 		showLowStock(this);
		// 	}
		// });

		function showLowStock(element) {
			let lowStockText = $(element).siblings(".product__inventory");
			let otherLowStocks = $(element).parents().find(".product__inventory").not(lowStockText);
			otherLowStocks.hide();
			if (lowStockText.text() !== "") {
				lowStockText.show();
			}
		}

		function hideUnAvailableModels() {
			const availableSizes = getAvailableSizes();

			if (availableSizes.length === 0) {
				$('.model-switcher').hide();
			}

			$(".model-switcher__item").filter((function () {
				const size = $(this).data('model-size');
				return !availableSizes.includes(size);
			})).hide();
		}

		function getAvailableSizes() {
			const sizes = new Set()
			$('.product__media-item:not([data-model-size=""])').each(function () {
				sizes.add($(this).data('model-size'));
			});

			return Array.from(sizes);
		}

		function changeModel(modelSize) {
			const productMediaList = $('.product__media-list');
			const sizeTable = $('.div-block-460');
			const selectedColorValue = $('input[name="Color"]:checked').val();

			const imagesToHide = productMediaList.find(`.product__media-item:not([data-model-size="${modelSize}"]):not([data-alt="${selectedColorValue}"])`);
			const imagesToShow = productMediaList.find(`.product__media-item[data-model-size="${modelSize}"][data-alt="${selectedColorValue}"]`);

			const divsToHide = sizeTable.find(`span:not([data-model-size="${modelSize}"])`);
			const divsToShow = sizeTable.find(`span[data-model-size="${modelSize}"]`);

			const modelWearsSizeParagraphsToShow = $(document).find(`.model-wears-size[data-model="${modelSize}"]`);
			const modelWearsSizeParagraphsToHide = $(document).find(`.model-wears-size:not([data-model="${modelSize}"])`);

			let progressBar = $('.slider-component-progress-bar');

			imagesToHide.hide();
			imagesToShow.show();
			divsToHide.addClass('hidden');
			divsToShow.removeClass('hidden');
			modelWearsSizeParagraphsToShow.removeClass('hidden');
			modelWearsSizeParagraphsToHide.addClass('hidden');
			progressBar.css('width', `calc(100% / ${imagesToShow.length})`);

			$(".model-switcher__list").addClass("hidden");
			$(".model-switcher-overlay").addClass("hidden");
			$(arrowIcon).removeClass('rotate-arrow');

			const model = window.models[modelSize];

		}

		function updateVariantRadios(modelSize) {
			const button = $(`variant-radios input[name="Size"][value="${modelSize}"]`)
			button.click();
		}

		function updateModelSwitch(modelSize) {
			const inputs = $('.model-switcher__item input')
			inputs
				.removeAttr('checked')
				.filter(`[value="${modelSize}"]`)
				.attr('checked', true).prop('checked', true);
		}

		$(".model-switcher-overlay").click(function() {
			$(this).addClass("hidden");
			$(".model-switcher__list").addClass("hidden");
			$(arrowIcon).removeClass('rotate-arrow');
		});

		$(".model-switch-button").click(function(e) {

			$(".model-switcher__list").toggleClass("hidden");

			$(arrowIcon).toggleClass('rotate-arrow');

			if ($(window).width() < 990) {
				$(".model-switcher-overlay").toggleClass("hidden");
			}
		});
	}, 500);

});