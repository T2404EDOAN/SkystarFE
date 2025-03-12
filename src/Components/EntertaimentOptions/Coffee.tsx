import React from "react";
import "./Kidzone.css";

const Coffee = () => {
  return (
    <div className="box">
      <div className="img_main">
        <img
          src="https://api-website.cinestar.com.vn/media/.renditions/wysiwyg/CMSPage/Coffee/coffee-banner.png"
          alt="coffee"
          className="img"
        />
      </div>
      <div className="content">
        <h2 className="title" style={{ fontFamily: "Anton, sans-serif" }}>COFFEE</h2>
        <div className="description">
          <div className="des2">
            Nhâm nhi, thưởng thức và kết nối tại S'Coffee - Góc cà phê ấm cúng
            của SkyStar!
          </div>
          <div className="des2">
            Thư giãn và kết nối trước hoặc sau bộ phim của bạn tại S'Coffee, tọa
            lạc tại vị trí thuận tiện trong khu phức hợp SkyStar.
          </div>
          <div className="des2">
            Khám phá thực đơn phong phú của chúng tôi bao gồm các loại đồ uống
            cà phê, trà giải khát và đồ ăn nhẹ ngon miệng.
          </div>
          <div className="des2">
            Không khí thư giãn: Hãy chọn cho mình góc nhỏ thoải mái và tận hưởng
            một không gian yên tĩnh - hoàn hảo để gặp gỡ bạn bè, một buổi hẹn hò
            bình thường hoặc một khoảnh khắc yên bình.
          </div>
          <div className="des2">
            S'Coffee - Nơi mỗi tách cà phê khơi dậy sự kết nối.
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

export default Coffee;
