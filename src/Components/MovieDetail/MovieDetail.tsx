import React, { useState, useEffect, useRef } from "react";  // Add useRef import
import { useParams } from "react-router-dom";
import axios from "axios";
import './MovieDetail.css';
import TrailerModal from '../Trailer/TrailerModal';
import PaymentTicketForm from '../PaymentForm/PaymentTicketForm';
import { createPortal } from 'react-dom';

const MovieDetail = () => {
  const { movieId } = useParams();
  const [movieData, setMovieData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [selectedDate, setSelectedDate] = useState('');
  const [selectedTime, setSelectedTime] = useState('');
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
    vip: 90000
  });
  const seatsRef = useRef(null);  // Add this line after other state declarations

  // Get next 5 days from today
  const getNext5Days = (showtimes) => {
    if (!showtimes || showtimes.length === 0) return [];
    
    const uniqueDates = [...new Set(showtimes.map(show => show.showDate))];
    return uniqueDates
      .sort()
      .slice(0, 5)
      .map(date => ({
        date,
        formattedDate: new Date(date).toLocaleDateString('vi-VN'),
        weekday: new Date(date).toLocaleDateString('vi-VN', { weekday: 'short' })
      }));
  };

  // Group showtimes by date and theater
  const groupShowtimesByDate = (showtimes) => {
    const grouped = {};
    if (!showtimes) return {};

    showtimes.forEach(showtime => {
      if (!grouped[showtime.showDate]) {
        grouped[showtime.showDate] = {};
      }
      
      if (!grouped[showtime.showDate][showtime.theatresName]) {
        grouped[showtime.showDate][showtime.theatresName] = {
          name: showtime.theatresName,
          address: showtime.theaterAddress,
          showtimes: []
        };
      }

      // Add showtime and sort by time
      grouped[showtime.showDate][showtime.theatresName].showtimes.push({
        id: showtime.id,
        time: showtime.showTime.slice(0, 5),
        endTime: showtime.endTime.slice(0, 5),
        roomId: showtime.roomId,
        roomName: showtime.roomName
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
      try {
        const response = await axios.get(`http://35.175.173.235:8080/api/movies/${movieId}`);
        setMovieData(response.data);
        const grouped = groupShowtimesByDate(response.data.showtimes);
        setGroupedShowtimes(grouped);
        
        // Set initial selected date to first available date
        const availableDates = getNext5Days(response.data.showtimes);
        if (availableDates.length > 0) {
          setSelectedDate(availableDates[0].date);
        }
        console.ư
        setLoading(false);
      } catch (error) {
        console.error('Error fetching movie details:', error);
        setLoading(false);
      }
    };

    if (movieId) {
      fetchMovieDetail();
    }
  }, [movieId]);

  const fetchSeats = async (showtimeId) => {
    try {
      const response = await axios.get(`http://35.175.173.235:8080/api/showtimes/${showtimeId}/seats`);
      setAvailableSeats(response.data.content);
    } catch (error) {
      console.error('Error fetching seats:', error);
    }
  };

  const handleTimeSelection = async (cinema, time, showtimeId) => {
    console.log('Selected Showtime ID:', showtimeId); // Debug log
    setSelectedTime(time);
    setSelectedCinema(cinema);
    setSelectedSeats([]);
    setSelectedShowtimeId(showtimeId);
    
    // Fetch seats first
    await fetchSeats(showtimeId);
    
    // Scroll after a longer delay to ensure content is rendered
    setTimeout(() => {
      seatsRef.current?.scrollIntoView({ 
        behavior: 'smooth',
        block: 'start'
      });
    }, 300); // Increased delay to 300ms
  };

  const handleTrailerClick = () => {
    setShowTrailer(true);
  };

  const handleCloseTrailer = () => {
    setShowTrailer(false);
  };

  const handleSeatClick = async (seat) => {
    if (selectedSeats.includes(seat.seatNumber)) {
      setSelectedSeats(prev => prev.filter(s => s.seatNumber !== seat.seatNumber));
      if (selectedSeats.length <= 1) {
        setShowPayment(false);
      }
      return;
    }

    try {
      if (selectedShowtimeId) {
        // Store both seat number and ID
        setSelectedSeats(prev => {
          const newSeats = [...prev, {
            seatNumber: seat.seatNumber,
            id: seat.id,
            type: seat.seatType,
            price: seat.price
          }];
          setShowPayment(newSeats.length > 0);
          return newSeats;
        });
      }
    } catch (error) {
      console.error('Error in handleSeatClick:', error);
      alert('Có lỗi xảy ra khi đặt ghế. Vui lòng thử lại.');
    }
  };

  const seatTypes = [
    { type: 'standard', label: 'Ghế thường - 75.000đ' },
    { type: 'couple', label: 'Ghế đôi - 150.000đ' },
    { type: 'selected', label: 'Ghế đang chọn' },
    { type: 'booked', label: 'Ghế đã đặt' }
  ];

  const getSeatMap = (cinemaId, showtime) => {
    const baseSeats = Array(16).fill(null).map((_, i) => ({
      number: `${String(i + 1).padStart(2, '0')}`,
      status: 'available'
    }));

    const morning = {
      rows: [
        { id: 'A', seats: baseSeats },
        { id: 'B', seats: baseSeats.map(seat => ({ ...seat, status: Math.random() > 0.7 ? 'booked' : 'available' })) }
      ]
    };

    const afternoon = {
      rows: [
        { id: 'A', seats: baseSeats.map(seat => ({ ...seat, status: Math.random() > 0.5 ? 'booked' : 'available' })) },
        { id: 'B', seats: baseSeats.map(seat => ({ ...seat, status: Math.random() > 0.6 ? 'booked' : 'available' })) }
      ]
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
  
  // Update seat button rendering to handle couple seats
  const renderSeat = (seat) => {
    const isCouple = seat.seatType === "COUPLE";
    return (
      <button
        key={seat.id}
        className={`seat 
          ${seat.status === 'SOLD' ? 'booked' : 'available'} 
          ${selectedSeats.some(s => s.seatNumber === seat.seatNumber) ? 'selected' : ''}
          ${isCouple ? 'couple-seat' : ''}`}
        disabled={seat.status === 'SOLD'}
        onClick={() => handleSeatClick(seat)}
      >
        {seat.seatNumber}
      </button>
    );
  };
  

  const calculateTotalPrice = () => {
    return selectedSeats.reduce((total, seat) => {
      // VIP seats are typically rows A-C
      const isVIP = ['A', 'B', 'C'].includes(seat.seatNumber.charAt(0));
      return total + (isVIP ? ticketPrices.vip : ticketPrices.standard);
    }, 0);
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

        <div className="movie-header">
          <img 
            src={movieData.posterUrl} 
            alt={movieData.title} 
            className="movie-poster" 
          />
          <div className="movie-info">
            <h1 className="movie-title">{movieData.title}</h1>
            <ul className="info-list">
              <li className="info-item">
                <img
                  src="https://cinestar.com.vn/assets/images/icon-tag.svg"
                  alt="Age Restriction"
                  className="info-icon"
                />
                {movieData.category.name}
              </li>
              <li className="info-item">
                <img
                  src="https://cinestar.com.vn/assets/images/icon-clock.svg"
                  alt="Duration"
                  className="info-icon"
                />
                {movieData.duration} phút
              </li>
              <li className="info-item">
                <svg
                  className="info-icon yellow-icon"
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
              <li className="info-item">
                <svg
                  className="info-icon yellow-icon"
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
              <li className="info-item">
                <svg
                  className="info-icon yellow-icon"
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
            <div>
              <h2 className="section-title">Mô Tả</h2>
              <p>Đạo diễn: {movieData.director}<br />
                 Diễn viên: {movieData.cast}</p>
            </div>
            <div>
              <h2 className="section-title">Nội Dung Phim</h2>
              <p>{movieData.description}</p>
            </div>
            <button 
              className="trailer-button"
              onClick={handleTrailerClick}
            >
              Xem Trailer
            </button>
          </div>
        </div>

        <div className="showtimes-section">
          <h2 className="section-title">Lịch Chiếu</h2>
          
          {(!movieData.showtimes || movieData.showtimes.length === 0) ? (
            <div className="no-showtimes">
              <p>Không có lịch chiếu</p>
            </div>
          ) : (
            <>
              <div className="dates-container">
                {availableDates.map((dateInfo) => (
                  <div 
                    key={dateInfo.date}
                    className={`date-box ${selectedDate === dateInfo.date ? 'active' : ''}`}
                    onClick={() => setSelectedDate(dateInfo.date)}
                  >
                    <span className="date">{dateInfo.formattedDate}</span>
                    <span className="weekday">{dateInfo.weekday}</span>
                  </div>
                ))}
              </div>

              <h2 className="cinema-list-title">DANH SÁCH RẠP</h2>
              <div className="cinemas-list">
                {selectedDate && groupedShowtimes[selectedDate] && 
                  Object.values(groupedShowtimes[selectedDate]).map((cinema: any) => (
                    <div key={cinema.name} className="cinema-item">
                      <div className="cinema-info">
                        <h3 className="cinema-name">{cinema.name}</h3>
                        <div className="cinema-address">{cinema.address}</div>
                      </div>
                      <div className="showtime-buttons">
                        {cinema.showtimes.map((show, index) => (
                          <button 
                            key={index} 
                            className={`time-btn ${
                              selectedTime === show.time && selectedCinema?.name === cinema.name ? 'selected' : ''
                            }`}
                            onClick={() => handleTimeSelection(cinema, show.time, show.id)}
                          >
                            <span className="time">{show.time}</span>
                          </button>
                        ))}
                      </div>
                    </div>
                  ))}
              </div>
            </>
          )}
        </div>

        {selectedTime && availableSeats.length > 0 && (
          <div className="seats-section" ref={seatsRef}>  {/* Add ref here */}
            <h2 className="cinema-list-title text-center">
              CHỌN GHẾ - {selectedCinema?.showtimes.find(s => s.time === selectedTime)?.roomName.toUpperCase()}
            </h2>

            <div className="screen-container">
              <div className="screen-wrapper">
                <img src="https://cinestar.com.vn/assets/images/img-screen.png" alt="Màn hình" className="screen-img" />
                <div className="screen-text">Màn hình</div>
              </div>
            </div>

            <div className="seat-map">
              {Object.entries(groupSeatsByRow(availableSeats))
                .sort(([rowA], [rowB]) => {
                  // Ensure COUPLE row is always last
                  if (rowA === "COUPLE") return 1;
                  if (rowB === "COUPLE") return -1;
                  return rowA.localeCompare(rowB);
                })
                .map(([row, seats]) => (
                  <div key={row} className="seat-row">
                    <div className="row-label">{row === "COUPLE" ? "Đôi" : row}</div>
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

            <div className="seat-types">
              {seatTypes.map((type) => (
                <div key={type.type} className="seat-type">
                  <div className={`seat-example ${type.type}`}></div>
                  <span className="seat-label">{type.label}</span>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>

      {showPayment && createPortal(
        <PaymentTicketForm
          title={movieData.title}
          roomName={selectedCinema?.showtimes.find(s => s.time === selectedTime)?.roomName || ''}
          cinemaName={selectedCinema?.name || ''}
          cinemaAddress={selectedCinema?.address || ''}
          showTime={`${selectedTime} - ${selectedDate}`}
          selectedSeats={selectedSeats}
          showtimeId={selectedShowtimeId} // Ensure it's passed as is
          totalPrice={calculateTotalPrice()}
          onConfirm={(movieInfo) => {
            console.log('Payment confirmed:', {
              ...movieInfo,
              showtimeId: selectedShowtimeId // Log to verify
            });
          }}
        />,
        document.body
      )}
    </>
  );
};

export default MovieDetail;
