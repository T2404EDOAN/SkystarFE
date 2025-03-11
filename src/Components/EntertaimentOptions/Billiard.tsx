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
        <h2 className="title">BILLIARD</h2>
        <div className="description">
          <div className="des2">
            Tận hưởng niềm vui ở thành phố Đà Lạt, Huế và Mỹ Tho.
          </div>
          <div className="des2">
            Thử thách bản thân và những người bạn tại C'Billiards, Trung tâm tọa
            lạc tại vị trí thuận tiện trong khu phức hợp rạp chiếu phim
            Cinestar.
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
            C'Billiards - Nơi mỗi cú đánh là cơ hội để kết nối và vui chơi!
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

export default Billard;
