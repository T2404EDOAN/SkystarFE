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
        "http://localhost:8081/api/movies/filter",
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

  const moviesNowShowing = [
    {
      id: 1,
      title: "Chị Dâu (T16)",
      duration: 100,
      genres: ["Drama", "Hài"],
      country: "Việt Nam",
      ageRating: "T16",
      description: "Phim dành cho khán giả từ đủ 16 tuổi trở lên (16+)",
      poster: "path/to/poster1.jpg",
      schedule: [
        {
          date: "Thứ Ba, 24/12/2024",
          sessions: {
            STANDARD: [
              "19:00",
              "19:30",
              "20:00",
              "20:30",
              "21:00",
              "21:30",
              "22:00",
              "22:30",
              "23:00",
              "23:30",
              "23:59",
            ],
            DELUXE: [],
          },
        },
      ],
    },
    {
      id: 2,
      title: "Chị Dâu (T16)",
      duration: 100,
      genres: ["Drama", "Hài"],
      country: "Việt Nam",
      ageRating: "T16",
      description: "Phim dành cho khán giả từ đủ 16 tuổi trở lên (16+)",
      poster: "path/to/poster1.jpg",
      schedule: [
        {
          date: "Thứ Ba, 24/12/2024",
          sessions: {
            STANDARD: [
              "19:00",
              "19:30",
              "20:00",
              "20:30",
              "21:00",
              "21:30",
              "22:00",
              "22:30",
              "23:00",
              "23:30",
              "23:59",
            ],
            DELUXE: [],
          },
        },
      ],
    },
    {
      id: 3,
      title: "Chị Dâu (T16)",
      duration: 100,
      genres: ["Drama", "Hài"],
      country: "Việt Nam",
      ageRating: "T16",
      description: "Phim dành cho khán giả từ đủ 16 tuổi trở lên (16+)",
      poster: "path/to/poster1.jpg",
      schedule: [
        {
          date: "Thứ Ba, 27/12/2024",
          sessions: {
            STANDARD: [
              "19:00",
              "19:30",
              "20:00",
              "20:30",
              "21:00",
              "21:30",
              "22:00",
              "22:30",
              "23:00",
              "23:30",
              "23:59",
            ],
            DELUXE: [],
          },
        },
        {
          date: "Thứ Ba, 2/12/2024",
          sessions: {
            STANDARD: [
              "19:00",
              "19:30",
              "20:00",
              "20:30",
              "21:00",
              "21:30",
              "22:00",
              "22:30",
              "23:00",
              "23:30",
              "23:59",
              "19:00",
              "19:30",
              "20:00",
              "20:30",
              "21:00",
              "21:30",
              "22:00",
              "22:30",
              "23:00",
              "23:30",
              "23:59",
            ],
            DELUXE: [],
          },
        },
      ],
    },
  ];

  const moviesComingSoon = [
    {
      id: 4,
      title: "Phim Sắp Chiếu 1",
      duration: 120,
      genres: ["Action", "Adventure"],
      country: "USA",
      ageRating: "PG-13",
      description: "Phim dành cho khán giả từ đủ 13 tuổi trở lên (PG-13)",
      poster: "path/to/poster2.jpg",
      schedule: [],
    },
    {
      id: 5,
      title: "Phim Sắp Chiếu 2",
      duration: 90,
      genres: ["Comedy", "Family"],
      country: "USA",
      ageRating: "G",
      description: "Phim dành cho mọi lứa tuổi (G)",
      poster: "path/to/poster3.jpg",
      schedule: [],
    },
    {
      id: 6,
      title: "Phim Sắp Chiếu 3",
      duration: 110,
      genres: ["Horror", "Thriller"],
      country: "Canada",
      ageRating: "R",
      description: "Phim dành cho khán giả từ đủ 18 tuổi trở lên (R)",
      poster: "path/to/poster4.jpg",
      schedule: [],
    },
  ];
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

      {/* Tab navigation */}
      <Tabs
        activeKey={activeTab}
        onChange={(key) => setActiveTab(key)}
        className="mb-3"
      >
        <TabPane tab="PHIM ĐANG CHIẾU" key="dangChieu">
          <div className="tab-title">PHIM ĐANG CHIẾU</div>
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
                                  onClick={() => handleSelectShowtime(showtime)}
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
        </TabPane>
        <TabPane tab="PHIM SẮP CHIẾU" key="sapChieu">
          <div className="tab-title">PHIM SẮP CHIẾU</div>
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
                                  onClick={() => handleSelectShowtime(showtime)}
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
        </TabPane>
        <TabPane tab="SUẤT CHIẾU ĐẶC BIỆT" key="dacBiet">
          <div>
            <img className="text-white" src="/a" />
          </div>
        </TabPane>
        <TabPane tab="BẢNG GIÁ VÉ" key="bangGia">
          <div>Nội dung Bảng Giá Vé</div>
        </TabPane>
      </Tabs>
    </div>
  );
};

export default BookTickets;
