import Popup from './classes/Popup';
import '../styles/index.css';

(function () {
  const copyright = document.querySelector('.footer__copyright-container');

  const signinElement = document.querySelector('.popup_type_signin');
  const authButton = document.querySelector('#signin');
  const signinPopup = new Popup(signinElement);
  authButton.addEventListener('click', ((evt) => {
    evt.preventDefault();
    signinPopup.open();
  }));

  const signupElement = document.querySelector('.popup_type_signup');
  const signupPopup = new Popup(signupElement);


  const mobileMenuSignin = document.querySelector('.menu__button');
  mobileMenuSignin.addEventListener('click', evt => {
    evt.preventDefault();
    signinPopup.open();
  })


  const registeredElement = document.querySelector('.popup_type_registered');

  const registerButton = document.querySelector('.popup__link_type_reg');
  const loginButton = document.querySelector('.popup__link_type_login');
  const regButton = document.querySelector('#register');
  const burgerButton = document.querySelector('.burger-button');
  const menu = document.querySelector('.menu');




  const registeredPopup = new Popup(registeredElement);




  burgerButton.addEventListener('click', evt => {
    evt.preventDefault();
    burgerButton.classList.toggle('burger-button_is-open');
    menu.classList.toggle('menu_is-open');
  })


  registerButton.addEventListener('click', (evt) => {
    evt.preventDefault();
    signinPopup.close(evt);
    signupPopup.open();
  })
  loginButton.addEventListener('click', (evt => {
    evt.preventDefault();
    signupPopup.close(evt);
    signinPopup.open();
  }))
  regButton.addEventListener('click', evt => {
    evt.preventDefault();
    signupPopup.close(evt);
    registeredPopup.open();

  })

  copyright.textContent = `© ${new Date().getFullYear()} Supersite, Powered by News AP`;

})();
