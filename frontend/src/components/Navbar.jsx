import { Link, useNavigate } from 'react-router-dom';
import Cookies from 'js-cookie';
import { useEffect, useState } from 'react';
import { jwtDecode } from 'jwt-decode';

import { logoutUser } from '../services/authServices';

const Navbar = () => {
    const navigate = useNavigate();
    const [role, setRole] = useState(null); // Store role in state

    const handleLogout = async () => {
        try {
            await logoutUser();
            console.log('Logout successful');
        } catch (error) {
            console.error('Logout failed:', error.message);
        } finally {
            Cookies.remove('token'); // Ensure token is removed
            navigate('/login'); // Redirect to login
        }
    };

    // Check if the user is admin or user
    useEffect(() => {
        const token = Cookies.get('token');
        if (token) {
            try {
                const decoded = jwtDecode(token);
                setRole(decoded.role); // Set role from decoded token

            } catch (error) {
                console.error("Invalid token:", error);
            }
        }
    }, []);

    return (
        <div className="bg-white shadow-md p-4 flex justify-between items-center">
            <div className='hidden md:flex w-1/2'>
                {role === "ADMIN" ? (
                    <h1 className='  text-lg font-bold '>ADMIN DASHBOARD</h1>
                ) : (
                    <h1 className=' text-lg font-bold'>USER CATALOGUE</h1>
                )}


            </div>

            <div className="flex w-full justify-end md:ml-auto gap-4 items-center">
                {role === "USER" && (
                    <Link to="/user/profile" className="text-gray-700">
                        Profile
                    </Link>
                )}
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
