import './Footer.css';
import githubIcon from '../../assets/github.svg';
import facebookIcon from '../../assets/fb.svg';

function Footer() {
  return (
    <footer className="footer">
      <div className="footer__container">
        <p>© 2025 Supersite, Powered by News API</p>
        <p>Home       Triple Ten</p>
        <img className="github_icon" src={githubIcon} alt="GitHub Logo" />
        <img className="facebook_icon" src={facebookIcon} alt="Facebook Logo" />
      </div>
    </footer>
  );
}

export default Footer;