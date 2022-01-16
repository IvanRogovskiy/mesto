export default class Card {

    constructor(name, imageSrc, templateSelector, handleCardClick) {
        this._name = name;
        this._imageSrc = imageSrc;
        this._cardElement = this._getCardElement(templateSelector);
        this._handleCardClick = handleCardClick;
        this._cardImage = this._cardElement.querySelector('.place__image');
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

    _setEventListeners() {
        this._cardElement.querySelector('.place__delete').addEventListener('click', (evt) => {
            this._removeCard(evt)
        });
        this._cardElement.querySelector('.place__fav').addEventListener('click', (evt) => {
            this._handleLike(evt)
        });
        this._cardImage.addEventListener('click', () => {
            this._handleCardClick(this._name, this._imageSrc);
        });
    }

    generateCard() {
        this._cardElement.querySelector('.place__name').textContent = this._name;
        this._cardImage.src = this._imageSrc;
        this._cardImage.alt = `На фото изображен ${this._name}`;
        this._setEventListeners();
        return this._cardElement;
    }
}
