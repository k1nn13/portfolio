// MAKE FULL SCREEN, REFRESH & CLICK MOUSE PROMPTLY TO PLAY AUDIO!! ENJOY...

// reference to code used
// [1], CUBE WAVE MOTION, Coding Challenge #86: Cube Wave by Bees and Bombs
// DANIEL SHIFFMAN, https://www.youtube.com/watch?v=H81Tdrmz2LA

// original music by philip kinshuck


//---AUDIO-SETUP--//
let graph = [];
let amp;
let vol;
//----------------//
let input = 0;    // increment and use for rotation
//----------------//

// code used from code train example see [1] at top
// variables for CUBE WAVE MOTION [1]
let angle = 0;
let ma;
let maxD;

//-----------------------KEY-FRAMES---------------------------//
var keyFrame1  = { x: 0,    y: 0,    z: 3050,  f: 0,    exp: 80  };
var keyFrame2  = { x: 250,  y: 100,  z: 200,   f: 360,  exp: 1   };
var keyFrame3  = { x: 140,  y: 0,    z: -800,  f: 420,  exp: 8   };
var keyFrame4  = { x: -200, y: 300,  z: 200,   f: 500,  exp: 2   };
var keyFrame5  = { x: 0,    y: 0,    z: 200,   f: 800,  exp: 1   };
var keyFrame6  = { x: 0,    y: -200, z: 50,    f: 1000, exp: 0.9 };
var keyFrame7  = { x: 0,    y: 400,  z: 200,   f: 1350, exp: 20  };
var keyFrame8  = { x: -200, y: 200,  z: 200,   f: 1500, exp: 1.3 };
var keyFrame9  = { x: -100, y: 200,  z: 100,   f: 1550, exp: 0.5 };
var keyFrame10 = { x: 0,    y: 300,  z: 10,    f: 1600, exp: 10  };
var keyFrame11 = { x: -200, y: 300,  z: 200,   f: 1750, exp: 1.5 };
var keyFrame12 = { x: 0,    y: -300, z: 100,   f: 1800, exp: 1   };
var keyFrame13 = { x: 100,  y: 0,    z: 250,   f: 1850, exp: 5   };
var keyFrame14 = { x: 100,  y: -200, z: 350,   f: 1900, exp: 2   };
var keyFrame15 = { x: -500, y: 40,   z: 150,   f: 2000, exp: 1   };
var keyFrame16 = { x: 100,  y: 40,   z: 250,   f: 2050, exp: 1.5 };
var keyFrame17 = { x: -100, y: 200,  z: 150,   f: 2100, exp: 1   };
var keyFrame18 = { x: 100,  y: -240, z: 1050,  f: 2150, exp: 80 };
var keyFrame19 = { x: 300,  y: 40,   z: 50,    f: 2210, exp: 0.5 };
var keyFrame20 = { x: -400, y: 40,   z: 250,   f: 2350, exp: 1.5 };
var keyFrame21 = { x: 100,  y: 240,  z: 150,   f: 3000, exp: 1.5 };

//------------------------------------------------------------//
let frameArrayX   = []; //camera x position
let frameArrayY   = []; //camera y position
let frameArrayZ   = []; //camera z position
let frameArrayExp = []; //cube expand amount array
//------------------------------------------------------------//

let canvas;
//---------------//
//---PRE-LOAD----//
//---------------//

function preload() {

  //---------------LOAD-AUDIO-HERE-------------------------//
  //original music created by philip kinshuck

  // song = loadSound("../js/cubeWEBGL/assets/waves.mp3"); // animation mapped to this song
  song = loadSound("../js/cubeWEBGL/assets/monologu3.wav"); // alternative soundtrack (house beat)

  //-------------------------------------------------------//

}


function windowResized()
{
  resizeCanvas(windowWidth, windowHeight);
}

//---------------//
//-----SETUP-----//
//---------------//

