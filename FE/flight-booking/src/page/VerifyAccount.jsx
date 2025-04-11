import { useState } from 'react';
import axios from 'axios';
import { useLocation } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';
import { useEffect } from "react";


const VerifyAccount = () => {
  const [activationCode, setActivationCode] = useState(['', '', '', '', '', '']);
  const [message, setMessage] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const navigate = useNavigate();
  const location = useLocation();
  const email = location.state?.email; 

  useEffect(() => {
    if (!email) {
      navigate('/'); // Điều hướng về trang chủ nếu không có email
    }
  }, [email, navigate]);

  const handleChange = (e, index) => {
    const value = e.target.value;
    const newCode = [...activationCode];
    newCode[index] = value.slice(0, 1); // Chỉ giữ lại một ký tự
    setActivationCode(newCode);

    // Tự động chuyển đến input kế tiếp nếu có
    if (value && index < activationCode.length - 1) {
      document.getElementById(`activation-input-${index + 1}`).focus();
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true); 
    setMessage(''); 

    // Kiểm tra nếu người dùng chưa nhập đủ mã
    const code = activationCode.join('');
    if (code.length !== 6) {
      setMessage('Vui lòng nhập đủ mã kích hoạt.');
      setIsLoading(false);
      return;
    }
   
    const payload = {
      email: email, // Lấy email từ state hoặc props
      code: code, // Mã kích hoạt
    };

    try {
      const response = await axios.post('http://localhost:8080/api/auth/verify',payload);
      if (response.status === 200) {
        setMessage('Tài khoản của bạn đã được kích hoạt. Bạn có thể đăng nhập!');
        setTimeout(() => {
          navigate('/');  // Điều hướng về trang đăng nhập
        }, 2000); // Delay 2s trước khi điều hướng
      }
    } catch (error) {
      console.error(error);
      setMessage(error.response?.data || 'Mã kích hoạt không hợp lệ hoặc đã hết hạn!');
    } finally {
      setIsLoading(false); // Reset loading state sau khi nhận phản hồi
    }
  };

  return (
    <div className="flex justify-center items-center min-h-screen bg-gray-100">
      <div className="bg-white p-6 rounded-lg shadow-lg w-96">
        <h2 className="text-2xl font-bold text-center mb-4">Nhập mã kích hoạt</h2>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="flex justify-between space-x-2">
            {activationCode.map((value, index) => (
              <input
                key={index}
                type="text"
                id={`activation-input-${index}`}
                value={value}
                onChange={(e) => handleChange(e, index)}
                maxLength="1"
                className="w-12 h-12 text-center text-xl border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            ))}
          </div>
          <div>
            <button
              type="submit"
              disabled={isLoading}
              className={`w-full p-3 text-white rounded-md mt-4 ${isLoading ? 'bg-gray-500' : 'bg-blue-500 hover:bg-blue-600'}`}
            >
              {isLoading ? 'Đang xác nhận...' : 'Xác nhận'}
            </button>
          </div>
        </form>
        {message && (
          <p className={`mt-4 text-center ${message.includes('không hợp lệ') ? 'text-red-500' : 'text-green-500'}`}>
            {message}
          </p>
        )}
      </div>
    </div>
  );
};

export default VerifyAccount;
