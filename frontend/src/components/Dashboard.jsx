import { useState, useEffect } from 'react';
import axios from 'axios';
import Sidebar from './Sidebar';
import Navbar from './Navbar';
import { Pie } from 'react-chartjs-2';
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from 'chart.js';
import { useNavigate } from "react-router-dom";
import Cookies from "js-cookie";

ChartJS.register(ArcElement, Tooltip, Legend);

function Dashboard() {
    const [data, setData] = useState();
    const navigate = useNavigate();
    const isAuthenticated = Cookies.get("token"); // Get token from cookies

    useEffect(() => {
        if (!isAuthenticated) {
            navigate("/login"); // Redirect to login if not authenticated
        }
    }, [isAuthenticated, navigate]);

    useEffect(() => {
        axios.get('https://dashboard-api-7vei.onrender.com/api/user/dashboard')
            .then(response => {
                setData(response.data);
            })
            .catch(error => {
                console.error('Error fetching data:', error);
            });
    }, []);

    const pieData = {
        labels: ['Logins', 'Logouts', 'Signups'],
        datasets: [
            {
                data: [data?.totalLogins || 0, data?.totalLogouts || 0, data?.totalSignups || 0],
                backgroundColor: ['#0088FE', '#00C49F', '#FFBB28'],
                hoverBackgroundColor: ['#0056b3', '#009688', '#d4a017']
            }
        ]
    };

    return (
        <div className="flex h-screen bg-gray-100">
            <Sidebar />
            <div className="flex-1 flex flex-col">
                <Navbar />
                <main className="p-6">
                    <h1 className="text-2xl font-bold mb-4">Dashboard</h1>
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                        <Card title="Logins" count={data?.totalLogins} />
                        <Card title="Logouts" count={data?.totalLogouts} />
                        <Card title="Signups" count={data?.totalSignups} />
                    </div>
                    <div className='flex flex-col items-center justify-center mt-6'>
                        <div className="mt-6 flex justify-center w-64 md:w-96">
                            <Pie data={pieData} />
                        </div>
                    </div>

                </main>
            </div>
        </div>
    );
}

const Card = ({ title, count }) => (
    <div className="bg-white p-6 rounded-lg shadow-md text-center">
        <h2 className="text-lg font-semibold">{title}</h2>
        <p className="text-2xl font-bold mt-2">{count ?? 0}</p>
    </div>
);

export default Dashboard;
