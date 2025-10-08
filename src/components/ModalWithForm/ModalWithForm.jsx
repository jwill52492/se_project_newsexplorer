import "./ModalWithForm.css";
import Modal from "../Modal/Modal";

function ModalWithForm({
  name,
  title,
  activeModal,
  children,
  onClose,
  onSubmit,
  containerType,
}) {
  return (
    <Modal
      name={name}
      activeModal={activeModal}
      onClose={onClose}
      containerType={containerType}
    >
      <h2 className="modal__title">{title}</h2>
      <form name={name} onSubmit={onSubmit} className="modal__form">
        {children}
      </form>
    </Modal>
  );
}

export default ModalWithForm;