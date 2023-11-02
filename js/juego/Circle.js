class Circle extends Figure{
    constructor(posX, posY, radius, context, img){
        super(posX, posY, context);
        this.radius = radius;
        this.img = img;
    }

    draw(){
        if(this.img !== null){
            let x = this.posX - this.radius,
                y = this.posY - this.radius,
                w = this.radius * 2,
                h = this.radius * 2;
    
            this.ctx.beginPath();
            this.ctx.arc(this.posX, this.posY, this.radius, 0, 2 * Math.PI);    
            this.ctx.closePath();
    
            if(this.highlight === true){
                this.ctx.strokeStyle = this.highlightStyle;
                this.ctx.lineWidth = 5;
                this.ctx.stroke();
            }

            this.ctx.save();
            this.ctx.clip();
            this.ctx.drawImage(this.img, x, y, w, h);
            this.ctx.restore();
        } 
        else {
            this.ctx.fillStyle = "white";
            this.ctx.beginPath();
            this.ctx.arc(this.posX, this.posY, this.radius, 0, 2 * Math.PI); 
            this.ctx.fill();
            this.ctx.closePath();
        }
    }

    getRadius(){
        return this.radius;
    }

    // DISTANCIA ENTRE 2 PUNTOS: raiz cuadrada de (x2 - x1)^2 + (y2 - y1)^2 
    isPointInside(x, y){
        let _x = MARGIN_LEFT_CANVAS + this.posX - x; 
        let _y = MARGIN_TOP_CANVAS + this.posY - y;
        return Math.sqrt((_x * _x) + (_y * _y)) < this.radius; 
    }

}