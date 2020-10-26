import validator from 'validator/es';
import errors from '../constants/errors';
import options from '../constants/validationOptions'

export default class Form {
  constructor(form) {
    this._form = form;
    this._button = this._form.querySelector('.popup__button');
    this._setEventListeners = this._setEventListeners.bind(this);
    this._form.addEventListener('input', this._setEventListeners);
    this._serverError = false;
    this._serverErrorElement = this._form.querySelector('.server-error');
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
    this._resetError(errorElement);
    return true;
  }

  _activateError(element) {
    element.classList.add('error-message_is-opened');
  }

  renderServerError(error) {
    this._serverErrorElement.classList.add('error-message_is-opened');
    this._serverErrorElement.textContent = error;
    this._form.reset();
    this.buttonState(false);
    this._serverError = true;
  }

  _resetError(element) {
    if(this._serverError) {
      this._form
        .querySelector('.server-error')
        .classList
        .remove('error-message_is-opened');
    }
    element.classList.remove('error-message_is-opened');
  }

  reset() {
    this._form.querySelectorAll('.error-message_is-opened')
      .forEach(errorElement => {
        this._resetError(errorElement);
      });
    this._form.reset();
  }

  buttonState(validity) {
    if(this._button){
      if(!validity) {
        this._button.setAttribute('disabled','');
        this._button.classList.remove('button_state_active');
      } else {
        this._button.removeAttribute('disabled');
        this._button.classList.add('button_state_active');
      }
    }
  }

  _setEventListeners() {
    const inputs = Array.from(this._form.elements);
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