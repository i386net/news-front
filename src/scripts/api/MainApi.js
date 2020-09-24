export default class MainApi {
  constructor({data}) {
    this.loggedIn = false;
    this.url = data.url;
  }
  signup({data}) {
    return fetch(`${this.url}/signup`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({...data}),
    })
      .then(res => res.json())
      .then(res => {
        if(res.statusCode === '200') {
          return res;
        }
        return Promise.reject(res.message);
      })
      .catch(err => Promise.reject(new Error(err)));
  }
}