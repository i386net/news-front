import Popup from './components/Popup';
import NewsApi from './api/NewsApi';
import Header from './components/Header';
import MainApi from './api/MainApi';
import dom from './constants/dom';
import '../styles/index.css';

const copyright = document.querySelector('.footer__copyright-container');

const signinPopup = new Popup(dom.signinPopup);
const signupPopup = new Popup(dom.signupPopup);
const successPopup = new Popup(dom.successPopup);
const menu = document.querySelector('.menu');



// dom.burgerButton.addEventListener('click', e => {
//   e.preventDefault();
//   dom.burgerButton.classList.toggle('burger-button_is-open');
//   menu.classList.toggle('menu_is-open');
// })
dom.signupLink.addEventListener('click', (e) => {
  e.preventDefault();
  signupPopup.close();
  signupPopup.open();
});
dom.signupForm.addEventListener('submit', (e) => {
  e.preventDefault();
  const credentials = {
    email: e.target.elements.email.value,
    password: e.target.elements.password.value,
    name: e.target.elements.name.value,
  }
  api.signup(credentials)
    .then(res => {
      signupPopup.close();
      successPopup.open();
    })
    .catch(err => console.log(err));
})
dom.signinLink
  .forEach(element => element.addEventListener('click', (e) => {
    e.preventDefault();
    signinPopup.open();
  }))

//-------

let isLoggedIn = false;
// news api params
const params = {
  language: 'ru',
  sortBy: 'publishedAt',
  pageSize: 100,
  page: 1
}
const query = 'Навальный';
const apiKey = '5c2ce186b39c4b5e900bf50fe947902d';

const news = new NewsApi({query, params, apiKey});
// news.getNews()
//   .then(res => console.log(res.articles))
//   .catch(err => console.log(err));

// const formatDate = (date) => `${date.getFullYear()}-${date.getMonth()}-${date.getDate()}`;
copyright.textContent = `© ${new Date().getFullYear()} Supersite, Powered by News AP`;

//---
const url = {baseUrl: 'http://localhost:3000'};
const api = new MainApi(url);
const header = new Header({
  headerArea: dom.headerArea,
  popup: signinPopup,
  api
});
//

isLoggedIn = false
header.render(isLoggedIn);

const loginForm = document.querySelector('.popup__form_login');
loginForm.addEventListener('submit', (e) => {
  e.preventDefault();
  const email = e.currentTarget.elements.email.value;
  const password = e.currentTarget.elements.password.value;
  api.signin({email, password})
    .then(res => {
      if(res.name) {
        isLoggedIn = true;
        header.render(isLoggedIn, res.name);
        signinPopup.close();
      }
    })
    .catch(err => console.log(err));

})

// if(document.querySelector('.loggedin')) {
//   document.querySelector('.loggedin')
//     .addEventListener('click', (e) => {
//       e.preventDefault();
//       console.log(e);
//       api.signout()
//         .then(res => {
//           if(res.status === 200) {
//             header.logout();
//           } else {
//             return Promise.reject(new Error('При выходе произошла ошибка!'));
//           }
//         })
//         .catch(err => console.log(err));
//     })
// }
//api new user

// api.signup({name: 'test-name', email: 'email3@testemail.com', password: 'Efkjds12k323'})
// .then(res => console.log(res))
// .catch(err => console.log('error', err));

// api.signin({email: 'email2@testemail.com', password: 'Efkjds12k323'})
//   .then(res => {
//     if (res.name) {
//      isLoggedIn = true;
//      // header.render({isLoggedIn, name:res.name});
//     }
//   })
//   .catch(err => console.log(err));

// api.getUserData()
//   .then(res => console.log('user data', res))
//   .catch(err => console.log('get user', err));

// api.createArticle({
//   keyword: "test1",
//   title: "title1",
//   text: "text1 text1 text1",
//   link: "http://ya.me/article.html",
//   date: "date",
//   source: "source1",
//   image: "http://ya.ru/img.jpeg"
// })
// .then(res => console.log(res))
// .catch(err => console.log(err));

// api.getArticles()
//   .then(data => console.log(data))
//   .catch(err => console.log(err));

// api.removeArticle('5f7efae7b0a0cab25c5805d1')
//   .then(data => console.log(data))
//   .catch(err => console.log(err));



// api.signout()
//   .then(data => {
//     if (data.status === 200) {
//       // isLoggedIn = false
//       // header.render({isLoggedIn, name: ''});
//       header.logout();
//     } else {
//
//       return Promise.reject(new Error('При выходе произошла ошибка!'));
//     }
//
//     // window.location.href = '/articles.html';
//   })
//   .catch(err => console.log(err));

