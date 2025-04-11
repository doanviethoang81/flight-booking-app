import { Navigate, Outlet } from "react-router-dom";
import { jwtDecode } from "jwt-decode";

// const RequireAuth = () => {
//   const token = localStorage.getItem("adminToken"); // Kiểm tra token
//   if (!token) {
//     return <Navigate to="/admin/login" replace />;
//   }

//   return <Outlet />;
// };


const RequireAuth = () => {
  const token = localStorage.getItem("adminToken"); // Kiểm tra token
  if (!token) {
    // Nếu không có token, điều hướng về trang login
    return <Navigate to="/admin/login" replace />;
  }
  try {
    const decodedToken = jwtDecode(token); // Giải mã token JWT
    console.log(decodedToken);
    const userRole = decodedToken.roles; // Lấy thông tin roles từ token

    if (userRole.includes("ROLE_ADMIN")) {
      // Nếu là admin, cho phép truy cập
      return <Outlet />;
    } else {
      // Nếu không phải admin, điều hướng về trang login
      return <Navigate to="/admin/login" replace />;
    }
  } catch (error) {
    // Nếu có lỗi trong việc giải mã token (token không hợp lệ)
    return <Navigate to="/admin/login" replace />;
  }
};

export default RequireAuth;
