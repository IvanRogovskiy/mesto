import Popup from "./Popup";

export default class PopupWithForm extends Popup {

    //вроде по одному разу создаю попап каждого вида
    constructor({selector, formSubmitter}) {
        super(selector);
        this._formSubmitter = formSubmitter;
        this._form = this._popup.querySelector('form');
        this._submitBtn = this._form.querySelector('.popup__save');
    }

    _getInputValues() {
        let formValues = {};
        this._popup.querySelectorAll('.popup__input').forEach(input => {
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

    open() {
        super.open();
    }

    close() {
        this._form.reset();
        super.close();
    }
}