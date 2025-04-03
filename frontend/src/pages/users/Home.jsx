import React, { useEffect, useState } from 'react';
import Navbar from '../../components/Navbar';
import { getProductInfo } from '../../services/getProductInfo';

const Card = ({ title = "Default Title", count = 0 }) => (
    <div className="bg-white p-6 rounded-lg shadow-md text-center">
        <h2 className="text-lg font-semibold">{title}</h2>
        <p className="text-2xl font-bold mt-2">{count}</p>
    </div>
);

function Home() {
    const [data, setData] = useState([]);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchProductData = async () => {
            try {
                setLoading(true);
                setError(null); // Reset error state before fetching
                const fetchedData = await getProductInfo();
                console.log('Fetched data:', fetchedData);
                // Ensure we are setting an array
            if (Array.isArray(fetchedData)) {
                setData(fetchedData);
            } else if (fetchedData && Array.isArray(fetchedData.products)) {
                setData(fetchedData.products); // If data is inside an object
            } else {
                setData([]); // Fallback to an empty array
            }
               
            } catch (error) {
                setError('Failed to fetch product data. Please try again later.');
                console.error('Error fetching product data:', error);
            } finally {
                setLoading(false); // Ensures loading is false whether success or error occurs
            }
        };
        fetchProductData();
    }, []);

    return (
        <div>
            <Navbar />
            <div className='flex flex-col items-center h-screen'>
                <div>
                    <h1 className='text-3xl font-bold text-black py-5'>Home Page</h1>
                </div>
                <div className="mx-auto max-w-7xl p-6 bg-white rounded-lg shadow-md">
                    {loading ? (
                        <p className="text-center">Loading products...</p>
                    ) : error ? (
                        <p className="text-center text-red-600">{error}</p>
                    ) : data?.length === 0 ? (
                        <p className="text-center text-gray-500">No products found.</p>
                    ) : (
                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                            {data?.map((product) => (
                                <div key={product?._id} className="border rounded-lg shadow-sm p-4">
                                    <img
                                        src={product?.imageUrl || 'https://via.placeholder.com/300x200?text=No+Image'}
                                        alt={product?.title}
                                        className="w-full h-40 object-contain mb-2"
                                    />
                                    <h3 className="font-semibold">{product?.title}</h3>
                                    <p className="text-gray-600">${Number(product?.price).toFixed(2)}</p>
                                    <p className="text-sm text-gray-500">{product?.description}</p>
                                </div>
                            ))}
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
}

export default Home;
