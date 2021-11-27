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

const editProfilePopup = document.querySelector('.popup');
const editProfileForm = document.querySelector('form[name="edit-profile"]');
const closePopupButton = document.querySelector('.popup__container-close');
const editProfileButton = document.querySelector('.profile__info-edit-button');

const currentName = document.querySelector('.profile__info-name');
const currentRank = document.querySelector('.profile__info-rank');

const popupInputName = editProfileForm.querySelector('.popup__container-input-item[id="name"]');
const popupInputRank = editProfileForm.querySelector('.popup__container-input-item[id="rank"]');



//Пробегам по массиву начальных карточек и создаем их
function initiateApp(initialCards) {
    initialCards.forEach(item => {
        createCard(item.name, item.link)
    })
}

//берет темплейт карточки, копирует его. Сетим тайтл и линк из аргументов, вешаем лисенеры и пушим элемент в контейнер
function createCard(title, imageLink) {
    const placeTemplate = document.querySelector('#place-template').content;
    const placeCardElement = placeTemplate.querySelector('.place').cloneNode(true);
    const placeImage = placeCardElement.querySelector('.place__image');
    const placeTitle = placeCardElement.querySelector('.place__name');
    const cardsContainer = document.querySelector('.places')
    placeImage.src = imageLink;
    placeTitle.textContent = title;
    cardsContainer.appendChild(placeCardElement);
}
//Получаем по таргету ближайшие элемент и выпиливаем методом ремув
function closeCard() {

}

//создаем оверлей + картинка карточки (вытащить ссылку из элемента) + плюс надпись (вытащить из элемента)
function showCardPicture() {

}

function openModal() {
    popupInputName.value = currentName.textContent;
    popupInputRank.value = currentRank.textContent;
    editProfilePopup.classList.add('popup_opened')
}

function closeModal() {
    editProfilePopup.classList.remove('popup_opened');
}

function saveNewProfileInfo(event) {
    event.preventDefault();
    currentName.textContent = popupInputName.value;
    currentRank.textContent = popupInputRank.value;
    closeModal();
}

editProfileButton.addEventListener('click', openModal);
closePopupButton.addEventListener('click', closeModal);
editProfileForm.addEventListener('submit', saveNewProfileInfo);

initiateApp(initialCards);