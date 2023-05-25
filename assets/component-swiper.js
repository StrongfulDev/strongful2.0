// function swiperAnimation() {
//     const swiper = jQuery(".swiper-container");
//     const swiperDuration = parseInt(swiper.data("duration")) * 100;
//     const swiperDelay = parseInt(swiper.data("delay")) * 1000;
//     const elements = swiper.find(".swiper-slide");
//     let index = 0;
//
//     setInterval(function () {
//         elements.eq(index).fadeOut(swiperDuration, function () {
//             jQuery(this).removeClass("active");
//             index = (index + 1) % elements.length; // creates a loop
//             elements.eq(index).fadeIn(swiperDuration).addClass("active");
//         });
//     }, swiperDelay);
// }
//
// setTimeout(function () {
//     swiperAnimation();
// }, 1000);
//
//
