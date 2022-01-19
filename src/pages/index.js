import Card from "../components/Card.js";
import FormValidator from "../components/FormValidator.js";
import {initialCards, validationParams} from "../utils/constants.js";
import '../../index.css';
import Section from "../components/Section";
import PopupWithImage from "../components/PopupWithImage";
import PopupWithForm from "../components/PopupWithForm";
import UserInfo from "../components/UserInfo";

const cardsContainer = document.querySelector('.places')

const popups = document.querySelectorAll('.popup');

const popupEdit = document.querySelector('.popup_type_edit');
const popupAdd = document.querySelector('.popup_type_add');
const popupFull = document.querySelector('.popup_type_full');

const addCardForm = document.querySelector('form[name="add-card"]');
const editProfileForm = document.querySelector('form[name="edit-profile"]');

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

// а если у нас будет другой еще какой-то темплейт для карточки в будущем?
// function createCard(title, imageSrc) {
//     return new Card(title, imageSrc, '#place-template', handleCardClick).generateCard();
// }

// function saveCard(event) {
//     event.preventDefault();
//     const newCard = createCard(cardTitle.value, cardLink.value)
//     addCard(cardsContainer, newCard);
//     addCardForm.reset();
//     closePopup(popupAdd);
// }
//
// export function keyHandler(evt) {
//     console.log(evt.key);
//     if (evt.key === 'Escape') {
//         const openedPopup = document.querySelector('.popup_opened');
//         closePopup(openedPopup);
//     }
// }
//

function handleCardClick(name, link) {
    const popupWithImage = new PopupWithImage('.popup_type_full', {data: { src: link, name}});
    popupWithImage.setEventListeners();
    popupWithImage.open()
}

editProfileButton.addEventListener('click', () => {
    const editProfilePopup = new PopupWithForm('.popup_type_edit', (e) => {
        e.preventDefault()
        currentName.textContent = popupInputName.value;
        currentRank.textContent = popupInputRank.value;
        editProfilePopup.close();
        formValidators[editProfileForm.getAttribute('name')].resetValidation();
    });
    editProfilePopup.setEventListeners();
    editProfilePopup.setFieldValues(new UserInfo('.profile__info-name', '.profile__info-rank').getUserInfo())
    editProfilePopup.open();
});

addPlaceCardButton.addEventListener('click', () => {
    formValidators[addCardForm.getAttribute('name')].resetValidation();
    const addCardPopup = new PopupWithForm('.popup_type_add')
    openPopup(popupAdd);
});

// editProfileForm.addEventListener('submit', (evt) => {
//     saveNewProfileInfo(evt);
// });

// addCardForm.addEventListener('submit', saveCard);

// popups.forEach((popup) => {
//     popup.addEventListener('click', (e) => {
//         if ((e.target.classList.contains('popup_opened')) || (e.target.classList.contains('popup__close'))) {
//             closePopup(popup);
//         }
//     })
// })

const cardsList = new Section({
    items: initialCards,
    renderer: (item) => {
        const card = new Card(item.name, item.link, '#place-template', handleCardClick).generateCard();
        cardsList.addItem(card);
    }}, '.places');

cardsList.renderItems();

// initialCards.forEach(item => {
//     const card = createCard(item.name, item.link)
//     addCard(cardsContainer, card);
// });

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

enableValidation(validationParams);
