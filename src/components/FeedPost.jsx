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

  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(0);
  
  const fetchPosts = async (page = 1) => {
      try {
          const response = await axios.get(`${baseUrlLocal}/posts/getfeedposts`, {
              params: { page, limit: 6 },
              withCredentials: true,
              headers: {
                  'Content-Type': 'application/json',
              },
          });
  
          if (page === 1) {
              setPosts(response.data.posts);
             
          } else {
              setPosts(prevPosts => [...prevPosts, ...response.data.posts]);
          }
          
          setTotalPages(response.data.totalPages);
      } catch (error) {
          console.error('Error fetching posts:', error);
      } finally {
          setLoading(false);
          console.log(posts);
      }
  };
  
  useEffect(() => {
      fetchPosts(page);
  }, [page]);
  
  const loadMorePosts = () => {
      if (page < totalPages) {
          setPage(prevPage => prevPage + 1);
      }
  };
  
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
            <div className="flex justify-center items-center max-h-screen">
                <img src="loading.gif" alt="Loading..." className="w-16 h-16" />
            </div>
        ) : (
            <>
                {posts.map(post => (
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
                ))}
                {page < totalPages && (
                    <div className="flex justify-center mt-4">
                        <button onClick={loadMorePosts} className="btn btn-primary">
                            Load More
                        </button>
                    </div>
                )}
            </>
        )}
    </div>
);

});

export default FeedPost;
