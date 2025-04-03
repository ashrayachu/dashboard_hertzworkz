import axios from 'axios';
import Cookies from 'js-cookie';
import { toast } from 'react-toastify';

const API_BASE_URL = 'https://dashboard-api-7vei.onrender.com/api';

// Get token from cookies
const getToken = () => Cookies.get('token');

// Function to update user profile
export const updateUserProfile = async (updatedFormData) => {
    const token = getToken();
    if (!token) return;

    try {
        const response = await axios.put(`${API_BASE_URL}/user/update-info`, updatedFormData);
        const updatedData = response.data;

        // Update the token if a new one is provided
        if (updatedData.accessToken) {
            Cookies.set('token', updatedData.accessToken);
        }

        toast.success('Profile updated successfully!');
        return updatedData;
    } catch (err) {
        console.error('Update Error:', err.message);
        toast.error('Failed to update profile');
        throw err;
    }
};
