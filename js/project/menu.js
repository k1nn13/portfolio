function manual()
{
  this.x = width/2;
  this.y = height/2.4;

  //keyboard diagram position//
  this.keyX = width/2 - 18;
  this.keyY= height/2.4 - 96;

  //text section position//
  this.sect1 = this.y - 270;//playing sounds
  this.sect2 = this.y - 65;//control panel and synthesis
  this.sect3 = this.y + 38;//effects delay and reverb
  this.sect4 = this.y + 102;//envelope attack and release;
  this.sect5 = this.y + 174//selecting scenes

  this.leftAlign = 205;

  this.buttonY = height/2.4 + 267;//button y position

  //array for keyboard notes//
  let keyLayoutTop = ["W", "E", " ", "T", "Y", "U", " ", " "];
  let keyLayoutBottom = ["A", "S", "D", "F", "G", "H", "J", "K"];

  //array for piano notes//
  let keyNotesTop = ["C#", "D#", " ", "F#", "G#", "A#", " "];
  let keyNotesBottom = ["C", "D", "E", "F", "G", "A", "B", "C"];


  ///////////////////////Instruction Button Logic//////////////////
  this.clicked = function()
  {

    if ((mouseX > this.x - 75 && mouseX < this.x + 75)
        && (mouseY > this.buttonY - 10 && mouseY < this.buttonY + 13))
    {
      ///starting from welcome screen//
      if(key1 == false && key2 == false && key3 == false & key4 == false &&
         key5 == false && key6 == false && key7 == false && key8 == false && key9 == false)
      {
        Menu_ = false;
        key1 = true;
      }
      else if(key1 == true || key2 == true || key3 == true || key4 == true ||
             key4 == true || key5 == true || key6 == true || key7 == true || key8 == true || key9 == true);///logic to turn off menu fro all animations
      {
        Menu_ = false;
      }
    }

  };

  this.draw = function()
  {

    //Draw background//
    push();
    rectMode(CENTER)
    fill(55);
    stroke(0, 40, 100);
    strokeWeight(3);
    //main bacground rectangle
    rect(this.x, this.y, 450, 580, 5, 5, 5, 5);

    //section dividers//
    strokeWeight(1);
    noFill();
    //section 1 divider//playing sounds;
    rect(this.x, this.sect1 + 95, 430, 165, 5, 5, 5, 5);//section 1 plying sounds border

    //section 2 divider//control panel, effects & envelope;
    rect(this.x, this.sect2 + 97, 430, 235, 5, 5, 5, 5);

    //section 3 divider//animations and hot keys;
    rect(this.x, this.sect5 + 27, 430, 88, 5, 5, 5, 5);


    //change color of button;
    if ((mouseX > this.x - 75 && mouseX < this.x + 75) && (mouseY > this.buttonY - 10 && mouseY < this.buttonY + 13))
    {
      fill(0, 60, 120);
    }
    else
    {
      fill(0, 40, 100)
    };

    //button continue
    stroke(155)

    rect(this.x, this.buttonY, 150, 25, 10, 10, 10, 10);

    noFill();
    textAlign(CENTER);
    stroke(155);
    text("Continue", this.x, this.buttonY + 3);



    pop();

    /////////////////////////
    //Draw keyboard diagram//
    ////////////////////////
    push();
    for (var i = 0; i < 8; i++)
    {
      textAlign(CENTER)
      //top row keyboard
      fill(0);
      stroke(255);
      rect(this.keyX -100 + i * 33, this.keyY - 114, 30, 30, 2, 2, 2, 2);
      //bottom row keyboard
      fill(200);
      stroke(20);
      rect(this.keyX -115 + i * 33, this.keyY - 80, 30, 30, 2, 2, 2, 2);

      //blank space to cover spare keys
      noStroke();
      fill(55);
      //draw keys//
      rect(this.keyX - 35, this.keyY-115, 32, 32);
      rect(this.keyX + 97, this.keyY-115, 72, 33);

      //key Text
      noFill();
      textSize(8);
      strokeWeight(0.8);
      stroke(100, 100, 200);
      text(keyNotesTop[i], this.keyX - 77 + i * 33, this.keyY - 105);
      text(keyNotesBottom[i], this.keyX - 91 + i * 33, this.keyY - 72);

      //notes text
      strokeWeight(1);
      textSize(8);
      //top row text keyboard
      stroke(255);
      text(keyLayoutTop[i], this.keyX - 86 + i * 33, this.keyY - 96);
      //bottom row text keyboard
      stroke(2);
      text(keyLayoutBottom[i], this.keyX - 100 + i * 33, this.keyY - 60);
    };
    pop();
    /////////////


    //Draw Text//
    push();

    fill(255);
    noStroke();
    textSize(15);
    textAlign(CENTER)
    //MAIN TITLE//
    text("Instruction Manual", this.x, this.y - 270);

    ////////KEYBOARD INSTRUCTIONS///////////SECT1//
    fill(150, 150, 0);
    textSize(14);
    textAlign(CENTER)
    text("Playing Sounds", this.x, this.sect1 + 30);//heading 1 playing sounds

    fill(200);
    textSize(12);
    text("Use the computer keyboard to trigger the synthesizer",
         this.x, this.sect1 + 47);
    text("The computer keys (in black and white) are mapped to the same frequency as",
         this.x, this.sect1 + 145);
    text("notes on a piano octave (in blue) from C to C .",
         this.x, this.sect1 + 160);

    ///////////CONTROL PANEL////////////////SECT2//
    textSize(14);
    fill(150, 150, 0);
    textAlign(CENTER)
    text("Control Panel & Synthesis",
         this.x, this.sect2);//heading 2 Control Panel and synthesis
    fill(200);
    textSize(12);
    text("There are 5 oscillators available to use:",
         this.x, this.sect2 + 15);
    text("Sin, Square, Sawtooth, Triangle and Noise.",
         this.x, this.sect2 + 30);
    text("Use the Rotary Knobs to control Volume and Pitch for each oscillator.",
         this.x, this.sect2 + 45);
    text("Rotary control for Amplitude Modulation (AM) and Frequency Modulation (FM) ",
         this.x, this.sect2 + 65);
    text("apply to all osillators (noise does not have pitch control).",
         this.x, this.sect2 + 81);

    /////////EFFECTS AND DELAY////SECT3//
    textSize(14);
    fill(150, 150, 0);
    textAlign(CENTER)
    text("Effects: Delay & Reverb", this.x, this.sect3);//heading 3 effects
    fill(200);
    textSize(12);
    text("Rotary control for Delay and Reverb are applied to all oscillators.",
         this.x, this.sect3 + 14);
    text("Delay = Wet / Dry Mix, Time = time of delay in seconds, F = Feedback amount.",
         this.x, this.sect3 + 28);
    text("Reverb = Wet / Dry Mix",
         this.x, this.sect3 + 42);

    ////////////ENVELOPE ATTACK AND RELEASE/////////SECT4
    textSize(14);
    fill(150, 150, 0);
    textAlign(CENTER)
    text("Envelope Attack & Release",
         this.x, this.sect4);//heading 3 effects
    fill(200);
    textSize(12);
    text("The Envelope applies to all Oscillators.",
         this.x, this.sect4 + 14);
    text("Attack = Envelope attack time in seconds.", this.x,
         this.sect4 + 28);
    text("Release = Envelope release time in seconds.", this.x,
         this.sect4 + 42);

    ////////////SELECTING SCENES/////////SECT5
    textSize(14);
    fill(150, 150, 0);
    textAlign(CENTER)
    text("Selecting Animations & Hot Keys",
         this.x, this.sect5);//heading 3 effects
    fill(200);
    textSize(12);
    text("To select a different animation press keys or buttons 1 - 9 .",
         this.x, this.sect5 + 15);
    text("To Show / Hide the control panel press key ' C ' or ' Control '.",
         this.x, this.sect5 + 30);
    text("To Show / Hide the Instruction Manual press ' M ' or ' Manual '.",
         this.x, this.sect5 + 45);
    text("To Show / Hide the Narrative press ' n ' or ' Narrative '.",
         this.x, this.sect5 + 60);

    pop();
  };

};

