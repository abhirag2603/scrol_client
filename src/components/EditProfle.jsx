import React, { useState, useCallback } from 'react';
import { useRecoilState } from 'recoil';
import { userState } from '../states/atoms';
import { useNavigate } from 'react-router-dom';
import { useDropzone } from 'react-dropzone';
import axios from 'axios';

const EditProfile = () => {
  const [user, setUser] = useRecoilState(userState);
  const [formData, setFormData] = useState({
    firstName: user.firstName || '',
    lastName: user.lastName || '',
    username: user.username || '',
  });
  const [avatarFile, setAvatarFile] = useState(null);
  const [preview, setPreview] = useState('');
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const onDrop = useCallback((acceptedFiles) => {
    if (acceptedFiles?.length) {
      const selectedFile = acceptedFiles[0];
      setAvatarFile(selectedFile);
      const filePreviewUrl = URL.createObjectURL(selectedFile);
      setPreview(filePreviewUrl);
    }
  }, []);

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
    accept: 'image/*',
    maxFiles: 1,
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!formData.firstName || !formData.lastName || !formData.username) {
      alert('Please fill in all required fields.');
      return;
    }

    const updatedData = { ...formData };

    setLoading(true);

    try {
      if (avatarFile) {
        const formDataWithAvatar = new FormData();
        formDataWithAvatar.append('firstName', updatedData.firstName);
        formDataWithAvatar.append('lastName', updatedData.lastName);
        formDataWithAvatar.append('username', updatedData.username);
        formDataWithAvatar.append('avatar', avatarFile);

        const response = await axios.patch(`http://localhost:8000/users/${user._id}`, formDataWithAvatar, {
          headers: {
            'Content-Type': 'multipart/form-data',
          },
          withCredentials: true,
        });
        const updatedUser = response.data;
        setUser(updatedUser);
        localStorage.setItem('user', JSON.stringify(updatedUser));
        navigate(`/profile/${user._id}`);
      } else {
        const response = await axios.patch(`http://localhost:8000/users/${user._id}`, updatedData, {
          withCredentials: true,
        });
        const updatedUser = response.data;
        setUser(updatedUser);
        localStorage.setItem('user', JSON.stringify(updatedUser));
        navigate(`/profile/${user._id}`);
      }
    } catch (error) {
      console.error('Error updating profile:', error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-900 text-white flex justify-center items-center">
      <form onSubmit={handleSubmit} className="bg-gray-800 p-6 rounded shadow-lg w-full max-w-md">
        <h2 className="text-2xl font-semibold mb-4">Edit Profile</h2>

        <div className="mb-4">
          <label className="block text-sm font-medium mb-1">First Name</label>
          <input
            type="text"
            name="firstName"
            value={formData.firstName}
            onChange={handleChange}
            className="w-full p-2 rounded bg-gray-700 text-white"
          />
        </div>

        <div className="mb-4">
          <label className="block text-sm font-medium mb-1">Last Name</label>
          <input
            type="text"
            name="lastName"
            value={formData.lastName}
            onChange={handleChange}
            className="w-full p-2 rounded bg-gray-700 text-white"
          />
        </div>

        <div className="mb-4">
          <label className="block text-sm font-medium mb-1">Username</label>
          <input
            type="text"
            name="username"
            value={formData.username}
            onChange={handleChange}
            className="w-full p-2 rounded bg-gray-700 text-white"
          />
        </div>

        <div
          {...getRootProps()}
          className={`mb-4 p-4 border-2 border-dashed border-gray-600 rounded cursor-pointer ${
            isDragActive ? 'border-blue-500' : ''
          }`}
        >
          <input {...getInputProps()} />
          {preview ? (
            <div className="relative">
              <img
                src={preview}
                alt="Preview"
                className="w-full h-48 object-cover rounded"
              />
              <button
                onClick={() => {
                  setAvatarFile(null);
                  setPreview('');
                }}
                className="absolute top-2 right-2 text-gray-300 hover:text-white"
              >
                X
              </button>
            </div>
          ) : isDragActive ? (
            <p>Drop the file here...</p>
          ) : (
            <p>Drag 'n' drop a file here, or click to select one</p>
          )}
        </div>

        <button
          type="submit"
          className="w-full py-2 px-4 bg-blue-600 rounded hover:bg-blue-700 transition"
          disabled={loading}
        >
          {loading ? (
            <div className="flex items-center justify-center">
              <svg
                className="animate-spin h-5 w-5 mr-3 text-white"
                viewBox="0 0 24 24"
              >
                <path fill="none" d="M0 0h24v24H0z" />
                <path
                  d="M12 4V2C6.48 2 2 6.48 2 12h2c0-4.41 3.59-8 8-8zm-4.16 2.32C8.03 5.2 9 6.6 9 8.14V12h3v-3.86C12 5.28 9.72 3 7 3c-.94 0-1.82.25-2.58.68L8.84 6.32zM12 13H9v-1.66C7.46 11.05 6 9.14 6 7V4h3v3c0 1.56 1.29 2.8 2.8 2.8V13z"
                  fill="currentColor"
                />
              </svg>
              Updating...
            </div>
          ) : (
            'Save Changes'
          )}
        </button>
      </form>
    </div>
  );
};

export default EditProfile;
