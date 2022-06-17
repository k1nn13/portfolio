/*
  Data and machine learning for creative practice
  Week 5
  Pose estimation with webcam

-------------------------------------------------------------------------
|  Title: 'Substance D'                                                 |
|  based on the novel by Philip K Dick, 'A Scanner Darkly' (1977).      |
|                                                                       |
|  This animation, references the 'scramble suit' from the novel.       |
|  This suit gives the impression of seeing a person                    |
|  but unable to focus on them.                                         |
-------------------------------------------------------------------------
|  Instructions:                                                        |
|  1. press 'enter' to change modes                                     |
|       mode(0) = Introduction                                          |
|       mode(1) = Test position (about 2 meters away from web-cam)      |
|       mode(2) = particle mode                                         |
|       mode(3) = particle mode and fire will appear from hands         |
|                 when hands are above (width/2)                        |
|       mode(4) = resets to mode(0)                                     |
|                                                                       |
|  2. slider 1 (left, applies maximum speed to particles)               |
|     slider 2 (right, applies maximum force to particles)              |
|                                                                       |
-------------------------------------------------------------------------
|                                                                       |
|  note: the code has been modified from class & reference material     |
|                                                                       |
|                                                                       |
|  references:                                                          |
|    particle system and emitter :                                      |
|    https://editor.p5js.org/codingtrain/sketches/YqAxA5CYy             |
|                                                                       |
|    particle seek:                                                     |
|    https://editor.p5js.org/codingtrain/sketches/AxuChwlgb             |
|                                                                       |
-------------------------------------------------------------------------
*/

let video,
    poseNet,
    poses = [];

let mode = 0;

let v0;

let r, b, y;

let e1, e2;

let maxSpeed, maxForce;

let speedSlider, forceSlider;

let cl = false;
let canvas;
//--------------------SETUP--------------------------------
//--------------------------------------------------------
function setup() {

  canvas = createCanvas(1080, 720);
  canvas.parent("sketch-container-posenet");
  // load the webcam, use the cameraReady() callback
  video = createCapture(VIDEO, cameraReady);
  video.size(width, height);

  //setup Vehicles
  //--
  v0 = new Vehicle();
  v1 = new Vehicle();
  v2 = new Vehicle();
  v3 = new Vehicle();
  v4 = new Vehicle();
  v5 = new Vehicle();
  v6 = new Vehicle();
  v7 = new Vehicle();
  v8 = new Vehicle();
  v9 = new Vehicle();
  v10 = new Vehicle();
  v11 = new Vehicle();
  v12 = new Vehicle();
  v13 = new Vehicle();
  v14 = new Vehicle();
  v15 = new Vehicle();
  v16 = new Vehicle();
  v17 = new Vehicle();
  v18 = new Vehicle();
  v19 = new Vehicle();
  v20 = new Vehicle();
  v21 = new Vehicle();
  //--

  //setup particle system
  e1 = new Emitter(20, 20);
  e2 = new Emitter(width - 20, 20);

  speedSlider = createSlider(0.1, 10, 0.4, 0.1);
  speedSlider.position(10, height + 200);
  forceSlider = createSlider(0.1, 5, 1, 0.01)
  forceSlider.position(200, height + 200);
}

//---------------------DRAW-------------------------------
//--------------------------------------------------------
function draw() {
  //image(video, 0, 0, width, height); //draw the video to the screen
  // We can call both functions to draw all keypoints and the skeletons

  maxSpeed = speedSlider.value();
  maxForce = forceSlider.value();

  r = color(255, 0, 0);
  b = color(0, 0, 255);
  y = color(255, 255, 0);


  //switch between testing (mode 0) and display (mode 1)
  switch (mode) {
    case 0:
      //intro
      background(0);
      push();
        fill(255, 50);
        stroke(255, 0, 0);
        textAlign(CENTER);
        textSize(30);
       // text('Welcome to', width/2, height/2 - 40)
        text('Substance D..', width/2, height/2)
        textSize(20);
        text('press enter to continue....', width/2, height-20)
      pop();

      break;
    case 1:
      cl = false;
      //debug mode
      background(0);
      drawKeypoints();
      drawSkeleton();
      push();
        fill(255, 50);
        stroke(255, 0, 0);
        textAlign(CENTER);
        textSize(30);
        text('Frame the whole body then..', width/2, height-50)
        textSize(20);
        text('press enter to continue....', width/2, height-20)
      pop();

      break;
    case 2:

      if (cl == false) {
        clear();
        cl = true;
      } else {
        //play mode 1
        background(0, 50);
        drawVehicles();
      }

      break;
    case 3:
      //play mode 2
      background(0, 20);
      drawVehicles();
      drawParticles();
      break;
    default:


  }
}