function setup() {

  //create canvas in 3D
  canvas = createCanvas(1024, 600, WEBGL);
  canvas.parent("sketch-container-cubeWEBGL");

  //---------AUDIO SETUP---------//
  song.play();                   //play song
  amp = new p5.Amplitude();      //set amplitude to variable
  //-----------------------------//

  frameRate(24);                 //set frame rate here

  //--CALL-TWEEN-FRAMES-FUNCTION--//
  //this will create the position of the camera and expand amount
  tweenFrames(keyFrame1,  keyFrame2);
  tweenFrames(keyFrame2,  keyFrame3);
  tweenFrames(keyFrame3,  keyFrame4);
  tweenFrames(keyFrame4,  keyFrame5);
  tweenFrames(keyFrame5,  keyFrame6);
  tweenFrames(keyFrame6,  keyFrame7);
  tweenFrames(keyFrame7,  keyFrame8);
  tweenFrames(keyFrame8,  keyFrame9);
  tweenFrames(keyFrame9,  keyFrame10);
  tweenFrames(keyFrame10, keyFrame11);
  tweenFrames(keyFrame11, keyFrame12);
  tweenFrames(keyFrame12, keyFrame13);
  tweenFrames(keyFrame13, keyFrame14);
  tweenFrames(keyFrame14, keyFrame15);
  tweenFrames(keyFrame15, keyFrame16);
  tweenFrames(keyFrame16, keyFrame17);
  tweenFrames(keyFrame17, keyFrame18);
  tweenFrames(keyFrame18, keyFrame19);
  tweenFrames(keyFrame19, keyFrame20);
  tweenFrames(keyFrame20, keyFrame21);
  //------------------------------//

  //CUBE WAVE MOTION - see reference at top [1]
  ma = atan(1/sqrt(2));
  maxD = dist(0, 0, 200, 200);
  //------------------------------//

}

//--------------//
//-----DRAW-----//
//--------------//

function draw() {

  background(0);

  //------------------------------------------------------//
  let vol = amp.getLevel(); //setup vol and graph amplitude
  graph.push(vol);          //fill array with amplitude levels
  //------------------------------------------------------//

  //----ANIMATE-CAMERA-POSITION------//
  //animate camera posiion from keyframes

  let frame = (frameCount % 3000); //set framecount

  // camera postions (x, y, z), moves through the frame array using frame count
  camera(frameArrayX[frame], frameArrayY[frame], frameArrayZ[frame], //cam position
     0, 0, 0,  //cam look at
     0, 1, 0); // which way is up point left, "up" , right

  //------------------------------------------------------//

  //---------the main animation is called here------------//

  // with reference to frame array to animate cube position (expanding effect)
  cube3D(frameArrayExp[frame]);

  // used to check perspective and position when creating animation (debug)
  //crossProduct();

  //------------------------------------------------------//

  input += 0.01; //use to rotate cube

  //------------------------------------------------------//

}

//------------------------------//
//---------TWEEN-FRAMES---------//
//------------------------------//

// code from lab 5 perception and multimedia

function tweenFrames(key1, key2){

  let frameDiff = key2.f - key1.f;//work out frame difference

  //push coordinates into an array x, y, z and size (s)
  //will be used to control camera position and size of cube

  for (var i = 0; i <= frameDiff; i++) {
    frameArrayX.push((lerp(key1.x, key2.x, i / frameDiff)));//x co-ordinate
    frameArrayY.push((lerp(key1.y, key2.y, i / frameDiff)));//y co-ordinate
    frameArrayZ.push((lerp(key1.z, key2.z, i / frameDiff)));//z co-ordinate

    frameArrayExp.push((lerp(key1.exp, key2.exp, i / frameDiff)));//expand amount
  }

}

//---------------//
//----CUBE-3D----//
//---------------//

