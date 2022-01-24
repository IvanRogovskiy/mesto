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

function createNewCard(name, link) {
    return new Card(name, link, '#place-template', handleCardClick).generateCard();
}

const popupWithImage = new PopupWithImage('.popup_type_full');
function handleCardClick(name, src) {
    popupWithImage.setEventListeners();
    popupWithImage.open(name, src);
}

const userInfo = new UserInfo('.profile__info-name', '.profile__info-rank');
const editProfilePopup = new PopupWithForm({selector:'.popup_type_edit',
    formSubmitter: (inputValues) => {
        userInfo.setUserInfo(inputValues["name"], inputValues["rank"])
        editProfilePopup.close();
        formValidators[editProfileForm.getAttribute('name')].resetValidation();
    }
});
editProfilePopup.setEventListeners();

editProfileButton.addEventListener('click', () => {
    editProfilePopup.setFieldValues(userInfo.getUserInfo());
    editProfilePopup.open();
});

const addCardPopup = new PopupWithForm({selector: '.popup_type_add',
    formSubmitter: (inputValues) => {
        const card = createNewCard(inputValues["title"], inputValues["src"]);
        cardsList.addItem(card);
        addCardPopup.close();
    }
});
addCardPopup.setEventListeners();

addPlaceCardButton.addEventListener('click', () => {
    formValidators[addCardForm.getAttribute('name')].resetValidation();
    addCardPopup.open()
});

const cardsList = new Section({
    items: initialCards,
    renderer: (item) => {
        const card = createNewCard(item.name, item.link);
        cardsList.addItem(card);
    }}, '.places');

cardsList.renderItems();

const formValidators = {};

//концепцию такую предложил предыдущий ревьюер - Gennadiy Barsegyan. Мне понравилось, если честно. Может он вас тоже убедит
//если вы поговорите :)
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
