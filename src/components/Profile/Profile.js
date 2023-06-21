// компонент страницы изменения профиля
import { useRef, useState } from 'react';
import './Profile.css';

const Profile = () => {
  const [edit, setEdit] = useState(false);
  const inputRef = useRef(null);
  const [values, setValues] = useState({ name: 'Виталий', email: 'email@yandex.ru' });
  const [buttonEditDisabled, setButtonEditDisabled] = useState(true)
  const handleEditClick = () => {
    setEdit(true);
    //Установка нулевой задержки гарантирует, что функция будет помещена в очередь выполнения после обновления компонента
    setTimeout(() => inputRef.current.focus(), 0);
  }

  const handleChange = (e) => {
    console.log(e.target.form['profile-email'].value !== values.email);
    if (
      e.target.form['profile-name'].value !== values.name
      || e.target.form['profile-email'].value !== values.email) {
      setButtonEditDisabled(false)
    } else {
      setButtonEditDisabled(true)

    }
  }
  return (
    <section className='profile'>
      <h1 className='profile__title'>Привет, Виталий!</h1>
      <form
        className='profile__form'
        name='profile__form'
        buttonText='Сохранить'
        onChange={handleChange}
      >
        <label className="profile__text">
          Имя
          <input
            ref={inputRef}
            className='profile__form-input'
            type='text'
            name='profile-name'
            required
            minLength={2}
            maxLength={30}
            id='profile-name'
            placeholder='Имя'
            disabled={!edit}
            defaultValue={values.name}
          />
        </label>
        <label className="profile__text">
          E-mail
          <input
            className='profile__form-input'
            type='email'
            name='profile-email'
            required
            minLength={2}
            maxLength={30}
            id='profile-email'
            placeholder='E-mail'
            disabled={!edit}
            defaultValue={values.email}
          />
        </label>

        {edit ?
          <div className='profile__form-buttons'>
            <button
              type='submit'
              className={`profile__form-submit ${buttonEditDisabled ? 'profile__form-submit_disabled' : ''}`}
              disabled={buttonEditDisabled}
            >Сохранить</button>
            <button
              type='button'
              className='profile__form-submit'
              onClick={() => setEdit(false)}
            >Отменить</button>
          </div>
          : ''}
      </form>
      <nav className='profile__links'>
        {!edit ? <button type='button' className='profile__link' onClick={handleEditClick}>Редактировать</button> : ''}
        <button type='button' className='profile__link profile__link_color_red'>Выйти из аккаунта</button>
      </nav>
    </section >
  )
}

export default Profile;
