// компонент страницы изменения профиля
import './Profile.css';

const Profile = () => {
  return (
    <section className='profile'>
      <h1 className='profile__title'>Привет, Виталий!</h1>
      <form
        className='profile__form'
        name='profile__form'
        buttonText='Сохранить'
      >
        <label className="profile__text">
          Имя
          <input
            className='profile__form-input'
            type='text'
            name='profile-name'
            required
            minLength={2}
            maxLength={30}
            id='profile-name'
            disabled={true}
            value='Виталий'
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
            disabled={true}
            value='mail@mail.ru'
          />
        </label>

        <button type='submit' className='profile__form-submit'>Сохранить</button>
      </form>
      <nav className='profile__links'>
        <button type='button' className='profile__link'>Редактировать</button>
        <button type='button' className='profile__link profile__color_red'>Выйти из аккаунта</button>
      </nav>
    </section>
  )
}

export default Profile;
