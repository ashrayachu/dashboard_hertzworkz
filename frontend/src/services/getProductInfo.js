const API_URL = 'https://dashboard-api-7vei.onrender.com/api/product';
import axios from 'axios';

export const getProductInfo = async () => {
    try {
        console.log('Fetching product data...');
        const response = await axios.get(`${API_URL}/get-products`);
        return response.data;
    } catch (error) {
        throw new Error(error.response?.data?.message || 'Failed to fetch dashboard data');
    }
};