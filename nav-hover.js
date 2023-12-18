//Start Nav Hover Script//
// Import GSAP
//import { gsap } from "gsap";

$(document).ready(function () {
  // Reusable variables for attributes, classes, opacity, and animation settings
  const navLinkAttribute = "[data-link='nav']";
  const navLinkCurrentClass = ".w--current";
  const navLinkOpacityFull = 1;
  const navLinkOpacityPartial = 0.6;
  const navLinkAnimationDuration = 0.3;
  const navLinkAnimationEasing = "ease";

  // Function to set initial states
  const setInitialNavStates = () => {
    // Set all nav links to full opacity initially
    gsap.set(navLinkAttribute, { opacity: navLinkOpacityFull });
  };

  // Initialize states
  setInitialNavStates();

  // Hover state
  $(navLinkAttribute).hover(
    function () {
      // Hover in
      // Reduce opacity of all non-hovered links
      gsap.to($(navLinkAttribute).not(this), {
        opacity: navLinkOpacityPartial,
        duration: navLinkAnimationDuration,
        ease: navLinkAnimationEasing,
      });
      // Ensure current link stays at full opacity
      gsap.to(navLinkCurrentClass, {
        opacity: navLinkOpacityFull,
        duration: navLinkAnimationDuration,
        ease: navLinkAnimationEasing,
      });
    },
    function () {
      // Hover out
      // Set all links back to full opacity, except the current class
      gsap.to($(navLinkAttribute).not(navLinkCurrentClass), {
        opacity: navLinkOpacityFull,
        duration: navLinkAnimationDuration,
        ease: navLinkAnimationEasing,
      });
    },
  );
});

//End Nav Hover Script//
