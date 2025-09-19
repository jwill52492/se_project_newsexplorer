import ModalWithForm from "../ModalWithForm/ModalWithForm";
import "./LoginModal.css";
import { useFormAndValidation } from "../../hooks/useFormAndValidation";

function LoginModal({ activeModal, handleRegisterModal, onClose, onLogin }) {
  const { values, errors, handleChange, isValid, resetForm } =
    useFormAndValidation();

  const handleSubmit = (e) => {
    e.preventDefault();
    onLogin(values);
    resetForm({ email: "", password: "" }, {}, false);
  };

  return (
    <ModalWithForm
      activeModal={activeModal}
      onClose={onClose}
      name="login-user"
      title="Sign in"
      onSubmit={handleSubmit}
      containerType="login-user"
    >
      <label htmlFor="login-email" className="modal__label">
        Email
        <input
          id="login-email"
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
      <label htmlFor="login-password" className="modal__label">
        Password
        <input
          id="login-password"
          type="password"
          name="password"
          minLength="8"
          required
          value={values.password || ""}
          onChange={handleChange}
          className={`modal__input ${
            errors.password ? "modal__input-error" : ""
          }`}
          placeholder="Enter password"
        />
        {errors.password && (
          <span className="modal__error">{errors.password}</span>
        )}
      </label>
      <div className="modal__button-container">
        <button
          type="submit"
          disabled={!isValid}
          className="modal__submit-button"
        >
          Sign in
        </button>
        <button
          type="button"
          onClick={handleRegisterModal}
          className="modal__switch-button"
        >
          or <span style={{ color: "#2f71e5" }}>Sign up</span>
        </button>
      </div>
    </ModalWithForm>
  );
}

export default LoginModal;