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
const containers = document.querySelectorAll('.popup__container')

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

function createCard(title, imageLink) {
    const placeTemplate = document.querySelector('#place-template').content;
    const placeCardElement = placeTemplate.querySelector('.place').cloneNode(true);
    const placeImage = placeCardElement.querySelector('.place__image');
    const placeTitle = placeCardElement.querySelector('.place__name');
    const favPlaceButton = placeCardElement.querySelector('.place__fav');

    favPlaceButton.addEventListener('click', handleLike)
    placeCardElement.querySelector('.place__delete').addEventListener('click', removeCard);
    placeImage.src = imageLink;
    placeImage.alt = `На фото изображен ${title}`
    placeTitle.textContent = title;
    placeImage.addEventListener('click', (evt) => {
        const placeImageFullImage = document.querySelector('.popup__container-full-image');
        const placeImageFullName = document.querySelector('.popup__container-full-name');
        placeImageFullImage.src = evt.target.src;
        placeImageFullImage.alt = evt.target.alt;
        const targetCard = evt.target.closest('.place');
        placeImageFullName.textContent = targetCard.querySelector('.place__name').textContent;
        openPopup(popupFull);
    });
    return placeCardElement
}

function addCard(container, cardElement) {
    container.prepend(cardElement);
}

function handleLike(evt) {
    evt.target.classList.toggle('place__fav_liked')
}

function removeCard(evt) {
    const parentCard = evt.target.closest('.place');
    parentCard.remove();
}

function openPopup(popup) {
    popup.classList.add('popup_opened')
}

function closePopup(popup) {
    popup.classList.remove('popup_opened');
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
    addCard(cardsContainer, createCard(title, link));
    addCardForm.reset();
    closePopup(popupAdd);
}

function keyHandler(evt, popupElement) {
    console.log(evt.key);
    if (evt.key === 'Escape') {
        closePopup(popupElement);
    }
}

closeFullPopupButton.addEventListener('click', () => {
    closePopup(popupFull)
});
closeEditPopupButton.addEventListener('click', () => {
    closePopup(popupEdit)
});
closeAddPopupButton.addEventListener('click', () => {
    closePopup(popupAdd)
});

initialCards.forEach(item => {
    addCard(cardsContainer, createCard(item.name, item.link))
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
    popup.addEventListener('click', (e) => {
        closePopup(popup);
    });
})

Array.from(containers).forEach((container) => {
    container.addEventListener('click', (e) => {
        e.stopPropagation();
    });
})

document.addEventListener('keydown', (e) => {
    Array.from(popups).forEach((popup) => {
        keyHandler(e, popup);
    })
});