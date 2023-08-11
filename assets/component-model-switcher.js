window.addEventListener('DOMContentLoaded', function(e) {
	const arrowIcon = document.querySelector(".model-switch-button .icon-caret");

	setTimeout(() => {
		hideUnAvailableModels();

		$('.model-switcher__item input').change(function () {
			let modelSize = $(this).val();
			if (modelSize) {
				changeModel(modelSize);
				updateVariantRadios(modelSize);
				$(this).parents().removeClass("inactive");
				$(this).parents().siblings().addClass("inactive");
			}
		});

		$('variant-radios input[name="Size"], variant-radios input[name="מידה"]').on('change', function () {
			const modelSize = $(this).val();
			changeModel(modelSize);
			updateModelSwitch(modelSize);
			if (window.innerWidth < 990) {
				showLowStock(this);
			}
		});

		// const modelSize = localStorage.getItem('modelSize');
		// if (modelSize) {
		// 	changeModel(modelSize);
		// }

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
			const list = $('.product__media-list');
			const sizeTable = $('.div-block-460');

			const imagesToHide = list.find(`.product__media-item:not([data-model-size="${modelSize}"])`);
			const imagesToShow = list.find(`.product__media-item[data-model-size="${modelSize}"]`);

			const divsToHide = sizeTable.find(`span:not([data-model-size="${modelSize}"])`);
			const divsToShow = sizeTable.find(`span[data-model-size="${modelSize}"]`);

			const modelWearsSizeParagraphsToShow = $(document).find(`.model-wears-size[data-model="${modelSize}"]`);
			const modelWearsSizeParagraphsToHide = $(document).find(`.model-wears-size:not([data-model="${modelSize}"])`);

			let progressBar = document.querySelector('.slider-component-progress-bar');
			$(progressBar).css('width', `calc(100% / ${imagesToShow.length})`);

			if (imagesToShow.length > 0) {
				imagesToHide.hide();
				imagesToShow.show();
				divsToHide.hide();
				divsToShow.show();
				modelWearsSizeParagraphsToShow.show();
				modelWearsSizeParagraphsToHide.hide();
			}

			$(".model-switcher__list").addClass("hidden");
			$(".model-switcher-overlay").addClass("hidden");
			$(arrowIcon).removeClass('rotate-arrow');

			// localStorage.setItem('modelSize', modelSize);

			const model = window.models[modelSize];

			// $('.model-switch-button span').text(model ? `${model.name} (${modelSize})` : `${modelSize}`);
		}

		function updateVariantRadios(modelSize) {
			const button = $(`variant-radios input[name="Size"][value="${modelSize}"], variant-radios input[name="מידה"][value="${modelSize}"]`)
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
	}, 1000);

});