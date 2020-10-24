export default class NewsCardList {
  constructor({ cardsContainer, notFoundContainer, preloader }) {
   // this.api = api;
   this.cardsContainer = cardsContainer;
   this.notFoundContainer = notFoundContainer;
   this.preloader = preloader;
   this.cardsGrid = this.cardsContainer.querySelector('.articles__grid');
  }
  clearResult() {
    this.notFoundContainer.classList.remove('not-found_is-opened');
    this.preloader.classList.remove('preloader_is-opened');
    this.cardsContainer.classList.remove('articles_is-opened');
    this.cardsGrid.textContent = '';
  }

  renderResult(result) {
    if(result === 0) {
      this.notFoundContainer.classList.add('not-found_is-opened');
      this.cardsContainer.classList.remove('articles_is-opened');
    } else {
      this.notFoundContainer.classList.remove('not-found_is-opened');
      this.cardsContainer.classList.add('articles_is-opened');
    }
    this.preloader.classList.remove('preloader_is-opened');
  }

  addCard(card) {
   this.cardsGrid.append(card);
  }
}