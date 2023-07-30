
window.addEventListener('DOMContentLoaded', () => {

	const listItem = $(".multicolumn-list__item");
	const registerListItem = $(".multicolumn-list__item[data-account='login']");
	const customerOverlay = $(".custom-login-overlay");
	const borderPosition = $("#js-border-position");
	let cartDrawer = $(".drawer");
	let customerSection;
	let secondaryLogo;

	if (document.querySelector("#shopify-section-main-login") !== null) {
		document.querySelector("#shopify-section-main-login").classList.add("hidden");
	}

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
		if (secondaryLogo !== null) {
			if (element.attr('data-account') === 'login') {
				secondaryLogo.classList.remove("hidden");
			} else {
				secondaryLogo.classList.add("hidden");
			}
		}
		element.addClass("active");
		element.siblings().removeClass("active");
		let activeWidth = element.innerWidth();
		let position = element.position();
		borderPosition.css("width", activeWidth + "px");
		borderPosition.css("left", position.left + "px");
		// customerSection = document.querySelector("#shopify-section-main-" + element.attr('data-account'));
		customerSection = document.querySelector(`div[id$="${element.attr('data-account')}"]`);
		console.log(customerSection)
		customerSection.classList.remove("hidden");
		$(customerSection).siblings('div[id^="shopify-section"]').addClass("hidden");
		console.log($(customerSection).siblings('div[id^="shopify-section"]'));
	}

	listItem.on("click", function() {
		animations($(this));
	});

	animations(registerListItem);
});
