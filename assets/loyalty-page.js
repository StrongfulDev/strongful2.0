window.addEventListener('DOMContentLoaded', (event) => {

	if ($(window).width() < 950) {
		const mobileVIPTierTogglers = document.querySelectorAll('.vip-tier-data-toggle');
		mobileVIPTierTogglers.forEach((toggler) => {
			let tierData = toggler.nextElementSibling;
			let icon = toggler.querySelector('.icon');
			toggler.addEventListener('click', (e) => {
				$(icon).toggleClass('rotated');
				$(tierData).toggle();
				$('.vip-tier-data').not(tierData).hide();
				if (tierData.style.display == 'block') {
					$(toggler).css('margin-bottom', '0');
				} else {
					$(toggler).css('margin-bottom', '1rem');
				}
			});
		});
	}

	let touchEvent = 'ontouchstart' in window ? 'touchstart' : 'click';

	$("#create_customer button").click((clickEvent) => {
		clickEvent.preventDefault();
		// grab fields;
		let email = $('#RegisterForm-email').val();
		let firstname = $('#RegisterForm-FirstName').val();
		let lastname = $('#RegisterForm-LastName').val();
		let settings = {
			"async": true,
			"crossDomain": true,
			"url": "https://manage.kmail-lists.com/ajax/subscriptions/subscribe",
			"method": "POST",
			"headers": {
				"content-type": "application/x-www-form-urlencoded",
				"cache-control": "no-cache"
			},
			"data": {
				"g": "RX3ZpG",
				"email": email,
				// pass in additional fields
				"$fields": "$source, $first_name, $last_name",
				"$source": "Account Creation",
				"$first_name": firstname,
				"$last_name": lastname
			}
		};
		$.ajax(settings).done(function(response) {
			$("#create_customer").submit();
		});
	});

	setTimeout((e) => {

		let scrollToElm = parseInt(document.getElementById('registerHere').offsetTop - 151);

		function scrollThere() {
			console.log(scrollToElm);
			$('html, body').animate({
				scrollTop: scrollToElm
			}, 700);
		}

		$('.yotpo-action-button-widget').click(scrollThere);
		$('.i-wanna-join').click(scrollThere);
		$('.already-has-account-uno').click(scrollThere);

		let smsToggler = document.querySelector('.yotpo-tile.yotpo-campaign-tile-smssignupcampaign');

		if (customerTags != null) {
			$('.yotpo-vip-tiers-headline').html('תעלי שלב!');
		}

		let pointsHistoryBtn = document.querySelector( '.yotpo-action-button-widget.yotpo-action-button.yotpo-secondary-button > button' );
		$(pointsHistoryBtn).click((e) => {
			let hideNSeek = document.querySelectorAll( '.yotpo-widget-my-rewards-widget .row-action-column > .yotpo-inner-text' );

			hideNSeek.forEach((hayden) => {
				if (hayden.innerText == '15% הנחת הצטרפות למועדון') {
					$(hayden).parents( '.yotpo-grid-row' ).hide();
				} else if (hayden.innerText == 'Make a purchase') {
					hayden.innerText = 'נקודה על כל שקל';
				} else if (hayden.innerText == 'Follow us on Instagram') {
					hayden.innerText = 'עוקב באינסטגרם';
				} else if (hayden.innerText == 'בהוספת עוקב לטיקטוק שלנו') {
					hayden.innerText = 'עוקב בטיקטוק';
				} else if (hayden.innerText == 'סטרונגירל מביאה סטרונגירל') {
					hayden.innerText = 'סטרונגירלז';
				}
			});

			if ($(window).width > 769) {
				let howMuchXTop = document.querySelector( '.yotpo-rewards-history-wrapper' ).getBoundingClientRect().top + 10 + 'px';
				let howMuchXLeft = document.querySelector( '.yotpo-rewards-history-wrapper' ).getBoundingClientRect().left + 10 + 'px';
				$( '.yotpo-close-btn-wrapper' ).css( 'top', howMuchXTop);
				$( '.yotpo-close-btn-wrapper' ).css( 'left', howMuchXLeft);
			}
		});

		$( '.yotpo-tile.yotpo-tile-completed' ).css( 'background','lightgray' );
	}, 7500);

	let aListFaqOpener = document.querySelectorAll( '.a-list__question-and-icon' );
	aListFaqOpener.forEach((opener) => {
		$(opener).click((cE) => {
			let answer = cE.target.nextElementSibling;
			let plusIcon = $(cE.target).children( '.plus' );
			$(plusIcon).toggleClass( 'Rotated' );
			$(answer).toggleClass( 'hidden' );
		});
	});

	$('.form-toggler').click((e) => {
		$('.loyalty-form').toggleClass('hidden');
	});

});