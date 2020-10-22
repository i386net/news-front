export default class Session {
  constructor() {
    this.name = null;
    this.isLoggedIn = null
  }

  save({isLoggedIn, name}) {
    this.isLoggedIn = isLoggedIn;
    this.name = name;
    sessionStorage.setItem('isLoggedIn',this.isLoggedIn);
    sessionStorage.setItem('userName',this.name);
  }

  clear() {
    this.isLoggedIn = false;
    this.name = '';
    console.log('clear log', this.isLoggedIn);
    console.log('clear name', this.name);
    sessionStorage.setItem('isLoggedIn', this.isLoggedIn);
    sessionStorage.setItem('userName', this.name);
  }

  get() {
    return {
      isLoggedIn: sessionStorage.getItem('isLoggedIn'),
      name: sessionStorage.getItem('userName'),
    }
  }
}