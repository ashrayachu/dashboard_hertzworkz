import React, { useEffect, useState } from 'react';
import Sidebar from './Sidebar';
import Navbar from './Navbar';
import EditProfileModal from './EditProfileModel';
import Cookies from 'js-cookie';
import { jwtDecode } from 'jwt-decode';
import { toast } from 'react-toastify';
import axios from 'axios';

const Profile = () => {
    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState('');
    const [showEditModal, setShowEditModal] = useState(false);
    const [editFormData, setEditFormData] = useState({
        username: '',
        email: '',
        phoneNumber: ''
    });
   

    useEffect(() => {
        const token = Cookies.get('token');
        if (!token) {
            // Redirect to login if token is not present
            window.location.href = '/login';
        } else {
            try {
                const decoded = jwtDecode(token);
                console.log('Decoded token:', decoded);
                setUser({
                    name: decoded.username,
                    email: decoded.email,
                    mobileNumber: decoded.mobileNumber
                });
            } catch (error) {
                console.error('Invalid token:', error);
            }
        }
    }, [Cookies.get('token')]);



    const handleCardClick = () => {
        setShowEditModal(true);
    };

    const handleCloseModal = () => {
        setShowEditModal(false);
    };

    const handleUpdateProfile = async (updatedFormData) => {
        const token = Cookies.get('token');
        if (!token) return;

        try {
            const response = await axios.put(
                'https://dashboard-api-7vei.onrender.com/api/user/update-info',
                updatedFormData
            );

            const updatedData = response.data;
            console.log('Updated Data:', updatedData);

            // Update the token in cookies if a new one is provided
            if (updatedData.accessToken) {
                Cookies.set('token', updatedData.accessToken);
            }

            handleCloseModal();
            toast.success('Profile updated successfully!');
        } catch (err) {
            console.error('Update Error:', err.message);
            toast.error('Failed to update profile');
        }
    };


    return (
        <div className="flex h-screen bg-gray-100">
            <Sidebar />
            <div className="flex-1 flex flex-col">
                <Navbar />
                <main className="p-6">
                    <div className="flex flex-col items-center ">
                        {user && (
                            <div
                                className="bg-white rounded-lg shadow-md p-4 flex items-center w-full max-w-md mb-4 cursor-pointer hover:shadow-lg transition-shadow"
                                onClick={handleCardClick}
                            >
                                <div className="flex-shrink-0 mr-4">
                                    <div className="relative">
                                        <img
                                            src="https://img.freepik.com/free-vector/user-circles-set_78370-4704.jpg?w=740"
                                            alt="User Avatar"
                                            className="w-16 h-16 rounded-full border border-gray-200"
                                        />
                                    </div>
                                </div>
                                <div className="flex-1">
                                    <h2 className="text-lg font-semibold text-gray-800">{user.name}</h2>
                                    <p className="text-gray-600 text-sm mb-1">{user.email}</p>
                                    <p className="text-gray-600 text-sm">{user.mobileNumber}</p>
                                </div>
                            </div>
                        )}
                    </div>
                </main>
            </div>
            {showEditModal && (
                <EditProfileModal
                    show={showEditModal}
                    onClose={handleCloseModal}
                    initialData={user}
                    onUpdate={handleUpdateProfile}
                />
            )}
        </div>
    );
};

export default Profile;
