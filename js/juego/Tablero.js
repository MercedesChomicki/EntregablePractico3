class Tablero{
    constructor(img, filas, cols, ctx, canvasW){
        this.img = img;
        this.filas = filas;
        this.cols = cols;
        this.ctx = ctx;
        this.wT = 525;
        this.hT = 450;
        this.padding = 10;
        this.canvasW = canvasW;
        this.posX_inicial = (this.canvasW - this.wT)/2; //337.5
        this.posX_final = this.posX_inicial + this.wT;
        this.posY_inicial = 115;
        this.posY_final= this.posY_inicial + this.hT;
        this.lado = this.wT/this.cols;
        this.radius = (this.lado - this.padding) / 2;
        this.board = new Array();
        this.aux = new Array();
    }

    //HACER UNA COPIA DE LA MATRIZ 

    initializeBoard() {
        for (let col = 0; col < this.cols; col++) {
            this.board[col] = new Array();
            for (let row = 0; row < this.filas; row++) {
                let posX = (col * this.lado) + this.posX_inicial;
                let posY = (row * this.lado) + this.posY_inicial;
                
                this.board[col][row] = {
                    x: posX,
                    y: posY,
                    busy: 0 
                }
                // Cambiar busy a taken (ocupado de lugar)
                this.drawBoard(posX, posY);
            }
        }
    }  

    drawBoard(posX, posY){
        new Rect(posX, posY, this.lado, this.lado, this.ctx, this.img, this.padding, this.radius).draw();
    }

    setValuesBusy(){
        for (let col = 0; col < this.cols; col++) {
            for (let row = 0; row < this.filas; row++) {
                this.board[col][row].busy = this.aux[col][row];
            }
        }
    }

    createAux(){
        for (let col = 0; col < this.cols; col++) {
            this.aux[col] = new Array();
            for (let row = 0; row < this.filas; row++) {
                this.aux[col][row] = this.board[col][row].busy
            }
        }
    }

    setAuxPos(col, row){
        this.aux[col][row] = 1;
    }

    getAux(col, row){
        return this.aux[col][row];
    }

    getPosX(col, row){
        return this.board[col][row].x;
    }

    getPosY(col, row){
        return this.board[col][row].y;
    }    
    
    ocuppy(col, row){
        this.setAuxPos(col, row);
        this.board[col][row].busy = 1; //si tiró el jugador 1
    }
    
    isBusy(col, row){
        if(this.board[col][row].busy === 0){
            return 0; // ESTA LIBRE
        } else if(this.board[col][row].busy === 1){
            return 1; //JUGADOR 1
        } else {
            return 2; //JUGADOR 2
        } 
    }

    isOnTheBoard(x, y){
        if(x > this.posX_inicial && x < this.posX_final && y < this.posY_inicial){
            return true;
        } else {
            return false;
        }
    }

    isInsideTheBoard(x, y){
        if(x > this.posX_inicial && x < this.posX_final && y > this.posY_inicial){
            return true;
        } else {
            return false;
        }
    }

    
    

//     posEnYDeMatriz(col, row){
//         return this.matrizPosY[col][row];
//     }

//     // isFree(row, col){
//     //     if(this.matriz[row][col] === 0){
//     //         return true;
//     //     }else{
//     //         return false;
//     //     }
//     // }


    getRadius(){
        return this.radius;
    }

    getPosXInicial(){
        return this.posX_inicial;
    }

    getPosXFinal(){
        return this.posX_final;
    }

    getPosYInicial(){
        return this.posY_inicial;
    }

    getPosYFinal(){
        return this.posY_final;
    }

    getLado(){
        return this.lado;
    }

    getPadding(){
        return this.padding;
    }

    getSquares(){
        return new Array(this.squares);
    }

}