function Welcome()
{
  this.x = width/2;
  this.y = height/2.4;

  this.title = height/2.4 - 130;
  this.sect1 = height/2.4 - 50;
  this.buttonY = height/2.4 + 114;

  /////////////////////////
  this.clicked = function()
  {

    if ((mouseX > this.x - 75 && mouseX < this.x + 75)
        && (mouseY > this.buttonY - 10 && mouseY < this.buttonY + 13) && Welcome_ == true)
    {
      Welcome_ = false;
      Menu_ = true;
      viewControl = true;
      viewMenu = true;
    };

  };

  this.draw = function()
  {

    push();
    //Draw background//
    background(0);
    rectMode(CENTER)
    textAlign(CENTER);
    fill(55);
    stroke(0, 40, 100);
    strokeWeight(3);
    //main bacground rectangle
    rect(this.x, this.y, 400, 320, 5, 5, 5, 5);


    //change color of button;
    if ((mouseX > this.x - 75 && mouseX < this.x + 75)
        && (mouseY > this.buttonY - 10 && mouseY < this.buttonY + 13))
    {
      fill(0, 60, 120);
    }
    else
    {
      fill(0, 40, 100)
    };

    //button continue
    strokeWeight(1);
    stroke(155)
    //fill(0, 40, 100);
    rect(this.x, this.buttonY, 150, 25, 10, 10, 10, 10);

    noFill();
    textSize(10);
    stroke(155);
    text("Continue", this.x, this.buttonY + 2);

    //MAIN TITLE//
    fill(200);
    noStroke();
    textSize(15);
    text("ModSquare Presents", this.x,this.title);

    fill(155, 155, 0);
    textSize(24);
    text("A Vision Of Sound", this.x,this.title + 40);

    fill(200);
    textSize(15);
    text("an interactive installation", this.x, this.sect1);
    text("using synthesis to visualise and explore", this.x, this.sect1 + 30);
    text("how soundwaves have shaped", this.x, this.sect1 + 55);
    text("our world and imagination.", this.x, this.sect1 + 80);
//    text("and the evolution of life", this.x, this.sect1 + 60);
//    text("to the destructive powers in nature", this.x, this.sect1 + 75);
//    text("and how the human race has used sound wave technology", this.x, this.sect1 + 90);
//    text("in industry and art.", this.x, this.sect1 + 105);

    pop();
  };

};

