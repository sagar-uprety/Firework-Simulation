var fireworks = [];
var gravity;
var gravityForceSlider; //Range: 0.2- 0.4
var fireworkGenerationSlider; //Range: 0.0- 0.5
var numberofSubParticlesSlider; //Range: 100-500
var subParticlesSpreadSlider; //Range: 100-500

function setup() {
  createCanvas(windowWidth, windowHeight);
  colorMode(HSB);
  // gravity = createVector(0, 0.2); //positive y -> pointing downwards
  stroke(255);
  strokeWeight(4);
  background(0);

  gravityForceSlider = createSlider(0.1, 0.5, 0.2, 0.01);
  gravityForceSlider.position(20, 20);

  fireworkGenerationSlider = createSlider(0.0, 0.5, 0.02, 0.01);
  fireworkGenerationSlider.position(280, 20);

  numberofSubParticlesSlider = createSlider(10, 500, 100, 50);
  numberofSubParticlesSlider.position(600, 20);

  subParticlesSpreadSlider = createSlider(0.9, 1, 0.94, 0.01);
  subParticlesSpreadSlider.position(1000, 20);
}

function draw() {
  var gravityforce = gravityForceSlider.value();
  var genrerationSpeed = fireworkGenerationSlider.value();
  var numberofSubParticles = numberofSubParticlesSlider.value();
  var subParticlesSpread = subParticlesSpreadSlider.value();

  textSize(18);
  stroke("black");
  fill("white");
  text("Gravity Force", gravityForceSlider.x + gravityForceSlider.width + 15, 36);
  gravity = createVector(0, gravityforce);

  textSize(18);
  stroke("black");
  fill("white");
  text("Number of Fireworks", fireworkGenerationSlider.x + fireworkGenerationSlider.width + 15, 36);

  textSize(18);
  stroke("black");
  fill("white");
  text("Number of Exploded Particles", numberofSubParticlesSlider.x + numberofSubParticlesSlider.width + 15, 36);

  textSize(18);
  stroke("black");
  fill("white");
  text("Particles Spread", subParticlesSpreadSlider.x + subParticlesSpreadSlider.width + 15, 36);

  colorMode(RGB);
  background(0, 20); //trailing effect transition

  //limiting the firework generation speed using random numbers
  //every new frame there's a (genrerationSpeed) chance of new firework generation
  if (random(1) < genrerationSpeed) {
    fireworks.push(new Firework(numberofSubParticles, subParticlesSpread));
  }

  for (var i = fireworks.length - 1; i >= 0; i--) {
    fireworks[i].update();
    fireworks[i].show();
    if (fireworks[i].faded()) {
      fireworks.splice(i, 1);
    }
  }
}
