import React, { useState, useCallback } from 'react';
import { useRecoilState } from 'recoil';
import { userState } from '../states/atoms';
import axios from 'axios';
import { useDropzone } from 'react-dropzone';

const baseUrl = import.meta.env.MODE === 'production' 
    ? import.meta.env.VITE_BASE_URL_RENDER 
    : import.meta.env.VITE_BASE_URL_LOCAL;

const CreatePostWidget = ({ onPostCreated }) => {
  const [user] = useRecoilState(userState);
  const [file, setFile] = useState(null);
  const [description, setDescription] = useState('');
  const [preview, setPreview] = useState('');
  const [loading, setLoading] = useState(false);

  const onDrop = useCallback(acceptedFiles => {
    if (acceptedFiles?.length) {
      const selectedFile = acceptedFiles[0];
      setFile(selectedFile);
      const filePreviewUrl = URL.createObjectURL(selectedFile);
      setPreview(filePreviewUrl);
    }
  }, []);

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
    accept: 'image/*',
  });

  const handleDescriptionChange = (e) => {
    setDescription(e.target.value);
  };

  const handlePostCreation = async () => {
    if (!description) {
      alert('Please provide a description.');
      return;
    }

    const formData = new FormData();
    if (file) {
      formData.append('picture', file);
    }
    formData.append('username', user.username);
    formData.append('description', description);

    setLoading(true);

    try {
      const response = await axios.post(`${baseUrl}/posts/createpost`, formData, {
        withCredentials: true,
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });
      console.log('Post created successfully:', response.data);
      setFile(null);
      setPreview('');
      setDescription('');
      if (onPostCreated) {
        onPostCreated(); // Trigger the callback to refresh posts
      }
    } catch (error) {
      console.error('Error creating post:', error.response || error.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="bg-secondaryBackground dark:bg-dark-secondaryBackground text-primaryText dark:text-dark-primaryText shadow-lg rounded-lg overflow-hidden p-4">
      <h2 className="text-xl text-primaryText dark:text-dark-primaryText font-semibold mb-4">Create a Post</h2>

      <div 
        {...getRootProps()} 
        className={`border-2 border-border dark:border-dark-border dark:bg-dark-background text-primaryText rounded p-4 mb-4 ${
          isDragActive ? 'border-primaryAccent' : ''
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
                setFile(null);
                setPreview('');
              }}
              className="absolute top-2 right-2 text-primaryAccent hover:text-secondaryAccent"
            >
              X
            </button>
          </div>
        ) : (
          <p className='text-primaryText dark:text-dark-primaryText'>{isDragActive ? 'Drop the file here...' : 'Drag \'n\' drop a file here, or click to select one'}</p>
        )}
      </div>

      <textarea
        value={description}
        onChange={handleDescriptionChange}
        rows="4"
        className="border border-border dark:border-dark-border dark:text-dark-primaryText dark:bg-dark-background bg-background text-primaryText rounded p-2 w-full mb-4"
        placeholder="Write a description..."
      />

      <button
        onClick={handlePostCreation}
        className="bg-buttonBackground hover:bg-secondaryAccent text-buttonText font-semibold px-4 py-2 rounded"
        disabled={loading}
      >
        {loading ? (
          <div className="flex items-center">
            <svg className="animate-spin h-5 w-5 mr-3 text-white" viewBox="0 0 24 24">
              <path fill="none" d="M0 0h24v24H0z" />
              <path d="M12 4V2C6.48 2 2 6.48 2 12h2c0-4.41 3.59-8 8-8zm-4.16 2.32C8.03 5.2 9 6.6 9 8.14V12h3v-3.86C12 5.28 9.72 3 7 3c-.94 0-1.82.25-2.58.68L8.84 6.32zM12 13H9v-1.66C7.46 11.05 6 9.14 6 7V4h3v3c0 1.56 1.29 2.8 2.8 2.8V13z" />
            </svg>
            Uploading...
          </div>
        ) : 'Create Post'}
      </button>
    </div>
  );
};

export default CreatePostWidget;
