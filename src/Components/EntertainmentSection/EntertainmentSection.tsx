import React from "react";
import "./EntertainmentSection.css";
import { Link } from "react-router-dom";

const EntertainmentSection: React.FC = () => {
  return (
    <div className="entertainment-section">
      <div className="entertainment-container">
        <div className="entertainment-title-wrapper">
          <h2 className="entertainment-title" style={{ fontFamily: "Anton, sans-serif" }}>TẤT CẢ CÁC GIẢI TRÍ</h2>
          <p className="entertainment-description">
            Ngoài hệ thống rạp chiếu phim chất lượng cao, SkyStar còn cung cấp
            cho bạn nhiều loại hình giải trí tuyệt vời khác.
          </p>
        </div>
        <div className="entertainment-grid">
          {[
            {
              src: "https://cinestar.com.vn/assets/images/img-service0.webp",
              alt: "Kidzone",
              link: "/khu-tre-em",
              
            },
            {
              src: "https://cinestar.com.vn/assets/images/img-service1.webp",
              alt: "Bowling",
              link: "/bowling",
            },
            {
              src: "https://cinestar.com.vn/assets/images/img-service2.webp",
              alt: "Billiards",
              link: "/billiard",
            },
            {
              src: "https://cinestar.com.vn/assets/images/img-service3.webp",
              alt: "Món ngon",
              link: "/nha-hang",
            },
            {
              src: "https://cinestar.com.vn/assets/images/img-service4.webp",
              alt: "Gym",
              link: "/gym",
            },
            {
              src: "https://cinestar.com.vn/assets/images/img-service5.webp",
              alt: "Opera",
              link: "/opera",
            }, 
          ].map((item, index) => (
            <div key={index} className="entertainment-grid-item">
              <Link to={item.link}>
              <img
                src={item.src}
                alt={item.alt}
                className="entertainment-image"
              />
              </Link>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default EntertainmentSection;
