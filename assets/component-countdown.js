
document.addEventListener('DOMContentLoaded', function() {
	let data = document.getElementById("countdown").dataset.date;
	let target_date = new Date(data).getTime() + (1000*24);
	let days, hours, minutes, seconds;

	if (document.getElementById('tiles') != null) {

		getCountdown();

		setInterval(() => { getCountdown(); }, 1000);

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

			$('.tiles-time-days').html(days + '<span class="tiles-time-hours-small"> :</span>');
			$('.tiles-time-hours').html(hours + '<span class="tiles-time-hours-small"> :</span>');
			$('.tiles-time-minutes').html(minutes + '<span class="tiles-time-minutes-small"> :</span>');
			$('.tiles-time-seconds').html(seconds);
		}

		function pad(n) {
			return (n < 10 ? '0' : '') + n;
		}
	}

});
