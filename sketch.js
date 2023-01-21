// in this sketch we're going to send the webcam to the shader, and then invert it's colors

// the shader letiable
let theShader;

// the camera variable
let myFont, myText;

let r = 0.0;
let g = 1.0;
let b = 0.0;

let color = [0.0, 1.0, 0.0];

let count = 0;

let synth = new Tone.MembraneSynth().toMaster();;

let pitch = "A4";

function preload() {
  // load the shader
  theShader = loadShader('effect.vert', 'effect.frag');
  myFont = loadFont('data/Montserrat-ExtraBold.ttf');
}

function setup() {
  // shaders require WEBGL mode to work
  createCanvas(864, 864, WEBGL);
  myText = createGraphics(width, height);
  noStroke();
}

function draw() {
  shader(theShader);

  myText.fill(255);
  myText.textFont(myFont);
  myText.textStyle(BOLD);
  myText.textAlign(LEFT, CENTER);
  myText.textSize(190);
  myText.text('todo\nes lo\nmismo', width * 0.1, height / 2);

  theShader.setUniform('u_tex0', myText);
  theShader.setUniform('u_color', color);
  theShader.setUniform('u_resolution', [width, height]);
  theShader.setUniform('u_mouse', [mouseX, mouseY]);
  theShader.setUniform('u_time', frameCount * 0.01);

  if (count == 0) {
    color = [1.0, 0.0, 0.0];
    pitch = "A4";
  }
  else if (count == 1) {
    color = [1.0, 1.0, 0.0];
    pitch = "B5";
  }
  else if (count == 2) {
    color = [0.0, 1.0, 0.0];
    pitch = "C#5";
  }
  else if (count == 3) {
    color = [0.0, 1.0, 1.0];
    pitch = "D5";
  }
  else if (count == 4) {
    color = [0.0, 0.0, 1.0];
    pitch = "G#5";
  }
  else if (count == 5) {
    color = [1.0, 0.0, 1.0];
    pitch = "C#6";
  }
  else if (count == 6) {
    color = [1.0, 1.0, 1.0];
    pitch = "F#5";
  }

  if (frameCount % 120 == 0) {
    count++;
    if (count > 6) {
      count = 0;
    }
    synth.triggerAttack(pitch, "8n");
  }

  rect(0, 0, width, height);

}
