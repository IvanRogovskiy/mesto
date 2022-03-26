export default class Card {

    constructor(name, imageSrc, id, likes, owner, templateSelector, handleCardClick, handleCardDelete, handleCardLike) {
        this._name = name;
        this._imageSrc = imageSrc;
        this._id = id;
        this._likes = likes;
        this._owner = owner;
        this._cardElement = this._getCardElement(templateSelector);
        this._handleCardClick = handleCardClick;
        this._cardImage = this._cardElement.querySelector('.place__image');
        this._handleCardDelete = handleCardDelete;
        this._handleCardLike = handleCardLike;
        this._likesCounter = this._cardElement.querySelector('.place__fav-counter');
    }

    _getCardElement(templateSelector) {
        return document.querySelector(templateSelector)
            .content
            .cloneNode(true)
    };

    _removeCard(evt) {
        evt.target.closest('.place').remove();
    };

    _updateLikesCounter(likesArray, evt) {
        this._likesCounter.textContent = likesArray.length
        evt.target.classList.toggle('place__fav_liked')
    };

    _setEventListeners(deletable) {
        if (deletable) {
            this._cardElement.querySelector('.place__delete').addEventListener('click', (evt) => {
                evt.preventDefault();
                this._handleCardDelete(this._id, evt, this);
            });
        }
        this._cardElement.querySelector('.place__fav').addEventListener('click', (evt) => {
            this._handleCardLike(this._id, evt, this)
        });
        this._cardImage.addEventListener('click', () => {
            this._handleCardClick(this._name, this._imageSrc);
        });
    }

    generateCard(deletable = false, liked) {
        this._cardElement.querySelector('.place__name').textContent = this._name;
        this._cardImage.src = this._imageSrc;
        this._cardImage.alt = `На фото изображен ${this._name}`;
        this._likesCounter.textContent = this._likes.length;
        if (liked) { this._cardElement.querySelector('.place__fav').classList.add('place__fav_liked') }
        if (!deletable) {
            this._cardElement.querySelector('.place').removeChild(this._cardElement.querySelector('.place__delete'));
            this._setEventListeners(false);
        } else {
            this._setEventListeners(true);
        }
        return this._cardElement;
    }
}
