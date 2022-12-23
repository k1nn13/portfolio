/*
-------------------------------------------------------------------------
|        Data and Machine Learning for Creative Practice                |
|                       Final Project                                   |
|                                                                       |
-------------------------------------------------------------------------
|  Instructions:                                                        |
|  1. press 'enter' to change modes                                     |
|       mode(0) = Introduction                                          |
|       mode(1) = Test position (about 2 meters away from web-cam)      |
|       mode(2) = Particle Man                                          |
|       mode(3) = Trails                                                |
|       mode(4) = Bezier Dancer                                         |
|       mode(5) = Cube Roots                                            |
|       mode(5) = Reset                                                 |
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
|    Bezeir Dancer modified code from:                                  |
|    https://www.youtube.com/watch?v=enNfb6p3j_g                        |
|                                                                       |
|    Cubed Roots modified code from:                                    |
|    https://www.youtube.com/watch?v=0v4_Dw0K8pw&list=RDCMUCEqc149iR-ALYkGM6TG-7vQ&start_radio=1
|                                                                       |
|    particle seek code modified from:                                  |
|    https://editor.p5js.org/codingtrain/sketches/AxuChwlgb             |
|                                                                       |
-------------------------------------------------------------------------
/*
  kEYPOINT LOCATIONS...
  0 = nose
  1 = right eye
  2 = left eye
  3 = right ear
  4 = left ear
  5 = right shoulder
  6 = left shoulder
  7 = right elbow
  8 = left elbow
  9 = right wrist
  10 = left wrist
  11 = right hip
  12 = left hip
  13 = right knee
  14 = left knee
  15 = right foot
  16 = left foot
*/

//------Ml5.js
let video,
    poseNet,
    poses = [];

//------Switch
let mode = 0; //select animation
let cl = false; //use to clear background

//------GUI
let maxSpeed, maxForce;
let speedSlider, forceSlider, eventSlider;

//------Particle Man
let v0;
let v = [];
let r, b, y;

//------Trails
let trail;//?
let trails = [];

//-----Bezier-effect
let bezParticles = [], cubicParticles_ = [], cubicParticles = [];
let cubicBezier_, cubicBezier; //left and right side

//------Root animation
let root, rootL, rootR;
let canavas;

//--------------------SETUP--------------------------------
//--------------------------------------------------------
function setup() {

  canvas = createCanvas(windowWidth, windowHeight);
  canvas.parent("sketch-container-posenetFinal");


  // load the webcam, use the cameraReady() callback
  video = createCapture(VIDEO, cameraReady);
  video.size(width, height);

  //set colour mode to HSB, this is (easier to animate)
  colorMode(HSB);

  //------------------------------------------
  //setup Vehicles (particle man)
  for (let i = 0; i < 22; i++) {
    v.push(new Vehicle());
  }

  //------------------------------------------
  //setup trails and push into an array
  for (let i = 0; i < 16; i++) {
      trails.push(new Trail(width/2, height/2));
  }

  //----------------------------------------
  //2 bezier curves for left and right side of body
  cubicBezier = new CubicBezier();
  cubicBezier_ = new CubicBezier();
  for (let i = 0; i < 4; i++) {
    cubicParticles.push(new BezParticle());
    cubicParticles_.push(new BezParticle());
  }

  //------------------------------------------
  //GUI
  speedSlider = createSlider(0.1, 20, 5, 0.1);
  speedSlider.position(10, height+200);
  forceSlider = createSlider(0.1, 5, 1, 0.01)
  forceSlider.position(200, height+200);

}


