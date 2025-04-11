import { useEffect, useState } from "react";
import axios from "axios";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

function InformationUser() {
    const [user, setUser] = useState(null);
    const [showChangePassword, setShowChangePassword] = useState(false);
    const [form, setForm] = useState({ oldPassword: "", newPassword: "", confirmPassword: "" });

    const email = localStorage.getItem("adminEmail");

    useEffect(() => {
        if (email) {
            axios.get(`http://localhost:8080/api/v1/admin/nguoi_dat/email/${email}`)
                .then(res => setUser(res.data))
                .catch(err => console.error("Lỗi lấy thông tin người dùng:", err));
        }
    }, [email]);

    const validatePassword = (password) => {
        const minLength = password.length >= 6;
        const hasUpperCase = /[A-Z]/.test(password);
        const hasNumber = /\d/.test(password);
        const hasSpecialChar = /[!@#$%^&*(),.?":{}|<>]/.test(password);
        return minLength && hasUpperCase && hasNumber && hasSpecialChar;
    };

    const handleChangePassword = () => {
        const { oldPassword, newPassword, confirmPassword } = form;


        if (!oldPassword || !newPassword || !confirmPassword) {
            toast.error("Vui lòng điền đầy đủ tất cả các trường!");
            return;
        }


        if (!validatePassword(newPassword)) {
            toast.error("Mật khẩu mới phải có ít nhất 6 ký tự, 1 chữ hoa, 1 số và 1 ký tự đặc biệt!");
            return;
        }

        if (newPassword !== confirmPassword) {
            toast.error("Mật khẩu xác nhận không khớp!");
            return;
        }

        axios.put(`http://localhost:8080/api/v1/admin/nguoi_dat/change-password-user/${email}`, form)
            .then(res => {
                toast.success(res.data || "Đổi mật khẩu thành công!");
                setForm({ oldPassword: "", newPassword: "", confirmPassword: "" });
                setShowChangePassword(false);
            })
            .catch(err => {
                if (err.response) {
                    const errorMessage = err.response.data;

                    if (errorMessage === "Mật khẩu cũ không chính xác!") {
                        toast.error("Mật khẩu cũ không chính xác!");
                    } else {
                        toast.error(`Lỗi: ${errorMessage}`);
                    }
                } else {
                    toast.error("Đổi mật khẩu thất bại! Vui lòng thử lại.");
                }
                console.error("Lỗi đổi mật khẩu:", err);
            });
    };

    const handleInputChange = (e) => {
        setForm({ ...form, [e.target.name]: e.target.value });
    };

    if (!user) return <div className="text-center mt-10 text-gray-600">Đang tải thông tin người dùng...</div>;

    return (
        <div className="max-w-4xl mx-auto p-8 bg-white shadow-xl rounded-2xl mt-10">
            <ToastContainer position="top-right" autoClose={3000} />

            <div className="flex justify-between items-center mb-8">
                <h2 className="text-3xl font-bold text-gray-800">Thông tin người dùng</h2>
                <button
                    onClick={() => setShowChangePassword(!showChangePassword)}
                    className="bg-blue-600 hover:bg-blue-700 text-white px-5 py-2 rounded-lg transition-all"
                >
                    {showChangePassword ? "Hủy" : "Thay đổi mật khẩu"}
                </button>
            </div>

            <div className="grid grid-cols-2 gap-6 text-gray-700 text-lg">
                <div>
                    <p className="font-medium text-gray-500">Họ:</p>
                    <p>{user.ho}</p>
                </div>
                <div>
                    <p className="font-medium text-gray-500">Tên:</p>
                    <p>{user.ten}</p>
                </div>
                <div>
                    <p className="font-medium text-gray-500">Số điện thoại:</p>
                    <p>{user.soDienThoai}</p>
                </div>
                <div>
                    <p className="font-medium text-gray-500">Email:</p>
                    <p>{user.email}</p>
                </div>
            </div>

            {showChangePassword && (
                <div className="mt-10 border-t pt-6">
                    <h3 className="text-xl font-semibold mb-4 text-gray-700">Đổi mật khẩu</h3>
                    <div className="space-y-5">
                        <input
                            type="password"
                            name="oldPassword"
                            placeholder="Mật khẩu cũ"
                            value={form.oldPassword}
                            onChange={handleInputChange}
                            className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                        />
                        <input
                            type="password"
                            name="newPassword"
                            placeholder="Mật khẩu mới"
                            value={form.newPassword}
                            onChange={handleInputChange}
                            className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                        />
                        <input
                            type="password"
                            name="confirmPassword"
                            placeholder="Xác nhận mật khẩu mới"
                            value={form.confirmPassword}
                            onChange={handleInputChange}
                            className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                        />
                        <button
                            onClick={handleChangePassword}
                            className="bg-green-600 hover:bg-green-700 text-white px-6 py-3 rounded-lg transition-all"
                        >
                            Xác nhận đổi mật khẩu
                        </button>
                    </div>
                </div>
            )}
        </div>
    );
}

export default InformationUser;
