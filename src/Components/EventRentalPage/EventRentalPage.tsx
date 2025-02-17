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

        {/* Services Section */}
        <section className="py-8 md:py-12 text-white pb-[50px] md:pb-[100px]">
          <h2
            className="text-2xl md:text-3xl mb-4 px-4"
            style={{ fontFamily: "Anton, sans-serif" }}
          >
            CÁC DỊCH VỤ CHO THUÊ KHÁC
          </h2>
          <p className="mb-6 md:mb-8 px-4">
            Bạn đang tìm kiếm một địa điểm để --
          </p>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 px-4">
            {/* Service Cards - Keep the existing card structure but update classes */}
            <Link
              to="/thue-su-kien/cinema"
              className="relative group overflow-hidden"
            >
              <img
                src="https://api-website.cinestar.com.vn/media/.renditions/wysiwyg/CMSPage/to-chuc-su-kien/rap-chieu-phim.png"
                alt="Rạp chiếu phim"
                className="w-full h-[200px] md:h-[250px] object-cover rounded-lg transition-transform duration-500 group-hover:scale-110"
              />
              <div className="absolute bottom-0 w-full bg-gradient-to-t from-black to-transparent p-4">
                <p className="text-center">RẠP CHIẾU PHIM</p>
              </div>
              <div className="absolute inset-0 bg-white opacity-0 group-hover:opacity-20 translate-x-[-100%] group-hover:translate-x-[100%] transition-transform duration-500 ease-in-out pointer-events-none" />
            </Link>

            <Link
              to="/thue-su-kien/all"
              className="relative group overflow-hidden"
            >
              <img
                src="https://api-website.cinestar.com.vn/media/.renditions/wysiwyg/CMSPage/to-chuc-su-kien/rap-chieu-phim.png"
                alt="Nhà hát opera"
                className="w-full h-[200px] md:h-[250px] object-cover rounded-lg transition-transform duration-500 group-hover:scale-110"
              />
              <div className="absolute bottom-0 w-full bg-gradient-to-t from-black to-transparent p-4">
                <p className="text-center">NHÀ HÁT OPERA</p>
              </div>
              <div className="absolute inset-0 bg-white opacity-0 group-hover:opacity-20 translate-x-[-100%] group-hover:translate-x-[100%] transition-transform duration-500 ease-in-out pointer-events-none" />
            </Link>

            <Link
              to="/thue-su-kien/all"
              className="relative group overflow-hidden"
            >
              <img
                src="https://api-website.cinestar.com.vn/media/.renditions/wysiwyg/CMSPage/to-chuc-su-kien/kid-zone.png"
                alt="Kidzone"
                className="w-full h-[200px] md:h-[250px] object-cover rounded-lg transition-transform duration-500 group-hover:scale-110"
              />
              <div className="absolute bottom-0 w-full bg-gradient-to-t from-black to-transparent p-4">
                <p className="text-center">KIDZONE</p>
              </div>
              <div className="absolute inset-0 bg-white opacity-0 group-hover:opacity-20 translate-x-[-100%] group-hover:translate-x-[100%] transition-transform duration-500 ease-in-out pointer-events-none" />
            </Link>

            <Link
              to="/thue-su-kien/all"
              className="relative group overflow-hidden"
            >
              <img
                src="https://api-website.cinestar.com.vn/media/.renditions/wysiwyg/CMSPage/to-chuc-su-kien/bowling.png"
                alt="Bowling"
                className="w-full h-[200px] md:h-[250px] object-cover rounded-lg transition-transform duration-500 group-hover:scale-110"
              />
              <div className="absolute bottom-0 w-full bg-gradient-to-t from-black to-transparent p-4">
                <p className="text-center">BOWLING</p>
              </div>
              <div className="absolute inset-0 bg-white opacity-0 group-hover:opacity-20 translate-x-[-100%] group-hover:translate-x-[100%] transition-transform duration-500 ease-in-out pointer-events-none" />
            </Link>
            
            <Link
              to="/thue-su-kien/all"
              className="relative group overflow-hidden">
              <img
                src="https://api-website.cinestar.com.vn/media/.renditions/wysiwyg/CMSPage/to-chuc-su-kien/nhahang.png"
                alt="Nhà hàng"
                className="w-full h-[200px] md:h-[250px] object-cover rounded-lg transition-transform duration-500 group-hover:scale-110"
              />
              <div className="absolute bottom-0 w-full bg-gradient-to-t from-black to-transparent p-4">
                <p className="text-center">NHÀ HÀNG</p>
              </div>
              <div className="absolute inset-0 bg-white opacity-0 group-hover:opacity-20 translate-x-[-100%] group-hover:translate-x-[100%] transition-transform duration-500 ease-in-out pointer-events-none" />
            </Link>

            <Link
              to="/thue-su-kien/all"
              className="relative group overflow-hidden">
              <img
                src="https://api-website.cinestar.com.vn/media/.renditions/wysiwyg/CMSPage/to-chuc-su-kien/bida.png"
                alt="Billiards"
                className="w-full h-[200px] md:h-[250px] object-cover rounded-lg transition-transform duration-500 group-hover:scale-110"
              />
              <div className="absolute bottom-0 w-full bg-gradient-to-t from-black to-transparent p-4">
                <p className="text-center">BILLIARDS</p>
              </div>
              <div className="absolute inset-0 bg-white opacity-0 group-hover:opacity-20 translate-x-[-100%] group-hover:translate-x-[100%] transition-transform duration-500 ease-in-out pointer-events-none" />
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
