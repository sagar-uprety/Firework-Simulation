function Firework(numberofSubParticles, subParticlesSpread) {
  this.hue = random(255);
  this.firework = new Particle(random(width), height, this.hue, false);
  this.exploded = false;
  this.subParticles = [];
  this.numberofSubParticles = this.numberofSubParticles;
  this.subParticlesSpread = this.subParticlesSpread;

  this.faded = function () {
    if (this.exploded && this.subParticles.length === 0) {
      return true;
    }
    return false;
  };

  this.update = function () {
    if (!this.exploded) {
      this.firework.impartForce(gravity);
      this.firework.update();

      //explode the firework once it reaches it top
      if (this.firework.velocity.y >= 0) {
        this.exploded = true;
        this.explode();
      }
    }

    //for sub-particles
    for (var i = this.subParticles.length - 1; i >= 0; i--) {
      this.subParticles[i].impartForce(gravity);
      this.subParticles[i].update();
      if (this.subParticles[i].faded()) {
        this.subParticles.splice(i, 1); //removing the subparticle from end
      }
    }
  };

  this.explode = function () {
    for (var i = 0; i < numberofSubParticles; i++) {
      //create newParticles from explosion point (sub-particles)
      console.log(subParticlesSpread);

      var newParticle = new Particle(this.firework.position.x, this.firework.position.y, this.hue, true, subParticlesSpread);
      this.subParticles.push(newParticle);
    }
  };

  this.show = function () {
    //don't show main firework after it has exploded
    if (!this.exploded) {
      this.firework.show();
    }
    //show sub particles after explosion
    for (var i = 0; i < this.subParticles.length; i++) {
      this.subParticles[i].show();
    }
  };
}
