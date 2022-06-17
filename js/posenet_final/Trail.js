class Trail {
  constructor() {
    this.pos = createVector(width/2, height/2);  // set start position

    this.arrayLength = 400;  // set the array length
    this.history = [];   // array to store previous positions

    this.alpha = [];     // array to store alpha variation
    this.a = 0;          // variable to store alpha variation

    this.sizes = [];     // array to store size variation
    this.s = 0;          // variable to store size variation

    this.size = 8;       // set size

    this.r = floor(random(10, 40))

  }//-endOfConstructor-//

  //------------------------------------------------
  update(num) { //select keypoint number in update!!..
    this.arrayLength = 400;
      //access keypoints array (ml5.js posenet)
      for (let this_pose of poses) {
        let pose = this_pose.pose;
        for (let keypoint of pose.keypoints) {
          if (keypoint.score > 0.8) {
            //set a new start position if keypoints available
            let v = createVector(pose.keypoints[num].position.x,
                                 pose.keypoints[num].position.y)

            this.pos = v;  // set position == to keypoint location

            this.history.push(v); // push keypoint locations into an array

          //set array size
          if (this.history.length > this.arrayLength) {
            this.history.splice(0, 1);
          }

        }
      }
    }
  }

  //------------------------------------------------
  clearArray() {
    this.alpha.splice(0, this.arrayLength);
    this.sizes.splice(0, this.arrayLength);
    this.history.splice(0, this.arrayLength);
  }


  //------------------------------------------------
  show() {

    //----------------------------------------
    // reset the array for size and alpha
    // allows the array to be reset to clear memory
    for (let i = 0; i < this.arrayLength; i++){
        //map alpha (increment values within array)
        this.a = map(i, 0, this.arrayLength, 0, 150);
        this.alpha[i] = this.a

        //map size (increment values within array)
        this.s = map(i, 0, this.arrayLength, this.r, 1);
        this.sizes[i] = this.s
    }//-endOfLoop-//

    //loop through arrays
    for (let i = 0; i < this.history.length; i++) {
      let pos = this.history[i];
      noStroke();
      // correspond arrays (pos, alpha, sizes) to create dynamic effect
      // and draw history
      let h = map(i, 0, this.history.length, 0, 360)
      let a = map(i, 0, this.history.length, 0, 0.1)
      fill(h, 255, 255, a)
      ellipse(pos.x, pos.y, this.sizes[i]);
      //rect(pos.x, pos.y, this.sizes[i]);
    }
  }//End-of-show

}//End-of-Class
