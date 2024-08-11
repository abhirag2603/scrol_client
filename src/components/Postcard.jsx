import React,{useState,useEffect} from 'react';
import axios from 'axios';

const PostCard = ({ userPicturePath, username, picture, description, likes, postId, user, onLike }) => {
  const likeCount = Object.keys(likes).length;
  const [liked, setLiked] = useState(false);

  // Check if the current user has liked the post when component mounts
  useEffect(() => {
    setLiked(likes[user._id] || false);
  }, [likes, user._id]);

  const handleLike = async () => {
    try {
      await axios.patch(`http://localhost:8000/posts/${postId}/like`, { userId: user._id }, {
        withCredentials: true,
        headers: {
          'Content-Type': 'application/json',
        },
      });
      // Toggle the liked state
      setLiked(!liked);
      // Call the onLike callback to refresh posts
      onLike();
    } catch (error) {
      console.error('Error liking post:', error);
    }
  };

  return (
    <div className="bg-gray-800 rounded-lg shadow-lg transition-transform transform hover:scale-105 hover:shadow-xl mb-4 mx-auto max-w-md sm:max-w-sm md:max-w-lg">
      <div className="p-4 flex items-center space-x-4">
        <img className="w-12 h-12 rounded-full" src={userPicturePath} alt={username} />
        <div>
          <h2 className="text-white text-lg font-semibold">{username}</h2>
        </div>
      </div>
      <img className="w-full h-64 object-cover" src={picture} alt="Post" />
      <div className="p-4">
        <p className="text-gray-300 mb-2">{description}</p>
        <div className="flex items-center space-x-4">
          <div className="flex items-center space-x-1">
            <svg 
              xmlns="http://www.w3.org/2000/svg" 
              className={`h-6 w-6 cursor-pointer ${liked ? 'text-red-500' : 'text-gray-400'}`} 
              fill="none" 
              viewBox="0 0 24 24" 
              stroke="currentColor" 
              onClick={handleLike}
            >
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z" />
            </svg>
            <span className="text-white">{likeCount}</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PostCard;
