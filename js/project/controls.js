function Controls()
{
  this.x = 33;
  this.y = 650;
  this.colour = 20;

  this.label = this.y + 29;
  this.labelC = 0;


  this.draw = function()
  {


  ///////////////////Draw Controls////////////////////

    push();
    push();
    fill(0);
    rect(0, 0, 11, 15);
    rect(816, 0, 11, 15);
    rect(0, 613, width, height);
    pop();

    //screen
    push();
    noFill();
    strokeWeight(13);
    stroke(0, 80, 100);
    rect(5, 5, width - 11, height - 134, 10, 10, 10, 10);

    strokeWeight(2);
    stroke(100, 100, 0);
    rect(10, 11, width - 21, height - 145, 10, 10, 10, 10);
    //control background;
    pop();


    //control background;
    stroke(0, 0, 100);
    fill(0, 50, 80);
    rect(this.x - 30, this.y - 25, 822, 121, 5);

    //control sections
    fill(0, 80, 100);
    //outline 1 sin
    rect(this.x - 20, this.y - 20, 93, 86, 5);
    //outline 2 square
    rect(this.x + 80, this.y - 20, 93, 86, 5)
    //outline 3 saw
    rect(this.x + 180, this.y - 20, 93, 86, 5)
    //outline 4 triangle
    rect(this.x + 280, this.y - 20, 93, 86, 5)
    //outline 5 noise
    rect(this.x + 380, this.y - 20, 47, 86, 5)
    //outline 6 modulation
    rect(this.x + 434, this.y - 20, 82, 86, 5)
    //outline 7 delay
    rect(this.x + 523, this.y - 20, 118, 86, 5)
    //outline 7 reverb
    rect(this.x + 648, this.y - 20, 46, 86, 5)
    //outline 8 envelope control
    rect(this.x + 700, this.y - 20, 80, 86, 5)

    //Control panel
    strokeWeight(1)

    //sine wave line
    var s = map(sin_amp, 0, 0.2, 0, 135);
    stroke(120 + s, 120 + s, 0);
    noFill();
    bezier(this.x + 15, this.y + 40,
          this.x + 25, this.y + 5,
          this.x + 25, this.y + 65,
          this.x + 35, this.y +35);


    //square wave
    var sq = map(sq_amp, 0, 0.2, 0, 135);
    stroke(120 + sq, 120 + sq, 0);
    rect(this.x + 117, this.y + 27, 17, 17, 5);

    //saw wave
    var saw = map(saw_amp, 0, 0.2, 0, 135);
    stroke(120 + saw, 120 + saw, 0);
    beginShape();
    vertex(this.x + 218, this.y + 44);
    vertex(this.x + 218, this.y + 30);
    vertex(this.x + 236, this.y + 44);
    endShape();

    //triangle Wave
    var tri =  map(tri_amp, 0, 0.2, 0, 135);
    stroke(120 + tri, 120 + tri, 0);
    triangle(this.x + 315, this.y + 44,
            this.x + 325, this.y + 29,
            this.x + 338, this.y + 44);

    //noise//
    var n =  map(noise_amp, 0, 0.2, 0, 135);
    stroke(120 + n, 120 + n, 0);
    beginShape();
    vertex(this.x + 393, this.y + 46);
    vertex(this.x + 397, this.y + 34);
    vertex(this.x + 401, this.y + 46);
    vertex(this.x + 405, this.y + 34);
    vertex(this.x + 409, this.y + 46);
    vertex(this.x + 413, this.y + 34);
    endShape();

    //envelope
    stroke(255);
    beginShape();
    vertex(this.x + 725, this.y + 44);
    vertex(this.x + 730, this.y + 34);
    vertex(this.x + 737, this.y + 34);
    vertex(this.x + 755, this.y + 44);
    endShape();

    pop();

  }

  //////////////////KNOB PROPERTIES////////////////////

  this.knobs = function()
  {


  ///////////////////SIN WAVE//////////////////////////

    sin_amp_knob = new MakeKnob("../js/project/images/knobgold.png", 30,
                           this.x ,this.y,
                           0, 0.2,
                           0.1, 1,
                           "Sin Vol");

    sin_freq_knob = new MakeKnob("../js/project/images/knobgold.png", 30,
                           this.x + 50 ,this.y,
                           -200, 2000,
                           0, 2,
                           "Sin Freq");

  ////////////////////SQUARE WAVE////////////////////////


    sq_amp_knob = new MakeKnob("../js/project/images/knobgold.png", 30,
                           this.x + 100 ,this.y,
                           0, 0.2,
                           0, 1,
                           "Sq Vol");

    sq_freq_knob = new MakeKnob("../js/project/images/knobgold.png", 30,
                           this.x + 150 ,this.y,
                           -200, 2000,
                           0, 2,
                           "Sq Freq");

  //////////////////////SAW WAVE////////////////////////


    saw_amp_knob = new MakeKnob("../js/project/images/knobgold.png", 30,
                           this.x + 200 ,this.y,
                           0, 0.2,
                           0, 1,
                           "Saw Vol");

    saw_freq_knob = new MakeKnob("../js/project/images/knobgold.png", 30,
                           this.x + 250 ,this.y,
                           -200, 2000,
                           0, 2,
                           "Saw Freq");

  //////////////////////TRIANGLE///////////////////////////

    tri_amp_knob = new MakeKnob("../js/project/images/knobgold.png", 30,
                           this.x + 300 ,this.y,
                           0, 0.2,
                           0, 1,
                           "Tri Vol");

    tri_freq_knob = new MakeKnob("../js/project/images/knobgold.png", 30,
                           this.x + 350 ,this.y,
                           -200, 2000,
                           0, 2,
                           "Tri Freq");

  ////////////////////////NOISE///////////////////////////////

    noise_amp_knob = new MakeKnob("../js/project/images/knobgold.png", 30,
                           this.x + 403 ,this.y,
                           0, 0.2,
                           0, 1,
                           "Noise Vol");

  ////////////////////////MODULATION///////////////////////

    Am_freq_knob = new MakeKnob("../js/project/images/knobgrey.png", 30,
                           this.x + 454, this.y,
                           0, 40,
                           0, 3,
                           "AM");


    Fm_freq_knob = new MakeKnob("../js/project/images/knobgrey.png", 30,
                           this.x + 495,this.y,
                           0, 10,
                           0, 3,
                           "FM");

  ////////////////////////EFFECTS//////////////////////////

    delay_knob = new MakeKnob("../js/project/images/knobgrey.png", 30,
                           this.x + 543,this.y,
                           1, 0,
                           1, 2,
                           "Delay");

    delay_time_knob = new MakeKnob("../js/project/images/knobgrey.png", 30,
                           this.x + 582,this.y,
                           0.01, 0.9,
                           0.5, 2,
                           "Time");

    delay_feedback_knob = new MakeKnob("../js/project/images/knobgrey.png", 30,
                           this.x + 620,this.y,
                           0.01, 0.99,
                           0.2, 2,
                           "F");

    reverb_knob = new MakeKnob("../js/project/images/knobgrey.png", 30,
                           this.x + 670, this.y,
                           1, 0,
                           1, 2,
                           "Reverb");

    ////////////////////ENVELOPE CONTROL//////////////////////

    attack_knob = new MakeKnob("../js/project/images/knobgrey.png", 30,
                           this.x + 721,this.y,
                           0.1, 20,
                           0.1, 1,
                           "Attack");

    release_knob = new MakeKnob("../js/project/images/knobgrey.png", 30,
                           this.x + 759,this.y,
                           0.1, 40,
                           1, 2,
                           "Release");



  }

  //////////////////////DRAW KNOBS//////////////////////////

  this.draw_knobs = function()
  {


    noStroke();
    //sinewave knob control
    //amplitude
    sin_amp = sin_amp_knob.knobValue;
    sin_amp_knob.update();
    sin_amp_knob.textColor = [0,0,0,0];
    sin_amp_knob.textPt = 10;

    sin_freq = sin_freq_knob.knobValue;
    sin_freq_knob.update();
    sin_freq_knob.textColor = [0,0,0,0];
    sin_freq_knob.textPt = 10;

    push();
    noStroke();
    fill(200);
    textSize(12);
    //main label
    text("Sin", this.x + 26, this.y + 60);

    textSize(10);
    fill(this.labelC);
    //vol
    text("Vol", this.x, this.label);
    //freq
    text("Pitch", this.x + 52, this.label);
    pop();


  ///////////////////////////////////////////////////////

    sq_amp = sq_amp_knob.knobValue;
    sq_amp_knob.update();
    sq_amp_knob.textColor = [0,0,0,0];
    sq_amp_knob.textPt = 10;

    sq_freq = sq_freq_knob.knobValue;
    sq_freq_knob.update();
    sq_freq_knob.textColor = [0,0,0,0];
    sq_freq_knob.textPt = 10;

    push();
    noStroke();
    fill(200);
    textSize(12);
    //main label
    text("Square", this.x + 125, this.y + 60);

    textSize(10);
    fill(this.labelC);
    //vol
    text("Vol", this.x + 100, this.label);
    //freq
    text("Pitch", this.x + 152, this.label);
    pop();

  ///////////////////////////////////////////////////////

    saw_amp = saw_amp_knob.knobValue;
    saw_amp_knob.update();
    saw_amp_knob.textColor = [0,0,0,0];
    saw_amp_knob.textPt = 10;

    saw_freq = saw_freq_knob.knobValue;
    saw_freq_knob.update()
    saw_freq_knob.textColor = [0,0,0,0];
    saw_freq_knob.textPt = 10;

    push();
    noStroke();
    fill(200);
    textSize(12);
    //main label
    text("Sawtooth", this.x + 225, this.y + 60);

    textSize(10);
    fill(this.labelC);
    //vol
    text("Vol", this.x + 200, this.label);
    //freq
    text("Pitch", this.x + 252, this.label);
    pop();


  ///////////////////////////////////////////////////////

    tri_amp = tri_amp_knob.knobValue;
    tri_amp_knob.update();
    tri_amp_knob.textColor = [0,0,0,0];
    tri_amp_knob.textPt = 10;

    tri_freq = tri_freq_knob.knobValue;
    tri_freq_knob.update()
    tri_freq_knob.textColor = [0,0,0,0];
    tri_freq_knob.textPt = 10;

    push();
    noStroke();
    fill(200);
    textSize(12);
    //main label
    text("Triangle", this.x + 325, this.y + 60);

    textSize(10);
    fill(this.labelC);
    //vol
    text("Vol", this.x + 300, this.label);
    //freq
    text("Pitch", this.x + 352, this.label);
    pop();

  ///////////////////////////////////////////////////////

    noise_amp = noise_amp_knob.knobValue;
    noise_amp_knob.update();
    noise_amp_knob.textColor = [0,0,0,0];
    noise_amp_knob.textPt = 10;

    push();
    noStroke();
    fill(200);
    textSize(12);
    //main label
    text("Noise", this.x + 403, this.y + 60);
    fill(this.labelC);
    textSize(10);
    //vol
    text("Vol", this.x + 403, this.label);


  ////////////////////////MODULATION///////////////////////

    Am_freq = Am_freq_knob.knobValue;
    Am_freq_knob.update();
    Am_freq_knob.textColor = [0,0,0,0];
    Am_freq_knob.textPt = 10;

    Fm_freq = Fm_freq_knob.knobValue;
    Fm_freq_knob.update();
    Fm_freq_knob.textColor = [0,0,0,0];
    Fm_freq_knob.textPt = 10;

    push();
    noStroke();
    fill(200);
    textSize(12);
    //main label
    text("Modulation", this.x + 474, this.y + 60);

    textSize(10);
    fill(this.labelC);
    //vol
    text("AM", this.x + 453, this.label);
    //freq
    text("FM", this.x + 495, this.label);
    pop();

  ////////////////////////EFFECTS///////////////////////

    delay_amount = delay_knob.knobValue;
    delay_knob.update();
    delay_knob.textColor = [0,0,0,0];
    delay_knob.textPt = 10;

    delay_time = delay_time_knob.knobValue;
    delay_time_knob.update();
    delay_time_knob.textColor = [0,0,0,0];
    delay_time_knob.textPt = 10;

    delay_feedback = delay_feedback_knob.knobValue;
    delay_feedback_knob.update();
    delay_feedback_knob.textColor = [0,0,0,0];
    delay_feedback_knob.textPt = 10;

    push();
    noStroke();
    fill(200);
    textSize(12);
    //main label
    text("Delay", this.x + 584, this.y + 60);

    textSize(10);
    fill(this.labelC);
    //Mix
    text("Mix", this.x + 543, this.label);
    //Time
    text("Time", this.x + 583, this.label);
    //Feedback
    text("F", this.x + 620, this.label);
    pop();

    reverb_amount = reverb_knob.knobValue;
    reverb_knob.update();
    reverb_knob.textColor = [0,0,0,0];
    reverb_knob.textPt = 10;

    push();
    noStroke();
    fill(200);
    textSize(12);
    //main label
    text("Reverb", this.x + 671, this.y + 60);

    textSize(10);
    fill(this.labelC);
    //Mix
    text("Mix", this.x + 671, this.label);

    pop();

    ///////////////////////ENVELOPE////////////////////

    attack_time = attack_knob.knobValue;
    attack_knob.update();
    attack_knob.textColor = [0,0,0,0];
    attack_knob.textPt = 10;

    release_time = release_knob.knobValue;
    release_knob.update();
    release_knob.textColor = [0,0,0,0];
    release_knob.textPt = 10;

    push();
    noStroke();
    fill(200);
    textSize(12);
    //main label
    text("Envelope", this.x + 739, this.y + 60);

    textSize(10);
    fill(this.labelC);
    //Mix
    text("Attack", this.x + 720, this.label);
    //Time
    text("Decay", this.x + 758, this.label);

    pop();


  }

}
