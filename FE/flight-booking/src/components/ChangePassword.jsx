import { useState, useEffect } from 'react';
import axios from 'axios';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const ChangePassword = () => {
  const [formData, setFormData] = useState({
    oldPassword: '',
    newPassword: '',
    confirmPassword: ''
  });
  const [email, setEmail] = useState('');
  const [message, setMessage] = useState('');
  const [error, setError] = useState('');

  useEffect(() => {
    const emailNguoiDung = localStorage.getItem('email');
    if (emailNguoiDung) {
      setEmail(emailNguoiDung);
    }
  }, []);

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("fullname");
    localStorage.removeItem("email");
    // Chuyển hướng về trang chính
    window.location.href = '/'; // Thay đổi đường dẫn theo route của bạn
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!email) {
      setError('Không tìm thấy thông tin người dùng');
      return;
    }

    if (formData.newPassword !== formData.confirmPassword) {
      setError('Mật khẩu xác nhận không khớp');
      return;
    }

    try {
      await axios.put(
        `http://localhost:8080/api/v1/nguoi_dat/change-password-user/${email}`,
        {
          oldPassword: formData.oldPassword,
          newPassword: formData.newPassword,
          confirmPassword: formData.confirmPassword
        }
      );

      // Hiển thị toast thành công
      toast.success('Đổi mật khẩu thành công! Bạn sẽ được đăng xuất ngay bây giờ.', {
        position: "top-right",
        autoClose: 2000, // Hiển thị trong 2 giây
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
      });

      setError('');
      setFormData({
        oldPassword: '',
        newPassword: '',
        confirmPassword: ''
      });

      // Tự động đăng xuất sau 2 giây (để người dùng kịp thấy toast)
      setTimeout(() => {
        handleLogout();
      }, 2000);

    } catch (err) {
      setError(err.response?.data || 'Đã có lỗi xảy ra');
      setMessage('');
    }
  };

  return (
    <div className="max-w-md mx-auto mt-10 p-6 bg-white rounded-lg shadow-xl">
      <h2 className="text-2xl font-bold mb-6 text-center text-gray-800">
        Đổi Mật Khẩu
      </h2>

      <form onSubmit={handleSubmit} className="space-y-6">
        <div>
          <label className="block text-sm font-medium text-gray-700">
            Mật khẩu cũ
          </label>
          <input
            type="password"
            name="oldPassword"
            value={formData.oldPassword}
            onChange={handleChange}
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
            required
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700">
            Mật khẩu mới
          </label>
          <input
            type="password"
            name="newPassword"
            value={formData.newPassword}
            onChange={handleChange}
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
            required
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700">
            Xác nhận mật khẩu
          </label>
          <input
            type="password"
            name="confirmPassword"
            value={formData.confirmPassword}
            onChange={handleChange}
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
            required
          />
        </div>

        {error && (
          <div className="text-red-500 text-sm text-center">{error}</div>
        )}
        {message && (
          <div className="text-green-500 text-sm text-center">{message}</div>
        )}

        <button
          type="submit"
          className="w-full py-2 px-4 bg-indigo-600 hover:bg-indigo-700 text-white font-semibold rounded-md shadow-md focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-opacity-75"
        >
          Đổi mật khẩu
        </button>
      </form>

      {/* Thêm ToastContainer vào đây */}
      <ToastContainer
        position="top-right"
        autoClose={2000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
      />
    </div>
  );
};

export default ChangePassword;