function Description()
{
  this.x = width/2;
  this.y = height/1.5;

  this.title = this.y - 60;
  this.sect1 = this.y - 50;
  this.buttonY = this.y + 60;

  /////////////////////////
  this.clicked = function()
  {
    if ((mouseX > this.x - 75 && mouseX < this.x + 75)
        && (mouseY > this.buttonY - 10 && mouseY < this.buttonY + 13))
    {
      if(description1 == true)
      {
        description1 = false;
        description2 = false;
        description3 = false;
        description4 = false;
        description5 = false;
        description6 = false;
        description7 = false;
        description8 = false;
        description9 = false;
      }
      else if(description2 == true)
      {
        description1 = false;
        description2 = false;
        description3 = false;
        description4 = false;
        description5 = false;
        description6 = false;
        description7 = false;
        description8 = false;
        description9 = false;
      }
      else if(description3 == true)
      {
        description1 = false;
        description2 = false;
        description3 = false;
        description4 = false;
        description5 = false;
        description6 = false;
        description7 = false;
        description8 = false;
        description9 = false;
      }
      else if(description4 == true)
      {
        description1 = false;
        description2 = false;
        description3 = false;
        description4 = false;
        description5 = false;
        description6 = false;
        description7 = false;
        description8 = false;
        description9 = false;
      }
      else if(description5 == true)
      {
        description1 = false;
        description2 = false;
        description3 = false;
        description4 = false;
        description5 = false;
        description6 = false;
        description7 = false;
        description8 = false;
        description9 = false;
      }
      else if(description6 == true)
      {
        description1 = false;
        description2 = false;
        description3 = false;
        description4 = false;
        description5 = false;
        description6 = false;
        description7 = false;
        description8 = false;
        description9 = false;
      }
      else if(description7 == true)
      {
        description1 = false;
        description2 = false;
        description3 = false;
        description4 = false;
        description5 = false;
        description6 = false;
        description7 = false;
        description8 = false;
        description9 = false;
      }
      else if(description8 == true)
      {
        description1 = false;
        description2 = false;
        description3 = false;
        description4 = false;
        description5 = false;
        description6 = false;
        description7 = false;
        description8 = false;
        description9 = false;
      }
      else if(description9 == true)
      {
        description1 = false;
        description2 = false;
        description3 = false;
        description4 = false;
        description5 = false;
        description6 = false;
        description7 = false;
        description8 = false;
        description9 = false;
      }
    }
  }

  this.draw = function()
  {

    push();
    //Draw background//

    rectMode(CENTER)
    textAlign(CENTER);
    fill(55);
    stroke(0, 40, 100);
    strokeWeight(3);
    //main background rectangle
    rect(this.x, this.y, 600, 180, 30, 30, 30, 30);


    //change color of button;
    if ((mouseX > this.x - 75 && mouseX < this.x + 75)
        && (mouseY > this.buttonY - 10 && mouseY < this.buttonY + 13))
    {
      fill(0, 60, 120);
    }
    else
    {
      fill(0, 40, 100)
    };

    //button continue
    strokeWeight(1);
    stroke(155)
    //fill(0, 40, 100);
    rect(this.x, this.buttonY, 150, 25, 10, 10, 10, 10);

    noFill();
    stroke(155);
    textSize(10);
    text("Continue", this.x, this.buttonY + 4);

    pop();
  };


  this.d_1 = function()
  {
    textSize(14);
    textAlign(CENTER);
    noStroke();
    fill(200, 200, 0);
    text("1 : Oscilloscope", this.x, this.title);
    fill(200);
    textSize(12);
    text("An oscilloscope is scientifc instrument used to analyse soundwaves .",
         this.x, this.title + 45);
    text("Use the different oscillators to see the affect the shape of the wave",
         this.x, this.title + 65);
  };

  this.d_2 = function()
  {
    textSize(14);
    textAlign(CENTER);
    noStroke();
    fill(200, 200, 0);
    text("2 : The Art Of Sound", this.x, this.title);
    fill(200);
    textSize(12);
    text("Inspired by Ben Laposky’s ‘Oscillons’ created in 1953 , ",
         this.x, this.title + 40);
    text("one of the pioneers of electronic art. ",
         this.x, this.title + 60);
    text("This animation replicates some of Laposky’s work .",
         this.x, this.title + 80);
  };

  this.d_3 = function()
  {
    textSize(14);
    textAlign(CENTER);
    noStroke();
    fill(200, 200, 0);
    text("3 : Science and Shape.", this.x, this.title);
    fill(200);
    textSize(12);
    text("In space sound exists in the form of electromagnetic vibrations",
         this.x, this.title + 25);
    text("that pulsate in similar wave lengths as soundwaves.",
         this.x, this.title + 45);
    text("We also see naturally forming shapes relating to the work of",
         this.x, this.title + 65);
    text("Ernst Chladni",
         this.x, this.title + 85);
  };

  this.d_4 = function()
  {
    textSize(14);
    textAlign(CENTER);
    noStroke();
    fill(200, 200, 0);
    text("4 : Cellular Symphony", this.x, this.title);
    fill(200);
    textSize(12);
    text("Discover the rhythmic sound of living cells,",
         this.x, this.title + 20);
    text("based on an experiment by James Gimzewski and Andrew Pelling",
         this.x, this.title + 40);
    text("who “first made the discovery that yeast cells oscillate at the nanoscale”.",
         this.x, this.title + 60);
    text("When the cells collide they trigger the synthesiser. Mix the sounds to create a Cellular Symphony",
         this.x, this.title + 80);
  };

  this.d_5 = function()
  {
    textSize(14);
    textAlign(CENTER);
    noStroke();
    fill(200, 200, 0);
    text("5 : Siesmic Activity", this.x, this.title);
    fill(200);
    textSize(12);
    text("Earthquakes create seismic waves which pulse through the layers of earth below and on the surface.",
         this.x, this.title + 35);
    text("Invisible to human eyes and ears but observable as sound waves which can be recorded",
         this.x, this.title + 55);
    text("and monitored to provide advance warning of a coming seismic events. ",
         this.x, this.title + 75);
  };

  this.d_6 = function()
  {
    textSize(14);
    textAlign(CENTER);
    noStroke();
    fill(200, 200, 0);
    text("6 : Oceanic square", this.x, this.title);
    fill(200);
    textSize(12);
    text("Both soundwaves and waves in the sea share some properties.",
     this.x, this.title + 25);
    text("This scene demonstrates how different types of energy effect the sea, ",
     this.x, this.title + 45);
    text("from manmade disturbance, for instance the stranding of whales from sonar and ",
     this.x, this.title + 65);
    text("enviromental phenomena like a square wave which can cause dangerous currents. ",
     this.x, this.title + 85);
  };

  this.d_7 = function()
  {
    textSize(14);
    textAlign(CENTER);
    noStroke();
    fill(200, 200, 0);
    text("7 : Sonic Boom", this.x, this.title);
    fill(200);
    textSize(12);
    text("A sonic boom is a loud noise created when an aircraft flies through the sound barrier.",
     this.x, this.title + 18);
    text("As sound is triggered the particles are drawn towards the centre of the animation",
     this.x, this.title + 37);
    text("representing a “cone of pressurised air molecules” or “shockwave”.",
     this.x, this.title + 57);
    text("As the trigger is released the molecules move apart representing an aircraft",
     this.x, this.title + 77);
        text("moving “faster than the speed of sound or Supersonic”.",
     this.x, this.title + 97);

  };

  this.d_8 = function()
  {
    textSize(14);
    textAlign(CENTER);
    noStroke();
    fill(200, 200, 0);
    text("8 : Noise Pollution", this.x, this.title);
    fill(200);
    textSize(12);
    text("This animation explores the effect of noise pollution within a city and how it can affect our lives.",
     this.x, this.title + 18);
    text("Excessive noise can have detrimental effects on",
     this.x, this.title + 37);
    text("human health, amenity, productivity and the natural environment.",
     this.x, this.title + 57);
    text("The Buildings represent a bustling city whilst the landscape and rain",
     this.x, this.title + 77);
    text("symbolize the effect of noise pollution on the environment and our mental state.",
     this.x, this.title + 97);
  };

  this.d_9 = function()
  {
    textSize(14);
    textAlign(CENTER);
    noStroke();
    fill(200, 200, 0);
    text("9 : Chromesthesia", this.x, this.title);
    fill(200);
    textSize(12);
    text("Chromesthesia is a phenomenon in which hearing is simultaneously perceived with sights or feelings of colour.",
     this.x, this.title + 30);
    text("In this animation sound modulates the shapes and the mouse position controls the background colour",
     this.x, this.title + 50);
    text("and changes the structure of the forms demonstrating the use of multiple senses.",
     this.x, this.title + 70);
  };
}

