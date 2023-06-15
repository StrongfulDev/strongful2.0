
document.addEventListener('DOMContentLoaded', function() {
	let target_date = new Date("Mon Jun 12 2023 23:59:59 GMT+0300 (שעון ישראל (קיץ))").getTime() + (1000*24);
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

			// $('.tiles-time-days').html(days);
			$('.tiles-time-hours').html(hours);
			$('.tiles-time-minutes').html(minutes);
			$('.tiles-time-seconds').html(seconds);
		}

		function pad(n) {
			return (n < 10 ? '0' : '') + n;
		}
	}
});
