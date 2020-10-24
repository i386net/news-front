import BaseComponent from './BaseComponent';

export default class NewCard extends BaseComponent {
  constructor({cardData, api, session}) {
    super();
    this.cardData = cardData;
    this.api = api;
    this.session = session;
    this.card = document.createElement('div');
    this.bookmark = null;
    this.bookmarkIcon = null;
    this.trashcan = null;
    this.tooltip = null;
  }

  create() {
    this.card.classList.add('article');
    this.card.insertAdjacentHTML('beforeend', `
      <img
      src="${this.cardData.image}"
      alt="${this.cardData.title}"
      class="article__img"
      >
          <div class="article__button-container">
            <div class="article__button article__button_type_alert">
              <p class="article__tooltip">Войдите, чтобы сохранить статьи</p>
            </div>
            <button class="article__button article__button_type_mark">
                <svg class="article__bookmark" width="14" height="19" fill="none" stroke="#B6BCBF" xmlns="http://www.w3.org/2000/svg">
                    <path d="M6.382 12.714L1 16.942V1h12v15.942l-5.382-4.228L7 12.228l-.618.486z"  stroke-width="2"/>
                </svg>
            </button>
          </div>
          <div class="article__text-container">
            <p class="article__date">${this._dateHandler(this.cardData.date)}</p>
            <h3 class="title title_size_s article__title">${this.cardData.title}</h3>
            <p class="article__text">
              ${this.cardData.text}
            </p>
            <a href="${this.cardData.link}" target="_blank" class="title title_size_xs article__link">${this.cardData.source}</a>
          </div>
    `);
    this.bookmark = this.card.querySelector('.article__button_type_mark');
    this.bookmarkIcon = this.card.querySelector('.article__bookmark');
    this.tooltip = this.card.querySelector('.article__button_type_alert');
    this._setEventListeners();
    return this.card;
  }

  createSavedCard() {
    this.card.classList.add('article');
    this.card.insertAdjacentHTML('beforeend',
      `
      <img src="${this.cardData.image}" alt="${this.cardData.title}" class="article__img">
          <div class="article__button-container">
            <div class="article__button article__button_type_alert">
              <p class="article__tooltip">Убрать из сохранённых</p>
            </div>
            <div class="article__button article__button_type_trash"></div>
          </div>
          <p class="article__tag">
            ${this.cardData.keyword}
          </p>
          <div class="article__text-container">
            <p class="article__date">${this.cardData.date}</p>
            <h3 class="title title_size_s article__title">${this.cardData.title}</h3>
            <p class="article__text">
              ${this.cardData.text}
            </p>
            <a href="" class="title title_size_xs article__link">${this.cardData.source}</a>
          </div>
      `);
    this.trashcan = this.card.querySelector('.article__button_type_trash');
    this.tooltip = this.card.querySelector('.article__button_type_alert');
    this._setEventListeners();
    return this.card;
  }

  _save() {
    if (this.session.get().isLoggedIn === 'true') {
      this.api.createArticle(this.cardData)
        .then(() => {
          this.bookmarkIcon.style.fill = '#2F71E5';
          this.bookmarkIcon.style.stroke = '#2F71E5';
          this.bookmark.setAttribute('disabled','');
          this._clearListeners();
        })
        .catch((err) => console.log(err));
    }
  }

  _delete() {
    const result = confirm('Удалить статью?');
    if (result) {
      this.api.removeArticle(this.cardData.id)
        .then(() => {
          this._clearListeners();
          this.card.remove();
        })
        .catch(err => console.log(err));
    }
  }

  _dateHandler(dateString) {
      const options = {
        day: 'numeric',
        month: 'long',
        year: 'numeric',
      };
      let outputDate = (new Date(dateString)).toLocaleDateString('ru', options);
      outputDate = outputDate.slice(0, -3).split(' ')
      outputDate[1] = outputDate[1] + ',';
      return outputDate.join(' ');
  }

  _mouseOver() {
    if(this.session.get().isLoggedIn &&
      window.innerWidth > 1439) {
      this.tooltip.style.display = 'flex';
      setTimeout(() => this.tooltip.style.display = "none", 900);
    }
    if(window.location.pathname === '/articles.html') {
      this.tooltip.style.display = 'flex';
      setTimeout(() => this.tooltip.style.display = "none", 900);
    }
    if(window.innerWidth <= 1439) {
      this.tooltip.style.display = "none";
    }
  }

  _setEventListeners() {
    this._setHandlers([
      {
        element: this.bookmark,
        event: 'mouseover',
        callback: () => this._mouseOver(),
      },
      {
        element: this.bookmark,
        event: 'click',
        callback: () => this._save(),
      },
      {
        element: this.trashcan,
        event: 'click',
        callback: () => this._delete(),
      },
      {
        element: this.trashcan,
        event: 'mouseover',
        callback: () => this._mouseOver(),
      },
    ])
  }


}