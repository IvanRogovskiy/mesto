const addButton = document.querySelector('.profile__info-edit-button');
const editModal = document.querySelector('.popup');
const closeButton = document.querySelector('.popup__container-close');


function toggleEditProfileModal() {
    editModal.classList.toggle('popup_opened')
}


addButton.addEventListener('click', toggleEditProfileModal);
closeButton.addEventListener('click', toggleEditProfileModal);