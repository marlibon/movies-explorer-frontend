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
        <label className="label">
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
                className={`label__error ${error || errorDefault ? 'label__error_active' : ''}`}
            >{error ? error : 'Что-то пошло не так...'}
            </span>
        </label>
    )
}
export default Input
