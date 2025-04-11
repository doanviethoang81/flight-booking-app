import { useState, useEffect } from "react";
import "./Header.css";
import {
  Avatar, Menu, MenuItem, Dialog, DialogTitle, DialogContent, TextField,
  Button, DialogActions, IconButton, InputAdornment, Divider
} from "@mui/material";
import EmailIcon from "@mui/icons-material/Email";
import LockIcon from "@mui/icons-material/Lock";
import Visibility from "@mui/icons-material/Visibility";
import VisibilityOff from "@mui/icons-material/VisibilityOff";
import PaidIcon from '@mui/icons-material/Paid';
import HistoryIcon from '@mui/icons-material/History';
import LogoutIcon from '@mui/icons-material/Logout';
import PermIdentityIcon from '@mui/icons-material/PermIdentity';
import logoWhite from "../../assets/images/traveloka-official-logo-resmi-white-new.webp";
import logoBlack from "../../assets/images/traveloka_logo.png";
import flag from "../../assets/images/Flag_of_Vietnam.svg.webp";
import chevronmore from "../../assets/icon/chevron-compact-down.svg";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import backgroundImage from "../../assets/images/imgResource.webp";
import ChangeCircleIcon from '@mui/icons-material/ChangeCircle';


const Header = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [user, setUser] = useState(null);
  const [anchorEl, setAnchorEl] = useState(null);
  const [openLogin, setOpenLogin] = useState(false);
  const [openRegister, setOpenRegister] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [loginData, setLoginData] = useState({ email: "", password: "" });
  const [error, setError] = useState("");


  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };
    window.addEventListener("scroll", handleScroll);
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };

  }, []);


 // Khôi phục user từ localStorage khi load trang
useEffect(() => {
  const token = localStorage.getItem("token");
  const fullName = localStorage.getItem("fullname");
  const email = localStorage.getItem("email");

  if (token && fullName) {
      setUser({
          email: email || "",
          firstName: fullName,
          lastName: "",
          avatar: "",
          points: 100,
      });
  }
}, []);

