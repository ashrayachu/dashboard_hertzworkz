import React from 'react';
import Sidebar from './Sidebar';    
import Navbar from './Navbar';

const Profile = () => {
    return (
        <div className="flex h-screen bg-gray-100">
            <Sidebar />
            <div className="flex-1 flex flex-col">
                <Navbar />
                <main className="p-6">
                    Profile code comes here
                </main>
            </div>
        </div>
    );
};

export default Profile;