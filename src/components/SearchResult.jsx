import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useParams } from 'react-router-dom';
import Navbar from './Navbar';
import UserCard from './UserCard';
import { userState } from '../states/atoms';
import { useRecoilState } from 'recoil';

const baseUrl = import.meta.env.MODE === 'production' 
    ? import.meta.env.VITE_BASE_URL_RENDER 
    : import.meta.env.VITE_BASE_URL_LOCAL;

function SearchResult() {
  const [users, setUsers] = useState([]);
  const [error, setError] = useState(null);
  const { username } = useParams();

  useEffect(() => {
    if (username) {
      const fetchUsers = async () => {
        try {
          const response = await axios.get(`${baseUrl}/users/search/${username}`, {
            withCredentials: true
          });
          setUsers(response.data);
          setError(null);
        } catch (error) {
          if (error.response && error.response.status === 404) {
            setError('No users found');
          } else {
            setError('An error occurred while fetching users');
          }
        }
      };

      fetchUsers();
    }
  }, [username]);

  return (
    <div>
      <div className="sticky top-0 z-50 bg-secondaryBackground dark:bg-secondaryBackground">
        <Navbar />
      </div>

      <div className="container mx-auto p-4">
        <h1 className="text-2xl text-primaryText font-bold mb-4">Search Results</h1>

        {error && <p className="text-red-500">{error}</p>}
        
        {users.length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
            {users.map(user => (
              <UserCard key={user._id} cardUser={user} />
            ))}
          </div>
        ) : (
          <></>
        )}
      </div>
    </div>
  );
}

export default SearchResult;
