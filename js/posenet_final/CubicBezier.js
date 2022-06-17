class CubicBezier {
  constructor() {
    this.p0 = createVector(0, height/2);
    this.p1 = createVector(width/3, height);
    this.p2 = createVector(width/2, 0);
    this.p3 = createVector(width, height/2);

    this.delta = 0.01; //smoothness of curve

    this.arrayLength = 40; //set array length (amount of trails)
    this.history_p0 = [];
    this.history_p1 = [];
    this.history_p2 = [];
    this.history_p3 = [];

    // animation variables
    this.animate = 0; // increment
    this.wave = 0;    // sin modulation
  }

  //------------------------------------------------
  clearArray() {
    //call to clear arrays when animation has finished
    this.history_p0.splice(0, this.arrayLength);
    this.history_p1.splice(0, this.arrayLength);
    this.history_p2.splice(0, this.arrayLength);
    this.history_p3.splice(0, this.arrayLength);
  }


  //--------------------------------------------------------
  update() { //update position

    // in sketch.js apply BezParticle location to QuadraticBezier particle location
    // before calling update
    let v0 = createVector(this.p0.x, this.p0.y);
    let v1 = createVector(this.p1.x, this.p1.y);
    let v2 = createVector(this.p2.x, this.p2.y);
    let v3 = createVector(this.p3.x, this.p3.y);

    //push previous positions into an array to draw trails
    this.history_p0.push(v0);
    this.history_p1.push(v1);
    this.history_p2.push(v2);
    this.history_p3.push(v3);

    // control the size of each array for trails
    if (this.history_p0.length > this.arrayLength) {
       this.history_p0.splice(0, 1);
       this.history_p1.splice(0, 1);
       this.history_p2.splice(0, 1);
       this.history_p3.splice(0, 1);
     }

     // map a sin wave to control color
     this.wave = map(sin(this.animate), -1, 1, 0, 360);
     this.animate += 0.01;

  }

  //----------------------------
  cubic(p0, p1, p2, p3, t) {
    let v1 = this.quadratic(p0, p1, p2, t)
    let v2 = this.quadratic(p1, p2, p3, t)
    //--------------------------
    let x = lerp(v1.x, v2.x, t);
    let y = lerp(v1.y, v2.y, t);
    //--------------------------
    line(v1.x, v1.y, v2.x, v2.y);
    return createVector(x, y);
  }

  //----------------------------
  quadratic(p0, p1, p2, t) {
    let x1 = lerp(p0.x, p1.x, t)
    let y1 = lerp(p0.y, p1.y, t)
    let x2 = lerp(p1.x, p2.x, t)
    let y2 = lerp(p1.y, p2.y, t)
    //--------------------------
    let x = lerp(x1, x2, t);
    let y = lerp(y1, y2, t);
    //--------------------------
    line(x1, y1, x2, y2)
    return createVector(x, y);
  }

  //----------------------------------
  show() {
    strokeWeight(0.1);
    noFill();

    if (this.history_p0.length > 4) {
        //loop through arrays
        for (let i = 0; i < this.history_p0.length; i++) {
          for (let t = 0; t <= 1.00001; t += this.delta) {
            stroke(t*this.wave, 255, 255, 0.1)
            let v = this.cubic( this.history_p0[i],
                                this.history_p1[i],
                                this.history_p2[i],
                                this.history_p3[i],
                                t);
          }
        }
      }
  } //-End-of-Show

} //--End-of-Class--
