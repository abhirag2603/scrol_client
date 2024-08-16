import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { useRecoilState } from 'recoil';
import { userState } from '../states/atoms';
import axios from 'axios';
import Navbar from './Navbar';
import PostCard from './Postcard';
import CreatePostWidget from './CreatePostWidget';
import { useNavigate } from 'react-router-dom';
import FriendCard from './FriendCard'; // Import FriendCard
const baseUrlLocal= import.meta.env.VITE_BASE_URL_LOCAL;
const baseUrlRender=import.meta.env.VITE_BASE_URL_RENDER;


const Profile = () => {
  const { userId } = useParams();
  const [user, setUser] = useRecoilState(userState);
  const [profile, setProfile] = useState({});
  const [posts, setPosts] = useState([]);
  const [friends, setFriends] = useState([]); // State to hold friends
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [isFriend, setIsFriend] = useState(false);
  const navigate = useNavigate();

  const fetchPosts = async () => {
    try {
      const response = await axios.get(`${baseUrlLocal}/posts/${userId}/posts`, {
        withCredentials: true,
      });
      setPosts(response.data);
    } catch (error) {
      console.error('Error fetching posts:', error);
      setError('Error fetching posts');
    }
  };

  const fetchProfile = async () => {
    try {
      const response = await axios.get(`${baseUrlLocal}/users/${userId}`, {
        withCredentials: true,
      });
      setProfile(response.data);
      setFriends(response.data.friends || []); // Set friends state
      setLoading(false);
      setIsFriend(user.friends.includes(userId));
    } catch (error) {
      console.error('Error fetching profile:', error);
      setError('Error fetching profile');
      setLoading(false);
    }
  };

  const handleFriendAction = async () => {
    try {
      await axios.patch(`${baseUrlLocal}/users/${user._id}/${userId}`, {}, {
        withCredentials: true,
      });

      const response = await axios.get(`${baseUrlLocal}/users/${user._id}`, {
        withCredentials: true,
      });
      const updatedUser = response.data;

      setUser(updatedUser);
      localStorage.setItem('user', JSON.stringify(updatedUser));

      setIsFriend(updatedUser.friends.includes(userId));

    } catch (error) {
      console.error('Error updating friend status:', error);
    }
  };

  useEffect(() => {
    fetchProfile();
    fetchPosts();
  }, [userId]);

  const handleLike = () => {
    fetchPosts();
  };

  const handleDelete = () => {
    fetchPosts();
  };

  const handlePostCreated = () => {
    fetchPosts();
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-900 text-white flex justify-center items-center">
       <img src="/loading.gif" alt="Loading..." className="w-16 h-16" />
      </div>
    );
  }

  if (error) {
    return <div className="min-h-screen bg-gray-900 text-white">{error}</div>;
  }

  return (
    <div className="min-h-screen bg-gray-900 text-white">
      <div className="sticky top-0 z-50">
        <Navbar />
      </div>
      <div className="container mx-auto px-4 py-8">
        <div className="flex flex-col md:flex-row items-start md:items-center">
          <div className="md:w-1/4 flex justify-center mb-4 md:mb-0">
          <img
                    className="w-32 h-32 object-cover rounded-full border-4 border-blue-600"
                    src={profile.avatar || "https://via.placeholder.com/150"}
                    alt="avatar"
                />
          </div>
          <div className="md:w-3/4 md:pl-6 flex flex-col md:flex-row items-start md:items-center gap-48">
            <div className="flex-col gap-4">
              <h1 className="text-3xl font-semibold">{profile.firstName} {profile.lastName}</h1>
              <p className="text-gray-400 mt-2">{profile.username}</p>
              {user && user._id === profile._id && (<p className="text-gray-400 mt-2">{profile.email}</p>)}
              {user && user._id === profile._id && (
                <button
                  className="mt-2 px-4 py-2 rounded bg-blue-600"
                  onClick={() => navigate(`/edit-profile`)}
                >
                  Edit Profile
                </button>
              )}
            </div>
            {user && user._id === profile._id ? (
              <div className="mt-4 md:mt-0 ml-4">
                <CreatePostWidget onPostCreated={handlePostCreated} />
              </div>
            ) : (
              <button
                className={`mt-4 md:mt-0 ml-4 px-4 py-2 rounded ${isFriend ? 'bg-red-600' : 'bg-green-600'}`}
                onClick={handleFriendAction}
              >
                {isFriend ? 'Remove Friend' : 'Add Friend'}
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
                  postId={post._id}
                  username={post.username}
                  userId={post.userId}
                  firstName={post.firstName}
                  lastName={post.lastName}
                  description={post.description}
                  picture={post.picture}
                  userPicturePath={post.userPicturePath}
                  likes={post.likes || []}
                  onLike={handleLike}
                  onDelete={handleDelete}
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
            {friends.length ? (
              friends.map(friend => (
                <FriendCard
                  key={friend._id}
                  friendId={friend}
                />
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
