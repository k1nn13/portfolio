/*

- Copy your game project code into this file
- for the p5.Sound library look here https://p5js.org/reference/#/libraries/p5.sound
- for finding cool sounds perhaps look here
https://freesound.org/


*/

var gameChar_x;
var gameChar_y;
var floorPos_y;
var scrollPos;
var gameChar_world_x;

var isLeft;
var isRight;
var isFalling;
var isPlummeting;
var isPouncing;

//scenery
var clouds;
var mountains;
var mt_Ground;
var wavesFront;

var hills;
var trees;

var balloonRace;
var balloonStart;

var platforms;


var canyon;
var collectable;

var game_score
var flagpole;
var lives;

var enemies;

var jumpSound;

var audioMute = false;

function preload()
{
    soundFormats('mp3','wav');

    //load your sounds here
    jumpSound = loadSound('../js/game/assets/jump.wav');
    jumpSound.setVolume(0.2);

    purrSound = loadSound('../js/game/assets/purr.mp3');
    purrSound.setVolume(0.5);

    coinSound = loadSound('../js/game/assets/coin.wav');
    coinSound.setVolume(0.1);

    themeSound = loadSound('../js/game/assets/kittenSync.mp3')

}




function setup()
{
	canvas = createCanvas(1024, 576);
  canvas.parent("sketch-container-game");

	floorPos_y = height * 3/4;
    lives = 4;
    startGame();
    themeSound.play();
    // themeSound.setVolume(0.24);

}

function returnToStart() {
  lives = 4;
  startGame();
}

