import React, { useState, useCallback } from "react"; // Xóa useEffect
import "./Banner.css";

const Banner: React.FC = () => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [imageError, setImageError] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  
  // Sử dụng đường dẫn tuyệt đối từ public folder
  const banners = [
    "https://api-website.cinestar.com.vn/media/MageINIC/bannerslider/1215wx365h_3_.jpg",
    "https://api-website.cinestar.com.vn/media/MageINIC/bannerslider/web_1215x365_1_.jpg"
  ];

  const handlePrevClick = useCallback(() => {
    setCurrentIndex((prevIndex) =>
      prevIndex === 0 ? banners.length - 1 : prevIndex - 1
    );
  }, [banners.length]);

  const handleNextClick = useCallback(() => {
    setCurrentIndex((prevIndex) =>
      prevIndex === banners.length - 1 ? 0 : prevIndex + 1
    );
  }, [banners.length]);

  return (
    <div className="banner-container active"> {/* Thêm class active */}
      <div className="banner-wrapper">
        <div className="banner-content">
          <div className="banner-image-container">
            {isLoading && <div>Loading...</div>}
            <img
              src={banners[currentIndex]}
              alt={`Banner ${currentIndex + 1}`}
              className="banner-image"
              onLoad={() => {
                console.log("Image loaded successfully");
                setIsLoading(false);
              }}
              onError={(e) => {
                console.error("Banner image failed to load:", banners[currentIndex]);
                setImageError(true);
                setIsLoading(false);
              }}
              style={{ display: imageError ? 'none' : 'block' }}
            />
            {imageError && <div className="error-message">Unable to load banner image</div>}
          </div>

          <button
            onClick={handlePrevClick}
            className="nav-button prev-button"
            aria-label="Previous banner"
          >
            <svg
              className="nav-icon"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M15 19l-7-7 7-7"
              />
            </svg>
          </button>

          <button
            onClick={handleNextClick}
            className="nav-button next-button"
            aria-label="Next banner"
          >
            <svg
              className="nav-icon"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M9 5l7 7-7 7"
              />
            </svg>
          </button>

          <div className="indicators">
            {banners.map((_, index) => (
              <button
                key={index}
                onClick={() => setCurrentIndex(index)}
                className={`indicator ${currentIndex === index ? 'indicator-active' : ''}`}
                aria-label={`Go to banner ${index + 1}`}
              />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Banner;
