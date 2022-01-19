export default class UserInfo {

    constructor(nameSelector, rankSelector) {
        this._nameElement = document.querySelector(nameSelector);
        this._rankElement = document.querySelector(rankSelector);
    }

    getUserInfo() {
        return {
            name: this._nameElement.textContent,
            rank: this._rankElement.textContent
        }
    }

    setUserInfo(name, rank) {
        this._nameElement.value = name;
        this._rankElement.value = rank;
    }
}