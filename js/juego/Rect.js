// class Rect extends Figure{
//     constructor(posX, posY, width, height, context, img, padding){
//         super(posX, posY, context);
//         this.w = width; 
//         this.h = height;
//         this.img = img; 
//         this.padding = padding;
//     }

//     draw(){      
//         this.ctx.fillRect(this.posX, this.posY, this.w, this.h);
//         this.ctx.strokeStyle = "black";
//         this.ctx.lineWidth = 4;
//         this.ctx.strokeRect(this.posX, this.posY, this.w, this.h); 
//         this.ctx.drawImage(this.img, this.posX, this.posY, this.w, this.h); 
//         this.drawDisks();
//     }

//     drawDisks(){
//         for (let col = 0; col < cols; col++) {
//             for (let row = 0; row < filas; row++) {
//                 let x = (col * this.lado) + this.posX_inicial;
//                 let y = (row * this.lado) + this.posY_inicial;
//                 this.boardDisks[col][row] = new Circle(x, y, this.radius, this.ctx, null);
//                 this.boardDisks[col][row].draw();
//             }
//         }
//     }

//     getWidth(){
//         return this.w;
//     }

//     getHeight(){
//         return this.h;
//     }

//     setPos(x, y){
//         this.posX = x - (this.w/2);
//         this.posY = y - (this.h/2);
//     }

//     isPointInside(x, y){
//         let pX = this.posX + MARGIN_LEFT_CANVAS;
//         let pY = this.posY + MARGIN_TOP_CANVAS;
//         return x > pX && x < pX + this.w && y > pY && y < pY + this.h;
//     //    return x > this.posX && x < this.posX + this.w && y > this.posY && y < this.posY + this.h;
//     }

// }

class Rect extends Figure{
    constructor(posX, posY, width, height, context, img, padding, radius){
        super(posX, posY, context);
        this.w = width; 
        this.h = height;
        this.img = img; 
        this.padding = padding; // 10
        this.radius = radius; //32.5
    }

    draw(){      
        this.ctx.fillStyle = "rgba(0, 0, 0, 0.5)"; // Color con transparencia
        this.ctx.fillRect(this.posX, this.posY, this.w, this.h);
        this.ctx.strokeStyle = "red";
        this.ctx.lineWidth = 2; // Grosor del borde en píxeles
        this.ctx.strokeRect(this.posX, this.posY, this.w, this.h); // Dibujar el borde del cuadrado
        this.ctx.drawImage(this.img, this.posX, this.posY, this.w, this.h); 
        this.drawDisk();
    }

    drawDisk() {
        let x = this.posX + this.radius + (this.padding/2);
        let y = this.posY + this.radius + (this.padding/2);
        this.ctx.fillStyle = "white";
        this.ctx.beginPath();
        this.ctx.arc(x, y, this.radius, 0, 2 * Math.PI); 
        this.ctx.fill();
        this.ctx.closePath();

        // for (let col = 0; col < cols; col++) {
        //     for (let row = 0; row < filas; row++) {
        //         let x = (col * this.lado) + this.posX_inicial;
        //         let y = (row * this.lado) + this.posY_inicial;
        //         this.boardDisks[col][row] = new Circle(x, y, this.radius, this.ctx, null);
        //         this.boardDisks[col][row].draw();
        //     }
        // }
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
    //    return x > this.posX && x < this.posX + this.w && y > this.posY && y < this.posY + this.h;
    }

}