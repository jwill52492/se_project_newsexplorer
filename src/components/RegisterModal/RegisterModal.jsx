import "./RegisterModal.css";
import ModalWithForm from "../ModalWithForm/ModalWithForm";
import { useFormAndValidation } from "../../hooks/useFormAndValidation";

function RegisterModal({ activeModal, onClose, handleLoginModal, onRegister }) {
  const { values, errors, handleChange, isValid, resetForm } =
    useFormAndValidation();

  const handleSubmit = (e) => {
    e.preventDefault();
    const user = {
      email: values.email,
      password: values.password,
      username: values.username,
    };
    onRegister(user);
    resetForm({ email: "", password: "", username: "" }, {}, false);
  };

  return (
    <ModalWithForm
      name="register-user"
      title="Sign up"
      activeModal={activeModal}
      onClose={onClose}
      onSubmit={handleSubmit}
      containerType="register-user"
    >
      <label htmlFor="register-email" className="modal__label">
        Email
        <input
          id="register-email"
          type="email"
          name="email"
          required
          value={values.email || ""}
          onChange={handleChange}
          className={`modal__input ${errors.email ? "modal__input-error" : ""}`}
          placeholder="Enter email"
        />
        {errors.email && <span className="modal__error">{errors.email}</span>}
      </label>
      <label htmlFor="register-password" className="modal__label">
        Password
        <input
          id="register-password"
          type="password"
          name="password"
          required
          minLength="8"
          className={`modal__input ${
            errors.password ? "modal__input-error" : ""
          }`}
          value={values.password || ""}
          onChange={handleChange}
          placeholder="Enter password"
        />
        {errors.password && (
          <span className="modal__error">{errors.password}</span>
        )}
      </label>
      <label htmlFor="register-username" className="modal__label">
        Username
        <input
          id="register-username"
          type="text"
          name="username"
          required
          minLength="2"
          maxLength="20"
          value={values.username || ""}
          onChange={handleChange}
          className={`modal__input ${
            errors.username ? "modal__input-error" : ""
          }`}
          placeholder="Enter your username"
        />
        {errors.username && (
          <span className="modal__error">{errors.username}</span>
        )}
      </label>
      <div className="modal__button-container">
        <button
          disabled={!isValid}
          type="submit"
          className="modal__submit-button"
        >
          Sign up
        </button>
        <button
          type="button"
          onClick={handleLoginModal}
          className="modal__switch-button"
        >
          or <span style={{ color: "#2f71e5" }}>Sign in</span>
        </button>
      </div>
    </ModalWithForm>
  );
}

export default RegisterModal;
