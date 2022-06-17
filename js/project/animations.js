//animation 7
//sonic boom
function Dot() {
  
  this.vel = createVector(0, 0);
  this.loc = createVector(random(width), random(height));
  this.acc = createVector(-0.01, 0.01);
  this.diam = 2;
  this.topSpeed = 4;
  
  this.run = function() 
  {
    this.draw();
    this.move();
    this.borders();
  }
  
  this.draw = function() 
  {
    noStroke();
    //stroke(5)//
    fill(0);
    ellipse(this.loc.x, this.loc.y, this.diam);
  }
  
  this.move = function() 
  {
    let m = createVector(width/2, height/2.5);
    let dir = p5.Vector.sub(m, this.loc);
    dir.normalize();
    
    dir.mult(amp_* 2);
    
    this.acc = dir;
    this.vel.limit(this.topSpeed);
    this.vel.add(this.acc);
    this.loc.add(this.vel);
  }
  
  this.borders = function() 
  {
        if (this.loc.x < this.diam || 
            this.loc.x > width-this.diam ||
            this.loc.y < this.diam || 
            this.loc.y > height-this.diam) 
        {
          this.vel.x *= -1;
          this.vel.y *= -1;
        }   
  }
  
  this.joinDots = function() {

    for (var i = 0; i < dots.length; i++) {

      let d = dist(this.loc.x, this.loc.y,
                   dots[i].loc.x, dots[i].loc.y);
      if(d < 25)
      {
        strokeWeight(0.1);
        stroke(10);
        line(this.loc.x,this.loc.y, dots[i].loc.x, dots[i].loc.y);
      }
    }

  }
} 



//////////////////////////////////////////////////
                //animation 9//
///////////////////////////////////////////////////

function shapes(x, y, radius, npoints) {
 var angle = 360 /npoints;
	beginShape();
	for (var a = 0; a < 360; a += angle)
  {
  // modulating with r ( amount of movement when synth is active)
    var r = map(sigBuf[a],0,1,10,radius);

    // creating a whole shape in 360 angles
		var sx = x + r * cos(a);
		var sy = y + r * sin(a);
		vertex(sx, sy);
	}
	endShape(CLOSE);
}

//////////////////////////////////////////////////////////////
                  //animation 8//
///////////////////Rain function///////////////////////////////
var Rain = function(position) {
  this.position = position;
  this.speed = createVector(0, random(0, 3));
  this.colour = [0,0,250];
}

  // use FFT bin level to change speed and diameter
  Rain.prototype.update = function(someLevel) {
    this.position.y += this.speed.y / (someLevel*2);
    if (this.position.y > height) {
      this.position.y = -15;
    }
// changing drops size
  this.diameter = map(someLevel, 0, 1, 10, 280);
}
  
  // drawing rain drops
  Rain.prototype.draw = function() {
    fill(this.colour);
    rect(
      this.position.x, this.position.y,
      1, 2 + this.diameter
    );
}
  

//////////////////////////////////////////////

function Terrain()
{

  push();
  
    var yOff = flying;
    
    for (var y = 0; y < rows; y++) {
        var xOff = 0;
        for (var x = 0; x < cols; x++) {
            terrain[x][y] = map(noise(xOff, yOff), 0, 1, -sigBuf[x]*3000, sigBuf[x]*3000)
            xOff += 0.1;
        }
        yOff += 0.2
    }
    
    frameRate(20);
    translate(w/1.4, h/1.7)
    stroke(ndb*200);
    noFill();
    
    
    for (var y = 0; y < rows - 1; y++) {   
        beginShape(TRIANGLE_STRIP);
        strokeWeight(0.8);
        for (var x = 0; x < cols; x++) {
            //fill(terrain[x][y]+100)
            var s = map(sin(input), -1, 1, -0.3, 0.3);
            push();
            translate(x*scl, y*scl);
            vertex(x*scl, y*scl + terrain[x][y]);
            vertex(x*scl, (y+1)*scl +  terrain[x][y+1]);
            
            pop();
            
        }
        endShape();
        
        //input += 0.01;
    }
  pop();
  
}

//////////////////////////////////////////////////////////

function Waves()
{
  
  push();
  noiseScale = 0.01;
  noiseOffset = 0.02;
  noiseAmp = 70;
  noiseDetail(10, 0.4);

  //translate wave position
  translate(180, width/2.5);

  noFill();
  stroke(255);
  strokeWeight(0.2);
  


  for (var j = 0; j < 13; j++) {  
    beginShape()
    for ( var i = 0; i < 300; i++) 
    {
        //sin wave to animate position of animations
        var m = map(sin(counter), -1, 1, -0.12, 0.12);

        var n = noise(i * noiseScale + counter + m * (sigBuf[i] * 10) * j, 
                      i * noiseOffset + counter + m * j);

        var y = map(n, 0, 1, -noiseAmp, noiseAmp);

        vertex(i * 1.5, y + j * 2.5);//draw waves
    } 
    endShape()
  }
  
   counter += 0.005;//controls wave speed
  pop();
 
}

//////////////////////////////////////////////////////////

function Patterns()
{
  
  push();
  noFill();
  strokeWeight(0.2)
  translate(width/2, height/2.5);

  beginShape()
  for (var i = 0; i < 200; i++) {
    
    colorMode(HSB);
    //var col = map(ndb, 0, 1, 300, 10);
    var col2 = map(sin(input), -1, 1, 1, 1000);

    var col3 = map(sigMix[i]*col2, 0, 1, 10, 20);
    stroke(col3, i, 180);
    
    var r = sigMix[i];

    var x = r * cos(i) * 5000;
    var y = r * sin(i) * 5000;
    
    curveVertex(x, y);
    vertex(x, y);
    point(x, y);//stars
    
  }
  endShape();
  pop();
  
};

/////////////DRAW HORIZONTAL OSCILLOSCOPE////////////////

function oscilloscope()
{
    push();
    stroke(0, 250, 0); 
    strokeWeight(2);
    noFill();
    beginShape();
    for(var i = 0; i < 512; i++)
    {
      vertex(i * width/512, height/2 + sigBuf[i] * 1024);
    };
    endShape();
    pop();
};

///////////////////ANIMATED ELLIPSE///////////////////////

function circles() {

    for(var i = 0; i < 40; i++)
    {
      push();
      noFill();
      strokeWeight(2);
      stroke(i*15, ndb * 100)
      translate(width/2, height/2.5)
      rotate(ndb*input);
      ellipseMode(CENTER)

      ellipse((i * sigBuf[i] + ndb),//x pox
              i * 2 + (1+ndb),//y pos
              300 + (sigBuf[i] * 1000), //width
              100 + (sigBuf[i] * 5000)) //height
      pop();
    };
  
};
