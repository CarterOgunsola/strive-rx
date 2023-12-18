// Get video elements
var video = document.getElementById("my-video");
var videoPreview = document.getElementById("my-video-preview");
var isPaused = false; // Track whether the video is paused

// Function to play the video
function playVideo() {
  if (isPaused) {
    video.currentTime = storedTime; // Resume from the stored time
  }
  video.play();
  isPaused = false;
}

// Function to pause the video
function pauseVideo() {
  video.pause();
  storedTime = video.currentTime; // Store the current time
  isPaused = true;
}

// Function to unmute and play the video
function unmuteAndPlay() {
  video.muted = false;
  playVideo();

  // Check if the screen width is less than or equal to 768px (adjust as needed)
  if (window.innerWidth <= 768) {
    video.removeAttribute("playsinline"); // Remove the playsinline attribute
    video.requestFullscreen(); // Enter full-screen mode on mobile
  }
}

// Find the "my-video-preview" video element
var videoPreviewElement = document.getElementById("my-video-preview");

// Add event listeners for your custom controls
document
  .querySelector("[vimeo=unmute]")
  .addEventListener("click", unmuteAndPlay);
document.querySelector("[vimeo=play]").addEventListener("click", playVideo);
document.querySelector("[vimeo=pause]").addEventListener("click", pauseVideo);

