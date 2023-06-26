import { useEffect, useRef, useState } from 'react';
import './Form.css';

const Form = ({
    name,
    onSubmit,
    textforbutton,
    onChange,
    isLoading,
    children
}) => {
    const [validForm, setValidForm] = useState(false);
    const ref = useRef(null);
    function handleChange (e) {
        const isValidForm = ref.current.elements.length
            ? [...ref.current.elements].some(element => element.validity.valid === false)
            : false
        setValidForm(!isValidForm)
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
            onChange={handleChange}
            onSubmit={handleSubmit}
            ref={ref}
        >
            <div>
                {children}
            </div>
            <button
                type="submit"
                form={name}
                className={`form__btn-submit`}
                disabled={!validForm || isLoading ? true : false}
            >
                {isLoading ? 'Загрузка...' : textforbutton}
            </button>
        </form>
    )
}
export default Form
