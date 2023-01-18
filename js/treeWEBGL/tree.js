//--------------------------------------------------//
// Creat Instance to use multiple skteches on web page
var a = function(p0) {

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

  let divWidth;
  let divHeight;

  //---------------------------//
  p0.preload = function() {
    spaceage = p0.loadFont('../js/assets/spaceage.otf');
  }

  //---------------------------//
  p0.windowResized = function()
  {
    divWidth = document.getElementById("sketch-container").offsetWidth *.95;
    divHeight = document.getElementById("sketch-container").offsetHeight * 8;

    p0.resizeCanvas(divWidth, 350);
  }

  //---------------------------//
  p0.setup = function() {

    divWidth = document.getElementById("sketch-container").offsetWidth *.95;
    divHeight = document.getElementById("sketch-container").offsetHeight * 8;

    canvas = p0.createCanvas(divWidth, divHeight, p0.WEBGL);
    canvas.parent("sketch-container");

    //audio input
    mic = new p5.AudioIn();
    mic.start();
    fft = new p5.FFT(0.8);
    fft.setInput(mic);

    p0.textFont(spaceage);
  }

  //---------------------------//
  p0.draw = function() {
    p0.windowResized();
    let spectrum = fft.analyze();
    var amp = mic.getLevel();

    p0.push();
    p0.background(0);
    p0.translate(200, 100);

    var x_ = p0.map(p0.cos(camX),1, -1, -500, 1000);

    p0.camera(x_, -200, 1000,
           -200, -100, 0,
           0, 1, 0);

    p0.stroke(255);
    //tree base cylinder
    p0.push();
    for (var x = 0; x < 80; x++)
    {
        var f = p0.map(spectrum[x], 0, 140, 20, 100);
        var spec = p0.map(spectrum[x], 0, 140, 1, 2);
        p0.noStroke();
        p0.fill(f);
        p0.translate(0 + x, x + spec);
        p0.directionalLight(70, 90, 70, 80, 200, 220);
        input1 -= 0.000005;
        p0.rotateY(input1);
        p0.cylinder(40 + 10 * x , 5, 5, 5, 1, 1);
    }
    p0.pop();


    //moon
    p0.push();
      p0.translate(-180, -120, 250);
      p0.rotateZ(-moonInput)
      p0.push();
        p0.translate(-2400, 400,-4000);
        p0.directionalLight(245, 245 -f , 245- f, 320, 10 + f, 20 + spec);
        //rotateX(2 *input*2)//rolling back

        p0.noStroke();
        var s = p0.map(p0.cos(moonInput), 1, -1, 300, 600);
        p0.fill(s);
        p0.sphere(s);
      p0.pop();
  p0.pop();


    //cylinder sky
    p0.push();
    for (var x = 0; x < 60; x++)
    {
        var f =   p0.map(spectrum[x], 0, 140, 10, 55)
        var spect =   p0.map(spectrum[x], 0, 255, 0, 8)
        p0.stroke(0);
        p0.fill(f);
        p0.translate(190 +x,-10, -860 + spect)

        p0.rotateX(0.3);
        p0.rotateY(0.6);
        p0.rotateZ(0)
        p0.cylinder(30 + 10 * x + spect, 5, 5, 5, 1, 1);
    }

    //fractal tree
    p0.pop();
    var s = p0.map(p0.sin(input),1 , -1, 0.4, 1.2)
    angle = s;
    p0.branch(60, angle);
    p0.pop();


    ////////////////////
    if(micInput == false)
    {
        p0.push();
        p0.noStroke();
        p0.fill(255);
        p0.textAlign(  p0.CENTER,   p0.CENTER);
        p0.text("click on the animation to allow microphone response", 0,   p0.height *.4);
        p0.pop();
    }

    //input for movement
    moonInput += 0.01;
    input += 0.01;
    camX += 0.005;

  }

  //---------------------------//
  p0.branch = function(b_length, theta)
  {
      if(b_length > 10)
      {
          p0.strokeWeight(3);
          p0.stroke(70, 90, 20, 90);
          p0.rotateY(input);

          p0.line(0, 0,
               0,
               0, -b_length,
               0);

          p0.translate(0, -b_length);
          //center tree
          p0.push();
          p0.rotate(theta); //right
          p0.branch(b_length * 0.75, theta);
          p0.pop();

          p0.push();
          p0.rotate(-theta); //left
          p0.branch(b_length * 0.75, theta);
          p0.pop();


          p0.rotateY(input + p0.PI/2);
          p0.push();
          p0.rotate(theta); //right
          p0.branch(b_length * 0.2, theta);
          p0.pop();

          p0.push();
          p0.rotate(-theta); //left
          p0.branch(b_length * 0.2, theta);
          p0.pop();


          p0.rotateY(input +   p0.PI/8);
          p0.push();
          p0.rotate(theta); //right
          p0.branch(b_length * 0.3, theta);
          p0.pop();

          p0.push();
          p0.rotate(-theta); //left
          p0.branch(b_length * 0.3, theta);
          p0.pop();

          p0.rotateX(p0.PI)

          var e =  p0.map(p0.cos(input), 1, -1, 0, -400)
          var f =  p0.map(p0.cos(input/2), 1, -1, -0.1, 0.125)

          p0.translate(0, b_length - e);
          p0.rotateY(input);

          p0.push();
          p0.rotate(theta); //right
          p0.branch(b_length * (0.4 + f), theta);
          p0.pop();

          p0.push();
          p0.rotate(-theta); //left
          p0.branch(b_length * (0.4 + f), theta);
          p0.pop();

      }
  }

  //---------------------------//
  p0.mousePressed = function()
  {
    micInput = true;
      p0.getAudioContext().resume()
  }

}

//--------------------------------------//
var myp5 = new p5(a, 'skeych-container');
//---------------------------------------//
