
window.addEventListener('DOMContentLoaded', function (event) {
	$('.supportful__open-articles').click((e) => {
		let clicked = e.target;
		let thatArrow = clicked.nextElementSibling;
		let parent = clicked.parentElement;
		let parentNextList = parent.nextElementSibling;

		$(thatArrow).toggleClass('rotateArr');
		$(parentNextList).toggleClass('hidden');
	});

	let article = document.querySelector( '.article-content--title' );
	let frontArticle = document.querySelectorAll( '.link-for-js' );
	frontArticle.forEach((articuno) => {
		if (article.innerHTML == articuno.innerHTML) {
			$(articuno).parent().css( 'background','#000' );
			$(articuno).css( 'color','#fff' );
		}
	});
});
