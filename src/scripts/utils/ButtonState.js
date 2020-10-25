export default class ButtonState {
  constructor(button) {
    this._button = button;
  }

  disable() {
    this._button.setAttribute('disabled', '');
  }

  enable() {
    this._button.removeAttribute('disabled');
  }
};