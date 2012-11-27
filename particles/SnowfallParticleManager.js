var SnowfallParticleManager = function(count) {};
SnowfallParticleManager.prototype = new ParticleManager();

SnowfallParticleManager.prototype.create = function() {
  this.windGust = this.createNewWindGust();

  for (i = 0; i < this.particleCount; i++) {
    particle = this.spawnParticle(new Particle());

    particle.position.y = Math.min(-1, (Math.round(Math.random() * -this.bounds.y)) - 1);
    this.particles.push(particle);
  }
};

SnowfallParticleManager.prototype.update = function() {
  for (var i = 0; i < this.particleCount; i++) {
	if (i > this.particleCount) {
		return;
	}

    var particle = this.particles[i];

    if (!particle.alive) { 
      this.spawnParticle(particle);
    }

    // if the particle is below the bottom of the screen, it should die
    // so that it may be reborn once more, for the glory of Valhalla
    if (particle.position.y > this.bounds.y) {
      particle.die();
      continue;
    }

    if (this.windGust.isActive) {
      if (particle.position.y <= this.windGust.position.max && particle.position.y >= this.windGust.position.min) {
        particle.velocity.x = this.windGust.velocity;
        particle.fill = { r: 200, g: 25, b: 100, a: 1 };
      } else {
        particle.velocity = particle.startVelocity;
        particle.fill = particle.startFill;
      }
    }

    // if it's outside the box, just turn the ole boy around
    if (particle.position.x >= this.bounds.x || particle.position.x <= 0) {
      if (Math.random() * 100 % 8 == 0) {
//        particle.velocity.x = -particle.velocity.x * 1;
      }
    }

//    particle.acceleration.x -= this.wind * particle.mass;
    particle.update.call(particle);
  }
};

SnowfallParticleManager.prototype.spawnParticle = function(particle) {
  particle.spawn();

  particle.position.x = Math.max(2, Math.min(this.bounds.x - 2, Math.random() * this.bounds.x));
  particle.position.y = -1;

  particle.acceleration.x = 0;
  particle.acceleration.y = 0;

  particle.velocity.x = Math.max(Math.random() * 1, Math.random() * 1.2);
  particle.velocity.y = Math.max(Math.random() * 1.2, Math.random() * 1.5);

  particle.radius = Math.max(1, Math.round(Math.random() * 4));

  if ((Math.round(Math.random() * 10)) % 2 == 0) {
    particle.velocity.x = -particle.velocity.x;
  }

  particle.fill = { r: 255, g: 255, b: 255, a: Math.random() };

  particle.startVelocity = particle.velocity;
  particle.startFill = particle.fill;

  particle.update = update;

  return particle;
};

SnowfallParticleManager.prototype.resize = function(count) {
  if (count > this.particleCount) {
    var sizeDifference = count - this.particleCount;

	for (var i = 0; i < sizeDifference; i++) {
	  var particle = this.spawnParticle(new Particle());

	  particle.position.y = Math.min(-1, (Math.round(Math.random() * -this.bounds.y)) - 1);
	  this.particles.push(particle);
    }
  } else if (count < this.particleCount) {
    var sizeDifference = this.particleCount - count;

    for (var i = this.particleCount; i < sizeDifference; i++) {
      this.particles[i].die();
    }
  }

  this.particleCount = count;
};

SnowfallParticleManager.prototype.createNewWindGust = function() {
  var min = null;

  min = Math.max(2, Math.random() * (this.bounds.y - 80));
  return {
    position: { 
	  min: min, 
	  max: min + 50
	},
    velocity: Math.max(Math.random() * 5, Math.random() * 5.5),
    isActive: false
  };
};

var update = function() {
  if (this.alive) {
    this.position.x += this.velocity.x + this.acceleration.x;
    this.position.y += this.velocity.y + this.acceleration.y;
    this.age += this.ageRate;
  }
};