function startGame()
{


    gameChar_x = width/2 ;
	  gameChar_y = floorPos_y;
    game_score = 0;

	// Variable to control the background scrolling.

//	scrollPos = -2465;
    scrollPos = 200;

	// Variable to store the real position of the gameChar in the game
	// world. Needed for collision detection.

	gameChar_world_x = gameChar_x - scrollPos;



	// Boolean variables to control the movement of the game character.
	isLeft = false;
	isRight = false;
	isFalling = false;
	isPlummeting = false;
  isPouncing = false;

    //SCENERY!!

    balloonStart = [
        {x_pos: 100, y_pos: 470, speedY: -0.5, speedX: 0.5},
        ];

    trees = [
        {x_pos:480, height: 1, scale: 0.5},
        {x_pos:400, height: 0.45, scale: 0.4},
        {x_pos:585, height: 0.3, scale: 0.28},
        {x_pos:2180, height: 0.29, scale: 0.27},
        {x_pos:5910, height: 0.62, scale: 0.3},
        {x_pos:5830, height: 0.89, scale: 0.57},
        {x_pos:5955, height: 0.8, scale: 0.25},

        ];

    clouds = [
        {x_pos: 200, y_pos: 100, scale: 0.4, speed: 0.025},
        {x_pos: 700, y_pos: 70, scale: 0.25, speed: -0.02},
        {x_pos: 740, y_pos: 100, scale: 0.1, speed: 0.02},
        {x_pos: 1200, y_pos: 50, scale: 0.5, speed: 0.05},
        {x_pos: 1400, y_pos: 170, scale: 0.4, speed: 0.05},
        {x_pos: 1800, y_pos: 50, scale: 0.3, speed: 0.05},
        {x_pos: 2800, y_pos: 80, scale: 0.3, speed: -0.05},
        {x_pos: 2600, y_pos: 30, scale: 0.3, speed: 0.02},
        {x_pos: 3400, y_pos: 30, scale: 0.6, speed: -0.05},
        {x_pos: 3700, y_pos: 80, scale: 0.3, speed: 0.05},
        {x_pos: 3950, y_pos: 80, scale: 0.2, speed: -0.05},
        {x_pos: 4000, y_pos: 40, scale: 0.5, speed: 0.04},
        {x_pos: 4400, y_pos: 120, scale: 0.3, speed: -0.03},
        {x_pos: 4550, y_pos: 80, scale: 0.4, speed: 0.02},
        {x_pos: 5400, y_pos: 120, scale: 0.3, speed: 0.03},
        {x_pos: 6550, y_pos: 80, scale: 0.4, speed: -0.02},
        {x_pos: 6550, y_pos: 200, scale: 0.3, speed: -0.1},
        {x_pos: 5950, y_pos: 200, scale: 0.3, speed: 0.1},

        ];

    canyon = [
        {x_pos: -800,  peak: -800, y_pos: 470, width: 650,
         motionX: 0.3, r: 176, g: 196, b: 222},
        {x_pos: 600,  peak: 600, y_pos: 470, width: 220,
         motionX: 0.3, r: 176, g: 196, b: 222},
        {x_pos: 890,  peak: 890, y_pos: 470, width: 180,
         motionX: 0.3, r: 176, g: 196, b: 222},
        {x_pos: 1140, peak: 1140, y_pos: 470,width: 240,
         motionX: 0.3, r: 100, g: 100, b: 100},
        {x_pos: 1490, peak: 1490, y_pos: 470,width: 178,
         motionX: 0.3, r: 130, g: 130, b: 130},
        {x_pos: 1700, peak: 1700, y_pos: 470,width: 230,
         motionX: 0.3, r: 176, g: 196, b: 222},
        {x_pos: 2200, peak: 2200, y_pos: 470,width: 245,
         motionX: 0.2, r: 176, g: 196, b: 222},
        {x_pos: 2445, peak: 2445, y_pos: 470,width: 250,
         motionX: 0.2, r: 176, g: 196, b: 222},
        {x_pos: 2695, peak: 2695, y_pos: 470,width: 300,
         motionX: 0.2, r: 176, g: 196, b: 222},
        {x_pos: 3030, peak: 3030, y_pos: 470,width: 300,
         motionX: 0.2, r: 176, g: 196, b: 222},
        {x_pos: 3330, peak: 3330, y_pos: 470,width: 300,
         motionX: 0.2, r: 176, g: 196, b: 222},
        {x_pos: 3630, peak: 3630, y_pos: 470,width: 400,
         motionX: 0.2, r: 176, g: 196, b: 222},

        {x_pos: 4030, peak: 4030, y_pos: 470,width: 450,
         motionX: 0.2, r: 176, g: 196, b: 222},
        {x_pos: 4480, peak: 4480, y_pos: 470,width: 450,
         motionX: 0.2, r: 176, g: 196, b: 222},
        {x_pos: 4930, peak: 4930, y_pos: 470,width: 440,
         motionX: 0.2, r: 176, g: 196, b: 222},
        {x_pos: 5370, peak: 5370, y_pos: 470,width: 390,
         motionX: 0.2, r: 176, g: 196, b: 222},

        {x_pos: 6670, peak: 6670, y_pos: 470,width: 390,
         motionX: 0.2, r: 176, g: 196, b: 222},
        {x_pos: 7060, peak: 7060, y_pos: 470,width: 390,
         motionX: 0.2, r: 176, g: 196, b: 222},


        ];

    wavesFront = [
        {x_pos: -800,  peak: -800, y_pos: 470, width: 650,
         motionX: 0.3, r: 176, g: 196, b: 222},
        {x_pos: -150,  peak: -150, y_pos: 470, width: 320,
         motionX: 0.3, r: 176, g: 196, b: 222},
        {x_pos: 170,  peak: 170, y_pos: 470, width: 230,
         motionX: 0.3, r: 176, g: 196, b: 222},
        {x_pos: 400,  peak: 400, y_pos: 470, width: 230,
         motionX: 0.3, r: 176, g: 196, b: 222},

        {x_pos: 600,  peak: 600, y_pos: 470, width: 220,
         motionX: 0.3, r: 176, g: 196, b: 222},
        {x_pos: 820,  peak: 820, y_pos: 470, width: 195,
         motionX: 0.3, r: 176, g: 196, b: 222},
        {x_pos: 1015,  peak: 1015, y_pos: 470, width: 210,
         motionX: 0.3, r: 176, g: 196, b: 222},
        {x_pos: 1225,  peak: 1225, y_pos: 470, width: 230,
         motionX: 0.3, r: 176, g: 196, b: 222},
        {x_pos: 1455,  peak: 1455, y_pos: 470, width: 230,
         motionX: 0.3, r: 176, g: 196, b: 222},
        {x_pos: 1685,  peak: 1685, y_pos: 470, width: 245,
         motionX: 0.3, r: 176, g: 196, b: 222},
        {x_pos: 1930,  peak: 1930, y_pos: 470, width: 270,
         motionX: 0.3, r: 176, g: 196, b: 222},
        {x_pos: 2200, peak: 2200, y_pos: 470,width: 245,
         motionX: 0.2, r: 176, g: 196, b: 222},
        {x_pos: 2445, peak: 2445, y_pos: 470,width: 250,
         motionX: 0.2, r: 176, g: 196, b: 222},
        {x_pos: 2695, peak: 2695, y_pos: 470,width: 335,
         motionX: 0.2, r: 176, g: 196, b: 222},
        {x_pos: 3030, peak: 3030, y_pos: 470,width: 300,
         motionX: 0.2, r: 176, g: 196, b: 222},
        {x_pos: 3330, peak: 3330, y_pos: 470,width: 300,
         motionX: 0.2, r: 176, g: 196, b: 222},
        {x_pos: 3630, peak: 3630, y_pos: 470,width: 400,
         motionX: 0.2, r: 176, g: 196, b: 222},
        {x_pos: 4030, peak: 4030, y_pos: 470,width: 450,
         motionX: 0.2, r: 176, g: 196, b: 222},
        {x_pos: 4480, peak: 4480, y_pos: 470,width: 450,
         motionX: 0.2, r: 176, g: 196, b: 222},
        {x_pos: 4930, peak: 4930, y_pos: 470,width: 440,
         motionX: 0.2, r: 176, g: 196, b: 222},
        {x_pos: 5370, peak: 5370, y_pos: 470,width: 390,
         motionX: 0.2, r: 176, g: 196, b: 222},

        {x_pos: 5750, peak: 5750, y_pos: 470,width: 350,
         motionX: 0.2, r: 176, g: 196, b: 222},
        {x_pos: 6100, peak: 6100, y_pos: 470,width: 340,
         motionX: 0.2, r: 176, g: 196, b: 222},
        {x_pos: 6440, peak: 6440, y_pos: 470,width: 255,
         motionX: 0.2, r: 176, g: 196, b: 222},

        {x_pos: 6670, peak: 6670, y_pos: 470,width: 390,
         motionX: 0.2, r: 176, g: 196, b: 222},
        {x_pos: 7060, peak: 7060, y_pos: 470,width: 390,
         motionX: 0.2, r: 176, g: 196, b: 222},
        ];

    mountains = [50, 1290, 6280];

    hills = [
        //mountains start
        {x_pos: 30, height: 0.2, width: 0.5,
         r1: 110, g1: 110, b1: 110,
         r2: 110, g2: 150, b2: 150},
        {x_pos: 200, height: 0.6, width: 0.4,
         r1: 115, g1: 115, b1: 115,
         r2: 130, g2: 130, b2: 140},
        {x_pos: 270, height: 0.20, width: 0.4,
         r1: 90, g1: 90, b1: 90,
         r2: 120, g2: 110, b2: 120},
        {x_pos: 260, height: 0.28, width: 0.15,
         r1: 117, g1: 120, b1: 120,
         r2: 130, g2: 140, b2: 140},
       {x_pos: 290, height: 0.20, width: 0.05,
         r1: 117, g1: 120, b1: 120,
         r2: 130, g2: 140, b2: 140},
        {x_pos: 260, height: 0.14, width: 0.05,
         r1: 128, g1: 125, b1: 125,
         r2: 130, g2: 140, b2: 140},
        {x_pos: 220, height: 0.08, width: 0.04,
         r1: 128, g1: 125, b1: 125,
         r2: 130, g2: 140, b2: 140},
        {x_pos: 320, height: 0.08, width: 0.04,
         r1: 128, g1: 125, b1: 125,
         r2: 130, g2: 140, b2: 140},
        {x_pos: 440, height: 0.08, width: 0.08,
         r1: 128, g1: 125, b1: 125,
         r2: 130, g2: 140, b2: 140},
        {x_pos: 430, height: 0.03, width: 0.08,
         r1: 128, g1: 140, b1: 125,
         r2: 130, g2: 165, b2: 140},

        //mountains middle part 1 medium
         {x_pos: 1150, height: 0.5, width: 0.3,
         r1: 110, g1: 110, b1: 110,
         r2: 80, g2: 80, b2: 80},
        {x_pos: 1250, height: 0.4, width: 0.6,
         r1: 110, g1: 110, b1: 110,
         r2: 80, g2: 80, b2: 80},
        {x_pos: 1350, height: 0.3, width: 0.3,
         r1: 110, g1: 110, b1: 110,
         r2: 80, g2: 80, b2: 80},
         {x_pos: 1150, height: 0.2, width: 0.25,
         r1: 100, g1: 100, b1: 100,
         r2: 80, g2: 80, b2: 80},
         {x_pos: 1200, height: 0.3, width: 0.3,
         r1: 100, g1: 100, b1: 100,
         r2: 80, g2: 80, b2: 80},
         {x_pos: 1280, height: 0.3, width: 0.3,
         r1: 100, g1: 100, b1: 100,
         r2: 90, g2: 90, b2: 90},
         {x_pos: 1350, height: 0.2, width: 0.2,
         r1: 100, g1: 100, b1: 100,
         r2: 90, g2: 90, b2: 90},

        //mountains east small
        {x_pos: 1108, height: 0.2, width: 0.08,
         r1: 110, g1: 110, b1: 110,
         r2: 80, g2: 80, b2: 80},
        {x_pos: 1090, height: 0.04, width: 0.08,
         r1: 128, g1: 140, b1: 125,
         r2: 130, g2: 165, b2: 140},
        {x_pos: 1100, height: 0.1, width: 0.08,
         r1: 110, g1: 110, b1: 110,
         r2: 80, g2: 80, b2: 80},
        {x_pos: 1110, height: 0.15, width: 0.02,
         r1: 110, g1: 110, b1: 110,
         r2: 80, g2: 80, b2: 80},
        {x_pos: 1114, height: 0.1, width: 0.02,
         r1: 110, g1: 110, b1: 110,
         r2: 80, g2: 80, b2: 80},
        {x_pos: 1100, height: 0.1, width: 0.02,
         r1: 110, g1: 110, b1: 110,
         r2: 80, g2: 80, b2: 80},
        {x_pos: 1090, height: 0.1, width: 0.02,
         r1: 110, g1: 110, b1: 110,
         r2: 80, g2: 80, b2: 80},
        {x_pos: 1085, height: 0.1, width: 0.03,
         r1: 110, g1: 110, b1: 110,
         r2: 80, g2: 80, b2: 80},
        {x_pos: 1080, height: 0.06, width: 0.02,
         r1: 110, g1: 110, b1: 110,
         r2: 80, g2: 80, b2: 80},


        //mountain west
        {x_pos: 1450, height: 0.28, width: 0.3,
         r1: 120, g1: 120, b1: 120,
         r2: 130, g2: 130, b2: 130},
        {x_pos: 1450, height: 0.17, width: 0.2,
         r1: 120, g1: 120, b1: 120,
         r2: 130, g2: 130, b2: 130},
        {x_pos: 1500, height: 0.2, width: 0.1,
         r1: 120, g1: 120, b1: 120,
         r2: 130, g2: 130, b2: 130},
        {x_pos: 1550, height: 0.21, width: 0.33,
         r1: 120, g1: 120, b1: 120,
         r2: 130, g2: 130, b2: 130},
        {x_pos: 1600, height: 0.23, width: 0.2,
         r1: 120, g1: 120, b1: 120,
         r2: 130, g2: 130, b2: 130},

        {x_pos: 1450, height: 0.2, width: 0.3,
         r1: 120, g1: 120, b1: 120,
         r2: 130, g2: 130, b2: 130},
        {x_pos: 1450, height: 0.13, width: 0.2,
         r1: 120, g1: 120, b1: 120,
         r2: 130, g2: 130, b2: 130},
        {x_pos: 1500, height: 0.18, width: 0.1,
         r1: 120, g1: 120, b1: 120,
         r2: 130, g2: 130, b2: 130},
        {x_pos: 1550, height: 0.18, width: 0.33,
         r1: 120, g1: 120, b1: 120,
         r2: 130, g2: 130, b2: 130},
        {x_pos: 1600, height: 0.2, width: 0.2,
         r1: 120, g1: 120, b1: 120,
         r2: 130, g2: 130, b2: 130},

        {x_pos: 1450, height: 0.1, width: 0.3,
         r1: 140, g1: 140, b1: 140,
         r2: 130, g2: 130, b2: 130},
        {x_pos: 1450, height: 0.08, width: 0.2,
           r1: 140, g1: 140, b1: 140,
         r2: 130, g2: 130, b2: 130},
        {x_pos: 1480, height: 0.1, width: 0.1,
         r1: 140, g1: 140, b1: 140,
         r2: 130, g2: 130, b2: 130},
        {x_pos: 1510, height: 0.13, width: 0.33,
         r1: 140, g1: 140, b1: 140,
         r2: 130, g2: 130, b2: 130},
        {x_pos: 1590, height: 0.13, width: 0.2,
         r1: 140, g1: 140, b1: 140,
         r2: 130, g2: 130, b2: 130},
        {x_pos: 1650, height: 0.07, width: 0.12,
         r1: 140, g1: 140, b1: 140,
         r2: 130, g2: 130, b2: 130},

         {x_pos: 1450, height: 0.12, width: 0.3,
         r1: 140, g1: 140, b1: 140,
         r2: 130, g2: 130, b2: 130},
        {x_pos: 1450, height: 0.1, width: 0.2,
        r1: 140, g1: 140, b1: 140,
         r2: 130, g2: 130, b2: 130},
        {x_pos: 1480, height: 0.15, width: 0.1,
         r1: 140, g1: 140, b1: 140,
         r2: 130, g2: 130, b2: 130},
        {x_pos: 1510, height: 0.17, width: 0.33,
         r1: 140, g1: 140, b1: 140,
         r2: 130, g2: 130, b2: 130},
        {x_pos: 1590, height: 0.19, width: 0.2,
         r1: 140, g1: 140, b1: 140,
         r2: 130, g2: 130, b2: 130},
        {x_pos: 1650, height: 0.1, width: 0.12,
         r1: 140, g1: 140, b1: 140,
         r2: 130, g2: 130, b2: 130},

        {x_pos: 1450, height: 0.04, width: 0.3,
         r1: 130, g1: 130, b1: 130,
         r2: 125, g2: 125, b2: 125},
        {x_pos: 1450, height: 0.06, width: 0.2,
         r1: 130, g1: 130, b1: 130,
         r2: 125, g2: 125, b2: 125},
        {x_pos: 1500, height: 0.07, width: 0.1,
         r1: 130, g1: 130, b1: 130,
         r2: 125, g2: 125, b2: 125},
        {x_pos: 1550, height: 0.08, width: 0.33,
          r1: 130, g1: 130, b1: 130,
         r2: 125, g2: 125, b2: 125},
        {x_pos: 1600, height: 0.09, width: 0.2,
         r1: 130, g1: 130, b1: 130,
         r2: 130, g2: 130, b2: 130},
        {x_pos: 1600, height: 0.12, width: 0.2,
         r1: 130, g1: 130, b1: 130,
         r2: 125, g2: 125, b2: 125},

        //trees
        {x_pos: 2000, height: 0.3, width: 0.04,
         r1: 100, g1: 160, b1: 100,
         r2: 130, g2: 130, b2: 130},
        {x_pos: 1950, height: 0.25, width: 0.05,
         r1: 80, g1: 120, b1: 80,
         r2: 100, g2: 130, b2: 100},
        {x_pos: 1970, height: 0.3, width: 0.02,
         r1: 80, g1: 120, b1: 80,
         r2: 100, g2: 130, b2: 100},
        {x_pos: 2100, height: 0.35, width: 0.02,
         r1: 80, g1: 120, b1: 80,
         r2: 100, g2: 130, b2: 100},
        {x_pos: 2110, height: 0.05, width: 0.02,
         r1: 80, g1: 120, b1: 80,
         r2: 100, g2: 130, b2: 100},

        //mountains middle part 1
         {x_pos: 6050, height: 0.5, width: 0.3,
         r1: 110, g1: 110, b1: 110,
         r2: 80, g2: 80, b2: 80},
        {x_pos: 6450, height: 0.4, width: 0.6,
         r1: 110, g1: 110, b1: 110,
         r2: 80, g2: 80, b2: 80},
        {x_pos: 6350, height: 0.3, width: 0.3,
         r1: 110, g1: 110, b1: 110,
         r2: 80, g2: 80, b2: 80},
         {x_pos: 5890, height: 0.2, width: 0.25,
         r1: 100, g1: 100, b1: 100,
         r2: 80, g2: 80, b2: 80},
         {x_pos: 6400, height: 0.3, width: 0.3,
         r1: 100, g1: 100, b1: 100,
         r2: 80, g2: 80, b2: 80},
         {x_pos: 6280, height: 0.3, width: 0.3,
         r1: 100, g1: 100, b1: 100,
         r2: 90, g2: 90, b2: 90},
         {x_pos: 6350, height: 0.2, width: 0.2,
         r1: 100, g1: 100, b1: 100,
         r2: 90, g2: 90, b2: 90},

        //mountain end
        {x_pos: 6000, height: 0.2, width: 0.5,
         r1: 110, g1: 110, b1: 110,
         r2: 110, g2: 150, b2: 150},
        {x_pos: 6200, height: 0.6, width: 0.4,
         r1: 115, g1: 115, b1: 115,
         r2: 130, g2: 130, b2: 140},
        {x_pos: 6270, height: 0.20, width: 0.4,
         r1: 90, g1: 90, b1: 90,
         r2: 120, g2: 110, b2: 120},
        {x_pos: 6260, height: 0.28, width: 0.15,
         r1: 117, g1: 120, b1: 120,
         r2: 130, g2: 140, b2: 140},
       {x_pos: 6290, height: 0.20, width: 0.05,
         r1: 117, g1: 120, b1: 120,
         r2: 130, g2: 140, b2: 140},
        {x_pos: 6260, height: 0.14, width: 0.05,
         r1: 128, g1: 125, b1: 125,
         r2: 130, g2: 140, b2: 140},
        {x_pos: 6220, height: 0.08, width: 0.04,
         r1: 128, g1: 125, b1: 125,
         r2: 130, g2: 140, b2: 140},
        {x_pos: 6320, height: 0.08, width: 0.04,
         r1: 128, g1: 125, b1: 125,
         r2: 130, g2: 140, b2: 140},
        {x_pos: 6440, height: 0.08, width: 0.08,
         r1: 128, g1: 125, b1: 125,
         r2: 130, g2: 140, b2: 140},
        {x_pos: 6430, height: 0.03, width: 0.08,
         r1: 128, g1: 140, b1: 125,
         r2: 130, g2: 165, b2: 140},

        //mountain west
        {x_pos: 6450, height: 0.28, width: 0.3,
         r1: 120, g1: 120, b1: 120,
         r2: 130, g2: 130, b2: 130},
        {x_pos: 6450, height: 0.17, width: 0.2,
         r1: 120, g1: 120, b1: 120,
         r2: 130, g2: 130, b2: 130},
        {x_pos: 6500, height: 0.2, width: 0.1,
         r1: 120, g1: 120, b1: 120,
         r2: 130, g2: 130, b2: 130},
        {x_pos: 6550, height: 0.21, width: 0.33,
         r1: 120, g1: 120, b1: 120,
         r2: 130, g2: 130, b2: 130},
        {x_pos: 6600, height: 0.23, width: 0.2,
         r1: 120, g1: 120, b1: 120,
         r2: 130, g2: 130, b2: 130},

        {x_pos: 6450, height: 0.2, width: 0.3,
         r1: 120, g1: 120, b1: 120,
         r2: 130, g2: 130, b2: 130},
        {x_pos: 6450, height: 0.13, width: 0.2,
         r1: 120, g1: 120, b1: 120,
         r2: 130, g2: 130, b2: 130},
        {x_pos: 6500, height: 0.18, width: 0.1,
         r1: 120, g1: 120, b1: 120,
         r2: 130, g2: 130, b2: 130},
        {x_pos: 6550, height: 0.18, width: 0.33,
         r1: 120, g1: 120, b1: 120,
         r2: 130, g2: 130, b2: 130},
        {x_pos: 6600, height: 0.2, width: 0.2,
         r1: 120, g1: 120, b1: 120,
         r2: 130, g2: 130, b2: 130},

        //trees
        {x_pos: 5800, height: 0.3, width: 0.04,
         r1: 100, g1: 160, b1: 100,
         r2: 130, g2: 130, b2: 130},
        {x_pos: 6000, height: 0.25, width: 0.05,
         r1: 80, g1: 120, b1: 80,
         r2: 100, g2: 130, b2: 100},
        {x_pos: 5970, height: 0.3, width: 0.02,
         r1: 80, g1: 120, b1: 80,
         r2: 100, g2: 130, b2: 100},
        {x_pos: 5850, height: 0.35, width: 0.02,
         r1: 80, g1: 120, b1: 80,
         r2: 100, g2: 130, b2: 100},
        {x_pos: 5870, height: 0.2, width: 0.02,
         r1: 80, g1: 120, b1: 80,
         r2: 100, g2: 130, b2: 100},
        {x_pos: 6110, height: 0.05, width: 0.02,
         r1: 80, g1: 120, b1: 80,
         r2: 100, g2: 130, b2: 100},



        ];

    //rocks in the sea and underground hills
    mt_Ground = [
        //land
        {x_pos: 260, y_pos: 585,
         height: 0.66, width: 1,
         peakX: -10, peakY: -80,
         r1: 20, g1: 40, b1: 20,
         r2: 20, g2: 80, b2: 20},
        {x_pos: 60, y_pos: 585,
         height: 0.66, width: 0.7,
         peakX: 40, peakY: -80,
         r1: 20, g1: 80, b1: 30,
         r2: 20, g2: 120, b2: 20},
        {x_pos: 1, y_pos: 585,
         height: 0.66, width: 0.7,
         peakX: 40, peakY: -80,
         r1: 20, g1: 60, b1: 20,
         r2: 20, g2: 100, b2: 20},
        {x_pos: -150, y_pos: 585,
         height: 0.66, width: 0.7,
         peakX: 40, peakY: -80,
         r1: 20, g1: 60, b1: 20,
         r2: 20, g2: 100, b2: 20},
        {x_pos: 260, y_pos: 585,
         height: 0.66, width: 0.5,
         peakX: -10, peakY: -80,
         r1: 20, g1: 50, b1: 20,
         r2: 20, g2: 100, b2: 20},
        {x_pos: 238, y_pos: 585,
         height: 0.43, width: 0.18,
          peakX: + 2, peakY: -30,
         r1: 50, g1: 50, b1: 50,
         r2: 130, g2: 130, b2: 130},
        {x_pos: 10, y_pos: 585,
         height: 0.43, width: 0.3,
          peakX: + 2, peakY: -10,
         r1: 50, g1: 50, b1: 50,
         r2: 100, g2: 100, b2: 100},
        {x_pos: 400, y_pos: 585,
         height: 0.43, width: 0.7,
          peakX: + 2, peakY: +5,
         r1: 50, g1: 50, b1: 50,
         r2: 100, g2: 100, b2: 100},
        {x_pos: 125, y_pos: 650,
         height: 0.6, width: 0.18,
          peakX: -10, peakY: -30,
         r1: 50, g1: 50, b1: 50,
         r2: 100, g2: 100, b2: 100},

        //sea transition
        {x_pos: 490, y_pos: 585,
         height: 0.66, width: 0.29,
         peakX: +40, peakY: -80,
         r1: 20, g1: 60, b1: 20,
         r2: 20, g2: 30, b2: 20},
        {x_pos: 600, y_pos: 585,
         height: 0.66, width: 0.19,
         peakX: -10, peakY: -22,
         r1: 50, g1: 50, b1: 50,
         r2: 120, g2: 120, b2: 120},
        {x_pos: 538, y_pos: 585,
         height: 0.63, width: 0.18,
          peakX: + 2, peakY: -70,
         r1: 50, g1: 50, b1: 50,
         r2: 130, g2: 130, b2: 130},
        {x_pos: 625, y_pos: 650,
         height: 0.6, width: 0.18,
          peakX: -10, peakY: -30,
         r1: 50, g1: 50, b1: 50,
         r2: 100, g2: 100, b2: 100},

        //island 1
        {x_pos: 890, y_pos: 585,
         height: 0.66, width: 0.19,
         peakX: -10, peakY: -22,
         r1: 50, g1: 50, b1: 50,
         r2: 120, g2: 120, b2: 120},
         {x_pos: 870, y_pos: 585,
         height: 0.66, width: 0.18,
          peakX: -24, peakY: -80,
         r1: 50, g1: 50, b1: 50,
         r2: 130, g2: 130, b2: 130},
        {x_pos: 840, y_pos: 585,
         height: 0.665, width: 0.25,
         peakX: -30, peakY: -80,
         r1: 50, g1: 50, b1: 50,
         r2: 110, g2: 110, b2: 110},
        {x_pos: 820, y_pos: 585,
         height: 0.67, width: 0.15,
         peakX: -18, peakY: -80,
         r1: 40, g1: 40, b1: 40,
         r2: 80, g2: 80, b2: 80},

        //island 1 rocks
         {x_pos: 845, y_pos: 585,
         height: 0.6, width: 0.2,
         peakX: 24, peakY: -48,
         r1: 50, g1: 55, b1: 50,
         r2: 45, g2: 45, b2: 45},
         {x_pos: 830, y_pos: 585,
         height: 0.5, width: 0.2,
         peakX: 1, peakY: -5,
         r1: 50, g1: 55, b1: 50,
         r2: 100, g2: 100, b2: 100},
        {x_pos: 895, y_pos: 585,
         height: 0.58, width: 0.2,
         peakX: -10, peakY: -40,
         r1: 50, g1: 55, b1: 50,
         r2: 100, g2: 100, b2: 100},
         {x_pos: 860, y_pos: 585,
         height: 0.6, width: 0.2,
         peakX: 1, peakY: -5,
         r1: 40, g1: 45, b1: 40,
         r2: 80, g2: 80, b2: 80},
        {x_pos: 820, y_pos: 585,
         height: 0.3, width: 0.25,
          peakX: 1, peakY: -10,
         r1: 50, g1: 50, b1: 50,
         r2: 110, g2: 110, b2: 110},
         {x_pos: 790, y_pos: 585,
         height: 0.2, width: 0.05,
          peakX: 1, peakY: 1,
         r1: 50, g1: 50, b1: 50,
         r2: 130, g2: 130, b2: 130},

        //island 2
        {x_pos: 1140, y_pos: 585,
         height: 0.66, width: 0.19,
         peakX: -10, peakY: -22,
         r1: 50, g1: 50, b1: 50,
         r2: 120, g2: 120, b2: 120},
         {x_pos: 1120, y_pos: 585,
         height: 0.66, width: 0.18,
          peakX: -24, peakY: -80,
         r1: 50, g1: 50, b1: 50,
         r2: 130, g2: 130, b2: 130},
        {x_pos: 1071, y_pos: 585,
         height: 0.665, width: 0.25,
         peakX: -30, peakY: -80,
         r1: 50, g1: 50, b1: 50,
         r2: 110, g2: 110, b2: 110},
        {x_pos: 1102, y_pos: 585,
         height: 0.67, width: 0.15,
         peakX: -20, peakY: -80,
         r1: 40, g1: 40, b1: 40,
         r2: 80, g2: 80, b2: 80},

            //island 2 rocks
         {x_pos: 1120, y_pos: 585,
         height: 0.5, width: 0.2,
         peakX: 1, peakY: -5,
         r1: 50, g1: 55, b1: 50,
         r2: 100, g2: 100, b2: 100},
        {x_pos: 1135, y_pos: 585,
         height: 0.58, width: 0.2,
         peakX: -10, peakY: -40,
         r1: 50, g1: 55, b1: 50,
         r2: 100, g2: 100, b2: 100},
         {x_pos: 1085, y_pos: 585,
         height: 0.55, width: 0.2,
         peakX: 1, peakY: -5,
         r1: 40, g1: 45, b1: 40,
         r2: 80, g2: 80, b2: 80},
        {x_pos: 1010, y_pos: 585,
         height: 0.3, width: 0.25,
          peakX: 1, peakY: -10,
         r1: 50, g1: 50, b1: 50,
         r2: 110, g2: 110, b2: 110},
         {x_pos: 1210, y_pos: 585,
         height: 0.3, width: 0.05,
          peakX: 1, peakY: 1,
         r1: 50, g1: 50, b1: 50,
         r2: 130, g2: 130, b2: 130},

        //island 3
        {x_pos: 1490, y_pos: 585,
         height: 0.66, width: 0.19,
         peakX: -10, peakY: -22,
         r1: 50, g1: 50, b1: 50,
         r2: 120, g2: 120, b2: 120},
         {x_pos: 1470, y_pos: 585,
         height: 0.66, width: 0.18,
          peakX: -24, peakY: -80,
         r1: 50, g1: 50, b1: 50,
         r2: 130, g2: 130, b2: 130},
        {x_pos: 1439, y_pos: 585,
         height: 0.665, width: 0.25,
         peakX: -30, peakY: -80,
         r1: 50, g1: 50, b1: 50,
         r2: 110, g2: 110, b2: 110},
        {x_pos: 1380, y_pos: 585,
         height: 0.67, width: 0.15,
         peakX: +10, peakY: -80,
         r1: 50, g1: 50, b1: 52,
         r2: 80, g2: 80, b2: 80},
        {x_pos: 1408, y_pos: 585,
         height: 0.67, width: 0.15,
         peakX: -5, peakY: -80,
         r1: 40, g1: 40, b1: 40,
         r2: 80, g2: 80, b2: 80},

        //island 3 rocks
         {x_pos: 1420, y_pos: 585,
         height: 0.5, width: 0.2,
         peakX: 1, peakY: -5,
         r1: 50, g1: 55, b1: 50,
         r2: 100, g2: 100, b2: 100},
        {x_pos: 1455, y_pos: 585,
         height: 0.58, width: 0.2,
         peakX: -10, peakY: -40,
         r1: 50, g1: 55, b1: 50,
         r2: 100, g2: 100, b2: 100},
         {x_pos: 1385, y_pos: 585,
         height: 0.55, width: 0.2,
         peakX: 1, peakY: -5,
         r1: 40, g1: 45, b1: 40,
         r2: 80, g2: 80, b2: 80},
        {x_pos: 1480, y_pos: 585,
         height: 0.3, width: 0.25,
          peakX: 1, peakY: -10,
         r1: 50, g1: 50, b1: 50,
         r2: 110, g2: 110, b2: 110},
         {x_pos: 1410, y_pos: 585,
         height: 0.3, width: 0.05,
          peakX: 1, peakY: 1,
         r1: 50, g1: 50, b1: 50,
         r2: 130, g2: 130, b2: 130},

        //island 4 small
        {x_pos: 1698, y_pos: 585,
         height: 0.66, width: 0.16,
         peakX: -10, peakY: -22,
         r1: 50, g1: 50, b1: 50,
         r2: 120, g2: 120, b2: 120},
         {x_pos: 1680, y_pos: 585,
         height: 0.66, width: 0.15,
          peakX: -10, peakY: -80,
         r1: 50, g1: 50, b1: 50,
         r2: 130, g2: 130, b2: 130},
        {x_pos: 1669, y_pos: 585,
         height: 0.665, width: 0.1,
         peakX: 2, peakY: -80,
         r1: 50, g1: 50, b1: 50,
         r2: 90, g2: 90, b2: 90},

        //island 4 rocks
         {x_pos: 1680, y_pos: 585,
         height: 0.5, width: 0.2,
         peakX: 1, peakY: -5,
         r1: 50, g1: 55, b1: 50,
         r2: 100, g2: 100, b2: 100},
        {x_pos: 1675, y_pos: 585,
         height: 0.58, width: 0.2,
         peakX: -10, peakY: -40,
         r1: 50, g1: 55, b1: 50,
         r2: 100, g2: 100, b2: 100},
         {x_pos: 1680, y_pos: 585,
         height: 0.6, width: 0.2,
         peakX: 1, peakY: -5,
         r1: 40, g1: 45, b1: 40,
         r2: 80, g2: 80, b2: 80},
        {x_pos: 1682, y_pos: 585,
         height: 0.3, width: 0.25,
          peakX: 1, peakY: -10,
         r1: 50, g1: 50, b1: 50,
         r2: 110, g2: 110, b2: 110},
         {x_pos: 1680, y_pos: 585,
         height: 0.2, width: 0.05,
          peakX: 1, peakY: 1,
         r1: 50, g1: 50, b1: 50,
         r2: 130, g2: 130, b2: 130},

        //island 5 land
        {x_pos: 1900, y_pos: 585,
         height: 0.5, width: 0.19,
         peakX: -10, peakY: -22,
         r1: 50, g1: 50, b1: 50,
         r2: 70, g2: 70, b2: 70},
        {x_pos: 1930, y_pos: 585,
         height: 0.66, width: 0.19,
         peakX: -1, peakY: -79,
         r1: 50, g1: 50, b1: 50,
         r2: 60, g2: 70, b2: 60},
        {x_pos: 1970, y_pos: 585,
         height: 0.66, width: 0.19,
         peakX: +40, peakY: -79,
         r1: 50, g1: 70, b1: 50,
         r2: 80, g2: 120, b2: 90},
        {x_pos: 2050, y_pos: 585,
         height: 0.66, width: 0.4,
         peakX: 1, peakY: -79,
         r1: 100, g1: 100, b1: 100,
         r2: 50, g2: 90, b2: 50},

        //sea transition
        {x_pos: 2090, y_pos: 585,
         height: 0.66, width: 0.29,
         peakX: +40, peakY: -80,
         r1: 20, g1: 60, b1: 20,
         r2: 20, g2: 30, b2: 20},
        {x_pos: 2100, y_pos: 585,
         height: 0.5, width: 0.19,
         peakX: -10, peakY: -22,
         r1: 50, g1: 50, b1: 50,
         r2: 120, g2: 120, b2: 120},
        {x_pos: 2168, y_pos: 585,
         height: 0.4, width: 0.18,
          peakX: + 2, peakY: -70,
         r1: 50, g1: 50, b1: 50,
         r2: 130, g2: 130, b2: 130},
        {x_pos: 2085, y_pos: 650,
         height: 0.64, width: 0.18,
          peakX: -10, peakY: -30,
         r1: 50, g1: 50, b1: 50,
         r2: 100, g2: 100, b2: 100},

        //island 5 between balloons
        {x_pos: 2995, y_pos: 585,
         height: 0.66, width: 0.16,
         peakX: -10, peakY: -22,
         r1: 50, g1: 50, b1: 50,
         r2: 120, g2: 120, b2: 120},
        {x_pos: 3004, y_pos: 585,
         height: 0.665, width: 0.1,
         peakX: 2, peakY: -80,
         r1: 50, g1: 50, b1: 50,
         r2: 90, g2: 90, b2: 90},
         {x_pos: 2995, y_pos: 585,
         height: 0.66, width: 0.15,
          peakX: -10, peakY: -80,
         r1: 50, g1: 50, b1: 50,
         r2: 130, g2: 130, b2: 130},


        //island 4 rocks
         {x_pos: 3010, y_pos: 585,
         height: 0.5, width: 0.2,
         peakX: 1, peakY: -5,
         r1: 50, g1: 55, b1: 50,
         r2: 100, g2: 100, b2: 100},
        {x_pos: 2990, y_pos: 585,
         height: 0.58, width: 0.2,
         peakX: -10, peakY: -40,
         r1: 50, g1: 55, b1: 50,
         r2: 100, g2: 100, b2: 100},
         {x_pos: 3005, y_pos: 585,
         height: 0.6, width: 0.2,
         peakX: 1, peakY: -5,
         r1: 40, g1: 45, b1: 40,
         r2: 80, g2: 80, b2: 80},
        {x_pos: 3015, y_pos: 585,
         height: 0.3, width: 0.25,
          peakX: 1, peakY: -10,
         r1: 50, g1: 50, b1: 50,
         r2: 110, g2: 110, b2: 110},
         {x_pos: 3015, y_pos: 585,
         height: 0.2, width: 0.05,
          peakX: 1, peakY: 1,
         r1: 50, g1: 50, b1: 50,
         r2: 130, g2: 130, b2: 130},

        //rocks in sea
        {x_pos: 3215, y_pos: 585,
         height: 0.3, width: 0.25,
          peakX: 1, peakY: -10,
         r1: 50, g1: 50, b1: 50,
         r2: 110, g2: 110, b2: 110},
         {x_pos: 3115, y_pos: 585,
         height: 0.5, width: 0.09,
          peakX: 1, peakY: 1,
         r1: 50, g1: 50, b1: 50,
         r2: 130, g2: 130, b2: 130},
        {x_pos: 2815, y_pos: 585,
         height: 0.3, width: 0.25,
          peakX: 1, peakY: -10,
         r1: 50, g1: 50, b1: 50,
         r2: 110, g2: 110, b2: 110},
         {x_pos: 2815, y_pos: 585,
         height: 0.3, width: 0.05,
          peakX: 1, peakY: 1,
         r1: 50, g1: 50, b1: 50,
         r2: 130, g2: 130, b2: 130},

        {x_pos: 5615, y_pos: 585,
         height: 0.25, width: 0.25,
          peakX: 1, peakY: -10,
         r1: 50, g1: 50, b1: 50,
         r2: 110, g2: 110, b2: 110},
         {x_pos: 5665, y_pos: 585,
         height: 0.25, width: 0.09,
          peakX: 1, peakY: 1,
         r1: 50, g1: 50, b1: 50,
         r2: 130, g2: 130, b2: 130},


        //lands end start



        {x_pos: 5760, y_pos: 585,
         height: 0.67, width: 0.25,
          peakX: 40, peakY: -79,
         r1: 50, g1: 50, b1: 50,
         r2: 90, g2: 150, b2: 90},
        {x_pos: 5860, y_pos: 585,
         height: 0.66, width: 0.45,
          peakX: 1, peakY: -79,
         r1: 40, g1: 40, b1: 40,
         r2: 90, g2: 130, b2: 90},
        {x_pos: 5960, y_pos: 585,
         height: 0.66, width: 0.2,
          peakX: 50, peakY: -79,
         r1: 90, g1: 150, b1: 90,
         r2: 90, g2: 170, b2: 90},
        {x_pos: 6060, y_pos: 585,
         height: 0.66, width: 0.4,
          peakX: 50, peakY: -79,
         r1: 90, g1: 150, b1: 90,
         r2: 90, g2: 160, b2: 90},
        {x_pos: 6160, y_pos: 585,
         height: 0.66, width: 0.8,
          peakX: 50, peakY: -79,
         r1: 90, g1: 170, b1: 90,
         r2: 90, g2: 160, b2: 90},
        {x_pos: 6360, y_pos: 585,
         height: 0.66, width: 0.8,
          peakX: 50, peakY: -79,
         r1: 90, g1: 165, b1: 90,
         r2: 90, g2: 155, b2: 90},
       {x_pos: 6060, y_pos: 585,
         height: 0.3, width: 0.8,
          peakX: 50, peakY: -79,
         r1: 40, g1: 55, b1: 70,
         r2: 90, g2: 155, b2: 90},
       {x_pos: 6260, y_pos: 585,
         height: 0.3, width: 0.8,
          peakX: 50, peakY: -79,
         r1: 40, g1: 65, b1: 50,
         r2: 90, g2: 155, b2: 90},

        {x_pos: 6600, y_pos: 585,
         height: 0.66, width: 0.2,
          peakX: 30, peakY: -79,
         r1: 30, g1: 40, b1: 30,
         r2: 50, g2: 65, b2: 50},

        {x_pos: 6623, y_pos: 585,
         height: 0.4, width: 0.2,
          peakX: -15, peakY: -79,
         r1: 40, g1: 65, b1: 50,
         r2: 120, g2: 120, b2: 120},
        {x_pos: 6723, y_pos: 585,
         height: 0.3, width: 0.2,
          peakX: -10, peakY: -30,
         r1: 40, g1: 65, b1: 50,
         r2: 120, g2: 120, b2: 120},

        {x_pos: 6703, y_pos: 585,
         height: 0.4, width: 0.05,
          peakX: -10, peakY: -30,
         r1: 40, g1: 65, b1: 50,
         r2: 120, g2: 120, b2: 120},

        {x_pos: 5930, y_pos: 585,
         height: 0.37, width: 0.25,
          peakX: 40, peakY: -19,
         r1: 50, g1: 50, b1: 50,
         r2: 100, g2: 100, b2: 100},
        {x_pos: 6060, y_pos: 585,
         height: 0.36, width: 0.45,
          peakX: 1, peakY: -79,
         r1: 40, g1: 40, b1: 40,
         r2: 130, g2: 130, b2: 130},
        {x_pos: 6260, y_pos: 585,
         height: 0.36, width: 0.2,
          peakX: 50, peakY: -20,
         r1: 90, g1: 150, b1: 90,
         r2: 90, g2: 100, b2: 9},
        {x_pos: 6360, y_pos: 585,
         height: 0.36, width: 0.1,
          peakX: 20, peakY: -10,
         r1: 90, g1: 90, b1: 90,
         r2: 90, g2: 100, b2: 90},
        {x_pos: 6450, y_pos: 585,
         height: 0.36, width: 0.2,
          peakX: 50, peakY: -20,
         r1: 90, g1: 150, b1: 90,
         r2: 90, g2: 100, b2: 9},

        //low ground
        {x_pos: 5715, y_pos: 585,
         height: 0.55, width: 0.25,
          peakX: 1, peakY: -10,
         r1: 50, g1: 50, b1: 50,
         r2: 110, g2: 110, b2: 110},
         {x_pos: 5615, y_pos: 585,
         height: 0.35, width: 0.05,
          peakX: 1, peakY: 1,
         r1: 50, g1: 50, b1: 50,
         r2: 130, g2: 130, b2: 130},

        ];

    collectable = [
        {x_pos: 848, y_pos: 405, isFound: false},
        {x_pos: 1110, y_pos: 405, isFound: false},
        {x_pos: 1230, y_pos: 260, isFound: false},
        {x_pos: 1430, y_pos: 405, isFound: false},
        {x_pos: 1690, y_pos: 405, isFound: false},
        {x_pos: 2040, y_pos: 405, isFound: false},
        {x_pos: 2415, y_pos: 400, isFound: false},
        {x_pos: 2685, y_pos: 360, isFound: false},

        {x_pos: 3010, y_pos: 405, isFound: false},


        {x_pos: 3010, y_pos: 100, isFound: false},


        {x_pos: 3265, y_pos: 390, isFound: false},
        {x_pos: 3180, y_pos: 220, isFound: false},
        {x_pos: 3380, y_pos: 120, isFound: false},

        {x_pos: 3690, y_pos: 170, isFound: false},


        //jump coins
        {x_pos: 3890, y_pos: 70, isFound: false},
        {x_pos: 3965, y_pos: 140, isFound: false},
        {x_pos: 4065, y_pos: 240, isFound: false},
        {x_pos: 4200, y_pos: 380, isFound: false},


        {x_pos: 4355, y_pos: 100, isFound: false},

        {x_pos: 4755, y_pos: 185, isFound: false},


        {x_pos: 4970, y_pos: 80, isFound: false},

        {x_pos: 5660, y_pos: 300, isFound: false},

        ];

    flagpole = {
        x_pos: 6500,
        y_pos: 470,
        speedY: -0.3,
        speedX: 0.05,
        isReached: false
        };

    enemies = [];

    //enemies intro
    enemies.push(new Enemy(1000, 80, 100));
    enemies.push(new Enemy(1150, 120, 100));

    //enemies 1
    enemies.push(new Enemy(2050, 372, 100));

    enemies.push(new Enemy(4150, 240, 100));


    //enemise section 2
    enemies.push(new Enemy(5500, 100, 100));
    enemies.push(new Enemy(5650, 140, 100));

    enemies.push(new Enemy(8000, 300, 100));
    enemies.push(new Enemy(8150, 340, 100));


    enemies.push(new Enemy(10000, 400, 100));
    enemies.push(new Enemy(10150, 440, 100));

    enemies.push(new Enemy(11000, 200, 100));
    enemies.push(new Enemy(11150, 240, 100));


    enemies.push(new Enemy(12000, 100, 100));
    enemies.push(new Enemy(12150, 140, 100));






    //small balloons flying
    balloonRace = [
        {x_pos: 1400,
         y_pos: 100,
         speedY: 0.2,
         speedX: 0.1,
         r: 200, g: 255, b: 100},
        {x_pos: 1500,
         y_pos: 90,
         speedY: 0.2,
         speedX: 0.14,
         r: 100, g: 20, b: 150},
        {x_pos: 1450,
         y_pos: 160,
         speedY: 0.2,
         speedX: 0.12,
         r: 250, g: 0, b: 0},
        {x_pos: 1350,
         y_pos: 40,
         speedY: 0.2,
         speedX: 0.28,
         r: 100, g: 200, b: 80},
        ];

    //decrement lives by 1 on gameStart()
    lives -= 1;

    //platform
    platforms = [];



    platforms.push(createPlatform(1200, 300, 70,
                                  0.05, 0,
                                  170, 170, 10,
                                  1205, 1195));
    //balloons section 1
    platforms.push(createPlatform(2370, 420, 70,
                                  0.05, 0,
                                  0, 20, 10,
                                  2375, 2365));

    platforms.push(createPlatform(2670, 380, 70,
                                  0.6, 0,
                                  0, 0, 255,
                                  2750, 2550));

    //balloon section 2
    platforms.push(createPlatform(3230, 410, 70,
                                  0.05, 0,
                                  200, 0, 0,
                                  3235, 3225));

    platforms.push(createPlatform(3140, 240, 70,
                                  -0.05, 0,
                                  50, 20, 100,
                                  3145, 3135));

    platforms.push(createPlatform(3345, 145, 70,
                                  0.4, 0,
                                  255, 250, 0,
                                  3385, 3320));

    platforms.push(createPlatform(3655, 200, 70,
                                  0.05, 0,
                                  0, 150, 0,
                                  3660, 3650));

    //big jump
    //ballon section 3
    platforms.push(createPlatform(4160, 410, 70,
                                  0.05, 0,
                                  100, 120, 100,
                                  4165, 4155));

    platforms.push(createPlatform(4120, 220, 70,
                                  -0.05, 0,
                                  0, 0, 200,
                                  4125, 4115));

    //balloon section 4
    platforms.push(createPlatform(4320, 120, 70,
                                  0.5, 0,
                                  0, 0, 200,
                                  4490, 4285));

    platforms.push(createPlatform(4720, 220, 70,
                                  0.05, 0,
                                  255, 100, 0,
                                  4725, 4715));

    platforms.push(createPlatform(4920, 100, 70,
                                  0.5, 0,
                                  255, 100, 0,
                                  5005, 4815));

   platforms.push(createPlatform(5120, 150, 70,
                                  0.5, 0,
                                  255, 100, 0,
                                  5305, 5115));

    platforms.push(createPlatform(5100, 400, 70,
                                  0.6, 0,
                                  0, 250, 100,
                                  5200, 5000));

    platforms.push(createPlatform(5400, 320, 70,
                                  0.05, 0,
                                  255, 100, 0,
                                  5405, 5395));



}


