
window.addEventListener('DOMContentLoaded', () => {

	$('.multicolumn-list__item').on('click', function() {
		$('.multicolumn-list__item').removeClass('active');
		$(this).addClass('active');
		let activeWidth = $(this).innerWidth();
		let position = $(this).position();
		let id = $(this).attr('id');
		let lastChar = id.substr(id.length - 1);
		$(".customer").toggle();
		if (lastChar == 2) {
			$("#js-border-position").css("width", activeWidth + "px");
			$("#js-border-position").css("left", position.left + "px");
		} else {
			$("#js-border-position").css("width", activeWidth - 14 + "px");
			$("#js-border-position").css("left", position.left + 14 + "px");
		}
	});
});
