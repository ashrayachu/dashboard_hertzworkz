import { useState, useEffect } from 'react';
import axios from 'axios';
import Sidebar from './Sidebar';
import Navbar from './Navbar';

function Dashboard() {
    const [data, setData] = useState({ logins: 0, logouts: 0, signups: 0 });

    useEffect(() => {
        axios.get('http://localhost:5000/api/stats')
            .then(response => {
                setData(response.data);
            })
            .catch(error => {
                console.error('Error fetching data:', error);
            });
    }, []);

    return (
        <div className="flex h-screen bg-gray-100">
            <Sidebar />
            <div className="flex-1 flex flex-col">
                <Navbar />
                <main className="p-6">
                    <h1 className="text-2xl font-bold mb-4">Dashboard</h1>
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                        <Card title="Logins" count={data.logins} />
                        <Card title="Logouts" count={data.logouts} />
                        <Card title="Signups" count={data.signups} />
                    </div>
                </main>
            </div>
        </div>
    );
}

const Card = ({ title, count }) => (
    <div className="bg-white p-6 rounded-lg shadow-md text-center">
        <h2 className="text-lg font-semibold">{title}</h2>
        <p className="text-2xl font-bold mt-2">{count}</p>
    </div>
);

export default Dashboard;
