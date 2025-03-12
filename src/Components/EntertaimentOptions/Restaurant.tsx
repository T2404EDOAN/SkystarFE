import React from "react";
import "./Kidzone.css";

const Restaurant = () => {
  return (
    <div className="box">
      <div className="img_main">
        <img
          src="https://skystarimages.s3.us-east-1.amazonaws.com/products/monngon.jpg"
          alt="restaurant"
          className="img"
        />
      </div>
      <div className="content">
        <h2 className="title" style={{ fontFamily: "Anton, sans-serif" }}>NHÀ HÀNG</h2>
        <div className="description">
          <div className="des2">
            Bắt tay vào cuộc phiêu lưu ẩm thực tại Món Ngon Đà Lạt & Huế!
          </div>
          <div className="des2">
            Trải nghiệm hương vị đa dạng của Việt Nam và quốc tế tại Món Ngon Đà
            Lạt & Huế, nhà hàng độc đáo của SkyStar. Chúng tôi cung cấp thực
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

export default Restaurant;
