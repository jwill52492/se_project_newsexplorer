import Modal from "../Modal/Modal";

function LogoutModal({ activeModal, onClose, onLogout }) {
  const handleLogout = () => {
    onLogout();
  };

  return (
    <Modal
      activeModal={activeModal}
      onClose={onClose}
      name="confirm-logout"
      containerType="confirm-logout"
    >
      <h2 className="modal__title">Are you sure you would like to logout?</h2>
      <div className="modal__button-container_type_confirm">
        <button
          type="submit"
          onClick={handleLogout}
          className="modal__confirm-button"
        >
          Logout
        </button>
        <button
          type="button"
          onClick={onClose}
          className="modal__cancel-button"
        >
          Cancel
        </button>
      </div>
    </Modal>
  );
}

export default LogoutModal;