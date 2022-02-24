const videoElement = document.getElementById('video')
const button = document.getElementById('button')

let awaitingPrompt = true

// Prompt to select media stream, pass to video element, then play
async function selectMediaStream () {
  try {
    const mediaStream = await navigator.mediaDevices.getDisplayMedia()
    if (mediaStream.active === true) {
      awaitingPrompt = false
    }
    videoElement.srcObject = mediaStream
    videoElement.onloadedmetadata = () => {
      videoElement.play()
    }
  } catch (error) {
    // Catch Error Here
    console.log('whoops, error here: ', error)
  }
}

// On Click To Start Button
button.addEventListener('click', async () => {
  console.log(navigator.geolocation);
  if (!awaitingPrompt) {
    // Disable Button
    button.disabled = true
    // Start Picture in Picture
    await videoElement.requestPictureInPicture()
    // Reset Button
    button.disabled = false
  } else {
    selectMediaStream()
  }
})

// On Leave Picture In Picture (Picture in Picture)
/* document.addEventListener("leavepictureinpicture", function(e) {
  awaitingPrompt = true;
}) */

// On Load
selectMediaStream()
