import React, { useState, useEffect, forwardRef, useImperativeHandle } from 'react';
import axios from 'axios';
import PostCard from './Postcard';
import { useRecoilValue } from 'recoil';
import { userState } from '../states/atoms';
const baseUrlLocal= import.meta.env.VITE_BASE_URL_LOCAL;
const baseUrlRender=import.meta.env.VITE_BASE_URL_RENDER;

const FeedPost = forwardRef((props, ref) => {
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);
  const user = useRecoilValue(userState);

  const fetchPosts = async () => {
    try {
      const response = await axios.get(`${baseUrlLocal}/posts/getfeedposts`, {
        withCredentials: true,
        headers: {
          'Content-Type': 'application/json',
        },
      });
      setPosts(response.data);
    } catch (error) {
      console.error('Error fetching posts:', error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchPosts();
  }, []);

  useImperativeHandle(ref, () => ({
    refreshPosts() {
      fetchPosts();
    },
  }));

  const handleLike = async () => {
    await fetchPosts(); // Refresh posts after liking
  };

  const handleDelete = () => {
    fetchPosts(); // Refresh posts after deletion
  };

  return (
    <div className='mb-40'>
      {loading ? (
        <div className="flex justify-center items-center min-h-screen">
          <img src="loading.gif" alt="Loading..." className="w-16 h-16" />
        </div>
      ) : (
        posts.map(post => (
          <PostCard
            key={post._id}
            userPicturePath={post.userPicturePath}
            username={post.username}
            picture={post.picture}
            description={post.description}
            likes={post.likes}
            postId={post._id}
            userId={post.userId}
            onLike={handleLike}
            onDelete={handleDelete}
          />
        ))
      )}
    </div>
  );
});

export default FeedPost;
