import React from "react";
import { FaYoutube, FaFacebook, FaTiktok, FaWhatsapp } from "react-icons/fa";
import { Link } from "react-router";
import "./FooterStyles.css"; // Updated import statement

const Footer: React.FC = () => {
  return (
    <footer>
      <div className="footer-container">
        {/* Container chính */}
        <div className="main-container">
          {/* Logo và phần tagline */}
          <div className="logo-section">
            <img src="/logo.png" alt="Cinestar Logo" className="footer-logo" />
            <p className="footer-tagline">BE HAPPY, BE A STAR</p>
            <div className="footer-buttons">
              <div className="footer-button footer-button-yellow">
                <Link to="/mua-ve" className="footer-button-link">
                  <img
                    src="https://cinestar.com.vn/assets/images/ic-ticket.svg"
                    alt="ticket"
                    className="icon-size"
                  />
                  <span>ĐẶT VÉ NGAY</span>
                </Link>
              </div>
              <div className="footer-button footer-button-purple">
                <Link to="/bap-nuoc" className="footer-button-link">
                  <img
                    src="https://cinestar.com.vn/assets/images/ic-cor.svg"
                    alt="popcorn"
                    className="icon-size"
                  />
                  <span>ĐẶT BẮP NƯỚC</span>
                </Link>
              </div>
            </div>
            <div className="footer-social-icons">
              <FaYoutube className="footer-social-icon" />
              <FaFacebook className="footer-social-icon" />
              <FaTiktok className="footer-social-icon" />
              <FaWhatsapp className="footer-social-icon" />
            </div>
          </div>

          {/* Footer Links */}
          <div className="footer-links">
            {/* Column 1 */}
            <div className="footer-link-column">
              <h4 className="footer-title">TÀI KHOẢN</h4>
              <ul>
                <li className="footer-link1">
                  <Link to="/login">Đăng nhâp</Link> <br />
                </li>
                <li className="footer-link1">
                  <Link to="/login">Đăng ký</Link>
                </li>
              </ul>
            </div>
            {/* Column 2 */}
            <div className="footer-link-column">
              <h4 className="footer-title">THUÊ SỰ KIỆN</h4>
              <ul>
                <li>
                  <Link to="/thue-su-kien/cinema">Thuê rạp</Link>
                  <br />
                </li>
                <li>
                  <Link to="/thue-su-kien/all">
                    Các loại hình thuê rạp khác
                  </Link>
                </li>
              </ul>
            </div>
            {/* Column 3 */}
            <div className="footer-link-column">
              <h4 className="footer-title">DỊCH VỤ KHÁC</h4>
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
              <h4 className="footer-title">HỆ THỐNG RẠP</h4>
              <ul>
                <li>Tất cả hệ thống rạp</li>
                <li>SkyStar Quốc Thanh</li>
                <li>SkyStar Hai Bà Trưng</li>
                <li>SkyStar Sinh Viên</li>
                <li>SkyStar Mỹ Tho</li>
                <li>SkyStar Kiên Giang</li>
                <li>SkyStar Kiên Giang</li>
                <li>SkyStar Kiên Giang</li>
                <li>SkyStar Kiên Giang</li>
              </ul>
            </div>
          </div>
        </div>

        {/* Footer Bottom */}
        <div className="footer-bottom">
          <div>
            <p>© 2023 SkyStar. All rights reserved.</p>
          </div>
          <div>
            <div className="footer-bottom-links">
              <a href="#" className="footer-bottom-link">
                Chính sách bảo mật
              </a>
              <a href="#" className="footer-bottom-link">
                Tin điện ảnh
              </a>
              <a href="#" className="footer-bottom-link">
                Hỏi và đáp
              </a>
            </div>
          </div>
        </div>

        <div className="footer-company-info">
          {/* <img src="/path/to/verified-icon.png" alt="Đã thông báo" /> */}
          <p>
            CÔNG TY CỔ PHẦN GIẢI TRÍ PHÁT HÀNH PHIM – RẠP CHIẾU PHIM NGÔI SAO
          </p>
          <p>
            ĐỊA CHỈ: 135 Hai Bà Trưng, Bến Nghé Ward, District 1, Ho Chi Minh
            City
          </p>
          {/* <p>
            GIẤY CNĐKKD SỐ: 0329247444, ĐĂNG KÝ LẦN ĐẦU NGÀY 18/04/2004, ĐĂNG KÝ
            THAY ĐỔI LẦN THỨ 2 NGÀY 15/09/2004, CẤP BỞI SỞ KH&ĐT TPHCM
          </p> */}
        </div>
      </div>
    </footer>
  );
};

export default Footer;
