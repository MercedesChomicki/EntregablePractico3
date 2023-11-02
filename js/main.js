// NAV
let btnMenu = document.getElementById('btn-menu');
btnMenu.addEventListener('click', ()=>{
    document.getElementById('dropdown-content-menu').classList.toggle("show");
})

let btnAvatar = document.getElementById('btn-avatar');
btnAvatar.addEventListener('click', ()=>{
    document.getElementById('dropdown-content-avatar').classList.toggle("show");
})