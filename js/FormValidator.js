export default class FormValidator {
    constructor(params, form) {
        this._inputSelector = params.inputSelector;
        this._submitButtonSelector = params.submitButtonSelector;
        this._inactiveButtonClass = params.inactiveButtonClass;
        this._inputErrorClass = params.inputErrorClass;
        this._errorClass = params.errorClass;
        this._form = form;
        this._inputList = Array.from(this._form.querySelectorAll(this._inputSelector));
        this._button = this._form.querySelector(this._submitButtonSelector);
    }

    _showInputError(inputElement, errorMessage) {
        const errorElement = this._form.querySelector(`.${inputElement.id}-input-error`);
        inputElement.classList.add(this._inputErrorClass);
        errorElement.classList.add(this._errorClass);
        errorElement.textContent = errorMessage;
    }

    _hideInputError(inputElement) {
        const errorElement = this._form.querySelector(`.${inputElement.id}-input-error`);
        inputElement.classList.remove(this._inputErrorClass);
        errorElement.classList.remove(this._errorClass);
        errorElement.textContent = '';
    }

    _checkInputValidity(inputElement) {
        if (inputElement.validity.valid) {
            this._hideInputError(inputElement)
        } else {
            this._showInputError(inputElement, inputElement.validationMessage)
        }
    }

    _hasInvalidInput(inputList) {
        return inputList.some((inputElement) => {
            return !inputElement.validity.valid
        });
    }

    _toggleButtonState(inputList, buttonElement) {
        if (this._hasInvalidInput(inputList)) {
            buttonElement.classList.add(this._inactiveButtonClass);
            buttonElement.setAttribute("disabled", true);
        } else {
            buttonElement.classList.remove(this._inactiveButtonClass);
            buttonElement.removeAttribute("disabled");
        }
    }

    _setEventListeners() {
        this._toggleButtonState(this._inputList, this._button);
        this._inputList.forEach((inputElement) => {
            inputElement.addEventListener('input', () => {
                this._toggleButtonState(this._inputList, this._button, this._inactiveButtonClass);
                this._checkInputValidity(inputElement)
            });
        })
    }

    resetValidation() {
        this._toggleButtonState(this._inputList, this._button);
        this._inputList.forEach((input) => {
            this._hideInputError(input);
        });
    }

    enableValidation() {
        this._form.addEventListener('submit', (e) => {
            e.preventDefault();
        });
        this._setEventListeners();
    }
}