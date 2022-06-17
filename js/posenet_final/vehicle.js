//vehicle class starts a particle at a keypoint and seeks a target keypoint, once reached the start point is reset

class Vehicle {

  //----------------------------------------------------//
  constructor() {

    this.pos = createVector(random(width), random(height));
    this.vel = createVector(0,0);
    this.acc = createVector(0,0);
    this.maxSpeed = 0.4; //?? using sliders
    this.maxForce = 1;   //??
    this.newPos = createVector(0, 0); //resets position at defined kepoint
    this.d = createVector(0, 0);      //distance between pos and target

    //trails & color
    this.arrayLength = 50;  // set the array length
    this.history = [];      // array to store previous positions

    //set alpha
    this.alpha = [];
    this.a = 0;

    //set sizes
    this.sizes = [];
    this.size = 4;

    //set brightness
    this.bright = [];
    this.b = 0;

    //sin modulation
    this.wave = 0;
    this.mod = 0;

  }

  //------------------------------------------------
  clearArray() {
    // call function to clear the arrays on finish
    this.alpha.splice(0, this.arrayLength);
    this.sizes.splice(0, this.arrayLength);
    this.history.splice(0, this.arrayLength);
    this.bright.splice(0, this.arrayLength);
   }

  //----------------------------------------------------//
  //---------------SET-START-POSITION-------------------//
  setStartPos(num) {
    //sets a new start position for when target has been reached
    for (let this_pose of poses) {
      let pose = this_pose.pose;
      for (let keypoint of pose.keypoints) {
        if (keypoint.score > 0.8) {
          let v = createVector(pose.keypoints[num].position.x,
                               pose.keypoints[num].position.y)

          this.newPos = v;
        }
      }
    }
  }

  //----------------------------------------------------//
  //-----------------SET-TARGET-POSITION----------------//
  //set a target from keypoints
  setTarget(num) {
    for (let this_pose of poses) {
      let pose = this_pose.pose;
      for (let keypoint of pose.keypoints) {
        if (keypoint.score > 0.8) {
          let v = createVector(pose.keypoints[num].position.x,
                               pose.keypoints[num].position.y)

          return  v;
        }
      }
    }
  }

  //----------------------------------------------------//
  //-------------------SET-FORCE-(GUI)------------------//
  //set the force / speed from sliders in draw
  setForce(speed, force) {
    this.maxSpeed = speed;
    this.maxForce = force;
  }

  //----------------------------------------------------//
  //------------------APPLY-FORCE-----------------------//
  applyForce(force) {
    this.acc.add(force);
  }

  //----------------------------------------------------//
  //--------------------SEEK-FUNCTION-------------------//
  seek(t){

    //sets a new start position for when target has been reached
    for (let this_pose of poses) {
      let pose = this_pose.pose;
      for (let keypoint of pose.keypoints) {
        if (keypoint.score > 0.8) {

          let desired = p5.Vector.sub(t,this.pos);
          desired.setMag(this.maxSpeed);
          let steering = p5.Vector.sub(desired,this.vel);
          steering.limit(this.maxForce);
          this.applyForce(steering);

          //calculate distance between position and target
          this.d = p5.Vector.dist(t, this.pos);

         }
       }
     }
  }

  //----------------------------------------------------//
  //-----------------------UPDATE-----------------------//
  update() {

    //----------------------------------------
    // reset the array for size and alpha
    // allows the array to be reset to clear memory
    for (let i = 0; i < this.arrayLength; i++){
      //--map alpha
      this.a = map(i, 0, this.arrayLength, 0.01, 0.8);
      this.alpha[i] = this.a;
      //--map brightness
      this.b = map(i, 0, this.arrayLength, 100, 255);
      this.bright[i] = this.b;
      //--map sizes
      this.size = map(i, 0, this.arrayLength, 5, 0.2);
      this.sizes[i] = this.size
    }

    //------------------------------------------
    //update position
    this.vel.add(this.acc);
    this.vel.limit(this.maxSpeed);
    this.pos.add(this.vel);
    this.acc.set(0,0)

    //check distance between positionand target
    //reset start position to keypoint position
    if (this.d < 1) {
      this.pos = this.newPos;
    }

    //------------------------------------------
    //create location history
    let v = createVector(this.pos.x, this.pos.y);
    this.history.push(v); // push keypoint locations into an array
    //set array size
    if (this.history.length > this.arrayLength) {
      this.history.splice(0, 1);
    }

    //sin modulation used to affect HUE
    this.wave = map(sin(this.mod), -1, 1, -50, 50);
    this.mod += 0.1;

  }

  //----------------------------------------------------//
  //---------------------DISPLAY------------------------//
  display(stroke_col) {


    strokeWeight(5);

    for (let i = 0; i < this.history.length; i++) {
      //check if colour has been assigned
      fill(255, this.alpha[i]);

      if (stroke_col != undefined) {
        //choose color (r - red / b - blue / y - yellow)
        if (stroke_col == 'r') {
            stroke(this.wave, 255, this.bright[i], this.alpha[i]);
        } else if (stroke_col == 'b') {
            stroke(240 - this.wave, 255, this.bright[i], this.alpha[i]);
        } else if ( stroke_col == 'y') {
            stroke(60 + this.wave, 255, this.bright[i], this.alpha[i]);
        }
      } else {
        stroke(255, 255, 255);
      }

      // and draw history
      let pos = this.history[i];
      ellipse(pos.x, pos.y, this.sizes[i]);
    }
  }//--End-of-Display
}//--END-OF-CLASS
//-----------------------------------//
