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
        <h2 className="title">COFFEE</h2>
        <div className="description">
          <div className="des2">
            Nhâm nhi, thưởng thức và kết nối tại C'Coffee - Góc cà phê ấm cúng
            của Cinestar!
          </div>
          <div className="des2">
            Thư giãn và kết nối trước hoặc sau bộ phim của bạn tại C'Coffee, tọa
            lạc tại vị trí thuận tiện trong khu phức hợp Cinestar.
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
            C'Coffee - Nơi mỗi tách cà phê khơi dậy sự kết nối.
          </div>
        </div>
      </div>
      <div className="address">
        <div className="location-list">
          <div className="location-card">
            <h3 className="title_address">HUẾ</h3>
            <div>
              <a href="https://www.google.com/maps/place/Cinestar+Hu%E1%BA%BF/@16.4609673,107.5871789,17z/data=!3m1!4b1!4m6!3m5!1s0x3141a1ed3c48b8e9:0xfafa16e6a736e872!8m2!3d16.4609622!4d107.5897538!16s%2Fg%2F11h10w6mv5?entry=tts">
                📍 25 Hai Bà Trưng, Phường Vĩnh Ninh, TP.Huế
              </a>
            </div>
            <div>
              <a
                href="https://www.facebook.com/CinestarHue"
                target="_blank"
                rel="noopener noreferrer"
              >
                🔗 https://www.facebook.com/CinestarHue
              </a>
            </div>
          </div>
          <div className="location-card">
            <h3 className="title_address">ĐÀ LẠT</h3>
            <div>
              <a href="https://www.google.com/maps/place/Cinestar+Đà+Lạt/@11.9404181,108.4369027,17z/data=!4m6!3m5!1s0x3171137c2a4627f1:0x6e5fc3140ac9da8b!8m2!3d11.9404129!4d108.4394776!16s%2Fg%2F11fqfc1sdm">
                📍 Quảng trường Lâm Viên, Thành phố Đà Lạt
              </a>
            </div>
            <div>
              <a
                href="https://www.facebook.com/CinestarDaLat"
                target="_blank"
                rel="noopener noreferrer"
              >
                🔗 https://www.facebook.com/CinestarDaLat
              </a>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Coffee;
