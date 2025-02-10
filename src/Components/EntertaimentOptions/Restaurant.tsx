import React from "react";
import "./Kidzone.css";

const Restaurant = () => {
  return (
    <div className="box">
      <div className="img_main">
        <img
          src="https://api-website.cinestar.com.vn/media/.renditions/wysiwyg/CMSPage/Service/bg-restaurant.jpg"
          alt="restaurant"
          className="img"
        />
      </div>
      <div className="content">
        <h2 className="title">NHÀ HÀNG</h2>
        <div className="description">
          <div className="des2">
            Bắt tay vào cuộc phiêu lưu ẩm thực tại Món Ngon Đà Lạt & Huế!
          </div>
          <div className="des2">
            Trải nghiệm hương vị đa dạng của Việt Nam và quốc tế tại Món Ngon Đà
            Lạt & Huế, nhà hàng độc đáo của Cinestar. Chúng tôi cung cấp thực
            đơn phong phú với hơn 100 món ăn ngon hàng ngày, thể hiện tinh hoa
            ẩm thực của địa phương và hương vị quốc tế.
          </div>
          <div className="des2">
            Lựa chọn cho mọi dịp: Cho dù bạn đang tụ tập cùng gia đình, tận
            hưởng một đêm đi chơi với bạn bè hay ăn mừng cùng đồng nghiệp, bầu
            không khí ấm áp và hấp dẫn của chúng tôi kết hợp với dịch vụ chuyên
            nghiệp sẽ đảm bảo mang lại trải nghiệm đáng nhớ.
          </div>
          <div className="des2">
            Nhà hàng Món Ngon Đà Lạt & Huế cũng là địa điểm lý tưởng để bạn tổ
            chức các sự kiện, tiệc gia đình, lễ kỷ niệm. Chúng tôi cung cấp
            nhiều lựa chọn khác nhau để đáp ứng nhu cầu của bạn, đảm bảo dịp đặc
            biệt của bạn thành công.
          </div>
          <div className="des2">
            Hãy khám phá ngay thế giới ẩm thực tại Món Ngon Đà Lạt & Huế!
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

export default Restaurant;
