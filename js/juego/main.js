let canvas = document.getElementById("canvas");
CanvasRenderingContext2D;
let ctx = canvas.getContext("2d"); 
let canvasWidth = canvas.width;
let canvasHeight = canvas.height;

const MARGIN_LEFT_CANVAS = 80,
      MARGIN_TOP_CANVAS = 50,
      PLAYER_1 = 1,
      PLAYER_2 = 2;


let imgBoard = new Image();
imgBoard.src = 'images/juego/fondo.jpg';

ctx.fillStyle = "black";
let fillRect = ctx.fillRect(0, 0, canvasWidth, canvasHeight);

// VALORES DEFAULT
let filas = 6, 
    cols = 7;

let img1 = new Image();
img1.src = 'images/juego/gato.png';

let img2 = new Image();
img2.src = 'images/juego/burro.png';

// BOTONES NEXT
let next = document.querySelectorAll(".btn-siguiente");
next.forEach(n =>{
    n.style.textDecoration = 'none';
    n.style.color = 'var(--primary-l2)';
})

function unlockBtn(){
    next.forEach(n =>{
        n.style.color = 'var(--white)';
        n.style.cursor = "pointer";
    })
}

// EL USUARIO INGRESA SU NOMBRE
let inputName = document.getElementById("name");
let userName = null;
let next1 = document.getElementById("btn-siguiente1");

// Agregar un event listener al campo de entrada
inputName.addEventListener("input", function() {
  if (inputName.value.trim() !== "") {
    userName = inputName.value;
    console.log(userName.toUpperCase()); //transforma el texto a mayuscula

    unlockBtn();
      
    // Si el campo de entrada está completo, habilitar el botón
    next1.addEventListener('click', ()=>{
        document.getElementById("container-popup1").style.display = "none";
        document.getElementById("container-popup2").style.display = "flex";
    })
  } 
});

// EL USUARIO SELECCIONA UNA OPCION DE TABLERO
let board_option = null;

function selectedOption(id) {
    board_option = parseInt(id);
    if(board_option === 5){
        filas = 7; cols = 8;
    } else if(board_option === 6){
        filas = 8; cols = 9;
    } else if(board_option === 7){
        filas = 9; cols = 10;
    }
}

let opcion4 = document.getElementById("4")
opcion4.addEventListener("click", ()=>{
  selectedOption("4");
  opcion4.style.backgroundColor = "var(--secondary-l1)";
  opcion5.style.backgroundColor = "var(--secondary)";
  opcion6.style.backgroundColor = "var(--secondary)";
  opcion7.style.backgroundColor = "var(--secondary)";
  unlockBtn();
});

let opcion5 = document.getElementById("5")
opcion5.addEventListener("click", ()=>{
  selectedOption("5");
  opcion4.style.backgroundColor = "var(--secondary)";
  opcion5.style.backgroundColor = "var(--secondary-l1)";
  opcion6.style.backgroundColor = "var(--secondary)";
  opcion7.style.backgroundColor = "var(--secondary)";
  unlockBtn();
});

let opcion6 = document.getElementById("6")
opcion6.addEventListener("click", ()=>{
  selectedOption("6");
  opcion4.style.backgroundColor = "var(--secondary)";
  opcion5.style.backgroundColor = "var(--secondary)";
  opcion6.style.backgroundColor = "var(--secondary-l1)";
  opcion7.style.backgroundColor = "var(--secondary)";
  unlockBtn();
});

let opcion7 = document.getElementById("7")
opcion7.addEventListener("click", ()=>{
  selectedOption("7");
  opcion4.style.backgroundColor = "var(--secondary)";
  opcion5.style.backgroundColor = "var(--secondary)";
  opcion6.style.backgroundColor = "var(--secondary)";
  opcion7.style.backgroundColor = "var(--secondary-l1)";
  unlockBtn();
});

let previous2 = document.getElementById("btn-anterior2");
previous2.addEventListener('click', ()=>{
    document.getElementById("container-popup2").style.display = "none";
    document.getElementById("container-popup1").style.display = "flex";
})

