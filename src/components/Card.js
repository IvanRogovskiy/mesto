export default class Card {

    constructor(name, imageSrc, id, templateSelector, handleCardClick, handleCardDelete) {
        this._name = name;
        this._imageSrc = imageSrc;
        this._id = id;
        this._cardElement = this._getCardElement(templateSelector);
        this._handleCardClick = handleCardClick;
        this._cardImage = this._cardElement.querySelector('.place__image');
        this._handleCardDelete = handleCardDelete;
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

    _setEventListeners(deletable) {
        if (deletable) {
            this._cardElement.querySelector('.place__delete').addEventListener('click', (evt) => {
                this._handleCardDelete(this._id);
                this._removeCard(evt)
            });
        }
        this._cardElement.querySelector('.place__fav').addEventListener('click', (evt) => {
            this._handleLike(evt)
        });
        this._cardImage.addEventListener('click', () => {
            this._handleCardClick(this._name, this._imageSrc);
        });
    }

    generateCard(deletable = false) {
        this._cardElement.querySelector('.place__name').textContent = this._name;
        this._cardImage.src = this._imageSrc;
        this._cardImage.alt = `На фото изображен ${this._name}`;
        if (!deletable) {
            this._cardElement.querySelector('.place').removeChild(this._cardElement.querySelector('.place__delete'));
            this._setEventListeners(false);
        } else {
            this._setEventListeners(true);
        }
        return this._cardElement;
    }
}
