import Popup from "./Popup";

export default class PopupWithForm extends Popup {

    constructor(selector, formSubmitter) {
        super(selector);
        this._formSubmitter = formSubmitter;
        this._form = this._popup.querySelector('form');
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
        this._form.addEventListener('submit', (evt) => {
            this._formSubmitter(evt);
        });
    };

    close() {
        this._form.reset();
        super.close();
    }
}