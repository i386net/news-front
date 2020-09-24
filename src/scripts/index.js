import Popup from './components/Popup';
import NewsApi from './api/NewsApi';
// import Template from './templates/Template';
import { popup, header } from './constants/constants';
import '../styles/index.css';

const copyright = document.querySelector('.footer__copyright-container');

const signinPopup = new Popup(popup.signinPopup);
const signupPopup = new Popup(popup.signupPopup);
const menu = document.querySelector('.menu');
header.authButton.addEventListener('click', (e) => {
  e.preventDefault();
  signinPopup.open();
});
header.burgerButton.addEventListener('click', e => {
  e.preventDefault();
  header.burgerButton.classList.toggle('burger-button_is-open');
  menu.classList.toggle('menu_is-open');
})
popup.signupLink.addEventListener('click', (e) => {
  e.preventDefault();
  signupPopup.open();
});
popup.signinLink.addEventListener('click', (e) => {
  e.preventDefault();
  signinPopup.open();
});

//-------

const params = {
  language: 'ru',
  sortBy: 'publishedAt',
  pageSize: 100,
  page: 1
}
const query = 'Навальный';
const apiKey = '5c2ce186b39c4b5e900bf50fe947902d';

const news = new NewsApi({query, params, apiKey});
news.getNews()
  .then(res => console.log(res.articles))
  .catch(err => console.log(err));

// const formatDate = (date) => `${date.getFullYear()}-${date.getMonth()}-${date.getDate()}`;
copyright.textContent = `© ${new Date().getFullYear()} Supersite, Powered by News AP`;

//---
// const btn = document.querySelector('#signin')
// console.log(btn.textContent);
// btn.textContent = 'Name'