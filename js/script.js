import Card from "./Card.js";
import FormValidator from "./FormValidator.js";
import {validationConfig} from "./validationConfig.js";

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

const placeImageFullImage = document.querySelector('.popup__container-full-image');
const placeImageFullName = document.querySelector('.popup__container-full-name');

function addCard(container, cardElement) {
    container.prepend(cardElement);
}

function openPopup(popup) {
    popup.classList.add('popup_opened')
    document.addEventListener('keydown', keyHandler)
}

function closePopup(popup) {
    popup.classList.remove('popup_opened');
    document.removeEventListener('keydown', keyHandler);
}

function saveNewProfileInfo(event) {
    event.preventDefault();
    currentName.textContent = popupInputName.value;
    currentRank.textContent = popupInputRank.value;
    closePopup(popupEdit);
}

function createCard(title, imageSrc, template, clickHandler) {
    return new Card(title, imageSrc, template, clickHandler).generateCard();
}

function saveCard(event) {
    event.preventDefault();
    const newCard = createCard(cardTitle.value, cardLink.value,'#place-template', handleCardClick)
    addCard(cardsContainer, newCard);
    addCardForm.reset();
    closePopup(popupAdd);
}

export function keyHandler(evt) {
    console.log(evt.key);
    if (evt.key === 'Escape') {
        const openedPopup = document.querySelector('.popup_opened');
        closePopup(openedPopup);
    }
}

function handleCardClick(name, link) {
    placeImageFullName.textContent = name;
    placeImageFullName.alt = `На фото изображен ${name}`;
    placeImageFullImage.src = link;
    openPopup(popupFull);
}

// closeFullPopupButton.addEventListener('click', () => {
//     closePopup(popupFull)
// });
// closeEditPopupButton.addEventListener('click', () => {
//     closePopup(popupEdit);
// });
// closeAddPopupButton.addEventListener('click', () => {
//     closePopup(popupAdd)
// });

editProfileButton.addEventListener('click', () => {
    popupInputName.value = currentName.textContent;
    popupInputRank.value = currentRank.textContent;
    formValidators[editProfileForm.getAttribute('name')].resetValidation();
    openPopup(popupEdit);
});

addPlaceCardButton.addEventListener('click', () => {
    formValidators[addCardForm.getAttribute('name')].resetValidation();
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

popups.forEach((popup) => {
    popup.addEventListener('click', (e) => {
        if ((e.target.classList.contains('popup__opened')) || (e.target.classList.contains('popup__close'))) {
            closePopup(popup);
        }
    })
})

initialCards.forEach(item => {
    const card = createCard(item.name, item.link, '#place-template', handleCardClick)
    addCard(cardsContainer, card);
});

const formValidators = {};

const enableValidation = (validationConfig) => {
    const formList = Array.from(document.querySelectorAll(validationConfig.formSelector));
    formList.forEach((formElement) => {
        const validator = new FormValidator(validationConfig, formElement);
        const formName = formElement.getAttribute('name');
        formValidators[formName] = validator;
        validator.enableValidation();
    })
};

enableValidation(validationConfig);