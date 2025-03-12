import React from "react";
import "./Kidzone.css";

const Gym = () => {
  return (
    <div className="box">
      <div className="img_main">
        <img
          src="https://skystarimages.s3.us-east-1.amazonaws.com/products/gym.jpg"
          alt="gym"
          className="img"
        />
      </div>
      <div className="content">
        <h2 className="title" style={{ fontFamily: "Anton, sans-serif" }}>GYM</h2>
        <div className="description">
          <div className="des2">
            Đạt được mục tiêu thể hình của bạn tại S'Gym - Đà Lạt & Thành phố Hồ
            Chí Minh!
          </div>
          <div className="des2">
            Tăng cường quá trình rèn luyện sức khỏe của bạn với cơ sở tập thể
            hình hiện đại của S’Gym, tọa lạc tại vị trí thuận tiện ở trung tâm
            thành phố.
          </div>
          <div className="des2">
            Chọn loc thiết bị chuyên nghiệp: Được trang bị tất cả các mục tiêu
            tập thể hình của bạn với nhiều loại máy tập tim mạch, tạ tự do,
            thiết bị rèn luyện sức mạnh và khu vực tập thể dục chức năng.
          </div>
          <div className="des2">
            Hướng dẫn của Huấn luận viên cá nhân: Lập các kế hoạch đào tạo cá
            nhân theo yêu cầu của Khách hàng.
          </div>
          <div className="des2">S'Gym - Nơi thể hình đáp ứng sự tiến bộ!</div>
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

export default Gym;
