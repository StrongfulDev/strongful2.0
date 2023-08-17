document.addEventListener('DOMContentLoaded', function() {
	if (document.getElementById("search-input") !== null) {
		document.getElementById('search-input').addEventListener('input', function() {

			const query = this.value.toLowerCase();
			const faqContainers = document.querySelectorAll('.accordion details');
			const noResults = document.querySelector('.search-input__no-results');
			let hiddenElementsCount = 0;
			let totalElementsLength = faqContainers.length;

			faqContainers.forEach(container => {
				const questionText = container.querySelector('.accordion__title.h4').textContent.toLowerCase();
				const answerText = container.querySelector('.accordion .accordion__content.rte').textContent.toLowerCase();

				if (questionText.includes(query) || answerText.includes(query)) {
					container.classList.remove('hidden');
					hiddenElementsCount--;
				} else {
					container.classList.add('hidden');
					hiddenElementsCount++;
				}
			});

			if (hiddenElementsCount === totalElementsLength) {
				noResults.classList.remove('hidden');
			} else {
				noResults.classList.add('hidden');
			}
		});
	}
});