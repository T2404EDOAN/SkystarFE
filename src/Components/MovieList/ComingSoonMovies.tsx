import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import Header from "../Header/Header";
import TrailerModal from "../Trailer/TrailerModal";
import axios from "axios";
import "./NowPlayingMovies.css";

const ComingSoonMovies: React.FC = () => {
  interface Movie {
    id: number;
    title: string;
    originalTitle: string;
    trailerUrl: string | null;
    posterUrl: string | null;
    duration: number;
    description: string | null;
    shortDescription: string | null;
    categoryId: number | null;
    categoryName: string | null;
    director: string | null;
    cast: string | null;
    productionCompany: string | null;
    productionCountry: string | null;
    releaseDate: string | null;
    endDate: string | null;
    ageRating: string | null;
    language: string | null;
    subtitles: string | null;
    rating: number;
    ratingCount: number | null;
    status: string;
    genres: Array<{ id: number; name: string }>; // Update this line
  }

  const [movies, setMovies] = useState<Movie[]>([]);
  const [currentPage, setCurrentPage] = useState(0);
  const moviesPerPage = 4;
  const [trailerUrl, setTrailerUrl] = useState<string | null>(null);
  const [isMobile, setIsMobile] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [moviesPerRow, setMoviesPerRow] = useState(4);
  const [isAnimating, setIsAnimating] = useState(false);
  const [touchStart, setTouchStart] = useState(0);
  const [touchEnd, setTouchEnd] = useState(0);

  // Minimum swipe distance required (in px)
  const minSwipeDistance = 50;

  const handleTouchStart = (e: React.TouchEvent) => {
    setTouchStart(e.touches[0].clientX);
  };

  const handleTouchMove = (e: React.TouchEvent) => {
    setTouchEnd(e.touches[0].clientX);
  };

  const handleTouchEnd = () => {
    const swipeDistance = touchStart - touchEnd;

    if (Math.abs(swipeDistance) > 50) {
      // Minimum swipe distance threshold
      if (swipeDistance > 0 && currentPage < totalPages - 1) {
        // Swiped left
        handleNextPage();
      } else if (swipeDistance < 0 && currentPage > 0) {
        // Swiped right
        handlePrevPage();
      }
    }
  };

  const handleTrailerClick = (url: string) => {
    setTrailerUrl(url);
  };

  const closeTrailer = () => {
    setTrailerUrl(null);
  };

  const handleClickOutside = (event: React.MouseEvent<HTMLDivElement>) => {
    if (event.target === event.currentTarget) {
      closeTrailer();
    }
  };

  useEffect(() => {
    const fetchMovies = async () => {
      try {
        setIsLoading(true);
        setError(null);
        const response = await axios.get("http://localhost:8080/api/movies", {
          headers: {
            Accept: "application/json",
            "Content-Type": "application/json",
          },
        });

        const moviesData = Array.isArray(response.data)
          ? response.data
          : response.data.content || [];

        const upcomingMovies = moviesData
          .filter((movie: Movie) => movie && movie.status === "Sắp chiếu")
          .map((movie: Movie) => ({
            ...movie,
            trailerUrl: movie.trailerUrl || null,
          }));

        setMovies(upcomingMovies);
      } catch (err) {
        if (axios.isAxiosError(err)) {
          setError(
            err.response?.data?.message ||
              "Không thể kết nối đến máy chủ. Vui lòng thử lại sau."
          );
        } else {
          setError("Đã xảy ra lỗi. Vui lòng thử lại sau.");
        }
      } finally {
        setIsLoading(false);
      }
    };

    fetchMovies();
  }, []);

  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth <= 768);
      if (window.innerWidth < 640) {
        // sm
        setMoviesPerRow(1);
      } else if (window.innerWidth < 768) {
        // md
        setMoviesPerRow(2);
      } else if (window.innerWidth < 1024) {
        // lg
        setMoviesPerRow(3);
      } else {
        setMoviesPerRow(4);
      }
    };

    handleResize();
    window.addEventListener("resize", handleResize);

    return () => window.removeEventListener("resize", handleResize);
  }, []);

  useEffect(() => {
    setCurrentPage(0); // Reset to first page when layout changes
  }, [moviesPerRow]);

  const handleNextPage = () => {
    const nextPage = currentPage + 1;
    const maxPage = Math.ceil(movies.length / moviesPerPage) - 1;
    if (nextPage <= maxPage && !isAnimating) {
      setIsAnimating(true);
      setCurrentPage(nextPage);
      setTimeout(() => setIsAnimating(false), 500);
    }
  };

  const handlePrevPage = () => {
    if (currentPage > 0 && !isAnimating) {
      setIsAnimating(true);
      setCurrentPage(currentPage - 1);
      setTimeout(() => setIsAnimating(false), 500);
    }
  };

  const displayedMovies = movies.slice(
    currentPage * moviesPerPage,
    (currentPage + 1) * moviesPerPage
  );

  const totalPages = Math.ceil(movies.length / moviesPerPage);

  const handleDotClick = (index: number) => {
    setCurrentPage(index);
  };

  if (isLoading) {
    return (
      <div className="nowplaying-loading-spinner">
        <div className="nowplaying-loading-spinner-inner"></div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="nowplaying-error-container">
        <svg
          className="nowplaying-error-icon"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z"
          />
        </svg>
        <p className="nowplaying-error-message">{error}</p>
        <button
          onClick={() => window.location.reload()}
          className="nowplaying-retry-button"
        >
          Thử lại
        </button>
      </div>
    );
  }

  return (
    <div className="nowplaying-container">
      <Header isOverlayActive={!!trailerUrl} />
      <h2
        className="nowplaying-title1"
        style={{ fontFamily: "Anton, sans-serif" }}
      >
        PHIM ĐANG CHIẾU
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
          {movies.map((movie, index) => (
            <div key={index} className="nowplaying-card">
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
                        <h3 className="nowplaying-info-title hover:text-orange-500">
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
                  onClick={() => handleTrailerClick(movie.trailerUrl || "")}
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="24"
                    height="24"
                    fill="#FFA500" // Changed to orange color
                    className="bi bi-play-circle dark:text-white mr-2"
                    viewBox="0 0 16 16"
                  >
                    <path d="M8 15A7 7 0 1 1 8 1a7 7 0 0 1 0 14m0 1A8 8 0 1 0 8 0a8 8 0 0 0 0 16" />
                    <path d="M6.271 5.055a.5.5 0 0 1 .52.038l3.5 2.5a.5.5 0 0 1 0 .814l-3.5 2.5A.5.5 0 0 1 6 10.5v-5a.5.5 0 0 1 .271-.445" />
                  </svg>
                  <span style={{ marginLeft: "0.5rem", fontSize: "14px" }}>
                    Xem Trailer
                  </span>
                </div>
                <Link
                  to={`/movie-detail/${movie.id}`}
                  className="nowplaying-book-ticket-button"
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
            (currentPage + 1) * moviesPerPage >= movies.length || isAnimating
          }
          className={`nowplaying-navigation-button nowplaying-navigation-button-right ${
            (currentPage + 1) * moviesPerPage >= movies.length || isAnimating
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
      <button className="nowplaying-see-more-button">
        <span className="nowplaying-see-more-text">
          <Link to="/movie/showing" className="nowplaying-see-more-link">
            XEM THÊM
          </Link>
        </span>
        <div className="nowplaying-see-more-gradient" />
      </button>
    </div>
  );
};

export default ComingSoonMovies;
