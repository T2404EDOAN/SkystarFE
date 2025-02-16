import React from "react";
import { Link } from "react-router-dom";
import "./EventRentalPage.css";

const EventRentalPage = () => {
  return (
    <div className="container-event-rental">
      <header className="header-event-rental">
        <p className="header-title-event-rental">THUÊ SỰ KIỆN</p>
        <p className="header-subtitle-event-rental">
          Lên kế hoạch cho một sự kiện?
        </p>
        <p className="header-text-event-rental">
          Chúng tôi có nhiều lựa chọn để giúp sự kiện của bạn trở nên khó quên.
        </p>
      </header>

      <main className="main-content-event-rental">
        {["first", "second", "third"].map((section, index) => (
          <div
            key={section}
            className={`event-section ${index % 2 === 1 ? "reverse" : ""}`}
          >
            <div className="event-text-event-rental">
              <h2 className="event-title-event-rental">
                {index === 0 && "Fanclub, Cầu hôn, Sinh nhật"}
                {index === 1 &&
                  "Ra Mắt Chương Trình, Họp Hội Bộ, Music Video, Ra Mắt Phim"}
                {index === 2 && "Sự Kiện Đặc Biệt"}
              </h2>
              <p className="event-description">
                Skystar Skymas kỳ vọng sẽ đứng đồng sau làm sân khấu để tôn vinh
                câu chuyện của doanh nghiệp bạn.
              </p>
              <p className="event-info">
                Để biết thêm thông tin về việc thuê, vui lòng gọi:
              </p>
              <p className="event-phone">0342556642</p>
              <button className="contact-button-event-rental">
                LIÊN HỆ NGAY
              </button>
            </div>
            <img
              src={
                index === 0
                  ? "https://api-website.cinestar.com.vn/media/.renditions/wysiwyg/CMSPage/to-chuc-su-kien/fanclub.png"
                  : index === 1
                  ? "https://api-website.cinestar.com.vn/media/.renditions/wysiwyg/CMSPage/to-chuc-su-kien/chuong-trinh.png"
                  : "https://api-website.cinestar.com.vn/media/.renditions/wysiwyg/CMSPage/to-chuc-su-kien/noi-bo.png"
              }
              alt="Event Image"
              className="event-image"
            />
          </div>
        ))}
      </main>
    </div>
  );
};

export default EventRentalPage;
