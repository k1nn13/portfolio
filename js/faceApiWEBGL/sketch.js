/*
  Data and machine learning for artistic practice
  Week 3
  Facial detection on a webcam

  'Behind The Mask' - 3D animation mapped to facial position

  Inspired by MF Doom : 'https://www.youtube.com/watch?v=kHBHDWpK1yo'

  there is a sweet spot with lighting and camera position for best the results
  and minimal flickering (for me its further from the camera).
  Use the keys to zoom in and position

  controls:
  up / down arrow change camera z position
  left / right arrow change camera x position

  references:
  shader from tutorial:
  'https://itp-xstory.github.io/p5js-shaders/#/./docs/examples/shaders_to_shapes'
*/

//detections
let faceapi,
    video,
    detections;
//camera position
let camX = 0;
let camY = 0;
let camZ = 0;
//shader
let shader1;
let shaderTexture
let face;

//-------------------------------------------------------------------
function preload(){
  //load the shader
  shader1 = loadShader('../js/faceApiWEBGL/shader1.vert', '../js/faceApiWEBGL/shader1.frag');
}

//-------------------------------------------------------------------
// these are our options for detecting faces, provided by ml5.js
const detection_options = {
    withLandmarks: true,
    withDescriptors: false,
}

//-------------------------------------------------------------------
function setup() {
  createCanvas(windowWidth, windowHeight, WEBGL); // I use these to downsize a 720p stream, but you can adjust for your webcam if it skews it.


  shaderTexture = createGraphics(windowWidth, windowHeight, WEBGL);
  shaderTexture.noStroke();


  // ask for webcam access - with webcamReady() callback for when we have access
  video = createCapture(VIDEO, webcamReady);
  video.size(width, height); // set size to be equal to canvas
  video.hide(); // hide DOM element

  textureMode(NORMAL); // this enabled me to add texture to custom shapes it is also necessary to add vertex normals

  face = new Face(-width/2, -height/2);

}

//-------------------------------------------------------------------
function webcamReady(stream) {
  // load the faceapi model - with modelReady() callback
  // - NOTE: this time we provide video as the first parameter
  faceapi = ml5.faceApi(video, detection_options, modelReady)
}

//-------------------------------------------------------------------
function draw() {

  //----------Shader-Setup----------//
  // instead of just setting the active shader we are passing it to the createGraphics layer
  shaderTexture.shader(shader1);
  // here we're using setUniform() to send our uniform values to the shader
  shader1.setUniform("u_resolution", [5000, 5000]);
  shader1.setUniform("u_time", millis() / 200.0);
  // passing the shaderTexture layer geometry to render on
  shaderTexture.rect(0,0,width,height);
  //--------------------------------//
  background(0);

  //setup camera
  camera(camX, 0, camY +  (height/2) / tan(PI/6), 0, 0, 0, 0, 1, 0);
  noStroke();

  // if we have detections, draw them on the image
  if (detections) {
    // when we call detect, we are looking for potentially multiple faces, so ml5.js returns an array of objects, therefore here we use a for loop to get each 'person'.
    for (let person of detections) {

      //this is where I draw the face
      //draw 3d face
      for (let i = 0; i < 4; i++) {
        face.browToEye(person, i, i + 1);
      }

      for (let i = 0; i < 3; i++) {
        face.eyeToBrow(person, i, i + 1);
      }

      face.forehead(person);
      face.nose(person);
      face.noseToMouth(person);
      face.mouth(person);

    }
  }
}

//-------------------------------------------------------------------
function keyPressed() {
  //camera controls
  if (keyCode === LEFT_ARROW) {
    camX += 20;
  }

  if (keyCode === RIGHT_ARROW) {
   camX -= 20;
  }

  if (keyCode === UP_ARROW) {
    camY -= 20
  }

  if (keyCode === DOWN_ARROW) {
    camY += 20;
  }


}

//-------------------------------------------------------------------
// callback for when ml5.js has loaded the model
function modelReady() {
  console.log("Model is ready...");

  // ask ml5 to detect a faces in the video stream previously provided - gotResults() callback
  faceapi.detect(gotResults);
}

//-------------------------------------------------------------------
// ml5.js has determined if there's a face
function gotResults(err, result) {
    // check if ml5.js returned an error - if so print to console and stop
    if (err) {
        console.log(err)
        return
    }

    // if it gets here we are okay, so store results in the detections variable, this is an OBJECT of detections - see the console
    //console.log(result);
    detections = result;

    // we recursively call face detect
    faceapi.detect(gotResults)
}

//-------------------------------------------------------------------
