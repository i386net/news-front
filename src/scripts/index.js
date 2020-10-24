import Popup from './components/Popup';
import NewsApi from './api/NewsApi';
import Header from './components/Header';
import MainApi from './api/MainApi';
import Session from './utils/Session';
import ButtonState from './utils/ButtonState';
import NewsCardList from './components/NewsCardList';
import NewCard from './components/NewCard';
import Form from './components/Form';
import dom from './constants/dom';
import params from './constants/newsParams';
import apiKey from './constants/apiKey';
import copyrightDate from './utils/copyright-date';
import '../styles/index.css';

const signupValidation = new Form(dom.signupForm);
const signinValidation = new Form(dom.loginForm);
const signinPopup = new Popup(dom.signinPopup, signinValidation);
const signupPopup = new Popup(dom.signupPopup, signupValidation);
const successPopup = new Popup(dom.successPopup);
const menu = document.querySelector('.menu');
let isLoggedIn = false;


dom.burgerButton.addEventListener('click', e => {
  e.preventDefault();
  dom.burgerButton.classList.toggle('burger-button_is-open');
  menu.classList.toggle('menu_is-open');
})
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
    .then(() => {
      signupPopup.close();
      successPopup.open();
    })
    .catch(err => {
      signupValidation.renderServerError(err);
    });
})
dom.signinLink
  .forEach(element => element.addEventListener('click', (e) => {
    e.preventDefault();
    signinPopup.open();
  }))

copyrightDate();
const url = {baseUrl: 'http://localhost:3000'};
const api = new MainApi(url);
const session = new Session;
const header = new Header({
  headerArea: dom.headerArea,
  popup: signinPopup,
  api,
  session
});

header.render(session.get().isLoggedIn, session.get().name);
// signinValidation.buttonState(false);
// const loginForm = document.querySelector('.popup__form_login');
dom.loginForm.addEventListener('submit', (e) => {
  e.preventDefault();
  const email = e.currentTarget.elements.email.value;
  const password = e.currentTarget.elements.password.value;
  api.signin({email, password})
    .then(res => {
      if(res.name) {
        isLoggedIn = true;
        session.save({ isLoggedIn, name: res.name });
        header.render(isLoggedIn, res.name);
        signinPopup.close();
      }
    })
    .catch(err => {
      signinValidation.renderServerError(err);
    });

})

const showMoreButtonState = new ButtonState(dom.showMoreButton);
const newsList = new NewsCardList({
  api,
  preloader: dom.preloader,
  notFoundContainer: dom.notFoundElement,
  cardsContainer: dom.articlesElement
})
const addCard = (articles, query) => {
  articles.splice(0,3).forEach( article => {
    const cardData = {
      keyword: query,
      title: article.title,
      image: article.urlToImage === null ? 'https://leeford.in/wp-content/uploads/2017/09/image-not-found.jpg': article.urlToImage,
      date: article.publishedAt,
      text: article.description,
      link: article.url,
      source: article.source.name,
    };
    const card = new NewCard({cardData, session, api});
    newsList.addCard(card.create());
  });
}
dom.searchForm.addEventListener('submit', (e) => {
  e.preventDefault();
  const query = e.target.elements.search.value;
  const news = new NewsApi({ query, params, apiKey });
  newsList.clearResult();
  showMoreButtonState.enable();
  news.getNews()
    .then(res => {
      const articles = res.articles;
      if(res.totalResults > 0) {
        addCard(articles, query);
      }
      newsList.renderResult(res.totalResults);
      dom.showMoreButton.addEventListener('click', () => {
        addCard(articles, query);
      });
      if(articles.length < 1) {
        showMoreButtonState.disable();
      } else {
        showMoreButtonState.enable();
      }
    })
    .catch(err => console.log(err))
    .finally(dom.preloader.classList.add('preloader_is-opened'));
})

//api new user

// api.getUserData()
//   .then(res => console.log('user data', res))
//   .catch(err => console.log('get user', err));


// api.getArticles()
//   .then(data => console.log(data))
//   .catch(err => console.log(err));

// api.removeArticle('5f7efae7b0a0cab25c5805d1')
//   .then(data => console.log(data))
//   .catch(err => console.log(err));


