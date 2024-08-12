import React, { useState, useEffect } from 'react';
import axios from 'axios';
import PostCard from './Postcard';
import { useRecoilValue } from 'recoil';
import { userState } from '../states/atoms';

const FeedPost = () => {
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);
  const user = useRecoilValue(userState);

  const fetchPosts = async () => {
    try {
      const response = await axios.get('http://localhost:8000/posts/getfeedposts', {
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

  const handleLike = async () => {
    await fetchPosts(); // Refresh posts after liking
  };

  return (
    <div className='mb-40'>
      {loading ? (
        <p>Loading...</p>
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
          />
        ))
      )}
    </div>
  );
};

export default FeedPost;
