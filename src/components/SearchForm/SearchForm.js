// форма поиска, куда пользователь будет вводить запрос
import './SearchForm.css';
import FilterCheckbox from '../FilterCheckbox/FilterCheckbox';

const SearchForm = () => {
  return (
    <form className='search-form'>
      <input type="text" className='search-form__input' id="movie-search" name="movie-search" placeholder="Фильм" />
      <button className="search-form__submit" type="submit">Найти</button>
      <FilterCheckbox />
    </form>
  )
}

export default SearchForm;
