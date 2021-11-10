const editProfilePopup = document.querySelector('.popup');
const closePopupButton = document.querySelector('.popup__container-close');
const editProfileButton = document.querySelector('.profile__info-edit-button');
const favPlaceButton = document.querySelector('.place__fav');
const favPlaceButtonClicked = document.querySelector('.place__fav-clicked');

const currentName = document.querySelector('.profile__info-name');
const currentRank = document.querySelector('.profile__info-rank');

const popupInputName = editProfilePopup.querySelector('.popup__container-input-item[id="name"]');
const popupInputRank = editProfilePopup.querySelector('.popup__container-input-item[id="rank"]');


function toggleEditProfileModal() {
    editProfilePopup.classList.toggle('popup_opened')
}

function initiateProfileInfo() {
    popupInputName.setAttribute('value', currentName.textContent);
    popupInputRank.setAttribute('value', currentRank.textContent);
}

function saveNewProfileInfo(event) {
    event.preventDefault();
    currentName.textContent = popupInputName.getAttribute('value');
    currentRank.textContent = popupInputRank.getAttribute('value');
    toggleEditProfileModal();
}

function updateName(e) {
    popupInputName.setAttribute('value', e.target.value);
}

function updateRank(e) {
    popupInputRank.setAttribute('value', e.target.value);
}

function makeFav() {
    favPlaceButtonClicked.style.display = 'inline';
    favPlaceButton.style.display = 'none';
}

function handleFavourite() {
    if (favPlaceButtonClicked.style.display === 'none') {
        makeFav()
    } else {
        favPlaceButton.style.display = 'inline';
        favPlaceButtonClicked.style.display = 'none';
    }
}

editProfileButton.addEventListener('click', toggleEditProfileModal);
closePopupButton.addEventListener('click', toggleEditProfileModal);

popupInputName.addEventListener('change', updateName);
popupInputRank.addEventListener('change', updateRank);

editProfilePopup.addEventListener('submit', saveNewProfileInfo);

favPlaceButton.addEventListener('click', handleFavourite);
favPlaceButtonClicked.addEventListener('click', handleFavourite);

initiateProfileInfo();