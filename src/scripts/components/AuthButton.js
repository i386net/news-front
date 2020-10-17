// todo remove this

// import BaseComponent from './BaseComponent';
//
// export default class AuthButton extends BaseComponent {
//   constructor() {
//     super();
//     this.navButton = document.createElement('button');
//     this.render = this.render.bind(this);
//     this.popup = null;
//   }
//
// //  если пользователь не залогинен открываем по клику открывается попап
// //  если пользователь залогинен по клику выходим
//   render(name = '') {
//     // this._clearListeners();
//     this.navButton.textContent = '';
//     this.navButton.classList.add(
//       'button',
//       'button_theme_dark',
//       'button_size_m',
//       'nav__button'
//     );
//     this.navButton.insertAdjacentHTML(
//       'beforeend',
//       `
//       <span class="auth-text">${name? name : 'Авторизоваться'}</span>
//       <svg  class="button__ico ${name? '' : 'button__ico_is-hidden' }" width="24" height="24" viewBox="0 0 24 24" fill="#000" xmlns="http://www.w3.org/2000/svg">
//         <path fill-rule="evenodd" clip-rule="evenodd" d="M10 6L6 6L6 18H10V20H6C4.89543 20 4 19.1046 4 18V6C4 4.89543 4.89543 4 6 4H10V6ZM17.5856 13L13.2927 17.1339L14.707 18.4958L21.4141 12.0371L14.707 5.57837L13.2927 6.9402L17.5856 11.0741H8V13H17.5856Z"/>
//       </svg>
//         `
//     );
//     // if(name) {
//     //   this.navButton.classList.toggle('logged-in');
//     // }
//     // this._setEventListeners()
//     return this.navButton;
//   }
//
//   // authPopup (popup) {
//   //   this.popup = popup;
//   // }
//   //
//   // _setEventListeners() {
//   //   this._setHandlers([
//   //     {
//   //       element: this.navButton,
//   //       event: 'click',
//   //       callback: () => {
//   //         if(!this.navButton.classList.contains('logged-in')) {
//   //           this.popup.open();
//   //           console.log('1: popup opened');
//   //         } else {
//   //           console.log('2: logged out');
//   //           this.navButton.classList.remove('logged-in');
//   //         }
//   //       },
//   //     },
//   //   ])
//   // }
// }