function draw()
{

  if (audioMute == false) {
    themeSound.setVolume(0.24);
  } else if (audioMute == true) {
    themeSound.setVolume(0.0);
  }

   // console.log(audioMute);
    // fill the sky blue
	  background(176, 196, 222);

    fill(255, 255, 255, 10);
    noStroke();
    ellipse(width/2, 100, 1000, 100);
    ellipse(width/2, 150, 1000, 100);

    // draw some green ground
    noStroke();
	  fill(0,155,0);
	  rect(0, floorPos_y, width, 20);

    fill(57, 117, 0);
    rect(0, floorPos_y + 20, width, 20);

    fill(60, 50, 3);
    rect(0, floorPos_y + 40, width, height);

    fill(0, 0, 0, 50);
    rect(0, floorPos_y + 88, width, height);

    push();
    translate(scrollPos, 0);
    //console.log(scrollPos);



    drawBalloonRace();

	// Draw clouds.
    drawClouds();

	// Draw mountains.
    drawMountains();

    //draw hills
    drawHills();

	// Draw trees.
    drawTrees();

    drawBalloonStart();

	// Draw canyons.
    for(var i = 0; i < canyon.length; i ++)
    {
        drawCanyon(canyon[i]);
        checkCanyon(canyon[i]);
    }

	// Draw collectable items.
    for(var i = 0; i < collectable.length; i++)
    {
        if(!collectable[i].isFound)
            {
                checkCollectable(collectable[i]);
                drawCollectable(collectable[i]);
            }
    }

    drawMountainGround();
    drawWavesFront();
    renderFlagpole();


    //platform
    for(var i = 0; i < platforms.length; i++)
        {
            platforms[i].draw();
        }


    //enemies
    for(var i = 0; i < enemies.length; i++)
        {
            enemies[i].update();
            enemies[i].draw();

            if(enemies[i].isContact(gameChar_world_x, gameChar_y))
            {
                startGame();
                break;
               //console.log("you die");
            }
        }

   pop();

	// Draw game character.
	drawGameChar();

	// Logic to make the game character move or the background scroll.
	if(isLeft)
	{
		if(gameChar_x > width * 0.2)
		{
			gameChar_x -= 5;
		}
		else
		{
			scrollPos += 5;
		}
	}

	if(isRight)
	{
		if(gameChar_x < width * 0.8)
		{
			gameChar_x  += 5;
		}
		else
		{
			scrollPos -= 5; // negative for moving against the background
		}
	}



 	// Logic to make the game character rise and fall.
    //and PLatforms
    if (gameChar_y < floorPos_y)
    {

        for(var i = 0; i < platforms.length; i ++)
        {
            var isContact = false;
            if(platforms[i].checkContact(gameChar_world_x, gameChar_y) == true)
            {
                isContact = true;
                break;
            }
        }

        if(isContact == false)
        {
          isFalling = true;
          gameChar_y += 2;
        }
        else
        {
            isFalling = false;
        }

    }
    else
    {
        isFalling = false;
    }


    if(flagpole.isReached != true)
    {
        checkFlagpole();
    }

    //Display SCORE;
    fill(0);
    noStroke();
    textSize(25);
    text("Score: " + game_score, 30, 40)

    //draw lives
    for(var i = 0; i < lives; i++)
    {


    //left ear
    fill(200, 150, 30);
    triangle(840 + i * 60, 20,
            841 + i * 60, 5,
            856 + i * 60, 20);

    //left ear inner
    fill(218, 165, 32, 150);
    triangle(843 + i * 60, 18,
            843 + i * 60, 8,
            852 + i * 60, 19);

    //right ear
    fill(200, 150, 30);
    triangle(885 + i * 60, 20,
            884 + i * 60, 5,
            869 + i * 60, 20);

    //right ear inner
    fill(218, 165, 32, 150);
    triangle(883 + i * 60, 18,
            882.5 + i * 60, 8,
            874 + i * 60, 19);

    fill(200, 150, 30);
    //body
    rect(840 + i * 60, 20,
         45, 40,
         0, 0,
         10, 10);

    //eyes
    fill(255);
    ellipse(857 + i * 60, 34,
            15);
    ellipse(868 + i * 60, 34,
            15);

    //eyes pupil
    fill(50, 50, 100);
    ellipse(857 + i * 60, 34,
            5);
    ellipse(868 + i * 60, 34,
            5);
    }

	// Update real position of gameChar for collision detection.
	gameChar_world_x = gameChar_x - scrollPos;

    //display GAME OVER if lives < 1
    if(lives < 1)
    {
        text("Game Over. Press SPACE BAR to continue", 300, 300);
        return;
    }

    //start game if lives > 0
    if(gameChar_y > floorPos_y + 150 && lives > 0)
    {
        startGame();
    }


    if(flagpole.isReached == true)
    {
        text("Level Complete....", 300, 300);
        return;

    }

}


