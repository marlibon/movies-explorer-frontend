import Popup from '../Popup/Popup';
import imageSuccess from '../../images/success.png'
import imageFail from '../../images/fail.png'
import { useEffect, useState } from 'react';

const InfoTooltip = ({ name, isOpen, setPopupOpened, statusCompleted, errorMessage }) => {
    const [content, setContent] = useState({ image: '', text: '' });

    useEffect(() => {

        if (statusCompleted) {
            setContent({ image: imageSuccess, text: 'Вы успешно зарегистрировались! Сейчас вы будете переадресованы на страницу "Фильмы"' })
        }
        if (!statusCompleted && (typeof errorMessage === "boolean" || !errorMessage)) {
            setContent({ image: imageFail, text: 'Что-то пошло не так! Попробуйте ещё раз.' })
        }
        // если пропс с текстом ошибки у нас передан, то показываем  его
        if (!statusCompleted && errorMessage) {
            setContent({ image: imageFail, text: errorMessage })
        }
    }, [statusCompleted, errorMessage])

    return (
        <Popup name="notify" isOpen={isOpen} setPopupOpened={setPopupOpened}>
            <img className="popup__notify-image" src={content.image} alt={content.text} />
            <h3 className='popup__notify-title'>{content.text}</h3>
        </Popup>
    )
}
export default InfoTooltip