let next2 = document.getElementById("btn-siguiente2");
next2.addEventListener("click", ()=>{
    if (board_option) {
        document.getElementById("container-popup2").style.display = "none";
        document.getElementById("container-popup3").style.display = "flex";
    } 
});

// EL USUARIO SELECCIONA EL PERSONAJE CON EL QUE QUIERE JUGAR

let fig_option = null;

function selected(option) {
    fig_option = option;
    if(fig_option === "gato"){
        console.log("gato");
        img1.src = 'images/juego/gato.png';
        img2.src = 'images/juego/burro.png';
    } else if(fig_option === "burro"){
        console.log("burro");
        img1.src = 'images/juego/burro.png';
        img2.src = 'images/juego/gato.png';
    } 
}

let gato = document.getElementById("gato")
gato.addEventListener("click", ()=>{
    selected("gato");
    gato.style.backgroundColor = "var(--primary-l2)";
    burro.style.backgroundColor = "var(--white)";
    unlockBtn();
});

let burro = document.getElementById("burro")
burro.addEventListener("click", ()=>{
    selected("burro");
    gato.style.backgroundColor = "var(--white)";
    burro.style.backgroundColor = "var(--primary-l2)";
    unlockBtn();
});

let previous3 = document.getElementById("btn-anterior3");
previous3.addEventListener('click', ()=>{
    document.getElementById("container-popup3").style.display = "none";
    document.getElementById("container-popup2").style.display = "flex";
})

let next3 = document.getElementById("btn-siguiente3");
next3.addEventListener("click", ()=>{
    if (fig_option) {
        document.getElementById("container-popup3").style.display = "none";
        document.getElementById("container-popup4").style.display = "flex";
    } 
});

//CUANDO HAGA CLICK EN COMENZAR A JUGAR
document.getElementById("btnStart").addEventListener('click', ()=>{
    document.getElementById("container-popup4").style.display = "none";
    document.getElementById("container-timer").style.display = "flex";
    // Llamar a la función para iniciar el temporizador
    drawGame();
    startTimer();
})

let previous4 = document.getElementById("btn-anterior4");
previous4.addEventListener('click', ()=>{
    document.getElementById("container-popup4").style.display = "none";
    document.getElementById("container-popup3").style.display = "flex";
})

//VOLVER A INTENTARLO
document.getElementById("btnRestart").addEventListener('click', ()=>{
    document.getElementById("container-popup5").style.display = "none";
    //ARREGLAR ERROR SI TERMINA EL TIEMPO CUANDO UNA FICHA ESTA EN MOVIMIENTO 
    drawGame();
    startTimer();
})

document.getElementById("btnRestart2").addEventListener('click', ()=>{
    document.getElementById("container-popup6").style.display = "none";
    document.getElementById("container-timer").style.display = "flex";
    drawGame();
    startTimer();
})

document.getElementById("btnRestart3").addEventListener('click', ()=>{
    document.getElementById("container-popup7").style.display = "none";
    document.getElementById("container-timer").style.display = "flex";
    drawGame();
    startTimer();
})

// TIMER
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
        document.getElementById("container-popup5").style.display = "flex";
        clearInterval(timer);
        }

        // Formatea los minutos y segundos para que siempre tengan dos dígitos
        const formattedMinutes = minutes.toString().padStart(2, '0');
        const formattedSeconds = seconds.toString().padStart(2, '0');

        // Muestra el tiempo restante en la página web
        document.getElementById('timer').textContent = `${formattedMinutes}:${formattedSeconds}`;
    }

    // Iniciar el temporizador y actualizar cada segundo (1000 ms)
    const timer = setInterval(updateTimer, 1000);
}

function drawGame(){

    let juego = new Juego(img1, img2, imgBoard, filas, cols, ctx, canvasWidth, canvasHeight, userName);

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

    canvas.addEventListener('mousedown', onMouseDown, false);
    canvas.addEventListener('mouseup', onMouseUp, false);
    canvas.addEventListener('mousemove', onMouseMove, false);
    canvas.addEventListener('click', onClick, false);
    canvas.addEventListener('dblclick', onDblClick, false);

}