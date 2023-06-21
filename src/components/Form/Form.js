import { useState } from 'react';
import './Form.css';

const Form = ({
    name,
    onSubmit,
    isFormValid,
    buttonText,
    onChange,
    isEditingBegun,
    children
}) => {
    const [validForm, setValidForm] = useState(true);
    function handleChange (e) {
        setValidForm(e.target.validity.valid)
        onChange(e)
    }
    function handleSubmit (e) {
        e.preventDefault();
        onSubmit(e)
    }
    return (
        <form
            action="#"
            name={name}
            id={name}
            className={`form form_type_${name}`}
            noValidate
            onChange={handleChange}
            onSubmit={handleSubmit}
        >
            <div>
                {children}
            </div>
            <button
                type="submit"
                form={name}
                className={`form__btn-submit`}
                disabled={!validForm}
            >
                {buttonText}
            </button>
        </form>
    )
}
export default Form
