import Popup from "./Popup";

export default class PopupWithForm extends Popup {

    constructor({selector, formSubmitter}) {
        super(selector);
        this._formSubmitter = formSubmitter;
        this._form = this._popup.querySelector('form');
        this._submitBtn = this._form.querySelector('.popup__save');
        this._submitBtnText = this._submitBtn.value
        this._popupInput = this._popup.querySelectorAll('.popup__input');
    }

    _getInputValues() {
        const formValues = {};
        this._popupInput.forEach(input => {
            formValues[input.name] = input.value;
        });
        return formValues
    }

    setEventListeners() {
        super.setEventListeners();
        this._form.addEventListener('submit', (e) => {
            e.preventDefault();
            this._formSubmitter(this._getInputValues())
        });
    };

    setFieldValues(values) {
        Object.keys(values).forEach(key => {
            this._form.querySelector(`input[name=${key}]`).value = values[key];
        })
    }

    setSubmitBtnText(text) {
        this._submitBtn.value = text;
    }

    overrideSubmitter(newSubmitter) {
        this._formSubmitter = newSubmitter;
    }

    renderLoading(isLoading, loadingText='Сохранение...') {
        if (isLoading) {
            this._submitBtn.value = loadingText;
        } else {
            this._submitBtn.value = this._submitBtnText;
        }
    }

    close() {
        this._form.reset();
        super.close();
    }
}