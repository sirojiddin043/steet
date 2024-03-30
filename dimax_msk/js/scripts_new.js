function testWebP(callback) {

    var webP = new Image();
    webP.onload = webP.onerror = function () {
        callback(webP.height == 2);
    };
    webP.src = "data:image/webp;base64,UklGRjoAAABXRUJQVlA4IC4AAACyAgCdASoCAAIALmk0mk0iIiIiIgBoSygABc6WWgAA/veff/0PP8bA//LwYAAA";
}

testWebP(function (support) {

    if (support == true) {
        document.querySelector('body').classList.add('webp');
    } else {
        document.querySelector('body').classList.add('no-webp');
    }
});

const mainImg = document.querySelector('.main__img');
const mainLeft = document.querySelector('.main__left');
const mainFormTitle = document.querySelector('.main__form_title');
const mainRight = document.querySelector('.main__right');
const mainBenefits = document.querySelector('.main__benefits');

mobileContentMain();

window.addEventListener('resize', mobileContentMain);

function mobileContentMain () {
    if (window.innerWidth <= 992) {
        mainLeft.insertBefore(mainImg, mainFormTitle);
    } else {
        mainRight.insertBefore(mainImg, mainBenefits);
    }
}



const headerMenu = document.querySelector('.header__menu');
const headerContent = document.querySelector('.header__content');
const headerMiddle = document.querySelector('.header__middle');
const headerBurger = document.querySelector('.header__burger');

adaptiveMoveMenu();

window.addEventListener('resize', adaptiveMoveMenu);

function adaptiveMoveMenu () {
    if (window.innerWidth > 992 && window.innerWidth < 1171 ) {
        headerContent.append(headerMenu);
    } else {
        headerMiddle.append(headerMenu);
    }
}

headerBurger.addEventListener('click', () => {
    headerBurger.classList.toggle('burger-open');
    headerMiddle.classList.toggle('open-menu');
});