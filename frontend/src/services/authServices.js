import axios from 'axios';
import Cookies from 'js-cookie';
import axiosInstance from './axiosInstance'; // Assuming you have an axios instance set up

// Login API
export const loginUser = async (email, password) => {
    try {
        const response = await axiosInstance.post('/login', {email, password});
        if (response.data.accessToken) {
            Cookies.set('token', response.data.accessToken);
        }
        return response.data;
    } catch (error) {
        throw new Error(error.response?.data?.message || 'Login failed. Please try again.');
    }
};

// Signup API
export const signupUser = async (name, email, phone, password) => {
    try {
        const response = await axiosInstance.post('/signup', {
            username: name,
            email,
            mobileNumber: phone,
            password,
        });

        return response.data;
    } catch (error) {
        throw new Error(error.response?.data?.message || 'Signup failed');
    }
};

// Logout API
export const logoutUser = async () => {
    try {
        const response = await axiosInstance.post('/logout');
        Cookies.remove('token'); // Remove token after successful logout
        return response.data;
    } catch (error) {
        throw new Error(error.response?.data?.message || 'Logout failed');
    }
};