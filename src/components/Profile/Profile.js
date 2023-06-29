// компонент страницы изменения профиля
import { useEffect, useRef, useState } from 'react';
import './Profile.css';
import { Link } from 'react-router-dom';
import { CurrentUserContext } from '../../contexts/CurrentUserContext';
import { useContext } from 'react';

const Profile = ({ onEditProfile, isLoading }) => {
  const [edit, setEdit] = useState(false);
  const inputRef = useRef(null);
  const formRef = useRef(null);
  const { name, email } = useContext(CurrentUserContext);
  const [values, setValues] = useState({ name, email });
  const [buttonEditDisabled, setButtonEditDisabled] = useState(true);

  useEffect(() => {
    document.title = 'Информация о пользователе';
  }, []);

  const handleEditClick = () => {
    setEdit(true);
    //Установка нулевой задержки гарантирует, что функция будет помещена в очередь выполнения после обновления компонента
    setTimeout(() => inputRef.current.focus(), 0);
  };
  useEffect(() => {
    const form = formRef.current;
    const isValid = Array.from(form.elements).every((element) => {
      if (element.tagName === 'INPUT') {
        return element.validity.valid;
      }
      return true;
    });
    if (isValid) {
      setButtonEditDisabled(false);
    } else {
      setButtonEditDisabled(true);
    }
    if (values.name === name && values.email === email) {
      setButtonEditDisabled(true);
    }
  }, [values]);

  useEffect(() => {
    setValues({ name, email });
  }, [name, email]);

  const handleChange = (e) => {
    setValues({ ...values, [e.target.name]: e.target.value });
  };
  const handleClickCancelBtn = () => {
    setEdit(false);
    setValues({ name, email });
  };
  const handleSubmit = (e) => {
    e.preventDefault();
    onEditProfile({ email: values.email, name: values.name });
    setEdit(false);
  };
  return (
    <section className="profile">
      <h1 className="profile__title">Привет, {name}!</h1>
      <form
        className="profile__form"
        name="profile__form"
        textforbutton="Сохранить"
        onChange={handleChange}
        onSubmit={handleSubmit}
        ref={formRef}
      >
        <label className="profile__text">
          Имя
          <input
            ref={inputRef}
            className="profile__form-input"
            type="text"
            name="name"
            required
            minLength={2}
            maxLength={30}
            id="name"
            placeholder="Имя"
            disabled={!edit}
            value={values.name}
          />
        </label>
        <label className="profile__text">
          E-mail
          <input
            className="profile__form-input"
            type="email"
            name="email"
            required
            minLength={2}
            maxLength={30}
            id="email"
            placeholder="E-mail"
            disabled={!edit}
            value={values.email}
            pattern="^[\w\-\.]+@([\w\-]+\.)+[\w\-]{2,4}$"
          />
        </label>

        {edit ? (
          <div className="profile__form-buttons">
            <button
              type="submit"
              className="profile__form-submit"
              disabled={isLoading || buttonEditDisabled}
            >
              {isLoading ? 'сохранение...' : 'Сохранить'}
            </button>
            <button
              type="button"
              className="profile__form-submit"
              onClick={handleClickCancelBtn}
            >
              Отменить
            </button>
          </div>
        ) : (
          ''
        )}
      </form>
      <nav className="profile__links">
        {!edit ? (
          <button
            type="button"
            className="profile__link"
            onClick={handleEditClick}
          >
            Редактировать
          </button>
        ) : (
          ''
        )}
        <Link className="profile__link profile__link_color_red" to="/signout">
          Выйти из аккаунта
        </Link>
      </nav>
    </section>
  );
};

export default Profile;
