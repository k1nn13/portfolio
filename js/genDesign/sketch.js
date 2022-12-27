

// Creat Instance to use multiple skteches on web page
//--------------------------------------------------//
var b = function(p1) {

  var noiseScale;
  var noiseAmp;
  var spiralFreq;
  var numOctaves;
  var falloff;

  //counters
  var counter = 0;
  var theta_counter = 0;
  let divWidth;
  let divHeight;

  //---------------------------//
  p1.windowResized = function()
  {
    divWidth = document.getElementById("sketch-container-design").offsetWidth *.95;
    divHeight = document.getElementById("sketch-container-design").offsetHeight * 2;
    p1.resizeCanvas(divWidth, 350);
  }

  //---------------------------//
  p1.setup = function() {

    divWidth = document.getElementById("sketch-container-design").offsetWidth *.95;
    divHeight = document.getElementById("sketch-container-design").offsetHeight * 2;

    canvas = p1.createCanvas(divWidth, divHeight);
    canvas.parent("sketch-container-design");


    noiseScale = 0.08;//scale of the input coordinates smaller number smoother wave, freq
    noiseAmp = 0.15;//increases how far the animation perceptual moves closer and further away from the screen, highest peak
    spiralFreq = 30;//spiral amount

    numOctaves = 3.2; //detail of wave - smoothness
    falloff = 4.8; //deepens texture at center background pattern
  }

  //---------------------------//
  p1.draw = function() {
    p1.background(0);

    //Noise Detail
    //Adjusts the character and level of detail produced by the Perlin noise function.
    //octaves = detail of wave, smoothness //number of octaves to be used by the noise
    //falloff =  falloff factor for each octave //smaller number smoother noise
    p1.noiseDetail(numOctaves,falloff);

    ///////////////////////////
    /////MASTER TRANSLATE//////
    p1.translate(p1.width/2, p1.height/2)
    ////////////////////////////

    //select number of points to use for the noise spiral
    for(var i = 0; i < 20; i++)
    {
      //modulation of noise octaves. increasing the positive sin number increased modulation in noise
      var s = p1.map(p1.sin(counter * numOctaves), -1, 1, 0.001, 0.24);

      //modulation of noise scale, creates varaiation in spiral effect cause spiral to twist in on itself at higher values
      //keeping numbers similar helps to start the animation with the recursive patterns near the edge of the screen
      var p = p1.map(p1.sin(noiseScale * counter * mul), -1, 1, -2, -5);

      //applys modulation to the fill alpha value creating different textures in recursive pattern
      var alpha_Fill = p1.map(p1.sin(counter * numOctaves), -1, 1, 0.1, 8);

      //increments noise so movement is bigger towards the edge's of the screen
      //modulates scale
      var n = p1.noise(i * noiseScale * s);

      //maps noise to noise amp value to value is between -1 & 1
      var mul = p1.map(n, 0, 1, 1 - noiseAmp, 1 + noiseAmp);

      //radius of spiral controlled by modulation how wide the circle appears on the screen
      //multyplying r by a larger number increases the size of the apiral
      var r = i * 0.5 - p;

      //x and y co-ordinates for the spiral adding modulation  and placing recursive pattern
      //using trigonometry to create the spiral
      var x = p1.sin(p1.radians(i * spiralFreq)) * r * mul;
      var y = p1.cos(p1.radians(i * spiralFreq)) * r * mul;

      //////////////////////////////
      //call the recursive pattern//
      //////////////////////////////
      p1.drawSquares(x, y + s, //X, Y, POSITION; + modulation of y position
                  20 + x*0.44, 20 + y, //WIDTH, HEIGHT;
                  i + 10, i, 100 - x , 64 + i * alpha_Fill, //FILL COLOUR: RED, GREEN, BLUE, ALPHA;
                  0, 0, 0, 250 - i * 4,//STROKE COLOUR: RED, GREEN, BLUE, ALPHA;
                  theta_counter); //rotate

      // p1.drawSquares(-x, -y + s, //X, Y, POSITION; + modulation of y position
      //             20 + x*0.44, 20 + y, //WIDTH, HEIGHT;
      //             i + 10, i, 100 - x , 64 + i * alpha_Fill, //FILL COLOUR: RED, GREEN, BLUE, ALPHA;
      //             0, 0, 0, 250 - i * 4,//STROKE COLOUR: RED, GREEN, BLUE, ALPHA;
      //             -theta_counter); //rotate
      /////////////////////////////////
      /////////////////////////////////
    }

    //increment varianbles used for rotation and noise modulation
    ///////////////////////
    counter += 0.0001; //speed of noise movement
    theta_counter += 0.0001;//rotatation speed of spiral
    ///////////////////////

  }

  //---------------------------//
  //function to create a recursive pattern
  p1.drawSquares = function(x, y, w, h,
                       r, g, b, a,
                       sR, sG, sB, sA, angle)
  {
    p1.rotate(angle + 0.00001)//setting the angle as a parameter to enable rotation of the enitre recursive pattern
    p1.stroke(sR, sG, sB, sA);//set stroke with parameter values
    p1.fill(r, g, b, a)//set fill with parameter values
    p1.rect(x, y, w, h);//set rect with parameter values w = width, h = height;

    //set minimum value of recursive patterns
    if (w > 10) {

      //calling recursive pattern, the values added here create differnt variations in the recursive pattern
      //layering the patterns by adding differnt values to x,y width and height

      //SQUARES RIGHT
      p1.drawSquares(x + w * 0.5, y,
                  w * 0.6, h * 0.5);

      //SQUARE LEFT
      p1.drawSquares(x - w * 0.5, y,
                  w * 0.5, h * 0.5);

      //SQUARES UP
      p1.drawSquares(x + 100, y + w * 0.8,
                  w * 0.5, h * 0.5);

      //SQUARES DOWN
      p1.drawSquares(x, y - w * 0.6,
                  w * 0.4, h * 0.4);

      //SQUARES TOP RIGHT
      p1.drawSquares(x + w * 0.5, y + w * 0.6,
                  w * 0.6, h * 0.6);
    }
  }
}

//--------------------------------------------//
var myp5 = new p5(b, 'sketch-container-design');
//--------------------------------------------//
