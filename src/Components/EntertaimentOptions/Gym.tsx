import React from "react";
import "./Kidzone.css";

const Gym = () => {
  return (
    <div className="box">
      <div className="img_main">
        <img
          src="https://api-website.cinestar.com.vn/media/wysiwyg/CMSPage/gym/gym-image.png"
          alt="gym"
          className="img"
        />
      </div>
      <div className="content">
        <h2 className="title">GYM</h2>
        <div className="description">
          <div className="des2">
            Đạt được mục tiêu thể hình của bạn tại C'Gym - Đà Lạt & Thành phố Hồ
            Chí Minh!
          </div>
          <div className="des2">
            Tăng cường quá trình rèn luyện sức khỏe của bạn với cơ sở tập thể
            hình hiện đại của C’Gym, tọa lạc tại vị trí thuận tiện ở trung tâm
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
          <div className="des2">C'Gym - Nơi thể hình đáp ứng sự tiến bộ!</div>
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

export default Gym;
