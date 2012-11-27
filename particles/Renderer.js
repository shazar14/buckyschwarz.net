var Renderer = function(context) {
  var c = context;

  this.clear = function() {
    c.clearRect(0, 0, c.canvas.width, c.canvas.height);
  };

  this.drawParticle = function(particle) {
    if (!particle.alive) {
      return;
    }
    c.beginPath();
      c.arc(particle.position.x, particle.position.y, particle.radius, 0, Math.PI*2, true);
    c.closePath();

    c.fillStyle = particle.getFillStyle();
    c.fill();

    if (particle.hasOwnProperty('strokeStyle') && particle.strokeStyle !== '') {
      c.strokeStyle = particle.strokeStyle;
      c.stroke();
    }
  };
};