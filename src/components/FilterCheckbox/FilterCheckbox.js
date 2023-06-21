import './FilterCheckbox.css';
import { useState } from 'react';

const FilterCheckbox = ({ onFilterChange = () => { }, isFilterOn = true, nameCheckboxShortFilms }) => {
  const [isToggle, setIsToggle] = useState(true)

  return (
    <div className='filter-checkbox'>
      <div className='filter-checkbox__toggle'>
        <label className='filter-checkbox__toggle-label' htmlFor={nameCheckboxShortFilms}>
          <input
            className='filter-checkbox__toggle-checkbox-invisible'
            type='checkbox'
            name={nameCheckboxShortFilms}
            id={nameCheckboxShortFilms}
            checked={isToggle}
            onChange={() => setIsToggle(!isToggle)}
          />
          <span className={`filter-checkbox__toggle-checkbox-visible ${isToggle && 'filter-checkbox__toggle-checkbox-visible_checked'}`} />
          Короткометражки
        </label>
      </div>
    </div>
  )
}
export default FilterCheckbox;
