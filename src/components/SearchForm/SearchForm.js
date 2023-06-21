// форма поиска, куда пользователь будет вводить запрос
import './SearchForm.css';
import Section from '../Section/Section';
import FilterCheckbox from '../FilterCheckbox/FilterCheckbox';

const SearchForm = ({ handleSubmit, nameInput, nameCheckboxShortFilms }) => {
  return (
    <Section theme="small" >
      <form className='search-form' onSubmit={handleSubmit}>
        <input
          type="text"
          className='search-form__input'
          id={nameInput}
          name={nameInput}
          placeholder="Фильм"
          required={true}
        />
        <button className="search-form__submit" type="submit">Найти</button>
        <FilterCheckbox nameCheckboxShortFilms={nameCheckboxShortFilms} />
      </form>
    </Section>
  )
}

export default SearchForm;
