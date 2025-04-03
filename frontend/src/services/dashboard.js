const API_URL = 'https://dashboard-api-7vei.onrender.com/api/user';
import axios from 'axios';

export const dashboardInfo = async () => {
    try {
        console.log('Fetching dashboard data...');
        const response = await axios.get(`${API_URL}/dashboard`);
        return response.data;
    } catch (error) {
        throw new Error(error.response?.data?.message || 'Failed to fetch dashboard data');
    }
};