export default class NewsApi {
  constructor({query, params, apiKey}) {
    ({
      language: this._language,
      sortBy: this._sortBy,
      pageSize: this._pageSize
    } = params);
    this._apiKey = apiKey;
    this._query = query;
    this._url = 'https://nomoreparties.co/news/v2/everything?';
  }
  getNews() {
    this._url = this._url
      + `apiKey=${this._apiKey}&`
      + `q=${this._query}&`
      + `from=${this._getDate().from}&`
      + `to=${this._getDate().to}&`
      + `language=${this._language}&`
      + `sortBy=${this._sortBy}&`
      + `pageSize=${this._pageSize}`;
    return fetch(this._url, {
      method: 'GET',
    })
      .then(res => {
        if(!res.ok) {
          return Promise.reject(new Error(res.status))
        }
        return res.json();
      })
      .catch(err => Promise.reject(err))
  }

  _getDate() {
    const initialDate = () => {
      const result = new Date();
      result.setDate(result.getDate() - 7);
      return `${result.getFullYear()}-${result.getMonth()+1}-${result.getDate()}`;
    }
    const currentDate = () => {
      const result = new Date();
      return `${result.getFullYear()}-${result.getMonth()+1}-${result.getDate()}`;
    }
    const from = initialDate();
    const to = currentDate();
    return {from: from, to: to};
  }
}