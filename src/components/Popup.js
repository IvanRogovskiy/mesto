export default class Popup {

    constructor(selector) {
        this._popup = document.querySelector(selector);
        this._handleEscClose = this._handleEscClose.bind(this);
    }

    _handleEscClose(evt) {
        if (evt.key === 'Escape') {
            this.close =  this.close.bind(this);
            this.close();
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
                console.log(`setEventListeners in Popup.js context = ${JSON.stringify(this)}`);
                this.close();
            }
        });
    }

}