import BaseComponent from './BaseComponent';

export default class Popup extends BaseComponent {
  constructor(popup) {
    super();
    this._popup = popup;
    this._closeButton = this._popup.querySelector('.popup__close');
    this._form = this._popup.querySelector('.popup__form');
    this._close = this._close.bind(this);
    // this.root = document.querySelector('.root');
    // this._popupTemplate = `<div class="popup__content">
    //   <picture>
    //     <source srcset="<%=require('../images/mobile-close.svg').default%>" media="(max-width: 500px)">
    //     <img src="<%=require('../images/close.svg').default%>" alt="" class="popup__close popup__close_type_signin"/>
    //   </picture>
    //
    //   <h3 class="popup__title">Вход</h3>
    //   <form class="popup__form popup__form_login" name="signin" novalidate>
    //     <span class="popup__subtitle">Email</span>
    //     <input
    //       type="email"
    //       name="email"
    //       id="signin-email"
    //       class="popup__input popup__input_type_email"
    //       placeholder="Введите почту"
    //       required
    //     />
    //     <span class="error-message error-message_is-opened">Неправильный формат email</span>
    //     <span class="popup__subtitle">Пароль</span>
    //     <input
    //       type="password"
    //       name="password"
    //       id="signin-password"
    //       class="popup__input popup__input_type_password"
    //       placeholder="Введите пароль"
    //       required
    //     />
    //     <span class="error-message error-message_is-opened">Неправильный формат пароля</span>
    //     <button type="submit" class="button button_size_xl button_state_active popup__button">Войти</button>
    //     <p class="popup__text">или <a href="#" class="popup__link popup__link_type_reg">Зарегистрироваться</a></p>
    //   </form>
    // </div>`;
  }

  _setEventListeners() {
    this._setHandlers([
      {
        element: this._closeButton,
        event: 'click',
        callback: e => this._close(e),
      },
      {
        element: document,
        event: 'keydown',
        callback: e => this._close(e),
      },
      {
        element: this._popup,
        event: 'click',
        callback: e => this._close(e),
      },
      // {
      //   element: this._popup.querySelector('.popup__link'),
      //   event: 'click',
      //   callback: e => this._close(e),
      // }
    ]);
    // if (this._popup.querySelector('.popup__link')) {
    //   const regButton = this._popup.querySelector('.popup__link');
    //   regButton.addEventListener('click', (e) => {
    //     e.preventDefault();
    //     console.log('11111');
    //   });
    // }
  }

  open() {
    // this._createPopup();
    // this._closeButton = this._popup.querySelector('.popup__close');
    // console.log(this._closeButton)
    // this._form = this._popup.querySelector('.popup__form');
    // console.log(this._form);
    this._popup.classList.add('popup_is-opened');
    this._setEventListeners();
  }

  _close(event) {
    if (event.type === 'click') {
      if(event.target === this._closeButton || event.target === this._popup) {
        this._closeHandler();
      }
    }
    if (event.type === 'keydown' && event.key === 'Escape') {
      this._closeHandler();
    }
    if (event.target.classList.contains('popup__link')) {
      this._closeHandler();
    }
  }

  _closeHandler() {
    this._popup.classList.remove('popup_is-opened');
    this._form.reset();
    this._clearListeners();
    // this._clearPopup();
    // this._popup.remove();
    // this._popup.parentNode.removeChild(this._popup);
  }

  // _createTemplate() {
  //   this.template = document.createElement('div');
  //   this.template.classList.add('popup');
  //   this.template.insertAdjacentHTML('beforeend', this._popupTemplate);
  //
  //   return this.template;
  // }

  // _createPopup() {
  //   this._popup = this._createTemplate();
  //   this.root.append(this._popup);
  // }

  // _clearPopup() {
  //   this.root.removeChild(this._popup);
  // }

}