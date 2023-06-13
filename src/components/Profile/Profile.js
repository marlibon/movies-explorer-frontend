// компонент страницы изменения профиля
import './Profile.css';

const Profile = () => {
  return (
    <section className='profile'>
      <h1 className='profile__title'>Привет, Виталий!</h1>
      <div className='profile__contact-info'>
        <p className='profile__text'>Имя</p>
        <p className='profile__text'>Виталий</p>
        <p className='profile__text'>Email</p>
        <p className='profile__text'>pochta@yandex.ru</p>
      </div>

    </section>
  )
}

export default Profile;