////////////////////////////////////////////////
////////////////MENU BUTTONS////////////////////

function menuButton()
{
  this.bX = 770;//button one position controls
  this.bY = 732;

  this.bX1 = 58;//information
  this.bX2 = 157;//description
  this.bX3 = 675;//capture
  this.w = 70;
  this.h = 20;


  ///////////////////////////////////////
  /////////CLICKED FUNCTION//////////////

  this.clicked = function()
  {

    if ((mouseX > this.bX - 35 && mouseX < this.bX + 35) ///VIEW CONTROLS//
        && (mouseY > this.bY - 12 && mouseY < this.bY + 13))
    {

      if (viewControl == false)
      {
        viewControl = true;
      }
      else if (viewControl == true)
      {
        viewControl = false;
      }
    }
    else if ((mouseX > this.bX1 - 35 && mouseX < this.bX1 + 35) //VIEW MENU//
        && (mouseY > this.bY - 12 && mouseY < this.bY + 13))
    {
      if (Menu_ == false)
      {
        Menu_ = true;
        description1 = false;//turns description off if menu is on
        description2 = false;
        description3 = false;
        description4 = false;
        description5 = false;
        description6 = false;
        description7 = false;
        description8 = false;
        description9 = false;
      }
      else if (Menu_ == true)
      {
        Menu_ = false;
      }
    }
    else if ((mouseX > this.bX2 - 35 && mouseX < this.bX2 + 35) //VIEW DESCRIPTION
        && (mouseY > this.bY - 12 && mouseY < this.bY + 13))
    {

      ////////////////////////////////////////

      if (description1 == false && key1 == true)
      {
        description1 = true;
        Menu_ = false;
      }
      else if (description1 == true)
      {
        description1 = false;
      }

      ////////////////////////////////////////

      if (description2 == false && key2 == true)
      {
        description2 = true;
        Menu_ = false;
      }
      else if (description2 == true)
      {
        description2 = false;
      }

      ////////////////////////////////////////

      if (description3 == false && key3 == true)
      {
        description3 = true;
        Menu_ = false;
      }
      else if (description3 == true)
      {
        description3 = false;
      }

      ////////////////////////////////////////

      if (description4 == false && key4 == true)
      {
        description4 = true;
        Menu_ = false;
      }
      else if (description4 == true)
      {
        description4 = false;
      }

      ////////////////////////////////////////

      if (description5 == false && key5 == true)
      {
        description5 = true;
        Menu_ = false;
      }
      else if (description5 == true)
      {
        description5 = false;
      }

      /////////////////////////////////////////

      if (description6 == false && key6 == true)
      {
        description6 = true;
        Menu_ = false;
      }
      else if (description6 == true)
      {
        description6 = false;
      }

      /////////////////////////////////////////

      if (description7 == false && key7 == true)
      {
        description7 = true;
        Menu_ = false;
      }
      else if (description7 == true)
      {
        description7 = false;
      }

      /////////////////////////////////////////

      if (description8 == false && key8 == true)
      {
        description8 = true;
        Menu_ = false;
      }
      else if (description8 == true)
      {
        description8 = false;
      }

      /////////////////////////////////////////

      if (description9 == false && key9 == true)
      {
        description9 = true;
        Menu_ = false;
      }
      else if (description9 == true)
      {
        description9 = false;
      }

    }
    else if ((mouseX > this.bX3 - 35 && mouseX < this.bX3 + 35) //capture
        && (mouseY > this.bY - 12 && mouseY < this.bY + 13))
    {
      capture = true;
    }
  };

  //////////////////////////////////////////////
  ////////////////DRAW FUNCTION/////////////////

  this.draw = function()
  {
    push();
    rectMode(CENTER)
    textAlign(CENTER);


    //////////////////CONTROL PANEL BUTTON//////////////////
    if ((mouseX > this.bX - 35 && mouseX < this.bX + 35)
        && (mouseY > this.bY - 12 && mouseY < this.bY + 13))
    {
      strokeWeight(2);
    }
    else
    {
      strokeWeight(1);
    };

    fill(0);
    stroke(100, 100, 0);

    rect(this.bX, this.bY, this.w, this.h, 5, 5, 5, 5);



    ///////////////////INSTRUCTION BUTTON//////////////////
    if ((mouseX > this.bX1 - 35 && mouseX < this.bX1 + 35)
        && (mouseY > this.bY - 12 && mouseY < this.bY + 13))
    {
      strokeWeight(2);
    }
    else
    {
      strokeWeight(1);
    };

    fill(0);
    stroke(100, 100, 0);

    rect(this.bX1, this.bY, this.w, this.h, 5, 5, 5, 5);


    ////////////////ANIMATION DESCRIPTION//////////////////////
    if ((mouseX > this.bX2 - 35 && mouseX < this.bX2 + 35)
        && (mouseY > this.bY - 12 && mouseY < this.bY + 13))
    {
      strokeWeight(2);
    }
    else
    {
      strokeWeight(1);
    };

    fill(0);
    stroke(100, 100, 0);

    rect(this.bX2, this.bY, this.w, this.h, 5, 5, 5, 5);


    ////////////////capture//////////////////////
    if ((mouseX > this.bX3 - 35 && mouseX < this.bX3 + 35)
        && (mouseY > this.bY - 12 && mouseY < this.bY + 13))
    {
      strokeWeight(2);
    }
    else
    {
      strokeWeight(1);
    };

    fill(0);
    stroke(100, 100, 0);

    rect(this.bX3, this.bY, this.w, this.h, 5, 5, 5, 5);

    ////////////////////////////////////////////////////
                    //animate buttons//

    strokeWeight(0.8);
    noFill();
    //stroke(155);
    textSize(10);
    stroke(255);

    //controls
    push();
    noStroke();
    if (viewControl == true)
    {
      fill(180, 180, 0);
    }
    else if (viewControl == false)
    {
      fill(155);
    }
    text("Control", this.bX, this.bY + 4);
    pop();


    //manual
    push();
    noStroke();
    if (Menu_ == true)
    {
      fill(180, 180, 0);
    }
    else if (Menu_ == false)
    {
      fill(155);
    }
    text("Manual", this.bX1, this.bY + 4);
    pop();

    //description
    push();
    noStroke();
    if (description1 == true || description2 == true ||
        description3 == true || description4 == true ||
        description5 == true || description6 == true ||
        description7 == true || description8 == true ||
        description9 == true)
    {
      fill(180, 180, 0);
    }
    else if(description1 == false || description2 == false ||
            description3 == false || description4 == true ||
            description5 == false || description6 == false ||
            description7 == false || description8 == false ||
            description9 == false)
    {
      fill(155);
    }
    text("Narrative", this.bX2, this.bY + 4);
    pop();

    ///capture screen shot
    push();
    noStroke();
    fill(200);
    text("Screen Shot", this.bX3, this.bY + 4);
    pop();

    pop();
  };


};

