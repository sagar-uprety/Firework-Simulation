//Particle Construtor Function
function Particle(x, y, hue, subParticleFirework, subParticlesSpread) {
  this.position = createVector(x, y);
  this.lifetime = 255; //keep track of subparticles fading.
  this.hue = hue;
  this.subParticleFirework = subParticleFirework;
  this.subParticlesSpread = subParticlesSpread;

  if (!this.subParticleFirework) {
    this.velocity = createVector(random(-3.5, 3.5), random(-17, -12)); //-ve y -> particle moves upwards, and range is for diff in height
  } else {
    this.velocity = p5.Vector.random2D(); //if only used this - velocity is unit vector of length 1 - perfect circle
    this.velocity.mult(random(3, 9)); //to distord the subparticle explosion shape
  }

  this.acceleration = createVector(0, 0);

  this.impartForce = function (force) {
    this.acceleration.add(force);
  };

  //updates frame
  this.update = function () {
    if (this.subParticleFirework) {
      this.velocity.mult(subParticlesSpread);
      this.lifetime -= 5;
    }
    this.velocity.add(this.acceleration);
    this.position.add(this.velocity);
    this.acceleration.mult(0); //once the frame is updated, acceleration resets to 0
  };

  this.faded = function () {
    if (this.lifetime < 0) {
      return true;
    }
    return false;
  };

  this.show = function () {
    colorMode(HSB);
    if (this.subParticleFirework) {
      strokeWeight(2);
      stroke(hue, 255, 255, this.lifetime);
    } else {
      strokeWeight(4);
      stroke(hue, 255, 255);
    }
    point(this.position.x, this.position.y);
  };
}
