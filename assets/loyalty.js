document.addEventListener('DOMContentLoaded', (event) => {

	const clickToSubmit = document.createElement('div');
	clickToSubmit.classList.add('click-to-submit');
	clickToSubmit.innerHTML = 'לחצי למימוש';
	const elementsToAppend = document.querySelectorAll('.yotpo-tile:not(.yotpo-tile-completed)');
	console.log(elementsToAppend);

});