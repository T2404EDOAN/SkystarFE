import React from "react";
import "./kidzone.css";
const Opera = () => {
  return (
    <div className="box">
      <div className="img_main">
        <img
          src="https://skystarimages.s3.us-east-1.amazonaws.com/products/opera.JPEG"
          alt="opera"
          className="img"
        />
      </div>
      <div className="content">
        <h2 className="title" style={{ fontFamily: "Anton, sans-serif" }}>OPERA HOUSE</h2>
        <div className="description">
          <div className="des2">
            Chứng kiến sự hùng vĩ ở trung tâm thành phố
          </div>
          <div className="des2">
            Trải nghiệm những buổi biểu diễn nghệ thuật đẳng cấp tại Nhà Hát Lớn
            Đà Lạt mang tính biểu tượng, đang ẩn mình trong kiệt tác kiến trúc
            Tòa nhà Hoa Hướng Dương tại Quảng trường Lâm Viên.
          </div>
          <div className="des2">
            Những sự kiện khó quên: Chứng kiến các buổi hòa nhạc, vở kịch, cuộc
            thi sắc đẹp, dạ tiệc và các tác phẩm hoành tráng trong không gian
            tuyệt đẹp.
          </div>
          <div className="des2">
            Công nghệ hiện đại: Đắm mình trong hệ thống âm thanh và ánh sáng
            chuyên nghiệp nâng tầm mọi màn trình diễn.
          </div>
          <div className="des2">
            Vị trí đắc địa và thuận tiện ngay trung tâm Đà Lạt, tăng thêm trải
            nghiệm khó quên.
          </div>
          <div className="des2">
            Nhà Hát Lớn Đà Lạt - Nơi hội tụ những tuyệt tác hiện đại.
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

export default Opera;
