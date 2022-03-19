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
const updateAvatarForm = document.querySelector('.popup__form_type_update-avatar')

const editProfileButton = document.querySelector('.profile__info-edit-button');
const addPlaceCardButton = document.querySelector('.profile__add-button');

const userAvatarContainer = document.querySelector('.profile__avatar-container');
const userAvatar = document.querySelector('.profile__avatar');

const api = new Api({baseUrl, headers});
const userInfo = new UserInfo('.profile__info-name', '.profile__info-rank');

const confirmDeletePopup = new PopupWithForm({selector: '.popup_type_delete',
    formSubmitter: () => console.log('Создание инстанса обьекта попапа с формой')
})

function renderLoading(popup, isLoading) {
    if (!isLoading) {
        if (popup === addCardPopup) {
            popup.setSubmitBtnText('Создать')
        }
        if (popup === editProfilePopup || popup === updateAvatarPopup) {
            popup.setSubmitBtnText('Сохранить')
        }

    } else {
        popup.setSubmitBtnText('Сохранение...')
    }
}

function handleCardDelete(cardId,evt, context) {
    confirmDeletePopup.overrideSubmitter(() => {
        api.deleteCard(cardId, evt, context)
            .then(() => {
                context._removeCard(evt);
                console.log(`Карточка с id ${cardId} успешно удалена`);
            })
            .catch((err) => console.log(`Произошла ошибка ${err} при удалении карточки с id ${cardId}`))
        confirmDeletePopup.close()
    });
    confirmDeletePopup.setEventListeners()
    confirmDeletePopup.open()
}

function handleCardLike(cardId, evt, context) {
    if (!evt.target.classList.contains('place__fav_liked')) {
        api.addLike(cardId)
            .then(res => context._updateLikesCounter(res.likes, evt))
            .catch(err => console.log(`Error ${err} while card liking`))
    } else {
        api.removeLike(cardId)
            .then(res => context._updateLikesCounter(res.likes, evt))
            .catch(err => console.log(`Error ${err} while card unliking`))
    }
}

function createNewCard(name, link, id, likes, owner) {
    const card = new Card(name, link, id, likes, owner, '#place-template',
        handleCardClick, handleCardDelete, handleCardLike);
    let deletable = false;
    let liked = false;
    if (owner._id === userInfo.getUserId()) {
        deletable = true;
    }
    if (likes.some((like) => { return like._id === userInfo.getUserId() })) {
        liked = true;
    }
    return card.generateCard(deletable, liked);
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
        renderLoading(editProfilePopup, true);
        api.updateUserInfo({name, about: rank})
            .then(res => {
            if (res.name !== name || res.about !== rank) {
                throw new Error('Ошибка при обновлении профиля')
            }
            userInfo.setUserInfo(res.name, res.about);
        })
            .catch((err) => console.log(err))
            .finally(() => {
                renderLoading(editProfilePopup, false);
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
        renderLoading(addCardPopup, true);
        api.addNewCard({name:title, link: src})
            .then(res => {
                cardsList.addItem(createNewCard(res.name, res.link, res._id, res.likes, res.owner))
            })
            .catch((err) => console.log(err))
            .finally(() => {
                renderLoading(addCardPopup, false);

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
            initialCards.push({name: item.name, link: item.link, id: item._id, likes: item.likes, owner: item.owner});
        });
        cardsList.renderItems(initialCards.reverse());
    } else {
        console.log('Cards list is empty');
    }
})

const cardsList = new Section({
    renderer: (item) => {
        const card = createNewCard(item.name, item.link, item.id, item.likes, item.owner);
        cardsList.addItem(card);
    }}, '.places');

const updateAvatarPopup = new PopupWithForm({selector: '.popup_type_update-avatar',
    formSubmitter: ({link}) => {
        renderLoading(updateAvatarPopup, true)
        api.updateUserAvatar(link)
            .then(() => { getAndRenderUserInfo();})
            .catch(err => console.error(`Ошибка ${err} при обновлении аватара пользователя`))
            .finally(() => { renderLoading(updateAvatarPopup, false) })
        updateAvatarPopup.close();
    }
});
updateAvatarPopup.setEventListeners();

userAvatarContainer.addEventListener('click', (evt) => {
    formValidators[updateAvatarForm.getAttribute('name')].resetValidation();
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
