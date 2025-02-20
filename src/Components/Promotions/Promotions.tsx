import React from "react";
import { Link } from "react-router";
import "./Promotions.css";

const Promotion: React.FC = () => {
  return (
    <div className="promotion-container">
      {/* Row 1: Text Left - Image Right */}
      <div className="promotion-row">
        {/* Text Section */}
        <div className="promotion-text">
          <h3 className="promotion-title" style={{ fontFamily: "Anton, sans-serif" }}>
            C'STUDENT - 45K CHO HỌC SINH SINH VIÊN
          </h3>
          <p className="mb-3">
            Đồng giá 45K/2D cho HSSV/GV/U22 cả tuần tại mọi cụm rạp SkyStar.
          </p>
          <p className="mb-3">Điều kiện</p>
          <ul className="list-disc list-inside text-sm space-y-2">
            <li>- HSSV xuất trình thẻ HSSV/CCCD từ dưới 22 tuổi.</li>
            <li>- Giảng viên/giá viên xuất trình thẻ giảng viên.</li>
          </ul>
          <button className="promotion-button" style={{ fontFamily: "Anton, sans-serif" }}>
            <Link to="/mua-ve">ĐẶT VÉ NGAY</Link>
          </button>
        </div>
        {/* Image Section */}
        <div className="promotion-image">
          <img
            src="https://api-website.cinestar.com.vn/media/.renditions/wysiwyg/CMSPage/Promotions/c_student.png"
            alt="Student"
          />
        </div>
      </div>

      {/* Row 2: Image Left - Text Right */}
      <div className="promotion-row reverse">
        <div className="promotion-text">
          <h3 className="promotion-title" style={{ fontFamily: "Anton, sans-serif" }}>
            C'TEN - HAPPY HOUR - 45K/ 2D MỐC 10H
          </h3>
          <p className="mb-3">
            Áp dụng giá 45K/ 2D và 55K/ 3D cho khách hàng xem phim trước 10h
            sáng và sau 10h tối.
          </p>
          <button className="promotion-button" style={{ fontFamily: "Anton, sans-serif" }}>
            <Link to="/mua-ve">ĐẶT VÉ NGAY</Link>
          </button>
        </div>
        <div className="promotion-image">
          <img
            src="https://api-website.cinestar.com.vn/media/.renditions/wysiwyg/CMSPage/Promotions/C_TEN.png"
            alt="Ten"
          />
        </div>
      </div>

      {/* Row 3: Text Left - Image Right */}
      <div className="promotion-row">
        <div className="promotion-text">
          <h3 className="promotion-title" style={{ fontFamily: "Anton, sans-serif" }}>
            C'MONDAY - HAPPY DAY - ĐỒNG GIÁ 45K/ 2D
          </h3>
          <p className="mb-3">Đồng giá 45K/2D, 55K/3D vào thứ 2 hàng tuần.</p>
          <button className="promotion-button" style={{ fontFamily: "Anton, sans-serif" }}>
            <Link to="/mua-ve">ĐẶT VÉ NGAY</Link>
          </button>
        </div>
        <div className="promotion-image">
          <img
            src="https://api-website.cinestar.com.vn/media/.renditions/wysiwyg/CMSPage/Member/monday_1_.jpg"
            alt="Special"
          />
        </div>
      </div>

      {/* Row 4: Image Left - Text Right */}
      <div className="promotion-row reverse">
        <div className="promotion-text">
          <h3 className="promotion-title" style={{ fontFamily: "Anton, sans-serif" }}>
            C'MEMBER - HAPPY MEMBER’S DAY - GIÁ CHỈ 45K/ 2D
          </h3>
          <p className="mb-3">
            Áp dụng giá 45K/ 2D và 55K/ 3D cho khách hàng là thành viên SkyStar
            vào ngày thứ 4 hàng tuần.
          </p>
          <button className="promotion-button" style={{ fontFamily: "Anton, sans-serif" }}>
            <Link to="/mua-ve">ĐẶT VÉ NGAY</Link>
          </button>
        </div>
        <div className="promotion-image">
          <img
            src="https://api-website.cinestar.com.vn/media/.renditions/wysiwyg/CMSPage/Promotions/C_MEMBER.png"
            alt="Weekend"
          />
        </div>
      </div>
    </div>
  );
};

export default Promotion;
