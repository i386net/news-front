export default class Info {
  constructor({element, api, session}) {
    this._element = element;
    this._api = api;
    this._session = session;
    this._title = this._element.querySelector('.title');
    this._keywords = this._element.querySelector('.keywords');
  }

  render() {
    if(!this._session.get().name) {
      this._title.textContent = 'У вас нет сохраненных статей';
      this._keywords.classList.add('keywords_is-hidden');
    } else {
      this._api.getArticles()
        .then(res => {
          const keywords = this._parseKeywords(res.data);
          if(keywords.length === 0) {
            this._keywords.classList.add('keywords_is-hidden');
          }
          const name = this._formatName(this._session.get().name);
          this._title.textContent = `${name}, у вас ${res.data.length > 0? res.data.length: "нет"} сохраненных статей`;
          if( keywords.length >= 1 ) {
            this._keywords.textContent = '';
            this._keywords.insertAdjacentHTML('beforeend',`
            По ключевым словам:
                 <span class="keywords__list info__text info__text_emphasized">
                    ${this._getRandomKeywords(keywords)}
                 </span>
                    и
                 <span class="keywords__counter info__text info__text_emphasized">
                    ${keywords.length} другим
                 </span>
            `);
          }
        })
        .catch(err => console.log(err))
    }
  }

  _parseKeywords(articles) {
    const keywords = [];
    articles.forEach(article => {
      if(!keywords.includes(article.keyword)) {
        keywords.push(article.keyword);
      }
    })
    return keywords;
  }
  _getRandomKeywords(keywords) {
    const mixedKeywords = keywords.sort(() => 0.5 - Math.random());
    return mixedKeywords.splice(0, 2).join(', ');
  }

  _formatName(name) {
    return name[0].toUpperCase() + name.slice(1);
  }
}