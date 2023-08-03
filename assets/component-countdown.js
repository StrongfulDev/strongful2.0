
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

	// Fetches the starting timestamp and current count from local storage
	const getStoredData = () => {
		const startTimestamp = parseInt(localStorage.getItem('startTimestamp') || "0");
		const currentCount = parseInt(localStorage.getItem('currentCount') || "500");
		return { startTimestamp, currentCount };
	};

	const storeData = (timestamp, count) => {
		localStorage.setItem('startTimestamp', timestamp.toString());
		localStorage.setItem('currentCount', count.toString());
	};

	const calculateCount = (startTimestamp) => {
		const elapsedTime = Date.now() - startTimestamp;
		const decrementsPassed = Math.floor(elapsedTime / (86400000 / 500));
		return Math.max(500 - decrementsPassed, 0);
	};

	const initCountdown = () => {
		const { startTimestamp, currentCount } = getStoredData();

		// If it's a new countdown or a finished one
		if (!startTimestamp || currentCount <= 0) {
			const newTimestamp = Date.now();
			storeData(newTimestamp, 500);
			return 500;
		}

		return currentCount; // Return the ongoing countdown value
	};

	let count = initCountdown();
	document.getElementById('countdownDisplay').innerText = count;

	const countdown = () => {
		if (count > 0) {
			count--;
			document.getElementById('countdownDisplay').innerText = count;
			storeData(parseInt(localStorage.getItem('startTimestamp')), count);
		} else {
			clearInterval(interval);
		}
	};

	const timeBetweenDecrement = 86400000 / 500;
	const interval = setInterval(countdown, timeBetweenDecrement);

});
