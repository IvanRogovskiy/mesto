export default class Section {

    constructor({renderer}, containerSelector) {
        this._renderer = renderer;
        this._container = document.querySelector(containerSelector);
    }

    clear() {
        this._container.innerHTML = '';
    }

    renderItems(items) {
        this.clear();
        items.forEach(item => {
            this._renderer(item);
        });
    };

    // Можно было бы сделать функцию renderer обычной функцией создания карточки (без вставки ее в DOM)
    // Я не понял, где я в renderer вставляют карточку в DOM
    addItem(element) {
        this._container.prepend(element);
    }
}