// export default todo uncomment for prod
class Popup  {
  constructor(popup) {
    this.popup = popup;
    this.closeButton = this.popup.querySelector('.popup__close');
    this.open = this.open.bind(this);
    this.close = this.close.bind(this);
  }

  open() {
    this.popup.classList.add('popup_is-opened');
    document.addEventListener('keydown', this.close);
    this.popup.addEventListener('click', this.close);
  }

  closeHandling() {
    this.popup.classList.remove('popup_is-opened');
    document.removeEventListener('keydown', this.close);
    this.popup.removeEventListener('click', this.close);
  }

  close(event) {
    if (event.type === 'keydown' && event.key === 'Escape') {
      this.closeHandling();
    }
    if (event.type === 'click') {
      if (event.target.classList.contains('popup_is-opened') || event.target === this.closeButton || event.target.classList.contains('popup__link')) {
        this.closeHandling();
      }
    }
    if (event.type === 'submit') {
      this.closeHandling();
    }
    // this.closeHandling()
  }

}