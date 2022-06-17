

var audio;
var audioInit;

var drawValues = [];//envelope follower values
var sigBuf = [];//main out with effect values
var sigMix = [];//pure synth output;
var cells = [];//store cells array
var cellBuf = [];

var db = -60;
var ndb = 0;

//fft
var fftSize = 512;
var numBins = fftSize/2;
var fft = new maximJs.maxiFFT();
var drops =  new Array(fftSize);

//sin oscillator to animat cell
var cell_sin = new maximJs.maxiOsc();

//modulation oscillator
var osc_Mod = new maximJs.maxiOsc();
var osc_Fm = new maximJs.maxiOsc();
var osc_Am = new maximJs.maxiOsc();

//envelopes
var env_0 = new maximEx.env();
var env_1 = new maximEx.env();
var	follower = new maximEx.envFollower()

//main oscillators
var noise_;
var sin_ = new maximJs.maxiOsc();
var sq_ = new maximJs.maxiOsc();
var saw_ = new maximJs.maxiOsc();
var tri_ = new maximJs.maxiOsc();

//volume control
var sin_amp_knob;
var sq_amp_knob;
var saw_amp_knob;
var tri_amp_knob;
var noise_amp_knob

//frequency control
var sin_freq_knob;
var sq_freq_knob;
var saw_freq_knob;
var tri_freq_knob;

//modulation amplitude
var Am_freq_knob;
var Fm_freq_knob;

//envelope control knob
var attack_knob;
var release_knob

var attack_time;
var release_time;

//modulation frequency
var Am_freq;
var Fm_freq;

//reverb and delay variables
var delay_knob;
var reverb_knob;

var delay_amount = 1;
var reverb_amount = 1;

var delay_time_knob;
var delay_time = 0.5;
var delayTimeS = 0.5;

var delay_feedback_knob;
var delay_feedback = 0;

//reverb
var numDelays = 8;
var delays = new Array();
var delayTSs = new Array();

//delay
var delay = new maximJs.maxiDelayline();

//wave frequency
var freq = 0;
var sin_freq= 0;
var sq_freq = 0;
var saw_freq = 0;
var tri_freq = 0;

//vol control
var noise_amp = 0;
var sin_amp = 0;
var sq_amp = 0;
var saw_amp = 0;
var tri_amp = 0;

var amp;
var amp_ = 0;

var noiseScale;
var noiseAmp;



var input = 0;
var counter = 0;

//turn animations on/off;
var key1 = false;//oscilloscope;
var key2 = false;//ellipse art;
var key3 = false;//patterns;
var key4 = false;//cells
var key5 = false;//waves
var key6 = false;//terrain
var key7 = false;//sonic boom
var key8 = false;//noise and industry
var key9 = false;//sound of mind

//menu control
var Menu_ = false;
var instructionManual;

//welcome screen
var Welcome_ = true;
var welcomeMenu;

//control panel onn/off
var controls;
var viewControl = false;
var viewMenu = false;

//description//
var descriptions;
////////////////
var description1 = false;
var description2 = false;
var description3 = false;
var description4 = false;
var description5 = false;
var description6 = false;
var description7 = false;
var description8 = false;
var description9 = false;

///terrain////
var flying = 0;
var terrain;
var cols;
var rows;
var scl = 20;
var w = 350;
var h = 300;
////////////

///animation 9 variables
// learping colours 4 different colours
var from1, from2, from3, from4;
var to1, to2, to3, to4;
var col1, col2, col3, col4;
var piece;


var amps;
///////


var keySelect_;//buttons to select animation
var menuControl;//buttons in bottom right

var capture = false;

var side;

var canvas;

var dot;
var dots = [];

/////////////////////////////////////////////////////////

