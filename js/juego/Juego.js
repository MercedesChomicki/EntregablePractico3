class Juego{
    constructor(img1, img2, imgF, filas, cols, canvasWidth, canvasHeight, ctx){
        this.img1 = img1;
        this.img2 = img2;
        this.imgF = imgF;
        this.filas = filas;
        this.cols = cols;
        this.lastClickedFigure = null;
        this.isMouseDown = false;
        this.canvasWidth = canvasWidth;
        this.canvasHeight = canvasHeight;
        this.posYfigure1 = canvasHeight - 50; 
        this.posYfigure2 = canvasHeight - 50; 
        this.cantFig = (filas * cols)-1;
        this.ctx = ctx;
        this.tablero = new Tablero(this.imgF, this.filas, this.cols, this.ctx, this.canvasWidth);
        this.figures = new Array();
        this.radius = this.getRadius();
        this.padding = this.tablero.getPadding();
        this.xInicial = this.tablero.getPosXInicial();
        this.xFinal = this.tablero.getPosXFinal();
        this.yInicial = this.tablero.getPosYInicial();
        this.yFinal = this.tablero.getPosYFinal() - this.radius - (this.padding/2);
        this.lado = this.tablero.getLado();
        this.currentPlayer = PLAYER_1;

        //creamos variables donde vamos a guardar las pos de la ficha clickeada
        this.mouseX = 0; 
        this.mouseY = 0;
    }

    drawGame(){
        this.tablero.initializeBoard();
        this.tablero.createAux();
        this.addFigures();
    }

    addFigure(){
        this.addFigureJ1();
        this.addFigureJ2();
        this.drawFigure();
    }
    
    drawFigure(){
        this.clearCanvas();
        this.tablero.initializeBoard();
        this.tablero.setValuesBusy();
        for(let i = 0; i < this.figures.length; i++){
            this.figures[i].draw();
        }
    }

    addFigureJ1(){
        let posX =  this.canvasWidth/8;
        let posY =  this.posYfigure1;
       
        let circle1 = new Circle(posX, posY, this.radius, this.ctx, this.img1);    
        this.figures.push(circle1);
        this.posYfigure1 -= 20; 
    }

    addFigureJ2(){
        let posX =  this.canvasWidth - (this.canvasWidth/8);
        let posY =  this.posYfigure2;
    
        let circle2 = new Circle(posX, posY, this.radius, this.ctx, this.img2);    
        this.figures.push(circle2);
        this.posYfigure2 -= 20; 
    }

    addFigures() {
        this.addFigure();
        if(this.figures.length < this.cantFig){
            setTimeout(this.addFigures(), 200);
        }
    }

    tirar(fig){ 
       
        let col = 0;
        let inicio = this.xInicial;
       
        // Mientras que la posicion inicial del tablero sea menor que la final 
        // y col sea menor al total de columnas: 
        while(inicio < this.xFinal && col < this.cols){ 
            // Si la figura se encuentra dentro del cuadrado x
            // if(fig.posX > this.xInicial && fig.posX < (this.xInicial + this.lado)){
            if(fig.posX > inicio && fig.posX < (inicio + this.lado)){
                // Centramos la figura en el centro de la col 
                let x = inicio + this.radius + (this.padding/2);
                // Recorremos las filas de la columna col
                for(let row = 0; row < this.filas; row++){
                    // Obtener la posicion del tablero en (x: col, y:row)
                    let y = this.tablero.getPosY(col, row) + this.radius + (this.padding/2);
                    if(this.tablero.isBusy(col, row) !== 0){
                        // En el caso de que la columna esté llena
                        if(row === 0){
                            this.returnFigPosI(fig);
                            return;
                        } 
                        else{
                            // Como encontramos un casillero ocupado, ponemos la ficha en el anterior (misma columna)
                            y -= this.lado;
                            this.drawFigInCell(x, y);
                            // Ocupar pos(col, row) del tablero (luego le vamos a tener que pasar por parametro tambien el jugador(1 o 2))
                            this.tablero.ocuppy(col, row - 1 );
                            return;
                        }
                    }
                    else{
                        // Si todos los casilleros están libre, ocupar el primero de abajo
                        if(row === (this.filas - 1)){
                            this.drawFigInCell(x, y);
                            this.tablero.ocuppy(col, row);
                            return;
                        }
                    }
                }
            }
            inicio += this.lado;
            col++;
        }
    }
    
    onMouseDown(e){
        let fig = this.findClickedFigure(e.layerX, e.layerY);
       
        //guardamos la posX e Y en variables
        let mouseX = fig.posX;
        let mouseY = fig.posY;

        //cambiamos la pos inicial en x e y de mouseX y mouseY para guardarla
        this.setPosInicialX(mouseX); 
        this.setPosInicialY(mouseY);
        
        // if(this.tablero.isInsideTheBoard(fig.posX, fig.posY)){
        //     //SI LA FICHA SE ENCUENTRA DENTRO DE ESAS POSICIONES, BLOQUEARLA
        // }
        this.isMouseDown = true;
        if(this.lastClickedFigure != null){
            this.lastClickedFigure.setHighlight(false);
            this.lastClickedFigure = null;
        }
        if(fig != null){
            fig.setHighlight(true);
            this.lastClickedFigure = fig;
        }
        this.drawFigure();
    }

    onMouseUp(e){
        this.isMouseDown = false;
        let fig = this.findClickedFigure(e.layerX, e.layerY);

        if(this.tablero.isOnTheBoard(fig.posX, fig.posY)){
            this.tirar(fig);
            //bloquear figura
        } else{
            //LA FIGURA VUELVE A LA POS INICIAL
            this.returnFigPosI(fig);
        }
    }

    onMouseMove(e){
        if(this.isMouseDown && this.lastClickedFigure != null){
            this.lastClickedFigure.setPos(e.layerX - MARGIN_LEFT_CANVAS, e.layerY - MARGIN_TOP_CANVAS);
            this.drawFigure();
        }
    }

    drawFigInCell(x, y){
        this.lastClickedFigure.setPos(x, y);
        this.isMouseDown = false;
        this.drawFigure();
    }

    returnFigPosI(fig){
        let x = this.getPosInicialX();
        let y = this.getPosInicialY();
        this.lastClickedFigure.setPos(x, y);
        fig.setHighlight(false);
        this.isMouseDown = false;
        this.drawFigure();
    }

    clearCanvas(){
        ctx.fillStyle = 'black';
        ctx.fillRect(0, 0, canvasWidth, canvasHeight);
    }

    findClickedFigure(x, y){
        for(let i = 0; i < this.figures.length; i++){
            let element = this.figures[i];
            if(element.isPointInside(x, y)){
                return element;
            }
        }
    }

    getRadius(){
        return this.tablero.getRadius();
    }
    
    getPosInicialX(){
        return this.mouseX;
    }
    getPosInicialY(){
        return this.mouseY;
    }

    setPosInicialX(mouseX){
        this.mouseX = mouseX;
    }
    setPosInicialY(mouseY){
        this.mouseY = mouseY;
    }
    
 
}