import React from "react";
import { Link } from "react-router-dom";
import "./EventRentalPage.css";
import "./EventRentalServices.css";

const EventRentalPage = () => {
  return (
    <div className="container-event-rental">
      <header className="header-event-rental">
        <h1
          className="mb-4 header-title-event-rental"
          style={{ fontFamily: "Anton, sans-serif" }}
        >
          THUÊ SỰ KIỆN
        </h1>
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
                <span>LIÊN HỆ NGAY</span>
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

        {/* Services Section */}
        <section className="services-section">
          <h2
            className="services-title"
            style={{ fontFamily: "Anton, sans-serif" }}
          >
            CÁC DỊCH VỤ CHO THUÊ KHÁC
          </h2>
          <p className="services-subtitle">
            Bạn đang tìm kiếm một địa điểm để --
          </p>

          <div className="services-grid">
            <Link to="/thue-su-kien/cinema" className="service-card">
              <img
                src="https://api-website.cinestar.com.vn/media/.renditions/wysiwyg/CMSPage/to-chuc-su-kien/rap-chieu-phim.png"
                alt="Rạp chiếu phim"
                className="service-image"
              />
              <div className="service-overlay">
                <p
                  className="service-name"
                  style={{ fontFamily: "Anton, sans-serif" }}
                >
                  RẠP CHIẾU PHIM
                </p>
              </div>
              <div className="service-hover-effect" />
            </Link>

            <Link to="/thue-su-kien/all" className="service-card">
              <img
                src="https://api-website.cinestar.com.vn/media/.renditions/wysiwyg/CMSPage/to-chuc-su-kien/rap-chieu-phim.png"
                alt="Nhà hát opera"
                className="service-image"
              />
              <div className="service-overlay">
                <p
                  className="service-name"
                  style={{ fontFamily: "Anton, sans-serif" }}
                >
                  NHÀ HÁT OPERA
                </p>
              </div>
              <div className="service-hover-effect" />
            </Link>

            <Link to="/thue-su-kien/all" className="service-card">
              <img
                src="https://api-website.cinestar.com.vn/media/.renditions/wysiwyg/CMSPage/to-chuc-su-kien/kid-zone.png"
                alt="Kidzone"
                className="service-image"
              />
              <div className="service-overlay">
                <p
                  className="service-name"
                  style={{ fontFamily: "Anton, sans-serif" }}
                >
                  KIDZONE
                </p>
              </div>
              <div className="service-hover-effect" />
            </Link>

            <Link to="/thue-su-kien/all" className="service-card">
              <img
                src="https://api-website.cinestar.com.vn/media/.renditions/wysiwyg/CMSPage/to-chuc-su-kien/bowling.png"
                alt="Bowling"
                className="service-image"
              />
              <div className="service-overlay">
                <p
                  className="service-name"
                  style={{ fontFamily: "Anton, sans-serif" }}
                >
                  BOWLING
                </p>
              </div>
              <div className="service-hover-effect" />
            </Link>

            <Link to="/thue-su-kien/all" className="service-card">
              <img
                src="https://api-website.cinestar.com.vn/media/.renditions/wysiwyg/CMSPage/to-chuc-su-kien/nhahang.png"
                alt="Nhà hàng"
                className="service-image"
              />
              <div className="service-overlay">
                <p
                  className="service-name"
                  style={{ fontFamily: "Anton, sans-serif" }}
                >
                  NHÀ HÀNG
                </p>
              </div>
              <div className="service-hover-effect" />
            </Link>

            <Link to="/thue-su-kien/all" className="service-card">
              <img
                src="https://api-website.cinestar.com.vn/media/.renditions/wysiwyg/CMSPage/to-chuc-su-kien/bida.png"
                alt="Billiards"
                className="service-image"
              />
              <div className="service-overlay">
                <p
                  className="service-name"
                  style={{ fontFamily: "Anton, sans-serif" }}
                >
                  BILLIARDS
                </p>
              </div>
              <div className="service-hover-effect" />
            </Link>
          </div>
        </section>

        {/* Voucher Banner */}
        <div className="w-full px-4 pb-[50px] md:pb-[100px]">
          <img
            src="https://api-website.cinestar.com.vn/media/wysiwyg/CMSPage/to-chuc-su-kien/web_banner_voucher_1216x350px.jpg"
            alt="Voucher Banner"
            className="w-full h-auto rounded-lg"
          />
        </div>
      </main>
    </div>
  );
};

export default EventRentalPage;