function setup()
{
//  createCanvas(828, 748);
  canvas = createCanvas(828, 748);
  canvas.parent("sketch-container-project");


  //audio and logic to initilaize audio
  audio = new maximJs.maxiAudio();
  audio.play = playLoop;
  audioInit = false;
  fft.setup(fftSize, fftSize/2 , fftSize/4);


  ///////////////Delays/////////////
  for(var i = 0; i < numDelays; i++)
  {
    delays.push(new maximJs.maxiDelayline());
    delayTSs.push(random(0.02, 0.05));
  };

  ///sonic boom
  for (var i = 0; i < 30; i++) {
    dots.push(new Dot());
  }

  ////Push cells to array////
  for (var i = 0; i < 3; i++)
  {
    cells.push(new Cell(3, createVector(random(width/2),height/2) ));
  };

  ///Push Synth Values to array to draw////
  for(var i = 0; i < 512; i++)
  {
    sigBuf.push(0);//main output with effects
    sigMix.push(0);//pure synth mix values
    drawValues.push(0);//envelope follower
    cellBuf.push(0);//cell trigger values
  };

  //////////////////////////////////
  //terrain setup//
  cols = w / scl;
  rows = h / scl;
  terrain = [];

  for (var x = 0; x < cols; x++) {
    terrain[x] = [];
  }
  //////////////////

  //rainy industry setup
  // positions for rain dorps////
   for (var i = 0; i < drops.length; i++) {
     // gap between drops(it looks optimal)
     var x = width-(i*20/2);

     //position for drops
     var y = map(i, 0, numBins, 0, height/2);
     var position = createVector(x, y);
     drops[i] = new Rain(position);
   }

  ////////////////////////////////////////////

  //Draw controls
  controls = new Controls();//call controls
  controls.knobs();//control knobs
  welcomeMenu = new Welcome();//welcome screen
  instructionManual = new manual();//instruction manual
  descriptions = new Description();//narrative desciption
  menuControl = new menuButton();//menu select buttons
  keySelect_ = new keySelect();//key/ animation select buttons

};

/////////////////////////////////////////////////////////

