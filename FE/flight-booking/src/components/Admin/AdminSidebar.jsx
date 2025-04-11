import { useState } from "react";
import {
    Home, Plane, Users, Settings, ChevronDown, ChevronUp,
    ClipboardList, BarChart3, LogOut, Menu
} from "lucide-react";
import { Link, useNavigate } from "react-router-dom";

function AdminSidebar() {
    const [isOpen, setIsOpen] = useState(true);
    const [userMenuOpen, setUserMenuOpen] = useState(false);
    const navigate = useNavigate();
    // ✅ Hàm xử lý đăng xuất
    const handleLogout = () => {
        localStorage.removeItem("adminToken");
        localStorage.removeItem("adminUsername");
        navigate("/admin/login");
    };

    return (
        <aside className={`min-h-screen bg-gradient-to-r from-blue-400 via-blue-500 to-blue-600 text-white shadow-2xl transition-all duration-300 ${isOpen ? "w-64" : "w-20"} flex-shrink-0`}>

            {/* Toggle Button */}
            <div className="fixed  top-6 right-2 z-50">
                <button
                    onClick={() => setIsOpen(!isOpen)}
                    className="p-2 rounded-full bg-white/20 hover:bg-white/30 transition">
                    <Menu className="w-6 h-6 text-white" />
                </button>
            </div>
            {/* Logo & Title */}
            <div className="flex items-center space-x-3 p-5 border-b border-white/20">
                <Plane className="w-8 h-8 text-yellow-300" />
                {isOpen && <h2 className="text-lg font-bold tracking-wide">Flight Admin</h2>}
            </div>

            {/* Navigation Menu */}
            <nav className="mt-4 space-y-2">
                <SidebarItem to="/admin" icon={<Home />} label="Dashboard" isOpen={isOpen} />

                {/* Dropdown Menu */}
                <div className="relative">
                    <button
                        className="flex items-center w-full px-5 py-3 rounded-lg hover:bg-white/20 transition group"
                        onClick={() => setUserMenuOpen(!userMenuOpen)}
                    >
                        <Users className="w-6 h-6 text-yellow-300" />
                        {isOpen && (
                            <>
                                <span className="ml-3">Quản lý người dùng</span>
                                {userMenuOpen ? <ChevronUp className="ml-auto" /> : <ChevronDown className="ml-auto" />}
                            </>
                        )}
                    </button>
                    {userMenuOpen && (
                        <div className={`ml-8 border-l-2 border-white/30 pl-3 space-y-2 ${isOpen ? "block" : "hidden"}`}>
                            <SidebarItem to="/admin/staff" label="Admin" isOpen={isOpen} small />
                            <SidebarItem to="/admin/user" label="User" isOpen={isOpen} small />
                        </div>
                    )}
                </div>
                <div className="flex flex-col h-full justify-between">
                    <div>
                        <SidebarItem to="/admin/listCustomer" icon={<BarChart3 />} label="Xem thông tin phiếu đặt" isOpen={isOpen} />
                        <SidebarItem to="/admin/AllCustomer" icon={<CustomerIcon />} label="Tất cả khách hàng" isOpen={isOpen} />
                        <SidebarItem to="/admin/blog" icon={<ClipboardList />} label="Quản lý Bài Viết" isOpen={isOpen} />
                        <SidebarItem to="/admin/AllFlight" icon={<FlightIcon />} label="Tất cả chuyến báy" isOpen={isOpen} />
                        <SidebarItem to="/admin/reports" icon={<BarChart3 />} label="Báo cáo & Thống kê" isOpen={isOpen} />
                        <SidebarItem to="/admin/settings" icon={<Settings />} label="Cài đặt hệ thống" isOpen={isOpen} />

                    </div>
                    <button
                        onClick={handleLogout}
                        className="flex items-center px-5 py-3 rounded-lg transition-all  hover:bg-white/20 group"
                    >
                        <LogOut className="w-6 h-6 text-yellow-300" />
                        {isOpen && <span className="ml-3 group-hover:text-yellow-200">Đăng xuất</span>}
                    </button>
                </div>
            </nav>

            {/* Logout */}

        </aside>
    );
}

/* Component tái sử dụng cho Sidebar Item */
const SidebarItem = ({ to, icon, label, isOpen, small = false }) => (
    <Link
        to={to}
        className={`flex items-center px-5 py-3 rounded-lg transition-all ${small ? "text-sm" : "text-base"} hover:bg-white/20 group`}
    >
        {icon && <div className="w-6 h-6 text-yellow-300">{icon}</div>}
        {isOpen && <span className="ml-3 group-hover:text-yellow-200">{label}</span>}
    </Link>
);


const FlightIcon = () => (
    <div>
        <Plane size={30} color="#FFCA28 " />

    </div>
);
const CustomerIcon = () => (
    <div>
        <Users size={30} color="#FFCA28" /> {/* Màu xanh lam cho icon khách hàng */}
    </div>
);


export default AdminSidebar;