import { Link, useLocation } from "react-router-dom";
import "./Header.css";
import Navigation from "../Navigation/Navigation";
import menuIcon from "../../assets/menuicon.svg";
import menuIconBlack from "../../assets/menuiconblack.svg";

function Header({ handleLoginModal, onLogout, handleMobileMenuModal }) {
  const location = useLocation();
  const isSavedNewsRoute = location.pathname.startsWith("/saved-news");

  return (
    <header
      className={`header ${isSavedNewsRoute && "header_type_saved-news"}`}
    >
      <h1
        className={`header__title ${
          isSavedNewsRoute && "header__title_type_saved-news"
        }`}
      >
        <Link to="/">NewsExplorer</Link>
      </h1>
      <Navigation handleLoginModal={handleLoginModal} onLogout={onLogout} />
      <button
        className="header__menu-button"
        type="button"
        onClick={handleMobileMenuModal}
      >
        <img
          src={!isSavedNewsRoute ? menuIcon : menuIconBlack}
          alt="menu icon"
          className="header__menu-icon"
        />
      </button>
    </header>
  );
}

export default Header;