// Assuming GSAP is already loaded on the page; if not, import it
// import { gsap } from "gsap";

let photoSwiper = new Swiper(".swiper.is-photos", {
  effect: "fade",
  fadeEffect: {
    crossFade: true
  },
  speed: 500,
  grabCursor: true,
  loop: true,
  keyboard: true,
  autoplay: {
    delay: 6000,
    disableOnInteraction: false
  },
  navigation: {
    nextEl: ".arrow.is-right",
    prevEl: ".arrow.is-left"
  },
  pagination: {
    el: ".home-story-pagination",
    clickable: true,
    dynamicBullets: false
  },
  on: {
    init: function () {
      // Initialize bullets
      let bullets = document.querySelectorAll(
        ".home-story-pagination .swiper-pagination-bullet"
      );
      bullets.forEach((bullet) => {
        if (bullet) {
          let progressDiv = document.createElement("div");
          progressDiv.className = "home-story-pagination-progress";
          bullet.appendChild(progressDiv);
        }
      });

      // Initialize progress bar for the first slide
      let firstBullet = document.querySelector(
        ".home-story-pagination .swiper-pagination-bullet"
      );
      let firstProgressDiv = firstBullet
        ? firstBullet.querySelector(".home-story-pagination-progress")
        : null;
      if (firstProgressDiv) {
        gsap.set(firstProgressDiv, { opacity: 1, width: "0%" });
        gsap.to(firstProgressDiv, { width: "100%", duration: 4 });
      }
    },
    slideChangeTransitionStart: function () {
      let bullets = document.querySelectorAll(
        ".home-story-pagination .swiper-pagination-bullet"
      );
      bullets.forEach((bullet) => {
        let progressDiv = bullet
          ? bullet.querySelector(".home-story-pagination-progress")
          : null;
        if (progressDiv) {
          gsap.set(progressDiv, { width: "0%" }); // Reset width to 0% for all progress divs
        }
      });

      let activeIndex = this.realIndex;
      bullets.forEach((bullet, index) => {
        let progressDiv = bullet
          ? bullet.querySelector(".home-story-pagination-progress")
          : null;
        if (progressDiv) {
          gsap.to(progressDiv, {
            opacity: index === activeIndex ? 1 : 0,
            duration: 0.2
          });
        }
      });
    },
    slideChangeTransitionEnd: function () {
      let activeIndex = this.realIndex;
      let bullets = document.querySelectorAll(
        ".home-story-pagination .swiper-pagination-bullet"
      );
      if (bullets[activeIndex]) {
        let progressDiv = bullets[activeIndex].querySelector(
          ".home-story-pagination-progress"
        );
        if (progressDiv) {
          gsap.to(progressDiv, { width: "100%", duration: 4 });
        }
      }
    }
  }
});

let contentSwiper = new Swiper(".swiper.is-content", {
  speed: 50,
  loop: true,
  followFinger: false,
  effect: "fade",
  fadeEffect: {
    crossFade: true
  },
  on: {
    slideChangeTransitionStart: function () {
      // Your previous code here if any

      // GSAP animation for the head
      let heads = document.querySelectorAll(".home-story-head");
      if (heads.length > 0) {
        gsap.fromTo(
          heads,
          { y: "50%", opacity: 0 },
          { y: "0%", opacity: 1, duration: 0.8, ease: "power2.inOut" }
        );
      }

      // GSAP animation for the paragraph, staggered by 0.3s after the heads
      let pgs = document.querySelectorAll(".home-story-pg");
      if (pgs.length > 0) {
        gsap.fromTo(
          pgs,
          { y: "50%", opacity: 0 },
          {
            y: "0%",
            opacity: 1,
            duration: 0.8,
            ease: "power2.inOut",
            delay: 0.1
          }
        );
      }
    }
  }
});

photoSwiper.controller.control = contentSwiper;
contentSwiper.controller.control = photoSwiper;
