import { Link } from "react-router-dom";
import "./MobileMenu.css";

function MobileMenu({ activeModal, onClose, handleLoginModal }) {
  const isOpen = activeModal === "mobile-menu";

  return (
    <div className={`mobile-menu-overlay ${isOpen ? "open" : ""}`}>
      <div className="mobile-menu-panel">
        <div className="mobile-menu-header">
          <h2 className="mobile-menu-logo">
            <Link to="/">NewsExplorer</Link>
          </h2>

          <button className="mobile-menu-close" onClick={onClose} />
        </div>

        <div className="mobile-menu-links">
          <Link to="/" className="mobile-menu-link">Home</Link>

          <button
            className="mobile-menu-button"
            onClick={handleLoginModal}
          >
            Sign in
          </button>
        </div>
      </div>
    </div>
  );
}

export default MobileMenu;
