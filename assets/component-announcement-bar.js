function announcementAnimation() {
    let announcement = document.querySelector(".announcement-bar-container");
    let announcementDuration = announcement.dataset.duration * 100;
    let announcementDelay = announcement.dataset.delay * 1000;
    let elements = jQuery(".announcement-bar");
    let index = 0;
    setInterval(function () {
        elements.eq(index).fadeOut(announcementDuration, function () {
            jQuery(this).removeClass("active");
            index = (index + 1) % elements.length; // creates a loop
            elements.eq(index).fadeIn(announcementDuration).addClass("active");
        });
    }, announcementDelay);
}

if (jQuery(window).width() < 990) {
    announcementAnimation();
}
