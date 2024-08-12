import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { useRecoilState } from 'recoil';
import { userState } from '../states/atoms';
import axios from 'axios';
import Navbar from './Navbar';
import PostCard from './PostCard';

const Profile = () => {
  const { userId } = useParams(); // Get userId from URL parameters
  const [user, setUser] = useRecoilState(userState);
  const [profile, setProfile] = useState({});
  const [posts, setPosts] = useState([]); // State to hold user's posts
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const response = await axios.get(`http://localhost:8000/users/${userId}`, {
          withCredentials: true,
        });
        setProfile(response.data);
        setLoading(false);
      } catch (error) {
        console.error('Error fetching profile:', error);
        setError('Error fetching profile');
        setLoading(false);
      }
    };

    const fetchPosts = async () => {
      try {
        const response = await axios.get(`http://localhost:8000/posts/${userId}/posts`, {
          withCredentials: true,
        });
        setPosts(response.data);
      } catch (error) {
        console.error('Error fetching posts:', error);
        setError('Error fetching posts');
      }
    };

    fetchProfile();
    fetchPosts();
  }, [userId]);

  const handleCreatePost = () => {
    // Handle create post logic
    console.log('Create Post button clicked');
  };

  if (loading) {
    return <div className="min-h-screen bg-gray-900 text-white">Loading...</div>;
  }

  if (error) {
    return <div className="min-h-screen bg-gray-900 text-white">{error}</div>;
  }

  return (
    <div className="min-h-screen bg-gray-900 text-white">
      <Navbar />
      <div className="container mx-auto px-4 py-8">
        <div className="flex flex-col md:flex-row items-center">
          <div className="md:w-1/4 flex justify-center mb-4 md:mb-0">
            <img
              src={profile.avatar || 'https://via.placeholder.com/150'}
              alt="Profile"
              className="w-32 h-32 rounded-full border-4 border-blue-600"
            />
          </div>
          <div className="md:w-3/4 md:pl-6">
            <h1 className="text-3xl font-semibold">{profile.firstName} {profile.lastName}</h1>
            <p className="text-gray-400 mt-2">{profile.username}</p>
            <p className="text-gray-400 mt-2">{profile.email}</p>
            <p className="text-gray-400 mt-2">{profile.bio}</p>
            {user && user._id === profile._id && (
              <button
                onClick={handleCreatePost}
                className="mt-4 bg-blue-600 hover:bg-blue-700 text-white font-semibold px-4 py-2 rounded"
              >
                Create Post
              </button>
            )}
          </div>
        </div>
        <div className="mt-8">
          <h2 className="text-2xl font-semibold mb-4">Posts</h2>
          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
            {posts.length ? (
              posts.map(post => (
                <PostCard
                  key={post._id}
                  _id={post._id}
                  username={post.username}
                  userId={post.userId}
                  firstName={post.firstName}
                  lastName={post.lastName}
                  description={post.description}
                  picture={post.picture}
                  userPicturePath={post.userPicturePath}
                  likes={post.likes || []} // Ensure likes is an array
                  onLike={() => fetchPosts()} // Refresh posts after liking
                />
              ))
            ) : (
              <p className="text-gray-400">No posts available.</p>
            )}
          </div>
        </div>
        <div className="mt-8">
          <h2 className="text-2xl font-semibold mb-4">Friends</h2>
          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
            {profile.friends && profile.friends.length ? (
              profile.friends.map(friend => (
                <div key={friend._id} className="bg-gray-800 p-4 rounded-lg shadow-lg">
                  <img
                    src={friend.avatar || 'https://via.placeholder.com/50'}
                    alt="Friend"
                    className="w-12 h-12 rounded-full border-2 border-blue-600"
                  />
                  <h3 className="text-xl font-semibold mt-2">{friend.firstName} {friend.lastName}</h3>
                  <p className="text-gray-400">{friend._id}</p>
                </div>
              ))
            ) : (
              <p className="text-gray-400">No friends available.</p>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Profile;
