import "./SearchForm.css";
import { useFormAndValidation } from "../../hooks/useFormAndValidation";

function SearchForm({ onSearch, submitError, isLoading }) {
  const handleSubmit = (e) => {
    e.preventDefault();
    onSearch(values.query);
    resetForm("");
  };

  const { values, handleChange, resetForm } = useFormAndValidation();

  return (
    <form className="search-form" onSubmit={handleSubmit}>
      <div className="search-form__container">
        <input
          type="text"
          name="query"
          id="query"
          onChange={handleChange}
          value={values.query || ""}
          className="search-form__input"
          placeholder="Enter topic"
        />
        <button className="search-form__submit-button">
          {isLoading ? "Searching..." : "Search"}
        </button>
      </div>
      {submitError && <span className="search-form__error">{submitError}</span>}
    </form>
  );
}

export default SearchForm;