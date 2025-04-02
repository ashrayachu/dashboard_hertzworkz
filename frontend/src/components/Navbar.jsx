import { Link, useNavigate } from 'react-router-dom';
import Cookies from 'js-cookie';
import axios from 'axios';

const Navbar = () => {
    const navigate = useNavigate();

    const handleLogout = () => {
        // Remove the token from cookies
        Cookies.remove('token');
        axios.post('https://dashboard-api-7vei.onrender.com/api/user/logout').then(response => {
                console.log('Logout successful:', response.data);
            })
            .catch(error => {
                console.error('Error fetching data:', error);
            });


        // Redirect to the login page after logout
        navigate('/login');
    };

    return (
        <div className="bg-white shadow-md p-4 flex justify-between items-center">
            <h1 className="hidden md:flex text-xl font-bold">Dashboard</h1>
            <div className="flex w-full justify-end md:ml-auto gap-4 items-center">
                <Link to="/profile" className="text-gray-700">Profile</Link>
                <button
                    onClick={handleLogout}
                    className="bg-red-500 text-white px-4 py-2 rounded"
                >
                    Logout
                </button>
            </div>
        </div>
    );
};

export default Navbar;
