const showInputError = (formElement, inputElement, inputErrorClass, errorClass) => {
    let errorMessage;
    const errorElement = formElement.querySelector(`.${inputElement.id}-input-error`);
    inputElement.classList.add(inputErrorClass);
    errorElement.classList.add(errorClass);
    if (inputElement.textContent.length === 0) {
        errorMessage = 'Вы пропустили это поле';
    }
    if (inputElement.validity.tooShort === true) {
        errorMessage = `Минимальное количество символов: 2. Длина текста сейчас: ${inputElement.value.length}`
    }
    if (inputElement.validity.typeMismatch === true && inputElement.classList.contains('popup__input_type_src')) {
        errorMessage = 'Введите адрес сайта';
    }
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
        showInputError(formElement, inputElement, inputErrorClass, errorClass)
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
  } else {
      buttonElement.classList.remove(inactiveButtonClass);
  }
}

const setEventListeners = (formElement, params) => {
    const inputList = Array.from(formElement.querySelectorAll(params.inputSelector));
    const buttonElement = formElement.closest('.popup__container').querySelector(params.submitButtonSelector);
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
        const fieldSetList = Array.from(form.querySelectorAll('.popup__input-form'));
        fieldSetList.forEach((fieldSet) => {
            setEventListeners(fieldSet, params)
        });
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