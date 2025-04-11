import { Navigate } from "react-router-dom";
import RequireAuth from "../components/Admin/RequireAuth.jsx";  // Thêm dòng này
import PaymentResult from "../component/PaymentResult";
import WebLayout from "../layouts/WebLayout";
import CheckoutPage from "../page/CheckoutPage";
import HomePage from "../page/HomePage";
import BlogApp from "../page/admin/BlogApp";
import InformationCustomer from "../page/InformationCustomer";
import HomeAdmin from "../admin/homeAdmin.jsx";
import StatisticalAdmin from "../page/admin/StatisticalAdmin";
import AdminLayout from "../layouts/AdminLayout";
import BlogPosts from "../page/BlogPosts";
import ListCustomer from "../page/admin/ListCustomer.jsx";
import AdminLogin from "../page/admin/AdminLogin.jsx";
import VerifyAccount from "../page/VerifyAccount";
import AllFlight from "../page/admin/AllFlight.jsx";
import AllCustomer from "../page/admin/AllCustomer.jsx";
import AdminList from "../page/admin/AdminList.jsx";
import UserList from "../page/admin/UserList.jsx";
import ThongTinNguoiDung from "../components/ThongTinNguoiDung.jsx";
import ChangePassword from "../components/ChangePassword.jsx";
import VerifyAccountUpdatePassword from "../components/VerifyAccountUpdatePassword.jsx";

import InformationUser from "../page/admin/InformationUser.jsx";

const WebRoutes = [
  {
    path: "/",
    element: <WebLayout />,
    children: [
      { index: true, element: <HomePage /> },
      { path: "checkout", element: <CheckoutPage /> },
      { path: "payment-result", element: <PaymentResult /> },
      { path: "blog", element: <BlogPosts /> },
      { path: "informationCustomer", element: <InformationCustomer /> },
      { path: "thongtinuser", element: <ThongTinNguoiDung /> },
      { path: "/user/change-password-user/:email", element: <ChangePassword /> },
      { path: "/user/new-password-user/:email", element: <VerifyAccountUpdatePassword />, },
    ],
  },
  { path: "/verifyaccount", element: <VerifyAccount /> },
  {
    path: "/admin/login",  // Đặt AdminLogin ngoài WebLayout
    element: <AdminLogin />,
  },
  {
    path: "/admin",
    element: <RequireAuth />, // Chặn truy cập nếu chưa đăng nhập
    children: [
      {
        path: "",
        element: <AdminLayout />,
        children: [
          { index: true, element: <HomeAdmin /> },
          { path: "reports", element: <StatisticalAdmin /> },
          { path: "blog", element: <BlogApp /> },
          { path: "listCustomer", element: <ListCustomer /> },
          { path: "AllFlight", element: <AllFlight /> },
          { path: "AllCustomer", element: <AllCustomer /> },
          { path: "staff", element: <AdminList /> },
          { path: "user", element: <UserList /> },
          { path: "InformationUser", element: <InformationUser /> },
        ],
      },
    ],
  },
  { path: "*", element: <Navigate to="/" /> }, // Điều hướng về Home nếu URL sai
];

export default WebRoutes;