function draw()
{
  background(0);

  db = maximEx.amptodb(amp_);//Convert amp to DB//
  ndb = map(db, -60, 0, 0, 1);//map db from 0 - 1//

  //////////////////////////////////////
  ///////////BUTTON LOGIC///////////////

  if (key1 == true)
  {
    oscilloscope();//simple oscilloscope
    ///////////////
    //turns of descriptions when key is pressed on next animation
    ////////////////////
    description2 = false;
    description3 = false;
    description4 = false;
    description5 = false;
    description6 = false;
    description7 = false;
    description8 = false;
    description9 = false;
    ////////////
    key2 = false;
    key3 = false;
    key4 = false;
    key5 = false;
    key6 = false;
    key7 = false;
    key8 = false;
    key9 = false;

  }
  else if (key2 == true)
  {
    circles(); //ellipse animation
    /////////
    //turns of descriptions when key is pressed on next animation
    description1 = false;
    ////////////////////
    description3 = false;
    description4 = false;
    description5 = false;
    description6 = false;
    description7 = false;
    description8 = false;
    description9 = false;
    /////////////
    key1 = false;
    ////////////
    key3 = false;
    key4 = false;
    key5 = false;
    key6 = false;
    key7 = false;
    key8 = false;
    key9 = false;
  }
  else if (key3 == true)
  {
    Patterns();//patterns
    ///////////
    //turns of descriptions when key is pressed on next animation
    description1 = false;
    description2 = false;
    /////////////////////
    description4 = false;
    description5 = false;
    description6 = false;
    description7 = false;
    description8 = false;
    description9 = false;
    ////////////
    key1 = false;
    key2 = false;
    ////////////
    key4 = false;
    key5 = false;
    key6 = false;
    key7 = false;
    key8 = false;
    key9 = false;
  }
  else if (key4 == true)
  {
    //Cells functions
    for (var i=0; i<cells.length; i++)
    {
      var centerV = createVector(width/2, height/2);
      var dir = p5.Vector.sub(centerV, cells[i].loc);
      dir.setMag(0.09);//scale wind
      //apply force to cells
      cells[i].applyForce(dir);

      ////////////Add Friction////////////
      var friction = cells[i].speed.copy();//copy cell speed
      friction.mult(-1);//turns cells speed to negative
      friction.normalize();//normalize cells speed
      friction.mult(0.08);//add 8% friction

      ////////CALL Cell//////////
      cells[i].checkCollisions();//check collision
      cells[i].applyForce(friction);//apply friction
      cells[i].run();//run cells
      cells[i].aging();//aging function
    };

    ////////////////////
    //turns of descriptions when key is pressed on next animation
    description1 = false;
    description2 = false;
    description3 = false;
    /////////////////////
    description5 = false;
    description6 = false;
    description7 = false;
    description8 = false;
    description9 = false;
    ////////////
    key1 = false;
    key2 = false;
    key3 = false;
    ////////////
    key5 = false;
    key6 = false;
    key7 = false;
    key8 = false;
    key9 = false;
  }
  else if (key5 == true)
  {
    Waves();
    ///////
    //turns of descriptions when key is pressed on next animation
    description1 = false;
    description2 = false;
    description3 = false;
    description4 = false;
    /////////////////////
    description6 = false;
    description7 = false;
    description8 = false;
    description9 = false;
    ////////////
    key1 = false;
    key2 = false;
    key3 = false;
    key4 = false;
    ////////////
    key6 = false;
    key7 = false;
    key8 = false;
    key9 = false;

  }
  else if (key6 == true)
  {
    flying -= 0.01;//flying speed for terrain
    Terrain();
    /////////

    //turns of descriptions when key is pressed on next animation
    description1 = false;
    description2 = false;
    description3 = false;
    description4 = false;
    description5 = false;
    /////////////////////
    description7 = false;
    description8 = false;
    description9 = false;
    ////////////
    key1 = false;
    key2 = false;
    key3 = false;
    key4 = false;
    key5 = false;
    ////////////
    key7 = false;
    key8 = false;
    key9 = false;
  }
  else if (key7 == true)
  {

    background(150);
    for (var i = 0; i < dots.length; i++) {
      dots[i].run();
      dots[i].joinDots();
    }

    /////////////////////////////////////////
    //turns of descriptions when key is pressed on next animation
    description1 = false;
    description2 = false;
    description3 = false;
    description4 = false;
    description5 = false;
    description6 = false;
    /////////////////////
    description8 = false;
    description9 = false;
    /////////////
    key1 = false;
    key2 = false;
    key3 = false;
    key4 = false;
    key5 = false;
    key6 = false;
    ////////////
    key8 = false;
    key9 = false;

  }
  else if (key8 == true)
  {

    background(150);
    //////////////////Drawing Rain/////////////////////////////
    push();
    for (var i = 0; i < numBins; i++) {
      var mg = fft.getMagnitude(i);
      mg /=100;
      mg = constrain(mg,0,1);
      //update position
      drops[i].update(mg);
      // draw the particle
      drops[i].draw();
    }
    pop();

    /////////////////Drawing Sun///////////
    push();
    strokeWeight(0.05);
    stroke(255, 255, 0, 50);
    fill(150,20,0, 50);
    translate(width/5,height/5);
    beginShape();
    for(var i=0; i<360;i++)
    {
      var r = map(sigBuf[i],0,1,50,200);
      var x = r*cos(i);
      var y = r*sin(i);
      vertex(x,y);
    }
    endShape(CLOSE);
    pop();

    /////////Drawing City/////////////////
    push();
    for (var i = 0; i < sigBuf.length; i++) {
        var y = map(sigBuf[i], 0, 1, 620, 0);
        noFill();
        strokeWeight(0.4);
        stroke(255);
        rect(i*5, y, y % 81, i* -y % 157);
      }
    pop();

    /////////////////Drawing Land////////////////////

    push()
    // translate(0, height/2);
    beginShape();
    vertex(0,height);
      for(var i = 0; i < numBins; i++)
      {
        var mdb = constrain(fft.getMagnitude(i), 0, 50);
        mdb /= 80;

        noStroke();
        fill(80, 0, 10);
        var h = mdb * height * 0.5;

         var x = i * 20 + width/numBins;
         vertex(x, (height * 0.8)-h);


      }
    vertex(width,height);
    endShape(CLOSE);
    fill(20, 0, 10);
    rect(0, 610, width, height);
    pop();


    ////////////////////////////////////////////////////

    //turns of descriptions when key is pressed on next animation
    description1 = false;
    description2 = false;
    description3 = false;
    description4 = false;
    description5 = false;
    description6 = false;
    description7 = false;
    /////////////////////
    description9 = false;
    ////////////
    key1 = false;
    key2 = false;
    key3 = false;
    key4 = false;
    key5 = false;
    key6 = false;
    key7 = false;
    ////////////
    key9 = false;
  }
  else if (key9 == true)
  {


    push();
    from1 = color(20,130,110);
    to1 = color(47,9,9);
    var mMap = map(mouseX,0, width, 0,1);
    col1 = lerpColor(from1,to1,mMap);
    background(col1);

    noFill(255);
    stroke(255);

    translate(width/2,height/2.5);

    for(var i = 0; i < piece; i+=0.1)
    {
      rotate(360/piece);
  //////////////////////////saw//////////////////////////////////////

      push();
      from3 = color(252,165,60);
      to3 = color(1282,60,100);
      col3 = lerpColor(from3, to3, mMap);
      stroke(col3);
      strokeWeight(0.1);
      //scaling the size of the shapes with mouse
      scale(mapMouseX*0.5);
//      rotate((mapMouseX * 0.2));
      shapes(10+i*2, i+20, 50, 3);
      pop();

   ///////////////////////////Square///////////////////////////////////////

//      push();
//      from4 =  color(186,218,85);
//      to4 = color(250,230,230);
//      col4 = lerpColor(from4, to4, mMap);
//      stroke(col4);
//      strokeWeight(0.5);
////      rotate(frameCount + mapMouseY * 0.2)
//      shapes(20*i, 20*i, 200, 5);
//      pop();

      ///////////////////Sine/////////////////////////////////
//
////      push();
////      from2 =  color(251,196,69);
////      to2 = color(246,118,100);
////      col2 = lerpColor(from2, to2, mMap);
////      stroke(col2);
////      rotate(frameCount * 0.1);
////      strokeWeight(0.8);
////      shapes(freq*i/10,i+freq,20,40,sigBuf);
////      pop();
////
////    //////////////////////////Triangle////////////////////////////
////
////      push();
////      from2 =  color(251,196,69);
////      to2 = color(246,118,100);
////      col2 = lerpColor(from2, to2, mMap);
////      stroke(col2);
////      rotate(frameCount);
////      strokeWeight(0.8);
////      shapes(freq*i/2,i-freq,200,2,sigBuf);
////      pop();
//
    }
    pop();

    ////////////////////
    description1 = false;//turns of descriptions when key is pressed on next animation
    description2 = false;
    description3 = false;
    description4 = false;
    description5 = false;
    description6 = false;
    description7 = false;
    description8 = false;
    /////////////////////
    key1 = false;
    key2 = false;
    key3 = false;
    key4 = false;
    key5 = false;
    key6 = false;
    key7 = false;
    key8 = false;
    /////////////
  }


  ////////turn welcome on///////
  if (Welcome_ == true)
  {
    background(245);
    welcomeMenu.draw();
  }

  ///////control panel Logic////
  if (viewControl == true)
  {
    controls.draw();//draw controls
    controls.draw_knobs();//draw knobs
  }

  /////////Instruction manual logic On/Off/////////
  if (Menu_ == true)
  {
    instructionManual.draw();
  }

  ///////////////////

  //description Logic
  if(description1 == true)
  {
    descriptions.draw();
    descriptions.d_1();
  }
  else if (description2 == true)
  {
    descriptions.draw();
    descriptions.d_2();
  }
  else if (description3 == true)
  {
    descriptions.draw();
    descriptions.d_3();
  }
  else if (description4 == true)
  {
    descriptions.draw();
    descriptions.d_4();
  }
  else if (description5 == true)
  {
    descriptions.draw();
    descriptions.d_5();
  }
  else if (description6 == true)
  {
    descriptions.draw();
    descriptions.d_6();
  }
  else if (description7 == true)
  {
    descriptions.draw();
    descriptions.d_7();
  }
  else if (description8 == true)
  {
    descriptions.draw();
    descriptions.d_8();
  }
  else if (description9 == true)
  {
    descriptions.draw();
    descriptions.d_9();
  }

  //view controls logic
  if (viewMenu == true)
  {
    menuControl.draw();//buttons to turn menus and controls on off
    keySelect_.draw();//turn key select on;
  }

  //screen shot logic
  if(capture == true)
  {
    saveCanvas('Capture', 'jpg')
  }

  //////////////Incremented Variables///////////////

  input += 0.01;//controls cell color

  ///////////DEBUGGING INFORMATION/////////////////

  push();
  fill(255);
  noStroke();
  //text("amp: " + amp_, 100, 100);
  //text("ndb: " + ndb, 100, 200);
  //text("db: " + db, 100, 300);
  //text("sigBuf " + q, 100, 300);
  pop();

};

