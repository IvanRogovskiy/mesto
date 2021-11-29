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

const popupEdit = document.querySelector('.popup-edit');
const popupAdd = document.querySelector('.popup-add');
const editProfileForm = document.querySelector('form[name="edit-profile"]');
const closePopupButton = document.querySelector('.popup__container-close');
const editProfileButton = document.querySelector('.profile__info-edit-button');
const addPlaceCardButton = document.querySelector('.profile__add-button');

const currentName = document.querySelector('.profile__info-name');
const currentRank = document.querySelector('.profile__info-rank');

const popupInputName = editProfileForm.querySelector('.popup-edit__container-input-item[id="name"]');
const popupInputRank = editProfileForm.querySelector('.popup-edit__container-input-item[id="rank"]');

//Пробегам по массиву начальных карточек и создаем их
function initiateApp(initialCards) {
    initialCards.forEach(item => {
        createCard(item.name, item.link)
    });

}

//берет темплейт карточки, копирует его. Сетим тайтл и линк из аргументов, вешаем лисенеры и пушим элемент в контейнер
function createCard(title, imageLink) {
    const placeTemplate = document.querySelector('#place-template').content;
    const placeCardElement = placeTemplate.querySelector('.place').cloneNode(true);
    const placeImage = placeCardElement.querySelector('.place__image');
    const placeTitle = placeCardElement.querySelector('.place__name');
    const favPlaceButton = placeCardElement.querySelector('.place__fav');

    favPlaceButton.addEventListener('click', handleFavourite)
    placeCardElement.querySelector('.place__delete').addEventListener('click', removeCard);
    placeImage.addEventListener('click', showCardPicture);

    const cardsContainer = document.querySelector('.places')
    placeImage.src = imageLink;
    placeTitle.textContent = title;
    cardsContainer.appendChild(placeCardElement);
}

function handleFavourite(evt) {
    evt.target.classList.toggle('place__fav_liked')
}

//Получаем по таргету ближайшие элемент и выпиливаем методом ремув
function removeCard(evt) {
    const parentCard = evt.target.closest('.place');
    parentCard.remove();
}

//создаем оверлей + картинка карточки (вытащить ссылку из элемента) + плюс надпись (вытащить из элемента)
function showCardPicture(evt) {
    const placeImageFullContainer = document.querySelector('.place__image-full-container');
    const placeImageFull = document.querySelector('.place__image-full-image');
    const placeImageFullName = document.querySelector('.place__image-full-name');
    placeImageFull.src = evt.target.src;
    const targetCard = evt.target.closest('.place');
    placeImageFullName.textContent = targetCard.querySelector('.place__name').textContent;
    placeImageFullContainer.style.display = 'flex';
}

function openModal(evt) {
    if (evt.target === editProfileButton) {
        popupInputName.value = currentName.textContent;
        popupInputRank.value = currentRank.textContent;
        closePopupButton.addEventListener('click', closeModal);
        popupEdit.classList.toggle('popup_opened')
    }

    if (evt.target === addPlaceCardButton) {
        closePopupButton.addEventListener('click', closeModal);
        popupAdd.classList.add('popup_opened')
    }

    // if (evt.target === addPlaceCardButton) {
    //     document.querySelector('.popup-edit-edit__container-title').textContent = 'Новое место';
    //     const nameInput = document.querySelector('input[name="name"]');
    //     const rankInput = document.querySelector('input[name="rank"]');
    //     rankInput.name = 'link';
    //     rankInput.id = 'link';
    //     rankInput.value = '';
    //     nameInput.value = '';
    //     nameInput.placeholder = 'Название';
    //     rankInput.placeholder = 'Cсылка на картинку';
    //     document.querySelector('.popup-edit-edit__container-save').value = 'Создать'
    // }


}

function closeModal() {
    popupEdit.classList.remove('popup_opened');
}

function saveNewProfileInfo(event) {
    event.preventDefault();
    currentName.textContent = popupInputName.value;
    currentRank.textContent = popupInputRank.value;
    closeModal();
}

editProfileButton.addEventListener('click', openModal);
editProfileForm.addEventListener('submit', saveNewProfileInfo);
addPlaceCardButton.addEventListener('click', openModal)

initiateApp(initialCards);