// ---------------------
// Key control functions
// ---------------------

function keyPressed(){

	console.log("press " + keyCode);
	console.log("press " + key);

    if(flagpole.isReached && key == ' ')
    {
        nextLevel();
        return
    }
    else if(lives == 0 && key == ' ')
    {
        returnToStart();
        return
    }



    if (keyCode == 37)
    {
        isLeft = true;
    }

    if (keyCode == 39)
    {
        isRight = true;
    }

    if (keyCode == 40)
    {
        isPouncing = true;
        purrSound.play();
    }

    if (keyCode == 77 ) {
      audioMute += 1;
      if (audioMute > 1) {
        audioMute = 0;
      }
    }




    for(var i = 0; i < platforms.length; i++)    {

    if ((keyCode == 32 && gameChar_y == floorPos_y) || (keyCode == 32 && platforms[i].checkContact(gameChar_world_x, gameChar_y)))
    {
        isFalling = true;
        gameChar_y -= 220;
        jumpSound.play();
    }
    else
    {
        isFalling = false;
    }
  }



}

function keyReleased()
{

	console.log("release " + keyCode);
	console.log("release " + key);

    if (keyCode == 37)
        {
            isLeft = false;
        }

    if (keyCode == 39)
        {
            isRight = false;
        }
    if (keyCode == 40)
        {
            isPouncing = false;
            purrSound.pause();
        }
}


