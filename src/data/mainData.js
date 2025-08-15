import {AiFillProduct} from "react-icons/ai";
import {MdDashboardCustomize, MdPassword} from "react-icons/md";
import {FaCartArrowDown } from "react-icons/fa";


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
import {FaCartShopping} from "react-icons/fa6";

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
        subMenu : [
            "New Order",
            "Hold order",
            "Incomplete order",
            "Ongoing order",
            "Complete order",
            "Cancel order",
            "Delivery failed"

        ]
    },
    {
        name: 'Configure Page',
        path: 'configure',
        icon: <IoConstructSharp className="w-5 h-5 shrink-0 transition-colors duration-300" />,
    },
    {
        name: 'Configure Card',
        path: 'card',
        icon: <FaCartShopping className="w-5 h-5 shrink-0 transition-colors duration-300" />,
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


export const htmlData = `
<!DOCTYPE html>
<html>
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Email Template</title>
</head>
<body style="font-family: Arial, sans-serif; margin: 0; padding: 0; background-color: #f4f4f4; line-height: 1.6;">
    <table width="100%" cellpadding="0" cellspacing="0" style="background-color: #f4f4f4; padding: 20px;">
        <tr>
            <td align="center">
                <table width="600" cellpadding="0" cellspacing="0" style="background-color: #ffffff; border: 1px solid #ddd;">
                    <!-- Header -->
                    <tr>
                        <td style="background-color: #333; padding: 20px; text-align: center;">
                            <h1 style="color: #ffffff; margin: 0;">Welcome to My Email Newsletter</h1>
                        </td>
                    </tr>
                    <!-- Content -->
                    <tr>
                        <td style="padding: 40px;">
                            <p style="color: #666;">This is a simple HTML email template created for demonstration purposes.</p>
                            <p style="color: #666;">It includes basic inline styling and structure to display text content effectively.</p>

                            <h2 style="color: #333;">Key Features</h2>
                            <ul style="color: #666; padding-left: 20px;">
                                <li>Simple and clean design</li>
                                <li>Inline CSS styling</li>
                                <li>Responsive text layout</li>
                                <li>Easy to read font</li>
                            </ul>

                            <h2 style="color: #333;">Sample Data Table</h2>
                            <table style="border-collapse: collapse; width: 100%; color: #666;">
                                <tr style="background-color: #f2f2f2;">
                                    <th style="border: 1px solid #ddd; padding: 8px;">ID</th>
                                    <th style="border: 1px solid #ddd; padding: 8px;">Name</th>
                                    <th style="border: 1px solid #ddd; padding: 8px;">Value</th>
                                </tr>
                                <tr>
                                    <td style="border: 1px solid #ddd; padding: 8px;">1</td>
                                    <td style="border: 1px solid #ddd; padding: 8px;">Item A</td>
                                    <td style="border: 1px solid #ddd; padding: 8px;">100</td>
                                </tr>
                                <tr>
                                    <td style="border: 1px solid #ddd; padding: 8px;">2</td>
                                    <td style="border: 1px solid #ddd; padding: 8px;">Item B</td>
                                    <td style="border: 1px solid #ddd; padding: 8px;">200</td>
                                </tr>
                                <tr>
                                    <td style="border: 1px solid #ddd; padding: 8px;">3</td>
                                    <td style="border: 1px solid #ddd; padding: 8px;">Item C</td>
                                    <td style="border: 1px solid #ddd; padding: 8px;">300</td>
                                </tr>
                            </table>

                            <h2 style="color: #333;">Additional Information</h2>
                            <p style="color: #666;">This email demonstrates the use of lists and tables in HTML.</p>

                            <!-- Call to Action -->
                            <p style="text-align: center; margin-top: 30px;">
                                <a href="#" style="background-color: #333; color: #ffffff; padding: 10px 20px; text-decoration: none; border-radius: 5px;">Learn More</a>
                            </p>
                        </td>
                    </tr>
                    <!-- Footer -->
                    <tr>
                        <td style="background-color: #f2f2f2; padding: 20px; text-align: center; color: #666; font-size: 12px;">
                            <p style="margin: 0;">&copy; 2025 My Company. All rights reserved.</p>
                            <p style="margin: 5px 0;">
                                <a href="#" style="color: #333; text-decoration: none;">Unsubscribe</a> | 
                                <a href="#" style="color: #333; text-decoration: none;">Contact Us</a>
                            </p>
                        </td>
                    </tr>
                </table>
            </td>
        </tr>
    </table>
</body>
</html>
`


export const sectionsData = [
    {
        id: "#111111222333",
        title: "Section Title",
        subtitle: "কেন এই আবাটি বেছে নেবেন ?",
        type: "Lit data",
        rank: "01",
        showOnLanding: "Yes",
        contentType: "list",
        content: [
            "প্রিমিয়াম চেরি ফ্যাব্রিক নরম, মসৃণ, এবং টেকসই, যা আপনাকে দিনভর আরাম দেবে।",
            "প্রিমিয়াম চেরি ফ্যাব্রিক নরম, মসৃণ, এবং টেকসই, যা আপনাকে দিনভর আরাম দেবে।",
            "প্রিমিয়াম চেরি ফ্যাব্রিক নরম, মসৃণ, এবং টেকসই, যা আপনাকে দিনভর আরাম দেবে।",
            "প্রিমিয়াম চেরি ফ্যাব্রিক নরম, মসৃণ, এবং টেকসই, যা আপনাকে দিনভর আরাম দেবে।",
            "প্রিমিয়াম চেরি ফ্যাব্রিক নরম, মসৃণ, এবং টেকসই, যা আপনাকে দিনভর আরাম দেবে।",
            "প্রিমিয়াম চেরি ফ্যাব্রিক নরম, মসৃণ, এবং টেকসই, যা আপনাকে দিনভর আরাম দেবে।",
            "প্রিমিয়াম চেরি ফ্যাব্রিক নরম, মসৃণ, এবং টেকসই, যা আপনাকে দিনভর আরাম দেবে।",
            "প্রিমিয়াম চেরি ফ্যাব্রিক নরম, মসৃণ, এবং টেকসই, যা আপনাকে দিনভর আরাম দেবে।",
        ],
    },
    {
        id: "#111111222333",
        title: "Section Title",
        subtitle: "কেন এই আবাটি বেছে নেবেন ?",
        type: "Image",
        rank: "02",
        showOnLanding: "Yes",
        contentType: "image",
        imageSrc: "/images/product.png",
    },
    {
        id: "#111111222333",
        title: "Section Title",
        subtitle: "কেন এই আবাটি বেছে নেবেন ?",
        type: "Text Box",
        rank: "03",
        showOnLanding: "Yes",
        contentType: "html",
        html: htmlData,
    },
];