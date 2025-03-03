import React, { useState, useEffect } from "react";
import "./PromotionSection.css"; // Import the new CSS file

const promotions = [
  {
    image:
      "https://skystarimages.s3.us-east-1.amazonaws.com/products/45kt2.JPEG",
    title: "Ngày Thành Viên - Thứ 4 45K",
  },
  {
    image:
      "https://skystarimages.s3.us-east-1.amazonaws.com/products/45kHSSV.jpeg",
    title: "Học Sinh, Sinh Viên 45K",
  },
  {
    image:
      "https://skystarimages.s3.us-east-1.amazonaws.com/products/45k10h.JPEG",
    title: "Trước 10h - Đồng Giá 45K",
  },
  {
    image:
      "https://skystarimages.s3.us-east-1.amazonaws.com/products/45kwed.JPEG",
    title: "Sau 10h Tối - Đồng Giá 45K",
  },
];

const PromotionSection: React.FC = () => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [itemsPerPage, setItemsPerPage] = useState(3);
  const [slideWidth, setSlideWidth] = useState(378);
  const [gapWidth, setGapWidth] = useState(32);

  // Responsive handler
  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth < 640) {
        setItemsPerPage(1);
        setSlideWidth(300);
        setGapWidth(16);
      } else if (window.innerWidth < 1024) {
        setItemsPerPage(2);
        setSlideWidth(320);
        setGapWidth(24);
      } else {
        setItemsPerPage(3);
        setSlideWidth(378);
        setGapWidth(32);
      }
    };

    handleResize();
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  // Xử lý nút "sang trái"
  const handlePrev = () => {
    if (currentIndex > 0) {
      setCurrentIndex(currentIndex - 1);
    }
  };

  // Xử lý nút "sang phải"
  const handleNext = () => {
    if (currentIndex < promotions.length - itemsPerPage) {
      setCurrentIndex(currentIndex + 1);
    }
  };

  // Thêm hàm xử lý click vào dot
  const handleDotClick = (index: number) => {
    setCurrentIndex(index);
  };

  return (
    <div className="promo-section">
      <h2 className="promo-title">KHUYẾN MÃI</h2>
      
      <button
        onClick={handlePrev}
        className={`promo-nav-button promo-left-button ${
          currentIndex === 0 ? "disabled" : ""
        }`}
        disabled={currentIndex === 0}
      >
        <svg
          className="nav-icon"
          aria-hidden="true"
          xmlns="http://www.w3.org/2000/svg"
          width="24"
          height="24"
          fill="none"
          viewBox="0 0 24 24"
        >
          <path
            stroke="currentColor"
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="2"
            d="m15 19-7-7 7-7"
          />
        </svg>
      </button>

      <div className="promo-slider-container">
        <div
          className="promo-slider"
          style={{
            transform: `translateX(-${
              currentIndex * (slideWidth + gapWidth)
            }px)`,
          }}
        >
          {promotions.map((promotion, index) => (
            <div
              key={index}
              className="promo-slide"
              style={{ backgroundImage: `url(${promotion.image})` }}
            />
          ))}
        </div>
      </div>

      <button
        onClick={handleNext}
        className={`promo-nav-button promo-right-button ${
          currentIndex === promotions.length - itemsPerPage ? "disabled" : ""
        }`}
        disabled={currentIndex === promotions.length - itemsPerPage}
      >
        <svg
          className="nav-icon"
          aria-hidden="true"
          xmlns="http://www.w3.org/2000/svg"
          width="24"
          height="24"
          fill="none"
          viewBox="0 0 24 24"
        >
          <path
            stroke="currentColor"
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="2"
            d="m9 5 7 7-7 7"
          />
        </svg>
      </button>
      
      <div className="promo-dots-container">
        {Array.from({ length: promotions.length - itemsPerPage + 1 }).map((_, index) => (
          <div
            key={index}
            className={`promo-dot ${currentIndex === index ? 'active' : ''}`}
            onClick={() => handleDotClick(index)}
          />
        ))}
      </div>
      
      <button className="promo-all-button">
        <span className="promo-button-text">TẤT CẢ ƯU ĐÃI</span>
      </button>
    </div>
  );
};

export default PromotionSection;
