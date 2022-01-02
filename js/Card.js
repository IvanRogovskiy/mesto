import {openPopup} from "./script.js";

export default class Card {

    constructor(name, imageSrc, templateSelector) {
        this._name = name;
        this._imageSrc = imageSrc;
        this._cardElement = this._getCardElement(templateSelector);
    }

    _getCardElement(templateSelector) {
        return document.querySelector(templateSelector)
            .content
            .cloneNode(true)
    };

    _removeCard(evt) {
        evt.target.closest('.place').remove();
    };

    _handleLike(evt) {
        evt.target.classList.toggle('place__fav_liked')
    };

    _showFullImage(evt) {
        const placeImageFullImage = document.querySelector('.popup__container-full-image');
        const placeImageFullName = document.querySelector('.popup__container-full-name');
        placeImageFullImage.src = evt.target.src;
        placeImageFullImage.alt = evt.target.alt;
        placeImageFullName.textContent = this._name;
        const popupFull = document.querySelector('.popup_type_full');
        openPopup(popupFull);
    }

    _setEventListeners() {
        this._cardElement.querySelector('.place__delete').addEventListener('click', (evt) => {
            this._removeCard(evt)
        });
        this._cardElement.querySelector('.place__fav').addEventListener('click', (evt) => {
            this._handleLike(evt)
        });
        this._cardElement.querySelector('.place__image').addEventListener('click', (evt) => {
            this._showFullImage(evt);
        });
    }

    generateCard() {
        this._cardElement.querySelector('.place__name').textContent = this._name;
        const placeImage = this._cardElement.querySelector('.place__image');
        placeImage.src = this._imageSrc;
        placeImage.alt = `На фото изображен ${this._name}`;
        this._setEventListeners();
        return this._cardElement;
    }
}
