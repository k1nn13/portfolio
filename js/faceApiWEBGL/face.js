//note, there is probably an easier way to do this but i couldnt figure it out
//I used the co-ordinates from the factial detection to build a traingle mesh
//and textured with a shader

class Face {
  
  constructor(x, y) {
    this.pos = createVector(x, y);
    
    
    //face z positions
    this.zPos = -25;
    this.n0z = -10;
    this.n1z = 10;
    this.n2z = 10;
    this.n3z = 20;
    this.sideFaceZ = -30;
    
  }

  //------------------------------------
  //draw connection of brow to eyes
   browToEye(detections, i1, i2){

  texture(shaderTexture);
    push();
    translate(this.pos.x, this.pos.y);
    stroke(0);
    for (let i = i1; i < i2; i++) {

      beginShape();
      vertex(detections.parts.leftEyeBrow[i]._x, detections.parts.leftEyeBrow[i]._y, this.zPos, 0, 0)
      vertex(detections.parts.leftEyeBrow[i+1]._x, detections.parts.leftEyeBrow[i+1]._y, this.zPos, 0, 1)
      vertex(detections.parts.leftEye[i]._x, detections.parts.leftEye[i]._y, 0, 1, 1)
      endShape(CLOSE);
      //---------//
      beginShape();
      vertex(detections.parts.rightEyeBrow[i]._x, detections.parts.rightEyeBrow[i]._y, this.zPos, 0, 0)
      vertex(detections.parts.rightEyeBrow[i+1]._x, detections.parts.rightEyeBrow[i+1]._y, this.zPos, 1, 0)
      vertex(detections.parts.rightEye[i]._x, detections.parts.rightEye[i]._y, 0, 1, 1)
      endShape(CLOSE);
    }
    pop();
  }

  
  //draw connection of eyes to brow
  //------------------------------------
   eyeToBrow(detections, i1, i2){

    push();
     translate(this.pos.x, this.pos.y);
     stroke(0);
      for (let i = i1; i < i2; i++) {
        beginShape();
        vertex(detections.parts.leftEye[i]._x, detections.parts.leftEye[i]._y, 0, 0, 0)
        vertex(detections.parts.leftEye[i+1]._x, detections.parts.leftEye[i+1]._y, 0, 1, 0)
        vertex(detections.parts.leftEyeBrow[i+1]._x, detections.parts.leftEyeBrow[i+1]._y, this.zPos, 1, 1)
        endShape(CLOSE);
        //---------//
        beginShape();
        vertex(detections.parts.rightEye[i]._x, detections.parts.rightEye[i]._y, 0, 0, 0)
        vertex(detections.parts.rightEye[i+1]._x, detections.parts.rightEye[i+1]._y, 0, 1, 0)
        vertex(detections.parts.rightEyeBrow[i+1]._x, detections.parts.rightEyeBrow[i+1]._y, this.zPos, 1, 1)
        endShape(CLOSE);
      }
    pop();
  }

