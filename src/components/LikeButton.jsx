import { useState } from 'react';
import FavoriteIcon from '@mui/icons-material/Favorite';
import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder';

const LikeButton = () => {
  const [isLiked, setIsLiked] = useState(false);
  return (
    <button className="like-button" onClick={() => setIsLiked(!isLiked)}>
      {isLiked ? (
        <FavoriteIcon className="heartFilled" />
      ) : (
        <FavoriteBorderIcon />
      )}
    </button>
  );
};

export default LikeButton;
