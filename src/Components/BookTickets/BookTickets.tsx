import React, { useState, useEffect } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faTheaterMasks,
  faClock,
  faFlag,
  faTicketAlt,
} from "@fortawesome/free-solid-svg-icons";
import axios from "axios";
import { Tabs } from "antd"; // Import Tabs from antd

import "./BookTickets.css"; // Import the new CSS file
import { useAuth } from "../../context/AuthContext";
import PromotionSection from "../../Components/PromotionSection/PromotionSection";
interface TabProps {
  cinema?: {
    name: string;
    address: string;
  };
}

const { TabPane } = Tabs;

const BookTickets: React.FC = () => {
  const { selectedTheater } = useAuth();
  const [activeTab, setActiveTab] = useState("dangChieu");
  const [innerActiveTab, setInnerActiveTab] = useState("2D");
  const [loading, setLoading] = useState(true);
  const [filteredMovies, setFilteredMovies] = useState([]);
  const [lastFetchParams, setLastFetchParams] = useState({
    theaterId: null,
    status: null,
  });

  const getStatusFromTab = (tabKey: string) => {
    const statusMap = {
      dangChieu: "NOW_SHOWING",
      sapChieu: "COMING_SOON",
      dacBiet: "SPECIAL",
    };
    return statusMap[tabKey] || "NOW_SHOWING";
  };

  const fetchMoviesByTheaterAndStatus = async (
    theater: Theater,
    status: string
  ) => {
    // Log để debug
    console.log("Theater object:", theater);
    console.log("Theater ID:", theater?.id);

    if (!theater?.id) {
      console.error("No theater ID available");
      return;
    }

    try {
      setLoading(true);
      const params = {
        theaterId: theater.id,
        status: status,
      };

      console.log("Request params:", params);

      const response = await axios.get(
        "https://skystar.io.vn/api/movies/filter",
        {
          params,
        }
      );
      console.log("API Response:", response.data);
      setFilteredMovies(response.data);
    } catch (error) {
      console.error("Fetch error:", error);
      setFilteredMovies([]);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (selectedTheater?.id) {
      const status = getStatusFromTab(activeTab);
      console.log("Selected theater:", selectedTheater);
      console.log("Theater ID:", selectedTheater.id);
      console.log("Status:", status);

      fetchMoviesByTheaterAndStatus(selectedTheater, status);
    } else {
      console.log("No theater selected or missing ID");
    }
  }, [selectedTheater, activeTab]);

  const handleTabChange = (key: string) => {
    setActiveTab(key);
  };

  const groupShowtimesByDate = (showtimes: any[]) => {
    return showtimes.reduce((acc, showtime) => {
      const date = new Date(showtime.showDate).toLocaleDateString("vi-VN", {
        weekday: "long",
        year: "numeric",
        month: "numeric",
        day: "numeric",
      });

      if (!acc[date]) {
        acc[date] = [];
      }

      acc[date].push(showtime);

      // Sắp xếp theo thời gian
      acc[date].sort((a, b) => a.showTime.localeCompare(b.showTime));

      return acc;
    }, {});
  };

  return (
    <div>
      <div className="book-tickets-container">
        {/* Header section */}
        <div className="header-section">
          {/* Phần ảnh bên trái */}
          <div className="header-image">
            <img
              src="path/to/your/image.jpg"
              alt="Cinema Image"
              className="header-image-img"
            />
          </div>

          {/* Phần thông tin bên phải */}
          <div className="header-info">
            <div className="header-info-content">
              <h1 className="header-title">{selectedTheater.name}</h1>
              <div className="header-address">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="header-address-icon"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"
                  />
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"
                  />
                </svg>
                <span>{selectedTheater.address}</span>
              </div>
            </div>
          </div>
        </div>

        <Tabs
          activeKey={activeTab}
          onChange={setActiveTab}
          className="mb-3"
          id=""
        >
          <TabPane
            tab={
              <span
                style={{
                  color: activeTab === "dangChieu" ? "#f3ea28" : "white",
                }}
              >
                PHIM ĐANG CHIẾU
              </span>
            }
            key="dangChieu"
          >
            <div className="tab-title">PHIM ĐANG CHIẾU</div>
            {filteredMovies.length > 0 ? (
              <div className="movie-grid">
                {filteredMovies.map((movie) => (
                  <div key={movie.id} className="movie-card">
                    {/* Cột bên trái: Ảnh */}
                    <div className="movie-poster">
                      <img
                        src={movie.posterUrl}
                        alt={movie.title}
                        className="movie-poster-img"
                      />
                    </div>

                    {/* Thông tin phim */}
                    <div className="movie-info">
                      <h3 className="movie-title">{movie.title}</h3>
                      <div className="movie-details">
                        <p className="movie-detail-item">
                          <svg
                            className="movie-detail-icon"
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
                              d="M15.583 8.445h.01M10.86 19.71l-6.573-6.63a.993.993 0 0 1 0-1.4l7.329-7.394A.98.98 0 0 1 12.31 4l5.734.007A1.968 1.968 0 0 1 20 5.983v5.5a.992.992 0 0 1-.316.727l-7.44 7.5a.974.974 0 0 1-1.384.001Z"
                            />
                          </svg>
                          {movie.genres.map((genre) => genre.name).join(", ")}
                        </p>
                        <p className="movie-detail-item">
                          <svg
                            className="movie-detail-icon"
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
                              d="M12 8v4l3 3m6-3a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z"
                            />
                          </svg>
                          {movie.duration} phút
                        </p>
                        <p className="movie-detail-item">
                          <svg
                            className="movie-detail-icon"
                            aria-hidden="true"
                            xmlns="http://www.w3.org/2000/svg"
                            width="24"
                            height="24"
                            fill="none"
                            viewBox="0 0 24 24"
                          >
                            <path
                              stroke="currentColor"
                              strokeWidth="2"
                              d="M4.37 7.657c2.063.528 2.396 2.806 3.202 3.87 1.07 1.413 2.075 1.228 3.192 2.644 1.805 2.289 1.312 5.705 1.312 6.705M20 15h-1a4 4 0 0 0-4 4v1M8.587 3.992c0 .822.112 1.886 1.515 2.58 1.402.693 2.918.351 2.918 2.334 0 .276 0 2.008 1.972 2.008 2.026.031 2.026-1.678 2.026-2.008 0-.65.527-.9 1.177-.9H20M21 12a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z"
                            />
                          </svg>
                          {movie.productionCountry}
                        </p>
                        <p className="movie-detail-item">
                          <svg
                            className="movie-detail-icon"
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
                              d="M7 9h5m3 0h2M7 12h2m3 0h5M5 5h14a1 1 0 0 1 1 1v9a1 1 0 0 1-1 1h-6.616a1 1 0 0 0-.67.257l-2.88 2.592A.5.5 0 0 1 8 18.477V17a1 1 0 0 0-1-1H5a1 1 0 0 1-1-1V6a1 1 0 0 1 1-1Z"
                            />
                          </svg>
                          {movie.language}
                        </p>
                      </div>
                      <div className="movie-description">
                        <div className="movie-description-1">
                          <svg
                            className="movie-description-icon"
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
                              d="M16 12h4m-2 2v-4M4 18v-1a3 3 0 0 1 3-3h4a3 3 0 0 1 3 3v1a1 1 0 0 1-1 1H5a1 1 0 0 1-1-1Zm8-10a3 3 0 1 1-6 0 3 3 0 0 1 6 0Z"
                            />
                          </svg>
                        </div>

                        <div className="movie-description-text">
                          {movie.description}
                        </div>
                      </div>
                      {movie.showtimes && movie.showtimes.length > 0 ? (
                        <div className="movie-schedules">
                          {Object.entries(
                            groupShowtimesByDate(movie.showtimes)
                          ).map(([date, showtimes]) => (
                            <div key={date} className="movie-schedule">
                              <h4 className="movie-schedule-date">{date}</h4>
                              <div className="movie-schedule-session">
                                <div className="movie-schedule-session-times">
                                  {showtimes.map((showtime) => (
                                    <span
                                      key={showtime.id}
                                      className="movie-schedule-session-time"
                                      onClick={() =>
                                        handleSelectShowtime(showtime)
                                      }
                                    >
                                      {showtime.showTime}
                                    </span>
                                  ))}
                                </div>
                              </div>
                            </div>
                          ))}
                        </div>
                      ) : (
                        <div className="no-showtimes">Chưa có lịch chiếu</div>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <div className="no-movies-message">Không có phim đang chiếu</div>
            )}
          </TabPane>
          <TabPane
            tab={
              <span
                style={{
                  color: activeTab === "sapChieu" ? "#f3ea28" : "white",
                }}
              >
                PHIM SẮP CHIẾU
              </span>
            }
            key="sapChieu"
          >
            <div className="tab-title">PHIM SẮP CHIẾU</div>
            {filteredMovies.length > 0 ? (
              <div className="movie-grid">
                {filteredMovies.map((movie) => (
                  <div key={movie.id} className="movie-card">
                    <div className="movie-poster">
                      <img
                        src={movie.posterUrl}
                        alt={movie.title}
                        className="movie-poster-img"
                      />
                    </div>
                    <div className="movie-info">
                      <h3 className="movie-title">{movie.title}</h3>
                      <div className="movie-details">
                        <p className="movie-detail-item">
                          <svg
                            className="movie-detail-icon"
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
                              d="M15.583 8.445h.01M10.86 19.71l-6.573-6.63a.993.993 0 0 1 0-1.4l7.329-7.394A.98.98 0 0 1 12.31 4l5.734.007A1.968 1.968 0 0 1 20 5.983v5.5a.992.992 0 0 1-.316.727l-7.44 7.5a.974.974 0 0 1-1.384.001Z"
                            />
                          </svg>
                          {movie.genres.map((genre) => genre.name).join(", ")}
                        </p>
                        <p className="movie-detail-item">
                          <svg
                            className="movie-detail-icon"
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
                              d="M12 8v4l3 3m6-3a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z"
                            />
                          </svg>
                          {movie.duration} phút
                        </p>
                        <p className="movie-detail-item">
                          <svg
                            className="movie-detail-icon"
                            aria-hidden="true"
                            xmlns="http://www.w3.org/2000/svg"
                            width="24"
                            height="24"
                            fill="none"
                            viewBox="0 0 24 24"
                          >
                            <path
                              stroke="currentColor"
                              strokeWidth="2"
                              d="M4.37 7.657c2.063.528 2.396 2.806 3.202 3.87 1.07 1.413 2.075 1.228 3.192 2.644 1.805 2.289 1.312 5.705 1.312 6.705M20 15h-1a4 4 0 0 0-4 4v1M8.587 3.992c0 .822.112 1.886 1.515 2.58 1.402.693 2.918.351 2.918 2.334 0 .276 0 2.008 1.972 2.008 2.026.031 2.026-1.678 2.026-2.008 0-.65.527-.9 1.177-.9H20M21 12a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z"
                            />
                          </svg>
                          {movie.productionCountry}
                        </p>
                        <p className="movie-detail-item">
                          <svg
                            className="movie-detail-icon"
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
                              d="M7 9h5m3 0h2M7 12h2m3 0h5M5 5h14a1 1 0 0 1 1 1v9a1 1 0 0 1-1 1h-6.616a1 1 0 0 0-.67.257l-2.88 2.592A.5.5 0 0 1 8 18.477V17a1 1 0 0 0-1-1H5a1 1 0 0 1-1-1V6a1 1 0 0 1 1-1Z"
                            />
                          </svg>
                          {movie.language}
                        </p>
                      </div>
                      <p className="movie-description">
                        <svg
                          className="movie-description-icon"
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
                            d="M16 12h4m-2 2v-4M4 18v-1a3 3 0 0 1 3-3h4a3 3 0 0 1 3 3v1a1 1 0 0 1-1 1H5a1 1 0 0 1-1-1Zm8-10a3 3 0 1 1-6 0 3 3 0 0 1 6 0Z"
                          />
                        </svg>
                        <p className="movie-description-text">
                          {movie.description}
                        </p>
                      </p>
                      {movie.showtimes && movie.showtimes.length > 0 ? (
                        <div className="movie-schedules">
                          {Object.entries(
                            groupShowtimesByDate(movie.showtimes)
                          ).map(([date, showtimes]) => (
                            <div key={date} className="movie-schedule">
                              <h4 className="movie-schedule-date">{date}</h4>
                              <div className="movie-schedule-session">
                                <div className="movie-schedule-session-times">
                                  {showtimes.map((showtime) => (
                                    <span
                                      key={showtime.id}
                                      className="movie-schedule-session-time"
                                      onClick={() =>
                                        handleSelectShowtime(showtime)
                                      }
                                    >
                                      {showtime.showTime}
                                    </span>
                                  ))}
                                </div>
                              </div>
                            </div>
                          ))}
                        </div>
                      ) : (
                        <div className="no-showtimes">Chưa có lịch chiếu</div>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <div className="no-movies-message">Không có phim sắp chiếu</div>
            )}
          </TabPane>
          <TabPane
            tab={
              <span
                style={{ color: activeTab === "dacBiet" ? "#f3ea28" : "white" }}
              >
                SUẤT CHIẾU ĐẶC BIỆT
              </span>
            }
            key="dacBiet"
          >
            <div>
              <div className="tab-title">SUẤT CHIẾU ĐẶC BIỆT</div>
              <img
                className="text-white1"
                src="https://skystarimages.s3.us-east-1.amazonaws.com/test/movie.PNG"
              />
              <div className="text-white">
                <h2>ĐANG CẬP NHẬT</h2>
              </div>
            </div>
          </TabPane>
          <TabPane
            tab={
              <span
                style={{ color: activeTab === "bangGia" ? "#f3ea28" : "white" }}
              >
                BẢNG GIÁ VÉ
              </span>
            }
            key="bangGia"
          >
            <div>
              <div className="tab-title">BẢNG GIÁ VÉ</div>
              <div className="bg-[#0c1a3b] p-4 rounded-lg text-white">
                {/* Bỏ phần Tabs và TabPane, chỉ giữ lại nội dung */}
                <img
                  src="https://skystarimages.s3.us-east-1.amazonaws.com/test/movie.PNG"
                  alt="anh1"
                  className="img1-1"
                />
              </div>
            </div>
          </TabPane>
        </Tabs>
      </div>
      <PromotionSection />
      <div
        className="map-container"
        style={{ width: "100%", height: "400px", margin: "20px 0" }}
      >
        <iframe
          src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3919.456681849812!2d106.68808741533416!3d10.776893962182761!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x31752f3f4c77d5b7%3A0xfab9b8db4d3a3d1a!2sCinestar%20Cinema%20Qu%E1%BB%91c%20Thanh!5e0!3m2!1sen!2s!4v1641234567890"
          width="100%"
          height="100%"
          style={{ border: 0 }}
          allowFullScreen={true}
          loading="lazy"
          referrerPolicy="no-referrer-when-downgrade"
          title="Cinema Location Map"
        ></iframe>
      </div>
    </div>
  );
};

export default BookTickets;
