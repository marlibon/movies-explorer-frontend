import './FilterCheckbox.css';
import { useEffect, useState } from 'react';

const FilterCheckbox = ({ dataForm, nameCheckboxShortFilms }) => {
  const [isToggle, setIsToggle] = useState(dataForm[nameCheckboxShortFilms])
  useEffect(() => {
    setIsToggle(dataForm[nameCheckboxShortFilms])
  }, [dataForm])

  function handleChange (event) {
    setIsToggle(!isToggle);
  }
  return (
    <div className='filter-checkbox'>
      <div className='filter-checkbox__toggle'>
        <label className='filter-checkbox__toggle-label' htmlFor={nameCheckboxShortFilms} title='не забудьте нажать кнопку "Найти"'>
          <input
            className='filter-checkbox__toggle-checkbox-invisible'
            type='checkbox'
            name={nameCheckboxShortFilms}
            id={nameCheckboxShortFilms}
            checked={isToggle}
            onChange={handleChange}
          />
          <span className={`filter-checkbox__toggle-checkbox-visible ${isToggle && 'filter-checkbox__toggle-checkbox-visible_checked'}`} />
          Короткометражки
        </label>
      </div>
    </div>
  )
}
export default FilterCheckbox;
