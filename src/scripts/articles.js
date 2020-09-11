import '../styles/articles.css';

const copyright = document.querySelector('.footer__copyright-container');
const menu = document.querySelector('.menu');
// const menuButton = document.querySelector('.menu__button');
const burgerButton = document.querySelector('.burger-button');

copyright.textContent = `© ${new Date().getFullYear()} Supersite, Powered by News AP`;

burgerButton.addEventListener('click', evt => {
  evt.preventDefault();
  burgerButton.classList.toggle('burger-button_is-open');
  menu.classList.toggle('menu_is-open');
})