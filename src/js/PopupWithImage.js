import Popup from "./Popup";

export default class PopupWithImage extends Popup {

    constructor(selector, { data }) {
        super(selector);
        this._src = data.src;
        this._name = data.title;
        this._popupImage = this._popup.querySelector('.popup__container-full-image');
        this._popupTitle = this._popup.querySelector('.popup__container-full-name');
    }

    open() {
        this._popupImage.src = this._src;
        this._popupTitle.textContent = this._name;
        super.open();
    }
}