import BaseComponent from './BaseComponent';

export default class Popup extends BaseComponent {
  constructor({popup, form}) {
    super();
    this._popup = popup;
    this._closeButton = this._popup.querySelector('.popup__close');
    this._form = form;
    this._close = this._close.bind(this);
  }

  _setEventListeners() {
    this._setHandlers([
      {
        element: this._closeButton,
        event: 'click',
        callback: (e) => this._close(e),
      },
      {
        element: document,
        event: 'keydown',
        callback: (e) => this._close(e),
      },
      {
        element: this._popup,
        event: 'click',
        callback: (e) => this._close(e),
      },
    ]);
  }

  open() {
    this._popup.classList.add('popup_is-opened');
    this._setEventListeners();
  }

  close() {
    this._closeHandler();
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
    if(this._form) {
      this._form.reset();
    }
    this._clearListeners();
  }

}