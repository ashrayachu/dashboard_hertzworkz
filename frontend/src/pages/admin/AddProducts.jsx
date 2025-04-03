import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Cookies from 'js-cookie';
import { toast } from 'react-toastify';
import { useNavigate } from 'react-router-dom';
import {jwtDecode} from 'jwt-decode'; // Import jwtDecode to decode JWT tokens
import Navbar from '../../components/Navbar';


const AddProducts = () => {
    const [products, setProducts] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const navigate = useNavigate();
    const token = Cookies.get("token"); // Get token from cookies
    const decoded = jwtDecode(token); // Decode the token to get user info
    const user = decoded.role; // Get username from decoded token

    useEffect(() => {
        if (user != "ADMIN") {
            navigate("/login"); // Redirect to login if not authenticated
            toast.error("You are not authorized to access this page.");
        }
    }, [user, navigate]);

    const [newProduct, setNewProduct] = useState({
        title: '',
        description: '',
        price: '',
        imageUrl: ''
    });

    const [isSubmitting, setIsSubmitting] = useState(false);

    useEffect(() => {
        fetchProducts();
    }, []);

    const fetchProducts = async () => {
        setLoading(true);
        try {
            const token = Cookies.get('token');
            const fetchedData = await axios.get(
                'https://dashboard-api-7vei.onrender.com/api/product/get-products'
            );
            if (Array.isArray(fetchedData.data)) {
                setProducts(fetchedData.data);
            } else if (fetchedData.data && Array.isArray(fetchedData.data.products)) {
                setProducts(fetchedData.data.products); // If data is inside an object
            } else {
                setProducts([]); // Fallback to an empty array
            }

        } catch (err) {
            console.error('Error fetching products:', err);
            setError('Failed to load products.');
            toast.error('Failed to load products');
        } finally {
            setLoading(false);
        }
    };

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setNewProduct({ ...newProduct, [name]: value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (!newProduct.title || !newProduct.description || !newProduct.price) {
            toast.error('Please fill in all required fields');
            return;
        }

        setIsSubmitting(true);
        try {
            const token = Cookies.get('token');
            await axios.post(
                'https://dashboard-api-7vei.onrender.com/api/product/add-product',
                newProduct,
                {
                    headers: {
                        Authorization: `Bearer ${token}`, // Fixed backtick syntax
                        'Content-Type': 'application/json'
                    }
                }
            );

            setNewProduct({ title: '', description: '', price: '', imageUrl: '' });
            fetchProducts();
            toast.success('Product added successfully!');
            setIsModalOpen(false);
        } catch (err) {
            console.error('Error adding product:', err);
            toast.error('Failed to add product');
        } finally {
            setIsSubmitting(false);
        }
    };

    return (
        <>
            <Navbar />
            {/* Header Section */}
            <div className="flex justify-between items-center p-5 mb-6">
                <h1 className="text-2xl font-bold">Products Management</h1>
                <button
                    onClick={() => setIsModalOpen(true)}
                    className="px-4 py-4 bg-blue-600 text-white rounded-md hover:bg-blue-700"
                >
                    + Add New Product
                </button>
            </div>

            {/* Products List */}
            <div className="bg-white rounded-lg shadow-md p-6">
                <h2 className="text-xl font-semibold mb-4">Product List</h2>

                {loading ? (
                    <p className="text-center">Loading products...</p>
                ) : error ? (
                    <p className="text-center text-red-600">{error}</p>
                ) : products.length === 0 ? (
                    <p className="text-center text-gray-500">No products found.</p>
                ) : (
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                        {products.map((product) => (
                            <div key={product._id} className="border rounded-lg shadow-sm p-4">
                                <img
                                    src={product.imageUrl || 'https://via.placeholder.com/300x200?text=No+Image'}
                                    alt={product.title}
                                    className="w-full h-40 object-contain mb-2"
                                />
                                <h3 className="font-semibold">{product.title}</h3>
                                <p className="text-gray-600">${Number(product.price).toFixed(2)}</p>
                                <p className="text-sm text-gray-500">{product.description}</p>
                            </div>
                        ))}
                    </div>
                )}
            </div>

            {/* Add Product Modal */}
            {isModalOpen && (
                <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50">
                    <div className="bg-white rounded-lg shadow-lg w-96 p-6">
                        <div className="flex justify-between items-center mb-4">
                            <h2 className="text-xl font-semibold">Add New Product</h2>
                            <button
                                onClick={() => setIsModalOpen(false)}
                                className="text-gray-600 hover:text-gray-800"
                            >
                                ✕
                            </button>
                        </div>

                        <form onSubmit={handleSubmit}>
                            <div className="mb-4">
                                <label className="block text-sm font-medium">Product Title*</label>
                                <input
                                    type="text"
                                    name="title"
                                    value={newProduct.title}
                                    onChange={handleInputChange}
                                    className="w-full px-3 py-2 border rounded"
                                    required
                                />
                            </div>

                            <div className="mb-4">
                                <label className="block text-sm font-medium">Price*</label>
                                <input
                                    type="number"
                                    name="price"
                                    value={newProduct.price}
                                    onChange={handleInputChange}
                                    className="w-full px-3 py-2 border rounded"
                                    min="0"
                                    step="0.01"
                                    required
                                />
                            </div>

                            <div className="mb-4">
                                <label className="block text-sm font-medium">Description*</label>
                                <textarea
                                    name="description"
                                    value={newProduct.description}
                                    onChange={handleInputChange}
                                    className="w-full px-3 py-2 border rounded"
                                    rows="3"
                                    required
                                ></textarea>
                            </div>

                            <div className="mb-4">
                                <label className="block text-sm font-medium">Image URL</label>
                                <input
                                    type="url"
                                    name="imageUrl"
                                    value={newProduct.imageUrl}
                                    onChange={handleInputChange}
                                    className="w-full px-3 py-2 border rounded"
                                    placeholder="Optional"
                                />
                            </div>

                            <div className="flex justify-end">
                                <button
                                    type="button"
                                    onClick={() => setIsModalOpen(false)}
                                    className="px-4 py-2 bg-gray-400 text-white rounded-md hover:bg-gray-500 mr-2"
                                >
                                    Cancel
                                </button>
                                <button
                                    type="submit"
                                    disabled={isSubmitting}
                                    className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700"
                                >
                                    {isSubmitting ? 'Adding...' : 'Add Product'}
                                </button>
                            </div>
                        </form>
                    </div>
                </div>
            )}
        </>
    );
};

export default AddProducts;
