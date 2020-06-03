class Brick {
	constructor(location, width, height, color,row,rownums){
		this.location = location;
		this.width = width;
		this.points = (rownums-row);
		this.height = height;
		this.color = color;
	}
    
	display(){
		fill(this.color);
		rect(this.location.x, this.location.y, this.width, this.height);
	}
	isColliding(ball){
		if(ball.location.y - ball.radius <= this.location.y + this.height &&
            ball.location.y + ball.radius >= this.location.y &&
            ball.location.x + ball.radius  >= this.location.x &&
            ball.location.x - ball.radius <= this.location.x + this.width){
			return true;
		}

	}
}