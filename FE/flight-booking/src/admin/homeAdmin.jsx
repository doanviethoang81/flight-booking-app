import { useState, useEffect } from "react";
import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer } from "recharts";

function HomeAdmin() {
  const [dashboardData, setDashboardData] = useState(null);
  const [monthlyData, setMonthlyData] = useState(null);

  // useEffect(() => {
  //   // Fetch tổng quan
  //   fetch("http://localhost:8080/api/v1/admin/dashboard", { method: "POST" })
  //     .then(res => res.json())
  //     .then(data => setDashboardData(data));

  //   // Fetch tổng hợp tháng
  //   fetch("http://localhost:8080/api/v1/admin/dashboard/tong-hop-thang", { method: "POST" })
  //     .then(res => res.json())
  //     .then(data => setMonthlyData(data));
  // }, []);
  useEffect(() => {
    // Lấy token từ localStorage
    const token = localStorage.getItem('adminToken');

    if (token) {
      // Fetch tổng quan với token
      fetch("http://localhost:8080/api/v1/admin/dashboard", {
        method: "POST",
        headers: {
          "Authorization": `Bearer ${token}`, // Thêm token vào header
          "Content-Type": "application/json"  // Thêm Content-Type
        }
      })
        .then(res => res.json())
        .then(data => setDashboardData(data))
        .catch(error => console.error("Error fetching dashboard data:", error));

      // Fetch tổng hợp tháng với token
      fetch("http://localhost:8080/api/v1/admin/dashboard/tong-hop-thang", {
        method: "POST",
        headers: {
          "Authorization": `Bearer ${token}`, // Thêm token vào header
          "Content-Type": "application/json"  // Thêm Content-Type
        }
      })
        .then(res => res.json())
        .then(data => setMonthlyData(data))
        .catch(error => console.error("Error fetching monthly data:", error));
    } else {
      console.error('No token found');
    }
  }, []);

  return (
    <div className="p-6 bg-gray-100 min-h-screen">
      <h1 className="text-3xl font-bold mb-6">Dashboard Admin</h1>

      {/* Thống kê tổng quan */}
      {dashboardData && (
        <div className="grid grid-cols-3 gap-6 mb-8">
          <StatCard title="Số lượng vé bán" value={dashboardData.soLuongVeBan} />
          <StatCard title="Số lượng khách hàng" value={dashboardData.soLuongKhachHang} />
          <StatCard title="Tổng tiền" value={dashboardData.tongTien.toLocaleString()} />
        </div>
      )}

      {/* Biểu đồ thống kê theo tháng */}
      {monthlyData && (
        <div className="bg-white p-6 rounded-lg shadow-lg">
          <h2 className="text-xl font-semibold mb-4">Thống kê theo tháng</h2>
          <ResponsiveContainer width="100%" height={300}>
            <BarChart data={[monthlyData]}>
              <XAxis dataKey="month" tick={{ display: "none" }} />
              <YAxis />
              <Tooltip />
              <Bar dataKey="soLuongVeBan" fill="#3182CE" name="Số vé bán" />
              <Bar dataKey="soLuongKhachHang" fill="#63B3ED" name="Số khách hàng" />
              <Bar dataKey="tongTien" fill="#68D391" name="Tổng tiền" />
            </BarChart>
          </ResponsiveContainer>
        </div>
      )}
    </div>
  );
}

function StatCard({ title, value }) {
  return (
    <div className="bg-white p-6 rounded-lg shadow-md text-center">
      <h3 className="text-lg font-semibold text-gray-700">{title}</h3>
      <p className="text-2xl font-bold text-blue-600">{value}</p>
    </div>
  );
}

export default HomeAdmin;
