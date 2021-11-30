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

const popupEdit = document.querySelector('.popup-edit');
const popupAdd = document.querySelector('.popup-add');
const addCardForm = document.querySelector('form[name="add-card"]');
const editProfileForm = document.querySelector('form[name="edit-profile"]');
const closeEditPopupButton = document.querySelector('.popup-edit__container-close');
const closeAddPopupButton = document.querySelector('.popup-add__container-close');
const editProfileButton = document.querySelector('.profile__info-edit-button');
const addPlaceCardButton = document.querySelector('.profile__add-button');

const currentName = document.querySelector('.profile__info-name');
const currentRank = document.querySelector('.profile__info-rank');

const cardTitle = document.querySelector('.popup-add__container-input-item[id="title"]');
const cardLink = document.querySelector('.popup-add__container-input-item[id="link"]');

const popupInputName = editProfileForm.querySelector('.popup-edit__container-input-item[id="name"]');
const popupInputRank = editProfileForm.querySelector('.popup-edit__container-input-item[id="rank"]');

function initiateApp(initialCards) {
    initialCards.forEach(item => {
        createCard(item.name, item.link)
    });
    editProfileButton.addEventListener('click', openModal);
    addPlaceCardButton.addEventListener('click', openModal)
}

function createCard(title, imageLink) {
    const placeTemplate = document.querySelector('#place-template').content;
    const placeCardElement = placeTemplate.querySelector('.place').cloneNode(true);
    const placeImage = placeCardElement.querySelector('.place__image');
    const placeTitle = placeCardElement.querySelector('.place__name');
    const favPlaceButton = placeCardElement.querySelector('.place__fav');

    favPlaceButton.addEventListener('click', handleFavourite)
    placeCardElement.querySelector('.place__delete').addEventListener('click', removeCard);
    placeImage.addEventListener('click', showCardPicture);

    const cardsContainer = document.querySelector('.places')
    placeImage.src = imageLink;
    placeTitle.textContent = title;
    cardsContainer.prepend(placeCardElement);
}

function handleFavourite(evt) {
    evt.target.classList.toggle('place__fav_liked')
}

function removeCard(evt) {
    const parentCard = evt.target.closest('.place');
    parentCard.remove();
}

function showCardPicture(evt) {
    const placeImageFullContainer = document.querySelector('.place__image-full-container');
    const placeImageFull = document.querySelector('.place__image-full-image');
    const placeImageFullName = document.querySelector('.place__image-full-name');
    placeImageFull.src = evt.target.src;
    const targetCard = evt.target.closest('.place');
    placeImageFullName.textContent = targetCard.querySelector('.place__name').textContent;
    placeImageFullContainer.style.display = 'flex';
}

function openModal(evt) {
    if (evt.target === editProfileButton) {
        popupInputName.value = currentName.textContent;
        popupInputRank.value = currentRank.textContent;
        popupEdit.classList.add('popup_opened')
        editProfileForm.addEventListener('submit', saveNewProfileInfo);
        closeEditPopupButton.addEventListener('click', () => {
            popupEdit.classList.remove('popup_opened');
        });
    }

    if (evt.target === addPlaceCardButton) {
        popupAdd.classList.add('popup_opened')
        addCardForm.addEventListener('submit', saveCard);
        closeAddPopupButton.addEventListener('click', () => {
            popupAdd.classList.remove('popup_opened');
        });
    }
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
    createCard(title, link);
    popupAdd.classList.remove('popup_opened');
}

initiateApp(initialCards);