// ------------------------------
// Game character render function
// ------------------------------

// Function to draw the game character.

function drawGameChar()
{

    if(lives < 1)
    {
        return;
    }
    if(flagpole.isReached == true)
    {
        return;
    }


	// draw game character

  if(isLeft && isFalling)
	{
    //jumping-left code

    //tail
    stroke(218, 165, 32);
    strokeWeight(10);
    noFill();
    bezier(gameChar_x + 30, gameChar_y - 18,
          gameChar_x + 90, gameChar_y - 20,
          gameChar_x + 40, gameChar_y - 50,
          gameChar_x + 85, gameChar_y - 48);
    noStroke();

    //stripes tail
    fill(200, 150, 30);
    rect(gameChar_x + 82, gameChar_y - 53, 2, 10);
    rect(gameChar_x + 79, gameChar_y - 53, 2, 10);

     //left ear
    fill(200, 150, 30);
    triangle(gameChar_x + 10, gameChar_y - 46,
            gameChar_x + 33, gameChar_y - 59,
            gameChar_x + 29, gameChar_y - 48);

    //right ear
    fill(200, 150, 30);
    triangle(gameChar_x + 45, gameChar_y - 48,
            gameChar_x + 51, gameChar_y - 59,
            gameChar_x + 29, gameChar_y - 48);

    //Right ear inner
    fill(218, 165, 32, 150);
    triangle(gameChar_x + 41, gameChar_y - 43,
            gameChar_x + 50, gameChar_y - 58,
            gameChar_x + 26, gameChar_y - 43);

    //left leg
    fill(218, 165, 32);
    rect(gameChar_x + 5, gameChar_y - 10,
         13, 5,
         0, 0, 5, 5);
    //right leg
    fill(218, 150, 32);
    rect(gameChar_x + 26, gameChar_y - 10,
         13, 10,
         0, 0, 3, 3);

    fill(200, 150, 30);
    //body
    rect(gameChar_x, gameChar_y - 48,
         45, 40,
         17, 0,
         10, 10);

    //eyes
    fill(255);
    ellipse(gameChar_x + 11, gameChar_y - 34,
            15, 15);
    ellipse(gameChar_x + 22, gameChar_y - 34,
            15, 15);

    //eyes pupil
    fill(50, 50, 100);
    ellipse(gameChar_x + 8, gameChar_y - 36,
            7, 7);
    ellipse(gameChar_x + 20, gameChar_y - 36,
            7, 7);

    fill(218, 165, 32);
    //stripes
    rect(gameChar_x + 13, gameChar_y - 48, 2, 5);
    rect(gameChar_x + 16, gameChar_y - 48, 2, 5);

	}
	else if(isRight && isFalling)
	{
    //jumping-right code

    //tail
    stroke(218, 165, 32);
    strokeWeight(10);
    noFill();
    bezier(gameChar_x + 2, gameChar_y - 18,
          gameChar_x - 35, gameChar_y - 20,
          gameChar_x , gameChar_y - 50,
          gameChar_x - 45, gameChar_y - 48);
    noStroke();

    //stripes tail
    fill(200, 150, 30);
    rect(gameChar_x - 45, gameChar_y - 53, 2, 10);
    rect(gameChar_x - 42, gameChar_y - 53, 2, 10);

    //left ear
    fill(200, 150, 30);
    triangle(gameChar_x, gameChar_y - 48,
            gameChar_x + - 6, gameChar_y - 59,
            gameChar_x + 16, gameChar_y - 48);

    //left ear inner
    fill(218, 165, 32, 150);
    triangle(gameChar_x + 3, gameChar_y - 43,
            gameChar_x + -4, gameChar_y - 58,
            gameChar_x + 18, gameChar_y - 43);

    //right ear
    fill(200, 150, 30);
    triangle(gameChar_x + 15, gameChar_y - 48,
            gameChar_x + 10, gameChar_y - 59,
            gameChar_x + 34, gameChar_y - 46);

    //left leg
    fill(218, 150, 32);
    rect(gameChar_x + 5, gameChar_y - 10,
         13, 10,
         0, 0, 3, 3);
    //right leg
    fill(218, 165, 32);
    rect(gameChar_x + 26, gameChar_y - 10,
         13, 5,
         0, 0, 5, 5);

    fill(200, 150, 30);
    //body
    rect(gameChar_x, gameChar_y - 48,
         45, 40,
         0, 17,
         10, 10);

    //eyes
    fill(255);
    ellipse(gameChar_x + 22, gameChar_y - 34,
            15, 15);
    ellipse(gameChar_x + 34, gameChar_y - 34,
            15, 15);

    //eyes pupil
    fill(50, 50, 100);
    ellipse(gameChar_x + 25, gameChar_y - 36,
            7, 7);
    ellipse(gameChar_x + 37, gameChar_y - 36,
            7, 7);

    fill(218, 165, 32);
    //stripes
    rect(gameChar_x + 27, gameChar_y - 48, 2, 5);
    rect(gameChar_x + 30, gameChar_y - 48, 2, 5);

	}
	else if(isLeft)
	{
    // walking left code

    //tail
    stroke(218, 165, 32);
    strokeWeight(10);
    noFill();
    bezier(gameChar_x + 30, gameChar_y - 20,
          gameChar_x + 70, gameChar_y - 8,
          gameChar_x + 35, gameChar_y - 63,
          gameChar_x + 80, gameChar_y - 63);
    noStroke();

    //stripes tail
    fill(200, 150, 30);
    rect(gameChar_x + 76, gameChar_y - 68, 2, 10);
    rect(gameChar_x + 79, gameChar_y - 68, 2, 10);

     //left ear
    fill(200, 150, 30);
    triangle(gameChar_x + 10, gameChar_y - 46,
            gameChar_x + 27, gameChar_y - 63,
            gameChar_x + 29, gameChar_y - 48);

    //right ear
    fill(200, 150, 30);
    triangle(gameChar_x + 45, gameChar_y - 48,
            gameChar_x + 44, gameChar_y - 63,
            gameChar_x + 29, gameChar_y - 48);

    //Right ear inner
    fill(218, 165, 32, 150);
    triangle(gameChar_x + 43, gameChar_y - 43,
            gameChar_x + 42.5, gameChar_y - 58,
            gameChar_x + 26, gameChar_y - 43);

    //left leg
    fill(218, 155, 32);
    rect(gameChar_x + 5, gameChar_y - 10,
         13, 10,
         0, 0, 5, 5);
    //right leg
        fill(218, 150, 32);
    rect(gameChar_x + 26, gameChar_y - 10,
         13, 10,
         0, 0, 3, 3);

    fill(200, 150, 30);
    //body
    rect(gameChar_x, gameChar_y - 48,
         45, 40,
         17, 0,
         10, 10);

    //eyes
    fill(255);
    ellipse(gameChar_x + 11, gameChar_y - 34,
            15, 15);
    ellipse(gameChar_x + 22, gameChar_y - 34,
            15, 15);

    //eyes pupil
    fill(50, 50, 100);
    ellipse(gameChar_x + 8, gameChar_y - 34,
            5, 5);
    ellipse(gameChar_x + 20, gameChar_y - 34,
            5, 5);

    fill(218, 165, 32);
    //stripes
    rect(gameChar_x + 13, gameChar_y - 48, 2, 5);
    rect(gameChar_x + 16, gameChar_y - 48, 2, 5);



	}
	else if(isRight)
	{
    //walking right code

    //tail
    stroke(218, 165, 32);
    strokeWeight(10);
    noFill();
    bezier(gameChar_x + 2, gameChar_y - 18,
          gameChar_x - 28, gameChar_y - 28,
          gameChar_x + 5, gameChar_y - 63,
          gameChar_x - 35, gameChar_y - 63);
    noStroke();

    //stripes tail
    fill(200, 150, 30);
    rect(gameChar_x - 34, gameChar_y - 68, 2, 10);
    rect(gameChar_x - 31, gameChar_y - 68, 2, 10);

    //left ear
    fill(200, 150, 30);
    triangle(gameChar_x, gameChar_y - 48,
            gameChar_x + 1, gameChar_y - 63,
            gameChar_x + 16, gameChar_y - 48);

    //left ear inner
    fill(218, 165, 32, 150);
    triangle(gameChar_x + 3, gameChar_y - 43,
            gameChar_x + 3, gameChar_y - 58,
            gameChar_x + 18, gameChar_y - 43);

    //right ear
    fill(200, 150, 30);
    triangle(gameChar_x + 15, gameChar_y - 48,
            gameChar_x + 16, gameChar_y - 63,
            gameChar_x + 34, gameChar_y - 46);

    //left leg
    fill(218, 150, 32);
    rect(gameChar_x + 5, gameChar_y - 10,
         13, 10,
         0, 0, 3, 3);
    //right leg
    fill(218, 165, 32);
    rect(gameChar_x + 26, gameChar_y - 10,
         13, 10,
         0, 0, 5, 5);

    fill(200, 150, 30);
    //body
    rect(gameChar_x, gameChar_y - 48,
         45, 40,
         0, 17,
         10, 10);

    //eyes
    fill(255);
    ellipse(gameChar_x + 22, gameChar_y - 34,
            15, 15);
    ellipse(gameChar_x + 34, gameChar_y - 34,
            15, 15);

    //eyes pupil
    fill(50, 50, 100);
    ellipse(gameChar_x + 25, gameChar_y - 34,
            5, 5);
    ellipse(gameChar_x + 37, gameChar_y - 34,
            5, 5);

    fill(218, 165, 32);
    //stripes
    rect(gameChar_x + 27, gameChar_y - 48, 2, 5);
    rect(gameChar_x + 30, gameChar_y - 48, 2, 5);

	}
	else if(isFalling || isPlummeting)
	{
    //jumping facing forwards code

    //tail
    stroke(218, 165, 32);
    strokeWeight(10);
    noFill();
    bezier(gameChar_x + 2, gameChar_y - 18,
          gameChar_x - 40, gameChar_y - 38,
          gameChar_x + 15, gameChar_y - 53,
          gameChar_x - 30, gameChar_y - 53);
    noStroke();


    //stripes tail
    fill(200, 150, 30);
    rect(gameChar_x - 30, gameChar_y - 58, 2, 10);
    rect(gameChar_x - 27, gameChar_y - 58, 2, 10);

    //left ear
    fill(200, 150, 30);
    triangle(gameChar_x, gameChar_y - 48,
            gameChar_x -3, gameChar_y - 60,
            gameChar_x + 16, gameChar_y - 48);

    //left ear inner
    fill(218, 165, 32, 150);
    triangle(gameChar_x + 3, gameChar_y - 43,
            gameChar_x + -1, gameChar_y - 58,
            gameChar_x + 18, gameChar_y - 43);

    //right ear
    fill(200, 150, 30);
    triangle(gameChar_x + 45, gameChar_y - 48,
            gameChar_x + 48, gameChar_y - 60,
            gameChar_x + 29, gameChar_y - 48);

    //right ear inner
    fill(218, 165, 32, 150);
    triangle(gameChar_x + 43, gameChar_y - 43,
            gameChar_x + 46, gameChar_y - 58,
            gameChar_x + 28, gameChar_y - 43);


    //left leg
    fill(218, 155, 32);
    rect(gameChar_x + 5, gameChar_y - 10,
         13, 5,
         0, 0, 5, 5);
    //right leg
    fill(218, 165, 32);
    rect(gameChar_x + 26, gameChar_y - 10,
         13, 5,
         0, 0, 5, 5);

    //left paw
    stroke(218, 165, 32);
    strokeWeight(1);
    fill(218, 165, 32);
    rect(gameChar_x - 5, gameChar_y - 34,
        8, 10,
        5, 2, 2, 5);

    //left paw outer
    stroke(200, 150, 32);
    strokeWeight(1);
    fill(218, 165, 32);
    rect(gameChar_x - 5, gameChar_y - 34,
        8, 10,
        5, 2, 2, 5);

    //right paw
    fill(220, 168, 34);
    rect(gameChar_x + 41, gameChar_y - 34,
        8, 10,
        2, 5, 5, 2);
    noStroke();

    //body
    fill(200, 150, 30);
    rect(gameChar_x, gameChar_y - 48,
         45, 40,
         0, 0,
         10, 10);

    //eyes
    fill(255);
    ellipse(gameChar_x + 17, gameChar_y - 34,
            15, 15);
    ellipse(gameChar_x + 28, gameChar_y - 34,
            15, 15);

    //eyes pupil
    fill(50, 50, 100);
    ellipse(gameChar_x + 17, gameChar_y - 37,
            7, 7);
    ellipse(gameChar_x + 28, gameChar_y - 37,
            7, 7);

    fill(218, 165, 32);
    //stripes
    rect(gameChar_x + 20, gameChar_y - 48, 2, 3);
    rect(gameChar_x + 23, gameChar_y - 48, 2, 3);

	}
    else if (isPouncing)
    {
        //tail
    stroke(218, 165, 32);
    strokeWeight(10);
    noFill();
    bezier(gameChar_x + 40, gameChar_y - 18,
          gameChar_x - 80, gameChar_y - 28,
          gameChar_x + 65, gameChar_y - 64,
          gameChar_x + 12, gameChar_y - 66);
    noStroke();

    //stripes tail
    fill(200, 150, 30);
    rect(gameChar_x  + 11, gameChar_y - 71, 2, 10);
    rect(gameChar_x  + 14, gameChar_y - 71, 2, 10);

    //left ear
    fill(200, 150, 30);
    triangle(gameChar_x, gameChar_y - 42,
            gameChar_x -6, gameChar_y - 54,
            gameChar_x + 16, gameChar_y - 42);

    //left ear inner
    fill(218, 165, 32, 150);
    triangle(gameChar_x + 3, gameChar_y - 37,
            gameChar_x - 5, gameChar_y - 52,
            gameChar_x + 18, gameChar_y -37);

    //right ear
    fill(200, 150, 30);
    triangle(gameChar_x + 45, gameChar_y -42,
            gameChar_x + 50, gameChar_y - 54,
            gameChar_x + 29, gameChar_y - 42);

    //right ear inner
    fill(218, 165, 32, 150);
    triangle(gameChar_x + 43, gameChar_y -37,
            gameChar_x + 49, gameChar_y - 52,
            gameChar_x + 26, gameChar_y - 37);


    //left leg
    fill(218, 155, 32);
    rect(gameChar_x + 5, gameChar_y - 10, 13, 10, 0, 0, 5, 5);
    //right leg
    fill(218, 165, 32);
    rect(gameChar_x + 26, gameChar_y - 10,          13, 10,
     0, 0, 5, 5);

    fill(200, 150, 30);
    //body
    rect(gameChar_x, gameChar_y - 42,
         45, 40,
         0, 0,
         10, 10);

    //eyes
    fill(255);
    ellipse(gameChar_x + 17, gameChar_y - 29,
            15, 15);
    ellipse(gameChar_x + 28, gameChar_y - 29,
            15, 15);

    //eyes pupil
    fill(50, 50, 100);
    ellipse(gameChar_x + 17, gameChar_y - 29,
            10, 10);
    ellipse(gameChar_x + 28, gameChar_y - 29,
            10, );

        //eyes pupil white
    fill(255);
    ellipse(gameChar_x + 20, gameChar_y - 31,
            1);
    ellipse(gameChar_x + 31, gameChar_y - 31,
            1);

    fill(218, 165, 32);
    //stripes
    rect(gameChar_x + 20, gameChar_y - 42, 2, 5);
    rect(gameChar_x + 23, gameChar_y - 42, 2, 5);

    }
	else
	{
    //Standing, facing frontwards
    //tail
    stroke(218, 165, 32);
    strokeWeight(10);
    noFill();
    bezier(gameChar_x + 40, gameChar_y - 18,
          gameChar_x - 70, gameChar_y - 28,
          gameChar_x + 65, gameChar_y - 64,
          gameChar_x + 12, gameChar_y - 66);
    noStroke();

    //stripes tail
    fill(200, 150, 30);
    rect(gameChar_x  + 11, gameChar_y - 71, 2, 10);
    rect(gameChar_x  + 14, gameChar_y - 71, 2, 10);

    //left ear
    fill(200, 150, 30);
    triangle(gameChar_x, gameChar_y - 48,
            gameChar_x + 1, gameChar_y - 63,
            gameChar_x + 16, gameChar_y - 48);

    //left ear inner
    fill(218, 165, 32, 150);
    triangle(gameChar_x + 3, gameChar_y - 43,
            gameChar_x + 3, gameChar_y - 58,
            gameChar_x + 18, gameChar_y -43);

    //right ear
    fill(200, 150, 30);
    triangle(gameChar_x + 45, gameChar_y -48,
            gameChar_x + 44, gameChar_y - 63,
            gameChar_x + 29, gameChar_y - 48);

    //right ear inner
    fill(218, 165, 32, 150);
    triangle(gameChar_x + 43, gameChar_y -43,
            gameChar_x + 42.5, gameChar_y - 58,
            gameChar_x + 26, gameChar_y - 43);


    //left leg
    fill(218, 155, 32);
    rect(gameChar_x + 5, gameChar_y - 10, 13, 10, 0, 0, 5, 5);
    //right leg
    fill(218, 165, 32);
    rect(gameChar_x + 26, gameChar_y - 10, 13, 10,
     0, 0, 5, 5);

    fill(200, 150, 30);
    //body
    rect(gameChar_x, gameChar_y - 48,
         45, 40,
         0, 0,
         10, 10);

    //eyes
    fill(255);
    ellipse(gameChar_x + 17, gameChar_y - 34,
            15, 15);
    ellipse(gameChar_x + 28, gameChar_y - 34,
            15, 15);

    //eyes pupil
    fill(50, 50, 100);
    ellipse(gameChar_x + 17, gameChar_y - 34,
            5, 5);
    ellipse(gameChar_x + 28, gameChar_y - 34,
            5, 5);

    fill(218, 165, 32);
    //stripes
    rect(gameChar_x + 20, gameChar_y - 48, 2, 5);
    rect(gameChar_x + 23, gameChar_y - 48, 2, 5);

    }

}

