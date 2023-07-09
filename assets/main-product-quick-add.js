
window.addEventListener("DOMContentLoaded", function() {
	const stickyButton = document.querySelector('.sticky-add-to-cart-btn');
	function toggleQuickAdd() {
		$(".sticky-cart-cta .variant_selector").toggle();
		setTimeout(() => {
			$(".sticky-cart-cta .variant_selector").addClass("active");
		}, 100);
		$(".sticky-cart-cta-overlay").toggle();

		if (window.innerWidth > 990) {
		$(".variant_modal .quick-add-variant-modal.mobile").toggle();
		}
	}

	$(".variant_modal .quick_add_modal__close").click(toggleQuickAdd);
	$(".sticky-cart-cta-overlay").click(toggleQuickAdd);
	stickyButton.addEventListener('click', toggleQuickAdd);

	const el = document.querySelector(".product-form__buttons");

	const options = {
		root: null,
		threshold: 0,
		rootMargin: "-150px"
	};

	const observer = new IntersectionObserver((entries, observer) => {
		entries.forEach((entry) => {
			console.log(entry)
			let topPos = entry.boundingClientRect.top;
			let stickyATC = document.querySelector('.sticky-cart-cta');
			if (topPos < 100 && entry.isIntersecting === false) {
				stickyATC.classList.add('is-pinned');
			} else {
				stickyATC.classList.remove('is-pinned');
			}
		});
	}, options);

	observer.observe(el);
});
