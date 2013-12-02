function Die (radius, color) {
  if (radius === undefined) { radius = 50; }
  if (color === undefined) { color = "#ff0000"; }
  this.x = 0;
  this.y = 0;
  this.radius = radius;
  this.vx = 0;
  this.vy = 0;
  this.mass = 1;
  this.rotation = 0;
  this.scaleX = 1;
  this.scaleY = 1;
  this.color = utils.parseColor(color);
  this.lineWidth = 1;
  this.visible = true;

  var halfSide = Math.sqrt(this.radius * this.radius / 5);
  var split = (halfSide + this.radius) / 2;

  this.x1 = this.x - split;
  this.y1 = this.y - split;
  this.x2 = this.x + split;
  this.y2 = this.y1;
  this.x3 = this.x2;
  this.y3 = this.y + split;
  this.x4 = this.x1;
  this.y4 = this.y3;
}

Die.prototype.draw = function (context) {
  context.save();
  context.translate(this.x, this.y);
  context.rotate(this.rotation);
  context.scale(this.scaleX, this.scaleY);
  
  context.lineWidth = this.lineWidth;
  context.fillStyle = this.color;
  context.beginPath();
  context.moveTo(this.x1, this.y1);
  context.lineTo(this.x2, this.y2);
  context.lineTo(this.x3, this.y3);
  context.lineTo(this.x4, this.y4);
  context.closePath();
  context.fill();
  if (this.lineWidth > 0) {
    context.stroke();
  }
  context.restore();
};