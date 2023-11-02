class Figure{
    constructor(posX, posY, context){
        this.posX = posX;
        this.posY = posY;
        this.highlight = false; //resaltado
        this.highlightStyle = 'red'; //estilo del resaltado
        this.ctx = context;
    }

    setPos(x, y){
        this.posX = x;
        this.posY = y;
    }

    getPos(){
        return {
            x: this.getPosX(),
            y: this.getPosY()
        }
    }

    getPosX(){
        return this.posX;
    }

    getPosY(){
        return this.posY;
    }

    setHighlight(highlight){
        this.highlight = highlight;
    }

    isPointInside(x, y){}; //abstract method

}