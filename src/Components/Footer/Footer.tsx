import React from "react";
import { FaYoutube, FaFacebook, FaTiktok, FaWhatsapp } from "react-icons/fa";
import { Link } from "react-router";
import "./Footer.css";

const Footer: React.FC = () => {
  return (
    <footer>
      <div className="footer-container">
        {/* Container chính */}
        <div className="flex flex-col lg:flex-row gap-8">
          {/* Logo và phần tagline */}
          <div className="flex-1 text-center lg:text-left">
            <img
              src="/logo.png"
              alt="Cinestar Logo"
              className="footer-logo mx-auto lg:mx-0"
            />
            <p className="footer-tagline">BE HAPPY, BE A STAR</p>
            <div className="footer-buttons">
              <button className="footer-button footer-button-yellow">
                <Link
                  to="/mua-ve"
                  className="footer-button-link"
                >
                  <img
                    src="https://cinestar.com.vn/assets/images/ic-ticket.svg"
                    alt="ticket"
                    className="w-5 h-5"
                  />
                  <span>ĐẶT VÉ NGAY</span>
                </Link>
              </button>
              <button className="footer-button footer-button-purple">
                <Link
                  to="/bap-nuoc"
                  className="footer-button-link"
                >
                  <img
                    src="https://cinestar.com.vn/assets/images/ic-cor.svg"
                    alt="popcorn"
                    className="w-5 h-5"
                  />
                  <span>ĐẶT BẮP NƯỚC</span>
                </Link>
              </button>
            </div>
            <div className="footer-social-icons">
              <FaYoutube className="footer-social-icon hover:text-red-600" />
              <FaFacebook className="footer-social-icon hover:text-blue-600" />
              <FaTiktok className="footer-social-icon hover:text-gray-500" />
              <FaWhatsapp className="footer-social-icon hover:text-green-600" />
            </div>
          </div>

          {/* Footer Links */}
          <div className="footer-links">
            {/* Column 1 */}
            <div className="footer-link-column">
              <h4>TÀI KHOẢN</h4>
              <ul>
                <li>Đăng nhâp</li>
                <li>Đăng ký</li>
                <li>Membership</li>
              </ul>
            </div>
            {/* Column 2 */}
            <div className="footer-link-column">
              <h4>THUÊ SỰ KIỆN</h4>
              <ul>
                <li>Thuê rạp</li>
                <li>Các loại hình thuê rạp khác</li>
              </ul>
            </div>
            {/* Column 3 */}
            <div className="footer-link-column">
              <h4>DỊCH VỤ KHÁC</h4>
              <ul>
                <li>Nhà hàng</li>
                <li>Kidzone</li>
                <li>Bowling</li>
                <li>Billiards</li>
                <li>Gym</li>
                <li>Nhà hát Opera</li>
                <li>Coffee</li>
              </ul>
            </div>
            {/* Column 4 */}
            <div className="footer-link-column">
              <h4>HỆ THỐNG RẠP</h4>
              <ul>
                <li>Tất cả hệ thống rạp</li>
                <li>Cinestar Quốc Thanh</li>
                <li>Cinestar Hai Bà Trưng</li>
                <li>Cinestar Sinh Viên</li>
                <li>Cinestar Mỹ Tho</li>
                <li>Cinestar Kiên Giang</li>
                <li>Cinestar Kiên Giang</li>
                <li>Cinestar Kiên Giang</li>
                <li>Cinestar Kiên Giang</li>
              </ul>
            </div>
          </div>
        </div>

        {/* Footer Bottom */}
        <div className="footer-bottom">
          {/* Bên trái */}
          <p>
            © 2023 Cinestar. All rights reserved.
          </p>

          {/* Bên phải */}
          <div className="footer-bottom-links">
            <a
              href="#"
              className="footer-bottom-link"
            >
              Chính sách bảo mật
            </a>
            <a
              href="#"
              className="footer-bottom-link"
            >
              Tin điện ảnh
            </a>
            <a href="#" className="footer-bottom-link">
              Hỏi và đáp
            </a>
          </div>
        </div>

        <div className="footer-company-info">
          <img
            src="/path/to/verified-icon.png"
            alt="Đã thông báo"
          />
          <p>
            CÔNG TY CỔ PHẦN GIẢI TRÍ PHÁT HÀNH PHIM – RẠP CHIẾU PHIM NGÔI SAO
          </p>
          <p>
            ĐỊA CHỈ: 135 Hai Bà Trưng, Bến Nghé Ward, District 1, Ho Chi Minh
            City
          </p>
          <p>
            GIẤY CNĐKKD SỐ: 0329247444, ĐĂNG KÝ LẦN ĐẦU NGÀY 18/04/2004, ĐĂNG KÝ
            THAY ĐỔI LẦN THỨ 2 NGÀY 15/09/2004, CẤP BỞI SỞ KH&ĐT TPHCM
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