///////////////////WHITE NOISE/////////////////////////

function whiteNoise(amp) {
  return random(-amp, amp);
};

////////////////////PLAY LOOP///////////////////////////

function playLoop()
{

  ///////////////FM modulator/////////////////
  var m = map(cos(input), 1, -1, 0, -100);
  var mod = ((osc_Fm.square(Fm_freq) + 1)/2);
  mod = mod * m;

  ////////////////////////////////////////////

  //SINE WAVE
  var sin_osc_sig = ((sin_.sinewave(freq + sin_freq + mod) * ((osc_Am.sinewave(Am_freq) + 1)/4))) * sin_amp;
  var sin_sig = sin_osc_sig * env_0.asr(attack_time, release_time);

  //sin cell envelope
  var cell_sin = sin_osc_sig * env_1.ar(3, 3);

  ////////////////////////////////////////////

  //SQUARE WAVE
  var sq_osc_sig = ((sq_.square(freq + sq_freq + mod) * ((osc_Am.sinewave(Am_freq) + 1)/4)) * sq_amp);
  var sq_sig = sq_osc_sig * env_0.asr(attack_time, release_time);

  //cell trigger
  var cell_sq = sq_osc_sig * env_1.ar(3, 3);

  ////////////////////////////////////////////

  //SAW WAVE
  var saw_osc_sig = ((saw_.saw(freq + saw_freq + mod) * ((osc_Am.sinewave(Am_freq) + 1)/4)) * saw_amp);
  var saw_sig = saw_osc_sig * env_0.asr(attack_time, release_time);

  //saw cell envelope
  var cell_saw = saw_osc_sig * env_1.ar(3, 3);

  ////////////////////////////////////////////

  //TRIANGLE WAVE
  var tri_osc_sig = ((tri_.triangle(freq + tri_freq  + mod) * ((osc_Am.sinewave(Am_freq) + 1)/4)) * tri_amp);
  var tri_sig = tri_osc_sig * env_0.asr(attack_time, release_time);

  //cell trigger
  var cell_tri = tri_osc_sig * env_1.ar(3, 3);

  ////////////////////////////////////////////

  ///WHITE NOISE
  var noise_osc_sig = ((whiteNoise(0.2) * ((osc_Am.sinewave(Am_freq) + 1)/4)) * noise_amp);
  var noise_sig = noise_osc_sig * env_0.asr(attack_time, release_time);

  var cell_noise = noise_osc_sig * env_1.ar(3, 3);

  //////////////////////////////////////////////////////////
  //////////////MASTER MIX OF SYNTH WAVES///////////////////

  //mix to trigger ar envelope when cells collide
  var cell_mix = cell_sin + cell_sq + cell_saw + cell_tri + cell_noise;

  //master mix
  var mix = sin_sig + sq_sig + saw_sig + tri_sig + noise_sig + cell_mix;

  /////////////////////REVERB///////////////////////////////

  var fx = 0;

  //reverb
  for (var i = 0; i < numDelays; i++)
  {
      fx += delays[i].dl(mix, 44100 * delayTSs[i], 0.95) / numDelays;
  }

  //effects mix reverb
  var sigR = (fx * (1 - reverb_amount)) + (mix * reverb_amount);

  /////////////////////DELAY///////////////////////////////

  //effects mix delay
  var fx2 = 0;
  var fx2 = delay.dl(mix, 44100 * delay_time, delay_feedback);
	var sigD = (fx2 * (1 - delay_amount)) + (mix * delay_amount);

  var sig = sigD + sigR;

  //////////////////////OUTPUT///////////////////////////

  this.output = sig;

  //////////////////ENVELOPE FOLLOWER////////////////////

  amp_ = follower.analyse(this.output, 0.1, 0.05);

  ///////////////////////////////////////////////////////

  //for drawing the output
  sigBuf.push(sig);//main out with effects
  sigBuf.shift();
  fft.process(sig);

  //pure synth values
  sigMix.push(mix);
  sigMix.shift();

  //envelope follower output
  drawValues.push(amp_);
	drawValues.shift();

};

