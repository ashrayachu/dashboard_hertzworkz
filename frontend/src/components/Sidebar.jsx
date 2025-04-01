import { Link } from 'react-router-dom';

const Sidebar = () => (
    
    <div className="w-64 bg-gray-800 text-white h-full p-5">
        <h2 className="text-xl font-bold">Sidebar</h2>
        <ul className="mt-4">
            <li><Link to="/dashboard" className="block py-2 px-3 hover:bg-gray-700 rounded">Dashboard</Link></li>
            <li><Link to="/profile" className="block py-2 px-3 hover:bg-gray-700 rounded">Profile</Link></li>
        </ul>
    </div>
);

export default Sidebar;