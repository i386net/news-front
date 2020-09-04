import Popup from './components/Popup';
import '../styles/index.css';

const signinElement = document.querySelector('.popup_type_signin');
const authButton = document.querySelector('#signin');
const signinPopup = new Popup(signinElement);
authButton.addEventListener('click', ((evt) => {
  evt.preventDefault();
  signinPopup.open();
}));