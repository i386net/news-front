export default class Session {
  constructor() {
    this._name = null;
    this._isLoggedIn = null
  }

  save({isLoggedIn, name}) {
    this._isLoggedIn = isLoggedIn;
    this._name = name;
    sessionStorage.setItem('isLoggedIn',this._isLoggedIn);
    sessionStorage.setItem('userName',this._name);
  }

  clear() {
    this._isLoggedIn = '';
    this._name = '';
    sessionStorage.setItem('isLoggedIn', this._isLoggedIn);
    sessionStorage.setItem('userName', this._name);
  }

  get() {
    return {
      isLoggedIn: sessionStorage.getItem('isLoggedIn'),
      name: sessionStorage.getItem('userName'),
    }
  }
}