/////////////////////////////////////////////////////////

function keyPressed()
{

//  console.log("press" + keyCode);
//  console.log("press" + key);

  //INITIALISE AUDIO//
  if(!audioInit)
  {
      audio.init();
      audioInit = true;
  }

  ////////Turn Visuals On/Off//////

  if(key  == '1')
  {
    key1 = true;
    ////////////
    key2 = false;
    key3 = false;
    key4 = false;
    key5 = false;
    key6 = false;
    key7 = false;
    key8 = false;
    key9 = false;
  }
  else if(key  == '2')
  {
    key2 = true;
    ////////////
    key1 = false;
    /////////////
    key3 = false;
    key4 = false;
    key5 = false;
    key6 = false;
    key7 = false;
    key8 = false;
    key9 = false;
  }
  else if(key  == '3')
  {
    key3 = true;
    ////////////
    key1 = false;
    key2 = false;
    ////////////
    key4 = false;
    key5 = false;
    key6 = false;
    key7 = false;
    key8 = false;
    key9 = false;
  }
  else if(key  == '4')
  {
    key4 = true;
    ////////////
    key1 = false;
    key2 = false;
    key3 = false;
    /////////////
    key5 = false;
    key6 = false;
    key7 = false;
    key8 = false;
    key9 = false;
  }
  else if(key == '5')
  {
    key5 = true;
    ////////////
    key1 = false;
    key2 = false;
    key3 = false;
    key4 = false;
    /////////////
    key6 = false;
    key7 = false;
    key8 = false;
    key9 = false;
  }
  else if(key == '6')
  {
    key6 = true;
    ////////////
    key1 = false;
    key2 = false;
    key3 = false;
    key4 = false;
    key5 = false;
    /////////////
    key7 = false;
    key8 = false;
    key9 = false;

  }
  else if(key == '7')
  {
    key7 = true;
    /////////////
    key1 = false;
    key2 = false;
    key3 = false;
    key4 = false;
    key5 = false;
    key6 = false;
    ////////////
    key8 = false;
    key9 = false;
  }
  else if(key == '8')
  {
    key8 = true;
    /////////////
    key1 = false;
    key2 = false;
    key3 = false;
    key4 = false;
    key5 = false;
    key6 = false;
    key7 = false;
    ////////////
    key9 = false;
  }
  else if(key == '9')
  {
    key9 = true;
    /////////////
    key1 = false;
    key2 = false;
    key3 = false;
    key4 = false;
    key5 = false;
    key6 = false;
    key7 = false;
    key8 = false;
    ////////////

  }

  ///////////////////////////////////////

  //turn controls on / off//
  if (key == 'c' && viewControl == false)
  {
    viewControl = true;
  }
  else if (key == 'c' && viewControl == true)
  {
    viewControl = false;
  }

  //////////////////////////////////////////////


  ///turn instruction manual menus on/off// logic
  if (key == 'm' && Menu_ == false)
  {
    Menu_ = true;
    description1 = false;//turn off desciption1 if menu is on
    description2 = false;
    description3 = false;
    description4 = false;
    description5 = false;
    description6 = false;
    description7 = false;
    description8 = false;
    description9 = false;

  }
  else if (key == 'm' && Menu_ == true)
  {
    Menu_ = false;
  };

  ////////////////////////////////////////////////////

  if (key == 'n' && key1 == true && description1 == false)//description 1 on
  {
    description1 = true;
    Menu_ = false;//turn of menu if description is on
  }
  else if (key == 'n' && key1 == true && description1 == true)//description 1 off
  {
    description1 = false;
  }
  else if (key == 'n' && key2 == true && description2 == false)//description 2 on
  {
    description2 = true;
    Menu_ = false;//turn of menu if description is on
  }
  else if (key == 'n' && key2 == true && description2 == true)//description 2 off
  {
    description2 = false;
  }
  else if (key == 'n' && key3 == true && description3 == false)//description 3 on
  {
    description3 = true;
    Menu_ = false;//turn of menu if description is on
  }
  else if (key == 'n' && key3 == true && description3 == true)//description 1 off
  {
    description3 = false;
  }
  else if (key == 'n' && key4 == true && description4 == false)//description 4 on
  {
    description4 = true;
    Menu_ = false;//turn of menu if description is on
  }
  else if (key == 'n' && key4 == true && description4 == true)//description 4 off
  {
    description4 = false;
  }
  else if (key == 'n' && key5 == true && description5 == false)//description 5 on
  {
    description5 = true;
    Menu_ = false;//turn of menu if description is on
  }
  else if (key == 'n' && key5 == true && description5 == true)//description 5 off
  {
    description5 = false;
  }
  else if (key == 'n' && key6 == true && description6 == false)//description 6 on
  {
    description6 = true;
    Menu_ = false;//turn of menu if description is on
  }
  else if (key == 'n' && key6 == true && description6 == true)//description 6 off
  {
    description6 = false;
  }
  else if (key == 'n' && key7 == true && description7 == false)//description 7 on
  {
    description7 = true;
    Menu_ = false;//turn of menu if description is on
  }
  else if (key == 'n' && key7 == true && description7 == true)//description 7 off
  {
    description7 = false;
  }
  else if (key == 'n' && key8 == true && description8 == false)//description 8 on
  {
    description8 = true;
    Menu_ = false;//turn of menu if description is on
  }
  else if (key == 'n' && key8 == true && description8 == true)//description 8 off
  {
    description8 = false;
  }
  else if (key == 'n' && key9 == true && description9 == false)//description 9 on
  {
    description9 = true;
    Menu_ = false;//turn of menu if description is on
  }
  else if (key == 'n' && key9 == true && description9 == true)//description 9 off
  {
    description9 = false;
  }

  //capture
  if ( key == 'p')
  {
    capture = true;
  }


  ////////////////KEYBOARD LAYOUT////////////////////////

  //C
  if(keyCode == 65)
  {
    env_0.trigger();
    freq = 130.8;
  }

  //C#
  if(keyCode == 87)
  {
    env_0.trigger();
    freq = 138.6;
  }

  //D
  if(keyCode == 83)
  {
    env_0.trigger();
    freq = 146.8;
  }

  //D#
  if(keyCode == 69)
  {
    env_0.trigger();
    freq = 155.6;
  }

  //E
  if(keyCode == 68)
  {
    env_0.trigger();
    freq = 164.8;
  }

  //F
  if(keyCode == 70)
  {
    env_0.trigger();
    freq = 174.6;
  }

  //F#
  if(keyCode == 84)
  {
    env_0.trigger();
    freq = 185;
  }

  //G
  if(keyCode == 71)
  {
    env_0.trigger();
    freq = 196;
  }

  //G#
  if(keyCode == 89)
  {
    env_0.trigger();
    freq = 208;
  }

  //A
  if(keyCode == 72)
  {
    env_0.trigger();
    freq = 220;
  }

  //A#
  if(keyCode == 85)
  {
    env_0.trigger();
    freq = 233;
  }

  //B
  if(keyCode == 74)
  {
    env_0.trigger();
    freq = 247;
  }

  //C
  if(keyCode == 75)
  {
    env_0.trigger();
    freq = 262;
  }

};

