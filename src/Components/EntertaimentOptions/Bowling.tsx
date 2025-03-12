import React from "react";
import "./Kidzone.css";
const Bowling = () => {
  return (
    <div className="box">
      <div className="img_main">
        <img
          src="https://skystarimages.s3.us-east-1.amazonaws.com/products/bowling.jpg"
          alt="bowling"
          className="img"
        />
      </div>
      <div className="content">
        <h2 className="title" style={{ fontFamily: "Anton, sans-serif" }}>BOWLING</h2>
        <div className="description">
          <div className="des2">
            Tận hưởng niềm vui tại S'Bowling - Thành phố Đà Lạt & Huế!
          </div>
          <div className="des2">
            Chinh phục nhà vô địch bên trong bạn tại S'Bowling, điểm đến bowling
            hàng đầu của Đà Lạt và Huế! Trung tâm nằm tại vị trí thuận tiện
            trong khu phức hợp rạp chiếu phim SkyStar
          </div>
          <div className="des2">
            Trung tâm có đội ngũ nhân viên sẵn sàng hướng dẫn các kỹ năng cơ bản
            dành cho Khách mới bắt đầu.
          </div>
          <div className="des2">
            Thử thách bản thân bằng cách tham gia các giải đấu giao hữu được tổ
            chức thường xuyên của Trung tâm.
          </div>
          <div className="des2">
            Trải nghiệm các thiết bị chuyên nghiệp để có một trò chơi không thể
            đánh bại.
          </div>
          <div className="des2">
            Niềm vui thân thiện với gia đình: Tạo ra những kỷ niệm lâu dài mà cả
            gia đình sẽ cùng tận hưởng.
          </div>
          <div className="des2">
            S'Bowling - Nơi những cú đánh và những khoảnh khắc vui vẻ giao thoa!
          </div>
        </div>
      </div>
      <div className="address">
        <div className="location-list">
          <div className="location-card">
            <h3 className="title_address" style={{ fontFamily: "Anton, sans-serif" }}>HUẾ</h3>
            <div>
              <a href="https://www.google.com/maps/dir//Y%C3%AAn+Ho%C3%A0,+C%E1%BA%A7u+Gi%E1%BA%A5y,+H%C3%A0+N%E1%BB%99i/@21.0258948,105.7071943,12z/data=!4m8!4m7!1m0!1m5!1m1!1s0x3135ab2d70bc72af:0x1835edd6462ab44!2m2!1d105.789596!2d21.0259146?entry=ttu&g_ep=EgoyMDI1MDMwOC4wIKXMDSoASAFQAw%3D%3D">
                📍 25 Hai Bà Trưng, Phường Vĩnh Ninh, TP.Huế
              </a>
            </div>
            <div>
              <a
                href="https://www.facebook.com/CinestarHue"
                target="_blank"
                rel="noopener noreferrer"
              >
                🔗 https://www.facebook.com/SkyStarHue
              </a>
            </div>
          </div>
          <div className="location-card">
            <h3 className="title_address" style={{ fontFamily: "Anton, sans-serif" }}>ĐÀ LẠT</h3>
            <div>
              <a href="https://www.google.com/maps/dir//Y%C3%AAn+Ho%C3%A0,+C%E1%BA%A7u+Gi%E1%BA%A5y,+H%C3%A0+N%E1%BB%99i/@21.0258948,105.7071943,12z/data=!4m8!4m7!1m0!1m5!1m1!1s0x3135ab2d70bc72af:0x1835edd6462ab44!2m2!1d105.789596!2d21.0259146?entry=ttu&g_ep=EgoyMDI1MDMwOC4wIKXMDSoASAFQAw%3D%3D">
                📍 Quảng trường Lâm Viên, Thành phố Đà Lạt
              </a>
            </div>
            <div>
              <a
                href="https://www.facebook.com/CinestarDaLat"
                target="_blank"
                rel="noopener noreferrer"
              >
                🔗 https://www.facebook.com/SkyStarDaLat
              </a>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Bowling;
