//vehicle class starts a particle at a keypoint and seeks a target keypoint, once reached the start point is reset


class Vehicle {
  constructor() {
    this.pos = createVector(random(width), random(height));
    this.vel = createVector(0,0);
    this.acc = createVector(0,0);
    this.maxSpeed = 0.4;
    this.maxForce = 1;
    this.newPos = createVector(0, 0); //resets position at defined kepoint
    this.d = createVector(0, 0); //distance between pos and target
  }

  //-------SET-START-POSITION-------
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

  //------SET-TARGET-POSITION------
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
  
  
  setForce(speed, force) {
    this.maxSpeed = speed;
    this.maxForce = force;
  }

  //-------APPLY-FORCE--------------
  applyForce(force) {
    this.acc.add(force);
  }

  //----------SEEK-FUNCTION---------
  seek(t){
  let desired = p5.Vector.sub(t,this.pos);
  desired.setMag(this.maxSpeed);
  let steering = p5.Vector.sub(desired,this.vel);
  steering.limit(this.maxForce);
  this.applyForce(steering);

  //calculate distance between position and target   
  this.d = p5.Vector.dist(t, this.pos);
    
  }

  //---------UPDATE-----------------
  update() {
    this.vel.add(this.acc);
    this.vel.limit(this.maxSpeed);
    this.pos.add(this.vel);
    this.acc.set(0,0)

    //check distance between positionand target
    //reset start position to keypoint position
    if (this.d < 1) {
      this.pos = this.newPos;
    }
  }

  
  //----------DISPLAY---------------
  display(stroke_col) {

          fill(255,150);
          
          if (stroke_col != undefined) {
            stroke(stroke_col);
          } else {
            stroke(0, 0, 255);
          }

    
          ellipse(this.pos.x, this.pos.y, 4);

  }
  
  
}
//-----------------------------------//
//-----------End-of-Vehicle----------//