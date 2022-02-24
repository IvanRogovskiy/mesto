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
        this._nameElement.textContent = name;
        this._rankElement.textContent = rank;
    }

    setUserId(userId) {
        this._userId = userId
    }

    getUserId() {
        return this._userId
    }
}