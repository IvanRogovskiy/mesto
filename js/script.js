const editProfilePopup = document.querySelector('.popup');
const closePopupButton = document.querySelector('.popup__container-close');
const editProfileButton = document.querySelector('.profile__info-edit-button');

const currentName = document.querySelector('.profile__info-name');
const currentRank = document.querySelector('.profile__info-rank');

const popupInputName = editProfilePopup.querySelector('.popup__container-input-item[id="name"]');
const popupInputRank = editProfilePopup.querySelector('.popup__container-input-item[id="rank"]');

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
editProfilePopup.addEventListener('submit', saveNewProfileInfo);