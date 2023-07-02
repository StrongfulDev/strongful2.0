
window.addEventListener('DOMContentLoaded', () => {

	const listItem = $(".multicolumn-list__item");
	const loginListItem = $(".multicolumn-list__item[data-account='login']");
	const registerListItem = $(".multicolumn-list__item[data-account='register']");
	const customerOverlay = $(".custom-login-overlay");
	const borderPosition = $("#js-border-position");
	let cartDrawer = $(".drawer");
	let customerSection;
	let secondaryLogo;

	document.querySelector("#shopify-section-main-login").classList.add("hidden");

	// account toggler site-wide
	$(".account-toggler-site-wide").click(function() {
		$(".custom-customer-account-container").addClass("active");
		customerOverlay.removeClass("hidden");
		animations(registerListItem);

		if (cartDrawer.hasClass("active")) {
			cartDrawer.removeClass("active");
		}
	});

	$(".close-custom-account-container").click(closePopup);
	customerOverlay.click(closePopup);

	function closePopup() {
		$(".custom-customer-account-container").removeClass("active");
		customerOverlay.addClass("hidden");
	}

	function animations(element) {
		secondaryLogo = document.querySelector(".header__heading-logo_secondary");
		if (element.attr('data-account') === 'login') {
			secondaryLogo.classList.remove("hidden");
		} else {
			secondaryLogo.classList.add("hidden");
		}
		element.addClass("active");
		element.siblings().removeClass("active");
		let activeWidth = element.innerWidth();
		let position = element.position();
		borderPosition.css("width", activeWidth + "px");
		borderPosition.css("left", position.left + "px");
		customerSection = document.querySelector("#shopify-section-main-" + element.attr('data-account'));
		customerSection.classList.remove("hidden");
		$(customerSection).siblings('[id^="shopify-section-main-"]').addClass("hidden");
	}

	listItem.on("click", function() {
		animations($(this));
	});

	animations(registerListItem);

	(function() {
		let currentURL = window.location.href;
		let checker = false;
		let redirectPath;
		// if (currentURL.includes('login') || currentURL.includes('register')) {
		// 	checker = true;
		// }
		// if (checker) {
		// 	redirectPath = '/account';
		// } else {
		// 	redirectPath = currentURL;
		// }

		redirectPath = '/';

		let selector = '#create_customer, form[action$="/account"][method="post"]',
			$form = document.querySelectorAll(selector)[0];

		if ($form) {
			$redirect = document.createElement('input');
			$redirect.setAttribute('name', 'return_to');
			$redirect.setAttribute('type', 'hidden');
			$redirect.value = redirectPath;
			$form.appendChild($redirect);
		}
	})();
});
