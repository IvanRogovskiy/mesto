export default class Api {
    // const api = new Api({
    //     baseUrl: 'https://mesto.nomoreparties.co/v1/cohort-42',
    //     headers: {
    //         authorization: 'c56e30dc-2883-4270-a59e-b2f7bae969c6',
    //         'Content-Type': 'application/json'
    //     }
    // });

    constructor({baseUrl, headers}) {
        this._baseUrl = baseUrl;
        this._headers = headers;
    }

    getMyProfileInfo() {
        return fetch(`${this._baseUrl}/users/me`, {
            headers:this._headers
        })
            .then(res => {
                if (res.ok) {
                    return res.json()
                }
                return Promise.reject(`Ошибка ${res.status}`)
            })
    }

}