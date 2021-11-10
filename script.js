const editProfilePopup = document.querySelector('.popup');
const closePopupButton = document.querySelector('.popup__container-close');
const editProfileButton = document.querySelector('.profile__info-edit-button');
const favPlaceButton = document.querySelectorAll('.place__fav');
const favPlaceButtonClicked = document.querySelectorAll('.place__fav-clicked');

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

function handleFavourite(e) {
    let targetElement = e.target;
    let targetElementIndex = targetElement.index;
    console.log(targetElement)
    console.log(window.getComputedStyle(targetElement).display)
    if (window.getComputedStyle(targetElement).display === 'block' && targetElement === favPlaceButton[targetElementIndex]) {
        targetElement.style.display = 'none';
        favPlaceButtonClicked[targetElementIndex].style.display = 'block'
    }
    if (window.getComputedStyle(targetElement).display === 'block' && targetElement === favPlaceButtonClicked[targetElementIndex]) {
        targetElement.style.display = 'none';
        favPlaceButton[targetElementIndex].style.display = 'block'
    }
}

editProfileButton.addEventListener('click', toggleEditProfileModal);
closePopupButton.addEventListener('click', toggleEditProfileModal);

popupInputName.addEventListener('change', updateName);
popupInputRank.addEventListener('change', updateRank);

editProfilePopup.addEventListener('submit', saveNewProfileInfo);

for ( let i = 0; i < favPlaceButton.length; i++) {
    favPlaceButton[i].index = i;
    favPlaceButton[i].addEventListener('click', handleFavourite);
}

for ( let i = 0; i < favPlaceButtonClicked.length; i++) {
    favPlaceButtonClicked[i].index = i;
    favPlaceButtonClicked[i].addEventListener('click', handleFavourite);
}

initiateProfileInfo();