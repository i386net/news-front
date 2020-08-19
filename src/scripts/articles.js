import '../styles/articles.css';

const copyright = document.querySelector('.footer__copyright-container');

copyright.textContent = `© ${new Date().getFullYear()} Supersite, Powered by News AP`;