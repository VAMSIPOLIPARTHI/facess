// Use the following to include this JavaScript file 
// <script src="script1.js"></script>
document.addEventListener('DOMContentLoaded', async () => {
  const video = document.getElementById('video');
  const canvas = document.getElementById('canvas');
  const displaySize = { width: video.width, height: video.height };

  // Load models (you can add more models like face recognition or landmarks detection)
  await faceapi.nets.tinyFaceDetector.loadFromUri('/models');

  // Start video stream and get access to the webcam
  navigator.mediaDevices.getUserMedia({ video: {} })
    .then(stream => {
      video.srcObject = stream;
    })
    .catch(error => {
      console.error("Error accessing the
