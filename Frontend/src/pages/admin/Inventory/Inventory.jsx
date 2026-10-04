import React, { useEffect, useState } from 'react';
import InventoryCard from '../../../component/admin/inventory/InventoryCard';
import { useDispatch, useSelector } from 'react-redux';
import {FaRegEdit, FaBoxOpen, FaWarehouse, FaExclamationTriangle, FaTimesCircle} from "react-icons/fa";
import { LuHistory } from "react-icons/lu"; 
import { stockStatus } from '../../../utils/inventory';
import useProduct from '../../../hooks/useProduct';
import { IoSearch } from "react-icons/io5";
import UpdateInventory from '../../../component/admin/inventory/UpdateInventory';
import InventoryHistory from '../../../component/admin/inventory/InventoryHistory';

function Inventory() {
    const { getAllProducts, getAllStockHistory, deleteInventoryHistory } = useProduct();
    const [search, setSearch] = useState("");
    const [category, setCategory] = useState("all");
    const [status, setStatus] = useState("all");
    const [selectedProduct, setSelectedProduct] = useState(null);
    const [isUpdateOpen, setIsUpdateOpen] = useState(false);
    const [isHistoryOpen, setIsHistoryOpen] = useState(false);
    const [history, setHistory] = useState([]);

    const products = useSelector((state) => state.product.products);

    const totalStock = products.reduce((acc, product) => acc + product.stock, 0);
    const lowStock = products.filter((product) => product.stock > 0 && product.stock <= 10).length;
    const outStock = products.filter((product) => product.stock === 0).length;

    const handleUpdate = (product) => {
        setSelectedProduct(product);
        setIsUpdateOpen(true);
    };

    const handleHistory = async (product) => {
        setSelectedProduct(product);
        setIsHistoryOpen(true);
        setHistory([]);

        try {
            const response = await getAllStockHistory(product._id);

            setHistory(response?.history || []);

        } catch (error) {
            console.log("Error in handle History", error);

            // Keep modal open even when there is no history
            setHistory([]);
        }
    };

    const handleDeleteHistory = async (id) => {
        await deleteInventoryHistory(id);
        setHistory((prev) => prev.filter((item) => item._id !== id));
    };

    const inventoryCards = [
        {
            title: "Total Products",
            value: products.length,
            detail: "All products",
            type: "default",
            icon: <FaBoxOpen size={20} />,
            iconBg: "bg-blue-50 text-blue-500",
        },
        {
            title: "Total Stock",
            value: totalStock,
            detail: "Units in stock",
            type: "default",
            icon: <FaWarehouse size={20} />,
            iconBg: "bg-violet-50 text-violet-500",
        },
        {
            title: "Low Stock Items",
            value: lowStock,
            detail: "Requires attention",
            type: "low",
            icon: <FaExclamationTriangle size={20} />,
            iconBg: "bg-yellow-50 text-yellow-500",
        },
        {
            title: "Out of Stock",
            value: outStock,
            detail: "Currently unavailable",
            type: "out",
            icon: <FaTimesCircle size={20} />,
            iconBg: "bg-red-50 text-red-500",
        },
    ];

    const productStatus = [
        { label: "All Status", value: "all" },
        { label: "In Stock", value: "in stock" },
        { label: "Low Stock", value: "low stock" },
        { label: "Out Of Stock", value: "out of stock" },
    ];

    const productCategory = [
        { label: "All Categories", value: "all" },
        { label: "Watch", value: "watch" },
        { label: "Fashion", value: "fashion" },
        { label: "Mobile", value: "mobile" },
        { label: "Beauty", value: "beauty" },
        { label: "Shoes", value: "shoes" },
        { label: "Laptop", value: "laptop" },
        { label: "Appliances", value: "appliances" }
    ];

    const filteredData = products.filter((product) => {
        const matchSearch = product?.productName.toLowerCase().includes(search.toLowerCase());
        const matchCategory = category === "all" || product?.category.toLowerCase() === category.toLowerCase();
        const matchStatus = status === "all" || stockStatus(product.stock).label.toLowerCase() === status.toLowerCase();

        return matchSearch && matchCategory && matchStatus;
    });

    useEffect(() => {
        const fetchProducts = async () => {
            try {
                await getAllProducts();
            } catch (error) {
                console.log(error);
            }
        };
        fetchProducts();
    }, []);

    return (
        <div className='w-full min-h-screen flex flex-col gap-8'>
            {/* Header Section */}
            <div>
                <h1 className='text-3xl font-extrabold text-gray-800 tracking-tight'>Inventory</h1>
                <p className='text-gray-500 font-medium mt-1'>Manage and track your store inventory</p>
            </div>

            {/* Statistics Cards */}
            <div className="grid sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 w-full">
                {inventoryCards.map((card) => (
                    <InventoryCard
                        key={card.title}
                        title={card.title}
                        value={card.value}
                        detail={card.detail}
                        type={card.type}
                        icon={card.icon}
                        iconBg={card.iconBg}
                    />
                ))}
            </div>

            {/* Controls / Filter Section */}
            <div className='flex flex-col md:flex-row justify-between items-center gap-4 bg-white p-4 rounded-xl shadow-sm border border-gray-100'>
                {/* Search Bar */}
                <div className='relative w-full md:w-[400px]'>
                    <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                        <IoSearch className="text-gray-400 text-lg" />
                    </div>
                    <input
                        onChange={(e) => setSearch(e.target.value)}
                        className='bg-gray-50 border border-gray-200 text-gray-900 text-sm rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 block w-full pl-10 p-2.5 outline-none transition-all'
                        type="text"
                        placeholder="Search products..."
                    />
                </div>

                {/* Dropdown Filters */}
                <div className='flex flex-col sm:flex-row gap-4 w-full md:w-auto'>
                    <select
                        onChange={(e) => setStatus(e.target.value)}
                        className='bg-gray-50 border border-gray-200 text-gray-700 text-sm rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 outline-none cursor-pointer transition-all'
                    >
                        {productStatus.map((status) => (
                            <option key={status.value} value={status.value}>{status.label}</option>
                        ))}
                    </select>

                    <select
                        onChange={(e) => setCategory(e.target.value)}
                        className='bg-gray-50 border border-gray-200 text-gray-700 text-sm rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 outline-none cursor-pointer transition-all'
                    >
                        {productCategory.map((category) => (
                            <option key={category.value} value={category.value}>{category.label}</option>
                        ))}
                    </select>
                </div>
            </div>

            {/* Table Section */}
            <div className='w-full bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden'>
                <div className='overflow-x-auto max-h-[500px] [scrollbar-width:thin]'>
                    <table className='w-full min-w-[800px] text-left border-collapse'>
                        <thead className='sticky top-0 bg-gray-50 border-b border-gray-200'>
                            <tr>
                                <th className='px-6 py-4 text-xs font-semibold text-gray-500 uppercase tracking-wider'>Product</th>
                                <th className='px-6 py-4 text-xs font-semibold text-gray-500 uppercase tracking-wider'>Category</th>
                                <th className='px-6 py-4 text-xs font-semibold text-gray-500 uppercase tracking-wider'>Stock</th>
                                <th className='px-6 py-4 text-xs font-semibold text-gray-500 uppercase tracking-wider'>Status</th>
                                <th className='px-6 py-4 text-xs font-semibold text-gray-500 uppercase tracking-wider text-center'>Actions</th>
                            </tr>
                        </thead>
                        <tbody className='divide-y divide-gray-100'>
                            {filteredData?.length > 0 ? (
                                filteredData?.map((product) => {
                                    const statusObj = stockStatus(product.stock);
                                    return (
                                        <tr key={product._id} className='hover:bg-gray-50/50 transition-colors duration-150 ease-in-out'>
                                            <td className='px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-800'>
                                                {product.productName}
                                            </td>
                                            <td className='px-6 py-4 whitespace-nowrap text-sm text-gray-600 capitalize'>
                                                {product.category}
                                            </td>
                                            <td className='px-6 py-4 whitespace-nowrap text-sm text-gray-600'>
                                                {product.stock}
                                            </td>
                                            <td className={`px-6 py-4 whitespace-nowrap text-sm`}>
                                                <span className={`inline-flex items-center justify-center rounded-full px-3 py-1 text-xs font-medium ${statusObj.className || 'bg-gray-100 text-gray-800'}`}>
                                                    {statusObj.label}
                                                </span>
                                            </td>
                                            <td className='px-6 py-4 whitespace-nowrap text-sm text-center'>
                                                <div className="flex gap-3 justify-center items-center">
                                                    <button
                                                        onClick={() => handleUpdate(product)}
                                                        className='text-blue-600 cursor-pointer bg-blue-50 hover:bg-blue-100 p-2 rounded-lg transition-colors'
                                                        title="Edit Inventory"
                                                    >
                                                        <FaRegEdit className='text-lg' />
                                                    </button>
                                                    <button onClick={() =>  handleHistory(product)}
                                                        className='text-amber-600 cursor-pointer bg-amber-50 hover:bg-amber-100 p-2 rounded-lg transition-colors'
                                                        title="View History"
                                                    >
                                                        <LuHistory className='text-lg' />
                                                    </button>
                                                </div>
                                            </td>
                                        </tr>
                                    )
                                })
                            ) : (
                                <tr>
                                    <td className='py-12 text-center text-gray-500 text-base font-medium' colSpan={5}>
                                        No inventory items match your search.
                                    </td>
                                </tr>
                            )}
                        </tbody>
                    </table>
                </div>
            </div>

            {/* Modals */}
            {isUpdateOpen && (
                <UpdateInventory
                    product={selectedProduct}
                    onClose={() => setIsUpdateOpen(false)}
                />
            )}

            {isHistoryOpen && (
                <InventoryHistory
                    product={selectedProduct}
                    history={history}
                    onClose={() => setIsHistoryOpen(false)}
                    onDelete={handleDeleteHistory}
                />
            )}
        </div>
    )
}

export default Inventory;