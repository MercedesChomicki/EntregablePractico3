class Tablero{
    constructor(img, filas, cols, ctx, canvasWidth){
        this.img = img;
        this.filas = filas;
        this.cols = cols;
        this.ctx = ctx;
        this.canvasWidth = canvasWidth;
        this.wT = 525;
        this.hT = 450;
        this.padding = 10;
        this.posX_inicial = (this.canvasWidth - this.wT)/2; //337.5
        this.posX_final = this.posX_inicial + this.wT;
        this.posY_inicial = 115; 
        this.posY_final= this.posY_inicial + this.hT;
        this.lado = this.wT/this.cols;
        this.radius = (this.lado - this.padding) / 2;
        this.board = new Array();
        this.aux = new Array();
        this.num = this.filas - 2;
    }

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

    ocuppy(col, row, player){
        this.setAuxPos(col, row, player);
        this.board[col][row].busy = player; // Va a ser 1 o 2 depende que jugador haya tirado
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
        if(x > this.posX_inicial && x < this.posX_final && y > this.posY_inicial && y < this.posY_final){
            return true;
        } else {
            return false;
        }
    }

    setAuxPos(col, row, player){
        this.aux[col][row] = player;
    }

    checkForWin(col, row) {
        if(this.checkHorizontalWin(col, row) ||
            this.checkVerticalWin(col, row) ||
            this.checkDiagonalWin1(col, row) ||
            this.checkDiagonalWin2(col, row)
        ) {
            return true;
        }
        return false;
    }
    
    checkHorizontalWin(col, row) {
        const player = this.board[col][row].busy;
        let count = 1;
    
        // Verifica hacia la izquierda
        for (let c = col - 1; c >= 0; c--) {
            if (this.board[c][row].busy === player) {
                count++;
            } else {
                break;
            }
        }
    
        // Verifica hacia la derecha
        for (let c = col + 1; c < this.cols; c++) {
            if (this.board[c][row].busy === player) {
                count++;
            } else {
                break;
            }
        }
        console.log(count);
        return count >= this.num;
    }
    
    checkVerticalWin(col, row) {
        const player = this.board[col][row].busy;
        let count = 1;
    
        // Verifica hacia arriba
        for (let r = row - 1; r >= 0; r--) {
            if (this.board[col][r].busy === player) {
                count++;
            } else {
                break;
            }
        }
    
        // Verifica hacia abajo
        for (let r = row + 1; r < this.filas; r++) {
            if (this.board[col][r].busy === player) {
                count++;
            } else {
                break;
            }
        }
        console.log(count);
        return count >= this.num;
    }
    
    checkDiagonalWin1(col, row) {
        const player = this.board[col][row].busy;
        let count = 1; 
    
        // Verifica diagonal superior izquierda
        for (let r = row - 1, c = col - 1; r >= 0 && c >= 0; r--, c--) {
            if (this.board[c][r].busy === player) {
                count++;
            } else {
                break;
            }
        }
    
        // Verifica diagonal inferior derecha
        for (let r = row + 1, c = col + 1; r < this.filas && c < this.cols; r++, c++) {
            if (this.board[c][r].busy === player) {
                count++;
            } else {
                break;
            }
        }
        console.log(count);
        return count >= this.num;
    }
    
    checkDiagonalWin2(col, row) {
        const player = this.board[col][row].busy;
        let count = 1; 
    
        // Verifica diagonal superior derecha
        for (let r = row - 1, c = col + 1; r >= 0 && c < this.cols; r--, c++) {
            if (this.board[c][r].busy === player) {
                count++;
            } else {
                break;
            }
        }
    
        // Verifica diagonal inferior izquierda
        for (let r = row + 1, c = col - 1; r < this.filas && c >= 0; r++, c--) {
            if (this.board[c][r].busy === player) {
                count++;
            } else {
                break;
            }
        }
        console.log(count);
        return count >= this.num;
    }

    getAuxPos(col, row){
        return this.aux[col][row];
    }

    getAux(){
        return new Array(this.aux);
    }

    getPosX(col, row){
        return this.board[col][row].x;
    }

    getPosY(col, row){
        return this.board[col][row].y;
    }    

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

}