// ---------------------------
// Background render functions
// ---------------------------

//small balloons racing
function drawBalloonRace()
{

    strokeWeight(1);
    for(var k = 0; k < balloonRace.length; k++)
        {

        ////small balloon
        for(var l = 0; l < 5; l++)
        {
            stroke(0,0, 0, 10);

            fill(balloonRace[k].r - l * 100,
                 balloonRace[k].g + l * random(50, 55),
                 balloonRace[k].b + l * 50);

            ellipse(balloonRace[k].x_pos, balloonRace[k].y_pos,
                    60 - l *  13,
                    60)
        }

    for(var i = 0; i < 5; i ++)
        {
            for(var j = 0; j < 5; j++)
            {


                fill(60, 60, 60);

                rect(balloonRace[k].x_pos -2 + i * 1.2,
                     balloonRace[k].y_pos + 35 + j * 1.2,
                     1, 1,
                     2, 2);
            }
        }
                balloonRace[k].x_pos = balloonRace[k].x_pos + balloonRace[k].speedX;
    }
    noStroke();


}

//balloon at start
function drawBalloonStart()
{
    for ( var i = 0; i < balloonStart.length; i ++)
    {



        //Rigging
        noFill();
        stroke(0);
        beginShape();
        vertex(balloonStart[i].x_pos - 64, balloonStart[i].y_pos - 245);
        vertex(balloonStart[i].x_pos - 8, balloonStart[i].y_pos - 65);
        vertex(balloonStart[i].x_pos + 20, balloonStart[i].y_pos - 195);
        vertex(balloonStart[i].x_pos + 59, balloonStart[i].y_pos - 65);
        vertex(balloonStart[i].x_pos + 104, balloonStart[i].y_pos - 245);
        vertex(balloonStart[i].x_pos - 8, balloonStart[i].y_pos - 65);
        endShape();

        beginShape();
        vertex(balloonStart[i].x_pos - 65, balloonStart[i].y_pos - 245);
        vertex(balloonStart[i].x_pos + 59, balloonStart[i].y_pos - 65);
        endShape();


        //Balloon
        for(var k = 0; k < 5; k++)
        {
            stroke(0, 0, 0, 50);
            fill(200 - k * 100,10 + k * random(50, 55), + k * 200);
            ellipse(balloonStart[i].x_pos + 20, balloonStart[i].y_pos - 300,
                    200 - k *  45, 210)
        }

       //basket
        for(var k = 0; k < 14; k ++)
        {
            for(var j = 0; j < 6; j++)
            {
                stroke(100, 200, 10, 100);
                fill(220, 220,0);
                rect(balloonStart[i].x_pos - 11 + k * 5,
                     balloonStart[i].y_pos - 64 + j * 4,
                     5, 5,
                     2, 2);
                noStroke();
            }
        }

        balloonStart[i].y_pos = balloonStart[i].y_pos + balloonStart[i].speedY;
        balloonStart[i].x_pos = balloonStart[i].x_pos + balloonStart[i].speedX;



    }


}

// Function to draw cloud objects.
function drawClouds()
{
    for(var i = 0; i < clouds.length; i++)
    {
        fill(255);
        ellipse(clouds[i].x_pos, clouds[i].y_pos, clouds[i].scale * 600, clouds[i].scale * 200);
        ellipse(clouds[i].x_pos, clouds[i].y_pos, clouds[i].scale * 240, clouds[i].scale * 360);
        ellipse(clouds[i].x_pos - 50, clouds[i].y_pos - 20, clouds[i].scale * 200, clouds[i].scale * 200);
        ellipse(clouds[i].x_pos - 50, clouds[i].y_pos + 15, clouds[i].scale * 200, clouds[i].scale * 200);
        ellipse(clouds[i].x_pos + 50, clouds[i].y_pos - 30, clouds[i].scale * 200, clouds[i].scale * 200);

        fill(100, 100, 100, 40);
        ellipse(clouds[i].x_pos - 50, clouds[i].y_pos - 15, clouds[i].scale * 160, clouds[i].scale * 160);

        fill(255);
        ellipse(clouds[i].x_pos - 42, clouds[i].y_pos - 10, clouds[i].scale * 160, clouds[i].scale * 160);

        clouds[i].x_pos = clouds[i].x_pos + clouds[i].speed;

    }
}

//mountain background
function drawMountainGround()
{
        for(var i = 0; i < mt_Ground.length; i++)
        {
        //mountain west
        fill(mt_Ground[i].r1, mt_Ground[i].g1, mt_Ground[i].b1) ;
        quad(mt_Ground[i].x_pos - 200 * mt_Ground[i].width, mt_Ground[i].y_pos,
             mt_Ground[i].x_pos - 150 * mt_Ground[i].width,
             mt_Ground[i].y_pos - 82 * mt_Ground[i].height,
             mt_Ground[i].x_pos, mt_Ground[i].y_pos - 232 * mt_Ground[i].height,
             mt_Ground[i].x_pos + 150 * mt_Ground[i].width, mt_Ground[i].y_pos);

        //mountain east
        fill(mt_Ground[i].r2, mt_Ground[i].g2, mt_Ground[i].b2);
        quad(mt_Ground[i].x_pos, mt_Ground[i].y_pos - 232 * mt_Ground[i].height,

             mt_Ground[i].x_pos + 240 * mt_Ground[i].width + mt_Ground[i].peakX, mt_Ground[i].y_pos - 112 * mt_Ground[i].height + mt_Ground[i].peakY,
             mt_Ground[i].x_pos + 380 * mt_Ground[i].width,  mt_Ground[i].y_pos ,
             mt_Ground[i].x_pos + 150 * mt_Ground[i].width, mt_Ground[i].y_pos);
        }
}


