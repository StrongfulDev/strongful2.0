
window.addEventListener('DOMContentLoaded', function () {
	const returnsInfoActivators = document.querySelectorAll(".more-returns-info");
	if (returnsInfoActivators != null) {
		$('.more-returns-info .flex').click(function() {
			$(this).find('svg').toggleClass('rotate-arrow');
			$(this).next().toggleClass('hidden');
		});
	}
});
