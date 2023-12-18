// Define separate easing, duration, and delay constants
const easingDockerSlide = "power3.inOut";
const durationDockerSlide = 1; // in seconds
const delayDockerSlide = 0; // in seconds

const easingCloseButton = "Back.inOut";
const durationCloseButton = 0.5; // in seconds
const delayCloseButton = 0.5; // in seconds

const easingInfoCards = "power3.out";
const durationInfoCards = 0.8; // in seconds
const delayInfoCards = 0.7; // in seconds

const easingServiceCardHead = "power3.out";
const durationServiceCardHead = 0.8; // in seconds
const delayServiceCardHead = 0.6; // in seconds

// Function to open the docker slide
function openDocker(cardNumber) {
  const dockerSlide = document.querySelector(
    `.service-card-docker[data-docker="${cardNumber}"]`
  );
  const closeButton = dockerSlide.querySelector(
    `.close-service-docker[data-close-docker="${cardNumber}"]`
  );
  const infoCards = dockerSlide.querySelectorAll(
    `.service-info-card[data-info-card="${cardNumber}"]`
  );
  const serviceCardHead = dockerSlide.querySelector(
    `.service-card-head-sm[data-head="${cardNumber}"]`
  );

  // Animate docker slide into view with custom easing, duration, and delay
  gsap.to(dockerSlide, {
    x: "0%",
    duration: durationDockerSlide,
    ease: easingDockerSlide,
    delay: delayDockerSlide
  });
  gsap.fromTo(
    closeButton,
    { opacity: 0, x: "100%" },
    {
      opacity: 1,
      x: "0%",
      duration: durationCloseButton,
      ease: easingCloseButton,
      delay: delayCloseButton
    }
  );
  gsap.from(infoCards, {
    y: 70,
    opacity: 0,
    stagger: 0.1,
    duration: durationInfoCards,
    ease: easingInfoCards,
    delay: delayInfoCards
  });
  // Animate the service card header
  gsap.from(serviceCardHead, {
    y: 70,
    opacity: 0,
    duration: durationServiceCardHead,
    ease: easingServiceCardHead,
    delay: delayServiceCardHead
  });
}

// Function to close the docker slide
function closeDocker(cardNumber) {
  const dockerSlide = document.querySelector(
    `.service-card-docker[data-docker="${cardNumber}"]`
  );

  // Animate docker slide out of view with custom easing, duration, and delay
  gsap.to(dockerSlide, {
    x: "105%",
    duration: durationDockerSlide,
    ease: easingDockerSlide
  });
}

// Event listener for clicks on the document
document.addEventListener("click", function (event) {
  if (event.target.closest(".primary-button[data-open-docker]")) {
    const cardNumber = event.target
      .closest(".primary-button")
      .getAttribute("data-open-docker");
    openDocker(cardNumber);
  } else if (event.target.closest(".close-service-docker[data-close-docker]")) {
    const cardNumber = event.target
      .closest(".close-service-docker")
      .getAttribute("data-close-docker");
    closeDocker(cardNumber);
  }
});