//draw hills
function drawHills()
{
    for(var i = 0; i < hills.length; i++)
        {
        //mountain west
        fill(hills[i].r1, hills[i].g1, hills[i].b1) ;
        quad(hills[i].x_pos - 200 * hills[i].width, floorPos_y,
             hills[i].x_pos - 150 * hills[i].width, floorPos_y - 82 * hills[i].height,
             hills[i].x_pos, floorPos_y - 232 * hills[i].height,
             hills[i].x_pos + 150 * hills[i].width, floorPos_y);

        //mountain east
        fill(hills[i].r2, hills[i].g2, hills[i].b2);
        quad(hills[i].x_pos, floorPos_y - 232 * hills[i].height,
             hills[i].x_pos + 240 * hills[i].width, floorPos_y - 112 * hills[i].height,
             hills[i].x_pos + 380 * hills[i].width,  floorPos_y,
             hills[i].x_pos + 150 * hills[i].width, floorPos_y);
        }
}

// Function to draw mountains objects.
function drawMountains()
{
    for(var i = 0; i < mountains.length; i ++)
    {

        //MOUNTAIN
        //mountain west
        fill(100);
        quad(mountains[i] - 200, floorPos_y,
             mountains[i] - 150, floorPos_y - 82,
             mountains[i], floorPos_y - 232,
             mountains[i] + 150, floorPos_y);

        //mountain east
        fill(150);
        quad(mountains[i], floorPos_y - 232,
             mountains[i] + 240, floorPos_y - 112,
             mountains[i] + 380, floorPos_y,
             mountains[i] + 150, floorPos_y);

        //mountain snow west
        fill(240, 240, 255);
        stroke(255);
        strokeWeight(1);
        beginShape();
        vertex(mountains[i], floorPos_y - 232);
        vertex(mountains[i] - 100,floorPos_y - 132);
        vertex(mountains[i] - 50, floorPos_y - 112);
        vertex(mountains[i], floorPos_y - 132);
        vertex(mountains[i] + 50,floorPos_y - 112);
        vertex(mountains[i] + 70,floorPos_y - 124);
        endShape();
        noStroke();

        //mountain snow east
        stroke(255);
        fill(230)
        beginShape();
        vertex(mountains[i], floorPos_y - 232);
        vertex(mountains[i] + 70, floorPos_y - 124);
        vertex(mountains[i] + 100, floorPos_y - 112);
        vertex(mountains[i] + 110, floorPos_y - 132);
        vertex(mountains[i] + 150, floorPos_y - 132);
        vertex(mountains[i] + 170, floorPos_y - 132);
        vertex(mountains[i] + 180, floorPos_y - 142);
        endShape();
        noStroke();

    }

}

// Function to draw trees objects.
function drawTrees()
{

    for(var i = 0; i < trees.length; i++)
    {
        //Tree

        //Leaves
        fill(34, 139, 34)
        ellipse(trees[i].x_pos - 32  + trees[i].scale * 50, floorPos_y - 232 * trees[i].height,
                130 * trees[i].scale + 25,
                110 * trees[i].scale + 25);
        fill(143, 188, 143, 200)
        ellipse(trees[i].x_pos - 32 + trees[i].scale * 50, floorPos_y - 232 * trees[i].height,
                120 * trees[i].scale + 25,
                110 * trees[i].scale + 25);

        fill(34, 139, 34);
        ellipse(trees[i].x_pos + 55 + trees[i].scale * -50, floorPos_y - 182 * trees[i].height,
                105 * trees[i].scale,
                100 * trees[i].scale);
        fill(143, 188, 143);
        ellipse(trees[i].x_pos + 60 + trees[i].scale * -50, floorPos_y - 182 * trees[i].height,
                105 * trees[i].scale,
                100 * trees[i].scale);

        fill(34, 139, 34);
        ellipse(trees[i].x_pos - 45 + trees[i].scale * 50, floorPos_y - 124 * trees[i].height,
                90 * trees[i].scale,
                90 * trees[i].scale);

        fill(143, 188, 143);
        ellipse(trees[i].x_pos - 45 + trees[i].scale * 50, floorPos_y - 132 * trees[i].height,
                90 * trees[i].scale,
                90 * trees[i].scale);

        //Tree Trunk
        fill(165, 42, 42);
        quad(trees[i].x_pos - 5, floorPos_y,
             trees[i].x_pos + 5, floorPos_y,
             trees[i].x_pos, floorPos_y - 232 * trees[i].height,
             trees[i].x_pos - 2, floorPos_y - 232 * trees[i].height);

        //branch
        triangle(trees[i].x_pos + 2, floorPos_y - 112 * trees[i].height,
                 trees[i].x_pos - 3, floorPos_y - 114 * trees[i].height,
                 trees[i].x_pos + 35, floorPos_y - 172 * trees[i].height);

        //leaves
        fill(34, 139, 34);
        ellipse(trees[i].x_pos + 25 + trees[i].scale * -10, floorPos_y - 112 * trees[i].height,
                60 * trees[i].scale,
                60 * trees[i].scale);
        fill(143, 188, 143);
        ellipse(trees[i].x_pos + 25 + trees[i].scale * -10, floorPos_y - 112 * trees[i].height,
                50 * trees[i].scale,
                60 * trees[i].scale);
    }

}

function drawWavesFront()
{

    for ( var i = 0; i< wavesFront.length; i ++)
        {
    //Waves top white
    fill(255);
    triangle(wavesFront[i].x_pos,
             wavesFront[i].y_pos + 75,
             wavesFront[i].peak + wavesFront[i].width * 0.25,
             wavesFront[i].y_pos + 63 ,
             wavesFront[i].x_pos + wavesFront[i].width * 0.35,
             wavesFront[i].y_pos + 75);
    triangle(wavesFront[i].x_pos + wavesFront[i].width * 0.35,
             wavesFront[i].y_pos + 75,
             wavesFront[i].peak + wavesFront[i].width * 0.55,
             wavesFront[i].y_pos + 63,
             wavesFront[i].x_pos + wavesFront[i].width * 0.70,
             wavesFront[i].y_pos + 75);
    triangle(wavesFront[i].x_pos + wavesFront[i].width * 0.70,
             wavesFront[i].y_pos + 75,
             wavesFront[i].peak + wavesFront[i].width * 0.92,
             wavesFront[i].y_pos + 63,
             wavesFront[i].x_pos + wavesFront[i].width * 0.99,
             wavesFront[i].y_pos + 75);

    //Waves top
    fill(32, 130, 135);
    triangle(wavesFront[i].x_pos,
             wavesFront[i].y_pos + 75,
             wavesFront[i].peak + wavesFront[i].width * 0.25,
             wavesFront[i].y_pos + 65 ,
             wavesFront[i].x_pos + wavesFront[i].width * 0.35,
             wavesFront[i].y_pos + 75);

    triangle(wavesFront[i].x_pos + wavesFront[i].width * 0.35,
             wavesFront[i].y_pos + 75,
             wavesFront[i].peak + wavesFront[i].width * 0.55,
             wavesFront[i].y_pos + 65,
             wavesFront[i].x_pos + wavesFront[i].width * 0.70,
             wavesFront[i].y_pos + 75);

    triangle(wavesFront[i].x_pos + wavesFront[i].width * 0.70,
             wavesFront[i].y_pos + 75,
             wavesFront[i].peak + wavesFront[i].width * 0.92,
             wavesFront[i].y_pos + 65,
             wavesFront[i].x_pos + wavesFront[i].width * 0.99,
             wavesFront[i].y_pos + 75);

    fill(32, 130, 135);
    rect(wavesFront[i].x_pos, wavesFront[i].y_pos + 75,
         wavesFront[i].width, 150);

        wavesFront[i].peak = wavesFront[i].peak + wavesFront[i].motionX;

    if(wavesFront[i].peak > wavesFront[i].x_pos ||
       wavesFront[i].peak < wavesFront[i].x_pos-30 )
        {
            wavesFront[i].motionX = wavesFront[i].motionX*-1;
        }
    }

}


// ---------------------------------
// Canyon render and check functions
// ---------------------------------

// Function to draw canyon objects.

function drawCanyon(t_canyon)
{


    //sky background sea
    fill(t_canyon.r, t_canyon.g, t_canyon.b);
    rect(t_canyon.x_pos, floorPos_y, t_canyon.width, 50);

    //SEA - Canyon
    fill(32, 178, 170);
    rect(t_canyon.x_pos, t_canyon.y_pos,
         t_canyon.width, 150);

    //Waves top white
    fill(255);
    triangle(t_canyon.x_pos, t_canyon.y_pos,
             t_canyon.peak + t_canyon.width * 0.25, t_canyon.y_pos - 12 ,
             t_canyon.x_pos + t_canyon.width * 0.35, t_canyon.y_pos);
    triangle(t_canyon.x_pos + t_canyon.width * 0.35, t_canyon.y_pos ,
             t_canyon.peak + t_canyon.width * 0.55, t_canyon.y_pos - 12,
             t_canyon.x_pos + t_canyon.width * 0.70, t_canyon.y_pos);
    triangle(t_canyon.x_pos + t_canyon.width * 0.70, t_canyon.y_pos ,
             t_canyon.peak + t_canyon.width * 0.92, t_canyon.y_pos - 12 ,
             t_canyon.x_pos + t_canyon.width * 0.99, t_canyon.y_pos);

    //Waves top
    fill(32, 178, 170);
    triangle(t_canyon.x_pos, t_canyon.y_pos,
             t_canyon.peak + t_canyon.width * 0.25, t_canyon.y_pos - 10 ,
             t_canyon.x_pos + t_canyon.width * 0.35, t_canyon.y_pos);
    triangle(t_canyon.x_pos + t_canyon.width * 0.35, t_canyon.y_pos ,
             t_canyon.peak + t_canyon.width * 0.55, t_canyon.y_pos - 10,
             t_canyon.x_pos + t_canyon.width * 0.70, t_canyon.y_pos);
    triangle(t_canyon.x_pos + t_canyon.width * 0.70, t_canyon.y_pos ,
             t_canyon.peak + t_canyon.width * 0.92, t_canyon.y_pos - 10 ,
             t_canyon.x_pos + t_canyon.width * 0.99, t_canyon.y_pos);


    //middle Sea
    fill(32, 170, 175);
    rect(t_canyon.x_pos, t_canyon.y_pos + 25,
         t_canyon.width, 150)

    //Waves middle white
    fill(255);
    triangle(t_canyon.x_pos, t_canyon.y_pos +25,
             t_canyon.peak + t_canyon.width * 0.25, t_canyon.y_pos + 13 ,
             t_canyon.x_pos + t_canyon.width * 0.35, t_canyon.y_pos +25);
    triangle(t_canyon.x_pos + t_canyon.width * 0.35, t_canyon.y_pos +25,
             t_canyon.peak + t_canyon.width * 0.55, t_canyon.y_pos + 13,
             t_canyon.x_pos + t_canyon.width * 0.70, t_canyon.y_pos +25);
    triangle(t_canyon.x_pos + t_canyon.width * 0.70, t_canyon.y_pos +25,
             t_canyon.peak + t_canyon.width * 0.92, t_canyon.y_pos + 13 ,
             t_canyon.x_pos + t_canyon.width * 0.99, t_canyon.y_pos +25);


    //Waves middle
    fill(32, 170, 175);
    triangle(t_canyon.x_pos, t_canyon.y_pos +25,
             t_canyon.peak + t_canyon.width * 0.25, t_canyon.y_pos + 15 ,
             t_canyon.x_pos + t_canyon.width * 0.35, t_canyon.y_pos + 25);
    triangle(t_canyon.x_pos + t_canyon.width * 0.35, t_canyon.y_pos + 25,
             t_canyon.peak + t_canyon.width * 0.55, t_canyon.y_pos + 15,
             t_canyon.x_pos + t_canyon.width * 0.70, t_canyon.y_pos + 25);
    triangle(t_canyon.x_pos + t_canyon.width * 0.70, t_canyon.y_pos + 25,
             t_canyon.peak + t_canyon.width * 0.92, t_canyon.y_pos + 15 ,
             t_canyon.x_pos + t_canyon.width * 0.99, t_canyon.y_pos + 25);



    //Deep Sea
    fill(0, 139, 139)
    rect(t_canyon.x_pos, t_canyon.y_pos + 50,
         t_canyon.width, 150);


    //Waves deep white
    fill(255)
    triangle(t_canyon.x_pos, t_canyon.y_pos + 50,
             t_canyon.peak + t_canyon.width * 0.25, t_canyon.y_pos + 38 ,
             t_canyon.x_pos + t_canyon.width * 0.35, t_canyon.y_pos + 50);
    triangle(t_canyon.x_pos + t_canyon.width * 0.35, t_canyon.y_pos + 50 ,
             t_canyon.peak + t_canyon.width * 0.55, t_canyon.y_pos + 38,
             t_canyon.x_pos + t_canyon.width * 0.70, t_canyon.y_pos + 50);
    triangle(t_canyon.x_pos + t_canyon.width * 0.70, t_canyon.y_pos + 50,
             t_canyon.peak + t_canyon.width * 0.92, t_canyon.y_pos + 38,
             t_canyon.x_pos + t_canyon.width * 0.99, t_canyon.y_pos + 50);


    //Waves deep
    fill(0, 139, 139)
    triangle(t_canyon.x_pos, t_canyon.y_pos + 50,
             t_canyon.peak + t_canyon.width * 0.25, t_canyon.y_pos + 40 ,
             t_canyon.x_pos + t_canyon.width * 0.35, t_canyon.y_pos + 50);
    triangle(t_canyon.x_pos + t_canyon.width * 0.35, t_canyon.y_pos + 50 ,
             t_canyon.peak + t_canyon.width * 0.55, t_canyon.y_pos + 40,
             t_canyon.x_pos + t_canyon.width * 0.70, t_canyon.y_pos + 50);
    triangle(t_canyon.x_pos + t_canyon.width * 0.70, t_canyon.y_pos + 50,
             t_canyon.peak + t_canyon.width * 0.92, t_canyon.y_pos + 40,
             t_canyon.x_pos + t_canyon.width * 0.99, t_canyon.y_pos + 50);


    t_canyon.peak = t_canyon.peak + t_canyon.motionX;



    if(t_canyon.peak > t_canyon.x_pos ||
       t_canyon.peak < t_canyon.x_pos-30 )
        {
            t_canyon.motionX = t_canyon.motionX*-1;
        }




    // Function to check character is over a canyon.
    if(gameChar_world_x + 25 > t_canyon.x_pos + 5 &&
       gameChar_world_x < t_canyon.x_pos + t_canyon.width - 20  &&
       gameChar_y >= floorPos_y)
    {
        isPlummeting = true;



    }

}