  //------------------------------------
  //draw the forehead and parts and bridge of the nose
   forehead(detections){

    push();
      translate(this.pos.x, this.pos.y);
      //top left triangle
      texture(shaderTexture);
      beginShape();
      vertex(detections.parts.leftEyeBrow[4]._x, detections.parts.leftEyeBrow[4]._y, this.zPos, 0, 0)
      vertex(detections.parts.leftEye[3]._x, detections.parts.leftEye[3]._y, 0,            1, 0)
      vertex(detections.parts.nose[0]._x, detections.parts.nose[0]._y, this.n0z,                1, 1)
      vertex(detections.parts.leftEyeBrow[4]._x, detections.parts.leftEyeBrow[4]._y, this.zPos, 0, 1)
      endShape(CLOSE);
      //---------//
      //top right triangle
      beginShape();
      vertex(detections.parts.rightEyeBrow[0]._x, detections.parts.rightEyeBrow[0]._y, this.zPos, 0, 0)
      vertex(detections.parts.rightEye[0]._x, detections.parts.rightEye[0]._y, 0,            1, 0)
      vertex(detections.parts.nose[0]._x, detections.parts.nose[0]._y, this.n0z,                  1, 1)
      endShape(CLOSE);
      //--------//
      //central traingle
      beginShape();
      vertex(detections.parts.rightEyeBrow[0]._x, detections.parts.rightEyeBrow[0]._y, this.zPos, 0, 0)
      vertex(detections.parts.leftEyeBrow[4]._x, detections.parts.leftEyeBrow[4]._y, this.zPos,   1 ,0)
      vertex(detections.parts.nose[0]._x, detections.parts.nose[0]._y, this.n0z,                  1, 1);
      endShape(CLOSE);
      //--------//
      //bottom left traingle
      beginShape();
      vertex(detections.parts.leftEye[3]._x, detections.parts.leftEye[3]._y, 0,     0, 0);
      vertex(detections.parts.nose[0]._x, detections.parts.nose[0]._y, this.n0z,         1, 0);
      vertex(detections.parts.nose[1]._x, detections.parts.nose[1]._y, this.n1z,         1, 1);
      endShape(CLOSE);
      //--------//
      //bottom right triangle
      beginShape();
      vertex(detections.parts.rightEye[0]._x, detections.parts.rightEye[0]._y, 0, 0, 0);
      vertex(detections.parts.nose[0]._x, detections.parts.nose[0]._y, this.n0z,       1, 0);
      vertex(detections.parts.nose[1]._x, detections.parts.nose[1]._y, this.n1z,       0, 1);
      endShape(CLOSE);
    pop();
  }

