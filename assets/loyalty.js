document.addEventListener('DOMContentLoaded', (event) => {

	setTimeout(() => {
		const clickToSubmit = document.createElement('div');
		clickToSubmit.classList.add('click-to-submit');
		clickToSubmit.innerHTML = 'לחצי למימוש';
		const elementsToAppend = document.querySelectorAll('.yotpo-campaign-switcher-wrapper .yotpo-tile.yotpo-is-mobile:not(.yotpo-tile-completed)');

		elementsToAppend.forEach((element) => {
			element.appendChild(clickToSubmit.cloneNode(true));
		});
	}, 4000);

});