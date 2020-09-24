import BaseComponent from './BaseComponent';

class Header extends  BaseComponent {
  constructor({data}) {
    super();
    this._desktop = data.desktop;
    this._menu = data.menu
  }
  render(props) {
    if(props.isLoggedIn) {

    } else {

    }
  }
}