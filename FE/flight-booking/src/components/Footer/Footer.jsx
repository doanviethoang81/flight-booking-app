import React from "react";
import "./Footer.css"; 
import logo from "../../assets/images/traveloka-official-logo-resmi-white-new.webp"; 
import googlePlay from "../../assets/images/en_badge_web_generic.png"; 
import appStore from "../../assets/images/itunes-app-store-logo.webp"; 
// import visa from "../../assets/images/visa.webp"; 
import mastercard from "../../assets/images/mastercard.webp"; 
import momo from "../../assets/images/MoMo_Logo.png"; 
import vnpay from "../../assets/images/vnpay-logo-vinadesign-25-12-57-55.jpg"; 


const Footer = () => {
  return (
    <footer className="footer">
      <div className="footer-container">
        <div className="footer-left">
          <img src={logo} alt="Traveloka Logo" className="footer-logo" />
          <button className="partner-btn">Hợp tác với Traveloka</button>
          <p className="payment-title">Đối tác thanh toán</p>
          <div className="payment-icons">
            <img src={vnpay} alt="Vnpay" />
            <img src={mastercard} alt="Mastercard" />
            <img src={momo} alt="MoMo" />
          </div>
        </div>

        <div className="footer-links">
          <div className="footer-column">
            <h4>Về Traveloka</h4>
            <ul>
              <li><a href="/1">Cách đặt chỗ</a></li>
              <li><a href="/2">Liên hệ</a></li>
              <li><a href="/3">Trợ giúp</a></li>
              <li><a href="/4">Tuyển dụng</a></li>
              <li><a href="/5">Về chúng tôi</a></li>
            </ul>
          </div>

          <div className="footer-column">
            <h4>Sản phẩm</h4>
            <ul>
              <li><a href="/6">Khách sạn</a></li>
              <li><a href="/7">Vé máy bay</a></li>
              <li><a href="/8">Vé xe khách</a></li>
              <li><a href="/9">Đưa đón sân bay</a></li>
              <li><a href="/10">Cho thuê xe</a></li>
            </ul>
          </div>

          <div className="footer-column">
            <h4>Khác</h4>
            <ul>
              <li><a href="/11">Traveloka Affiliate</a></li>
              <li><a href="/12">Traveloka Blog</a></li>
              <li><a href="/13">Chính sách quyền riêng tư</a></li>
              <li><a href="/14">Điều khoản & Điều kiện</a></li>
            </ul>
          </div>
        </div>

        
        <div className="footer-right">
          
          <h4>Tải ứng dụng Traveloka</h4>
          <div className="app-icons">
            <img src={googlePlay} alt="Google Play" />
            <img src={appStore} alt="App Store" />
          </div>
        </div>
      </div>
      <div className="footer-bottom">
        <p>Copyright © 2025 Traveloka. All rights reserved</p>
      </div>
    </footer>
  );
};

export default Footer;
