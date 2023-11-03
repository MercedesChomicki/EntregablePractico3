class Juego{
    constructor(img1, img2, imgF, filas, cols, ctx, canvasWidth, canvasHeight){
        this.img1 = img1;
        this.img2 = img2;
        this.imgF = imgF;
        this.filas = filas;
        this.cols = cols;
        this.canvasWidth = canvasWidth;
        this.canvasHeight = canvasHeight;
        this.lastClickedFigure = null;
        this.isMouseDown = false;
        this.figuresInside = new Array();
        this.posYfigure1 = this.canvasHeight - 50; 
        this.posYfigure2 = this.canvasHeight - 50; 
        this.cantFig = (filas * cols)-1;
        this.ctx = ctx;
        this.tablero = new Tablero(this.imgF, this.filas, this.cols, this.ctx, this.canvasWidth);
        this.figures = new Array();
        this.radius = this.getRadius();
        this.padding = this.tablero.getPadding();
        this.lado = this.tablero.getLado();
        this.previousPlayer = 0;
        this.currentPlayer = PLAYER_1;

        //creamos variables donde vamos a guardar las pos iniciales de la ficha clickeada
        this.posInicialX = 0; 
        this.posInicialY = 0;
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
        let inicio = this.tablero.getPosXInicial(); //pos inicial en x del tablero
        let fin = this.tablero.getPosXFinal(); //pos final en x del tablero
       
        // Mientras que la posicion inicial del tablero sea menor que la final 
        // y col sea menor al total de columnas: 
        while(inicio < fin && col < this.cols){ 
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

                            // Dibujo la fig en la celda correspondiente 
                            this.drawFigInCell(x, y, fig);

                            // Ocupar pos(col, row) del tablero. Le pasamos el jugador anterior porque el actual ya pasa a ser el del otro equipo
                            this.tablero.ocuppy(col, row - 1, this.previousPlayer);
                         
                            //Ckequea si al tirar la ficha, el jugador ganó
                            if(this.tablero.checkForWin(col, row - 1)){
                                console.log("Gano el jugador "+this.previousPlayer);
                                 //TERMINAR EL JUEGO
                            }
                            return;
                        }
                    }
                    else{
                        // Si todos los casilleros están libres, ocupar el primero de abajo
                        if(row === (this.filas - 1)){
                            this.drawFigInCell(x, y, fig);
                            this.tablero.ocuppy(col, row, this.previousPlayer);

                            //Ckequea si al tirar la ficha, el jugador ganó
                            if(this.tablero.checkForWin(col, row)){
                                console.log("Gano el jugador "+this.previousPlayer);
                                //TERMINAR EL JUEGO
                            }
                            return;
                        }
                    }
                }
            }
            inicio += this.lado;
            col++;
        }
    }

    drawFigInCell(x, y, fig){
        this.lastClickedFigure.setPos(x, y);
        fig.setHighlight(false);
        this.isMouseDown = false;
        this.drawFigure();
    }

    play(fig){

        //El jugador está apto para mover la ficha
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
    
    onMouseDown(e){
        
        let fig = this.findClickedFigure(e.layerX, e.layerY);

        if(!this.isInside(fig)){
    
            /* Actualizamos las pos(x, y) de la ultima fig seleccionada para los casos en los que el jugador quiera soltar la ficha desde cualquier otro lugar que no sea por encima del tablero y para el caso en el que el jugador quiera agarrar una ficha que ya se encuentra en el tablero */
            let posInicialX = fig.posX;
            let posInicialY = fig.posY;
            this.setPosInicialX(posInicialX); 
            this.setPosInicialY(posInicialY);
    
            //Si es el turno del jugador 1 y la ficha está del lado izq del canvas:
            if(this.currentPlayer === 1 && fig.posX < this.canvasWidth/2){ 
                console.log("Turno del jugador 1");
                this.play(fig);
                this.previousPlayer = PLAYER_1;
                this.currentPlayer = PLAYER_2;
                // IMPLEMENTAR: si soltó la ficha en una posicion no valida (fuera del rango en x e y del tablero), darle otra oportunidad.
            }
            //Si es el turno del jugador 2 y la ficha está del lado derecho del canvas:
            else if(this.currentPlayer === 2 && fig.posX > this.canvasWidth/2){
                console.log("Turno del jugador 2");
                this.play(fig);
                this.previousPlayer = PLAYER_2;
                this.currentPlayer = PLAYER_1;
            }
        } else{
            console.log("Está dentro del tablero, no se puede mover");
        }

    } 

    onMouseUp(e){
        this.isMouseDown = false;
        let fig = this.findClickedFigure(e.layerX, e.layerY);

        if(this.tablero.isOnTheBoard(fig.posX, fig.posY)){
            this.tirar(fig);
            this.insideTheBoard(fig);
            console.log(this.getFiguresInside());
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

    onClick(e){
        let fig = this.findClickedFigure(e.layerX, e.layerY);
        if(this.isInside(fig)){
            //NO SE TIENE QUE PODER MOVER
        } 
    }

    onDblClick(e){
        let fig = this.findClickedFigure(e.layerX, e.layerY);
        if(this.isInside(fig)){
           //NO SE TIENE QUE PODER MOVER
        }
    }

    insideTheBoard(fig){
        this.figuresInside.push(fig);
    }

    isInside(fig){
        for(let i = 0; i < this.figuresInside.length; i++){
            if(fig === this.figuresInside[i]){
                return true;
            } else{
                return false;
            }
        }
    }

    getFiguresInside(){
        return new Array(this.figuresInside);
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
        ctx.fillRect(0, 0, this.canvasWidth, this.canvasHeight);
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
        return this.posInicialX;
    }
    getPosInicialY(){
        return this.posInicialY;
    }

    setPosInicialX(posInicialX){
        this.posInicialX = posInicialX;
    }
    setPosInicialY(posInicialY){
        this.posInicialY = posInicialY;
    }

}