import { useState, useEffect } from 'react';
import Sidebar from '../../components/Sidebar';
import Navbar from '../../components/Navbar';
import { Pie } from 'react-chartjs-2';
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from 'chart.js';
import { useNavigate } from "react-router-dom";
import Cookies from "js-cookie";
import { dashboardInfo } from '../../services/dashboard';
import { jwtDecode } from 'jwt-decode';
import { toast } from 'react-toastify';


ChartJS.register(ArcElement, Tooltip, Legend);

function Dashboard() {
    const [data, setData] = useState();
    const navigate = useNavigate();
    const token = Cookies.get("token"); // Get token from cookies
    const decoded = jwtDecode(token); // Decode the token to get user info
    const user = decoded.role; // Get role from decoded token
    useEffect(() => {
        if (user !="ADMIN") {
            navigate("/login"); // Redirect to login if not authenticated
            toast.error("You are not authorized to access this page.");
        }
    }, [user, navigate]);


    useEffect(() => {
        const getData = async () => {
            try {
                const dashboardData = await dashboardInfo(); // Call API function
                setData(dashboardData);
                console.log('Dashboard data:', dashboardData);
            } catch (error) {
                console.error('Error fetching data:', error);
            }
        };
        getData();
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
