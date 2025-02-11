import React from "react";
import { Link } from "react-router";

const EventRentalPage = () => {
  return (
    <div className="w-full max-w-[1200px] mx-auto font-sans px-4 md:px-6 lg:px-8">
      {/* Header */}
      <header className="text-center py-6 md:py-8 bg-navy-900 text-white">
        <p
          className="mb-3 md:mb-4 text-2xl md:text-4xl"
          style={{ fontFamily: "Anton, sans-serif" }}
        >
          THUÊ SỰ KIỆN
        </p>
        <p className="text-lg md:text-xl mb-2">Lên kế hoạch cho một sự kiện?</p>
        <p className="text-base md:text-lg px-4">
          Chúng tôi có nhiều lựa chọn để giúp sự kiện của bạn trở nên khó quên.
        </p>
      </header>

      {/* Main Content */}
      <main className="flex flex-col">
        {/* Content Sections */}
        {["first", "second", "third"].map((section, index) => (
          <div
            key={section}
            className={`flex flex-col ${
              index % 2 === 1 ? "lg:flex-row-reverse" : "lg:flex-row"
            }`}
          >
            <div className="text-white w-full lg:w-1/2 min-h-[300px] lg:h-[394px] flex flex-col justify-center gap-4 px-4 md:px-8 py-6">
              <h2
                className="text-2xl md:text-3xl"
                style={{ fontFamily: "Anton, sans-serif" }}
              >
                {index === 0 && "Fanclub, Cầu hôn, Sinh nhật"}
                {index === 1 &&
                  "Ra Mắt Chương Trình, Họp Hội Bộ, Music Video, Ra Mắt Phim"}
                {index === 2 && "Sự Kiện Đặc Biệt"}
              </h2>
              <p>
                Skystar Skymas kỳ vọng sẽ đứng đồng sau làm sân khấu để tôn vinh
                câu chuyện của doanh nghiệp bạn.
              </p>
              <p>Để biết thêm thông tin về việc thuê, vui lòng gọi:</p>
              <p className="text-xl ">0342556642</p>
              <button className="bg-yellow-400 text-black px-6 py-2 rounded-md relative overflow-hidden group w-[150px]">
                <span
                  className="relative z-10 group-hover:text-white transition-colors duration-300"
                  style={{ fontFamily: "Anton, sans-serif" }}
                >
                  LIÊN HỆ NGAY
                </span>
                <div className="absolute inset-0 w-full h-full bg-gradient-to-r from-[#663399] to-[#3366cc] -translate-x-full group-hover:translate-x-0 transition-transform duration-300 ease-out" />
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
              className="w-full lg:w-1/2 h-[300px] lg:h-[394px] object-cover"
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

            <div className="relative group overflow-hidden">
              <img
                src="https://api-website.cinestar.com.vn/media/.renditions/wysiwyg/CMSPage/to-chuc-su-kien/kid-zone.png"
                alt="Kidzone"
                className="w-full h-[200px] md:h-[250px] object-cover rounded-lg transition-transform duration-500 group-hover:scale-110"
              />
              <div className="absolute bottom-0 w-full bg-gradient-to-t from-black to-transparent p-4">
                <p className="text-center">KIDZONE</p>
              </div>
              <div className="absolute inset-0 bg-white opacity-0 group-hover:opacity-20 translate-x-[-100%] group-hover:translate-x-[100%] transition-transform duration-500 ease-in-out pointer-events-none" />
            </div>

            <div className="relative group overflow-hidden">
              <img
                src="https://api-website.cinestar.com.vn/media/.renditions/wysiwyg/CMSPage/to-chuc-su-kien/bowling.png"
                alt="Bowling"
                className="w-full h-[200px] md:h-[250px] object-cover rounded-lg transition-transform duration-500 group-hover:scale-110"
              />
              <div className="absolute bottom-0 w-full bg-gradient-to-t from-black to-transparent p-4">
                <p className="text-center">BOWLING</p>
              </div>
              <div className="absolute inset-0 bg-white opacity-0 group-hover:opacity-20 translate-x-[-100%] group-hover:translate-x-[100%] transition-transform duration-500 ease-in-out pointer-events-none" />
            </div>

            <div className="relative group overflow-hidden">
              <img
                src="https://api-website.cinestar.com.vn/media/.renditions/wysiwyg/CMSPage/to-chuc-su-kien/nhahang.png"
                alt="Nhà hàng"
                className="w-full h-[200px] md:h-[250px] object-cover rounded-lg transition-transform duration-500 group-hover:scale-110"
              />
              <div className="absolute bottom-0 w-full bg-gradient-to-t from-black to-transparent p-4">
                <p className="text-center">NHÀ HÀNG</p>
              </div>
              <div className="absolute inset-0 bg-white opacity-0 group-hover:opacity-20 translate-x-[-100%] group-hover:translate-x-[100%] transition-transform duration-500 ease-in-out pointer-events-none" />
            </div>

            <div className="relative group overflow-hidden">
              <img
                src="https://api-website.cinestar.com.vn/media/.renditions/wysiwyg/CMSPage/to-chuc-su-kien/bida.png"
                alt="Billiards"
                className="w-full h-[200px] md:h-[250px] object-cover rounded-lg transition-transform duration-500 group-hover:scale-110"
              />
              <div className="absolute bottom-0 w-full bg-gradient-to-t from-black to-transparent p-4">
                <p className="text-center">BILLIARDS</p>
              </div>
              <div className="absolute inset-0 bg-white opacity-0 group-hover:opacity-20 translate-x-[-100%] group-hover:translate-x-[100%] transition-transform duration-500 ease-in-out pointer-events-none" />
            </div>
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
