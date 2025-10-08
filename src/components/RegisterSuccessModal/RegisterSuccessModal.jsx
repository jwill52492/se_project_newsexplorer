import Modal from "../Modal/Modal";

function RegisterSuccessModal({ activeModal, handleLoginModal, onClose }) {
  return (
    <Modal
      activeModal={activeModal}
      onClose={onClose}
      name="success"
      containerType="success"
    >
      <h2 className="modal__title modal__title_type_success">
        Registration successfully completed.
      </h2>
      <button
        type="button"
        onClick={handleLoginModal}
        className="modal__switch-button modal__switch-button_type_success"
      >
        Sign in
      </button>
    </Modal>
  );
}

export default RegisterSuccessModal;
