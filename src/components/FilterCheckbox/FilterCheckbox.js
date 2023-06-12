import './FilterCheckbox.css';
import { useState } from 'react';

const FilterCheckbox = ({ onFilterChange = () => { }, isFilterOn = true }) => {
  const [isToggle, setIsToggle] = useState(true)

  return (
    <div className='filter-checkbox__toggle'>
      <label className='filter-checkbox__toggle-label' htmlFor='short-films'>
        <input
          className='filter-checkbox__toggle-checkbox-invisible'
          type='checkbox'
          name='short-films'
          id='short-films'
          checked={isToggle}
          onChange={() => setIsToggle(!isToggle)}
        />
        <span className={`filter-checkbox__toggle-checkbox-visible ${isToggle && 'filter-checkbox__toggle-checkbox-visible_checked'}`} />
        Короткометражки
      </label>
    </div>
  )
}
export default FilterCheckbox;