// Xử lý đăng nhập
const handleLogin = async () => {
  try {
      const response = await axios.post("http://localhost:8080/api/auth/login", loginData);
      console.log("Dữ liệu từ BE:", response.data);
      if (response.data) {
          const { fullname, token, email } = response.data;
          setUser({
              email: email,
              firstName: fullname,
              lastName: "",
              avatar: "",
              points: 100,
          });
          localStorage.setItem("fullname", fullname);
          localStorage.setItem("token", token);
          localStorage.setItem("email", email);
          setOpenLogin(false);
          setError("");
          alert("Đăng nhập thành công!");
          navigate('/');
      } else {
          setError("Lỗi: Không nhận được dữ liệu từ server!");
      }
  } catch (error) {
      console.error("Lỗi trong khi đăng nhập:", error);
      const errorMsg = error.response.data || error.response.message || "Có lỗi xảy ra!";
      setError(errorMsg);
      alert(errorMsg);
  }
};
const checkGoogleLogin = async (email) => {
  try {
    const response = await axios.get(`http://localhost:8080/api/v1/nguoi_dat/check-email/${email}`);
    const data = response.data;
    
    if (data.message === "Bạn đăng nhập bằng Google nên cần tạo mật khẩu mới.") {
      navigate(`/user/new-password-user/${email}`, { state: { email } });
    } else if (data.message === "Đã có mật khẩu, chuyển tới trang đổi mật khẩu.") {
      navigate(`/user/change-password-user/${email}`, { state: { email } });
    }
  } catch (error) {
    console.error("Error checking email:", error);
    setError(error.response?.data?.message || "Có lỗi khi kiểm tra email");
  }
};
  useEffect(() => {
    const queryParams = new URLSearchParams(window.location.search);
    const token = queryParams.get("token");
    const name = queryParams.get("name");
    const avatarurl = queryParams.get("avatar");
    const email = queryParams.get("email"); // Giả sử backend trả về email
    const errorMessage = queryParams.get("error");
  
    if (token && name && avatarurl) {
      setUser({
        email: email || "", // Lưu email nếu có
        firstName: name,
        lastName: "",
        avatar: avatarurl,
        points: 100,
      });
      setOpenLogin(false);
      localStorage.setItem("fullname", name);
      localStorage.setItem("token", token);
      localStorage.setItem("email", email || ""); // Lưu email vào localStorage
    }
  
    if (errorMessage) {
      alert(errorMessage);
    }
    window.history.replaceState({}, "", window.location.pathname);
  }, []);


  const handleGoogleLogin = () => {

    window.location.href = 'http://localhost:8080/oauth2/authorization/google'

  };

  const [registerData, setRegisterData] = useState({
    fullName: "",
    email: "",
    password: ""
  });

  const navigate = useNavigate();
  async function handleRegister() {
    setError("");
    try {
      const response = await axios.post("http://localhost:8080/api/auth/register", registerData);
      setOpenRegister(false);
      const email = registerData.email;
      navigate("/verifyaccount", { state: { email } });
      alert(response.data);
    } catch (error) {
      console.error("Lỗi trong khi đăng ký:", error);
      const errorMsg = error.response.data || error.response.message || "Có lỗi xảy ra!";
      setError(errorMsg);
      alert(errorMsg);
    }
  }

  const handleLogout = () => {
    setUser(null);
    setAnchorEl(null);
    localStorage.removeItem("token");
    localStorage.removeItem("fullname");
    localStorage.removeItem("email"); // Xóa email khỏi localStorage
    window.location.href = '/'; 
  };

  const handleMenuClick = (event) => {
    setAnchorEl(event.currentTarget);
  };
  return (
    <header className={`header h-50 `}>
      <div
        className="w-full h-full bg-cover bg-center"
        style={{
          backgroundImage: `url(${backgroundImage})`,
        }}>
        <div className="header-top">
          <div className="logo cursor-pointer md:!pl-10" onClick={() => navigate('/')}>
            <img src={isScrolled ? logoBlack : logoWhite} alt="Logo" />
          </div>

          <div className="header-right md:!pr-10">
            <div className="user-actions">
              <div className="language-currency">
                <img src={flag} alt="VN Flag" />
                <span>VI | VND </span>
              </div>
              <div className="event-badge">🎉 Birthday Sale</div>
              <div className="event-badge ">Hỗ Trợ </div>
              <div className="event-badge ">Hợp Tác Với Chúng Tôi</div>
              <div className="event-badge ">Đặt chỗ của tôi</div>

              {user ? (
                <>
                  <div className="user-profile" onClick={handleMenuClick}>
                    <Avatar alt={user.lastName} src={user.avatar} />
                    <span className="user-name ">{user.firstName} {user.lastName}</span>
                    <p>|</p>
                    <PaidIcon style={{ color: "gold", fontSize: "18px" }} /> {user.points} Điểm
                  </div>
                  <Menu
                    anchorEl={anchorEl}
                    open={Boolean(anchorEl)}
                    onClose={() => setAnchorEl(null)}
                    PaperProps={{ style: { width: anchorEl ? anchorEl.getBoundingClientRect().width : "auto" } }}
                    disableScrollLock
                  >
                   <MenuItem  onClick={() => navigate("/thongtinuser")}> <PermIdentityIcon style={{ paddingRight: "20px", fontSize: "2.5rem" }} /> Thông Tin Khách Hàng</MenuItem>

                    <MenuItem onClick={() => alert("Trang Lịch Sử Mua Vé")}><HistoryIcon style={{ paddingRight: "20px",fontSize: "2.5rem" }} />  Lịch Sử Mua Vé </MenuItem>
                    <MenuItem onClick={async () => { if (user && user.email) { await checkGoogleLogin(user.email); } else { alert("Không tìm thấy email người dùng!"); } }}>
                         <ChangeCircleIcon style={{ paddingRight: "20px", fontSize: "2.5rem" }} /> Đổi Mật Khẩu
                   </MenuItem>
                    <MenuItem onClick={handleLogout}><LogoutIcon style={{ paddingRight: "20px",fontSize: "2.5rem" }} />Đăng xuất</MenuItem>
                  </Menu>
                </>
              ) : (
                <>
                  <button className="login " onClick={() => setOpenLogin(true)}>Đăng Nhập</button>
                  <button className="register " onClick={() => setOpenRegister(true)}>Đăng ký</button>
                </>
              )}
            </div>
          </div>
        </div>

        <div className="nav-container md:!pl-10 md:!pr-10">
          <nav className="nav-links !w-full">
            <ul className="w-full justify-between">
              <li><Link to="/blog">Blog</Link></li>
              <li><a className="md:text-sm" href="/flights">Vé máy bay</a></li>
              <li><a className="md:text-sm" href="/bus-tickets">Vé xe khách</a></li>
              <li><a className="md:text-sm" href="/airport-transfer">Đưa đón sân bay</a></li>
              <li><a className="md:text-sm" href="/car-rental">Cho thuê xe</a></li>
              <li><a className="md:text-sm" href="/activities">Hoạt động & Vui chơi</a></li>
              <li><Link to="/informationCustomer">Tra cứu</Link></li>

              <li><a className="md:text-sm" href="/more">More <img src={chevronmore} alt="more" /></a></li>
            </ul>
          </nav>
        </div>
      </div>


      {/* Hộp thoại Đăng Nhập */}
      <Dialog open={openLogin} onClose={() => setOpenLogin(false)} maxWidth="xs" fullWidth disableScrollLock>

        <DialogTitle>Đăng Nhập</DialogTitle>
        <DialogContent>
          <TextField
            label="Email"
            fullWidth
            margin="dense"
            value={loginData.email}
            onChange={(e) => setLoginData({ ...loginData, email: e.target.value })}
            InputProps={{ startAdornment: <InputAdornment position="start"><EmailIcon /></InputAdornment> }}
            error={Boolean(error)}
          />

          <TextField
            label="Mật khẩu"
            type={showPassword ? "text" : "password"}
            fullWidth
            margin="dense"
            value={loginData.password}
            onChange={(e) => setLoginData({ ...loginData, password: e.target.value })}
            InputProps={{
              startAdornment: <InputAdornment position="start"><LockIcon /></InputAdornment>,
              endAdornment: (
                <InputAdornment position="end">
                  <IconButton onClick={() => setShowPassword(!showPassword)}>
                    {showPassword ? <VisibilityOff /> : <Visibility />}
                  </IconButton>
                </InputAdornment>
              ),
            }}
            error={Boolean(error)}
            helperText={error}
          />
          <Button fullWidth variant="contained" color="primary" onClick={handleLogin} sx={{ mt: 2 }}>
            Đăng Nhập
          </Button>
          <Divider sx={{ my: 2 }}>Hoặc</Divider>
          <button onClick={handleGoogleLogin} className="w-full flex items-center justify-center border border-gray-300 bg-white text-black font-medium py-2 rounded-lg shadow-sm hover:bg-gray-100 transition-all">
            <img src="https://upload.wikimedia.org/wikipedia/commons/thumb/c/c1/Google_%22G%22_logo.svg/768px-Google_%22G%22_logo.svg.png"
              alt="Google logo"
              className="w-5 h-5 mr-2"
            /> Đăng nhập với Google
          </button>
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setOpenLogin(false)}>Hủy</Button>
        </DialogActions>
      </Dialog>


      <Dialog open={openRegister} onClose={() => setOpenRegister(false)} maxWidth="xs" fullWidth disableScrollLock>
        <DialogTitle>Đăng Ký</DialogTitle>
        <DialogContent>
          <TextField
            label="Họ và Tên"
            fullWidth
            margin="dense"
            value={registerData.fullName}
            onChange={(e) => setRegisterData({ ...registerData, fullName: e.target.value })}
          />

          <TextField
            label="Email"
            fullWidth
            margin="dense"
            value={registerData.email}
            onChange={(e) => setRegisterData({ ...registerData, email: e.target.value })}
          />

          <TextField
            label="Mật khẩu"
            type="password"
            fullWidth
            margin="dense"
            value={registerData.password}
            onChange={(e) => setRegisterData({ ...registerData, password: e.target.value })}
          />
        </DialogContent>

        <DialogActions>
          <Button onClick={() => setOpenRegister(false)}>Hủy</Button>
          <Button variant="contained" color="primary" onClick={handleRegister}>Đăng Ký</Button>
        </DialogActions>
      </Dialog>

    </header>
  );
};

export default Header;


