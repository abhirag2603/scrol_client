import React from 'react';
import { useRecoilState } from 'recoil';
import { userState } from '../states/atoms';
import { useNavigate } from 'react-router-dom';

const UserCard = ({ cardUser }) => {
    const [user,setUser] = useRecoilState(userState);
    const navigate = useNavigate();

    const handleClick = () => {
        navigate(`/profile/${cardUser._id}`);
    };

    return (
        <div 
            className="max-w-sm min-w-[20rem] bg-secondaryBackground text-primaryText shadow-lg rounded-lg overflow-hidden my-4 mx-auto cursor-pointer" 
            onClick={handleClick}
        >
            {/* Avatar Section */}
            <div className="flex justify-center pt-4 mb-4">
                <img
                    className="w-24 h-24 object-cover rounded-full border-4 border-primaryAccent"
                    src={cardUser.avatar || "https://via.placeholder.com/150"}
                    alt="avatar"
                />
            </div>

            {/* User Info Section */}
            <div className="text-center px-6 py-3 bg-background">
                <h1 className="text-primaryText font-semibold text-lg">{cardUser.username || "Username"}</h1>
            </div>

            <div className="py-4 px-6 text-center">
                {/* Full Name */}
                <h1 className="text-2xl font-semibold text-primaryText">
                    {cardUser.firstName} {cardUser.lastName}
                </h1>

                {/* Email */}
                {cardUser._id === user._id && ( // Conditionally render email
                    <div className="flex justify-center items-center mt-4 text-primaryText">
                        <svg className="h-6 w-6 fill-current" viewBox="0 0 512 512">
                            <path d="M437.332 80H74.668C51.199 80 32 99.198 32 122.667v266.666C32 412.802 51.199 432 74.668 432h362.664C460.801 432 480 412.802 480 389.333V122.667C480 99.198 460.801 80 437.332 80zM432 170.667L256 288 80 170.667V128l176 117.333L432 128v42.667z"/>
                        </svg>
                        <h1 className="px-2 text-sm">{cardUser.email || "user@example.com"}</h1>
                    </div>
                )}
            </div>
        </div>
    );
};

export default UserCard;
