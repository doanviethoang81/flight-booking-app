import { Plane, Bell, UserCircle, Settings, Search, Moon, LogOut } from "lucide-react";
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

function AdminHeader() {
    const navigate = useNavigate();
    const [time, setTime] = useState(new Date());
    const [adminUsername, setAdminUsername] = useState("");

    useEffect(() => {
        setTime(new Date());
        const timer = setInterval(() => setTime(new Date()), 1000);

        const username = localStorage.getItem("adminUsername");
        if (username) {
            setAdminUsername(username); // Lấy username từ localStorage
        }

        return () => clearInterval(timer);
    }, []);

    //  Chức năng đăng xuất
    const handleLogout = () => {
        localStorage.removeItem("adminToken");
        localStorage.removeItem("adminUsername"); // Xóa username khi đăng xuất
        navigate("/admin/login");
    };

    const handleClick = () => {
        navigate('/admin/InformationUser'); // chuyển trang nội bộ
    };

    return (
        <header className="bg-gradient-to-r from-blue-400 via-blue-500 to-blue-600 text-white shadow-2xl border-b border-blue-300">
            <div className="max-w-7xl mx-auto px-6 py-4 flex justify-between items-center">
                {/* Logo & Title */}
                <div className="flex items-center space-x-4">
                    <div className="p-2 rounded-full bg-white bg-opacity-25 shadow-lg">
                        <Plane className="w-10 h-10 text-yellow-300" />
                    </div>
                    <h1 className="text-2xl font-extrabold tracking-wide drop-shadow-md">Flight Admin Panel</h1>
                </div>

                {/* Search Bar */}
                <div className="relative">
                    <div className="flex items-center bg-white bg-opacity-20 shadow-lg px-4 py-2 rounded-xl">
                        <Search className="w-5 h-5 text-white mr-2" />
                        <input
                            type="text"
                            placeholder="Tìm kiếm chuyến bay..."
                            className="bg-transparent outline-none text-white placeholder-white w-64"
                        />
                    </div>
                </div>

                {/* Middle Clock */}
                <div className="hidden lg:flex items-center bg-opacity-10 shadow-md px-4 py-2 rounded-xl">
                    <span className="text-lg font-semibold tracking-wide">{time.toLocaleTimeString()}</span>
                </div>

                {/* Icons */}
                <div className="flex items-center space-x-6">
                    <Bell className="w-6 h-6 cursor-pointer hover:text-yellow-400 transition duration-300" />
                    <Moon className="w-6 h-6 cursor-pointer hover:text-gray-300 transition duration-300" />
                    <Settings className="w-6 h-6 cursor-pointer hover:text-yellow-400 transition duration-300" />

                    {/* User Profile Dropdown */}
                    <div className="relative group">
                        <div className="flex items-center space-x-2 cursor-pointer pr-10 hover:bg-black-100 hover:bg-opacity-20 rounded-lg px-3 py-2 transition">
                            <UserCircle className="w-10 h-10 text-white" />
                            <span className="hidden md:inline-block text-sm font-semibold">
                                {adminUsername || "Admin"}
                            </span>
                        </div>
                        {/* Dropdown Menu */}
                        <div className="absolute right-0 mt-2 w-48 bg-white text-gray-900 rounded-lg shadow-lg opacity-0 group-hover:opacity-100 transition duration-300 z-50">
                            <button className="w-full text-left px-4 py-2 hover:bg-gray-200 flex items-center"
                                onClick={handleClick}>
                                <Settings className="w-5 h-5 mr-2" />
                                Thông tin
                            </button>
                            <button
                                className="w-full text-left px-4 py-2 hover:bg-gray-200 flex items-center"
                                onClick={handleLogout}
                            >
                                <LogOut className="w-5 h-5 mr-2" />
                                Đăng xuất
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </header>
    );
}

export default AdminHeader;
