import { useEffect } from "react";
import "./Modal.css";
import useModalClose from "../../hooks/useModalClose";
import close from "../../assets/close.svg";

function Modal({
  name,
  activeModal,
  onClose,
  children,
  containerType,
  closeButtonType,
}) {
  const isOpen = activeModal === name;
  useModalClose(isOpen, onClose);
  useEffect(() => {
  if (isOpen) {
    document.body.style.overflow = "hidden";
  } else {
    document.body.style.overflow = "";
  }
  }, [isOpen]);
  return (
    <div className={`modal modal_type_${name} ${isOpen && "modal_opened"}`}>
      <div
        className={`modal__container ${
          containerType ? `modal__container_type_${containerType}` : ""
        }`}
      >
        {children}
        <button
          type="button"
          className={`modal__close-button ${
            closeButtonType ? `modal__close-button_type_${closeButtonType}` : ""
          }`}
          onClick={onClose}
        >
          <img src={close} alt="Close" />
        </button>
      </div>
    </div>
  );
}

export default Modal;