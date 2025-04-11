import { useEffect, useState } from "react";
import Box from "@mui/material/Box";
import CheckCircleIcon from "@mui/icons-material/CheckCircle";
import ErrorIcon from "@mui/icons-material/Error";
import Typography from "@mui/material/Typography";
import { useLocation, useNavigate } from "react-router-dom";

const PaymentResult = () => {
  const [countdown, setCountdown] = useState(5);
  const navigate = useNavigate();
  const location = useLocation();

  // Lấy giá trị status từ URL
  const queryParams = new URLSearchParams(location.search);
  const status = queryParams.get("status");
  // Xác định thông báo dựa trên trạng thái thanh toán
  const message =
    status === "success"
      ? "Thanh toán thành công!"
      : "Thanh toán thất bại. Vui lòng thử lại.";
  useEffect(() => {
    const interval = setInterval(() => {
      setCountdown((prev) => {
        if (prev === 1) {
          clearInterval(interval);
          navigate("/"); // Điều hướng về trang chủ sau khi đếm ngược xong
        }
        return prev - 1;
      });
    }, 1000);

    return () => clearInterval(interval);
  }, [navigate]);

  return (
    <Box
      display="flex"
      justifyContent="center"
      alignItems="center"
      height="100vh"
      flexDirection="column"
    >
      <>
        {status === "success" ? (
          <CheckCircleIcon
            color="success"
            style={{ fontSize: 50, marginBottom: 20 }}
          />
        ) : (
          <ErrorIcon color="error" style={{ fontSize: 50, marginBottom: 20 }} />
        )}
        <Typography variant="h6" align="center">
          {message}
        </Typography>
        {/* {paymentStatus === "success" && ( */}
        <Typography variant="body1" align="center">
          Chuyển hướng sau {countdown} giây
        </Typography>
        {/* )} */}
      </>
    </Box>
  );
};

export default PaymentResult;
