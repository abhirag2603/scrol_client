import React from 'react';

import { useRecoilState } from 'recoil';

import { registerState } from '../states/atoms';

import { userState } from '../states/atoms';

import { useNavigate } from 'react-router-dom';

import axios from 'axios';

  

const Register = () => {
const [formData, setFormData] = useRecoilState(registerState);
 const [user, setUser] = useRecoilState(userState);

const navigate = useNavigate();

  
 const handleChange = (e) => {

 setFormData({...formData,
[e.target.name]: e.target.value,
 });

 };

  
 const handleSubmit = async (e) => {

 e.preventDefault();
 try {

 const response = await axios.post(
'http://localhost:8000/users/register',
formData, // Send your form data here
{
 withCredentials: true, // Ensure cookies are sent and received
 headers: {
'Content-Type': 'application/json', // Ensure content type is set to JSON
 },
}
 );
 setUser(response.data.user);
localStorage.setItem('user', JSON.stringify(response.data.user));

navigate('/', { replace: true });

} catch (error) {

console.error('Error during registration:', error);
 }
 };

  

return (

<form onSubmit={handleSubmit}>

<input type="text" name="username" value={formData.username} onChange={handleChange} placeholder="Username" required />

<input type="text" name="firstName" value={formData.firstName} onChange={handleChange} placeholder="First Name" required />

<input type="text" name="lastName" value={formData.lastName} onChange={handleChange} placeholder="Last Name" required />

<input type="email" name="email" value={formData.email} onChange={handleChange} placeholder="Email" required />

 <input type="password" name="password" value={formData.password} onChange={handleChange} placeholder="Password" required />

<button type="submit">Register</button>
 </form>
);

};

  

export default Register;

