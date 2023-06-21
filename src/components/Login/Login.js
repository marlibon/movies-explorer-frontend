// компонент страницы авторизации
import { useEffect, useState } from 'react';
import Form from '../Form/Form';
import Input from '../Input/Input';
import Logo from '../Logo/Logo';
import Section from '../Section/Section';
import './Login.css';
import { Link } from 'react-router-dom';

const Login = () => {
  const [values, setValues] = useState({})
  function onSubmit () {
  }
  function handleChange (e) {
    setValues({ ...values, [e.target.name]: e.target.value })
  }

  return (
    <Section theme='auth'>
      <Logo />
      <h2 className='section__title'>Рады видеть!</h2>
      <Form
        name='login'
        buttonText='Войти'
        onSubmit={onSubmit}
        onChange={handleChange}
      >
        <Input
          type='email'
          name='email'
          required={true}
          minLength={6}
          maxLength={30}
          label='E-mail'
          defaultValue='pochta@yandex.ru'
        />
        <Input
          type='password'
          name='password'
          required={true}
          minLength={6}
          maxLength={30}
          label='Пароль'
        />
      </Form>
      <p className='section__text'>Ещё не зарегистрированы?<Link className="section__link" to="/signup">Регистрация</Link></p>
    </Section>
  )
}

export default Login;
