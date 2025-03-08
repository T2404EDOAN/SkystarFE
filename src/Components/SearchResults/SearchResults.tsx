import React, { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import axios from "axios";
import TrailerModal from "../Trailer/TrailerModal";
import "./SearchResults.css";
import { Link } from "react-router-dom";
import PromotionSection from "../../Components/PromotionSection/PromotionSection";
import MembershipSection from "../../Components/MembershipSection/MembershipSection";
import EntertainmentSection from "../../Components/EntertainmentSection/EntertainmentSection";
import ContactForm from "../../Components/ContactForm/ContactForm";

interface Movie {
  id: number;
  title: string;
  originalTitle: string | null;
  trailerUrl: string;
  posterUrl: string;
  backdropUrl: string;
  duration: number;
  description: string;
  category: {
    id: number;
    name: string;
  };
  director: string;
  productionCompany: string;
  ageRating: string;
  language: string;
  subtitles: string;
  status: string;
  genres: {
    id: number;
    name: string;
  }[];
  showtimes: {
    id: number;
    theatresName: string;
    theaterAddress: string;
    showDate: string;
    showTime: string;
    roomName: string;
  }[];
}

const SearchResults: React.FC = () => {
  const location = useLocation();
  const [results, setResults] = useState<Movie[]>([]);
  const searchParams = new URLSearchParams(location.search);
  const movieTitle = searchParams.get("movieTitle");
  const cinemaName = searchParams.get("cinemaName");
  const [currentPage, setCurrentPage] = useState(0);
  const [trailerUrl, setTrailerUrl] = useState("");
  const [isAnimating, setIsAnimating] = useState(false);
  const moviesPerPage = 4;
  const totalPages = Math.ceil(results.length / moviesPerPage);

  const handleTrailerClick = (url: string) => {
    setTrailerUrl(url);
  };

  const closeTrailer = () => {
    setTrailerUrl("");
  };

  const handleNextPage = () => {
    if (currentPage < totalPages - 1) {
      setCurrentPage((prev) => prev + 1);
    }
  };

  const handlePrevPage = () => {
    if (currentPage > 0) {
      setCurrentPage((prev) => prev - 1);
    }
  };

  const handleDotClick = (index: number) => {
    setCurrentPage(index);
  };

  const handleTouchStart = (e: React.TouchEvent) => {
    // Add touch handling logic here if needed
  };

  const handleTouchMove = (e: React.TouchEvent) => {
    // Add touch handling logic here if needed
  };

  const handleTouchEnd = () => {
    // Add touch handling logic here if needed
  };

  useEffect(() => {
    const fetchResults = async () => {
      try {
        if (!movieTitle?.trim() && !cinemaName?.trim()) {
          setResults([]);
          return;
        }

        const params = {
          title: movieTitle?.trim(),
          cinema: cinemaName?.trim(),
        };

        console.log("Search params:", params);
        const response = await axios.get(
          "http://localhost:8081/api/movies/search",
          {
            params,
          }
        );

        const movies = response.data.content || response.data;
        const filteredMovies = movies.filter((movie) => {
          // Nếu có tên phim, tìm theo tên phim
          if (movieTitle) {
            return movie.title.toLowerCase().includes(movieTitle.toLowerCase());
          }

          // Nếu có tên rạp, tìm theo rạp
          if (cinemaName) {
            return movie.showtimes?.some(
              (showtime) =>
                showtime.theatresName
                  .toLowerCase()
                  .includes(cinemaName.toLowerCase()) ||
                showtime.theaterAddress
                  .toLowerCase()
                  .includes(cinemaName.toLowerCase())
            );
          }

          return false;
        });

        console.log("API Response:", response.data);
        console.log("Filtered movies:", filteredMovies);

        setResults(filteredMovies);
      } catch (error) {
        console.error("Error searching movies:", error);
        setResults([]);
      }
    };

    fetchResults();
  }, [movieTitle, cinemaName]);

  return (
    <div>
      <div className="nowplaying-container">
        {/* <Header isOverlayActive={!!trailerUrl} /> */}
        <h2
          className="nowplaying-title1"
          style={{ fontFamily: "Anton, sans-serif" }}
        >
          KẾT QUẢ TÌM KIẾM
        </h2>
        {trailerUrl && (
          <TrailerModal trailerUrl={trailerUrl} onClose={closeTrailer} />
        )}
        <div className="nowplaying-slider">
          <div
            className="nowplaying-wrapper"
            style={{
              transform: `translateX(-${currentPage * 100}%)`,
              willChange: "transform",
              touchAction: "pan-x",
            }}
            onTouchStart={handleTouchStart}
            onTouchMove={handleTouchMove}
            onTouchEnd={handleTouchEnd}
          >
            {results.map((movie, index) => (
              <div
                key={index}
                className="nowplaying-card"
                onClick={() =>
                  (window.location.href = `/movie-detail/${movie.id}`)
                }
              >
                <div className="cursor-pointer">
                  <div className="nowplaying-poster-container">
                    <img
                      src={movie.posterUrl || "/path/to/default-poster.jpg"}
                      alt={movie.title}
                      className="nowplaying-poster"
                    />
                    <div className="nowplaying-overlay">
                      <div className="nowplaying-info-container">
                        <Link to={`/movie-detail/${movie.id}`}>
                          <h3 className="nowplaying-info-title1 hover:text-white">
                            {movie.title}
                          </h3>
                        </Link>
                        <p className="nowplaying-info-genres">
                          <svg
                            className="nowplaying-info-icon"
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
                          </svg>{" "}
                          {movie.genres
                            ? movie.genres.map((genre) => genre.name).join(", ")
                            : "Chưa cập nhật thể loại"}
                        </p>
                        <p className="nowplaying-info-duration">
                          <svg
                            className="nowplaying-info-icon"
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
                        <p className="nowplaying-info-language">
                          <svg
                            className="nowplaying-info-icon"
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
                              strokeWidth="2"
                              d="M4.37 7.657c2.063.528 2.396 2.806 3.202 3.87 1.07 1.413 2.075 1.228 3.192 2.644 1.805 2.289 1.312 5.705 1.312 6.705M20 15h-1a4 4 0 0 0-4 4v1M8.587 3.992c0 .822.112 1.886 1.515 2.58 1.402.693 2.918.351 2.918 2.334 0 .276 0 2.008 1.972 2.008 2.026.031 2.026-1.678 2.026-2.008 0-.65.527-.9 1.177-.9H20M21 12a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z"
                            />
                          </svg>
                          {movie.language}
                        </p>
                        <p className="nowplaying-info-subtitles">
                          <svg
                            className="nowplaying-info-icon"
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
                          {movie.subtitles}
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="nowplaying-title-wrapper">
                  <Link to={`/movie-detail/${movie.id}`}>
                    <h3 className="nowplaying-info-title hover:text-orange-500 cursor-pointer">
                      {movie.title}
                    </h3>
                  </Link>
                </div>
                <div className="nowplaying-actions">
                  <div
                    className="nowplaying-trailer-button"
                    onClick={(e) => {
                      e.stopPropagation();
                      handleTrailerClick(movie.trailerUrl || "");
                    }}
                  >
                    <div className="nowplaying-trailer-icon-circle">
                      <img
                        src="https://cinestar.com.vn/assets/images/ic-play-circle-red.svg"
                        alt="Play Trailer"
                        width="23"
                        height="23"
                        className="mr-2"
                      />
                    </div>
                    <span style={{ marginLeft: "0.5rem", fontSize: "14px" }}>
                      Xem Trailer
                    </span>
                  </div>
                  <Link
                    to={`/movie-detail/${movie.id}`}
                    className="nowplaying-book-ticket-button"
                    onClick={(e) => e.stopPropagation()}
                  >
                    <span className="nowplaying-book-ticket-text">ĐẶT VÉ</span>
                    <div className="nowplaying-button-gradient" />
                  </Link>
                </div>
              </div>
            ))}
          </div>
        </div>
        <div className="nowplaying-navigation-container">
          <button
            onClick={handlePrevPage}
            disabled={currentPage === 0 || isAnimating}
            className={`nowplaying-navigation-button nowplaying-navigation-button-left ${
              currentPage === 0 || isAnimating ? "disabled" : ""
            }`}
          >
            <svg
              className="w-6 h-6 text-white"
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
          <button
            onClick={handleNextPage}
            disabled={
              (currentPage + 1) * moviesPerPage >= results.length || isAnimating
            }
            className={`nowplaying-navigation-button nowplaying-navigation-button-right ${
              (currentPage + 1) * moviesPerPage >= results.length || isAnimating
                ? "disabled"
                : ""
            }`}
          >
            <svg
              className="w-6 h-6 text-white"
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
        </div>
        <div className="nowplaying-pagination-dots">
          {Array.from({ length: totalPages }).map((_, index) => (
            <button
              key={index}
              onClick={() => handleDotClick(index)}
              className={`nowplaying-pagination-dot ${
                currentPage === index ? "active" : ""
              }`}
              aria-label={`Go to slide ${index + 1}`}
            />
          ))}
        </div>
      </div>
      <PromotionSection />
      <MembershipSection />
      <EntertainmentSection />
      <ContactForm />
    </div>
  );
};

export default SearchResults;
