class Ball {
	constructor(location,ballSize,VelocityInput) {
		this.radius=ballSize;
		this.size = this.radius * 2 ;
		this.location = createVector(paddle.location.x + (paddle.width/2) , paddle.location.y - (this.radius) -5);
		this.color = color(128,0,128);
		this.velocity = VelocityInput;
		this.paddle = paddle;



	}
    
	bounceEdge() {
		if(this.location.x + this.radius >= width){
			this.reverse('x');
		} else if(this.location.x - this.radius <=0){
			this.reverse('x');
		} else if(this.location.y - this.radius <=0){
			this.reverse('y');
		}
	}

	bouncePaddle() {
		if (this.location.x + this.radius >= this.paddle.location.x &&
            this.location.x - this.radius <= this.paddle.location.x + this.paddle.width){
			if(this.location.y + this.radius >= this.paddle.location.y){
				this.reverse('y');
				this.location.y = this.paddle.location.y - this.radius -1;
			}
		}
	}
    
	ballSpeedUp(){
		this.velocity.x *= 1.02;
		this.velocity.y *= 1.02;

	}

	reverse(coord) {
		this.velocity[coord] *= -1;
	}

	display() {
		fill(this.color);
		ellipse(this.location.x, this.location.y, this.size,this.size);
	}

	update() {
		this.location.add(this.velocity);
	}
    
	belowBottom(){
		return this.location.y - this.radius > height;
	}

}