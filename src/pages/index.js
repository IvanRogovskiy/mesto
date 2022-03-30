import Card from "../components/Card";
import FormValidator from "../components/FormValidator";
import {baseUrl, headers, validationParams} from "../utils/constants";
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

const userAvatarContainer = document.querySelector('.profile__avatar-container');

const api = new Api({baseUrl, headers});
const userInfo = new UserInfo('.profile__info-name', '.profile__info-rank', '.profile__avatar');

const confirmDeletePopup = new PopupWithForm({selector: '.popup_type_delete',
    formSubmitter: () => console.log('Создание инстанса обьекта попапа с формой')
});
confirmDeletePopup.setEventListeners();

function handleCardDelete(cardId, evt, context) {
    confirmDeletePopup.overrideSubmitter(() => {
        api.deleteCard(cardId, evt, context)
            .then(() => {
                context.removeCard(evt);
                console.log(`Карточка с id ${cardId} успешно удалена`);
                confirmDeletePopup.close();
            })
            .catch((err) => console.log(`Произошла ошибка ${err} при удалении карточки с id ${cardId}`))

    });
    confirmDeletePopup.open()
}

function handleCardLike(cardId, evt, context) {
    if (!context.isLiked(evt)) {
        api.addLike(cardId)
            .then(res => context.updateLikesCounter(res.likes, evt))
            .catch(err => console.log(`Error ${err} while card liking`))
    } else {
        api.removeLike(cardId)
            .then(res => context.updateLikesCounter(res.likes, evt))
            .catch(err => console.log(`Error ${err} while card unliking`))
    }
}

function createNewCard(name, link, id, likes, owner) {
    const card = new Card(name, link, id, likes, owner, '#place-template',
        handleCardClick, handleCardDelete, handleCardLike);
    return card.generateCard(owner, likes, userInfo.getUserId());
}

function renderUserInfo(userData) {
    const {name, about, avatar, _id} = userData;
    userInfo.setUserInfo(name, about)
    userInfo.setUserId(_id);
    if (avatar) {
        userInfo.setUserAvatar(avatar)
    }
}

function renderUserCards(result) {
    if (result) {
        const initialCards = [];
        result.forEach(item => {
            initialCards.push({name: item.name, link: item.link, id: item._id, likes: item.likes, owner: item.owner});
        });
        cardsList.renderItems(initialCards.reverse());
    } else {
        console.log('Cards list is empty');
    }
}

const popupWithImage = new PopupWithImage('.popup_type_full');
function handleCardClick(name, src) {
    popupWithImage.open(name, src);
}
popupWithImage.setEventListeners();

const editProfilePopup = new PopupWithForm({selector:'.popup_type_edit',
    formSubmitter: ({name, rank}) => {
        editProfilePopup.renderLoading(true);
        // renderLoading(editProfilePopup, true);
        api.updateUserInfo({name, about: rank})
            .then(res => {
            if (res.name !== name || res.about !== rank) {
                throw new Error('Ошибка при обновлении профиля')
            }
            userInfo.setUserInfo(res.name, res.about);
            editProfilePopup.close();
        })
            .catch((err) => console.log(err))
            .finally(() => {
                editProfilePopup.renderLoading(false);
            })
    }
});
editProfilePopup.setEventListeners();

editProfileButton.addEventListener('click', () => {
    editProfilePopup.setFieldValues(userInfo.getUserInfo());
    formValidators[editProfileForm.getAttribute('name')].resetValidation();
    editProfilePopup.open();
});

const addCardPopup = new PopupWithForm({selector: '.popup_type_add',
    formSubmitter: ({title, src}) => {
        addCardPopup.renderLoading(true);
        api.addNewCard({name:title, link: src})
            .then(res => {
                cardsList.addItem(createNewCard(res.name, res.link, res._id, res.likes, res.owner));
                addCardPopup.close();
            })
            .catch((err) => console.log(err))
            .finally(() => {
                addCardPopup.renderLoading(false);
            })
    }
});
addCardPopup.setEventListeners();

addPlaceCardButton.addEventListener('click', () => {
    formValidators[addCardForm.getAttribute('name')].resetValidation();
    addCardPopup.open()
});

Promise.all([api.getUsersCards(), api.getMyProfileInfo()])
    .then(([userCards, userData]) => {
        renderUserInfo(userData);
        renderUserCards(userCards);
    })
    .catch(err => console.log(err))

const cardsList = new Section({
    renderer: (item) => {
        const card = createNewCard(item.name, item.link, item.id, item.likes, item.owner);
        cardsList.addItem(card);
    }}, '.places');

const updateAvatarPopup = new PopupWithForm({selector: '.popup_type_update-avatar',
    formSubmitter: ({link}) => {
        updateAvatarPopup.renderLoading(true);
        api.updateUserAvatar(link)
            .then((res) => {
                userInfo.setUserAvatar(res.avatar)
                updateAvatarPopup.close();
            })
            .catch(err => console.error(`Ошибка ${err} при обновлении аватара пользователя`))
            .finally(() => { updateAvatarPopup.renderLoading(false) })

    }
});
updateAvatarPopup.setEventListeners();

userAvatarContainer.addEventListener('click', (evt) => {
    updateAvatarPopup.open();
    formValidators[addCardForm.getAttribute('name')].resetValidation();
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

enableValidation(validationParams);