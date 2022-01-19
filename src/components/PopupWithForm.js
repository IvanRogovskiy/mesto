import Popup from "./Popup";

export default class PopupWithForm extends Popup {

    constructor(selector, formSubmitter) {
        super(selector);
        this._formSubmitter = formSubmitter;
        this._form = this._popup.querySelector('form');
        this._inputName = this._popup.querySelector('.popup__input_type_name');
        this._inputRank = this._popup.querySelector('.popup__input_type_rank');
    }

    _getInputValues() {
        let formValues = {};
        this._popup.querySelectorAll('input').forEach(input => {
            formValues[input.name] = input.value;
        });
        this._formValues = formValues;
    }

    setEventListeners() {
        super.setEventListeners();
        this._form.addEventListener('submit',this._formSubmitter);
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
        this._form.reset();
        this._form.removeEventListener('submit', this._formSubmitter);
        super.close();
    }
}