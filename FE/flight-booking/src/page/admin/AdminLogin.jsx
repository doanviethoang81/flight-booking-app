import { useState } from "react";
import axios from "axios";
import { Visibility, VisibilityOff } from "@mui/icons-material";
import { useNavigate } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify"; // Import Toast
import "react-toastify/dist/ReactToastify.css"; // Import CSS
import { jwtDecode } from "jwt-decode";

export default function AdminLogin() {
  const navigate = useNavigate();
  const [isOpen, setIsOpen] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const [loginData, setLoginData] = useState({ email: "", password: "" });
  const [registerData, setRegisterData] = useState({
    email: "",
    password: "",
    confirmPassword: "",
  });
  const [showPassword, setShowPassword] = useState(false);

  // Hàm hiển thị toast thông báo
  const showToast = (message, type = "success") => {
    if (type === "success") {
      toast.success(message, { position: "top-center", autoClose: 3000 });
    } else {
      toast.error(message, { position: "top-center", autoClose: 3000 });
    }
  };

  // Xử lý đăng nhập
  const handleLogin = async () => {
    localStorage.setItem("adminEmail", loginData.email);

    if (!loginData.email || !loginData.password) {
      setErrorMessage("Vui lòng nhập tài khoản và mật khẩu!");
      return;
    }
    setErrorMessage("");

    try {
      const response = await axios.post(
        "http://localhost:8080/api/auth/login",
        loginData,
        { headers: { "Content-Type": "application/json" } }
      );

      localStorage.setItem("adminToken", response.data.token);
      localStorage.setItem("adminUsername", response.data.fullname);

      const decodedToken = jwtDecode(response.data.token);
      const userRole = decodedToken.roles;
      if (userRole.includes("ROLE_ADMIN")) {
        showToast("Đăng nhập thành công!");
        setTimeout(() => navigate("/admin"), 1000);
      }
      else {
        setErrorMessage("Thông tin không chính xác!");
      }
    } catch (error) {
      setErrorMessage("Sai tài khoản hoặc mật khẩu!");
      showToast("Sai tài khoản hoặc mật khẩu!", error);
    }
  };

  // Xử lý đăng ký
  const handleRegister = async () => {
    if (!registerData.username || !registerData.password) {
      setErrorMessage("Vui lòng nhập đầy đủ thông tin!");
      showToast("Vui lòng nhập đầy đủ thông tin!", "error");
      return;
    }

    if (registerData.password !== registerData.confirmPassword) {
      setErrorMessage("Mật khẩu xác nhận không khớp!");
      showToast("Mật khẩu xác nhận không khớp!", "error");
      return;
    }

    setErrorMessage("");

    try {
      await axios.post("http://localhost:8080/api/v1/admin/register", {
        username: registerData.username,
        password: registerData.password,
      });

      showToast("Đăng ký thành công!");
      setIsOpen(false);
    } catch (error) {
      setErrorMessage("Lỗi khi đăng ký admin!");
      showToast("Lỗi khi đăng ký admin!", error);
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100">
      <div className="bg-white p-8 rounded-lg shadow-lg w-96">
        <h2 className="text-2xl font-semibold text-center text-purple-700 mb-6">
          Đăng nhập Admin
        </h2>

        <input
          type="text"
          className="w-full p-3 border rounded-lg mb-3 focus:ring-2 focus:ring-purple-500 focus:outline-none"
          placeholder="Nhập tài khoản admin"
          value={loginData.email}
          onChange={(e) => setLoginData({ ...loginData, email: e.target.value })}
        />
        <div className="relative mb-3">
          <input
            type={showPassword ? "text" : "password"}
            className="w-full p-3 border rounded-lg focus:ring-2 focus:ring-purple-500 focus:outline-none"
            placeholder="Nhập mật khẩu admin"
            value={loginData.password}
            onChange={(e) => setLoginData({ ...loginData, password: e.target.value })}
          />
          <span
            className="absolute top-3 right-3 cursor-pointer"
            onClick={() => setShowPassword(!showPassword)}
          >
            {showPassword ? <VisibilityOff /> : <Visibility />}
          </span>
        </div>

        {errorMessage && <p className="text-red-500 text-sm mb-3">{errorMessage}</p>}

        <button
          className="w-full bg-purple-600 text-white py-2 rounded-lg hover:bg-purple-700 transition"
          onClick={handleLogin}
        >
          Đăng nhập
        </button>
        {/* <p className="text-center text-gray-600 mt-3">
          Chưa có tài khoản?{" "}
          <button
            onClick={() => setIsOpen(true)}
            className="text-purple-600 font-medium hover:underline"
          >
            Đăng ký
          </button>
        </p> */}
      </div>

      {/* Dialog Đăng ký */}
      {isOpen && (
        <div className="fixed inset-0 flex items-center justify-center bg-white bg-opacity-30">
          <div className="bg-white p-6 rounded-lg shadow-lg w-96 border border-gray-500">
            <h2 className="text-xl font-semibold text-purple-700 mb-4 text-center">
              Đăng ký Admin
            </h2>
            <input
              type="text"
              placeholder="Nhập tài khoản"
              className="w-full p-3 border rounded-lg mb-3 focus:ring-2 focus:ring-purple-500"
              value={registerData.username}
              onChange={(e) => setRegisterData({ ...registerData, username: e.target.value })}
            />
            <div className="relative mb-3">
              <input
                type={showPassword ? "text" : "password"}
                placeholder="Nhập mật khẩu"
                className="w-full p-3 border rounded-lg focus:ring-2 focus:ring-purple-500"
                value={registerData.password}
                onChange={(e) => setRegisterData({ ...registerData, password: e.target.value })}
              />
              <span
                className="absolute top-3 right-3 cursor-pointer"
                onClick={() => setShowPassword(!showPassword)}
              >
                {showPassword ? <VisibilityOff /> : <Visibility />}
              </span>
            </div>
            <input
              type={showPassword ? "text" : "password"}
              placeholder="Xác nhận mật khẩu"
              className="w-full p-3 border rounded-lg mb-3 focus:ring-2 focus:ring-purple-500"
              value={registerData.confirmPassword}
              onChange={(e) => setRegisterData({ ...registerData, confirmPassword: e.target.value })}
            />

            <div className="flex justify-between">
              <button onClick={() => setIsOpen(false)} className="text-gray-600 hover:text-gray-800">
                Hủy
              </button>
              <button
                className="bg-purple-600 text-white py-2 px-4 rounded-lg hover:bg-purple-700 transition"
                onClick={handleRegister}
              >
                Đăng ký
              </button>
            </div>
          </div>
        </div>
      )}
      <ToastContainer />
    </div>
  );
}
