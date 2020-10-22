export default class ButtonState {
  constructor(button) {
    this.button = button;
  }

  disable() {
    this.button.setAttribute('disabled', '');
  }

  enable() {
    this.button.removeAttribute('disabled');
  }
};