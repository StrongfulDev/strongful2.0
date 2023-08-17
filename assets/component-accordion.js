document.addEventListener('DOMContentLoaded', function() {
	if (document.getElementById("search-input") !== null) {
		document.getElementById('search-input').addEventListener('input', function() {
			const query = this.value.toLowerCase();
			const faqContainers = document.querySelectorAll('.accordion details');

			faqContainers.forEach(container => {
				const questionText = container.querySelector('.accordion__title.h4').textContent.toLowerCase();
				const answerText = container.querySelector('.accordion .accordion__content.rte').textContent.toLowerCase();

				if (questionText.includes(query) || answerText.includes(query)) {
					container.style.display = 'block';
				} else {
					container.style.display = 'none';
				}
			});
		});
	}
});