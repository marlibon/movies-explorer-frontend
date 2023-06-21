// форма поиска, куда пользователь будет вводить запрос
import './SearchForm.css';
import Section from '../Section/Section';
import FilterCheckbox from '../FilterCheckbox/FilterCheckbox';

const SearchForm = () => {
  return (
    <Section theme="small" >
      <form className='search-form'>
        <input
          type="text"
          className='search-form__input'
          id="movie-search"
          name="movie-search"
          placeholder="Фильм"
          required={true}
        />
        <button className="search-form__submit" type="submit">Найти</button>
        <FilterCheckbox />
      </form>
    </Section>
  )
}

export default SearchForm;
