// форма поиска, куда пользователь будет вводить запрос
import './SearchForm.css';
import Section from '../Section/Section';
import FilterCheckbox from '../FilterCheckbox/FilterCheckbox';
import { useState } from 'react';

const SearchForm = ({
  dataForm,
  onSubmit,
  onChange,
  nameInput,
  nameCheckboxShortFilms,
  isLoading
}) => {
  const [isValid, setIsValid] = useState(false);
  function handleChange(event) {
    setIsValid(event.target.validity.valid);
    onChange(event);
  }
  return (
    <Section theme="small">
      <form className="search-form" onChange={handleChange} onSubmit={onSubmit}>
        <input
          type="text"
          className="search-form__input"
          id={nameInput}
          name={nameInput}
          placeholder="Фильм"
          required={true}
          defaultValue={dataForm[nameInput]}
        />
        <button
          className="search-form__submit"
          type="submit"
          disabled={isLoading ? true : !isValid}
        >
          Найти
        </button>
        <FilterCheckbox
          dataForm={dataForm}
          nameCheckboxShortFilms={nameCheckboxShortFilms}
        />
      </form>
    </Section>
  );
};

export default SearchForm;
