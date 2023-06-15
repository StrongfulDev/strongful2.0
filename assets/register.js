
window.addEventListener('DOMContentLoaded', () => {

	const listItem = $(".multicolumn-list__item");
	const loginListItem = $(".multicolumn-list__item[data-account='login']");
	const registerListItem = $(".multicolumn-list__item[data-account='register']");
	const customerOverlay = $(".custom-login-overlay");
	const borderPosition = $("#js-border-position");
	let customerSection;

	document.querySelector("#shopify-section-main-login").classList.add("hidden");

	// account toggler site-wide
	$(".account-toggler-site-wide").click(function() {
		$(".custom-customer-account-container").addClass("active");
		customerOverlay.removeClass("hidden");
	});

	$(".close-custom-account-container").click(closePopup);
	customerOverlay.click(closePopup);

	function closePopup() {
		$(".custom-customer-account-container").removeClass("active");
		customerOverlay.addClass("hidden");
	}

	function animations(element) {
		console.log(element)
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
		if (currentURL.includes('login') || currentURL.includes('register')) {
			checker = true;
		}
		if (checker) {
			redirectPath = '/account';
		} else {
			redirectPath = currentURL;
		}

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
