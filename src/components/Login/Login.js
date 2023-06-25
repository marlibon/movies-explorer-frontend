// компонент страницы авторизации
import { useEffect, useState } from 'react';
import Form from '../Form/Form';
import Input from '../Input/Input';
import Logo from '../Logo/Logo';
import Section from '../Section/Section';
import './Login.css';
import { Link } from 'react-router-dom';

const Login = ({ onLogin, isLoading }) => {
  const [values, setValues] = useState({})

  useEffect(() => {
    document.title = 'Авторизация';
  }, []);


  function handleChange (e) {
    setValues({ ...values, [e.target.name]: e.target.value })
  }
  function handleSubmit (event) {
    event.preventDefault()
    onLogin(values.email, values.password)
  }
  return (
    <Section theme='auth'>
      <Logo />
      <h2 className='section__title'>Рады видеть!</h2>
      <Form
        name='login'
        textForButton='Войти'
        onSubmit={handleSubmit}
        onChange={handleChange}
        isLoading={isLoading}
      >
        <Input
          type='email'
          name='email'
          required={true}
          minLength={6}
          maxLength={30}
          label='E-mail'
          defaultValue=''
          autoComplete='username'
        />
        <Input
          type='password'
          name='password'
          required={true}
          minLength={6}
          maxLength={30}
          label='Пароль'
          autoComplete='current-password'
        />
      </Form>
      <p className='section__text'>Ещё не зарегистрированы?<Link className="section__link" to="/signup">Регистрация</Link></p>
    </Section>
  )
}

export default Login;
