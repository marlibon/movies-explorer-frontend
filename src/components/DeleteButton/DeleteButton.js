import './DeleteButton.css';
const DeleteButton = ({ handleClickDeleteButton }) => {

    return (
        <button
            type='button'
            className={`delete-button`}
            onClick={handleClickDeleteButton}
        // title={`${isLiked ? 'Удалить из избранного' : 'Добавить в избранное'}`}
        >&#215;</button>
    )
}
export default DeleteButton
