import { Link } from 'react-router-dom';

const Navbar = () => (
    <div className="bg-white shadow-md p-4 flex justify-between items-center">
        <h1 className="text-xl font-bold">Dashboard</h1>
        <div className="flex items-center gap-4">
            <Link to="/profile" className="text-gray-700">Profile</Link>
            <Link to="/" className="bg-red-500 text-white px-4 py-2 rounded">Logout</Link>
        </div>
    </div>
);

export default Navbar;