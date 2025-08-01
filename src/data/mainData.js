import {AiFillProduct} from "react-icons/ai";
import {MdDashboardCustomize, MdPassword} from "react-icons/md";
import {FaCartArrowDown, FaUser} from "react-icons/fa";


import {
    FaUsers,
    FaChartLine,
    FaDollarSign,
    FaShoppingCart,
    FaBoxOpen,
    FaUserPlus,
    FaHourglassHalf,
    FaExclamationTriangle,
    FaStar,
    FaUndoAlt
} from 'react-icons/fa';
import {IoConstructSharp, IoSettingsSharp} from "react-icons/io5";

export const menuItems = [
    {
        name: 'Dashboard',
        path: 'dashboard',
        icon: <AiFillProduct className="w-5 h-5 shrink-0 transition-colors duration-300" />,

    },
    {
        name: 'Product',
        path: 'product',
        icon: <MdDashboardCustomize className="w-5 h-5 shrink-0 transition-colors duration-300" />,
    },
    {
        name: 'Order History',
        path: 'order',
        icon: <FaCartArrowDown className="w-5 h-5 shrink-0 transition-colors duration-300" />,
        subMenu : ["New Order","Pending", "Delivered Order"]
    },
    {
        name: 'Configure Page',
        path: 'configure',
        icon: <IoConstructSharp className="w-5 h-5 shrink-0 transition-colors duration-300" />,
    },
    {
        name: 'Review',
        path: 'review',
        icon: <FaStar className="w-5 h-5 shrink-0 transition-colors duration-300" />,
    },
    {
        name: 'Update Password',
        path: 'password',
        icon: <MdPassword className="w-5 h-5 shrink-0 transition-colors duration-300" />,
    },
    {
        name: 'Profile',
        path: 'profile',
        icon: <FaUser className="w-5 h-5 shrink-0 transition-colors duration-300" />,
    },
    {
        name: 'Settings',
        path: 'setting',
        icon: <IoSettingsSharp className="w-5 h-5 shrink-0 transition-colors duration-300" />,
    },
];


export const dashboardCards = [
    {
        title: 'Total Users',
        value: '1,234',
        icon: <FaUsers className="lg:text-3xl text-2xl text-secondary" />
    },
    {
        title: 'Active Sessions',
        value: '567',
        icon: <FaChartLine className="lg:text-3xl text-2xl text-secondary" />
    },
    {
        title: 'Revenue',
        value: '$12,345',
        icon: <FaDollarSign className="lg:text-3xl text-2xl text-secondary" />
    },
    {
        title: 'Total Orders',
        value: '894',
        icon: <FaShoppingCart className="lg:text-3xl text-2xl text-secondary" />
    },
    {
        title: 'Products Sold',
        value: '2,450',
        icon: <FaBoxOpen className="lg:text-3xl text-2xl text-secondary" />
    },
    {
        title: 'New Customers',
        value: '321',
        icon: <FaUserPlus className="lg:text-3xl text-2xl text-secondary" />
    },
    {
        title: 'Pending Orders',
        value: '47',
        icon: <FaHourglassHalf className="lg:text-3xl text-2xl text-secondary" />
    },
    {
        title: 'Low Stock Items',
        value: '16',
        icon: <FaExclamationTriangle className="lg:text-3xl text-2xl text-secondary" />
    },
    {
        title: 'Customer Reviews',
        value: '1,038',
        icon: <FaStar className="lg:text-3xl text-2xl text-secondary" />
    },
    {
        title: 'Returns',
        value: '23',
        icon: <FaUndoAlt className="lg:text-3xl text-2xl text-secondary" />
    },
];


export const products = [
    { id: 1,
        name: 'Wireless Headphones Wireless ',
        price: 99.99, stock: 50, category: 'Electronics',
        image: 'https://images.unsplash.com/photo-1505740420928-5e560c06d30e?ixlib=rb-4.0.3&auto=format&fit=crop&w=200&h=200'
    },
    {
        id: 2,
        name: 'Smartphone Case', price: 19.99, stock: 200, category: 'Accessories',
        image: 'https://images.unsplash.com/photo-1505740420928-5e560c06d30e?ixlib=rb-4.0.3&auto=format&fit=crop&w=200&h=200'
    },
    { id: 3,
        name: 'Bluetooth Speaker', price: 49.99, stock: 30, category: 'Electronics',
        image: 'https://images.unsplash.com/photo-1505740420928-5e560c06d30e?ixlib=rb-4.0.3&auto=format&fit=crop&w=200&h=200'
    },
    {
        id: 4, name: 'Laptop Stand', price: 29.99, stock: 75, category: 'Accessories',
        image: 'https://images.unsplash.com/photo-1505740420928-5e560c06d30e?ixlib=rb-4.0.3&auto=format&fit=crop&w=200&h=200'
    },
    { id: 5,
        name: 'Wireless Headphones', price: 99.99, stock: 50, category: 'Electronics',
        image: 'https://images.unsplash.com/photo-1505740420928-5e560c06d30e?ixlib=rb-4.0.3&auto=format&fit=crop&w=200&h=200'
    },
    {
        id: 2,
        name: 'Smartphone Case', price: 19.99, stock: 200, category: 'Accessories',
        image: 'https://images.unsplash.com/photo-1505740420928-5e560c06d30e?ixlib=rb-4.0.3&auto=format&fit=crop&w=200&h=200'
    },
    { id: 3,
        name: 'Bluetooth Speaker', price: 49.99, stock: 30, category: 'Electronics',
        image: 'https://images.unsplash.com/photo-1505740420928-5e560c06d30e?ixlib=rb-4.0.3&auto=format&fit=crop&w=200&h=200'
    },
    {
        id: 4, name: 'Laptop Stand', price: 29.99, stock: 75, category: 'Accessories',
        image: 'https://images.unsplash.com/photo-1505740420928-5e560c06d30e?ixlib=rb-4.0.3&auto=format&fit=crop&w=200&h=200'
    },
    { id: 1,
        name: 'Wireless Headphones', price: 99.99, stock: 50, category: 'Electronics',
        image: 'https://images.unsplash.com/photo-1505740420928-5e560c06d30e?ixlib=rb-4.0.3&auto=format&fit=crop&w=200&h=200'
    },
    {
        id: 2,
        name: 'Smartphone Case', price: 19.99, stock: 200, category: 'Accessories',
        image: 'https://images.unsplash.com/photo-1505740420928-5e560c06d30e?ixlib=rb-4.0.3&auto=format&fit=crop&w=200&h=200'
    }
];