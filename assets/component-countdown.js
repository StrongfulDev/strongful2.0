
document.addEventListener('DOMContentLoaded', function() {
	let data = document.getElementById("countdown").dataset.date;
	let target_date = new Date(data).getTime() + (1000*24);
	let days, hours, minutes, seconds;

	if (document.getElementById('tiles') != null) {

		// getCountdown();

		// setInterval(() => { getCountdown(); }, 1000);

		function getCountdown() {

			// find the amount of "seconds" between now and target
			let current_date = new Date().getTime();
			let seconds_left = (target_date - current_date) / 1000;

			days = pad(parseInt(seconds_left / 86400));
			seconds_left = seconds_left % 86400;

			hours = pad(parseInt(seconds_left / 3600));
			seconds_left = seconds_left % 3600;

			minutes = pad(parseInt(seconds_left / 60));
			seconds = pad(parseInt(seconds_left % 60));

			$('.tiles-time-days').html(days);
			$('.tiles-time-hours').html(hours);
			$('.tiles-time-minutes').html(minutes);
			$('.tiles-time-seconds').html(seconds);
		}

		function pad(n) {
			return (n < 10 ? '0' : '') + n;
		}
	}

	const startTime = new Date(data).getTime(); // GMT +0300
	const endTime = startTime + (24 * 60 * 60 * 1000); // 24 hours later
	const totalCount = 1000;

	function getCurrentCount() {
		const now = Date.now();
		if (now < startTime) {
			return totalCount; // Countdown hasn't started yet
		} else if (now > endTime) {
			return 0; // Countdown has ended
		} else {
			const elapsed = now - startTime;
			const totalDuration = endTime - startTime;
			return Math.round(totalCount - (elapsed / totalDuration) * totalCount);
		}
	}

	function updateCounter() {
		const count = getCurrentCount();
		$("#countdownDisplay").text(count + " ORDERS LEFT");

		if (count === 1) {
			$("#countdownDisplay").text(count + " ORDER");
		} else if (count > 0) {
			setTimeout(updateCounter, 1000); // Update every second
		} else {
			$("#countdownDisplay").text("PRE ORDER OVER");
		}
	}

	updateCounter();

});
