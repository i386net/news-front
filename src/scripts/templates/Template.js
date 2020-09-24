// export default {
//   popup : {
//     signinPopup:`<div class="popup__content">
//       <picture>
//         <source srcset="<%=require('../images/mobile-close.svg').default%>" media="(max-width: 500px)">
//         <img src="<%=require('../images/close.svg').default%>" alt="" class="popup__close popup__close_type_signin"/>
//       </picture>
//
//       <h3 class="popup__title">Вход</h3>
//       <form class="popup__form popup__form_login" name="signin" novalidate>
//         <span class="popup__subtitle">Email</span>
//         <input
//           type="email"
//           name="email"
//           id="signin-email"
//           class="popup__input popup__input_type_email"
//           placeholder="Введите почту"
//           required
//         />
//         <span class="error-message error-message_is-opened">Неправильный формат email</span>
//         <span class="popup__subtitle">Пароль</span>
//         <input
//           type="password"
//           name="password"
//           id="signin-password"
//           class="popup__input popup__input_type_password"
//           placeholder="Введите пароль"
//           required
//         />
//         <span class="error-message error-message_is-opened">Неправильный формат пароля</span>
//         <button type="submit" class="button button_size_xl button_state_active popup__button">Войти</button>
//         <p class="popup__text">или <a href="#" class="popup__link popup__link_type_reg">Зарегистрироваться</a></p>
//       </form>
//     </div>`,
//     signupPopup: `<div class="popup__content">
//       <img src="<%=require('../images/close.svg').default%>" alt="" class="popup__close popup__close_type_signup" />
//       <h3 class="popup__title">Регистрация</h3>
//       <form class="popup__form popup__form_signup" name="signup" novalidate>
//         <span   class="popup__subtitle">Email</span>
//         <input
//           type="email"
//           name="email"
//           id="signup-email"
//           class="popup__input popup__input_type_email"
//           placeholder="Введите почту"
//           required
//         />
//         <span id="error-email" class="error-message error-message_is-opened">Неправильный формат email</span>
//         <span class="popup__subtitle">Пароль</span>
//         <input
//           type="password"
//           name="password"
//           id="signup-password"
//           class="popup__input popup__input_type_password"
//           placeholder="Введите пароль"
//           required
//         />
//         <span id="error-password" class="error-message error-message_is-opened">Неправильный формат пароля</span>
//
//         <span class="popup__subtitle">Имя</span>
//         <input
//           type="text"
//           name="name"
//           id="signup-name"
//           class="popup__input popup__input_type_name"
//           placeholder="Введите имя"
//           required
//         />
//         <span id="error-name" class="error-message error-message_is-opened">Неправильный формат имени</span>
//         <span class="error-message error-message_is-centered error-message_is-opened" id="user-exists">Такой пользователь уже есть</span>
//
//         <button id="register" type="submit" class="button button_size_xl button_state_inactive popup__button popup__button_is_inactive">Зарегистрироваться</button>
//         <p class="popup__text">или <a href="" class="popup__link popup__link_type_login">Войти</a></p>
//       </form>
//     </div>`,
//     successPopup: `<div class="popup__content">
//       <img src="<%=require('../images/close.svg').default%>" alt="" class="popup__close popup__close_type_reged" />
//       <h3 class="popup__title">Пользователь успешно зарегистрирован!</h3>
//       <a href="" class="popup__link">Выполнить вход</a>
//     </div>`,
//   }
// }