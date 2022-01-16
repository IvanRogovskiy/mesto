import {keyHandler} from "./script";

export default class Popup {

    constructor(selector) {
        this._popup = document.querySelector(selector);
    }

    _handleEscClose(evt) {
        if (evt.key === 'Escape') {
            // const openedPopup = document.querySelector('.popup_opened');
            close();
        }
    }

    open() {
        this._popup.classList.add('popup_opened');
    }

    close() {
        this._popup.classList.remove('popup_opened');
    }

    setEventListeners() {
        document.addEventListener('keydown', this._handleEscClose);
        this._popup.addEventListener('click', (e) => {
            if ((e.target.classList.contains('popup_opened')) || (e.target.classList.contains('popup__close'))) {
                close();
            }
        });
    }

}