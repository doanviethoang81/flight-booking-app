import { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import axios from 'axios';

const VerifyAccountUpdatePassword = () => {
  const [step, setStep] = useState(1);
  const [verificationCode, setVerificationCode] = useState(['', '', '', '', '', '']);
  const [passwordData, setPasswordData] = useState({ password: '', confirmPassword: '' });
  const [error, setError] = useState('');
  const [message, setMessage] = useState('');
  const [loading, setLoading] = useState(false);

  const navigate = useNavigate();
  const { email } = useParams();
  const userEmail = email || localStorage.getItem('email');

  useEffect(() => {
    if (!userEmail) {
      navigate('/');
    }
  }, [userEmail, navigate]);

  const handleChange = (e, index) => {
    const value = e.target.value.replace(/\D/g, '');
    const newCode = [...verificationCode];
    newCode[index] = value.slice(0, 1);
    setVerificationCode(newCode);

    if (value && index < verificationCode.length - 1) {
      document.getElementById(`otp-input-${index + 1}`).focus();
    }
  };

  const handleCreatePassword = async (e) => {
    e.preventDefault();
    if (passwordData.password !== passwordData.confirmPassword) {
      setError('Mật khẩu xác nhận không khớp');
      return;
    }

    setLoading(true);
    setError('');
    try {
      await axios.put(`http://localhost:8080/api/v1/nguoi_dat/create-password/${userEmail}`, {
        password: passwordData.password
      });
      
      setMessage('Mật khẩu đã được lưu tạm thời. Vui lòng xác nhận OTP.');
      setTimeout(() => {
        setStep(2);
      }, 1500);
    } catch (err) {
      setError(err.response?.data?.message || 'Có lỗi xảy ra khi xử lý mật khẩu');
    } finally {
      setLoading(false);
    }
  };

  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("fullname");
    localStorage.removeItem("email");
    window.location.href = '/'; // Chuyển hướng về trang chủ
  };

  const handleVerifyCode = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');
    setMessage('');

    const code = verificationCode.join('');
    if (code.length !== 6) {
      setError('Vui lòng nhập đủ 6 chữ số OTP.');
      setLoading(false);
      return;
    }

    const payload = { 
      email: userEmail, 
      code, 
      password: passwordData.password 
    };

    try {
      const response = await axios.post('http://localhost:8080/api/v1/nguoi_dat/verify', payload);
      if (response.status === 200) {
        setMessage('Tạo mật khẩu thành công!');
        setTimeout(() => {
          handleLogout(); // Gọi hàm logout sau khi tạo mật khẩu thành công
        }, 1500);
      }
    } catch (err) {
      setError(err.response?.data?.message || 'Mã OTP không đúng hoặc có lỗi từ server');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-r ">
      <div className="bg-white mb-96 p-8 rounded-lg shadow-lg w-full max-w-md">
        {step === 1 ? (
          <>
            <h2 className="text-2xl font-bold text-center text-gray-800 mb-4">Tạo Mật Khẩu Mới</h2>
            <p className="text-center text-gray-600 mb-6">
              Đặt mật khẩu mới cho <span className="font-semibold">{userEmail}</span>
            </p>
            <form onSubmit={handleCreatePassword} className="space-y-6">
              <div>
                <input
                  type="password"
                  value={passwordData.password}
                  onChange={(e) => setPasswordData({ ...passwordData, password: e.target.value })}
                  placeholder="Nhập mật khẩu mới"
                  className="w-full p-3 border-2 border-gray-300 rounded-lg focus:outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-200 transition-all"
                  required
                />
              </div>
              <div>
                <input
                  type="password"
                  value={passwordData.confirmPassword}
                  onChange={(e) => setPasswordData({ ...passwordData, confirmPassword: e.target.value })}
                  placeholder="Xác nhận mật khẩu"
                  className="w-full p-3 border-2 border-gray-300 rounded-lg focus:outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-200 transition-all"
                  required
                />
              </div>

              {error && <p className="text-center text-sm text-red-600">{error}</p>}
              {message && <p className="text-center text-sm text-green-600">{message}</p>}

              <button
                type="submit"
                disabled={loading}
                className={`w-full py-3 text-white font-semibold rounded-lg transition-all ${
                  loading ? 'bg-gray-400 cursor-not-allowed' : 'bg-blue-600 hover:bg-blue-700'
                }`}
              >
                {loading ? 'Đang xử lý...' : 'Tiếp Tục'}
              </button>
            </form>
          </>
        ) : (
          <>
            <h2 className="text-2xl font-bold text-center text-gray-800 mb-4">Xác Nhận OTP</h2>
            <p className="text-center text-gray-600 mb-6">
              Nhập mã OTP 6 số được gửi đến <span className="font-semibold">{userEmail}</span>
            </p>
            <form onSubmit={handleVerifyCode} className="space-y-6">
              <div className="flex justify-between gap-2">
                {verificationCode.map((digit, index) => (
                  <input
                    key={index}
                    id={`otp-input-${index}`}
                    type="text"
                    value={digit}
                    onChange={(e) => handleChange(e, index)}
                    maxLength="1"
                    className="w-12 h-12 text-center text-xl font-medium border-2 border-gray-300 rounded-lg focus:outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-200 transition-all"
                    placeholder="0"
                  />
                ))}
              </div>

              {error && <p className="text-center text-sm text-red-600">{error}</p>}
              {message && <p className="text-center text-sm text-green-600">{message}</p>}

              <button
                type="submit"
                disabled={loading}
                className={`w-full py-3 text-white font-semibold rounded-lg transition-all ${
                  loading ? 'bg-gray-400 cursor-not-allowed' : 'bg-blue-600 hover:bg-blue-700'
                }`}
              >
                {loading ? 'Đang xử lý...' : 'Xác Nhận'}
              </button>
            </form>
          </>
        )}
      </div>
    </div>
  );
};

export default VerifyAccountUpdatePassword;