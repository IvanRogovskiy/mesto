const addButton = document.querySelector('.profile__info-edit-button');
const editModal = document.querySelector('.popup');


function editProfile() {
    editModal.classList.add('popup_opened')
}

addButton.addEventListener('click', editProfile);