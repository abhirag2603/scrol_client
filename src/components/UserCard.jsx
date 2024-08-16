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
                <div className="flex items-center mt-4 text-gray-300">
                    <svg className="h-6 w-6 fill-current" viewBox="0 0 512 512">
                        <path d="M239.208 343.937c-17.78 10.103-38.342 15.876-60.255 15.876-21.909 0-42.467-5.771-60.246-15.87C71.544 358.331 42.643 406 32 448h293.912c-10.639-42-39.537-89.683-86.704-104.063zM178.953 120.035c-58.479 0-105.886 47.394-105.886 105.858 0 58.464 47.407 105.857 105.886 105.857s105.886-47.394 105.886-105.857c0-58.464-47.408-105.858-105.886-105.858zm0 186.488c-33.671 0-62.445-22.513-73.997-50.523H252.95c-11.554 28.011-40.326 50.523-73.997 50.523z"/>
                    </svg>
                </div>
            </div>
        </div>
    );
};

export default UserCard;
