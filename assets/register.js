
window.addEventListener('DOMContentLoaded', () => {

	let customURL = window.location.href;
	if (customURL.includes('register')) {
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
});
