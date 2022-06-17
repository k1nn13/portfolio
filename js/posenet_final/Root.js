class Root {

  constructor(x, y){
    //initial location
    this.x = x;
    this.y = y;

    // grows at random speed and grows at random directions
    this.speedX = Math.random() * 4 - 2;
    this.speedY = Math.random() * 4 - 2;
    this.maxSize = Math.random() * 10 + 10;
    this.size = Math.random() * 9 + 7;
    this.vs = Math.random() * 0.2 + 0.1;

    this.angleX = Math.random() * 6.2;
    this.angleY = Math.random() * 6.2;

    this.angle = 0;
    this.va = Math.random() * 0.02 + 0.05;

    this.vaX = Math.random() * 0.6 - 0.3;
    this.vaY = Math.random() * 0.6 - 0.3;

    this.lightness = 255;

    this.hX = [];
    this.hY = [];
    this.hLen = 20;
    this.lifetime = 1;
    rectMode(CENTER);

    this.anim = 0;

  }

  //----------------------------------------------
  clearRootArray() {
    //clears the root array
    this.hX.splice(0, this.hLen);
    this.hY.splice(0, this.hLen);
    cancelAnimationFrame(this.anim);
  }

  //----------------------------------------------
  update() {

    //animate alpha
    this.lifetime -= 0.02;
    if(this.lifetime == 0) {
      this.lifetime = 1;
    }

    //randomise movement, rotation and size
    this.x += this.speedX + Math.sin(this.angleX);
    this.y += this.speedY + Math.sin(this.angleY);
    this.size += this.vs;
    this.angleX += this.vaX;
    this.angleY += this.vaY;
    this.angle += this.va;

    //control colour and stroke
    fill(this.angleX * 100, this.angleX * 80, this.lightness, this.lifetime);
    stroke(0);
    strokeWeight(0.2)

    //add shadow and blur effect
    drawingContext.shadowOffsetX = 10;
    drawingContext.shadowOffsetY = 10;
    drawingContext.shadowColor = 'black';
    drawingContext.shadowBlur = 20;

    //update brightness condition
    if(this.lightness < 70) this.lightness += 0.1;
    //only request animation if size is less than max size
    if (this.size < this.maxSize) {
      push();
        translate(this.x, this.y);
        rotate(this.angle);
        rect(0, 0, this.size);
        this.anim = requestAnimationFrame(this.update.bind(this));

      pop();
    }

    //create vector history for x and y co-ordinates
    this.hX.push(this.x);
    this.hY.push(this.y);

    if (this.hX.length > this.hLen) {
      this.hX.splice(0, 1);
      this.hY.splice(0, 1);
    }


    //draw vector history
    for (let i = 0; i < this.hX.length; i++) {
      push();
        translate(this.hX[i], this.hY[i])
        rotate(this.angle)
        rect(0, 0, this.size);
      pop();
    }


  }//End-of-update
}//End-of-Class..........
