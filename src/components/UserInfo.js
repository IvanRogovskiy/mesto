export default class UserInfo {

    constructor(nameSelector, rankSelector, avatarSelector) {
        this._nameElement = document.querySelector(nameSelector);
        this._rankElement = document.querySelector(rankSelector);
        this._userAvatar = document.querySelector(avatarSelector)
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

    setUserAvatar(avatar) {
        this._userAvatar.src = avatar;
    }

    setUserId(userId) {
        this._userId = userId
    }

    getUserId() {
        return this._userId
    }

}