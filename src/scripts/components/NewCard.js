import BaseComponent from './BaseComponent';

export default class NewCard extends BaseComponent {
  constructor({cardData, api, session}) {
    super();
    this._cardData = cardData;
    this._api = api;
    this._session = session;
    this._card = document.createElement('div');
    this._bookmark = null;
    this._bookmarkIcon = null;
    this._trashcan = null;
    this._tooltip = null;
  }

  create() {
    this._card.classList.add('article');
    this._card.insertAdjacentHTML('beforeend', `
      <img
      src="${this._cardData.image}"
      alt="${this._cardData.title}"
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
            <p class="article__date">${this._dateHandler(this._cardData.date)}</p>
            <h3 class="title title_size_s article__title">${this._cardData.title}</h3>
            <p class="article__text">
              ${this._cardData.text}
            </p>
            <a href="${this._cardData.link}" target="_blank" class="title title_size_xs article__link">${this._cardData.source}</a>
          </div>
    `);
    this._bookmark = this._card.querySelector('.article__button_type_mark');
    this._bookmarkIcon = this._card.querySelector('.article__bookmark');
    this._tooltip = this._card.querySelector('.article__button_type_alert');
    this._setEventListeners();
    return this._card;
  }

  createSavedCard() {
    this._card.classList.add('article');
    this._card.insertAdjacentHTML('beforeend',
      `
      <img src="${this._cardData.image}" alt="${this._cardData.title}" class="article__img">
          <div class="article__button-container">
            <div class="article__button article__button_type_alert">
              <p class="article__tooltip">Убрать из сохранённых</p>
            </div>
            <div class="article__button article__button_type_trash"></div>
          </div>
          <p class="article__tag">
            ${this._cardData.keyword}
          </p>
          <div class="article__text-container">
            <p class="article__date">${this._cardData.date}</p>
            <h3 class="title title_size_s article__title">${this._cardData.title}</h3>
            <p class="article__text">
              ${this._cardData.text}
            </p>
            <a href="" class="title title_size_xs article__link">${this._cardData.source}</a>
          </div>
      `);
    this._trashcan = this._card.querySelector('.article__button_type_trash');
    this._tooltip = this._card.querySelector('.article__button_type_alert');
    this._setEventListeners();
    return this._card;
  }

  _save() {
    if (this._session.get().isLoggedIn === 'true') {
      this._api.createArticle(this._cardData)
        .then(() => {
          this._bookmarkIcon.style.fill = '#2F71E5';
          this._bookmarkIcon.style.stroke = '#2F71E5';
          this._bookmark.setAttribute('disabled','');
          this._clearListeners();
        })
        .catch((err) => console.log(err));
    }
  }

  _delete() {
    const result = confirm('Удалить статью?');
    if (result) {
      this._api.removeArticle(this._cardData.id)
        .then(() => {
          this._clearListeners();
          this._card.remove();
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
    if(!this._session.get().isLoggedIn &&
      window.innerWidth > 1439) {
      this._tooltip.style.display = 'flex';
      setTimeout(() => this._tooltip.style.display = "none", 900);
    }
    if(window.location.pathname === '/articles.html') {
      this._tooltip.style.display = 'flex';
      setTimeout(() => this._tooltip.style.display = "none", 900);
    }
    if(window.innerWidth <= 1439) {
      this._tooltip.style.display = "none";
    }
  }

  _setEventListeners() {
    this._setHandlers([
      {
        element: this._bookmark,
        event: 'mouseover',
        callback: () => this._mouseOver(),
      },
      {
        element: this._bookmark,
        event: 'click',
        callback: () => this._save(),
      },
      {
        element: this._trashcan,
        event: 'click',
        callback: () => this._delete(),
      },
      {
        element: this._trashcan,
        event: 'mouseover',
        callback: () => this._mouseOver(),
      },
    ])
  }


}