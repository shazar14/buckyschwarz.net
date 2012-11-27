var Particle = function() {
  this.position = { x: 0, y: 0 };
  this.startPosition = { x: 0, y: 0 };

  this.velocity = { x: 0, y: 0 };
  this.startVelocity = { x: 0, y: 0 };

  this.acceleration = { x: 1, y: 1 };
  this.startAcceleration = { x: 1, y: 1 };

  this.fill = { r: 0, g: 0, b: 0, a: 1.0 };
  this.startFill = { r: 0, g: 0, b: 0, a: 1.0 };

  this.angle = 0.0;

  this.mass = 1;

  this.age = 0.0;
  this.ageRate = 1.0;
  this.ageLimit = 700.0;
  this.alive = true;

  this.radius = 2;

};

Particle.prototype.update = function() {
  if (this.alive) {
    this.position.x -= this.velocity.x + this.acceleration.x;
    this.position.y -= this.velocity.y + this.acceleration.y;
    this.age += this.ageRate;
  }
};

Particle.prototype.die = function() {
	this.alive = false;
};

Particle.prototype.spawn = function() {
	this.alive = true;
	this.age = 0;
};

Particle.prototype.getFillStyle = function() {
	return 'rgba(' + this.fill.r + ', ' + this.fill.g + ', ' + this.fill.b + ', ' + this.fill.a + ')';
}