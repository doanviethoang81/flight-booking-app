import { useState } from "react";
import { Bar } from "react-chartjs-2";
import { Chart as ChartJS, CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend } from "chart.js";

// Đăng ký các thành phần của biểu đồ
ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend);

const StatisticalAdmin = () => {
    const [tuNgay, setTuNgay] = useState("");
    const [denNgay, setDenNgay] = useState("");
    const [data, setData] = useState(null);
    const [loading, setLoading] = useState(false);

    // Hàm fetch dữ liệu từ API
    const fetchData = async () => {
        if (!tuNgay || !denNgay) {
            alert("Vui lòng chọn đầy đủ từ ngày và đến ngày!");
            return;
        }

        setLoading(true);

        try {
            const token = localStorage.getItem('adminToken');
            const response = await fetch(`http://localhost:8080/api/v1/admin/phieu_dat/doanh-thu?tuNgay=${tuNgay}&denNgay=${denNgay}`, {
             method: 'GET',
             headers: {
            'Authorization': `Bearer ${token}`,  // Thêm header Authorization với token
            'Content-Type': 'application/json'  // Nếu cần
        }
    });
            const result = await response.json();
            console.log(result);
            setData(result);
        } catch (error) {
            console.error("Lỗi khi fetch dữ liệu:", error);
        }

        setLoading(false);
    };

    // Xử lý dữ liệu cho biểu đồ
    const chartData = {
        labels: data?.danhSachPhieuDat.map(item => item.ngayDat) || [],
        datasets: [
            {
                label: "Doanh thu (VNĐ)",
                data: data?.danhSachPhieuDat.map(item => item.giaVe) || [],
                backgroundColor: "rgba(54, 162, 235, 0.6)", // Màu xanh dương
                borderColor: "rgba(54, 162, 235, 1)",
                borderWidth: 1,
            },
        ],
    };

    return (
        <div className="flex justify-center mt-0 p-6 bg-white shadow-lg rounded-lg min-h-screen flex flex-col items-center">
            {/* Tiêu đề */}
            <h1 className="text-3xl font-bold text-gray-800 mb-6">📊 Báo cáo & Thống kê</h1>

            {/* Bộ lọc ngày */}
            <div className="bg-gray-100 p-6 rounded-lg shadow-md flex flex-wrap items-center justify-center space-x-4 w-full max-w-2xl">
                <label className="text-gray-700 font-semibold">📅 Từ ngày:</label>
                <input type="date" className="border p-2 rounded-md outline-none focus:ring-2 focus:ring-blue-500"
                    value={tuNgay} onChange={(e) => setTuNgay(e.target.value)} />

                <label className="text-gray-700 font-semibold">📅 Đến ngày:</label>
                <input type="date" className="border p-2 rounded-md outline-none focus:ring-2 focus:ring-blue-500"
                    value={denNgay} onChange={(e) => setDenNgay(e.target.value)} />

                <button onClick={fetchData} className="bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700 transition mt-[5px]">
                    {loading ? "Đang tải..." : "🔍 Lọc"}
                </button>
            </div>

            {/* Hiển thị tổng doanh thu */}
            {data && (
                <div className="mt-6 p-4 bg-green-100 text-green-800 font-bold rounded-lg shadow-md">
                    Tổng doanh thu: {new Intl.NumberFormat('vi-VN').format(data.tongDoanhThu)} VNĐ
                </div>
            )}

            {/* Biểu đồ doanh thu */}
            <div className="mt-6 w-full max-w-4xl">
                {data ? (
                    <Bar data={chartData} options={{ responsive: true, plugins: { legend: { display: true } } }} />
                ) : (
                    <div className="p-6 border-2 border-dashed border-gray-300 flex items-center justify-center text-gray-500 h-[400px] w-full max-w-4xl rounded-lg bg-gray-50 shadow-inner">
                        <p>📈 Dữ liệu thống kê sẽ hiển thị tại đây...</p>
                    </div>
                )}
            </div>
        </div>
    );
};

export default StatisticalAdmin;