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
              src: "https://skystarimages.s3.us-east-1.amazonaws.com/banner/mainKid.jpg",
              alt: "Kidzone",
              link: "/khu-tre-em",
              
            },
            {
              src: "https://skystarimages.s3.us-east-1.amazonaws.com/banner/mainBow.jpg",
              alt: "Bowling",
              link: "/bowling",
            },
            {
              src: "https://skystarimages.s3.us-east-1.amazonaws.com/banner/mainBil.jpg",
              alt: "Billiards",
              link: "/billiard",
            },
            {
              src: "https://skystarimages.s3.us-east-1.amazonaws.com/banner/mainMon.jpg",
              alt: "Món ngon",
              link: "/nha-hang",
            },
            {
              src: "https://skystarimages.s3.us-east-1.amazonaws.com/banner/mainGym.jpg",
              alt: "Gym",
              link: "/gym",
            },
            {
              src: "https://skystarimages.s3.us-east-1.amazonaws.com/banner/mainOpera.jpg",
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
