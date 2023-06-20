import { useState } from 'react';
import './Input.css';
const Input = ({
    errorDefault = false,
    autoFocus = false,
    type,
    name,
    required,
    minLength,
    maxLength,
    label,
    defaultValue,
}) => {
    const [error, setError] = useState(false)
    function handleChange (e) {
        !e.target.validity.valid
            ? setError(e.target.validationMessage)
            : setError('')
    }
    return (
        <label className="input__label">
            {label}
            <input
                className={`input
                ${autoFocus ? " input_focus " : ""}
                ${errorDefault ? " input_style_error " : ""}
                `}
                type={type}
                name={name}
                required={required}
                minLength={minLength}
                maxLength={maxLength}
                id={name}
                onChange={handleChange}
                placeholder={label}
                defaultValue={defaultValue || ""}
                autoFocus={autoFocus}
            />
            <span
                className={`input__error ${error || errorDefault ? 'input__error_active' : ''}`}
            >{error ? error : 'Что-то пошло не так...'}
            </span>
        </label>
    )
}
export default Input
