import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useRecoilState } from 'recoil';
import { userState } from '../states/atoms';
import axios from 'axios';
import Navbar from './Navbar';
import PostCard from './Postcard';
import CreatePostWidget from './CreatePostWidget';
import FriendCard from './FriendCard';
import FriendRequestCard from './FriendRequestCard';
import './scrollbar.css'; // Adjust the path as necessary

const baseUrl = import.meta.env.MODE === 'production' 
    ? import.meta.env.VITE_BASE_URL_RENDER 
    : import.meta.env.VITE_BASE_URL_LOCAL;

const Profile = () => {
  const { userId } = useParams();
  const [user, setUser] = useRecoilState(userState); 
  const [profile, setProfile] = useState({});
  const [posts, setPosts] = useState([]);
  const [friends, setFriends] = useState([]);
  const [friendRequests, setFriendRequests] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [isFriend, setIsFriend] = useState(false);
  const [hasSentRequest, setHasSentRequest] = useState(false);
  const navigate = useNavigate();

  const fetchPosts = async () => {
    try {
      const response = await axios.get(`${baseUrl}/posts/${userId}/posts`, {
        withCredentials: true,
        headers: {
          'Content-Type': 'application/json',
        },
      });
      setPosts(response.data);
    } catch (error) {
      console.error('Error fetching posts:', error);
      setError('Error fetching posts');
    }
  };

  const fetchProfile = async () => {
    try {
      const response = await axios.get(`${baseUrl}/users/${userId}`, {
        withCredentials: true,
      });
      const fetchedProfile = response.data;
      setProfile(fetchedProfile);
      setFriends(fetchedProfile.friends || []);
      setFriendRequests(fetchedProfile.friendRequests || []);
      setLoading(false);
      if (user._id !== fetchedProfile._id) {
        setIsFriend(fetchedProfile.friends.includes(user._id));
      }
      setHasSentRequest(fetchedProfile.friendRequests.includes(user._id));
    } catch (error) {
      console.error('Error fetching profile:', error);
      setError('Error fetching profile');
      setLoading(false);
    }
  };

  const handleButtonClick = () => {
    if (isFriend) {
      removeFriend();
    } else if (hasSentRequest) {
      // Handle case where request is pending (optional)
    } else {
      handleSendRequest();
    }
  };

  const updateUserState = async () => {
    try {
      const response = await axios.get(`${baseUrl}/users/${user._id}`, {
        withCredentials: true,
      });
      const updatedUser = response.data;
      setUser(updatedUser);
      localStorage.setItem('user', JSON.stringify(updatedUser));
      fetchProfile();
    } catch (error) {
      console.error('Error updating user state:', error);
    }
  };

  const handleSendRequest = async () => {
    try {
      await axios.post(`${baseUrl}/users/sendRequest/${userId}`, {}, {
        withCredentials: true,
      });
      setHasSentRequest(true);
    } catch (error) {
      console.error('Error sending friend request:', error);
    }
  };

  const removeFriend = async () => {
    try {
      await axios.delete(`${baseUrl}/users/${user._id}/friends/${userId}`, {
        withCredentials: true,
      });
      await updateUserState(); 
      fetchProfile(); // Refresh the profile data after removal
    } catch (error) {
      console.error('Error removing friend:', error);
    }
  };

  const handleAcceptRequest = async () => {
    fetchProfile();
  };

  const handleRejectRequest = async () => {
    fetchProfile();
  };

  const handleLike = () => {
    fetchPosts();
  };

  const handleDelete = () => {
    fetchPosts();
  };

  useEffect(() => {
    fetchProfile();
    fetchPosts();
  }, [userId]);
  if (loading) {
    return (
      <div className="min-h-screen bg-background dark:bg-dark-background text-primaryText dark:textdark-primaryText flex justify-center items-center">
        <img src="/loading.gif" alt="Loading..." className="w-16 h-16" />
      </div>
    );
  }

  if (error) {
    return <div className="min-h-screen bg-background dark:bg-dark-secondaryBackground text-primaryText dark:text-secondaryText">{error}</div>;
  }

  return (
    <div className="min-h-screen  bg-background dark:bg-dark-background text-primaryText dark:text-dark-primaryText">
      <div className="sticky top-0 z-50">
        <Navbar />
      </div>
      <div className="container mx-auto px-4 py-8">
        <div className="flex flex-col md:flex-row lg:flex-row items-center lg:justify-between justify-between md:justify-between">
          <div className="md:w-1/4 flex lg:flex-row md:flex-row gap-6 items-center mb-4 md:mb-0">
            <img
              className="w-32 h-32 scale-75 md:scale-90 object-cover rounded-full border-4 border-primaryAccent"
              src={profile.avatar || "https://via.placeholder.com/150"}
              alt="avatar"
            />
            <div className="">
              <h1 className="lg:text-2xl text-xl md:text-2xl font-semibold">{profile.firstName} {profile.lastName}</h1>
              <p className="text-secondaryText dark:text-dark-secondaryText mt-2">{profile.username}</p>
              {user && user._id === profile._id && (<p className="text-secondaryText dark:text-dark-secondaryText mt-2">{profile.email}</p>)}
              {user && user._id === profile._id && (
                <button
                  className="mt-2 px-4 py-2 rounded bg-primaryAccent hover:bg-secondaryAccent text-buttonText"
                  onClick={() => navigate(`/edit-profile`)}
                >
                  Edit Profile
                </button>
              )}
            </div>
          </div>
          {user && user._id === profile._id && (
            <div className='lg:w-1/4 md:scale-90 scale-90'>
              <CreatePostWidget />
            </div>
          )}
          {user && user._id !== profile._id && (
            <button
              className={`mt-4 md:mt-0 ml-4 px-4 py-2 rounded ${isFriend ? 'bg-red-600' : hasSentRequest ? 'bg-yellow-500' : 'bg-green-600'} text-buttonText`}
              onClick={handleButtonClick}
              disabled={hasSentRequest && !isFriend}
            >
              {isFriend ? 'Remove Friend' : hasSentRequest ? 'Pending' : 'Add Friend'}
            </button>
          )}
        </div>
        <div className="mt-8">
          <h2 className="text-2xl font-semibold mb-4">Posts</h2>
          <div className="">
            <div className="flex gap-6 scrollbar-transparent">
              {posts.length ? (
                posts.map(post => (
                  <div key={post._id} className="min-w-max">
                    <PostCard
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
                      key={post._id}
                    />
                  </div>
                ))
              ) : (
                <p className="text-secondaryText dark:text-primaryText">No posts available.</p>
              )}
            </div>
          </div>
        </div>
        <div className="mt-8">
          <h2 className="text-2xl font-semibold mb-4">Friends</h2>
          <div className="flex flex-row gap-6 scrollbar-transparent">
            {friends.length ? (
              friends.map(friend => (
                <div className='min-w-max' key={friend}>
                  <FriendCard
                    friendId={friend}
                  />
                </div>
              ))
            ) : (
              <p className="text-secondaryText dark:text-primaryText">No friends available.</p>
            )}
          </div>
        </div>
        {profile._id === user._id ? (
          friendRequests.length > 0 ? (
            <div className="mt-8">
              <h2 className="text-2xl font-semibold mb-4">Friend Requests</h2>
              <div className="flex gap-6 scrollbar-transparent">
                {friendRequests.map(requestId => (
                  requestId && (
                    <div className='min-w-max'>
                    <FriendRequestCard
                      key={requestId}
                      requestId={requestId}
                      onAccept={handleAcceptRequest}
                      onReject={handleRejectRequest}
                    />
                      </div>
                  )
                ))}
              </div>
            </div>
          ) : null
        ) : null}
      </div>
    </div>
  );
};

export default Profile;