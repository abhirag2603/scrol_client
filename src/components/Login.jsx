import React from 'react';

import { useRecoilState } from 'recoil';

import { loginState } from '../states/atoms';

import { userState } from '../states/atoms';

import { useNavigate } from 'react-router-dom';

import axios from 'axios';




const Login = () => {

    const [formData, setFormData] = useRecoilState(loginState);

    const [user, setUser] = useRecoilState(userState);

    const navigate = useNavigate();



    const handleChange = (e) => {

        setFormData({

            ...formData,

            [e.target.name]: e.target.value,

        });

    };



    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
        const response = await axios.post(
                'http://localhost:8000/users/login',
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

            console.error('Error during login:', error);

        }

    };



    return (

        <div>


            <form onSubmit={handleSubmit}>

                <input type="email" name="email" value={formData.email} onChange={handleChange} placeholder="Email" required />

                <input type="password" name="password" value={formData.password} onChange={handleChange} placeholder="Password" required />

                <button type="submit">Login</button>

            </form>

        </div>

    );

};

export default Login;