function keySelect()
{

  this.bX = 330;//button one position
  this.bY = 732;

  this.bX1 = this.bX + 30;//button 2 position
  this.bX2 = this.bX1 + 30;//button3 position
  this.bX3 = this.bX2 + 30;//button4 position
  this.bX4 = this.bX3 + 30;//button5 position
  this.bX5 = this.bX4 + 30;//button6 position
  this.bX6 = this.bX5 + 30;//button7 position
  this.bX7 = this.bX6 + 30;//button8 position
  this.bX8 = this.bX7 + 30;//button9 position


  this.w = 20;
  this.h = 20;

  this.tX = 258;



   ///////////////////////////////////////
  /////////CLICKED FUNCTION//////////////

  this.clicked = function()
  {

    //////SELECT ANIMATION1/////////
    if ((mouseX > this.bX - 13 && mouseX < this.bX + 12)
        && (mouseY > this.bY - 12 && mouseY < this.bY + 13))
    {
      key1 = true;
      /////////////
      key2 = false;
      key3 = false;
      key4 = false;
      key5 = false;
      key6 = false;
      key7 = false;
      key8 = false;
      key9 = false;
    }
    //////SELECT ANIMATION2/////////
    else if ((mouseX > this.bX1 - 13 && mouseX < this.bX1 + 12)
        && (mouseY > this.bY - 12 && mouseY < this.bY + 13))
    {
      key2 = true;
      ////////////
      key1 = false;
      /////////////
      key3 = false;
      key4 = false;
      key5 = false;
      key6 = false;
      key7 = false;
      key8 = false;
      key9 = false;
    }
    //////SELECT ANIMATION3/////////
    else if ((mouseX > this.bX2 - 13 && mouseX < this.bX2 + 12)
        && (mouseY > this.bY - 12 && mouseY < this.bY + 13))
    {
      key3 = true;
      ////////////
      key1 = false;
      key2 = false;
      /////////////
      key4 = false;
      key5 = false;
      key6 = false;
      key7 = false;
      key8 = false;
      key9 = false;
    }
    //////SELECT ANIMATION4/////////
    if ((mouseX > this.bX3 - 13 && mouseX < this.bX3 + 12)
        && (mouseY > this.bY - 12 && mouseY < this.bY + 13))
    {
      key4 = true;
      /////////////
      key1 = false;
      key2 = false;
      key3 = false;
      /////////////
      key5 = false;
      key6 = false;
      key7 = false;
      key8 = false;
      key9 = false;
    }
    //////SELECT ANIMATION5/////////
    else if ((mouseX > this.bX4 - 13 && mouseX < this.bX4 + 12)
        && (mouseY > this.bY - 12 && mouseY < this.bY + 13))
    {
      key5 = true;
      ////////////
      key1 = false;
      key2 = false;
      key3 = false;
      key4 = false;
      /////////////
      key6 = false;
      key7 = false;
      key8 = false;
      key9 = false;
    }
    //////SELECT ANIMATION6/////////
    if ((mouseX > this.bX5 - 13 && mouseX < this.bX5 + 12)
        && (mouseY > this.bY - 12 && mouseY < this.bY + 13))
    {
      key6 = true;
      ////////////
      key1 = false;
      key2 = false;
      key3 = false;
      key4 = false;
      key5 = false;
      /////////////
      key7 = false;
      key8 = false;
      key9 = false;
    }
    //////SELECT ANIMATION 7/////////
    if ((mouseX > this.bX6 - 13 && mouseX < this.bX6 + 12)
        && (mouseY > this.bY - 12 && mouseY < this.bY + 13))
    {
      key7 = true;
      ////////////
      key1 = false;
      key2 = false;
      key3 = false;
      key4 = false;
      key5 = false;
      key6 = false;
      /////////////
      key8 = false;
      key9 = false;
    }
    //////SELECT ANIMATION 8/////////
    if ((mouseX > this.bX7 - 13 && mouseX < this.bX7 + 12)
        && (mouseY > this.bY - 12 && mouseY < this.bY + 13))
    {
      key8 = true;
      ////////////
      key1 = false;
      key2 = false;
      key3 = false;
      key4 = false;
      key5 = false;
      key6 = false;
      key7 = false;
      /////////////
      key9 = false;
    }
    //////SELECT ANIMATION 9/////////
    if ((mouseX > this.bX8 - 13 && mouseX < this.bX8 + 12)
        && (mouseY > this.bY - 12 && mouseY < this.bY + 13))
    {
      key9 = true;
      ////////////
      key1 = false;
      key2 = false;
      key3 = false;
      key4 = false;
      key5 = false;
      key6 = false;
      key7 = false;
      key8 = false;
      /////////////
    }
  };

  this.draw = function()
  {
    push();
    rectMode(CENTER)
    textAlign(CENTER);


    //////////////////KEY SELECT BUTTON 1//////////////////
    if ((mouseX > this.bX - 13 && mouseX < this.bX + 12)
        && (mouseY > this.bY - 12 && mouseY < this.bY + 13))
    {
      strokeWeight(2);
    }
    else
    {
      strokeWeight(1);
    };

    fill(0);
    stroke(100, 100, 0);

    rect(this.bX, this.bY, this.w, this.h, 5, 5, 5, 5);

    //////////////////KEY SELECT BUTTON 2//////////////////
    if ((mouseX > this.bX1 - 13 && mouseX < this.bX1 + 12)
        && (mouseY > this.bY - 12 && mouseY < this.bY + 13))
    {
      strokeWeight(2);
    }
    else
    {
      strokeWeight(1);
    };

    fill(0);
    stroke(100, 100, 0);

    rect(this.bX1, this.bY, this.w, this.h, 5, 5, 5, 5);

    //////////////////KEY SELECT BUTTON 3//////////////////
    if ((mouseX > this.bX2 - 13 && mouseX < this.bX2 + 12)
        && (mouseY > this.bY - 12 && mouseY < this.bY + 13))
    {
      strokeWeight(2);
    }
    else
    {
      strokeWeight(1);
    };

    fill(0);
    stroke(100, 100, 0);

    rect(this.bX2, this.bY, this.w, this.h, 5, 5, 5, 5);

    //////////////////KEY SELECT BUTTON 4//////////////////
    if ((mouseX > this.bX3 - 13 && mouseX < this.bX3 + 12)
        && (mouseY > this.bY - 12 && mouseY < this.bY + 13))
    {
      strokeWeight(2);
    }
    else
    {
      strokeWeight(1);
    };

    fill(0);
    stroke(100, 100, 0);

    rect(this.bX3, this.bY, this.w, this.h, 5, 5, 5, 5);

    //////////////////KEY SELECT BUTTON 5//////////////////
    if ((mouseX > this.bX4 - 13 && mouseX < this.bX4 + 12)
        && (mouseY > this.bY - 12 && mouseY < this.bY + 13))
    {
      strokeWeight(2);
    }
    else
    {
      strokeWeight(1);
    };

    fill(0);
    stroke(100, 100, 0);

    rect(this.bX4, this.bY, this.w, this.h, 5, 5, 5, 5);

    //////////////////KEY SELECT BUTTON 6//////////////////
    if ((mouseX > this.bX5 - 13 && mouseX < this.bX5 + 12)
        && (mouseY > this.bY - 12 && mouseY < this.bY + 13))
    {
      strokeWeight(2);
    }
    else
    {
      strokeWeight(1);
    };

    fill(0);
    stroke(100, 100, 0);

    rect(this.bX5, this.bY, this.w, this.h, 5, 5, 5, 5);

    //////////////////KEY SELECT BUTTON 7//////////////////
    if ((mouseX > this.bX6 - 13 && mouseX < this.bX6 + 12)
        && (mouseY > this.bY - 12 && mouseY < this.bY + 13))
    {
      strokeWeight(2);
    }
    else
    {
      strokeWeight(1);
    };

    fill(0);
    stroke(100, 100, 0);

    rect(this.bX6, this.bY, this.w, this.h, 5, 5, 5, 5);

    //////////////////KEY SELECT BUTTON 8//////////////////
    if ((mouseX > this.bX7 - 13 && mouseX < this.bX7 + 12)
        && (mouseY > this.bY - 12 && mouseY < this.bY + 13))
    {
      strokeWeight(2);
    }
    else
    {
      strokeWeight(1);
    };

    fill(0);
    stroke(100, 100, 0);

    rect(this.bX7, this.bY, this.w, this.h, 5, 5, 5, 5);

    //////////////////KEY SELECT BUTTON 9//////////////////
    if ((mouseX > this.bX8 - 13 && mouseX < this.bX8 + 12)
        && (mouseY > this.bY - 12 && mouseY < this.bY + 13))
    {
      strokeWeight(2);
    }
    else
    {
      strokeWeight(1);
    };

    fill(0);
    stroke(100, 100, 0);

    rect(this.bX8, this.bY, this.w, this.h, 5, 5, 5, 5);

    //BUTTON NUMBERS
    strokeWeight(1);
    noFill();

    textSize(10);

    ////////KEY 1 SELECTED//////
    push();
    if (key1 == true)
    {
      stroke(180, 180, 0);
    }
    else if (key1 == false)
    {
      stroke(155);
    }
    text("1", this.bX, this.bY + 4);
    pop();


    /////KEY 2 SELECTED/////
    push();
    if (key2 == true)
    {
      stroke(180, 180, 0);

    }
    else if (key2 == false)
    {
      stroke(155);
    }
    text("2", this.bX1, this.bY + 4);
    pop();


    ///////KEY 3 SELECTED///////
    push();
    if (key3 == true)
    {
      stroke(180, 180, 0);
    }
    else if (key3 == false)
    {
      stroke(155);
    }
    text("3", this.bX2, this.bY + 4);
    pop();


    ///////KEY 4 SELECTED///////
    push();
    if (key4 == true)
    {
      stroke(180, 180, 0);
    }
    else if (key4 == false)
    {
      stroke(155);
    }
    text("4", this.bX3, this.bY + 4);
    pop();

    ///////KEY 5 SELECTED///////
    push();
    if (key5 == true)
    {
      stroke(180, 180, 0);
    }
    else if (key5 == false)
    {
      stroke(155);
    }
    text("5", this.bX4, this.bY + 4);
    pop();


    ///////KEY 6 SELECTED///////
    push();
    if (key6 == true)
    {
      stroke(180, 180, 0);
    }
    else if (key6 == false)
    {
      stroke(155);
    }
    text("6", this.bX5, this.bY + 4);
    pop();

    ///////KEY 7 SELECTED///////
    push();
    if (key7 == true)
    {
      stroke(180, 180, 0);
    }
    else if (key7 == false)
    {
      stroke(155);
    }
    text("7", this.bX6, this.bY + 4);
    pop();

    ///////KEY 8 SELECTED///////
    push();
    if (key8 == true)
    {
      stroke(180, 180, 0);
    }
    else if (key8 == false)
    {
      stroke(155);
    }
    text("8", this.bX7, this.bY + 4);
    pop();

    ///////KEY 9 SELECTED///////
    push();
    if (key9 == true)
    {
      stroke(180, 180, 0);
    }
    else if (key9 == false)
    {
      stroke(155);
    }
    text("9", this.bX8, this.bY + 4);
    pop();


    //animation description
    push();
    textSize(11);
    fill(200, 200, 200);
    noStroke();

    if (key1 == true)
    {
      text("Oscilloscope", this.tX, this.bY + 4);
    }
    else if (key2 == true)
    {
      text("The Art of Sound", this.tX, this.bY + 4);
    }
    else if (key3 == true)
    {
      text("Science and Space", this.tX, this.bY + 4);
    }
    else if (key4 == true)
    {
      text("Cellular Symphony", this.tX, this.bY + 4);
    }
    else if (key5 == true)
    {
      text("Seismic Activity", this.tX, this.bY + 4);
    }
    else if (key6 == true)
    {
      text("Oceanic Square", this.tX, this.bY + 4);
    }
    else if (key7 == true)
    {
      text("Sonic Boom", this.tX, this.bY + 4);
    }
    else if (key8 == true)
    {
      text("Noise Pollution", this.tX, this.bY + 4);
    }
    else if (key9 == true)
    {
      text("Chromesthesia", this.tX, this.bY + 4);
    }
    pop();


    pop();
  }


}
