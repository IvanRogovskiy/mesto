export const validationParams = {
    formSelector: '.popup__form',
    inputSelector: '.popup__input',
    submitButtonSelector: '.popup__save',
    inactiveButtonClass: 'popup__save_inactive',
    inputErrorClass: 'popup__input_type_error',
    errorClass: 'popup__input-error_active'
};

export const token = 'd1dbd6a3-e54d-478f-a23d-d884fc9a8682'

export const baseUrl = 'https://mesto.nomoreparties.co/v1/cohort-35';
export const headers = {
            authorization: token,
            'Content-Type': 'application/json'
}
