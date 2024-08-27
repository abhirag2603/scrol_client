import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { useRecoilState } from 'recoil';
import { userState } from '../states/atoms';
import Modal from './Modal'; // Import a modal component (can use a library or custom component)

const baseUrl = import.meta.env.MODE === 'production' 
    ? import.meta.env.VITE_BASE_URL_RENDER 
    : import.meta.env.VITE_BASE_URL_LOCAL;

const PostCard = ({
  postId,
  username,
  userId,
  firstName,
  lastName,
  description,
  picture,
  userPicturePath,
  likes = {},
  onLike,
  onDelete,
}) => {
  const likeCount = Object.keys(likes).length;
  const [liked, setLiked] = useState(false);
  const [isCommentsOpen, setIsCommentsOpen] = useState(false); // For toggling comments modal
  const [comments, setComments] = useState([]); // To store comments
  const [newComment, setNewComment] = useState(''); // For new comment input
  const navigate = useNavigate();
  const [user] = useRecoilState(userState);

  useEffect(() => {
    setLiked(likes[user._id] || false);
  }, [likes, user._id]);

  useEffect(() => {
    if (isCommentsOpen) {
      // Fetch comments when the modal is opened
      const fetchComments = async () => {
        try {
          const response = await axios.get(`${baseUrl}/posts/getcomments/${postId}`, {
            withCredentials: true,
          });
          setComments(response.data);
        } catch (error) {
          console.error('Error fetching comments:', error);
        }
      };

      fetchComments();
    }
  }, [isCommentsOpen, postId]);

  const handleLike = async () => {
    try {
      setLiked(!liked);
      await axios.patch(
        `${baseUrl}/posts/${postId}/like`,
        { userId: user._id },
        {
          withCredentials: true,
          headers: {
            'Content-Type': 'application/json',
          },
        }
      ); 
      onLike(); // Refresh posts after liking
    } catch (error) {
      console.error('Error liking post:', error);
    }
  };

  const handleDelete = async () => {
    const confirmed = window.confirm('Are you sure you want to delete this post?');
    if (confirmed) {
      try {
        await axios.delete(
          `${baseUrl}/posts/delete`,
          {
            data: { postId: postId }, // `data` key should be used for the body in DELETE request
            withCredentials: true,
            headers: {
              'Content-Type': 'application/json',
            },
          }
        );
        onDelete(); // Refresh posts after deletion
      } catch (error) {
        console.error('Error deleting post:', error);
      }
    }
  };

  const handleCommentClick = () => {
    setIsCommentsOpen(true);
  };

  const fetchComments = async () => {
    try {
      const response = await axios.get(`${baseUrl}/posts/getcomments/${postId}`, {
        withCredentials: true,
      });
      setComments(response.data);
    } catch (error) {
      console.error('Error fetching comments:', error);
    }
  };

  const handleAddComment = async () => {
    try {
      await axios.post(
        `${baseUrl}/posts/addcomment`,
        { content: newComment, postId },
        {
          withCredentials: true,
          headers: {
            'Content-Type': 'application/json',
          },
        }
      );
      setNewComment(''); // Clear the input field
      fetchComments(); // Refetch comments after adding a new one
    } catch (error) {
      console.error('Error adding comment:', error);
    }
  };

  const handleDeleteComment = async (commentId) => {
    try {
      await axios.delete(`${baseUrl}/posts/delete/${commentId}`, {
        withCredentials: true,
        headers: {
          'Content-Type': 'application/json',
        },
      });
      // Remove the deleted comment from the state
      fetchComments();
    } catch (error) {
      console.error('Error deleting comment:', error);
    }
  };

  const redirectToProfile = () => {
    navigate(`/profile/${userId}`);
  };

  return (
    <div className="bg-secondaryBackground dark:bg-dark-secondaryBackground text-primaryText rounded-lg shadow-lg overflow-hidden my-4 mx-auto max-w-md sm:max-w-sm md:max-w-lg">
      <div className="p-4 flex items-center space-x-4">
        {userPicturePath && (
          <img
            className="w-8 h-8 rounded-full cursor-pointer border-2 border-primaryAccent"
            src={userPicturePath || 'https://via.placeholder.com/150'}
            alt={`${firstName} ${lastName}`}
            onClick={redirectToProfile}
          />
        )}
        <div className="flex justify-between w-full">
          <h2
            className="text-primaryText dark:text-dark-primaryText text-lg font-semibold cursor-pointer"
            onClick={redirectToProfile}
          >
            {firstName} {lastName} (@{username})
          </h2>
          {user._id === userId && (
            <button
              className="ml-4 bg-red-500 text-white px-2 py-1 rounded hover:bg-red-600"
              onClick={handleDelete}
            >
              Delete
            </button>
          )}
        </div>
      </div>
      {picture && (
        <img
          className="w-full object-contain rounded-b-lg" // Ensure image scales correctly
          src={picture}
          alt="Post"
        />
      )}
      <div className="p-4">
        <p className="text-primaryText dark:text-dark-primaryText mb-2 break-words">{description}</p>
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
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z"
              />
            </svg>
            <span className="text-primaryText dark:text-dark-primaryText">{likeCount}</span>
          </div>
          <button
            className="text-primaryText dark:text-dark-primaryText"
            onClick={handleCommentClick}
          >
            Comment
          </button>
        </div>
      </div>
      {isCommentsOpen && (
        <Modal onClose={() => setIsCommentsOpen(false)}>
          <div className="p-4 bg-secondaryBackground dark:bg-dark-secondaryBackground rounded-lg shadow-lg">
            {picture && (
              <img
                className="w-full object-contain rounded-lg mb-4"
                src={picture}
                alt="Post"
              />
            )}    
            <div>
            <p className="text-primaryText font-semibold dark:text-dark-primaryText mb-2 break-words">{username}</p>
            <p className="text-primaryText dark:text-dark-primaryText mb-2 break-words">{description}</p>
            </div>
            <h3 className="text-lg text-primaryAccent font-semibold mb-2">Comments</h3>
            <div className="max-h-64 overflow-y-auto mb-4">
              {comments.length > 0 ? (
                comments.map((comment) => (
                  <div key={comment._id} className="mb-2 flex justify-between items-center">
                    <p className="text-sm text-secondaryText dark:text-dark-secondaryText">
                      {comment.user ? (
                        <>
                          <strong className="font-semibold">{comment.user.username}:</strong> {comment.content}
                        </>
                      ) : (
                        `User: ${comment.content}` // Fallback in case user is not available
                      )}
                    </p>
                    {comment.userId === user._id && (
                      <button
                        className="text-red-500 hover:text-red-700 ml-2"
                        onClick={() => handleDeleteComment(comment._id)}
                      >
                        Delete
                      </button>
                    )}
                  </div>
                ))
              ) : (
                <p className="text-gray-500 dark:text-gray-400">No comments yet.</p>
              )}
            </div>
            <div className="flex items-center space-x-2">
              <input
                type="text"
                value={newComment}
                onChange={(e) => setNewComment(e.target.value)}
                placeholder="Add a comment..."
                className="flex-1 p-2 border border-gray-300 rounded"
              />
              <button
                onClick={handleAddComment}
                className="bg-primaryAccent text-white px-4 py-2 rounded"
              >
                Add
              </button>
            </div>
          </div>
        </Modal>
      )}
    </div>
  );
};

export default PostCard;
