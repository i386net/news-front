import BaseComponent from './BaseComponent';

export default class Header extends  BaseComponent {
  constructor(headerArea) {
    super();
    this.headerArea = headerArea;
    this.headerButton = this.headerArea.querySelector('.nav__button');
    this.menuButton = this.headerArea.querySelector('.menu__button');
    this.logoutIcons = this.headerArea.querySelectorAll('.button__ico');
    this.navLink = this.headerArea.querySelector('.nav__main');
    this.menuLink = this.headerArea.querySelector('.menu__main');


  }
  render (props) {
    const { isLoggedIn, name } = props;
    if(isLoggedIn) {
      this._renderElements(name);
    } else {
      this._renderElements();
    }

  }

  logout() {
    this._renderElements();
  }
  _renderElements (name='') {
    if(name) {
      this.headerButton.firstChild.textContent = name;
      this.menuButton.firstChild.textContent = name;
      this.logoutIcons.forEach(icon => icon.classList.remove('button__ico_is-hidden'));
      this.navLink.insertAdjacentHTML('afterend', this._addArticlesLink().nav);
      this.menuLink.insertAdjacentHTML('afterend', this._addArticlesLink().menu);

    } else {
      this.headerButton.firstChild.textContent = 'Авторизоваться';
      this.menuButton.firstChild.textContent = 'Авторизоваться';
      this.logoutIcons.forEach(icon => icon.classList.add('button__ico_is-hidden'));
      this._removeArticlesLink();
    }
  }

  _addArticlesLink () {
    return {
      nav: `
        <li class="nav__item articles-link">
            <a href="./" class="nav__link nav__link_theme_dark">Сохраненные статьи</a>
        </li>
      ` ,
      menu: `
        <li class="menu__item articles-link">
            <a href="./" class="menu__link">Сохраненные статьи</a>
        </li>
      `};
  }

  _removeArticlesLink () {
    this.headerArea.querySelectorAll('.articles-link').forEach(articlesLink => articlesLink.remove());
  }
}