import './Footer.css';
import githubIcon from '../../assets/github.svg';
import linkedinIcon from '../../assets/LinkedIn.svg';

function Footer() {
  return (
    <footer className="footer">
      <div className="footer__container">
          <p className="footer__news">© 2025 Supersite, Powered by News API</p>
          <div className="footer__right">
            <div className="footer__links">
              <a href="/" className="footer__link">Home</a>
              <a href="/" className="footer__link">TripleTen</a>
            </div>
            <div className="footer__icons">
              <a href="https://github.com" target="_blank" rel="noreferrer">
                <img className="footer__icon" src={githubIcon} alt="GitHub" />
              </a>
              <a href="https://linkedin.com" target="_blank" rel="noreferrer">
                <img className="footer__icon" src={linkedinIcon} alt="LinkedIn" />
              </a>
            </div>
          </div>
      </div>
    </footer>
  );
}

export default Footer;