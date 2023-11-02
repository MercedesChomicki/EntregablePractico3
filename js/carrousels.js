"use strict"

// CARROUSELS-CARDS HOME

// carrousel 1

const gap = 5;

const carrousel1 = document.getElementById("carrousel-1"),
  content1 = document.getElementById("track-1"),
  item = document.getElementById("card"),
  next1 = document.getElementById("next-1"),
  prev1 = document.getElementById("prev-1");

next1.addEventListener("click", (e) => {
  carrousel1.scrollBy(widthItem + gap, 0);
  if (carrousel1.scrollWidth !== 0) {
    prev1.style.display = "flex";
  }
  if (content1.scrollWidth - widthItem - gap <= carrousel1.scrollLeft + widthCarrousel) {
    next1.style.display = "none";
  }
});
prev1.addEventListener("click", e => {
  carrousel1.scrollBy(-(widthItem + gap), 0);
  if (carrousel1.scrollLeft - widthItem - gap <= 0) {
    prev1.style.display = "none";
  }
  if (!content1.scrollWidth - widthItem - gap <= carrousel1.scrollLeft + widthItem) {
    next1.style.display = "flex";
  }
});

let widthItem = item.offsetWidth;
let widthCarrousel = carrousel1.offsetWidth;
window.addEventListener("resize", e => (widthItem = item.offsetWidth, widthCarrousel = carrousel1.offsetWidth));
console.log(widthItem, widthCarrousel);

// carrousel 2

const carrousel2 = document.getElementById("carrousel-2"),
  content2 = document.getElementById("track-2"),
  next2 = document.getElementById("next-2"),
  prev2 = document.getElementById("prev-2");

next2.addEventListener("click", (e) => {
  carrousel2.scrollBy(widthItem + gap, 0);
  if (carrousel2.scrollWidth !== 0) {
    prev2.style.display = "flex";
  }
  if (content2.scrollWidth - widthItem - gap <= carrousel2.scrollLeft + widthCarrousel) {
    next2.style.display = "none";
  }
});
prev2.addEventListener("click", e => {
  carrousel2.scrollBy(-(widthItem + gap), 0);
  if (carrousel2.scrollLeft - widthItem - gap <= 0) {
    prev2.style.display = "none";
  }
  if (!content2.scrollWidth - widthItem - gap <= carrousel2.scrollLeft + widthItem) {
    next2.style.display = "flex";
  }
});

// CARDS

const cards = document.querySelectorAll('.card');

cards.forEach((card)=>{
    const height = card.clientHeight
    const width = card.clientWidth

    card.addEventListener('mousemove', (e)=>{
        const {layerX, layerY} = e
    
        const yRotation = (
            (layerX - width / 2) / width
        ) * 20
    
        const xRotation = (
            (layerY - height / 2) / height
        ) * 20
    
        const string = `
            perspective(500px)
            scale(1.1)
            rotateX(${xRotation}deg)
            rotateY(${yRotation}deg)`
        
        card.style.transform = string
    })
    
    card.addEventListener('mouseout', ()=>{
        card.style.transform = `
        perspective(500px)
        scale(1)
        rotateX(0)
        rotateY(0)`
    })
})

// IMG CARDS

const images = document.querySelectorAll('.img');
images.forEach((img)=>{

    img.addEventListener('mousemove', ()=>{
        img.previousElementSibling.style.display="block";

    })
    const cardsHover = document.querySelectorAll('.card-hover');
    cardsHover.forEach((cardHover)=>{
        cardHover.addEventListener('mouseout', ()=>{
            img.previousElementSibling.style.display="none";
        })
    })
})


// Carrousel de destacados - Home

let swiper = new Swiper(".swiper", {
    effect: "coverflow",
    grabCursor: true,
    centeredSlices: true,
    slicesPerView: "auto",
    loop: true,
    coverflowEffect: {
        depth: 300,
        modifier: 1,
        rotate: 0,
        slideShadows: true,
        stretch: 200
    },
    navigation: {                       
        nextEl: ".icon-next", 
        prevEl: ".icon-prev",
    },
})