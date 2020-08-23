// import Popup from './classes/Popup'; todo uncomment for prod
// import '../styles/index.css';

(function () {
  const copyright = document.querySelector('.footer__copyright-container');
  const loginElement = document.querySelector('.popup_type_login');
  const signupElement = document.querySelector('.popup_type_reg');
  const signedupElement = document.querySelector('.popup_type_reged');
  const authButton = document.querySelector('#signin');
  const registerButton = document.querySelector('.popup__link_type_reg');
  const loginButton = document.querySelector('.popup__link_type_login');
  const regButton = document.querySelector('#register');
  const burgerButton = document.querySelector('.burger-button');
  const menu = document.querySelector('.menu');
  const menuButton = document.querySelector('.menu__button');

  const loginPopup = new Popup(loginElement);
  const signupPopup = new Popup(signupElement);
  const signedupPopup = new Popup(signedupElement);

  menuButton.addEventListener('click', evt => {
    evt.preventDefault();
    loginPopup.open();
  })


  burgerButton.addEventListener('click', evt => {
    evt.preventDefault();
    burgerButton.classList.toggle('burger-button_is-open');
    menu.classList.toggle('menu_is-open');
  })

  authButton.addEventListener('click', ((evt) => {
    evt.preventDefault();
    loginPopup.open();
  }));
  registerButton.addEventListener('click', (evt) => {
    evt.preventDefault();
    loginPopup.close(evt);
    signupPopup.open();
  })
  loginButton.addEventListener('click', (evt => {
    evt.preventDefault();
    signupPopup.close(evt);
    loginPopup.open();
  }))
  regButton.addEventListener('click', evt => {
    console.log(evt);
    evt.preventDefault();
    signupPopup.close(evt);
    signedupPopup.open();

  })

  copyright.textContent = `© ${new Date().getFullYear()} Supersite, Powered by News AP`;

})();
