export default class NewsCardList {
  constructor({ cardsContainer, notFoundContainer, preloader }) {
   this._cardsContainer = cardsContainer;
   this._notFoundContainer = notFoundContainer;
   this._preloader = preloader;
   this._cardsGrid = this._cardsContainer.querySelector('.articles__grid');
  }
  clearResult() {
    this._notFoundContainer.classList.remove('not-found_is-opened');
    this._preloader.classList.remove('preloader_is-opened');
    this._cardsContainer.classList.remove('articles_is-opened');
    this._cardsGrid.textContent = '';
  }

  renderResult(result) {
    if(result === 0) {
      this._notFoundContainer.classList.add('not-found_is-opened');
      this._cardsContainer.classList.remove('articles_is-opened');
    } else {
      this._notFoundContainer.classList.remove('not-found_is-opened');
      this._cardsContainer.classList.add('articles_is-opened');
    }
    this._preloader.classList.remove('preloader_is-opened');
  }

  addCard(card) {
   this._cardsGrid.append(card);
  }
}