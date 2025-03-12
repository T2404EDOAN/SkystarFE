import React from "react";
import "./Kidzone.css";

const Billard = () => {
  return (
    <div className="box">
      <div className="img_main">
        <img
          src="https://skystarimages.s3.us-east-1.amazonaws.com/products/billiards.jpg"
          alt="billard"
          className="img"
        />
      </div>
      <div className="content">
        <h2 className="title" style={{ fontFamily: "Anton, sans-serif" }}>BILLIARD</h2>
        <div className="description">
          <div className="des2">
            Tận hưởng niềm vui ở thành phố Đà Lạt, Huế và Mỹ Tho.
          </div>
          <div className="des2">
            Thử thách bản thân và những người bạn tại S'Billiards, Trung tâm tọa
            lạc tại vị trí thuận tiện trong khu phức hợp rạp chiếu phim
            SkyStar.
          </div>
          <div className="des2">
            Làm chủ trò chơi: Rèn luyện kỹ năng của bạn với các khu vực chơi
            rộng rãi và các bàn chơi được bảo trì tốt định kỳ.
          </div>
          <div className="des2">
            Nâng tầm trò chơi của bạn: Tham gia các giải đấu giao hữu được tổ
            chức thường xuyên để kiểm tra khí phách của bạn và kết nối với cộng
            đồng bida tại địa phương.
          </div>
          <div className="des2">
            Thư giãn và vui chơi: Tận hưởng bầu không khí thoải mái và thân
            thiện, hoàn hảo cho người chơi ở mọi cấp độ.
          </div>
          <div className="des2">
            S'Billiards - Nơi mỗi cú đánh là cơ hội để kết nối và vui chơi!
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

export default Billard;
