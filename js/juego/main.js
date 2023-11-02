let canvas = document.getElementById("canvas");
CanvasRenderingContext2D;
let ctx = canvas.getContext("2d"); 

const CANVAS_WIDTH = canvas.width,
      CANVAS_HEIGHT = canvas.height,
      MARGIN_LEFT_CANVAS = 80,
      MARGIN_TOP_CANVAS = 50,
      PLAYER_1 = 1,
      PLAYER_2 = 2;

let img1 = new Image();
img1.src = 'images/juego/gato.png';

let img2 = new Image();
img2.src = 'images/juego/burro.png';

let imgBoard = new Image();
imgBoard.src = 'images/juego/fondo.jpg';

ctx.fillStyle = "black";
let fillRect = ctx.fillRect(10, 0, CANVAS_WIDTH, CANVAS_HEIGHT);

let filas = 6, //suponiendo que el usuario haya elegido "4 en linea"
    cols = 7;
    
let juego = new Juego(img1, img2, imgBoard, filas, cols, ctx);
    
    
function drawGame(){
    juego.drawGame();
}

function onMouseDown(e){
    juego.onMouseDown(e);
}

function onMouseUp(e){
    juego.onMouseUp(e);
}

function onMouseMove(e){
    juego.onMouseMove(e);
}

setTimeout(()=>{
    drawGame();
}, 333);

canvas.addEventListener('mousedown', onMouseDown, false);
canvas.addEventListener('mouseup', onMouseUp, false);
canvas.addEventListener('mousemove', onMouseMove, false);