import { useState } from 'react';
import './Input.css';
const Input = ({
  autoFocus = false,
  type,
  name,
  required,
  minLength,
  maxLength,
  label,
  defaultValue,
  autoComplete,
  pattern,
  placeholder
}) => {
  const [error, setError] = useState(false);
  function handleChange(e) {
    !e.target.validity.valid
      ? setError(e.target.validationMessage)
      : setError('');
  }
  return (
    <label className="label">
      {label}
      <input
        className={`input
                ${autoFocus ? ' input_focus ' : ''}
                ${error ? ' input_style_error ' : ''}
                `}
        type={type}
        name={name}
        required={required}
        minLength={minLength}
        maxLength={maxLength}
        id={name}
        onChange={handleChange}
        placeholder={placeholder}
        defaultValue={defaultValue || ''}
        autoFocus={autoFocus}
        autoComplete={autoComplete}
        pattern={pattern}
      />
      <span className={`label__error ${error ? 'label__error_active' : ''}`}>
        {error ? error : 'Что-то пошло не так...'}
      </span>
    </label>
  );
};
export default Input;
