function animateSliderCard(card, delay) {
  gsap.from(card, {
    x: "100%",
    opacity: 0,
    duration: 1.4,
    ease: "power3.inOut",
    delay: delay
  });
}

// Use ScrollTrigger to trigger animations when scrolling into the main swiper component
$(".slider-main_component[data-swiper='slide-in']").each(function (index) {
  let loopMode = false;
  if ($(this).attr("loop-mode") === "true") {
    loopMode = true;
  }
  let sliderDuration = 300;
  if ($(this).attr("slider-duration") !== undefined) {
    sliderDuration = +$(this).attr("slider-duration");
  }
  const swiper = new Swiper($(this).find(".swiper")[0], {
    speed: sliderDuration,
    loop: loopMode,
    autoHeight: false,
    centeredSlides: loopMode,
    followFinger: true,
    freeMode: false,
    slideToClickedSlide: false,
    slidesPerView: 1,
    spaceBetween: "4%",
    rewind: false,
    mousewheel: {
      forceToAxis: true
    },
    keyboard: {
      enabled: true,
      onlyInViewport: true
    },
    breakpoints: {
      480: {
        slidesPerView: 1,
        spaceBetween: "4%"
      },
      768: {
        slidesPerView: 2,
        spaceBetween: "4%"
      },
      992: {
        slidesPerView: 3,
        spaceBetween: "2%"
      }
    },
    pagination: {
      el: $(this).find(".swiper-bullet-wrapper")[0],
      bulletActiveClass: "is-active",
      bulletClass: "swiper-bullet",
      bulletElement: "button",
      clickable: true
    },
    navigation: {
      nextEl: $(this).find(".swiper-next")[0],
      prevEl: $(this).find(".swiper-prev")[0],
      disabledClass: "is-disabled"
    },
    scrollbar: {
      el: $(this).find(".swiper-drag-wrapper")[0],
      draggable: true,
      dragClass: "swiper-drag",
      snapOnRelease: true
    },
    slideActiveClass: "is-active",
    slideDuplicateActiveClass: "is-active"
  });

  const sliderCards = $(this).find(".swiper-slide");

  sliderCards.each(function (cardIndex) {
    const card = this;

    // Create a ScrollTrigger for each card to trigger animations when scrolling into view
    ScrollTrigger.create({
      trigger: card,
      start: "top bottom",
      onEnter: () => animateSliderCard(card, cardIndex * 0.2)
    });
  });
});
