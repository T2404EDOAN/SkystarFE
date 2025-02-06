import React from "react";
import "./EntertainmentSection.css";

const EntertainmentSection: React.FC = () => {
  return (
    <div className="entertainment-section">
      <div className="entertainment-container">
        <div className="entertainment-title-wrapper">
          <h2 className="entertainment-title">TẤT CẢ CÁC GIẢI TRÍ</h2>
          <p className="entertainment-description">
            Ngoài hệ thống rạp chiếu phim chất lượng cao, Cinestar còn cung cấp
            cho bạn nhiều loại hình giải trí tuyệt vời khác.
          </p>
        </div>
        <div className="entertainment-grid">
          {[
            {
              src: "https://cinestar.com.vn/assets/images/img-service0.webp",
              alt: "Kidzone",
            },
            {
              src: "https://cinestar.com.vn/assets/images/img-service1.webp",
              alt: "Bowling",
            },
            {
              src: "https://cinestar.com.vn/assets/images/img-service2.webp",
              alt: "Billiards",
            },
            {
              src: "https://cinestar.com.vn/assets/images/img-service3.webp",
              alt: "Món ngon",
            },
            {
              src: "https://cinestar.com.vn/assets/images/img-service4.webp",
              alt: "Gym",
            },
            {
              src: "https://cinestar.com.vn/assets/images/img-service5.webp",
              alt: "Opera",
            },
          ].map((item, index) => (
            <div key={index} className="entertainment-grid-item">
              <img
                src={item.src}
                alt={item.alt}
                className="entertainment-image"
              />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default EntertainmentSection;