//---------------CUSTOM-DRAW-FUNCTIONS--------------------
//--------------------------------------------------------
//draws vehicle class and sets start position and Target
function drawVehicles() {

  for (let this_pose of poses) {
    let pose = this_pose.pose;
      for (let keypoint of pose.keypoints) {
        // if we are confident of keypoint we draw it
        if (keypoint.score > 0.8) {

          //face

          //nose to right eye
          v0.setStartPos(0);
          v0.display(r);
          v0.seek(v0.setTarget(1));
          v0.update();
          v0.setForce(maxSpeed, maxForce);

          //nose to left eye
          v1.setStartPos(0);
          v1.display(r);
          v1.seek(v1.setTarget(2));
          v1.update();
          v1.setForce(maxSpeed, maxForce);

          //right eye to left eye
          v2.setStartPos(1);
          v2.display(b);
          v2.seek(v2.setTarget(2));
          v2.update();
          v2.setForce(maxSpeed, maxForce);

          //left eye to right eye
          v3.setStartPos(2);
          v3.display(b);
          v3.seek(v3.setTarget(1));
          v3.update();
          v3.setForce(maxSpeed, maxForce);


          //right eye to right ear
          v4.setStartPos(1);
          v4.display(b);
          v4.seek(v4.setTarget(3));
          v4.update();
          v4.setForce(maxSpeed, maxForce);

          //right ear to nose
          v5.setStartPos(3);
          v5.display(y);
          v5.seek(v5.setTarget(0));
          v5.update();
          v5.setForce(maxSpeed, maxForce);

          //left eye to left ear
          v6.setStartPos(2);
          v6.display(b);
          v6.seek(v6.setTarget(4));
          v6.update();
          v6.setForce(maxSpeed, maxForce);

          //left ear to nose
          v7.setStartPos(4);
          v7.display(y);
          v7.seek(v7.setTarget(0));
          v7.update();
          v7.setForce(maxSpeed, maxForce);

          //------------------------------//
          //body

          //right shoulder to left shoulder
          v8.setStartPos(5);
          v8.display(b);
          v8.seek(v8.setTarget(6));
          v8.update();
          v8.setForce(maxSpeed, maxForce);

          //left shoulder to right shoulder
          v9.setStartPos(6);
          v9.display(b);
          v9.seek(v9.setTarget(5));
          v9.update();
          v9.setForce(maxSpeed, maxForce);
          //---------------------------

          //left shoulder to left elbow
          v10.setStartPos(6);
          v10.display(b);
          v10.seek(v10.setTarget(8));
          v10.update();
          v10.setForce(maxSpeed, maxForce);


          //right shoulder to right elbow
          v11.setStartPos(5);
          v11.display(b);
          v11.seek(v11.setTarget(7));
          v11.update();
          v11.setForce(maxSpeed, maxForce);

          //-----------------------------

          //left elbow to left wrist
          v12.setStartPos(8);
          v12.display(b);
          v12.seek(v12.setTarget(10));
          v12.update();
          v12.setForce(maxSpeed, maxForce);


          //right elbow to right wrist
          v13.setStartPos(7);
          v13.display(b);
          v13.seek(v13.setTarget(9));
          v13.update();
          v13.setForce(maxSpeed, maxForce);


          //---------------------------

          //left shoulder to left hip
          v14.setStartPos(6);
          v14.display(b);
          v14.seek(v14.setTarget(12));
          v14.update();
          v14.setForce(maxSpeed, maxForce);


          //right shoulder to right hip
          v15.setStartPos(5);
          v15.display();
          v15.seek(v15.setTarget(11));
          v15.update();
          v15.setForce(maxSpeed, maxForce);

          //---------------------------

          //left hip to right hip
          v16.setStartPos(12);
          v16.display(b);
          v16.seek(v16.setTarget(11));
          v16.update();
          v16.setForce(maxSpeed, maxForce);


          //right hip to left hip
          v17.setStartPos(11);
          v17.display(b);
          v17.seek(v17.setTarget(12));
          v17.update();
          v17.setForce(maxSpeed, maxForce);

          //left hip to left knee
          v18.setStartPos(12);
          v18.display(b);
          v18.seek(v18.setTarget(14));
          v18.update();
          v18.setForce(maxSpeed, maxForce);


          //right hip right knee
          v19.setStartPos(11);
          v19.display(b);
          v19.seek(v19.setTarget(13));
          v19.update();
          v19.setForce(maxSpeed, maxForce);

          //right hip right knee
          v20.setStartPos(13);
          v20.display(b);
          v20.seek(v20.setTarget(15));
          v20.update();
          v20.setForce(maxSpeed, maxForce);


          //right hip right knee
          v21.setStartPos(14);
          v21.display(b);
          v21.seek(v21.setTarget(16));
          v21.update();
          v21.setForce(maxSpeed, maxForce);

       }
     }
   }
}