   //--------------------------------//
   //draw the nose  
   nose(detections) {

    push();
     translate(this.pos.x, this.pos.y);
      //nose bridge eye left side from top to bottom
      beginShape();
      vertex(detections.parts.nose[1]._x, detections.parts.nose[1]._y, this.n1z,     0, 0);
      vertex(detections.parts.leftEye[4]._x, detections.parts.leftEye[4]._y, 0, 1, 0);
      vertex(detections.parts.leftEye[3]._x, detections.parts.leftEye[3]._y, 0, 1, 1);
      endShape(CLOSE);

      beginShape();
      vertex(detections.parts.nose[1]._x, detections.parts.nose[1]._y, this.n1z, 0, 0);
      vertex(detections.parts.nose[2]._x, detections.parts.nose[2]._y, this.n2z, 1, 0);
      vertex(detections.parts.leftEye[4]._x, detections.parts.leftEye[4]._y, 0, 1, 1);
      endShape(CLOSE);

      beginShape();
      vertex(detections.parts.nose[2]._x, detections.parts.nose[2]._y, this.n2z,     0, 0);
      vertex(detections.parts.nose[4]._x, detections.parts.nose[2]._y, 0,       1, 0);
      vertex(detections.parts.leftEye[4]._x, detections.parts.leftEye[4]._y, 0, 1, 1);
      endShape(CLOSE);

      beginShape();
      vertex(detections.parts.nose[2]._x, detections.parts.nose[2]._y, this.n2z, 0, 0);
      vertex(detections.parts.nose[3]._x, detections.parts.nose[3]._y, this.n3z, 1, 0);
      vertex(detections.parts.nose[4]._x, detections.parts.nose[2]._y, 0,   1, 1);
      endShape(CLOSE);


      beginShape();
      vertex(detections.parts.nose[3]._x, detections.parts.nose[3]._y, this.n3z, 0, 0);
      vertex(detections.parts.nose[4]._x, detections.parts.nose[2]._y, 0,   1, 0);
      vertex(detections.parts.nose[5]._x, detections.parts.nose[5]._y, 0,   1, 1);
      endShape(CLOSE);


      //nose tip left
      beginShape();
      vertex(detections.parts.nose[3]._x, detections.parts.nose[3]._y, this.n3z, 0, 0);
      vertex(detections.parts.nose[6]._x, detections.parts.nose[6]._y, 0,   1, 0);
      vertex(detections.parts.nose[5]._x, detections.parts.nose[5]._y, 0,   1, 1);
      endShape(CLOSE);

      //nose tip left
      beginShape();
      vertex(detections.parts.nose[4]._x, detections.parts.nose[4]._y, 0,  0, 0);
      vertex(detections.parts.nose[5]._x, detections.parts.nose[5]._y, 0,  1, 0);
       vertex(detections.parts.nose[4]._x, detections.parts.nose[2]._y, 0, 1, 1);
      endShape(CLOSE);

      //nose tip left
      beginShape();
      vertex(detections.parts.nose[4]._x, detections.parts.nose[2]._y, 0,       0, 0);
      vertex(detections.parts.leftEye[5]._x, detections.parts.leftEye[5]._y, 0, 1, 0);
      vertex(detections.parts.nose[4]._x, detections.parts.nose[4]._y, 0,       1, 1);
      endShape(CLOSE);

      //nose tip left
      beginShape();
      vertex(detections.parts.nose[4]._x, detections.parts.nose[2]._y, 0, 0, 0);
      vertex(detections.parts.leftEye[5]._x, detections.parts.leftEye[5]._y, 0, 1, 0);
      vertex(detections.parts.leftEye[4]._x, detections.parts.leftEye[4]._y, 0, 1, 1);
      endShape(CLOSE);

      beginShape();
      vertex(detections.parts.leftEye[5]._x, detections.parts.leftEye[5]._y, 0, 0, 0);
      vertex(detections.parts.mouth[0]._x, detections.parts.nose[4]._y, this.sideFaceZ, 1, 0);
       vertex(detections.parts.nose[4]._x, detections.parts.nose[4]._y, 1, 1);
      endShape(CLOSE);

      //nose tip left
      beginShape();
      vertex(detections.parts.leftEye[0]._x, detections.parts.leftEye[0]._y, 0, 0, 0);
      vertex(detections.parts.leftEye[5]._x, detections.parts.leftEye[5]._y, 0, 1, 0);
      vertex(detections.parts.mouth[0]._x, detections.parts.nose[4]._y, this.sideFaceZ, 1, 1);
      endShape(CLOSE);


      beginShape();
      vertex(detections.parts.leftEye[0]._x, detections.parts.leftEye[0]._y, 0, 0, 0);
      vertex(detections.parts.leftEyeBrow[0]._x, detections.parts.leftEyeBrow[0]._y, this.sideFaceZ, 1, 0);
      vertex(detections.parts.mouth[0]._x, detections.parts.nose[4]._y, this.sideFaceZ, 1, 1);
      endShape(CLOSE);


      //---------------------------------------------------//

      //nose bridge to eye right side from top to bottom
      beginShape();
      vertex(detections.parts.nose[1]._x, detections.parts.nose[1]._y, this.n1z, 0, 0);
      vertex(detections.parts.rightEye[0]._x, detections.parts.rightEye[0]._y, 0, 1, 0);
      vertex(detections.parts.rightEye[5]._x, detections.parts.rightEye[5]._y, 0, 1, 1);
      endShape(CLOSE);

      beginShape();
      vertex(detections.parts.nose[1]._x, detections.parts.nose[1]._y, this.n1z, 0, 0);
      vertex(detections.parts.nose[2]._x, detections.parts.nose[2]._y, this.n2z, 1, 0);
      vertex(detections.parts.rightEye[5]._x, detections.parts.rightEye[5]._y, 0, 1, 1);
      endShape(CLOSE);

      beginShape();
      vertex(detections.parts.nose[2]._x, detections.parts.nose[2]._y, this.n2z, 0, 0);
      vertex(detections.parts.nose[8]._x, detections.parts.nose[2]._y, 0, 1, 0);
      vertex(detections.parts.rightEye[5]._x, detections.parts.rightEye[5]._y, 0, 1, 1);
      endShape(CLOSE);

      beginShape();
      vertex(detections.parts.nose[2]._x, detections.parts.nose[2]._y, this.n2z, 0, 0);
      vertex(detections.parts.nose[3]._x, detections.parts.nose[3]._y, this.n3z, 1, 0);
      vertex(detections.parts.nose[8]._x, detections.parts.nose[2]._y, 1, 1);
      endShape(CLOSE);


      beginShape();
      vertex(detections.parts.nose[3]._x, detections.parts.nose[3]._y, this.n3z, 0, 0);
      vertex(detections.parts.nose[8]._x, detections.parts.nose[2]._y, 0, 1, 0);
      vertex(detections.parts.nose[7]._x, detections.parts.nose[7]._y, 0, 1, 1);
      endShape(CLOSE);


      beginShape();
      vertex(detections.parts.nose[3]._x, detections.parts.nose[3]._y, this.n3z, 0, 0);
      vertex(detections.parts.nose[6]._x, detections.parts.nose[6]._y, 0, 1, 0);
      vertex(detections.parts.nose[7]._x, detections.parts.nose[7]._y, 0, 1, 1);
      endShape(CLOSE);


      beginShape();
      vertex(detections.parts.nose[7]._x, detections.parts.nose[7]._y, 0, 0, 0);
      vertex(detections.parts.nose[8]._x, detections.parts.nose[2]._y, 0, 1, 0);
      vertex(detections.parts.nose[8]._x, detections.parts.nose[8]._y, 0, 1, 1);
      endShape(CLOSE);


      beginShape();
      vertex(detections.parts.nose[8]._x, detections.parts.nose[2]._y, 0, 0, 0);
      vertex(detections.parts.rightEye[4]._x, detections.parts.rightEye[4]._y, 0, 1, 0);
      vertex(detections.parts.nose[8]._x, detections.parts.nose[8]._y, 0, 1, 1);
      endShape(CLOSE);


      beginShape();
      vertex(detections.parts.nose[8]._x, detections.parts.nose[2]._y, 0, 0, 0);
      vertex(detections.parts.rightEye[4]._x, detections.parts.rightEye[4]._y, 0, 1, 0);
      vertex(detections.parts.rightEye[5]._x, detections.parts.rightEye[5]._y, 0, 1, 1);
      endShape(CLOSE);

      beginShape();
      vertex(detections.parts.nose[8]._x, detections.parts.nose[8]._y, 0, 0, 0);
      vertex(detections.parts.rightEye[4]._x, detections.parts.rightEye[4]._y, 0, 1, 0);
      vertex(detections.parts.mouth[6]._x, detections.parts.nose[8]._y, this.sideFaceZ, 1, 1);
      endShape(CLOSE);

      beginShape();
      vertex(detections.parts.mouth[6]._x, detections.parts.nose[8]._y, this.sideFaceZ, 0, 0);
      vertex(detections.parts.rightEye[4]._x, detections.parts.rightEye[4]._y, 0, 1, 0);
      vertex(detections.parts.rightEye[3]._x, detections.parts.rightEye[3]._y, 0, 1, 1);
      endShape(CLOSE);


      beginShape();
      vertex(detections.parts.mouth[6]._x, detections.parts.nose[8]._y, this.sideFaceZ, 0, 0);
      vertex(detections.parts.rightEyeBrow[4]._x, detections.parts.rightEyeBrow[4]._y, this.zPos, 1, 0);
      vertex(detections.parts.rightEye[3]._x, detections.parts.rightEye[3]._y, 0, 1, 1);
      endShape(CLOSE);

    pop();
  }
  
