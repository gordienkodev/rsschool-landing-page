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


//category
let data;
const categoryContent = document.querySelector('.category__content');
const categoryTabs = document.querySelectorAll('.main-offer__content-item-tab, .main-offer__content-item-tab-active');

const jsonFilePath = `./products.json`;

async function loadJSON() {
    try {
        const response = await fetch(jsonFilePath);

        if (!response.ok) {
            throw new Error(`Ошибка загрузки JSON: ${response.statusText}`);
        }

        data = await response.json();
        loadData(data, 'coffee');
    } catch (error) {
        console.error(error.message);
    }
}

loadJSON();

const updateActiveCategoryTab = (activeTab) => {
    categoryTabs.forEach((tab) => {
        const isActive = tab === activeTab;
        const tabImage = tab.querySelector('.main-offer__content-item-tab-image, .main-offer__content-item-tab-image-active');
        const tabText = tab.querySelector('.main-offer__content-item-text, .main-offer__content-item-text-active');

        tab.classList.toggle('main-offer__content-item-tab-active', isActive);
        tab.classList.toggle('main-offer__content-item-tab', !isActive);
        tabImage.classList.toggle('main-offer__content-item-tab-image-active', isActive);
        tabImage.classList.toggle('main-offer__content-item-tab-image', !isActive);
        tabText.classList.toggle('main-offer__content-item-text-active', isActive);
        tabText.classList.toggle('main-offer__content-item-text', !isActive);
    });
};

const resetCategoryCardsView = () => {
    categoryContent.classList.add('category__content-hide');
    refreshButton.style.display = '';
};

const loadData = (data, categoryItems) => {
    categoryContent.innerHTML = '';
    let i = 1;
    for (const [index, items] of data.entries()) {
        if (items.category === categoryItems) {
            const card = document.createElement('div');
            card.classList.add('category__content-item');
            card.dataset.productIndex = index;
            card.dataset.productImage = `./images/${categoryItems}-${i}.jpg`;
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

            categoryContent.append(card);
        }
    }
}


getCategoryItems();
//coffee
const menuCoffee = document.querySelector('.coffee');
menuCoffee.addEventListener('click', () => {
    updateActiveCategoryTab(menuCoffee);
    resetCategoryCardsView();
    loadData(data, 'coffee');
    getCategoryItems();
})

//tea
const menuTea = document.querySelector('.tea');
menuTea.addEventListener('click', () => {
    updateActiveCategoryTab(menuTea);
    resetCategoryCardsView();
    loadData(data, 'tea');
    getCategoryItems();
})

//dessert
const menuDessert = document.querySelector('.dessert');
menuDessert.addEventListener('click', () => {
    updateActiveCategoryTab(menuDessert);
    resetCategoryCardsView();
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

const openPopup = () => {
    popup.style.display = 'block';
    document.body.classList.add('scroll-lock');
};

const closePopup = () => {
    popup.style.display = 'none';
    document.body.classList.remove('scroll-lock');
};

popupButton.addEventListener('click', () => {
    closePopup();
})

popup.addEventListener('click', (event) => {
    if (event.target === popup) {
        closePopup();
    }
})

document.addEventListener('keydown', (event) => {
    if (event.key === 'Escape' && popup.style.display === 'block') {
        closePopup();
    }
});

const popupImageContainer = document.querySelector('.popup__image-container');
const popupTitle = document.querySelector('.popup__title');
const popupText = document.querySelector('.popup__text');
const popupCost = document.querySelector('.popup__cost');
const popupSizes = document.querySelector('.popup__sizes');
const popupAdditives = document.querySelector('.popup__additives');

let currentProduct = null;
let selectedSize = 's';
let selectedAdditives = [];

const formatPrice = (price) => `$${price.toFixed(2)}`;

const updatePopupCost = () => {
    if (!currentProduct) {
        return;
    }

    const basePrice = Number(currentProduct.price);
    const sizePrice = Number(currentProduct.sizes[selectedSize]['add-price']);
    const additivesPrice = selectedAdditives.reduce((sum, additiveIndex) => {
        return sum + Number(currentProduct.additives[additiveIndex]['add-price']);
    }, 0);

    popupCost.textContent = formatPrice(basePrice + sizePrice + additivesPrice);
};

const createPopupOption = (label, text, className) => {
    const option = document.createElement('button');
    option.classList.add(className);
    option.type = 'button';

    const optionLabel = document.createElement('span');
    optionLabel.classList.add('popup__option-label');
    optionLabel.textContent = label;

    option.append(optionLabel, text);

    return option;
};

const renderPopupSizes = (product) => {
    popupSizes.innerHTML = '';

    Object.entries(product.sizes).forEach(([sizeKey, sizeValue]) => {
        const sizeOption = createPopupOption(sizeKey.toUpperCase(), sizeValue.size, 'popup__size');
        sizeOption.dataset.size = sizeKey;
        sizeOption.classList.toggle('popup__option-active', sizeKey === selectedSize);

        sizeOption.addEventListener('click', () => {
            selectedSize = sizeKey;
            popupSizes.querySelectorAll('.popup__size').forEach((size) => {
                size.classList.toggle('popup__option-active', size.dataset.size === selectedSize);
            });
            updatePopupCost();
        });

        popupSizes.append(sizeOption);
    });
};

const renderPopupAdditives = (product) => {
    popupAdditives.innerHTML = '';

    product.additives.forEach((additive, index) => {
        const additiveOption = createPopupOption(String(index + 1), additive.name, 'popup__additive');
        additiveOption.dataset.additiveIndex = index;

        additiveOption.addEventListener('click', () => {
            const isSelected = selectedAdditives.includes(index);

            selectedAdditives = isSelected
                ? selectedAdditives.filter((additiveIndex) => additiveIndex !== index)
                : [...selectedAdditives, index];

            additiveOption.classList.toggle('popup__option-active', !isSelected);
            updatePopupCost();
        });

        popupAdditives.append(additiveOption);
    });
};

const renderPopup = (product, imageSrc) => {
    currentProduct = product;
    selectedSize = 's';
    selectedAdditives = [];

    popupImageContainer.innerHTML = '';

    const image = document.createElement('img');
    image.classList.add('popup__image');
    image.src = imageSrc;
    image.alt = product.name;

    popupImageContainer.append(image);
    popupTitle.textContent = product.name;
    popupText.textContent = product.description;

    renderPopupSizes(product);
    renderPopupAdditives(product);
    updatePopupCost();
};

categoryContent.addEventListener('click', (event) => {
    const card = event.target.closest('.category__content-item');

    if (!card) {
        return;
    }

    const product = data[Number(card.dataset.productIndex)];

    if (!product) {
        return;
    }

    renderPopup(product, card.dataset.productImage);
    openPopup();
});

//popup category items
function getCategoryItems () {};

