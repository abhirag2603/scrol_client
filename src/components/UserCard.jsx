import React from 'react';
import { useRecoilState } from 'recoil';
import { userState } from '../states/atoms';
import { useNavigate } from 'react-router-dom';
const baseUrlLocal= import.meta.env.VITE_BASE_URL_LOCAL;
const baseUrlRender=import.meta.env.VITE_BASE_URL_RENDER;

const UserCard = () => {
    const [user, setUser] = useRecoilState(userState);
    const navigate = useNavigate();

    const handleClick = () => {
        navigate(`/profile/${user._id}`);
    };

    return (
        <div className="max-w-xl sm:max-w-lg md:max-w-xl bg-gray-800 shadow-lg rounded-lg overflow-hidden my-4 mx-auto" onClick={handleClick}>
            {/* Avatar Section */}
            <div className="flex justify-center pt-4 mb-4">
                <img
                    className="w-24 h-24 object-cover rounded-full border-4 border-blue-600"
                    src={user.avatar || "https://via.placeholder.com/150"}
                    alt="avatar"
                />
            </div>

            {/* User Info Section */}
            <div className="flex items-center px-6 py-3 bg-gray-900">
                <h1 className="mx-3 text-white font-semibold text-lg">{user.username || "Username"}</h1>
            </div>

            <div className="py-4 px-6">
                {/* Full Name */}
                <h1 className="text-2xl font-semibold text-gray-200">
                    {user.firstName} {user.lastName}
                </h1>

                {/* Email */}
                <div className="flex items-center mt-4 text-gray-300">
                    <svg className="h-6 w-6 fill-current" viewBox="0 0 512 512">
                        <path d="M437.332 80H74.668C51.199 80 32 99.198 32 122.667v266.666C32 412.802 51.199 432 74.668 432h362.664C460.801 432 480 412.802 480 389.333V122.667C480 99.198 460.801 80 437.332 80zM432 170.667L256 288 80 170.667V128l176 117.333L432 128v42.667z"/>
                    </svg>
                    <h1 className="px-2 text-sm">{user.email || "user@example.com"}</h1>
                </div>

                {/* Number of Friends */}
                
            </div>
        </div>
    );
};

export default UserCard;
