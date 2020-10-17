export default class MainApi {
  constructor(options) {
    this.options = options;
  }
  resParse(res) {
    console.log(res)
    if (res.ok) {
      return res.json();
    }
    return Promise.reject(new Error(res.status));
  }

  // signup регистрирует нового пользователя;
  // signin аутентифицирует пользователя на основе почты и пароля;
  // getUserData возвращает информацию о пользователе;
  // getArticles забирает все статьи;
  // createArticle создаёт статью;
  // removeArticle удаляет статью.

  signup (credentials) {
    return fetch(`${this.options.baseUrl}/signup`, {
      method: 'POST',
      credentials: 'include',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        name: credentials.name,
        email: credentials.email,
        password: credentials.password,
      })
    })
      .then((res) => {
        if (res.status === 201) {
          return Promise.resolve(res.status);
        }
        if (res.status === 409) {
          return Promise.reject(new Error ('Пользователь с этими уже зарегистрирован!'));
        }
        if (res.status === 400) {
          return  Promise.reject(new Error ('Ошибка запроса'));
        }
        if (res.status === 429) {
          return Promise.reject(new Error(res.statusText))
        }
        return Promise.reject(new Error(res.status));
      })
      .catch((err) => Promise.reject(new Error(err)));
  }

  signin(credentials) {
    return fetch(`${this.options.baseUrl}/signin`, {
      method: 'POST',
      credentials: 'include',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        email: credentials.email,
        password: credentials.password,
      })
    })
      .then(res => {
        if (res.ok) {
          //return Promise.resolve(res.status);
          return res.json();
        }
        return Promise.reject(new Error('Данные пользователя неверные!'))
      })
      .catch(err => Promise.reject(new Error(err.message)));
  }

  signout() {
    return fetch(`${this.options.baseUrl}/signout`, {
      method: 'GET',
      credentials: 'include',
      headers: {
        'Content-Type': 'application/json'
      }
    })
      // .then(res => this.resParse(res))
      .then(res => {
        if(res.ok) return Promise.resolve({status: res.status})
        return Promise.reject(new Error(`Ошибка: ${res.statusText}`));
      })
      .catch(err => Promise.reject(new Error(err.status)))
  }

  getUserData () {
    return fetch(`${this.options.baseUrl}/users/me`, {
      method: 'GET',
      credentials: 'include',
    })
      .then((res) => this.resParse(res))
      .catch((err) => Promise.reject(new Error(`Ошибка получения статей: ${err.code}`)));
  }

  getArticles () {
    return fetch(`${this.options.baseUrl}/articles`, {
      method: 'GET',
      credentials: 'include',
      headers: {
        'Content-Type': 'application/json',
      },
    })
      .then(res => this.resParse(res))
      .catch(err => Promise.reject(new Error(err.statusText)));
  }

  createArticle (article) {
    return fetch(`${this.options.baseUrl}/articles`, {
      method: 'POST',
      credentials: 'include',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(
        {
          keyword: article.keyword,
          title: article.title,
          text: article.text,
          link: article.link,
          date: article.date,
          source: article.source,
          image: article.image,
        }
      )
    })
      .then(res => this.resParse(res))
      .catch(err => Promise.reject(new Error(err.statusText)));

  }

  removeArticle (_id) {
    return fetch(`${this.options.baseUrl}/articles/${_id}`, {
      method: 'DELETE',
      credentials: 'include',

    })
      .then(res => this.resParse(res))
      .catch(err => Promise.reject(new Error(`Ошибка удаления ${err}`)));
  }

}