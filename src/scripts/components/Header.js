import BaseComponent from './BaseComponent';

export default class Header extends  BaseComponent {
  constructor({ headerArea, popup, api, session, theme }) {
    super();
    this._headerArea = headerArea;
    this._popup = popup;
    this._api = api;
    this._session = session;
    this._desktopButton = document.createElement('button');
    this._mobileAuthButton = document.querySelector('.menu__button');
    this._isLoggedIn = null;
    this._name  = null;
    this._theme = theme;
  }


  render(isLoggedIn, name='') {
    this._name = name;
    this._isLoggedIn = isLoggedIn;
    this._desktopButton = this._renderButton(name);
    this._renderMobileAuthButton(name);
    this._headerArea.querySelector('.auth-button')
      .insertAdjacentElement('beforeend', this._desktopButton);
    if(name) {
      this._headerArea.querySelector('.nav__main')
        .insertAdjacentHTML('afterend', this._addArticlesLink().nav);
      this._headerArea.querySelector('.menu__main')
        .insertAdjacentHTML('afterend', this._addArticlesLink().menu);
    } else {
      this._removeArticlesLink();
    }
    if(name) {
      this._desktopButton.classList.add('logged-in')
      this._mobileAuthButton.classList.add('logged-in');
    }
    this._setEventListeners();
  }

  _renderButton(name) {
    this._desktopButton.textContent = '';
    this._desktopButton.classList.add(
      'button',
      `button_theme_${this._theme}`,
      'button_size_m',
      'nav__button'
    );
    this._desktopButton.insertAdjacentHTML(
      'beforeend',
      `
      <span class="auth-text">${name? name : 'Авторизоваться'}</span>
      <svg  class="button__ico button__ico_theme_${this._theme} ${name? '' : 'button__ico_is-hidden' }" width="24" height="24" viewBox="0 0 24 24" fill="#000" xmlns="http://www.w3.org/2000/svg">
        <path fill-rule="evenodd" clip-rule="evenodd" d="M10 6L6 6L6 18H10V20H6C4.89543 20 4 19.1046 4 18V6C4 4.89543 4.89543 4 6 4H10V6ZM17.5856 13L13.2927 17.1339L14.707 18.4958L21.4141 12.0371L14.707 5.57837L13.2927 6.9402L17.5856 11.0741H8V13H17.5856Z"/>
      </svg>
      `);
    return this._desktopButton;
  }

  _renderMobileAuthButton(name) {
    this._mobileAuthButton
      .querySelector('.auth-text')
      .textContent = name? name : 'Авторизоваться';
    if(name) {
      this._mobileAuthButton
        .querySelector('.button__ico')
        .classList.remove('button__ico_is-hidden');
    } else {
      this._mobileAuthButton
        .querySelector('.button__ico')
        .classList.add('button__ico_is-hidden');
    }
  }

  _addArticlesLink () {
    return {
      nav: `
        <li class="nav__item articles-link">
            <a href="./articles.html" class="nav__link nav__link_theme_${this._theme}">Сохраненные статьи</a>
        </li>
      ` ,
      menu: `
        <li class="menu__item articles-link">
            <a href="./articles.html" class="menu__link">Сохраненные статьи</a>
        </li>
      `};
  }

  _removeArticlesLink () {
    this._headerArea.querySelectorAll('.articles-link').forEach(articlesLink => articlesLink.remove());
  }

  _logout(button) {
    if(button.classList.contains('logged-in')) {
      this._api.signout()
        .then(data => {
          if (data.status === 200) {
            this._session.clear();
            this._isLoggedIn = this._session.get().isLoggedIn;
            this.render(this._isLoggedIn);
            this._desktopButton.classList.remove('logged-in');
            this._mobileAuthButton.classList.remove('logged-in');
            window.location.href = '/';
          } else {
            return Promise.reject(new Error('При выходе произошла ошибка!'))
          }
        })
        .catch(err => console.log(err));
    }
  }

  _setEventListeners() {
    this._setHandlers([
      {
        element: this._desktopButton,
        event: 'click',
        callback: () => {
          if(!this._desktopButton.classList.contains('logged-in')) {
            this._popup.open();
          }
        },
      },
      {
        element: this._desktopButton,
        event: 'click',
        callback: () => this._logout(this._desktopButton),
      },
      {
        element: this._mobileAuthButton,
        event: 'click',
        callback: () => this._logout(this._mobileAuthButton),
      },
      {
        element: this._mobileAuthButton,
        event: 'click',
        callback: () => {
          if(!this._mobileAuthButton.classList.contains('logged-in')) {
            this._popup.open();
          }
        }
      }
    ]);
  }
}