//---------------------DRAW-------------------------------
//--------------------------------------------------------
function draw() {

  //-Setup-GUI
  maxSpeed = speedSlider.value();
  maxForce = forceSlider.value();

  // switch between modes
  //----------------------------------------------------
  switch (mode) {
    case 0: //intro
      background(0);
      push();
        noStroke();
        fill(0, 255, 255, 50);
        textAlign(CENTER);
        textSize(30);
       // text('Welcome to', width/2, height/2 - 40)
        text('Final Project', width/2, height/2)
        textSize(20);
        text('press enter to continue....', width/2, height-100)
      pop();
      //--
      break;
    //----------------------------------------------------
    case 1: //debug mode
      background(0);
      push();
        drawKeypoints();
        drawSkeleton();
        noStroke();
        fill(0, 255, 255, 50);
        textAlign(CENTER);
        textSize(30);
        text('Frame the whole body then..', width/2, height-100)
        textSize(20);
        text('press enter to continue....', width/2, height-50)
      pop();
      //--
      break;
    //----------------------------------------------------
    case 2:  // particle man
        push();
          background(0);
          //adjust effects
          drawingContext.shadowOffsetX = 8;
          drawingContext.shadowOffsetY = 2;
          drawingContext.shadowColor = 'red';
          drawingContext.shadowBlur = 1;
          drawVehicles();
        pop();
      //--
      break;

   //---------------------Trails-Effect------------------------
   case 3:
      clearVehicles(); //clear arrays from particle man
      push();
        background(0);
        //adjust effects
        drawingContext.shadowOffsetX = 10;
        drawingContext.shadowOffsetY = 5;
        drawingContext.shadowColor = 'blue';
        drawingContext.shadowBlur = 1;
        for (let i = 0; i < trails.length; i++) {
          trails[i].update(i);
          trails[i].show();
        }
      pop();
      //--
      break;

    //------------------Bezier-Effect-------------------------
    case 4:

      clearTrails();// clear arrays from trails
      background(0);

      push();
      //turn off shadow color to improve performance
      drawingContext.shadowOffsetX = 0;
      drawingContext.shadowOffsetY = 0;
      drawingContext.shadowColor = 'black';
      drawingContext.shadowBlur = 0;
       //------------------------------------------------------

       // create particles to seek keypoint positions
       for (let i = 0; i < cubicParticles.length; i++) {
         // run update and force show for all particles
         //left side
         cubicParticles[i].update();
         cubicParticles[i].setForce(maxSpeed, maxForce);
         //right side
         cubicParticles_[i].update();
         cubicParticles_[i].setForce(maxSpeed, maxForce);

         //run to view location points
         // cubicParticles[i].display(); //debug
         // cubicParticles_[i].display(); //debug
       }

        //-------------------------------------------------
        //left side
        cubicParticles[0].seek(cubicParticles[0].setTarget(16));
        cubicParticles[1].seek(cubicParticles[1].setTarget(12));
        cubicParticles[2].seek(cubicParticles[2].setTarget(3));
        cubicParticles[3].seek(cubicParticles[3].setTarget(10));

        //set position of quad bezier to particle to create smooth movement
        cubicBezier.p0 = cubicParticles[0].pos
        cubicBezier.p1 = cubicParticles[1].pos
        cubicBezier.p2 = cubicParticles[2].pos
        cubicBezier.p3 = cubicParticles[3].pos
        cubicBezier.show();
        cubicBezier.update();

       //-------------------------------------------------
       //right side
       cubicParticles_[0].seek(cubicParticles_[0].setTarget(15));
       cubicParticles_[1].seek(cubicParticles_[1].setTarget(11));
       cubicParticles_[2].seek(cubicParticles_[2].setTarget(2));
       cubicParticles_[3].seek(cubicParticles_[3].setTarget(9));

       // set position of quad bezier to particle to create smooth movement
       cubicBezier_.p0 = cubicParticles_[0].pos
       cubicBezier_.p1 = cubicParticles_[1].pos
       cubicBezier_.p2 = cubicParticles_[2].pos
       cubicBezier_.p3 = cubicParticles_[3].pos
       cubicBezier_.show();
       cubicBezier_.update();

       pop();

      break;
      //--

      //------------------------------------------------------
      case 5:
        clearBezier();

        push();
          background(0);
          //create particles to smoothly seek keypoint positions
          cubicParticles[0].seek(cubicParticles[0].setTarget(0));
          cubicParticles[0].update();
          cubicParticles[0].setForce(maxSpeed, maxForce);

          cubicParticles[1].seek(cubicParticles[1].setTarget(9));
          cubicParticles[1].update();
          cubicParticles[1].setForce(maxSpeed, maxForce);

          cubicParticles[2].seek(cubicParticles[2].setTarget(10));
          cubicParticles[2].update();
          cubicParticles[2].setForce(maxSpeed, maxForce);

          //callback to trigger root animation
          setTimeout(startRoot, 24);

        pop();

      break;
      //--

      //------------------------------------------------------
      case 6:

      background(0);
      clearRootArray();

      break;
    default:
    //End-of-Switch
  }
}



//-------------------------------------------//
//---------------CLEAR-ARRAYS----------------//
//-------------------------------------------//
function clearVehicles() {
  cl = true;
  if (cl == true) {
    for (let i = 0; i < v.length; i++) {
      v[i].clearArray();

      //debug - check array has been cleared
      //console.log('Vehicles Cleared: ' + v[0].history.length)
    }
  }
  cl = false;
}
//-------------------------------------------//
function clearTrails() {
  cl = true;
  if (cl == true) {
    for (let i = 0; i < trails.length; i++) {
      trails[i].clearArray();

      //debug - check array has been cleared
      //console.log('Trails cleared: ' + trails[0].history.length)
    }
  }
  cl = false;
}
//-------------------------------------------//
function clearBezier() {
  cl = true;
  if (cl == true) {
      cubicBezier.clearArray();
      cubicBezier_.clearArray();

      //debug - check array has been cleared
      //console.log('Bezier cleared: ' + cubicBezier.history_p0.length);
  }
  cl = false;
}
//-------------------------------------------//
function clearRootArray() {
  cl = true;
  if (cl == true) {
    root.clearRootArray();
    rootL.clearRootArray();
    rootR.clearRootArray();

    //debug - check array has been cleared
    //console.log('root xPos array: ' + root.hX.length);
  }
  cl = false;
}


