// компонент страницы авторизации
import { useEffect, useState } from 'react';
import Form from '../Form/Form';
import Input from '../Input/Input';
import Logo from '../Logo/Logo';
import Section from '../Section/Section';
import './Register.css';
import { Link } from 'react-router-dom';

const Register = () => {
  const [values, setValues] = useState({})
  function onSubmit () {
  }
  function handleChange (e) {
    setValues({ ...values, [e.target.name]: e.target.value })
  }

  return (
    <Section theme='auth'>
      <Logo />
      <h2 className='section__title'>Добро пожаловать!</h2>
      <Form
        name='login'
        buttonText='Зарегистрироваться'
        onSubmit={onSubmit}
        onChange={handleChange}
      >
        <Input
          type='text'
          name='name'
          required={true}
          minLength={6}
          maxLength={30}
          label='Имя'
          defaultValue='Виталий'
        />
        <Input
          type='email'
          name='email'
          required={true}
          minLength={6}
          maxLength={30}
          label='E-mail'
          defaultValue='pochta@yandex.ru'
          autoFocus={true}
        />
        <Input
          type='password'
          name='password'
          required={true}
          minLength={6}
          maxLength={30}
          label='Пароль'
          defaultValue='password123456'
          errorDefault={true}
        />
      </Form>
      <p className='section__text'>Уже зарегистрированы?<Link className="section__link" to="/signin">Войти</Link></p>
    </Section>
  )
}

export default Register;
