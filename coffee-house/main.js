const menuBtn = document.querySelector('.hamburger');
const mobileMenu = document.querySelector('.burger__menu__list');
const mobileMenuItems = document.querySelectorAll('.burger__menu__list-item');
const hamburgerLines = document.querySelectorAll('.hamburger__line');

const closeMobileMenu = () => {
    mobileMenu.classList.remove('menu_open');
    hamburgerLines[0].classList.remove('hamburger__line-one-active');
    hamburgerLines[1].classList.remove('hamburger__line-two-active');
    menuBtn.classList.remove('hamburger_open');
    document.body.classList.remove('scroll-lock');
}

menuBtn.addEventListener('click', () => {
    mobileMenu.classList.toggle('menu_open');
    hamburgerLines[0].classList.toggle('hamburger__line-one-active');
    hamburgerLines[1].classList.toggle('hamburger__line-two-active');
    menuBtn.classList.toggle('hamburger_open');
    document.body.classList.toggle('scroll-lock');
})

mobileMenuItems.forEach(element => {
    element.addEventListener('click', () => {
        closeMobileMenu();
    })
});

document.addEventListener('keydown', (event) => {
    if (event.key === 'Escape' && mobileMenu.classList.contains('menu_open')) {
        closeMobileMenu();
    }
});

//slider
const sliderInterval = 5000;
const sliderItems = document.querySelector('.slider');
let currentClass = '';
const leftArrow = document.querySelector('.favorite__slider-left-arrow');
const rightArrow = document.querySelector('.favorite__slider-right-arrow');

//slider controls
const sliderControls = document.querySelectorAll('.favorite__slider-controls-item');

const changeControls = (id) =>{
    sliderControls.forEach(element => {
        element.classList.remove('favorite__slider-controls-item-active');
     });

    sliderControls[id].classList.toggle('favorite__slider-controls-item-active');
}

function changeSlideForward() {
    if (currentClass === '') {
        currentClass = 'slider-two';
        changeControls(1);
    } else if (currentClass === 'slider-two') {
        sliderItems.classList.remove('slider-two');
        currentClass = 'slider-three';
        changeControls(2);
    } else {
        sliderItems.classList.remove('slider-three');
        currentClass = '';
        changeControls(0);
    }

    if(currentClass !== '') sliderItems.classList.add(currentClass);
}

function changeSlideBack() {
    if (currentClass === '') {
        currentClass = 'slider-three';
        changeControls(2);
    } else if (currentClass === 'slider-three') {
        sliderItems.classList.remove('slider-three');
        currentClass = 'slider-two';
        changeControls(1);
    } else {
        sliderItems.classList.remove('slider-two');
        currentClass = '';
        changeControls(0);
    }
    sliderItems.classList.add(currentClass);
}

//start
//changeControls(0);
setTimeout(() => {
    changeControls(0);
}, 10);

let intervalId = setInterval(changeSlideForward, sliderInterval);

leftArrow.addEventListener('click', () => {
    changeSlideBack();
    clearInterval(intervalId);
    intervalId = setInterval(changeSlideForward, sliderInterval);
})

rightArrow.addEventListener('click', () => {
    changeSlideForward();
    clearInterval(intervalId);
    intervalId = setInterval(changeSlideForward, sliderInterval);
})


