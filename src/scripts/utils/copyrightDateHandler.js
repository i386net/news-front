import dom from '../constants/dom';

export default function copyrightDateHandler() {
  dom.copyright.textContent = `© ${new Date().getFullYear()} ☙NewsParser❧, Powered by News API`;
}