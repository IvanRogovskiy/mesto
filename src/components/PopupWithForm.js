import Popup from "./Popup";

export default class PopupWithForm extends Popup {

    constructor({selector, formSubmitter}) {
        super(selector);
        this._formSubmitter = formSubmitter;
        this._form = this._popup.querySelector('form');
    }

    _getInputValues() {
        let formValues = {};
        this._popup.querySelectorAll('input[type="text"]').forEach(input => {
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
        // for (value of values) {
        //     this._form.querySelector(`input[name=${value}]`)
        // }
        // this._form.querySelector(values)
    }

    open() {
        super.open();
    }

    close() {
        this._form.removeEventListener('submit', this._formSubmitter);
        super.close();
    }
}