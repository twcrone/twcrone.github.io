function Cube (vpX, vpY, radius, color) {       
	if(radius == undefined) {
		radius = 50;
	}   
	if(color == undefined) {
		color = "#666666";
	}
	
    this.points = [];
	this.triangles = [];
	this.light = new Light();
	this.center = new Point3d(0, 0, radius * 2);   
	this.radius = radius;
	this.color = color;
	
	//front four corners
    this.points[0] = new Point3d(-this.radius, -this.radius, -this.radius, this.center);
    this.points[1] = new Point3d( this.radius, -this.radius, -this.radius, this.center);
    this.points[2] = new Point3d( this.radius,  this.radius, -this.radius, this.center);
    this.points[3] = new Point3d(-this.radius,  this.radius, -this.radius, this.center);
    
	//back four corners
    this.points[4] = new Point3d(-this.radius, -this.radius, this.radius, this.center);
    this.points[5] = new Point3d( this.radius, -this.radius, this.radius, this.center);
    this.points[6] = new Point3d( this.radius,  this.radius, this.radius, this.center);
    this.points[7] = new Point3d(-this.radius,  this.radius, this.radius, this.center);

    this.points.forEach(function (point) {
      point.setVanishingPoint(vpX, vpY);
    });

    //front
    this.triangles[0]  = new Triangle(this.points[0], this.points[1], this.points[2], this.color);
    this.triangles[1]  = new Triangle(this.points[0], this.points[2], this.points[3], this.color);
    //top
    this.triangles[2]  = new Triangle(this.points[0], this.points[5], this.points[1], this.color);
    this.triangles[3]  = new Triangle(this.points[0], this.points[4], this.points[5], this.color);
    //back
    this.triangles[4]  = new Triangle(this.points[4], this.points[6], this.points[5], this.color);
    this.triangles[5]  = new Triangle(this.points[4], this.points[7], this.points[6], this.color);
    //bottom
    this.triangles[6]  = new Triangle(this.points[3], this.points[2], this.points[6], this.color);
    this.triangles[7]  = new Triangle(this.points[3], this.points[6], this.points[7], this.color);
    //right
    this.triangles[8]  = new Triangle(this.points[1], this.points[5], this.points[6], this.color);
    this.triangles[9]  = new Triangle(this.points[1], this.points[6], this.points[2], this.color);
    //left
    this.triangles[10] = new Triangle(this.points[4], this.points[0], this.points[3], this.color);
    this.triangles[11] = new Triangle(this.points[4], this.points[3], this.points[7], this.color);

	var cubeLight = this.light;

	this.triangles.forEach(function(triangle) {
	  console.log(cubeLight);
      triangle.light = cubeLight;
    });
}

Cube.prototype.rotate = function (angleX, angleY) {
	this.points.forEach(function(point) {
    	point.rotateX(angleX);
    	point.rotateY(angleY);
    });
};  

Cube.prototype.draw = function (context) {
	this.triangles.forEach(function(triangle) {
    	triangle.draw(context);
    });
};

