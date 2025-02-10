import React from "react";
import "./Kidzone.css";
const Bowling = () => {
  return (
    <div className="box">
      <div className="img_main">
        <img
          src="https://api-website.cinestar.com.vn/media/wysiwyg/CMSPage/bowling/bowling.png"
          alt="bowling"
          className="img"
        />
      </div>
      <div className="content">
        <h2 className="title">BOWLING</h2>
        <div className="description">
          <div className="des2">
            Tận hưởng niềm vui tại C'Bowling - Thành phố Đà Lạt & Huế!
          </div>
          <div className="des2">
            Chinh phục nhà vô địch bên trong bạn tại C'Bowling, điểm đến bowling
            hàng đầu của Đà Lạt và Huế! Trung tâm nằm tại vị trí thuận tiện
            trong khu phức hợp rạp chiếu phim Cinestar
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
            C'Bowling - Nơi những cú đánh và những khoảnh khắc vui vẻ giao thoa!
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

export default Bowling;
