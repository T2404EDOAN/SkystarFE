import React from "react";
import "./kidzone.css";
const Opera = () => {
  return (
    <div className="box">
      <div className="img_main">
        <img
          src="https://api-website.cinestar.com.vn/media/wysiwyg/CMSPage/opera/opera-banner.png"
          alt="opera"
          className="img"
        />
      </div>
      <div className="content">
        <h2 className="title">OPERA HOUSE</h2>
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

export default Opera;
