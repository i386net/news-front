import BaseComponent from './BaseComponent';

export default class NewCard extends BaseComponent {
  constructor({cardData, api, session}) {
    super();
    this.cardData = cardData;
    this.api = api;
    this.session = session;
    this.card = document.createElement('div');
    this.bookmark = null;
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
            <button class="article__button article__button_type_mark"></button>
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
    this.tooltip = this.card.querySelector('.article__button_type_alert');
    this._setEventListeners();
    return this.card;
  }

  renderArticle() {

  }

  _save() {
    if (this.session.get().isLoggedIn === 'true') {
      this.api.createArticle(this.cardData)
        .then(() => {
          this.bookmark.style.backgroundImage = 'url(\'../images/marked.svg\')';
          this.bookmark.setAttribute('disabled','');
          this._clearListeners();
        })
        .catch((err) => console.log(err));
    }
  }

  _delete() {

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

  // _imgHandler(img) {
  // // todo remove this
  // //   console.log('!!!');
  // //   img.onerror = "";
  // //   img.src = "https://teploelement.ru/images/not_found.jpg";
  // //   return true;
  //   if (img === null) {
  //     return 'https://teploelement.ru/images/not_found.jpg';
  //   }
  //   const req = new XMLHttpRequest();
  //   req.open('GET', img);
  //   req.send();
  //   req.onload = () => {
  //     if(req.status != 200) {
  //       console.log('not 200')
  //       return 'https://teploelement.ru/images/not_found.jpg';
  //     } else {
  //       console.log('200')
  //       return img;
  //     }
  //   }
  // }

  _mouseOver() {
    if((this.session.get().isLoggedIn === 'false' ||
      this.session.get().isLoggedIn === null) &&
      window.innerWidth > 1439) {
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
    ])
  }


}