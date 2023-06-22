// форма поиска, куда пользователь будет вводить запрос
import './SearchForm.css';
import Section from '../Section/Section';
import FilterCheckbox from '../FilterCheckbox/FilterCheckbox';
import { useState } from 'react';

const SearchForm = ({ onSubmit, onChange, nameInput, nameCheckboxShortFilms }) => {
  const [isValid, setIsValid] = useState(false)
  function handleChange (event) {
    setIsValid(event.target.validity.valid)
    console.log(event.target.validity.valid);
    onChange(event)
  }
  return (
    <Section theme="small" >
      <form className='search-form' onChange={handleChange} onSubmit={onSubmit}>
        <input
          type="text"
          className='search-form__input'
          id={nameInput}
          name={nameInput}
          placeholder="Фильм"
          required={true}
        />
        <button className="search-form__submit" type="submit" disabled={!isValid}>Найти</button>
        <FilterCheckbox nameCheckboxShortFilms={nameCheckboxShortFilms} />
      </form>
    </Section>
  )
}

export default SearchForm;
