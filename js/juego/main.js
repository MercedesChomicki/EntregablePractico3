let canvas = document.getElementById("canvas");
CanvasRenderingContext2D;
let ctx = canvas.getContext("2d"); 
let canvasWidth = canvas.width;
let canvasHeight = canvas.height;

const MARGIN_LEFT_CANVAS = 80,
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
// let fillRect = ctx.fillRect(10, 0, canvasWidth, canvasHeight);
let fillRect = ctx.fillRect(0, 0, canvasWidth, canvasHeight);
    
function drawGame(){

    let filas = 6, //suponiendo que el usuario haya elegido "4 en linea"
        cols = 7;

    let juego = new Juego(img1, img2, imgBoard, filas, cols, ctx, canvasWidth, canvasHeight);

    juego.drawGame();

    function onMouseDown(e){
        juego.onMouseDown(e);
    }

    function onMouseUp(e){
        juego.onMouseUp(e);
    }

    function onMouseMove(e){
        juego.onMouseMove(e);
    }

    function onClick(e){
        juego.onClick(e);
    }

    function onDblClick(e){
        juego.onDblClick(e);
    }

    // setTimeout(()=>{
    //     drawGame();
    // }, 333);

    canvas.addEventListener('mousedown', onMouseDown, false);
    canvas.addEventListener('mouseup', onMouseUp, false);
    canvas.addEventListener('mousemove', onMouseMove, false);
    canvas.addEventListener('click', onClick, false);
    canvas.addEventListener('dblclick', onDblClick, false);

}

// TIMER
//CUANDO HAGA CLICK EN COMENZAR A JUGAR
document.getElementById("btnStart").addEventListener('click', ()=>{
    document.getElementById("container-popup3").style.display = "none";
    // Llamar a la función para iniciar el temporizador
    drawGame();
    startTimer();
})

//VOLVER A INTENTARLO
document.getElementById("btnRestart").addEventListener('click', ()=>{
    document.getElementById("container-popup4").style.display = "none";
    //ARREGLAR ERROR SI TERMINA EL TIEMPO CUANDO UNA FICHA ESTA EN MOVIMIENTO 
    drawGame();
    startTimer();
})

function startTimer() {

    let minutes = 1;
    let seconds = 30;

    function updateTimer() {
        if (seconds > 0) {
        seconds--;
        } else if (minutes > 0) {
        minutes--;
        seconds = 59;
        } else {
        // Cuando el temporizador llega a 0, realiza alguna acción o muestra un mensaje.
        console.log('¡Temporizador finalizado!');
        document.getElementById("container-popup4").style.display = "flex";
        clearInterval(timer);
        }

        // Formatea los minutos y segundos para que siempre tengan dos dígitos
        const formattedMinutes = minutes.toString().padStart(2, '0');
        const formattedSeconds = seconds.toString().padStart(2, '0');

        // Muestra el tiempo restante en la consola o en tu página web
        console.log(`${formattedMinutes}:${formattedSeconds}`);
        document.getElementById('timer').textContent = `${formattedMinutes}:${formattedSeconds}`;
    }

    // Iniciar el temporizador y actualizar cada segundo (1000 ms)
    const timer = setInterval(updateTimer, 1000);
}