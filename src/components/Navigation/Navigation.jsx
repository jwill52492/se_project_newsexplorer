import { useContext } from "react";
import { useLocation, NavLink } from "react-router-dom";
import "./Navigation.css";
import { CurrentUserContext } from "../../contexts/CurrentUserContext";
import github from "../../assets/github.svg";
import LinkedIn from "../../assets/LinkedIn.svg";
import logouticonblack from "../../assets/logouticonblack.svg";

function Navigation({
  isFooter = false,
  isMobile = false,
  handleLoginModal,
  onLogout,
}) {
  const { isLoggedIn, currentUser } = useContext(CurrentUserContext);
  const location = useLocation();
  const isSavedNewsRoute = location.pathname.startsWith("/saved-news");

  return isFooter ? (
    <div className="navigation__footer">
      <div className="navigation__internal-links">
        <NavLink to="/">
          <button className="navigation__home_type_footer">Home</button>
        </NavLink>
        <a
          href="https://tripleten.com/"
          target="_blank"
          rel="noopener noreferer"
          className="navigation__tripleten-link"
        >
          TripleTen
        </a>
      </div>
      <div className="navigation__external-links">
        <a
          href="https://www.github.com/jwill52492"
          target="_blank"
          rel="noopener noreferer"
          className="navigation__github-link"
        >
          <img
            src={github}
            alt="github icon"
            className="naviagtion__logo"
          />
        </a>
        <a
          href="https://www.linkedin.com/in/JohnnathonWilliams/"
          target="_blank"
          rel="noopener noreferer"
          className="navigation__linkedin-link"
        >
          <img
            src={LinkedIn}
            alt="linkedin icon"
            className="navigation__logo"
          />
        </a>
      </div>
    </div>
  ) : isLoggedIn ? (
    <div className={`navigation ${isMobile ? "navigation_open" : ""}`}>
      <NavLink
        to="/"
        exact="true"
        className={({ isActive }) => {
          console.log("is active in home button", isActive);
          return `navigation__home ${isActive && "navigation__home_active"} ${
            isSavedNewsRoute && "navigation__home_type_saved-news"
          } ${isMobile ? "navigation__home_type_loggedin-mobile" : ""}`;
        }}
      >
        Home
      </NavLink>
      <NavLink
        to="/saved-news"
        className={({ isActive }) =>
          `navigation__saved-news ${
            isActive && "navigation__saved-news_active"
          } ${isSavedNewsRoute && "navigation__saved-news_type_saved-news"} ${
            isMobile ? "navigation__saved-news_type_mobile" : ""
          }`
        }
      >
        Saved News
      </NavLink>
      <button
        type="button"
        onClick={onLogout}
        className={`navigation__profile ${
          isSavedNewsRoute && "navigation__profile_type_saved-news"
        }`}
      >
        {currentUser}{" "}
        <img
          src={isSavedNewsRoute && !isMobile ? logouticonblack : logoutIcon}
          alt="logout icon"
          className="navigation__logout"
        />
      </button>
    </div>
  ) : (
    <div className={`navigation ${isMobile ? "navigation_open" : ""}`}>
      <button
        className={`navigation__home ${
          isMobile ? "navigation__home_type_mobile" : ""
        }`}
        type="button"
      >
        <NavLink to="/">Home</NavLink>
      </button>

      <button
        onClick={handleLoginModal}
        className={`navigation__signin ${
          isMobile ? "navigation__signin_type_mobile" : ""
        }`}
        type="button"
      >
        Sign in
      </button>
    </div>
  );
}

export default Navigation;