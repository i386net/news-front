import '../styles/articles.css';
import Header from './components/Header';
import MainApi from './api/MainApi';
import Session from './utils/Session';
import Info from './components/Info';
import NewsCardList from './components/NewsCardList';
import NewCard from './components/NewCard';
import dom from './constants/dom';
import copyrightDateHandler from './utils/copyrightDateHandler';
import '../styles/index.css';
import url from './constants/urls';

const session = new Session;
const api = new MainApi(url);
const header = new Header({headerArea: dom.headerArea, api, session, theme: 'light'});
const info = new Info({api, session, element: dom.infoElement});
const articlesGrid = new NewsCardList({cardsContainer: dom.articlesElement});

header.render(session.get().isLoggedIn, session.get().name);
copyrightDateHandler();
info.render();
dom.burgerButton.addEventListener('click', (e) => {
  e.preventDefault();
  dom.burgerButton.classList.toggle('burger-button_is-open');
  dom.mobileMenu.classList.toggle('menu_is-open');
})


if(session.get().isLoggedIn) {
  api.getArticles()
    .then(res => {
      const articles = res.data;
      articles.forEach(article => {
        const cardData = {
          keyword: article.keyword,
          title: article.title,
          image: article.image,
          date: article.date,
          text: article.text,
          link: article.link,
          source: article.source,
          id: article._id,
        }
        const card = new NewCard({cardData, api, session});
        articlesGrid.addCard(card.createSavedCard())
      });

    })
    .catch(err => console.log(err));
}


