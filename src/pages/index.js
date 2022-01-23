import Card from "../components/Card.js";
import FormValidator from "../components/FormValidator.js";
import {initialCards, validationParams} from "../utils/constants.js";
import '../../index.css';
import Section from "../components/Section";
import PopupWithImage from "../components/PopupWithImage";
import PopupWithForm from "../components/PopupWithForm";
import UserInfo from "../components/UserInfo";

const addCardForm = document.querySelector('form[name="add-card"]');
const editProfileForm = document.querySelector('form[name="edit-profile"]');

const editProfileButton = document.querySelector('.profile__info-edit-button');
const addPlaceCardButton = document.querySelector('.profile__add-button');

const currentName = document.querySelector('.profile__info-name');
const currentRank = document.querySelector('.profile__info-rank');

function handleCardClick(name, link) {
    const popupWithImage = new PopupWithImage('.popup_type_full', {data: { src: link, name}});
    popupWithImage.setEventListeners();
    popupWithImage.open()
}

editProfileButton.addEventListener('click', () => {
    const editProfilePopup = new PopupWithForm({selector:'.popup_type_edit',
        formSubmitter: (inputValues) => {
            currentName.textContent = inputValues["name"];
            currentRank.textContent = inputValues["rank"];
            editProfilePopup.close();
            formValidators[editProfileForm.getAttribute('name')].resetValidation();
        }
    });
    editProfilePopup.setEventListeners();
    editProfilePopup.setFieldValues(new UserInfo('.profile__info-name', '.profile__info-rank').getUserInfo())
    editProfilePopup.open();
});

addPlaceCardButton.addEventListener('click', () => {
    formValidators[addCardForm.getAttribute('name')].resetValidation();
    const addCardPopup = new PopupWithForm({selector: '.popup_type_add',
            formSubmitter: (inputValues) => {
            const card = new Card(inputValues["title"], inputValues["src"], '#place-template', handleCardClick).generateCard();
            cardsList.addItem(card);
            addCardPopup.close();
            }
    });
    addCardPopup.setEventListeners();
    addCardPopup.open()
});

const cardsList = new Section({
    items: initialCards,
    renderer: (item) => {
        const card = new Card(item.name, item.link, '#place-template', handleCardClick).generateCard();
        cardsList.addItem(card);
    }}, '.places');

cardsList.renderItems();

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