//--------------------------------------------------------
//---------------CUSTOM-DRAW-FUNCTIONS--------------------
//--------------------------------------------------------

//-------------------------------------------//
//function to draw root animation
function startRoot() {
    for (let i = 0; i < 1; i++) {
      root = new Root(cubicParticles[0].pos.x,
                            cubicParticles[0].pos.y);
      root.update();


      rootL = new Root(cubicParticles[1].pos.x,
                            cubicParticles[1].pos.y);
      rootL.update();

      rootR = new Root(cubicParticles[2].pos.x,
                            cubicParticles[2].pos.y);
      rootR.update();
    }
}

//-------------------------------------------//
//draws vehicle class and sets start position and Target
function drawVehicles() {

          //------------------------------//
          for (let i = 0; i < v.length; i++) {
            v[i].update();
            v[i].setForce(maxSpeed, maxForce);
          }

          //nose to right eye
          v[0].setStartPos(0);
          v[0].display('r');
          v[0].seek(v[0].setTarget(1));

          //nose to left eye
          v[1].setStartPos(0);
          v[1].display('r');
          v[1].seek(v[1].setTarget(2));

          //right eye to left eye
          v[2].setStartPos(1);
          v[2].display('b');
          v[2].seek(v[2].setTarget(2));

          //left eye to right eye
          v[3].setStartPos(2);
          v[3].display('b');
          v[3].seek(v[3].setTarget(1));

          //right eye to right ear
          v[4].setStartPos(1);
          v[4].display('b');
          v[4].seek(v[4].setTarget(3));

          //right ear to nose
          v[5].setStartPos(3);
          v[5].display('y');
          v[5].seek(v[5].setTarget(0));

          //left eye to left ear
          v[6].setStartPos(2);
          v[6].display('b');
          v[6].seek(v[6].setTarget(4));

          //left ear to nose
          v[7].setStartPos(4);
          v[7].display('y');
          v[7].seek(v[7].setTarget(0));
          //------------------------------//
          //------------------------------//
          //body
          //right shoulder to left shoulder
          v[8].setStartPos(5);
          v[8].display('b');
          v[8].seek(v[8].setTarget(6));

          //left shoulder to right shoulder
          v[9].setStartPos(6);
          v[9].display('b');
          v[9].seek(v[9].setTarget(5));
          //---------------------------

          //left shoulder to left elbow
          v[10].setStartPos(6);
          v[10].display('b');
          v[10].seek(v[10].setTarget(8));

          //right shoulder to right elbow
          v[11].setStartPos(5);
          v[11].display('b');
          v[11].seek(v[11].setTarget(7));

          //-----------------------------
          //left elbow to left wrist
          v[12].setStartPos(8);
          v[12].display('b');
          v[12].seek(v[12].setTarget(10));

          //right elbow to right wrist
          v[13].setStartPos(7);
          v[13].display('b');
          v[13].seek(v[13].setTarget(9));

          //---------------------------
          //left shoulder to left hip
          v[14].setStartPos(6);
          v[14].display('b');
          v[14].seek(v[14].setTarget(12));

          //right shoulder to right hip
          v[15].setStartPos(5);
          v[15].display('b');
          v[15].seek(v[15].setTarget(11));

          //---------------------------
          //left hip to right hip
          v[16].setStartPos(12);
          v[16].display('b');
          v[16].seek(v[16].setTarget(11));

          //right hip to left hip
          v[17].setStartPos(11);
          v[17].display('b');
          v[17].seek(v[17].setTarget(12));

          //left hip to left knee
          v[18].setStartPos(12);
          v[18].display('b');
          v[18].seek(v[18].setTarget(14));

          //right hip right knee
          v[19].setStartPos(11);
          v[19].display('b');
          v[19].seek(v[19].setTarget(13));

          //right hip right foot
          v[20].setStartPos(13);
          v[20].display('b');
          v[20].seek(v[20].setTarget(15));

          //left hip right foot
          v[21].setStartPos(14);
          v[21].display('b');
          v[21].seek(v[21].setTarget(16));

}

//--------------------------------------------------------
// A function to draw ellipses over the detected keypoints
function drawKeypoints()  {
  // Loop through all the poses detected

  for (let this_pose of poses) {
    let pose = this_pose.pose;
    for (let keypoint of pose.keypoints) {
      // if we are confident of keypoint we draw it
      if (keypoint.score > 0.2) {
        fill(0, 255, 255);
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
      stroke(0, 255, 255);
      line(partA.position.x, partA.position.y,
           partB.position.x, partB.position.y);
    }
  }
}

//--------------------------------------------------------
//-----------------KEY-PRESSED----------------------------
//--------------------------------------------------------
function keyPressed() {
  //console.log(keyCode);
  //press enter to change animation

  if (keyCode == 13) {
    mode ++;
    if (mode > 6) {
      mode = 0;
    }
  }
}

//--------------------------------------------------------
//-----------------POSE-NET-SETUP-------------------------
//--------------------------------------------------------
//code from class example used for testing position on screen
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
