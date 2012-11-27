var FountainManager = function() {};
FountainManager.prototype = new ParticleManager();
FountainManager.prototype.parent = ParticleManager.prototype;
FountainManager.prototype.constructor = FountainManager;
FountainManager.NewVelocity = function() {
	return {x: (Math.random() * 5) - 3, y: (Math.random() * 25) - 10 };
}

FountainManager.prototype.create = function() {
	for (i = 0; i < this.particleCount; i++) {
		var particle = new Particle();

		particle.ageRate = (Math.random() * 5) + 1;
		particle.verticalBounces = 0;
		particle.ageLimit = (Math.random() * 25) + 1;
		particle.angle = (180 / this.particleCount) * i;


			particle.spawn();
			particle.position.x = this.origin.x;
			particle.position.y = this.origin.y
			particle.velocity = FountainManager.NewVelocity();

			if (particle.angle >= 270 && particle.angle < 360) {
			  particle.velocity.x = -particle.velocity.x;
			}

		this.particles.push(particle);
	}
};

FountainManager.prototype.update = function() {
	for (var i = 0; i < this.particleCount; i++ ) {
		if (!this.particles[i].alive) {
			this.particles[i].spawn();
			this.particles[i].position.x = this.origin.x;
			this.particles[i].position.y = this.origin.y;
			this.particles[i].velocity = FountainManager.NewVelocity();
			this.particles[i].ageLimit = (Math.random() * 225) + 1;
			continue;
		}

		if (this.particles[i].position.x >= this.bounds.x || this.particles[i].position.x <= 0) {
		  this.particles[i].velocity.x = -this.particles[i].velocity.x * this.stickiness;
		}
		if (this.particles[i].position.y >= this.bounds.y || this.particles[i].position.y <= 0) {
		  this.particles[i].verticalBounces++;
		  this.particles[i].velocity.y = -this.particles[i].velocity.y * this.stickiness;
		}
		this.particles[i].update();
		this.particles[i].velocity.y -= this.gravity;
	}
};