// axiosAuthInstance.js
import axios from 'axios';
// import { getCookie } from '../cookie/Cookies';

const axiosInstance = axios.create({
    baseURL: 'https://dashboard-api-7vei.onrender.com/api/user',
    headers: {
        'Content-Type': 'application/json',
    },
});

// export const updateAuthHeader = (token) => {
//   axiosInstance.defaults.headers.common['Authorization'] =`Bearer ${token}`;
// };
// const token=getCookie("token")
// if(token){
//   updateAuthHeader(token)
// }

export default axiosInstance;
