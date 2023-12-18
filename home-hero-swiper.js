// GSAP Initialization
const gsap = window.gsap;

// Constants
const DURATION = 1.8; // In seconds
const PAUSE = 4; // In seconds
const EASING = "power3.inOut";

let progressInterval;

function startProgress() {
  clearInterval(progressInterval);
  const elem = document.querySelector(".hero-autoplay-progress svg");
  let progress = 0;
  const startTime = Date.now();
  const TOTAL_DURATION = (DURATION + PAUSE) * 1000 - 100;

  progressInterval = setInterval(() => {
    const elapsed = Date.now() - startTime;
    progress = elapsed / TOTAL_DURATION;
    if (progress >= 1) {
      progress = 0;
      clearInterval(progressInterval);
      startProgress();
    }
    elem.style.setProperty("--progress", progress);
  }, 16);
}

function autoplaySwiper(swiperClass, initialPosition, direction, axis) {
  const $slides = document.querySelectorAll(
    `${swiperClass} .swiper-slide-hero`
  );
  let currentSlideID = 0;
  const slidesNum = $slides.length;

  // Determine the initial scale axis based on the movement axis
  const scaleAxis = axis === "x" ? "scaleX" : "scaleY";

  // Initialize all slides and images
  $slides.forEach((slide, index) => {
    const $img = slide.querySelector(".home-hero-img");
    gsap.set($img, { [scaleAxis]: 1, [axis]: "0%" });
    gsap.set(slide, { [axis]: initialPosition });
    if (index === currentSlideID) {
      slide.setAttribute("slide-is-active", "true");
      gsap.set(slide, { [axis]: "0%" });
    }
  });

  function play() {
    let nextSlideID = currentSlideID + 1;
    if (nextSlideID >= slidesNum) {
      nextSlideID = 0;
    }
    $slides.forEach((slide) => slide.removeAttribute("slide-is-active"));
    const $currentSlide = $slides[currentSlideID];
    const $nextSlide = $slides[nextSlideID];
    $nextSlide.setAttribute("slide-is-active", "true");

    const $currentImg = $currentSlide.querySelector(".home-hero-img");
    const $nextImg = $nextSlide.querySelector(".home-hero-img");

    gsap.to($currentImg, {
      scale: 1,
      [axis]: direction === "left" || direction === "top" ? "50%" : "-50%",
      duration: DURATION,
      ease: EASING
    });

    gsap.fromTo(
      $nextImg,
      {
        scale: 2.8,
        [axis]: direction === "left" || direction === "top" ? "-50%" : "50%"
      },
      { scale: 1, [axis]: "0%", duration: DURATION, ease: EASING }
    );

    gsap.to($currentSlide, {
      [axis]: direction === "left" || direction === "top" ? "-100%" : "100%",
      duration: DURATION,
      ease: EASING
    });

    gsap.fromTo(
      $nextSlide,
      { [axis]: initialPosition },
      {
        [axis]: "0%",
        duration: DURATION,
        ease: EASING,
        onComplete: () => {
          gsap.set($currentSlide, { [axis]: initialPosition });
          gsap.set($currentImg, { [scaleAxis]: 1.2, [axis]: "0%" });
          currentSlideID = nextSlideID;
          gsap.delayedCall(PAUSE, play);
        }
      }
    );
  }

  gsap.delayedCall(PAUSE, play);
}

// Initialize autoplay and start progress bar
startProgress();
autoplaySwiper(".cc-hero-swiper-left", "100%", "left", "x");
autoplaySwiper(".cc-hero-swiper-right", "-100%", "right", "x");
autoplaySwiper(".cc-hero-swiper-center", "-100%", "bottom", "y");
