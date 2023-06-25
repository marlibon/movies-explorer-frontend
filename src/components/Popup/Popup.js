import { useEffect } from 'react'
import './Popup.css';

const Popup = ({ name = "view-image", isOpen, setPopupOpened, children }) => {
    useEffect(() => {
        function handleKeyEsc (e) {
            e.key === 'Escape' && setPopupOpened(false)
        }
        isOpen && document.addEventListener('keydown', handleKeyEsc);

        return () => document.removeEventListener('keydown', handleKeyEsc)
    }, [isOpen])

    function handleClickByOverlay (e) {
        e.currentTarget === e.target && setPopupOpened(false)
    }
    return (
        <section className={`popup popup_type_${name} ${isOpen && 'popup_opened'}`} onClick={handleClickByOverlay}>
            <div className={`popup__container popup__container_${name}`}>
                <button type="button" className="popup__close" onClick={() => setPopupOpened(false)} />
                {children}
            </div>

        </section>
    )
}

export default Popup
