import  { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
const ThongTinNguoiDung = () => {
    // State để lưu thông tin người dùng
    const [userInfo, setUserInfo] = useState({
        ho: '',
        ten: '',
        soDienThoai: '',
        email: ''
    });
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const navigate = useNavigate();

    const handleBackToHome = () => {
      navigate('/');
    };
    // Giả sử email được lấy từ localStorage hoặc context sau khi đăng nhập
    const emailNguoiDung = localStorage.getItem('email'); // Điều chỉnh cách lấy email nếu cần

    // Gọi API khi component được mount
    useEffect(() => {
        const fetchUserInfo = async () => {
            try {
                const response = await axios.get(
                    `http://localhost:8080/api/v1/nguoi_dat/email/${emailNguoiDung}`
                );
                setUserInfo(response.data); // Cập nhật thông tin người dùng từ response
                setLoading(false);
            } catch (err) {
                setError('Không thể tải thông tin người dùng. Vui lòng thử lại sau.',err);
                setLoading(false);
            }
        };

        if (emailNguoiDung) {
            fetchUserInfo();
        } else {
            setError('Vui lòng đăng nhập để xem thông tin.');
            setLoading(false);
        }
    }, [emailNguoiDung]);

    // Xử lý khi đang tải dữ liệu
    if (loading) {
        return (
            <div className="flex justify-center items-center h-64">
                <p className="text-gray-500 text-lg">Đang tải thông tin...</p>
            </div>
        );
    }

    // Xử lý khi có lỗi
    if (error) {
        return (
            <div className="flex justify-center items-center h-64">
                <p className="text-red-500 text-lg">{error}</p>
            </div>
        );
    }

    // Hiển thị thông tin người dùng
    return (
        <div className="max-w-md mx-auto mt-10 p-6 bg-white rounded-lg shadow-lg">
            <h2 className="text-2xl font-bold text-center text-gray-800 mb-6">
                Thông Tin Người Dùng
            </h2>
            <div className="space-y-4">
                <p className="text-gray-700">
                    <span className="font-semibold text-blue-600">Họ và tên </span>
                    {userInfo.ho} {userInfo.ten}
                </p>
                <p className="text-gray-700">
                    <span className="font-semibold text-blue-600">Số điện thoại: </span>
                    {userInfo.soDienThoai || 'Chưa cập nhật'}
                </p>
                <p className="text-gray-700">
                    <span className="font-semibold text-blue-600">Email: </span>
                    {userInfo.email}
                </p>
            </div>
            <div className="mt-6 text-center">
        <button
          onClick={handleBackToHome}
          className="px-4 py-2 bg-blue-600 text-white font-medium rounded-md hover:bg-blue-700 transition duration-200"
        >
          Trở về trang chủ
        </button>
      </div>
        </div>
    );
};

export default ThongTinNguoiDung;