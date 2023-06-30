import './LikeButton.css';

const LikeButton = ({ isLiked, handleClickLikeButton }) => {
  return (
    <button
      type="button"
      className={`like-button${isLiked ? ' like-button_active' : ''}`}
      onClick={handleClickLikeButton}
      title={`${isLiked ? 'Удалить из избранного' : 'Добавить в избранное'}`}
    >
      &#10084;
    </button>
  );
};
export default LikeButton;
