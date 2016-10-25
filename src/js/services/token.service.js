export default class TokenService {
    constructor (MyConfig, $window) {
        'ngInject';

        this._MyConfig = MyConfig;
        this._$window = $window;
    }

    save (token) {
        this._$window.localStorage[this._MyConfig.key] = token;
    }

    get () {
        return this._$window.localStorage[this._MyConfig.key];
    }

    destroy () {
        this._$window.localStorage.removeItem(this._MyConfig.key);
    }
}
