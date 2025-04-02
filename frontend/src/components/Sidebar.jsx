import { useState } from 'react';
import { Link } from 'react-router-dom';
import { Menu, X } from 'lucide-react';

const Sidebar = () => {
    const [isOpen, setIsOpen] = useState(false);

    return (
        <div className="flex">
            {/* Mobile Toggle Button */}
            <button
                className="md:hidden p-3 text-white bg-gray-800 fixed top-4 left-4 z-50 rounded-full"
                onClick={() => setIsOpen(!isOpen)}
            >
                {isOpen ? <X size={24} /> : <Menu size={24} />}
            </button>

            {/* Sidebar */}
            <div className={`fixed inset-y-0 left-0 w-64 bg-gray-800 text-white h-full p-5 transform transition-transform duration-300 ease-in-out 
                ${isOpen ? "translate-x-0" : "-translate-x-full"} md:translate-x-0 md:relative md:flex`}>
                <div>
                    <h2 className="text-xl font-bold">Sidebar</h2>
                    <ul className="mt-4 flex flex-col space-y-2 items-start">
                        <li><Link to="/dashboard" className="block py-2  ">Dashboard</Link></li>
                        <li><Link to="/profile" className="block py-2  ">Profile</Link></li>
                    </ul>

                </div>
            </div>

            {/* Overlay when sidebar is open (mobile) */}
            {isOpen && <div className="fixed inset-0 bg-gray-800 bg-opacity-50 md:hidden" onClick={() => setIsOpen(false)}>
                <div className='absolute top-20 px-5 text-white'>
                    <h2 className="text-xl font-bold">Sidebar</h2>
                    <ul className="mt-4 flex flex-col space-y-2 items-start">
                        <li><Link to="/dashboard" className="block py-1  ">Dashboard</Link></li>
                        <li><Link to="/profile" className="block py-1 ">Profile</Link></li>
                    </ul>

                </div>

            </div>}
        </div>
    );
};

export default Sidebar;
