import React from "react";
import './MembershipSection.css';

const MembershipSection: React.FC = () => {
  return (
    <div
      className="membership-container"
      style={{
        backgroundImage: `url('https://i.ibb.co/W4qqRZ3h/fixx.jpg')`,
      }}
    >
      <div className="membership-inner">
        <h2 className="membership-title">CHƯƠNG TRÌNH THÀNH VIÊN</h2>

        <div className="membership-card-container">
          {/* Thẻ thành viên S'Friend */}
          <div className="membership-card">
            <div className="membership-card-image">
              <img
                src="https://skystarimages.s3.us-east-1.amazonaws.com/products/sfrs.JPG"
                alt="S'Friend"
              />
            </div>
            <div className="membership-card-content">
              <h3 className="membership-card-title">THÀNH VIÊN S'FRIEND</h3>
              <p className="membership-card-description">
                Thẻ S'Friend nhiều ưu đãi cho thành viên mới
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
                src="https://skystarimages.s3.us-east-1.amazonaws.com/products/svip.JPEG"
                alt="S'VIP"
              />
            </div>
            <div className="membership-card-content">
              <h3 className="membership-card-title">THÀNH VIÊN S'VIP</h3>
              <p className="membership-card-description">
                Thẻ VIP SkyStar mang đến sự ưu đãi đặc quyền
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
