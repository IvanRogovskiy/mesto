const showInputError = (formElement, inputElement, inputErrorClass, errorClass, errorMessage) => {
    const errorElement = formElement.querySelector(`.${inputElement.id}-input-error`);
    inputElement.classList.add(inputErrorClass);
    errorElement.classList.add(errorClass);
    errorElement.textContent = errorMessage;
};

const hideInputError = (formElement, inputElement, inputErrorClass, errorClass) => {
    const errorElement = formElement.querySelector(`.${inputElement.id}-input-error`);
    inputElement.classList.remove(inputErrorClass);
    errorElement.classList.remove(errorClass);
    errorElement.textContent = '';
};

const checkInputValidity = (formElement, inputElement, inputErrorClass, errorClass) => {
    if (inputElement.validity.valid) {
        hideInputError(formElement, inputElement, inputErrorClass, errorClass)
    } else {
        showInputError(formElement, inputElement, inputErrorClass, errorClass, inputElement.validationMessage)
    }
};

const hasInvalidInput = (inputList) => {
    return inputList.some((inputElement) => {
        return !inputElement.validity.valid
    });
};

const toggleButtonState = (inputList, buttonElement, inactiveButtonClass) => {
  if (hasInvalidInput(inputList)) {
      buttonElement.classList.add(inactiveButtonClass);
      buttonElement.setAttribute("disabled", true);
  } else {
      buttonElement.classList.remove(inactiveButtonClass);
      buttonElement.removeAttribute("disabled");
  }
}

const setEventListeners = (formElement, params) => {
    const inputList = Array.from(formElement.querySelectorAll(params.inputSelector));
    const buttonElement = formElement.querySelector(params.submitButtonSelector);
    toggleButtonState(inputList, buttonElement);
    inputList.forEach((inputElement) => {
        inputElement.addEventListener('input', () => {
            toggleButtonState(inputList, buttonElement, params.inactiveButtonClass);
            checkInputValidity(formElement, inputElement,  params.inputErrorClass, params.errorClass)
        });
    })
}

const enableValidation = (params) => {
    const formsList = Array.from(document.querySelectorAll(params.formSelector));
    formsList.forEach((form) => {
        form.addEventListener('submit', (e) => {
            e.preventDefault();
        });
        setEventListeners(form, params);
    });
};

enableValidation({
    formSelector: '.popup__form',
    inputSelector: '.popup__input',
    submitButtonSelector: '.popup__save',
    inactiveButtonClass: 'popup__save_inactive',
    inputErrorClass: 'popup__input_type_error',
    errorClass: 'popup__input-error_active'
});