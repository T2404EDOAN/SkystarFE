import React from "react";
import { Link } from "react-router-dom";
import "./EventRentalPage.css";

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
            id="event-section1"
            className={`event-section ${index % 2 === 1 ? "reverse" : ""}`}
          >
            <div className="event-text-event-rental">
              <span className="event-title-event-rental">
                {index === 0 && "Fanclub, Cầu hôn, Sinh nhật"}
                {index === 1 &&
                  "Ra Mắt Chương Trình, Họp Hội Bộ, Music Video, Ra Mắt Phim"}
                {index === 2 && "Sự Kiện Đặc Biệt"}
              </span>
              <p className="event-description">
                Skystar Skymas kỳ vọng sẽ đứng đồng sau làm sân khấu để tôn vinh
                câu chuyện của doanh nghiệp bạn.
              </p>
              <p className="event-info">
                Để biết thêm thông tin về việc thuê, vui lòng gọi:
              </p>
              <p className="event-phone">0342556642</p>
              <button
                className="promotion-button"
                id="promotion-button12"
                style={{ fontFamily: "Anton, sans-serif" }}
              >
                <Link to="/mua-ve">Liên hệ ngay</Link>
              </button>
            </div>
            <div>
              {" "}
              <img
                src={
                  index === 0
                    ? "https://skystarimages.s3.us-east-1.amazonaws.com/event/event1.jpg"
                    : index === 1
                    ? "https://skystarimages.s3.us-east-1.amazonaws.com/products/meeting.JPG"
                    : "https://skystarimages.s3.us-east-1.amazonaws.com/event/event2.JPG"
                }
                alt="Event Image"
                className="event-image"
              />
            </div>
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
                src="https://skystarimages.s3.us-east-1.amazonaws.com/event/event3.png"
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
                src="https://skystarimages.s3.us-east-1.amazonaws.com/event/ope.jpg"
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
                src="https://skystarimages.s3.us-east-1.amazonaws.com/event/event4.png"
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
                src="https://skystarimages.s3.us-east-1.amazonaws.com/event/event5.png"
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
                src="https://skystarimages.s3.us-east-1.amazonaws.com/event/event6.png"
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
                src="https://skystarimages.s3.us-east-1.amazonaws.com/event/billiardslink.JPEG"
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
        {/* <div className="w-full px-4 pb-[50px] md:pb-[100px]">
          <img
            src="https://skystarimages.s3.us-east-1.amazonaws.com/event/bannerEvent.jpg"
            alt="Voucher Banner"
            className="w-full h-auto rounded-lg"
          />
        </div> */}
      </main>
    </div>
  );
};

export default EventRentalPage;
