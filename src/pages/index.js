import Card from "../components/Card.js";
import FormValidator from "../components/FormValidator.js";
import {baseUrl, headers, validationParams} from "../utils/constants.js";
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

const userAvatar = document.querySelector('.profile__avatar');

const api = new Api({baseUrl, headers});
const userInfo = new UserInfo('.profile__info-name', '.profile__info-rank');

function createNewCard(name, link, userId) {
    const card = new Card(name, link, userId, '#place-template', handleCardClick);
    if (userId === userInfo.getUserId()) {
        return card.generateCard(true)
    }
    return card.generateCard();
}

function getAndRenderUserInfo() {
    api.getMyProfileInfo()
        .then(userData => {
            const {name, about, avatar, _id} = userData;
            userInfo.setUserInfo(name, about)
            userInfo.setUserId(_id);
            if (avatar) {
                userAvatar.src = avatar;
            }

        })
        .catch(error => console.log(error));
}

const popupWithImage = new PopupWithImage('.popup_type_full');
function handleCardClick(name, src) {
    popupWithImage.open(name, src);
}
popupWithImage.setEventListeners();

const editProfilePopup = new PopupWithForm({selector:'.popup_type_edit',
    formSubmitter: ({name, rank}) => {
        api.updateUserInfo({name, about: rank}).then(res => {
            if (res.name !== name || res.about !== rank) {
                throw new Error('Profile has been updated incorrectly')
            }
            userInfo.setUserInfo(res.name, res.about);
        })
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
        api.addNewCard({name:title, link: src})
            .then(res => {
                cardsList.addItem(createNewCard(res.name, res.link, res.owner._id))
            })
        addCardPopup.close();
    }
});
addCardPopup.setEventListeners();

addPlaceCardButton.addEventListener('click', () => {
    formValidators[addCardForm.getAttribute('name')].resetValidation();
    addCardPopup.open()
});

getAndRenderUserInfo();

api.getUsersCards().then(result => {
    if (result) {
        const initialCards = [];
        result.forEach(item => {
            initialCards.push({name: item.name, link: item.link, userId: item.owner._id});
        });
        cardsList.renderItems(initialCards.reverse());
    } else {
        console.log('Cards list is empty');
    }
})

const cardsList = new Section({
    renderer: (item) => {
        const card = createNewCard(item.name, item.link, item.userId);
        cardsList.addItem(card);
    }}, '.places');

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
