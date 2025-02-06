import React from "react";
import './MembershipSection.css';

const MembershipSection: React.FC = () => {
  return (
    <div
      className="membership-container"
      style={{
        backgroundImage: `url('https://cinestar.com.vn/_next/image/?url=%2Fassets%2Fimages%2Fbg-cfriends.webp&w=1920&q=75')`,
      }}
    >
      <div className="membership-inner">
        <h2 className="membership-title">CHƯƠNG TRÌNH THÀNH VIÊN</h2>

        <div className="membership-card-container">
          {/* Thẻ thành viên C'Friend */}
          <div className="membership-card">
            <div className="membership-card-image">
              <img
                src="https://api-website.cinestar.com.vn/media/wysiwyg/CMSPage/Member/Desktop519x282_CMember.webp"
                alt="C'Friend"
              />
            </div>
            <div className="membership-card-content">
              <h3 className="membership-card-title">THÀNH VIÊN C'FRIEND</h3>
              <p className="membership-card-description">
                Thẻ C'Friend nhiều ưu đãi cho thành viên mới
              </p>
              <div className="membership-button-wrapper">
                <div className="membership-button-gradient" />
                <button className="membership-button">TÌM HIỂU NGAY</button>
              </div>
            </div>
          </div>

          {/* Thẻ thành viên C'VIP */}
          <div className="membership-card">
            <div className="membership-card-image">
              <img
                src="https://api-website.cinestar.com.vn/media/wysiwyg/CMSPage/Member/c-vip.webp"
                alt="C'VIP"
              />
            </div>
            <div className="membership-card-content">
              <h3 className="membership-card-title">THÀNH VIÊN C'VIP</h3>
              <p className="membership-card-description">
                Thẻ VIP CineStar mang đến sự ưu đãi đặc quyền
              </p>
              <div className="membership-button-wrapper">
                <div className="membership-button-gradient" />
                <button className="membership-button">TÌM HIỂU NGAY</button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MembershipSection;
