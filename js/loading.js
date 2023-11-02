"use strict"


// LOADING

window.addEventListener('load', ()=>{
    setTimeout(function () {
        document.getElementById('body-page-loading').style.display = "none";
        document.getElementById('body-page-loaded').style.display = "block";
    }, 5000);
})

let percent = document.querySelector('.percent');
let text = document.querySelector('.text');

let count = 5;
let loading = setInterval(animate, 50);
function animate() {
    if(count == 100){
        clearInterval(loading);
        text.textContent = "Completed";
        text.style.color = "var(--green)";
    } else{
        count = count + 1;
        percent.textContent = count + '%'; 
    }
}
