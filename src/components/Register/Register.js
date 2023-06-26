// компонент страницы авторизации
import { useEffect, useState } from 'react';
import Form from '../Form/Form';
import Input from '../Input/Input';
import Logo from '../Logo/Logo';
import Section from '../Section/Section';
import './Register.css';
import { Link } from 'react-router-dom';

const Register = ({ onRegister }) => {
  const [values, setValues] = useState({})

  useEffect(() => {
    document.title = 'Регистрация';
  }, []);


  function onSubmit (event) {
    event.preventDefault();
    const { email, password, name } = values;
    onRegister({ email, password, name });
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
        textforbutton='Зарегистрироваться'
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
          defaultValue=''
          autoFocus={true}
          pattern="^[a-zA-Zа-яА-ЯёЁ\s\-]+$"
          placeholder='Ваше имя (рус/латинские символы, " ", "-")'
        />
        <Input
          type='email'
          name='email'
          required={true}
          minLength={6}
          maxLength={30}
          label='E-mail'
          defaultValue=''
          autoComplete='username'
          placeholder='Ваш емейл в формате email@mail.ru'
          pattern="^[\w\-\.]+@([\w\-]+\.)+[\w\-]{2,4}$"
        />
        <Input
          type='password'
          name='password'
          required={true}
          minLength={6}
          maxLength={30}
          label='Пароль'
          defaultValue=''
          errorDefault={true}
          autoComplete='current-password'
          placeholder='Пароль от 6 символов'

        />
      </Form>
      <p className='section__text'>Уже зарегистрированы?<Link className="section__link" to="/signin">Войти</Link></p>
    </Section>
  )
}

export default Register;
