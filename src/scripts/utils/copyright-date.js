import dom from '../constants/dom';

export default function copyrightDate() {
  dom.copyright.textContent = `© ${new Date().getFullYear()} 📰 NewsParser 📈, Powered by News AP`;
}