/////////////////////////////////////////////////////////

function keyReleased() {
  env_0.release();//ENVELOPE RELEASE!!
  capture = false;//stops caputre screen shot when key released
};

/////////////////////////////////////////////////////////

///activate knobs
function mousePressed()
{
  //////buttons////////
  welcomeMenu.clicked();
  instructionManual.clicked();
  descriptions.clicked();
  menuControl.clicked();
  keySelect_.clicked();

  sin_amp_knob.active();
  sin_freq_knob.active();
  ///////////////////////
  sq_amp_knob.active();
  sq_freq_knob.active();
  ///////////////////////
  saw_amp_knob.active();
  saw_freq_knob.active();
  ///////////////////////
  tri_amp_knob.active();
  tri_freq_knob.active();
  ///////////////////////
  noise_amp_knob.active();
  ///////////////////////
  Am_freq_knob.active();
  Fm_freq_knob.active();
  ///////////////////////
  delay_knob.active();
  delay_time_knob.active();
  delay_feedback_knob.active();
  ///////////////////////
  reverb_knob.active();
  ///////////////////////
  attack_knob.active();
  release_knob.active();

};

/////////////////////////////////////////////////////////

function mouseReleased()
{
  capture = false;//set caputure to false to stop taking screen shot
  ///////////////////////
  sin_amp_knob.inactive();
  sin_freq_knob.inactive();
  ///////////////////////
  sq_amp_knob.inactive();
  sq_freq_knob.inactive();
  ///////////////////////
  saw_amp_knob.inactive();
  saw_freq_knob.inactive();
  ///////////////////////
  tri_amp_knob.inactive();
  tri_freq_knob.inactive();
  ///////////////////////
  noise_amp_knob.inactive();
  ///////////////////////
  Am_freq_knob.inactive();
  Fm_freq_knob.inactive();
  ///////////////////////
  delay_knob.inactive();
  delay_time_knob.inactive();
  delay_feedback_knob.inactive();
  reverb_knob.inactive();
  ///////////////////////
  attack_knob.inactive();
  release_knob.inactive();
};

function mouseMoved()
{
    //mouse control for animation 9
    side = int(map(mouseX,0, width,5,20));
    piece = map(mouseX,0,width,5,8);
    mapMouseX = map(mouseX, 0, width,2, 10);
    mapMouseY = map(mouseY, 0, height,-10, 10);
}
