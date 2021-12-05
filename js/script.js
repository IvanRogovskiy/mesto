const initialCards = [
    {
        name: 'Архыз',
        link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/arkhyz.jpg'
    },
    {
        name: 'Челябинская область',
        link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/chelyabinsk-oblast.jpg'
    },
    {
        name: 'Иваново',
        link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/ivanovo.jpg'
    },
    {
        name: 'Камчатка',
        link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/kamchatka.jpg'
    },
    {
        name: 'Холмогорский район',
        link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/kholmogorsky-rayon.jpg'
    },
    {
        name: 'Байкал',
        link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/baikal.jpg'
    }
];

const cardsContainer = document.querySelector('.places')

const popupEdit = document.querySelector('.popup-edit');
const popupAdd = document.querySelector('.popup-add');
const placeImageFull = document.querySelector('.place-image-full');

const addCardForm = document.querySelector('form[name="add-card"]');
const editProfileForm = document.querySelector('form[name="edit-profile"]');
const closeEditPopupButton = document.querySelector('.popup-edit__container-close');
const closeAddPopupButton = document.querySelector('.popup-add__container-close');
const closeFullPopup = document.querySelector('.place-image-full__close');
const editProfileButton = document.querySelector('.profile__info-edit-button');
const addPlaceCardButton = document.querySelector('.profile__add-button');

const currentName = document.querySelector('.profile__info-name');
const currentRank = document.querySelector('.profile__info-rank');

const cardTitle = document.querySelector('.popup-add__container-input-item[id="title"]');
const cardLink = document.querySelector('.popup-add__container-input-item[id="link"]');

const popupInputName = editProfileForm.querySelector('.popup-edit__container-input-item[id="name"]');
const popupInputRank = editProfileForm.querySelector('.popup-edit__container-input-item[id="rank"]');

function createCard(title, imageLink) {
    const placeTemplate = document.querySelector('#place-template').content;
    const placeCardElement = placeTemplate.querySelector('.place').cloneNode(true);
    const placeImage = placeCardElement.querySelector('.place__image');
    const placeTitle = placeCardElement.querySelector('.place__name');
    const favPlaceButton = placeCardElement.querySelector('.place__fav');

    favPlaceButton.addEventListener('click', handleLike)
    placeCardElement.querySelector('.place__delete').addEventListener('click', removeCard);
    placeImage.src = imageLink;
    placeImage.alt = `На фото изображен ${title}`
    placeTitle.textContent = title;
    placeImage.addEventListener('click', (evt) => {
        const placeImageFullImage = document.querySelector('.place-image-full__image');
        const placeImageFullName = document.querySelector('.place-image-full__name');
        placeImageFullImage.src = evt.target.src;
        placeImageFullImage.alt = evt.target.alt;
        const targetCard = evt.target.closest('.place');
        placeImageFullName.textContent = targetCard.querySelector('.place__name').textContent;
        openPopup(placeImageFull);
    });


    return placeCardElement
}

function addCard(container, cardElement) {
    container.prepend(cardElement);
}

function handleLike(evt) {
    evt.target.classList.toggle('place__fav_liked')
}

function removeCard(evt) {
    const parentCard = evt.target.closest('.place');
    parentCard.remove();
}

function openPopup(popup) {
    popup.classList.add('popup_opened')
}

function closePopup(popup) {
    const closeButton = popup.querySelector('button[class*=close]');
    closeButton.closest('div[class*=opened]').classList.toggle('popup_opened');
}

function saveNewProfileInfo(event) {
    event.preventDefault();
    currentName.textContent = popupInputName.value;
    currentRank.textContent = popupInputRank.value;
    popupEdit.classList.remove('popup_opened');
}

function saveCard(event) {
    event.preventDefault();
    const title = cardTitle.value
    const link = cardLink.value;
    addCard(cardsContainer, createCard(title, link));
    addCardForm.reset();
    closePopup(popupAdd, closeAddPopupButton);
}

closeFullPopup.addEventListener('click', (evt) => {
    closePopup(placeImageFull, evt)
});
closeEditPopupButton.addEventListener('click', (evt) => {
    closePopup(popupEdit, evt)
});
closeAddPopupButton.addEventListener('click', (evt) => {
    closePopup(popupAdd, evt)
});

initialCards.forEach(item => {
    addCard(cardsContainer, createCard(item.name, item.link))
});
editProfileButton.addEventListener('click', () => {
    popupInputName.value = currentName.textContent;
    popupInputRank.value = currentRank.textContent;
    openPopup(popupEdit);
});
addPlaceCardButton.addEventListener('click', () => {
    openPopup(popupAdd);
});

editProfileForm.addEventListener('submit', (evt) => {
    saveNewProfileInfo(evt);
});
addCardForm.addEventListener('submit', saveCard);