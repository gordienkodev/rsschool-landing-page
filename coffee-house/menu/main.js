const menuBtn = document.querySelector('.hamburger');
const mobileMenu = document.querySelector('.burger__menu__list');
const mobileMenuItems = document.querySelectorAll('.burger__menu__list-item');
const hamburgerLines = document.querySelectorAll('.hamburger__line');

menuBtn.addEventListener('click', () => {
    mobileMenu.classList.toggle('menu_open');
    hamburgerLines[0].classList.toggle('hamburger__line-one-active');
    hamburgerLines[1].classList.toggle('hamburger__line-two-active');
    menuBtn.classList.toggle('hamburger_open');
})

mobileMenuItems.forEach(element => {
    element.addEventListener('click', () => {
        mobileMenu.classList.remove('menu_open');
        hamburgerLines[0].classList.remove('hamburger__line-one-active');
        hamburgerLines[1].classList.remove('hamburger__line-two-active');
        menuBtn.classList.remove('hamburger_open');
    })
});


//category
let data;
const categoryContent = document.querySelector('.category__content');

const jsonFilePath = `./products.json`;

async function loadJSON() {
    try {
        const response = await fetch(jsonFilePath);

        if (!response.ok) {
            throw new Error(`Ошибка загрузки JSON: ${response.statusText}`);
        }

        data = await response.json();
        //console.log(data);
        loadData(data, 'coffee');
    } catch (error) {
        console.error(error.message);
    }
}

loadJSON();

const loadData = (data, categoryItems) => {
    categoryContent.innerHTML = '';
    let i = 1;
    for (items of data) {
        if (items.category === categoryItems) {
            //console.log(items.name);
            const card = document.createElement('div');
            card.classList.add('category__content-item');
            const image = document.createElement('img');
            image.classList.add('category__content-item-image');
            image.src = `./images/${categoryItems}-${i}.jpg`;
            image.alt = items.name;
            i += 1;

            const cardText = document.createElement('div');
            cardText.classList.add('category__content-item-text');

            const cardTitle = document.createElement('div');
            cardTitle.classList.add('category__content-item-title');
            cardTitle.innerText = items.name;

            const cardDescription = document.createElement('div');
            cardDescription.classList.add('category__content-item-description');
            cardDescription.innerText = items.description;

            const cardPrice = document.createElement('div');
            cardPrice.classList.add('category__content-item-price');
            cardPrice.innerText = '$'+items.price;

            cardText.append(cardTitle);
            cardText.append(cardDescription);
            cardText.append(cardPrice);

            card.append(image);
            card.append(cardText);

            //console.log(card);
            categoryContent.append(card);
        }
    }
}


getCategoryItems();
//coffee
const menuCoffee = document.querySelector('.coffee');
//console.log(menuCoffee);
menuCoffee.addEventListener('click', () => {
    loadData(data, 'coffee');
    getCategoryItems();
})

//tea
const menuTea = document.querySelector('.tea');
//console.log(menuTea);
menuTea.addEventListener('click', () => {
    loadData(data, 'tea');
    getCategoryItems();
})

//dessert
const menuDessert = document.querySelector('.dessert');
//console.log(menuDessert);
menuDessert.addEventListener('click', () => {
    loadData(data, 'dessert');
    getCategoryItems();
})


//category button
const refreshButton = document.querySelector('.refresh-button');

refreshButton.addEventListener('click', () => {
    refreshButton.style.display = 'none';

    categoryContent.classList.remove('category__content-hide');
})

//popup button
const popupButton = document.querySelector('.popup__close');
const popup = document.querySelector('.popup');

popupButton.addEventListener('click', () => {
    popup.style.display = 'none';
})

//popup category items
function getCategoryItems () {
    setTimeout(() =>{
        const categoryContentItems = document.querySelectorAll('.category__content-item');
        //console.log(categoryContentItems);
        categoryContentItems.forEach(element => {
            element.addEventListener('click', (event) => {
                popup.style.display = 'block';
                //console.log('click');
                const clickedElement = event.currentTarget;
                const elementClasses = clickedElement.classList;
                console.log(clickedElement);
                console.log(elementClasses);
                //тут нужно собирать попап и наполнять его данными нужен метод по вытягиванию данных с джейсона
                console.log(data);
                const itemTitle = clickedElement.querySelector('.category__content-item-title');
                const itemImage = clickedElement.querySelector('.category__content-item-image');
                data.forEach(element => {
                    if(element.name === itemTitle.textContent){
                        console.log(element.name);
                        console.log(element.price);
                        console.log(itemImage.src);

                        //собираем попап
                        const popupСontent = document.querySelector('.popup__content');

                        const popupImageContainer = document.querySelector('.popup__image-container');
                        popupImageContainer.innerHTML = '';
                        const popupTitle = document.querySelector('.popup__title');
                        popupTitle.innerHTML = '';
                        const popupText = document.querySelector('.popup__text');
                        popupText.innerHTML = '';
                        const popupCost = document.querySelector('.popup__cost');
                        popupCost.innerHTML = '';

                        const image = document.createElement('img');
                        image.classList.add('popup__image');
                        image.src = itemImage.src;
                        image.alt = items.name;

                        const description = document.querySelector('.popup__description');

                        popupImageContainer.append(image);
                        popupTitle.textContent = element.name;
                        popupText.textContent = element.description;
                        popupCost.textContent = '$' + element.price;

                    }
                });
            })
        });
    }, 100);
};

