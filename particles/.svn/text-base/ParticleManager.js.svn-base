var ParticleManager = function(count) {
  this.particles = [];
  this.bounds = { x: 0, y: 0 };
  this.stickiness = .4;
  this.groundFriction = .9;
  this.gravity = .3;
  this.tolerance = 0.0009;

  if (typeof count === 'number' && count > 0) {
    this.particleCount = count;
  } else {
    this.particleCount = 200;
  }
};

ParticleManager.prototype.initialize = function(origin) {
  this.particles = [];

  this.create(origin);
};

ParticleManager.prototype.create = function(origin) {
	for (i = 0; i < this.particleCount; i++) {
	    this.particles.push(new Particle());
	    this.particles[i].fill = { r: 200, g: 25, b: 100, a: 1 };
	    this.particles[i].position.x = origin.x;
	    this.particles[i].position.y = origin.y;
	    this.particles[i].age = 0;
	    this.particles[i].verticalBounces = 0;
	    this.particles[i].mass = Math.max(0.8, Math.random())

	    this.particles[i].angle = (360 / this.particleCount) * i;

	    this.particles[i].acceleration.x = (Math.random() * 100) / 7;
      this.particles[i].acceleration.y = (Math.random() * 100) / 8;

	    if (this.particles[i].angle >= 90 && this.particles[i].angle < 180) {
	      this.particles[i].acceleration.y = -this.particles[i].acceleration.y;
	    } else if (this.particles[i].angle >= 180 && this.particles[i].angle < 270) {
	      this.particles[i].acceleration.y = -this.particles[i].acceleration.y;
	      this.particles[i].acceleration.x = -this.particles[i].acceleration.x;
	    } else if (this.particles[i].angle >= 270 && this.particles[i].angle < 360) {
	      this.particles[i].acceleration.x = -this.particles[i].acceleration.x;
	    }
	  }
}

ParticleManager.prototype.update = function() {
  for (var i = 0; i < this.particleCount; i++ ) {
    if (!this.particles[i].alive) { continue; }

    if (this.particles.age > 1 && this.particles[i].velocity.y > -this.tolerance
     && this.particles[i].velocity.y < this.tolerance) {
      this.particles[i].die();
      continue;
    }

    // check if out of bounds in the x axis
    if (this.particles[i].position.x >= this.bounds.x || this.particles[i].position.x <= 0) {
      this.particles[i].acceleration.x = -this.particles[i].acceleration.x * this.stickiness;
    }

    // check if out of bounds in the y axis (below the screen)
    if (this.particles[i].position.y >= this.bounds.y) {
      this.particles[i].verticalBounces++;
      this.particles[i].acceleration.y = -this.particles[i].acceleration.y * (this.stickiness * Math.random());
    }
    this.particles[i].acceleration.y -= this.gravity * this.particles[i].mass;

    this.particles[i].update();
  }
};

ParticleManager.prototype.drawParticles = function(fn) {
  for (var i = 0; i < this.particleCount; i++) {
    fn(this.particles[i], i);
  }
};