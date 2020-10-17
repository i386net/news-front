import BaseComponent from './BaseComponent';

export default class Header extends  BaseComponent {
  constructor({headerArea, popup, api}) {
    super();
    this.headerArea = headerArea;
    this.popup = popup;
    this.api = api;
    this.button = document.createElement('button');
    this.isLoggedIn = null;
    this.name  = null;
  }


  render(isLoggedIn, name='') {
    this.name = name;
    this.isLoggedIn = isLoggedIn;
    this.button = this._renderButton(name);
    this.headerArea.querySelector('.auth-button')
      .insertAdjacentElement('beforeend', this.button);

    if(name) {
      this.headerArea.querySelector('.nav__main')
        .insertAdjacentHTML('afterend', this._addArticlesLink().nav);
      // this.menuLink.insertAdjacentHTML('afterend', this._addArticlesLink().menu);
    } else {
      this._removeArticlesLink();
    };
    if(name) {
      this.button.classList.add('logged-in')
    }
    this._setEventListeners();
  }

  _renderButton(name) {
    this.button.textContent = '';
    this.button.classList.add(
      'button',
      'button_theme_dark',
      'button_size_m',
      'nav__button'
    );
    this.button.insertAdjacentHTML('' +
      'beforeend',
      `
      <span class="auth-text">${name? name : 'Авторизоваться'}</span>
      <svg  class="button__ico ${name? '' : 'button__ico_is-hidden' }" width="24" height="24" viewBox="0 0 24 24" fill="#000" xmlns="http://www.w3.org/2000/svg">
        <path fill-rule="evenodd" clip-rule="evenodd" d="M10 6L6 6L6 18H10V20H6C4.89543 20 4 19.1046 4 18V6C4 4.89543 4.89543 4 6 4H10V6ZM17.5856 13L13.2927 17.1339L14.707 18.4958L21.4141 12.0371L14.707 5.57837L13.2927 6.9402L17.5856 11.0741H8V13H17.5856Z"/>
      </svg>
      `);
    return this.button;
  }

  _addArticlesLink () {
    return {
      nav: `
        <li class="nav__item articles-link">
            <a href="./articles.html" class="nav__link nav__link_theme_dark">Сохраненные статьи</a>
        </li>
      ` ,
      menu: `
        <li class="menu__item articles-link">
            <a href="./articles.html" class="menu__link">Сохраненные статьи</a>
        </li>
      `};
  }

  _removeArticlesLink () {
    this.headerArea.querySelectorAll('.articles-link').forEach(articlesLink => articlesLink.remove());
  }

  _setEventListeners() {
    this._setHandlers([
      {
        element: this.button,
        event: 'click',
        callback: () => {
          if(!this.button.classList.contains('logged-in')) {
            this.popup.open();
          }
        },
      },
      {
        element: this.button,
        event: 'click',
        callback: () => {
          if(this.button.classList.contains('logged-in')) {
            this.api.signout()
              .then(data => {
                if (data.status === 200) {
                  this.isLoggedIn = false;
                  this.render(this.isLoggedIn);
                  this.button.classList.remove('logged-in');
                  if(!window.location.pathname === '/') {
                    window.location.href = '/';
                  }
                } else {
                  return Promise.reject(new Error('При выходе произошла ошибка!'))
                }
              })
              .catch(err => console.log(err));
          }
        }
      }
    ]);

  }
}