function checkCanyon(t_canyon)
{
    if(isPlummeting == true)
        {
            gameChar_y += 0.2;

        }
}

//flagpole logic
function renderFlagpole()
{
    push();

    if(flagpole.isReached)
    {



     //Standing, facing frontwards

    //left ear
    fill(200, 150, 30);
    triangle(flagpole.x_pos, flagpole.y_pos - 85,
            flagpole.x_pos + 1, flagpole.y_pos - 98,
            flagpole.x_pos + 16, flagpole.y_pos - 85);

    //left ear inner
    fill(218, 165, 32, 150);
    triangle(flagpole.x_pos + 3, flagpole.y_pos - 82,
            flagpole.x_pos + 3, flagpole.y_pos - 97,
            flagpole.x_pos + 18, flagpole.y_pos -76);

    //right ear
    fill(200, 150, 30);
    triangle(flagpole.x_pos + 45, flagpole.y_pos -85,
            flagpole.x_pos + 44, flagpole.y_pos - 98,
            flagpole.x_pos + 29, flagpole.y_pos - 85);

    //right ear inner
    fill(218, 165, 32, 150);
    triangle(flagpole.x_pos + 43, flagpole.y_pos -75,
            flagpole.x_pos + 42.5, flagpole.y_pos - 97,
            flagpole.x_pos + 26, flagpole.y_pos - 76);


    fill(200, 150, 30);
    //body
    rect(flagpole.x_pos, flagpole.y_pos - 85,
         45, 40,
         0, 0,
         10, 10);

    //eyes
    fill(255);
    ellipse(flagpole.x_pos + 17, flagpole.y_pos - 72,
            15, 15);
    ellipse(flagpole.x_pos + 28, flagpole.y_pos - 72,
            15, 15);

    //eyes pupil
    fill(50, 50, 100);
    ellipse(flagpole.x_pos + 17, flagpole.y_pos - 72,
            5, 5);
    ellipse(flagpole.x_pos + 28, flagpole.y_pos - 72,
            5, 5);

    fill(218, 165, 32);
    //stripes
    rect(flagpole.x_pos + 20, flagpole.y_pos - 85, 2, 5);
    rect(flagpole.x_pos + 23, flagpole.y_pos - 85, 2, 5);
    strokeWeight(1);




    //Rigging
    noFill();
    stroke(0);
    beginShape();
    vertex(flagpole.x_pos - 64, flagpole.y_pos - 245);
    vertex(flagpole.x_pos - 8, flagpole.y_pos - 65);
    vertex(flagpole.x_pos + 20, flagpole.y_pos - 195);
    vertex(flagpole.x_pos + 59, flagpole.y_pos - 65);
    vertex(flagpole.x_pos + 104, flagpole.y_pos - 245);
    vertex(flagpole.x_pos - 8, flagpole.y_pos - 65);
    endShape();

    beginShape();
    vertex(flagpole.x_pos - 65, flagpole.y_pos - 245);
    vertex(flagpole.x_pos + 59, flagpole.y_pos - 65);
    endShape();


    //Balloon
    for(var k = 0; k < 5; k++)
    {
        stroke(0, 0, 0, 50);
        fill(200 - k * 100,10 + k * random(50, 55), + k * 200);
        ellipse(flagpole.x_pos + 20, flagpole.y_pos - 300,
                200 - k *  45, 210)
    }

   //basket
    for(var k = 0; k < 14; k ++)
    {
        for(var j = 0; j < 6; j++)
        {
            stroke(100, 200, 10, 100);
            fill(220, 220,0);
            rect(flagpole.x_pos - 11 + k * 5,
                 flagpole.y_pos - 64 + j * 4,
                 5, 5,
                 2, 2);
            noStroke();
        }
    }

   flagpole.y_pos = flagpole.y_pos + flagpole.speedY;
   flagpole.x_pos = flagpole.x_pos + flagpole.speedX;

    }
    else
    {

    //Rigging
    noFill();
    stroke(0);
    beginShape();
    vertex(flagpole.x_pos - 64, flagpole.y_pos - 245);
    vertex(flagpole.x_pos - 8, flagpole.y_pos - 65);
    vertex(flagpole.x_pos + 20, flagpole.y_pos - 195);
    vertex(flagpole.x_pos + 59, flagpole.y_pos - 65);
    vertex(flagpole.x_pos + 104, flagpole.y_pos - 245);
    vertex(flagpole.x_pos - 8, flagpole.y_pos - 65);
    endShape();

    beginShape();
    vertex(flagpole.x_pos - 65, flagpole.y_pos - 245);
    vertex(flagpole.x_pos + 59, flagpole.y_pos - 65);
    endShape();


    //Balloon
    for(var k = 0; k < 5; k++)
    {
        stroke(0, 0, 0, 50);
        fill(200 - k * 100,10 + k * random(50, 55), + k * 200);
        ellipse(flagpole.x_pos + 20, flagpole.y_pos - 300,
                200 - k *  45, 210)
    }

   //basket
    for(var k = 0; k < 14; k ++)
    {
        for(var j = 0; j < 6; j++)
        {
            stroke(100, 200, 10, 100);
            fill(220, 220,0);
            rect(flagpole.x_pos - 11 + k * 5,
                 flagpole.y_pos - 64 + j * 4,
                 5, 5,
                 2, 2);
            noStroke();
        }
    }

}

    pop();
}

// ----------------------------------
// Collectable items render and check functions
// ----------------------------------

// Function to draw collectable objects.

function drawCollectable(t_collectable)
{
        //collectable
        stroke(255, 255, 0);
        fill(210, 210, 100, 200);
        ellipse(t_collectable.x_pos, t_collectable.y_pos,
        random() * 20,
        random() * 20);
        noStroke();
}

// Function to check character has collected an item.

function checkCollectable(t_collectable)
{
    var d = dist(gameChar_world_x  + 20, gameChar_y - 20, t_collectable.x_pos, t_collectable.y_pos);

    if(d < 40)
    {
        game_score += 1;
        t_collectable.isFound = true;
        coinSound.play();
    }
}

function checkFlagpole()
{
    var d = abs(gameChar_world_x - flagpole.x_pos);

    if(d < 50)
        {
            flagpole.isReached = true;
        }
}

function createPlatform(x, y, length, speedX, speedY, r, g, b, moveF, moveB)
{
    var p = {
        x: x,
        y: y,
        length: length,
        speedX: speedX,
        speedY: speedY,
        r: r,
        g: g,
        b: b,
        moveF: moveF,
        moveB: moveB,
        draw: function()
        {
            fill(0)
            stroke(0);
            rect(this.x, this.y, this.length, 5);


        for ( var i = 0; i < balloonStart.length; i ++)
        {



          //Rigging
          noFill();
          stroke(0);
          strokeWeight(1);
          beginShape();
          vertex(this.x - 27, this.y - 150);
          vertex(this.x, this.y);
          vertex(this.x + 36, this.y - 110);
          vertex(this.x + 72, this.y);
          vertex(this.x + 98, this.y - 150);
          vertex(this.x, this.y );
          endShape();

          beginShape();
          vertex(this.x - 27, this.y - 150);
          vertex(this.x + 72, this.y);
          endShape();


          //Balloon
          for(var k = 0; k < 5; k++)
          {
              stroke(0, 0, 255, 25);
              fill(this.r - k * 50, this.g + k * random(50, 55), this.b + k * 50);

              ellipse(this.x + 36, this.y - 180,
                      140 - k *  30, 145)
          }

         //basket
          for(var k = 0; k < 15; k ++)
          {
              for(var j = 0; j < 3; j++)
              {
                  stroke(130);
                  fill(this.r - j * random(50, 100), this. g + j * random(50, 55), this.b + j * 150);
                  rect(this.x -2 + k * 5,
                       this.y + j * 4,
                       5, 5,
                       2, 2);
                  noStroke();
              }
          }


          this.x = this.x + this.speedX;
          //this.y = this.y + this.speedY;



         if(this.x > this.moveF ||
          this.x < this.moveB)
          {
             this.speedX = this.speedX*-1;
          }

  //        if(this.y > this.y + this.move ||
  //        this.y < this.y - this.move)
  //        {
  //           this.speedY = this.speedY*-1;
  //        }




        }


        },
        checkContact: function(gc_x, gc_y)
        {
        //checks if game character is using platform
        if(gc_x > this.x -25 && gc_x < this.x + this.length - 20)
        {
            var d = this.y - gc_y + 2
            if(d >= 0 && d < 5)
                {
                    return true;
                    console.log("in bound")
                }

        }
            return false;

        }


    }

    return p;

}

function Enemy(x, y, range)
{

    this.x = x;
    this.y = y;
    this.range = range;
    this.current_x = x;
    this.incr = -2;

    this.draw = function()
    {


        fill(150);
        stroke(0);
        noStroke();
        strokeWeight(0.2);


        //body 1
        fill(68);
        quad(this.current_x + 26, this.y + 2,
             this.current_x + 44, this.y - 10,
             this.current_x + 82, this.y - 10,
             this.current_x + 60, this.y + 10);

        //body2
        fill(60);
        quad(this.current_x + 26, this.y,
             this.current_x + 40, this.y - 10,
             this.current_x + 80, this.y - 10,
             this.current_x + 50, this.y + 7);

        //body 3
        fill(55);
        quad(this.current_x + 26, this.y,
             this.current_x + 30, this.y - 10,
             this.current_x + 70, this.y - 10,
             this.current_x + 50, this.y + 5);


        //tail
        fill(50);
        quad(this.current_x + 80, this.y - 10,
             this.current_x + 60, this.y + 10,
             this.current_x + 100, this.y + 12,
             this.current_x + 115, this.y - 11);

        //tail 2
        fill(58);
        quad(this.current_x + 90, this.y - 10,
             this.current_x + 70, this.y + 10,
             this.current_x + 110, this.y ,
             this.current_x + 130, this.y - 15);


        //tail 3
        fill(58);
        quad(this.current_x + 110, this.y - 12,
             this.current_x + 80, this.y + 12,
             this.current_x + 160, this.y -18,
             this.current_x + 140, this.y - 18);

        //tail 3
        fill(38);
        quad(this.current_x + 115, this.y - 12,
             this.current_x + 85, this.y + 12,
             this.current_x + 165, this.y -18,
             this.current_x + 145, this.y - 18);


        //wing 4
        fill(38);
        quad(this.current_x + 60, this.y + 10,
             this.current_x + 110, this.y + 18,
             this.current_x + 120, this.y + 18,
             this.current_x + 65, this.y - 10);

        //wing 3
        fill(25);
        quad(this.current_x + 70, this.y + 10,
             this.current_x + 100, this.y + 18,
             this.current_x + 115, this.y + 18,
             this.current_x + 65, this.y - 10);


        //wing 2
        fill(60);
        quad(this.current_x + 65, this.y + 10,
             this.current_x + 95, this.y + 18,
             this.current_x + 110, this.y + 18,
             this.current_x + 65, this.y - 10);


        //wing 1
        fill(80);
        quad(this.current_x + 60, this.y + 10,
             this.current_x + 70, this.y + 12,
             this.current_x + 98, this.y + 15,
             this.current_x + 65, this.y - 10);

        fill(80);
        //head top
        quad(this.current_x + 26, this.y - 10,
            this.current_x + 30, this.y - 15,
            this.current_x + 45, this.y - 16,
            this.current_x + 44, this.y  -10);

        fill(90);
        //head bottom
        quad(this.current_x + 26, this.y - 10,
            this.current_x + 44, this.y - 10,
            this.current_x + 47, this.y + 2,
            this.current_x + 26, this.y + 2);



        //beak
        fill(100);
        beginShape();
        vertex(this.current_x, this.y);
        quadraticVertex(this.current_x + 6, this.y - 6,
                       this.current_x + 26, this.y - 10);
        vertex(this.current_x + 32, this.y - 4);
        vertex(this.current_x + 32, this.y);
        vertex(this.current_x, this.y);
        endShape();

        //beak bottom
        fill(80);
        beginShape();
        vertex(this.current_x, this.y);
        quadraticVertex(this.current_x + 16, this.y + 2,
                       this.current_x + 32, this.y + 2);
        vertex(this.current_x + 32, this.y);
        endShape();

        //eyes
        fill(255);
        ellipse(this.current_x + 35, this.y - 10, 6);
        fill(0);
        ellipse(this.current_x + 35, this.y - 10, 4);

        fill(80)
        rect(this.current_x + 32, this.y - 13, 6, 2);



    }



    //movement of enemy
    this.update = function()
    {
        this.current_x += this.incr;

//        if(this.current_x < this.x)
//            {
//                this.incr = 1;
//            }
//        else if (this.current_x > this.x + this.range)
//            {
//                this.incr = -1;
//            }
    }


    //contact with enemy
    this.isContact = function(gc_x, gc_y)
    {
        var d = dist(gc_x, gc_y, this.current_x, this.y)

        if (d < 10)
        {
            return true;
        }

            return false;
    }
}
