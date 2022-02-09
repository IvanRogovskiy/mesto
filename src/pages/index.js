import Card from "../components/Card.js";
import FormValidator from "../components/FormValidator.js";
import {baseUrl, headers, initialCards, validationParams} from "../utils/constants.js";
import '../../index.css';
import Section from "../components/Section";
import PopupWithImage from "../components/PopupWithImage";
import PopupWithForm from "../components/PopupWithForm";
import UserInfo from "../components/UserInfo";
import Api from "../components/Api";

const addCardForm = document.querySelector('.popup__form_type_add');
const editProfileForm = document.querySelector('.popup__form_type_edit');

const editProfileButton = document.querySelector('.profile__info-edit-button');
const addPlaceCardButton = document.querySelector('.profile__add-button');

const userName = document.querySelector('.profile__info-name');
const userRank = document.querySelector('.profile__info-rank');
const userAvatar = document.querySelector('.profile__avatar');

const api = new Api({baseUrl, headers});

function createNewCard(name, link) {
    return new Card(name, link, '#place-template', handleCardClick).generateCard();
}

function getAndRenderUserInfo() {
    api.getMyProfileInfo()
        .then(userData => {
            const {name, about, avatar} = userData;
            userName.textContent = name;
            userRank.textContent = about;
            userAvatar.src = avatar;
        })
        .catch(error => console.log(error));
}

const popupWithImage = new PopupWithImage('.popup_type_full');
function handleCardClick(name, src) {
    popupWithImage.open(name, src);
}
popupWithImage.setEventListeners();

const userInfo = new UserInfo('.profile__info-name', '.profile__info-rank');
const editProfilePopup = new PopupWithForm({selector:'.popup_type_edit',
    formSubmitter: ({name, rank}) => {
        userInfo.setUserInfo(name, rank)
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
    formSubmitter: ({title, src}) => {
        const card = createNewCard(title, src);
        cardsList.addItem(card);
        addCardPopup.close();
    }
});
addCardPopup.setEventListeners();

addPlaceCardButton.addEventListener('click', () => {
    formValidators[addCardForm.getAttribute('name')].resetValidation();
    addCardPopup.open()
});

getAndRenderUserInfo();

const cardsList = new Section({
    items: initialCards,
    renderer: (item) => {
        const card = createNewCard(item.name, item.link);
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
