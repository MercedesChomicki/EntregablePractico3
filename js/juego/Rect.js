class Rect extends Figure{
    constructor(posX, posY, width, height, context, img, padding, radius){
        super(posX, posY, context);
        this.w = width; 
        this.h = height;
        this.img = img; 
        this.padding = padding;
        this.radius = radius;
    }

    draw(){      
        this.ctx.fillRect(this.posX, this.posY, this.w, this.h);
        this.ctx.strokeStyle = "red";
        this.ctx.lineWidth = 2; 
        this.ctx.strokeRect(this.posX, this.posY, this.w, this.h); 
        this.ctx.drawImage(this.img, this.posX, this.posY, this.w, this.h); 
        this.drawDisk();
    }

    drawDisk() {
        let x = this.posX + this.radius + (this.padding/2);
        let y = this.posY + this.radius + (this.padding/2);
        let circle = new Circle(x, y, this.radius, this.ctx, null); 
        circle.draw();
    }

    getWidth(){
        return this.w;
    }

    getHeight(){
        return this.h;
    }

    setPos(x, y){
        this.posX = x - (this.w/2);
        this.posY = y - (this.h/2);
    }

    isPointInside(x, y){
        let pX = this.posX + MARGIN_LEFT_CANVAS;
        let pY = this.posY + MARGIN_TOP_CANVAS;
        return x > pX && x < pX + this.w && y > pY && y < pY + this.h;
    }

}