//--------------------------------------------------------
// A function to draw particle system at hand position
function drawParticles() {
    for (let this_pose of poses) {
      let pose = this_pose.pose;
      for (let keypoint of pose.keypoints) {
        // if we are confident of keypoint we draw it
        if (keypoint.score > 0.8) {

          if(pose.keypoints[10].position.y < height/2) {
            e1.updatePosition(pose.keypoints[10].position)
            e1.emit(2);
            e1.show();
            e1.update();
          }

         if(pose.keypoints[9].position.y < height/2) {
            e2.updatePosition(pose.keypoints[9].position)
            e2.emit(2);
            e2.show();
            e2.update();
         }
        }
      }
    }
}

//--------------------------------------------------------
// A function to draw ellipses over the detected keypoints
function drawKeypoints()  {
  // Loop through all the poses detected

  for (let this_pose of poses) {
    let pose = this_pose.pose;
    //console.log(poses);
    for (let keypoint of pose.keypoints) {
      // if we are confident of keypoint we draw it
      if (keypoint.score > 0.2) {
        fill(255, 0, 0);
        noStroke();
        ellipse(keypoint.position.x,
                keypoint.position.y,
                10, 10);
      }
    }
  }
}

//--------------------------------------------------------
// A function to draw the skeletons
function drawSkeleton() {
  // Loop through all the skeletons detected
  for (let this_pose of poses) {
    let skeleton = this_pose.skeleton;

    for (let parts of skeleton) {
      let partA = parts[0];
      let partB = parts[1];
      stroke(255, 0, 0);
      line(partA.position.x, partA.position.y,
           partB.position.x, partB.position.y);
    }
  }
}




//-----------------KEY-PRESSED----------------------------
//--------------------------------------------------------
function keyPressed() {
  console.log(keyCode);
  //change between test mode and display mode
  if (keyCode == 13) {
    mode ++;
    if (mode > 3) {
      mode = 0;
    }
  }
}




//-----------------POSE-NET-SETUP-------------------------
//--------------------------------------------------------
function cameraReady(stream) {
  // Create a new poseNet method with a single detection
  poseNet = ml5.poseNet(video, 'single', modelReady);

  // .on() is an event listener
  poseNet.on('pose', detectedPose);

  // Hide the video element, and just show the canvas
  video.hide();
}

//--------------------------------------------------------
function detectedPose(results) {
  // we store the pose in the poses global variable
  poses = results;
}

//--------------------------------------------------------
function modelReady() {
  console.log("Model ready");
}
