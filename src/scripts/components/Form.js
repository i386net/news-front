import validator from 'validator/es';
import errors from '../constants/errors';
import options from '../constants/validationOptions'

export default class Form {
  constructor(form) {
    this.form = form;
    this.button = this.form.querySelector('.popup__button');
    this._setEventListeners = this._setEventListeners.bind(this);
    this.form.addEventListener('input', this._setEventListeners);
    this.serverError = false;
    this.serverErrorElement = this.form.querySelector('.server-error');
  }
  _checkInputValidity(element) {
    const errorElement = element.nextElementSibling;
    if(element.name === 'email' && !validator.isEmail(element.value, options.email)) {
      errorElement.textContent = errors.email;
      this._activateError(errorElement);
      return false;
    }
    if(element.validity.valueMissing) {
     errorElement.textContent = errors.required;
     this._activateError(errorElement);
     return false;
    }
    if(element.validity.tooShort || element.validity.tooLong) {
      errorElement.textContent = errors.outOfRange(element);
      this._activateError(errorElement);
      return false
    }
    // if(element.name === 'search' && element.validity.valueMissing){
    //   console.log('searching!')
    //   return false
    // }
    this._resetError(errorElement);
    return true;
  }

  _activateError(element) {
    element.classList.add('error-message_is-opened');
  }

  renderServerError(error) {
    this.serverErrorElement.classList.add('error-message_is-opened');
    this.serverErrorElement.textContent = error;
    this.form.reset();
    this.buttonState(false);
    this.serverError = true;
  }

  _resetError(element) {
    if(this.serverError) {
      this.form
        .querySelector('.server-error')
        .classList
        .remove('error-message_is-opened');
    }
    element.classList.remove('error-message_is-opened');
  }

  reset() {
    this.form.querySelectorAll('.error-message_is-opened')
      .forEach(errorElement => {
        this._resetError(errorElement);
      });
    this.form.reset();
  }

  buttonState(validity) {
    if(this.button){
      if(!validity) {
        this.button.setAttribute('disabled','');
        this.button.classList.remove('button_state_active');
      } else {
        this.button.removeAttribute('disabled');
        this.button.classList.add('button_state_active');
      }
    }
  }

  _setEventListeners() {
    const inputs = Array.from(this.form.elements);
    let isValidForm = true;
    inputs.forEach(element => {
      if(!element.classList.contains('button')) {
        if(!this._checkInputValidity(element)) {
          isValidForm = false;
        }
      }
    });
    this.buttonState(isValidForm);
  }
}