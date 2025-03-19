import React, { useState, useEffect, useRef } from "react"; // Add useRef import
import { useParams } from "react-router-dom";
import axios from "axios";
import "./MovieDetail.css";
import TrailerModal from "../Trailer/TrailerModal";
import PaymentTicketForm from "../PaymentForm/PaymentTicketForm";
import { createPortal } from "react-dom";
import PopcornDrink from "../PopcornDrink/PopcornDrink"; // Add this import

const MovieDetail = () => {
  const { movieId } = useParams();
  const [movieData, setMovieData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [selectedDate, setSelectedDate] = useState("");
  const [selectedTime, setSelectedTime] = useState("");
  const [selectedCinema, setSelectedCinema] = useState(null);
  const [selectedSeats, setSelectedSeats] = useState([]);
  const [currentSeatMap, setCurrentSeatMap] = useState(null);
  const [groupedShowtimes, setGroupedShowtimes] = useState({});
  const [availableSeats, setAvailableSeats] = useState([]);
  const [selectedShowtimeId, setSelectedShowtimeId] = useState(null);
  const [showTrailer, setShowTrailer] = useState(false);
  const [showPayment, setShowPayment] = useState(false);
  const [ticketPrices, setTicketPrices] = useState({
    standard: 75000,
    vip: 90000,
  });
  const seatsRef = useRef(null); // Add this line after other state declarations
  const [selectedProducts, setSelectedProducts] = useState([]);

  const handleProductSelectionChange = (products) => {
    setSelectedProducts(products);
  };

  const getNext5Days = (showtimes) => {
    if (!showtimes || showtimes.length === 0) return [];

    const uniqueDates = [...new Set(showtimes.map((show) => show.showDate))];
    return uniqueDates
      .sort()
      .slice(0, 5)
      .map((date) => ({
        date,
        formattedDate: new Date(date).toLocaleDateString("vi-VN", {
          day: "2-digit",
          month: "2-digit",
        }), // Show only day and month
        weekday: new Date(date).toLocaleDateString("vi-VN", {
          weekday: "long",
        }), // Show full weekday name
      }));
  };

  // Group showtimes by date and theater
  const groupShowtimesByDate = (showtimes) => {
    const grouped = {};
    if (!showtimes) return {};

    showtimes.forEach((showtime) => {
      if (!grouped[showtime.showDate]) {
        grouped[showtime.showDate] = {};
      }

      if (!grouped[showtime.showDate][showtime.theatresName]) {
        grouped[showtime.showDate][showtime.theatresName] = {
          name: showtime.theatresName,
          address: showtime.theaterAddress,
          showtimes: [],
        };
      }

      // Add showtime and sort by time
      grouped[showtime.showDate][showtime.theatresName].showtimes.push({
        id: showtime.id,
        time: showtime.showTime.slice(0, 5),
        endTime: showtime.endTime.slice(0, 5),
        roomId: showtime.roomId,
        roomName: showtime.roomName,
      });

      // Sort showtimes by time
      grouped[showtime.showDate][showtime.theatresName].showtimes.sort((a, b) =>
        a.time.localeCompare(b.time)
      );
    });

    return grouped;
  };

  useEffect(() => {
    const fetchMovieDetail = async () => {
      const apiUrl = `http://54.83.174.210:8085/api/movies/${movieId}`;
      console.log('Fetching from URL:', apiUrl);
      
      try {
        const response = await axios.get(apiUrl);
        console.log('API Response:', response.data);
        
        if (response.data) {
          setMovieData(response.data);
          const grouped = groupShowtimesByDate(response.data.showtimes);
          setGroupedShowtimes(grouped);

          const availableDates = getNext5Days(response.data.showtimes);
          if (availableDates.length > 0) {
            setSelectedDate(availableDates[0].date);
          }
        }
        setLoading(false);
      } catch (error) {
        console.error("Error fetching movie details:", {
          message: error.message,
          response: error.response,
          url: apiUrl
        });
        setLoading(false);
        alert(`Không thể tải thông tin phim. Lỗi: ${error.message}`);
      }
    };

    if (movieId) {
      fetchMovieDetail();
    }
  }, [movieId]);

  const fetchSeats = async (showtimeId) => {
    try {
      const response = await axios.get(
        `http://54.83.174.210:8085/api/showtimes/${showtimeId}/seats`
      );
      setAvailableSeats(response.data.content);
    } catch (error) {
      console.error("Error fetching seats:", error);
    }
  };

  const handleTimeSelection = async (cinema, time, showtimeId) => {
    console.log("Selected Showtime ID:", showtimeId);
    setSelectedTime(time);
    setSelectedCinema(cinema);
    setSelectedSeats([]);
    setSelectedShowtimeId(showtimeId);

    await fetchSeats(showtimeId);

    setTimeout(() => {
      seatsRef.current?.scrollIntoView({
        behavior: "smooth",
        block: "start",
      });
    }, 300);

    const movieInfo = {
      title: movieData.title,
      roomName: cinema.showtimes.find(s => s.time === time)?.roomName,
      cinemaName: cinema.name,
      cinemaAddress: cinema.address,
      showTime: `${time} - ${selectedDate}`,
      selectedSeats: [],
      showtimeId: showtimeId,
      posterUrl: movieData.posterUrl,
      backdropUrl: movieData.backdropUrl,
      selectedProducts: [], // Add this to store products
    };

    // Store in localStorage
    localStorage.setItem("currentBooking", JSON.stringify({
      bookingId: null, // Will be updated after booking creation
      amount: 0, // Will be updated with actual amount
      movieInfo: movieInfo
    }));
  };

  const handleTrailerClick = () => {
    setShowTrailer(true);
  };

  const handleCloseTrailer = () => {
    setShowTrailer(false);
  };

  const handleSeatClick = async (seat) => {
    if (selectedSeats.some((s) => s.seatNumber === seat.seatNumber)) {
      console.log("Removing seat:", seat);
      setSelectedSeats((prev) =>
        prev.filter((s) => s.seatNumber !== seat.seatNumber)
      );
      if (selectedSeats.length <= 1) {
        setShowPayment(false);
      }
      return;
    }

    try {
      if (selectedShowtimeId) {
        const url = `http://54.83.174.210:8085/api/seats/${selectedShowtimeId}/hold`;
        const requestData = {
          seatId: seat.id,
        };

        const response = await axios.post(url, requestData);
        console.log("API Response:", response.data);

        if (response.status === 200) {
          const expireAt = Date.now() + 5 * 60 * 1000; // 5 minutes from now

          setSelectedSeats((prev) => {
            const newSeats = [
              ...prev,
              {
                seatNumber: seat.seatNumber,
                id: seat.id,
                type: seat.seatType,
                price: seat.price,
                holdExpiration: new Date(expireAt),
              },
            ];
            setShowPayment(newSeats.length > 0);
            return newSeats;
          });

          // Update localStorage with expiration time
          const currentBooking = JSON.parse(localStorage.getItem("currentBooking") || "{}");
          localStorage.setItem("currentBooking", JSON.stringify({
            ...currentBooking,
            expireAt
          }));
        }
      }
    } catch (error) {
      console.error("Error details:", {
        message: error.message,
        response: error.response?.data,
        status: error.response?.status,
      });
      alert("Có lỗi xảy ra khi đặt ghế. Vui lòng thử lại.");
    }
  };

  const seatTypes = [
    { type: "standard", label: "Ghế thường - 75.000đ" },
    { type: "couple", label: "Ghế đôi - 150.000đ" },
    { type: "selected", label: "Ghế đang chọn" },
    { type: "booked", label: "Ghế đã đặt" },
  ];

  const getSeatMap = (cinemaId, showtime) => {
    const baseSeats = Array(16)
      .fill(null)
      .map((_, i) => ({
        number: `${String(i + 1).padStart(2, "0")}`,
        status: "available",
      }));

    const morning = {
      rows: [
        { id: "A", seats: baseSeats },
        {
          id: "B",
          seats: baseSeats.map((seat) => ({
            ...seat,
            status: Math.random() > 0.7 ? "booked" : "available",
          })),
        },
      ],
    };

    const afternoon = {
      rows: [
        {
          id: "A",
          seats: baseSeats.map((seat) => ({
            ...seat,
            status: Math.random() > 0.5 ? "booked" : "available",
          })),
        },
        {
          id: "B",
          seats: baseSeats.map((seat) => ({
            ...seat,
            status: Math.random() > 0.6 ? "booked" : "available",
          })),
        },
      ],
    };

    return parseInt(showtime) < 12 ? morning : afternoon;
  };

  const groupSeatsByRow = (seats) => {
    const grouped = seats.reduce((acc, seat) => {
      // Separate couple seats into their own row
      if (seat.seatType === "COUPLE") {
        if (!acc["COUPLE"]) {
          acc["COUPLE"] = [];
        }
        acc["COUPLE"].push(seat);
      } else {
        const row = seat.seatNumber.charAt(0);
        if (!acc[row]) {
          acc[row] = [];
        }
        acc[row].push(seat);
      }
      return acc;
    }, {});

    // Move COUPLE row to the end
    if (grouped["COUPLE"]) {
      const coupleSeats = grouped["COUPLE"];
      delete grouped["COUPLE"];
      grouped["COUPLE"] = coupleSeats;
    }

    return grouped;
  };

  const renderSeat = (seat) => {
    const isCouple = seat.seatType === "COUPLE";
    const isDisabled = seat.status === "SOLD" || seat.status === "RESERVED";
    return (
      <button
        key={seat.id}
        className={`seat 
          ${isDisabled ? "booked" : "available"} 
          ${
            selectedSeats.some((s) => s.seatNumber === seat.seatNumber)
              ? "selected"
              : ""
          }
          ${isCouple ? "couple-seat" : ""}`}
        disabled={isDisabled}
        onClick={() => handleSeatClick(seat)}
      >
        {seat.seatNumber}
      </button>
    );
  };

  const calculateTotalPrice = () => {
    return selectedSeats.reduce((total, seat) => {
      // VIP seats are typically rows A-C
      const isVIP = ["A", "B", "C"].includes(seat.seatNumber.charAt(0));
      return total + (isVIP ? ticketPrices.vip : ticketPrices.standard);
    }, 0);
  };

  // Add this helper function to check if showtime is past
  const isShowtimePast = (showDate: string, showTime: string) => {
    const now = new Date();
    const [hours, minutes] = showTime.split(':').map(Number);
    const showDateTime = new Date(showDate);
    showDateTime.setHours(hours, minutes, 0);
    return now > showDateTime;
  };

  if (loading) return <div>Loading...</div>;
  if (!movieData) return <div>Movie not found</div>;

  const availableDates = getNext5Days(movieData.showtimes);

  return (
    <>
      <div className="movie-detail-container">
        {showTrailer && movieData.trailerUrl && (
          <TrailerModal
            trailerUrl={movieData.trailerUrl}
            onClose={handleCloseTrailer}
          />
        )}

        <div className="movie-detail-header">
          <img
            src={movieData.posterUrl}
            alt={movieData.title}
            className="movie-detail-poster"
          />
          <div className="movie-detail-info">
            <div>
              <h1 className="movie-detail-title">{movieData.title}</h1>
              <ul className="movie-detail-info-list">
                <li className="movie-detail-info-item">
                  <img
                    src="https://cinestar.com.vn/assets/images/icon-tag.svg"
                    alt="Age Restriction"
                    className="movie-detail-info-icon"
                  />
           
                </li>
                <li className="movie-detail-info-item">
                  <img
                    src="https://cinestar.com.vn/assets/images/icon-clock.svg"
                    alt="Duration"
                    className="movie-detail-info-icon"
                  />
                  {movieData.duration} phút
                </li>
                <li className="movie-detail-info-item">
                  <svg
                    className="movie-detail-info-icon movie-detail-yellow-icon"
                    aria-hidden="true"
                    xmlns="http://www.w3.org/2000/svg"
                    width="24"
                    height="24"
                    fill="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      fillRule="evenodd"
                      d="M8.64 4.737A7.97 7.97 0 0 1 12 4a7.997 7.997 0 0 1 6.933 4.006h-.738c-.65 0-1.177.25-1.177.9 0 .33 0 2.04-2.026 2.008-1.972 0-1.972-1.732-1.972-2.008 0-1.429-.787-1.65-1.752-1.923-.374-.105-.774-.218-1.166-.411-1.004-.497-1.347-1.183-1.461-1.835ZM6 4a10.06 10.06 0 0 0-2.812 3.27A9.956 9.956 0 0 0 2 12c0 5.289 4.106 9.619 9.304 9.976l.054.004a10.12 10.12 0 0 0 1.155.007h.002a10.024 10.024 0 0 0 1.5-.19 9.925 9.925 0 0 0 2.259-.754 10.041 10.041 0 0 0 4.987-5.263A9.917 9.917 0 0 0 22 12a10.025 10.025 0 0 0-.315-2.5A10.001 10.001 0 0 0 12 2a9.964 9.964 0 0 0-6 2Zm13.372 11.113a2.575 2.575 0 0 0-.75-.112h-.217A3.405 3.405 0 0 0 15 18.405v1.014a8.027 8.027 0 0 0 4.372-4.307ZM12.114 20H12A8 8 0 0 1 5.1 7.95c.95.541 1.421 1.537 1.835 2.415.209.441.403.853.637 1.162.54.712 1.063 1.019 1.591 1.328.52.305 1.047.613 1.6 1.316 1.44 1.825 1.419 4.366 1.35 5.828Z"
                      clipRule="evenodd"
                    />
                  </svg>
                  {movieData.productionCountry}
                </li>
                <li className="movie-detail-info-item">
                  <svg
                    className="movie-detail-info-icon movie-detail-yellow-icon"
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
                  {movieData.language}
                </li>
                <li className="movie-detail-info-item">
                  <svg
                    className="movie-detail-info-icon movie-detail-yellow-icon"
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
                  {movieData.ageRating}
                </li>
              </ul>
            </div>
            <div>
              <h3 className="movie-detail-section-title1">Mô Tả</h3>
              <p>
                Đạo diễn: {movieData.director}
                <br />
                Diễn viên: {movieData.cast}
                <br />
                Khởi chiếu ngày : {movieData.releaseDate}
              </p>
            </div>
            <div>
              <h3 className="movie-detail-section-title1">Nội Dung Phim</h3>
              <p>{movieData.description}</p>
            </div>
            <div
              className="movie-detail-trailer-button"
              onClick={handleTrailerClick}
            >
              <div className="trailer-icon-circle">
                <img
                  src="https://cinestar.com.vn/assets/images/ic-play-circle-red.svg"
                  alt="Play Trailer"
                  width="40"
                  height="40"
                  className="mr-2"
                />
              </div>
              <span className="movie-detail-trailer-text">Xem Trailer</span>
            </div>
          </div>
        </div>

        <div className="movie-detail-showtimes-section">
          {movieData.showtimes && movieData.showtimes.length > 0 && (
            <h2 className="movie-detail-section-title">Lịch Chiếu</h2>
          )}

          {!movieData.showtimes || movieData.showtimes.length === 0 ? (
            <div className="movie-detail-no-showtimes">
              <p>Không có lịch chiếu</p>
            </div>
          ) : (
            <>
              <div className="movie-detail-dates-container">
                {availableDates.map((dateInfo) => (
                  <div
                    key={dateInfo.date}
                    className={`movie-detail-date-box ${
                      selectedDate === dateInfo.date ? "active" : ""
                    }`}
                    onClick={() => setSelectedDate(dateInfo.date)}
                  >
                    <span className="movie-detail-date">
                      {dateInfo.formattedDate}
                    </span>
                    <span className="movie-detail-weekday">
                      {dateInfo.weekday}
                    </span>
                  </div>
                ))}
              </div>

              <h2 className="movie-detail-cinema-list-title">DANH SÁCH RẠP</h2>
              <div className="movie-detail-cinemas-list">
                {selectedDate &&
                  groupedShowtimes[selectedDate] &&
                  Object.values(groupedShowtimes[selectedDate]).map(
                    (cinema: any) => (
                      <div
                        key={cinema.name}
                        className="movie-detail-cinema-item"
                      >
                        <div className="movie-detail-cinema-info">
                          <h3 className="movie-detail-cinema-name">
                            {cinema.name}
                          </h3>
                          <div className="movie-detail-cinema-address">
                            {cinema.address}
                          </div>
                        </div>
                        <div className="movie-detail-showtime-buttons">
                          {cinema.showtimes.map((show, index) => {
                            const isPast = isShowtimePast(selectedDate, show.time);
                            return (
                              <button
                                key={index}
                                className={`movie-detail-time-btn ${
                                  selectedTime === show.time &&
                                  selectedCinema?.name === cinema.name
                                    ? "selected"
                                    : ""
                                } ${isPast ? "disabled" : ""}`}
                                onClick={() =>
                                  !isPast && handleTimeSelection(cinema, show.time, show.id)
                                }
                                disabled={isPast}
                              >
                                <span className="movie-detail-time">{show.time}</span>
                              </button>
                            );
                          })}
                        </div>
                      </div>
                    )
                  )}
              </div>
            </>
          )}
        </div>

        {selectedTime && availableSeats.length > 0 && (
          <>
            <div className="movie-detail-seats-section" ref={seatsRef}>
              <h2 className="movie-detail-cinema-list-title text-center">
                CHỌN GHẾ -{" "}
                {selectedCinema?.showtimes
                  .find((s) => s.time === selectedTime)
                  ?.roomName.toUpperCase()}
              </h2>

              <div className="movie-detail-screen-container">
                <div className="movie-detail-screen-wrapper">
                  <img
                    src="https://cinestar.com.vn/assets/images/img-screen.png"
                    alt="Màn hình"
                    className="movie-detail-screen-img"
                  />
                  <div className="movie-detail-screen-text">Màn hình</div>
                </div>
              </div>

              <div className="movie-detail-seat-map">
                {Object.entries(groupSeatsByRow(availableSeats))
                  .sort(([rowA], [rowB]) => {
                    if (rowA === "COUPLE") return 1;
                    if (rowB === "COUPLE") return -1;
                    return rowA.localeCompare(rowB);
                  })
                  .map(([row, seats]) => (
                    <div key={row} className="movie-detail-seat-row">
                      <div className="movie-detail-row-label">
                        {row === "COUPLE" ? "Đôi" : row}
                      </div>
                      {seats
                        .sort((a, b) => {
                          const numA = parseInt(a.seatNumber.slice(1));
                          const numB = parseInt(b.seatNumber.slice(1));
                          return numA - numB;
                        })
                        .map(renderSeat)}
                    </div>
                  ))}
              </div>

              <div className="movie-detail-seat-types">
                {seatTypes.map((type) => (
                  <div key={type.type} className="movie-detail-seat-type">
                    <div
                      className={`movie-detail-seat-example ${type.type}`}
                    ></div>
                    <span className="movie-detail-seat-label">
                      {type.label}
                    </span>
                  </div>
                ))}
              </div>
            </div>

            <PopcornDrink onSelectionChange={handleProductSelectionChange} />
          </>
        )}
      </div>

      {showPayment &&
        createPortal(
          <PaymentTicketForm
            title={movieData.title}
            roomName={
              selectedCinema?.showtimes.find((s) => s.time === selectedTime)
                ?.roomName || ""
            }
            cinemaName={selectedCinema?.name || ""}
            cinemaAddress={selectedCinema?.address || ""}
            showTime={`${selectedTime} - ${selectedDate}`}
            selectedSeats={selectedSeats}
            showtimeId={selectedShowtimeId}
            totalPrice={calculateTotalPrice()}
            selectedProducts={selectedProducts}
            backdropUrl={movieData.backdropUrl || movieData.posterUrl}
            onConfirm={(movieInfo) => {
              console.log("Payment confirmed:", {
                ...movieInfo,
                showtimeId: selectedShowtimeId,
                products: selectedProducts,
              });
            }}
          />,
          document.body
        )}
    </>
  );
};

export default MovieDetail;