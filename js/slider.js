'use strict';
import img from './img.js';

const sliderWrapper = document.querySelector('.wrapper');
const previousBtn = document.querySelector('.previous');
const nextBtn = document.querySelector('.next');
const dotContainer = document.querySelector('.dot-wrapper');
const imageNumber = Object.keys(img).length;
const resizeBtn = document.querySelector('.setHeihgtBtn');

/* <div class="mySlides fade">
  <div class="numbertext">1 / 3</div>
  <img src="img_nature_wide.jpg" style="width:100%">
  <div class="text">Caption Text</div>
</div> */
// Létrehozom a képnek a div-et(beleteszem a képet), a hozzárendelt class-ot, és a comment sort
const getImg = (id, title, src, comment) => {
    const div= document.createElement('div');
    div.className = 'slide'
    div.innerHTML = `
        <div class="imgNumbers">${id}/${imageNumber}</div>
        <img class="img-slide" src="${src}" alt="${title}">
        <div class="comment">${comment}</div>`;
        sliderWrapper.appendChild(div);
        return sliderWrapper;
};
//Meghívom a getImg függvényt minden i-re
for (let i=0; i<imageNumber; i++) {
    getImg(img[i].id, img[i].title, img[i].src, img[i].comment);
};
// Alsó pontok létrehozása
const getDots = () => {
    let elements = '';
    for (let i = 0; i < imageNumber; i++) {
        elements += '<span class="dot"></span>';
    };
    dotContainer.innerHTML = elements;
    dotContainer.style.display = 'block';
    return dotContainer;
};
// Meghívom a getDots() függvényt 
getDots();

const slides = document.querySelectorAll('.slide');
const dots = document.querySelectorAll('.dot');
let indexOfSlide = 0;

const showImg = (index) => {
    slides.forEach((slide) => {
        slide.style.display= 'none';
            dots.forEach((dot) => {
            dot.classList.remove('active');
        })
    });
    slides[index].style.display = 'block';
    dots[index].classList.add('active');
}
showImg(indexOfSlide);

//Elkészítem a gombokhoz a függvényeket
const nextSlide = () => {
    indexOfSlide >= imageNumber-1 ? indexOfSlide = 0 : indexOfSlide++;
    showImg(indexOfSlide);
}
const prewiousSlide = () => {
    indexOfSlide <= 0 ? indexOfSlide = imageNumber-1 : indexOfSlide--;
    showImg(indexOfSlide);
}
//Hozzárendelem a gombokhoz a függvényeket
nextBtn.addEventListener('click', nextSlide);
previousBtn.addEventListener('click', prewiousSlide);

// Időzítő létrehozása
setInterval(() => {
    nextSlide();
}, 7000);

dots.forEach((dot, index) => {
    dot.addEventListener('click', () => {
        showImg(index);
    })
});
const images = document.querySelectorAll('.img-slide');


// Slider magasság beállító függbény
const resizeSlider = (height) => {
    sliderWrapper.style.height = height + 'px';
    images.forEach(image => image.style.height = height + 'px');
};
// Alapértelmezett magasság
resizeSlider(400);

// Magasság kiolvasása és clickre a resizeSlider meghívása
const myFunction =() => {
    let x = document.querySelector('.inputHeight').value;
    document.querySelector('.demo').textContent = `A Slider aktuális magassága ${x}px!`;
    resizeSlider(x);
}
resizeBtn.addEventListener('click', myFunction);