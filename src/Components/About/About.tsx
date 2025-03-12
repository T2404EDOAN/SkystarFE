import React, { useState } from "react";
import { Link } from "react-router";
import "./About.css";

const fakeData = [
  {
    title: "TRỤ SỞ | HEADQUARTER",
    email: "marketing.skystar@gmail.com",
    phone: "028 7500 7279",
    address: "Yên Hoà, Cầu Giấy, Hà Nội",
    mapLink: "https://www.google.com/maps/place/Skystar+cinema/@21.0259146,105.789596,17z/data=!3m1!4b1!4m6!3m5!1s0x3135ab2d70bc72af:0x1835edd6462ab44!8m2!3d21.0259146!4d105.789596!16s%2Fg%2F11m5r8t6rn?entry=ttu&g_ep=EgoyMDI1MDMwNC4wIKXMDSoASAFQAw%3D%3D",
  },
  {
    title: "SKYSTAR QUỐC THANH",
    email: "",
    phone: "",
    address:
      "271 Nguyễn Trãi, Phường Nguyễn Cư Trinh, Quận 1, Thành Phố Hồ Chí Minh",
    mapLink: "https://goo.gl/maps/abc",
  },
  {
    title: "SKYSTAR HAI BÀ TRƯNG (TP.HCM)",
    email: "",
    phone: "",
    address: "135 Hai Bà Trưng, Phường Bến Nghé, Quận 1, Thành Phố Hồ Chí Minh",
    mapLink: "https://goo.gl/maps/def",
  },
  {
    title: "SKYSTAR SINH VIÊN (BÌNH DƯƠNG)",
    email: "",
    phone: "",
    address: "Bình Dương",
    mapLink: "https://goo.gl/maps/ghi",
  },
];

const About = () => {
  const [data] = useState(fakeData);
  return (
    <div className="box_about">
      <div className="image-container">
        <img
          src="https://skystarimages.s3.us-east-1.amazonaws.com/banner/cinema.JPG"
          alt="cinema"
          className="image"
        />
        <div className="text-overlay">
          <h1 className="title_about" style={{ fontFamily: "Anton, sans-serif" }}>HỆ THỐNG CỤM RẠP TRÊN TOÀN QUỐC</h1>
          <p>
            Cinestar là một trong những hệ thống rạp chiếu phim được yêu thích
            nhất tại Việt Nam, cung cấp nhiều mô hình giải trí hợp dẫn bao gồm
            Các Cụm Rạp Chiếu Phim hiện đại, Nhà hát, Khu vui chơi trẻ em
            Kidzone, Bowling, Billiards, Games, Phòng Gym, Nhà Hàng, và Phố Bia
            CBbeer. Với mục tiêu trở thành điểm đến giải trí theo mô hình phức
            hợp hiện đại nhất tại Việt Nam, Cinestar đang được biết đến là cụm
            rạp ưu tú phim Việt, góp phần phát triển điện ảnh Việt. Không chỉ
            chiếu các bộ phim bom tấn quốc tế, Cinestar còn đang thành công các
            nhà làm phim Việt Nam, đưa những tác phẩm điện ảnh đặc sắc của Việt
            Nam đến gần hơn với khán giả.
          </p>
        </div>
      </div>
      <div className="page_about">
        <div className="title_about_page" style={{ fontFamily: "Anton, sans-serif" }}>SỨ MỆNH</div>
        <div className="des_ab_ab">
          <div className="des_about_page">
            <div className="des_ab_num">01</div>
            <div className="des_ab_tex">
              Góp phần tăng trưởng thị phần điện ảnh, văn hóa, giải trí của
              người Việt Nam
            </div>
          </div>
          <div className="des_about_page">
            <div className="des_ab_num">02</div>
            <div className="des_ab_tex">
              Phát triển dịch vụ xuất sắc với mức giá tối ưu, phù hợp với thu
              nhập người Việt Nam.
            </div>
          </div>
          <div className="des_about_page">
            <div className="des_ab_num">03</div>
            <div className="des_ab_tex">
              Mang nghệ thuật điện ảnh, văn hóa Việt Nam hội nhập quốc tế
            </div>
          </div>
        </div>
      </div>
      <div className="album">
        <Link to="/do-uong">
          <h2>fbasbdkask</h2>doan anh
        </Link>
      </div>
      <div className="about_page_2">
        <div className="title_ab_1" style={{ fontFamily: "Anton, sans-serif" }}>TRỤ SỞ CỦA CHÚNG TÔI</div>
        <div className="des_ab_1">
          Các phòng chiếu được trang bị các thiết bị tiên tiến như hệ thống âm
          thanh vòm, màn hình rộng và độ phân giải cao, tạo nên hình ảnh sắc nét
          và âm thanh sống động.
        </div>
        <div className="contact_img">
          <div className="img_1">
            <img
              src="https://skystarimages.s3.us-east-1.amazonaws.com/banner/abt2.jpg"
              alt="Headquarter"
              className="contact-image"
            />
            <div className="overlay"></div>
          </div>

          <div className="contact-text-overlay">
            <h2 style={{ fontFamily: "Anton, sans-serif" }}>TRỤ SỞ | HEADQUARTER</h2>
            <p>📍 Yên Hoà, Cầu Giấy, Hà Nội</p>
            <p>📧 marketing.skystar@gmail.com</p>
            <p>📞 028 7300 7279</p>
          </div>
        </div>
      </div>
      <div className="about_page_3">
        <div className="title_ab_3" style={{ fontFamily: "Anton, sans-serif" }}>HỆ THỐNG CÁC CỤM RẠP</div>
        <div className="des_ab_3">
          Các phòng chiếu được trang bị các thiết bị tiên tiến như hệ thống âm
          thanh vòm, màn hình rộng và độ phân giải cao, tạo nên hình ảnh sắc nét
          và âm thanh sống động..
        </div>
        <div className="des_ab_main">
          <div className="main_left">
            <img
              src="https://skystarimages.s3.us-east-1.amazonaws.com/banner/abtmap.png"
              alt="map"
            />
          </div>
          <div className="main_right">
            <div className="container1">
              {data.map((item, index) => (
                <div className="card1" key={index}>
                  <span className="text-des-112">{item.title}</span>
                  <ul>
                    {item.address && (
                      <li>
                        <a
                          href={item.mapLink}
                          target="_blank"
                          rel="noopener noreferrer"
                        >
                          📍 {item.address}
                        </a>
                      </li>
                    )}
                    {item.email && (
                      <li>
                        <a href={`mailto:${item.email}`}>📧 {item.email}</a><br/><br/>
                      </li>
                    )}
                    {item.phone && (
                      <li>
                        <a href={`tel:${item.phone}`}>📞 {item.phone}</a>
                      </li>
                    )}
                  </ul>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default About;
