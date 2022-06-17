////////////////////////////////////////////////////////
////////////////////CELL FUNCTION///////////////////////
////////////////////////////////////////////////////////


function Cell(_m, initialLocation) {
  
  //initial velocity/speed
  this.speed = createVector(random(-1,1), random(-1,1));

  //sets initial random location
  this.loc = createVector(random(width), random(height));
 
  //logic to determine if initial location has been defined
  if (initialLocation !== undefined) {
    this.loc.x = initialLocation.x;
    this.loc.y = initialLocation.y;
  }
  
  this.acceleration = createVector(0, 0);
  this.mass = _m || 3;
  this.diam = this.mass * 10;
  this.intersects = false;
  this.maxMass = 8; //if cells reach max mass they die
  this.agingRate = random(0.003, 0.015);//cells age at different rates.
  
  this.birthColor = color(10, 85, 202) 
  this.deathColor = color(255, 100, 10, 10);
  

  /////////////////////////
  ////////MITOSIS//////////
  this.mitosis = function() {
    //spawns a new child cell
    let childCell = new Cell(this.mass * 0.5,
                             this.loc.add(-5));
    return childCell; 
  }
  
  //////////////////////////
  ///////////AGING//////////
  this.aging = function() 
  {
    this.mass += this.agingRate;//increases mass by random agingRate

    for(let i = cells.length-1; i >= 0; i--)
    {
      //REMOVE PARTICLES
      if(cells[i].mass >= this.maxMass)
      {
        cells.splice(i, 2);
        if(random(100) < 100)//adds new cell with 50% chance
        {
          cells.push(this.mitosis());
          cells.push(this.mitosis());
        }
      }    
    }
  }
  
  ////////////////////////////////
  /////////CHECK COLLISIONS////////
  this.checkCollisions = function() 
  {  
    this.intersects = false; //keep track of collisions
    
    for (var i = 0; i < cells.length; i++) 
    {
      if (this != cells[i])
      {  
        //calculating dist between the centre of this cell and centre of the other cell
        var d = dist(this.loc.x, this.loc.y, cells[i].loc.x, cells[i].loc.y)

        // checking if distance is < other cell's radius + this cell's radius
        if (d <  this.diam/2 + cells[i].diam/2) 
        {
          var v = p5.Vector.sub(this.loc, cells[i].loc);
          v.setMag(0.4); //set magnitude
          this.acceleration.add(v);
          this.intersects = true
        }
      }
    }
    
  }
  
  ///////////////////////
  /////////RUN///////////
  this.run = function() 
  {
    this.draw();
    this.move();
    this.checkBorders();
  }
  
  ////////////////////////
  /////////DRAW///////////
  this.draw = function() {
    this.diam = this.mass * 10;
  
    //cell sin wave for animation set frequency
    var cell_sig = cell_sin.sinewave(22.07);
    cellBuf.push(cell_sig);
    cellBuf.shift();
   
    push();
    colorMode(HSB);
    strokeWeight(0.5)
    //translate position of cells to animate movement
    translate(this.loc.x, this.loc.y)
    for (var i = 0; i < 200; i++) 
    {
      //if intersects = true change colour to red
      if(this.intersects == true)   
      {
        //fill(255, 0, 0);
        freq = random(100, 800);//change frequency when cells collide
        env_1.trigger();//trigger sound when cells collide
        var col_I = map(sigBuf[i], 0, 1, 10, 20);
        stroke(col_I, i, 80);
      }
      else 
      {
        //smoothly changes colour from birth colour to death colour
        //let colAge = map(this.mass, 0, this.maxMass, 1, 0);
        //fill(lerpColor(this.deathColor, this.birthColor, colAge));
        
        var col = map(sigBuf[i], -0.04, 0.04, 200, 250);
        stroke(col, i, 80);
      } 
    
      
      var r = cellBuf[i] + sigBuf[i]*5; 
      
      var x = r * cos(i)*this.diam/2;
      var y = r * sin(i)*this.diam/2;
      point(x, y);//cells
    }
    pop();
    //noStroke(); //draw cells
    //ellipse(this.loc.x, this.loc.y, this.diam, this.diam);
  }
 
  /////////////////////////
  ///////////MOVE//////////
  this.move = function() 
  {
    this.speed.add(this.acceleration);
    this.loc.add(this.speed);
    this.acceleration.mult(0);
  }

  ///////////////////////////////
  ////////////BORDERS////////////
  this.checkBorders = function() {     
    if (this.loc.x > width-this.diam/2) {
      this.loc.x = width-this.diam/2;
      this.speed.x *= -1;
    } else if (this.loc.x < this.diam/2) {
      this.speed.x *= -1;
      this.loc.x = this.diam/2;
    }
    if (this.loc.y > 680-this.diam/2) {
      this.speed.y *= -1;
      this.loc.y = 680-this.diam/2;
    }
     else if (this.loc.y < this.diam/2) {
      this.speed.y *= -1;
      this.loc.y = this.diam/2;
    }
  }

  //////////////////////////
  //////////FORCE///////////
  this.applyForce = function(f) {
    var adjustedForce = f.copy();
    adjustedForce.div(this.mass);
    this.acceleration.add(adjustedForce);
  }
  
}

///////////////////////////////////////////////
///////////////////////////////////////////////


