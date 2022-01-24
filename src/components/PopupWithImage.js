import Popup from "./Popup";

export default class PopupWithImage extends Popup {

    constructor(selector) {
        super(selector);
        this._popupImage = this._popup.querySelector('.popup__container-full-image');
        this._popupTitle = this._popup.querySelector('.popup__container-full-name');
    }

    open(name, src) {
        this._popupImage.src = src;
        this._popupImage.alt = name;
        this._popupTitle.textContent = name;
        super.open();
    }
}