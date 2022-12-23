//audio input
var mic, fft;
//angle rotation
var input = 0;
var input1 = 0;
var camX = 0;
var moonInput = 0;
var angle;

let sliderGroup = [];

var micInput = false;
let spaceage;

function preload() {
  spaceage = loadFont('../js/assets/spaceage.otf');
}

function windowResized()
{
  resizeCanvas(windowWidth*.5, windowHeight*.3);
}

function setup() {


  canvas = createCanvas(350, 250, WEBGL);
  canvas.parent("sketch-container");

  //audio input
  mic = new p5.AudioIn();
  mic.start();
  fft = new p5.FFT(0.8);
  fft.setInput(mic);

  textFont(spaceage);
}

function draw() {

  let spectrum = fft.analyze();
  var amp = mic.getLevel();

  push();
  background(0);
  translate(200, 100);

  var x_ = map(cos(camX),1, -1, -500, 1000);

  camera(x_, -200, 1000,
         -200, -100, 0,
         0, 1, 0);

  stroke(255);
  //tree base cylinder
  push();
  for (var x = 0; x < 80; x++)
  {
      var f = map(spectrum[x], 0, 140, 20, 100);
      var spec = map(spectrum[x], 0, 140, 1, 2);
      noStroke();
      fill(f);
      translate(0 + x, x + spec);
      directionalLight(70, 90, 70, 80, 200, 220);
      input1 -= 0.000005;
      rotateY(input1);
      cylinder(40 + 10 * x , 5, 5, 5, 1, 1);
  }
  pop();


  //moon
  push();
      translate(-180, -120, 250);
      rotateZ(-moonInput)

    push();
      translate(-2400, 400,-4000);
      directionalLight(245, 245 -f , 245- f, 320, 10 + f, 20 + spec);
      //rotateX(2 *input*2)//rolling back

      noStroke();
      var s = map(cos(moonInput), 1, -1, 300, 600);
      fill(s);
      sphere(s);
    pop();

  pop();


  //cylinder sky
  push();
  for (var x = 0; x < 60; x++)
  {
      var f = map(spectrum[x], 0, 140, 10, 55)
      var spect = map(spectrum[x], 0, 255, 0, 8)
      stroke(0);
      fill(f);
      translate(190 +x,-10, -860 + spect)

      rotateX(0.3);
      rotateY(0.6);
      rotateZ(0)
      cylinder(30 + 10 * x + spect, 5, 5, 5, 1, 1);
  }

  //fractal tree
  pop();
  var s = map(sin(input),1 , -1, 0.4, 1.2)
  angle = s;
  branch(60, angle);
  pop();


  ////////////////////
  if(micInput == false)
  {
    push();
    noStroke();
    fill(255);
    textAlign(CENTER, CENTER);
    text("click on the animation to allow microphone response", 0, height *.4);
    pop();
  }


  //input for movement
  moonInput += 0.01;
  input += 0.01;
  camX += 0.005;

}

function branch(b_length, theta)
{
  if(b_length > 10)
  {

    strokeWeight(3);
    stroke(70, 90, 20, 90);
    rotateY(input);

      line(0, 0,
           0,
           0, -b_length,
           0);

    translate(0, -b_length);
    //center tree
    push();
    rotate(theta); //right
    branch(b_length * 0.75, theta);
    pop();

    push();
    rotate(-theta); //left
    branch(b_length * 0.75, theta);
    pop();


    rotateY(input + PI/2);
    push();
    rotate(theta); //right
    branch(b_length * 0.2, theta);
    pop();

    push();
    rotate(-theta); //left
    branch(b_length * 0.2, theta);
    pop();


    rotateY(input + PI/8);
    push();
    rotate(theta); //right
    branch(b_length * 0.3, theta);
    pop();

    push();
    rotate(-theta); //left
    branch(b_length * 0.3, theta);
    pop();

    rotateX(PI)

    var e = map(cos(input), 1, -1, 0, -400)
    var f = map(cos(input/2), 1, -1, -0.1, 0.125)

    translate(0, b_length - e);
    rotateY(input);

    push();
    rotate(theta); //right
    branch(b_length * (0.4 + f), theta);
    pop();

    push();
    rotate(-theta); //left
    branch(b_length * (0.4 + f), theta);
    pop();

  }
}

function mousePressed()
{
  micInput = true;
  getAudioContext().resume()
}
