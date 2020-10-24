export default class NewsApi {
  constructor({query, params, apiKey}) {
    ({
      language: this.language,
      sortBy: this.sortBy,
      pageSize: this.pageSize
    } = params);
    this.apiKey = apiKey;
    this.query = query;
    this.url = 'https://newsapi.org/v2/everything?'
  }
  getNews() {
    this.url = this.url
      + `q=${this.query}&`
      + `from=${this._getDate().from}&`
      + `to=${this._getDate().to}&`
      + `language=${this.language}&`
      + `sortBy=${this.sortBy}&`
      + `pageSize=${this.pageSize}`;
    return fetch(this.url, {
      method: 'GET',
      headers: {
        Authorization: this.apiKey,
      }
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