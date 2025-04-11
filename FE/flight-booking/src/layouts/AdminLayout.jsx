import AdminHeader from "../components/Admin/AdminHeader";
import AdminSidebar from "../components/Admin/AdminSidebar";
import { Outlet } from "react-router-dom";

function AdminLayout() {
    return (
        <div className="admin-container flex flex-col min-h-screen">
            {/* Header */}
            <AdminHeader />

            <div className="admin-main flex flex-1">
                {/* Sidebar bên trái */}
                <AdminSidebar />

                {/* Nội dung chính */}
                <main className="admin-content flex-1 p-6 bg-gray-100 overflow-auto">
                    <Outlet />
                </main>
            </div>
        </div>
    );
}

export default AdminLayout;
