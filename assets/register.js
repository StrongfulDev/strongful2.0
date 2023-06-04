
window.addEventListener('DOMContentLoaded', () => {

	// account toggler site-wide
	$(".account-toggler-site-wide").click(function() {
		$(".custom-customer-account-container").addClass("active");
		$(".custom-login-overlay").removeClass("hidden");
		animations();
	});

	$(".close-custom-account-container").click(closePopup);
	$(".custom-login-overlay").click(closePopup);

	function closePopup() {
		$(".custom-customer-account-container").removeClass("active");
		$(".custom-login-overlay").addClass("hidden");
	}

	function animations() {
		if (customerTags !== null) {
			$(".multicolumn-list__item").eq(0).removeClass("active");
			$(".multicolumn-list__item").eq(1).addClass("active");
			let activeWidth = $(".multicolumn-list__item").eq(1).innerWidth();
			let position = $(".multicolumn-list__item").eq(1).position();
			$("#js-border-position").css("width", activeWidth + "px");
			$("#js-border-position").css("left", position.left + "px");
		} else {
			$(".multicolumn-list__item").eq(0).addClass("active");
			$(".multicolumn-list__item").eq(1).removeClass("active");
			let activeWidth = $(".multicolumn-list__item").eq(0).innerWidth();
			let position = $(".multicolumn-list__item").eq(0).position();
			$("#js-border-position").css("width", activeWidth - 14 + "px");
			$("#js-border-position").css("left", position.left + 14 + "px");
		}
	}

	$('.multicolumn-list__item').on('click', function() {
		$('.multicolumn-list__item').removeClass('active');
		$(this).addClass('active');
		let activeWidth = $(this).innerWidth();
		let position = $(this).position();
		let id = $(this).attr('id');
		let lastChar = id.substr(id.length - 1);
		$(".customer").toggleClass("hidden");
		if (lastChar == 2) {
			$("#js-border-position").css("width", activeWidth + "px");
			$("#js-border-position").css("left", position.left + "px");
		} else {
			$("#js-border-position").css("width", activeWidth - 14 + "px");
			$("#js-border-position").css("left", position.left + 14 + "px");
		}
	});

	animations();

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