   //-----------------------------
   //connect the nose to the mouth
   noseToMouth(detections) {
     push();
      translate(this.pos.x, this.pos.y);
      //center to left side
      beginShape();
      vertex(detections.parts.nose[6]._x, detections.parts.nose[6]._y, 0, 0, 0 );
      vertex(detections.parts.mouth[3]._x, detections.parts.mouth[3]._y, 0, 1, 0);
      vertex(detections.parts.mouth[2]._x, detections.parts.mouth[2]._y, 0, 1, 1);
      endShape(CLOSE);

      beginShape();
      vertex(detections.parts.nose[6]._x, detections.parts.nose[6]._y, 0, 0, 0);
      vertex(detections.parts.nose[5]._x, detections.parts.nose[5]._y, 0, 1, 0);
      vertex(detections.parts.mouth[2]._x, detections.parts.mouth[2]._y, 0, 1, 1);
      endShape(CLOSE);


      beginShape();
      vertex(detections.parts.nose[5]._x, detections.parts.nose[5]._y, 0, 0, 0);
      vertex(detections.parts.nose[4]._x, detections.parts.nose[4]._y, 0, 1, 0);
      vertex(detections.parts.mouth[2]._x, detections.parts.mouth[2]._y, 0, 1, 1);
      endShape(CLOSE);


      beginShape();
      vertex(detections.parts.nose[4]._x, detections.parts.nose[4]._y, 0, 0, 0);
      vertex(detections.parts.mouth[1]._x, detections.parts.mouth[1]._y, 0, 1, 0);
      vertex(detections.parts.mouth[2]._x, detections.parts.mouth[2]._y, 0, 1, 1);
      endShape(CLOSE);

      beginShape();
      vertex(detections.parts.nose[4]._x, detections.parts.nose[4]._y, 0, 0, 0);
      vertex(detections.parts.mouth[1]._x, detections.parts.mouth[1]._y, 0, 1, 0);
      vertex(detections.parts.mouth[0]._x, detections.parts.nose[4]._y, this.sideFaceZ, 1, 1);
      endShape(CLOSE);

      beginShape();
      vertex(detections.parts.mouth[0]._x, detections.parts.nose[4]._y, this.sideFaceZ, 0, 0);
      vertex(detections.parts.mouth[0]._x, detections.parts.mouth[0]._y, 0, 1, 0);
      vertex(detections.parts.mouth[1]._x, detections.parts.mouth[1]._y, 0, 1, 1);
      endShape(CLOSE);


      //-------------------//

     //center to right side
      beginShape();
      vertex(detections.parts.nose[6]._x, detections.parts.nose[6]._y, 0, 0, 0);
      vertex(detections.parts.mouth[3]._x, detections.parts.mouth[3]._y, 0, 1, 0);
      vertex(detections.parts.mouth[4]._x, detections.parts.mouth[4]._y, 0, 1, 1);
      endShape(CLOSE);

      beginShape();
      vertex(detections.parts.nose[6]._x, detections.parts.nose[6]._y, 0, 0, 0);
      vertex(detections.parts.nose[7]._x, detections.parts.nose[7]._y, 0, 1, 0);
      vertex(detections.parts.mouth[4]._x, detections.parts.mouth[4]._y, 0, 1, 1);
      endShape(CLOSE);

      beginShape();
      vertex(detections.parts.nose[7]._x, detections.parts.nose[7]._y, 0, 0, 0);
      vertex(detections.parts.nose[8]._x, detections.parts.nose[8]._y, 0, 1, 0);
      vertex(detections.parts.mouth[4]._x, detections.parts.mouth[4]._y, 0, 1, 1);
      endShape(CLOSE);

      beginShape();
      vertex(detections.parts.nose[8]._x, detections.parts.nose[8]._y, 0, 0, 0);
      vertex(detections.parts.mouth[4]._x, detections.parts.mouth[4]._y, 0, 1, 0);
      vertex(detections.parts.mouth[5]._x, detections.parts.mouth[5]._y, 0, 1, 1);
      endShape(CLOSE);

      beginShape();
      vertex(detections.parts.nose[8]._x, detections.parts.nose[8]._y, 0, 0, 0);
      vertex(detections.parts.mouth[5]._x, detections.parts.mouth[5]._y, 0, 1, 0);
      vertex(detections.parts.mouth[6]._x, detections.parts.nose[8]._y, this.sideFaceZ, 1, 1);
      endShape(CLOSE);

      beginShape();
      vertex(detections.parts.mouth[6]._x, detections.parts.nose[8]._y, this.sideFaceZ, 0, 0);
      vertex(detections.parts.mouth[5]._x, detections.parts.mouth[5]._y, 0, 1, 0);
      vertex(detections.parts.mouth[6]._x, detections.parts.mouth[6]._y, 0, 1, 1);
      endShape(CLOSE);

     pop();

  }
   //-----------------------------------------------------
   //draw the mouth
   mouth(detections) {

     push();
     translate(this.pos.x, this.pos.y);
      beginShape();
      vertex(detections.parts.mouth[3]._x, detections.parts.mouth[3]._y, 0, 0, 0);
      vertex(detections.parts.mouth[13]._x, detections.parts.mouth[13]._y, 0, 1, 0);
      vertex(detections.parts.mouth[14]._x, detections.parts.mouth[14]._y, 0, 1, 1);
      endShape(CLOSE);

      beginShape();
      vertex(detections.parts.mouth[3]._x, detections.parts.mouth[3]._y, 0, 0, 0);
      vertex(detections.parts.mouth[13]._x, detections.parts.mouth[13]._y, 0, 1, 0);
      vertex(detections.parts.mouth[2]._x, detections.parts.mouth[2]._y, 0, 1, 1);
      endShape(CLOSE);

      beginShape();
      vertex(detections.parts.mouth[1]._x, detections.parts.mouth[1]._y, 0, 0, 0);
      vertex(detections.parts.mouth[13]._x, detections.parts.mouth[13]._y, 0, 1, 0);
      vertex(detections.parts.mouth[2]._x, detections.parts.mouth[2]._y, 0, 1, 1);
      endShape(CLOSE);

      beginShape();
      vertex(detections.parts.mouth[1]._x, detections.parts.mouth[1]._y, 0, 0, 0);
      vertex(detections.parts.mouth[13]._x, detections.parts.mouth[13]._y, 0, 1, 0);
      vertex(detections.parts.mouth[12]._x, detections.parts.mouth[12]._y, 0, 1, 1);
      endShape(CLOSE);

      beginShape();
      vertex(detections.parts.mouth[1]._x, detections.parts.mouth[1]._y, 0, 0, 0);
      vertex(detections.parts.mouth[0]._x, detections.parts.mouth[0]._y, 0, 1, 0);
      vertex(detections.parts.mouth[12]._x, detections.parts.mouth[12]._y, 0, 1, 1);
      endShape(CLOSE);

      //mouth bottom left to center

      beginShape();
      vertex(detections.parts.mouth[0]._x, detections.parts.mouth[0]._y, 0, 0, 0);
      vertex(detections.parts.mouth[11]._x, detections.parts.mouth[11]._y, 0, 1, 0);
      vertex(detections.parts.mouth[12]._x, detections.parts.mouth[12]._y, 0, 1, 1);
      endShape(CLOSE);

      beginShape();
      vertex(detections.parts.mouth[19]._x, detections.parts.mouth[19]._y, 0, 0, 0);
      vertex(detections.parts.mouth[11]._x, detections.parts.mouth[11]._y, 0, 1, 0);
      vertex(detections.parts.mouth[12]._x, detections.parts.mouth[12]._y, 0, 1, 1);
      endShape(CLOSE);

      beginShape();
      vertex(detections.parts.mouth[19]._x, detections.parts.mouth[19]._y, 0, 0, 0);
      vertex(detections.parts.mouth[11]._x, detections.parts.mouth[11]._y, 0, 1, 0);
      vertex(detections.parts.mouth[10]._x, detections.parts.mouth[10]._y, 0, 1, 1);
      endShape(CLOSE);

      beginShape();
      vertex(detections.parts.mouth[19]._x, detections.parts.mouth[19]._y, 0, 0, 0);
      vertex(detections.parts.mouth[10]._x, detections.parts.mouth[10]._y, 0, 1, 0);
      vertex(detections.parts.mouth[9]._x, detections.parts.mouth[9]._y, 0, 1, 1);
      endShape(CLOSE);

      beginShape();
      vertex(detections.parts.mouth[19]._x, detections.parts.mouth[19]._y, 0, 0, 0);
      vertex(detections.parts.mouth[18]._x, detections.parts.mouth[18]._y, 0, 1, 0);
      vertex(detections.parts.mouth[9]._x, detections.parts.mouth[9]._y, 0, 1, 1);
      endShape(CLOSE);

      //------------------//

      //center to right top
      beginShape();
      vertex(detections.parts.mouth[3]._x, detections.parts.mouth[3]._y, 0, 0, 0);
      vertex(detections.parts.mouth[15]._x, detections.parts.mouth[15]._y, 0, 1, 0);
      vertex(detections.parts.mouth[14]._x, detections.parts.mouth[14]._y, 0, 1, 1);
      endShape(CLOSE);


      beginShape();
      vertex(detections.parts.mouth[3]._x, detections.parts.mouth[3]._y, 0, 0, 0);
      vertex(detections.parts.mouth[15]._x, detections.parts.mouth[15]._y, 0, 1, 0);
      vertex(detections.parts.mouth[4]._x, detections.parts.mouth[4]._y, 0, 1, 1);
      endShape(CLOSE);


      beginShape();
      vertex(detections.parts.mouth[5]._x, detections.parts.mouth[5]._y, 0, 0, 0);
      vertex(detections.parts.mouth[15]._x, detections.parts.mouth[15]._y, 0, 1, 0);
      vertex(detections.parts.mouth[4]._x, detections.parts.mouth[4]._y, 0, 1, 1);
      endShape(CLOSE);

      beginShape();
      vertex(detections.parts.mouth[5]._x, detections.parts.mouth[5]._y, 0, 0, 0);
      vertex(detections.parts.mouth[15]._x, detections.parts.mouth[15]._y, 0, 1, 0);
      vertex(detections.parts.mouth[16]._x, detections.parts.mouth[16]._y, 0, 1, 1);
      endShape(CLOSE);


      beginShape();
      vertex(detections.parts.mouth[6]._x, detections.parts.mouth[6]._y, 0, 0, 0);
      vertex(detections.parts.mouth[5]._x, detections.parts.mouth[5]._y, 0, 1, 0);
      vertex(detections.parts.mouth[16]._x, detections.parts.mouth[16]._y, 0, 1, 1);
      endShape(CLOSE);

      beginShape();
      vertex(detections.parts.mouth[6]._x, detections.parts.mouth[6]._y, 0, 0, 0);
      vertex(detections.parts.mouth[16]._x, detections.parts.mouth[16]._y, 0 ,1, 0);
      vertex(detections.parts.mouth[7]._x, detections.parts.mouth[7]._y, 0, 1, 1);
      endShape(CLOSE);

      beginShape();
      vertex(detections.parts.mouth[17]._x, detections.parts.mouth[17]._y, 0, 0, 0);
      vertex(detections.parts.mouth[16]._x, detections.parts.mouth[16]._y, 0, 1, 0);
      vertex(detections.parts.mouth[7]._x, detections.parts.mouth[7]._y, 0, 1, 1);
      endShape(CLOSE);

      beginShape();
      vertex(detections.parts.mouth[17]._x, detections.parts.mouth[17]._y, 0, 0, 0);
      vertex(detections.parts.mouth[7]._x, detections.parts.mouth[7]._y, 0, 1, 0);
      vertex(detections.parts.mouth[8]._x, detections.parts.mouth[8]._y, 0, 1, 1);
      endShape(CLOSE);

      beginShape();
      vertex(detections.parts.mouth[17]._x, detections.parts.mouth[17]._y, 0, 0, 0);
      vertex(detections.parts.mouth[9]._x, detections.parts.mouth[9]._y, 0, 1, 0);
      vertex(detections.parts.mouth[8]._x, detections.parts.mouth[8]._y, 0, 1, 1);
      endShape(CLOSE);

      beginShape();
      vertex(detections.parts.mouth[17]._x, detections.parts.mouth[17]._y, 0, 0, 0);
      vertex(detections.parts.mouth[9]._x, detections.parts.mouth[9]._y, 0, 1, 0);
      vertex(detections.parts.mouth[18]._x, detections.parts.mouth[18]._y, 0, 1, 1);
      endShape(CLOSE);
     pop();
  }
  
}
