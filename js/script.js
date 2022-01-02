import Card from "./Card.js";
import FormValidator from "./FormValidator.js";

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
const forms = document.querySelectorAll('.popup__form')

const popups = document.querySelectorAll('.popup');

const popupEdit = document.querySelector('.popup_type_edit');
const popupAdd = document.querySelector('.popup_type_add');
const popupFull = document.querySelector('.popup_type_full');

const addCardForm = document.querySelector('form[name="add-card"]');
const editProfileForm = document.querySelector('form[name="edit-profile"]');

const closeEditPopupButton = popupEdit.querySelector('.popup__close');
const closeAddPopupButton = popupAdd.querySelector('.popup__close');
const closeFullPopupButton = popupFull.querySelector('.popup__close');

const editProfileButton = document.querySelector('.profile__info-edit-button');
const addPlaceCardButton = document.querySelector('.profile__add-button');

const currentName = document.querySelector('.profile__info-name');
const currentRank = document.querySelector('.profile__info-rank');

const cardTitle = document.querySelector('.popup__input_type_title');
const cardLink = document.querySelector('.popup__input_type_src');

const popupInputName = editProfileForm.querySelector('.popup__input_type_name');
const popupInputRank = editProfileForm.querySelector('.popup__input_type_rank');

let editWasClosed = false;

function addCard(container, cardElement) {
    container.prepend(cardElement);
}

 export function openPopup(popup) {
    popup.classList.add('popup_opened')
    document.addEventListener('keydown', keyHandler)
}

export function closePopup(popup) {
    popup.classList.remove('popup_opened');
    document.removeEventListener('keydown', keyHandler);
}

function saveNewProfileInfo(event) {
    event.preventDefault();
    currentName.textContent = popupInputName.value;
    currentRank.textContent = popupInputRank.value;
    closePopup(popupEdit);
}

function saveCard(event) {
    event.preventDefault();
    const title = cardTitle.value
    const link = cardLink.value;
    const newCard = new Card(title, link, '#place-template').generateCard();
    addCard(cardsContainer, newCard);
    addCardForm.reset();
    closePopup(popupAdd);
    const saveButton = event.target.querySelector('.popup__save');
    saveButton.classList.add('popup__save_inactive');
    saveButton.setAttribute("disabled", "true");
}

export function keyHandler(evt) {
    console.log(evt.key);
    if (evt.key === 'Escape') {
        const openedPopup = document.querySelector('.popup_opened');
        closePopup(openedPopup);
    }
}

closeFullPopupButton.addEventListener('click', () => {
    closePopup(popupFull)
});
closeEditPopupButton.addEventListener('click', () => {
    closePopup(popupEdit);
    editWasClosed = true;
});
closeAddPopupButton.addEventListener('click', () => {
    closePopup(popupAdd)
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

Array.from(popups).forEach(popup => {
    popup.addEventListener('mousedown', (e) => {
        console.log()
        if (e.target === popup)
        closePopup(popup);
    });
})

initialCards.forEach(item => {
    const card = new Card(item.name, item.link, '#place-template').generateCard();
    addCard(cardsContainer, card);
});

Array.from(forms).forEach((form) => {
    const validator = new FormValidator({
        formSelector: '.popup__form',
        inputSelector: '.popup__input',
        submitButtonSelector: '.popup__save',
        inactiveButtonClass: 'popup__save_inactive',
        inputErrorClass: 'popup__input_type_error',
        errorClass: 'popup__input-error_active'
    }, form);
    validator.enableValidation()
})