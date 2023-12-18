const aboutSlider = new Swiper(".swiper.is--about", {
  // Parameters
  loop: true,
  slidesPerView: 2,
  centeredSlides: true,
  speed: 800,
  grabCursor: true,
  parallax: true,
  breakpoints: {
    // when window width is >= 320px
    320: {
      slidesPerView: 1.5
      //spaceBetween: 20
    },
    // when window width is >= 480px
    480: {
      slidesPerView: 1.5
      //spaceBetween: 30
    },
    // when window width is >= 640px
    640: {
      slidesPerView: 2
      //spaceBetween: 40
    }
  },
  autoplay: {
    delay: 2500,
    disableOnInteraction: false // This allows the autoplay to continue after user interaction
  }
});
