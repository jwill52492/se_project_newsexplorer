import { Link } from "react-router-dom";
import "./MobileMenu.css";
import Navigation from "../Navigation/Navigation";
import Modal from "../Modal/Modal";

function MobileMenu({ activeModal, onClose, handleLoginModal, onLogout }) {
  return (
    <Modal
      activeModal={activeModal}
      onClose={onClose}
      name="mobile-menu"
      containerType="mobile-menu"
      closeButtonType="mobile-menu"
    >
      <div className="mobile-menu__title-container">
        <h2 className="mobile-menu__title">
          <Link to="/">NewsExplorer</Link>
        </h2>
      </div>
      <div className="mobile-menu__navigation-container">
        <Navigation
          isMobile={true}
          handleLoginModal={handleLoginModal}
          onLogout={onLogout}
        />
      </div>
    </Modal>
  );
}

export default MobileMenu;