function cube3D(exp){

  let w = 10; //width of box

     for (let z = 0; z < graph.length; z += w) {
      for (let y = 0; y < graph.length; y += w) {
        for (let x = 0; x < graph.length; x += w) {

          push();
          rotate(input);  //rotation of cube here
          rotateY(input);
          //-----------------------------------------------------------------//

          //map amplitude to colour to effect light and material X axis
          let graphRedX = map(graph[x], 0, 0.2, 0, 0.1);
          let graphGreenX = map(graph[x], 0, 0.2, 0, 2.5);
          let graphBlueX = map(graph[x], 0, 0.2, 0, 0.1);
          //-----------------------------------------------------------------//
          //map amplitude to colour to effect light and material Y axis
          let graphRedY = map(graph[y], 0, 0.2, 1.5, 0);
          let graphGreenY = map(graph[y], 0, 0.2, 0, 0.1);
          let graphBlueY = map(graph[y], 0, 0.2, 0, 2.5);
          //-----------------------------------------------------------------//
          //map amplitude to colour to effect light and material Z axis
          let graphRedZ = map(graph[z], 0, 0.2, 0, 0.1);
          let graphGreenZ = map(graph[z], 0, 0.2, 0, 0.1);
          let graphBlueZ = map(graph[z], 0, 0.2, -10, 3.5);
          //-----------------------------------------------------------------//
          let graphY = map(graph[y], 0, 0.5, 0, 1);
          //modulate box position using amplitude, box moves with beat
          //-----------------------------------------------------------------//

          //I tried to make the color move through the x, y and z parts of the cube
          //--------------------------SETUP-LIGHTING-------------------------//
          pointLight((graphRedX * x) + (graphRedY * y) + (graphRedZ * z),
                     (graphGreenX) * x + (graphGreenY * y) + (graphGreenZ * z),
                     (graphBlueX * x) + (graphBlueY * y) + (graphBlueZ * z),
                     0 , -1000 , 500);
          //-----------------------------------------------------------------//

          //-setting position and expanding the cube
          //-adjusting z coordinate to keep animation central
          //--------------------------SET-POSITION---------------------------//
          translate(((x - 50) + graphY) * exp, (y - 50) * exp, (z - 50 + exp) * exp);
          //-----------------------------------------------------------------//

          //using the same colour as the point light so as to
          //reflect the same colours through x, y and z locations
          //--------------------------SETUP-MATERIAL-------------------------//
          specularMaterial((graphRedX * x) + (graphRedY * y) + (graphRedZ * z),
                     (graphGreenX) * x + (graphGreenY * y) + (graphGreenZ * z),
                     (graphBlueX * x) + (graphBlueY * y) + (graphBlueZ * z));
          //-----------------------------------------------------------------//

          // code used from code train example - see reference at top [1]
          // creates shadow wave effect
          let d = dist(x, y, width/2, height/2);
          let offset = map(d, 0, maxD, -PI, PI);
          let a = angle + offset;
          let h = floor(map(sin(a), -1, 1, 0, 10));

          //--------------------------DRAW-BOX------------------------------//

          //draw box, h variable creates a shadow wave through the cube
          noStroke();
          box(w, h);

          //-----------------------------------------------------------------//

          pop();

        }
      }
    }

    angle -= 0.1; // used with cube wave motion

    //----------------------------------------------------------------------//

    //remove last ellements from array and creates size of cube
    if (graph.length > 100) {
        graph.splice(0,1);
    }

}

//-----------------------//
//-----CROSS-PRODUCT-----//
//-----------------------//

function crossProduct() {

  let a, b, c; // cross product used to
  a = createVector(0, 200, 0);
  b = createVector(200, 0, 0);
  c = p5.Vector.cross(a,b);

  push();
    stroke(0, 255, 0);
    line(a.x, a.y, a.z, 0, 0, 0);

    stroke(0, 0, 255);
    line(b.x, b.y, b.z, 0, 0, 0);

    stroke(255, 0, 0);
    line(c.x, c.y, c.z, 0, 0, 0);
  pop();
}

//----------------------//
//-----MOUSE-PRESSED----//
//----------------------//

function mousePressed() {
  getAudioContext().resume(); //play audio when mouse is pressed
}
