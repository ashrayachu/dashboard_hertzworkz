import React, { useState, useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';

const EditProfileModal = ({ show, onClose, initialData, onUpdate }) => {
    // Initialize state with initialData, ensuring values are strings to maintain controlled state
    const [formData, setFormData] = useState({
        username: initialData.name || '',
        email: initialData.email || '',
        mobileNumber: initialData.mobileNumber || ''
    });

    const usernameInputRef = useRef(null);
    const emailInputRef = useRef(null);
    const mobileNumberRef = useRef(null);

    useEffect(() => {
        // Update formData when initialData changes, ensuring controlled state
        setFormData({
            username: initialData.name || '',
            email: initialData.email || '',
            mobileNumber: initialData.mobileNumber || ''
        });
    }, [initialData]);
    console.log('Form Data:', formData);

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setFormData(prev => ({
            ...prev,
            [name]: value
        }));
    };

    const handleKeyDown = (e) => {
        if (e.key === 'Enter') {
            e.preventDefault();

            if (e.target.name === 'username') {
                emailInputRef.current?.focus();
            } else if (e.target.name === 'email') {
                mobileNumberRef.current?.focus();
            } else if (e.target.name === 'mobileNumber') {
                handleSubmit(e);
            }
        }
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        onUpdate(formData);
    };

    if (!show) return null;

    return (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
            <div className="bg-white rounded-lg shadow-xl p-6 w-full max-w-md">
                <div className="flex justify-between items-center mb-4">
                    <h2 className="text-xl font-bold">Edit Profile</h2>
                    <button
                        onClick={onClose}
                        className="text-gray-500 hover:text-gray-700"
                    >
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                        </svg>
                    </button>
                </div>

                <div className="mb-4 flex items-center justify-center">
                    <img
                        src="https://img.freepik.com/free-vector/user-circles-set_78370-4704.jpg?t=st=1743583245~exp=1743586845~hmac=1b0dd40debbf0b83fe91a35e3d471ee3f4f4a52a920d09113cf8a1b962be50c1&w=740"
                        alt="User Avatar"
                        className="w-24 h-24 rounded-full border border-gray-200"
                    />
                </div>

                <form onSubmit={handleSubmit} className="space-y-4">
                    <div>
                        <label htmlFor="username" className="block text-sm font-medium text-gray-700 mb-1">Username</label>
                        <input
                            type="text"
                            id="username"
                            name="username"
                            value={formData.username}
                            onChange={handleInputChange}
                            onKeyDown={handleKeyDown}
                            ref={usernameInputRef}
                            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                            autoComplete="off"
                        />
                    </div>

                    <div>
                        <label htmlFor="phoneNumber" className="block text-sm font-medium text-gray-700 mb-1">Phone Number</label>
                        <input
                            type="text"
                            id="mobileNumber"
                            name="mobileNumber"
                            value={formData.mobileNumber}
                            onChange={handleInputChange}
                            onKeyDown={handleKeyDown}
                            ref={mobileNumberRef}
                            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                            autoComplete="off"
                        />
                    </div>
                    <div className="text-right">
                        <Link to="/ForgotPassword" className="text-blue-600 text-sm hover:underline">
                            Forgot Password?
                        </Link>
                    </div>

                    <div className="mt-6 flex justify-end space-x-3">
                        <button
                            type="button"
                            onClick={onClose}
                            className="px-4 py-2 bg-gray-200 text-gray-800 rounded-md hover:bg-gray-300 transition-colors"
                        >
                            Cancel
                        </button>
                        <button
                            type="submit"
                            className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition-colors"
                        >
                            Update
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default EditProfileModal;
