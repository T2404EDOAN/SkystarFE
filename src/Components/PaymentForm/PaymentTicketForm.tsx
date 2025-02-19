import { Link, useNavigate } from "react-router-dom";  // Fix import
import { useState, useEffect } from 'react';
import './PaymentTicketForm.css';

interface PaymentFormProps {
  title: string;
  roomName: string;
  cinemaName: string;
  cinemaAddress: string; // Add this
  showTime: string;
  selectedSeats: Array<{
    seatNumber: string;
    seatType: string;
    price: number;  // Add this
  }>;
  showtimeId: number; // Make sure this is included in the props
  onConfirm: (movieInfo: {
    title: string;
    roomName: string;
    cinemaName: string;
    showTime: string;
    selectedSeats: string[];
  }) => void;
  totalPrice: number;
  holdTimer: number;
}

const PaymentTicketForm: React.FC<PaymentFormProps> = ({
  title,
  roomName,
  cinemaName,
  cinemaAddress, // Add this to props destructuring
  showTime,
  selectedSeats,
  showtimeId, // Add this to props destructuring
  onConfirm,
}) => {
  const navigate = useNavigate();  // Add this
  const [timeLeft, setTimeLeft] = useState(300); // 5 minutes in seconds

  useEffect(() => {
    if (timeLeft <= 0) return;

    const timerId = setInterval(() => {
      setTimeLeft(time => time - 1);
    }, 1000);

    return () => clearInterval(timerId);
  }, [timeLeft]);

  const formatTime = (seconds: number) => {
    const minutes = Math.floor(seconds / 60);
    const remainingSeconds = seconds % 60;
    return `${minutes}:${remainingSeconds.toString().padStart(2, '0')}`;
  };

  const calculateTotalPrice = () => {
    return selectedSeats.reduce((total, seat) => total + seat.price, 0);
  };

  const handleConfirm = () => {
    onConfirm({
      title,
      roomName,
      cinemaName,
      showTime,
      selectedSeats: selectedSeats.map(seat => seat.seatNumber)
    });
  };

  const handleProceedToPayment = () => {
    // Debug log to verify data
    console.log('Proceeding to payment with data:', {
      showtimeId: showtimeId,
      title: title,
      selectedSeats: selectedSeats
    });

    navigate('/payment', {
      state: {
        title: title,
        roomName: roomName,
        cinemaName: cinemaName,
        cinemaAddress: cinemaAddress,
        showTime: showTime,
        selectedSeats: selectedSeats,
        totalPrice: calculateTotalPrice(),
        holdTimer: timeLeft,
        movieType: "Hành động",
        showtimeId: showtimeId, // Make sure showtimeId is included
      }
    });
  };

  return (
    <div className="payment-form-container">
      <div className="payment-form-content">
        <div className="movie-info-section">
          <div>
            <h1 className="movie-title-pay">{title}</h1>
            <div>
              <div className="cinema-info">
                {`${cinemaName} | ${selectedSeats[0]?.seatType || 'Standard'}`}
              </div>
              <div className="showtime-info">
                <span>{roomName}</span>
                <span className="divider">|</span>
                <span>{selectedSeats.map(seat => seat.seatNumber).join(", ")}</span>
                <span className="divider">|</span>
                <span>{showTime}</span>
              </div>
            </div>
          </div>
        </div>

        <div className="vertical-divider"></div>

        <div className="button-section">
          <div className="timer-container">
            <div className="timer-wrapper">
              <svg className="timer-icon" xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24">
                <path fill="currentColor" d="M12 2C6.486 2 2 6.486 2 12s4.486 10 10 10 10-4.486 10-10S17.514 2 12 2zm0 18c-4.411 0-8-3.589-8-8s3.589-8 8 8-3.589 8-8 8z"/>
                <path fill="currentColor" d="M13 7h-2v5.414l3.293 3.293 1.414-1.414L13 11.586z"/>
              </svg>
              <span className="timer-text">
                Thời gian giữ ghế: {formatTime(timeLeft)}
              </span>
            </div>
            <div className="total-price">
              Tổng tiền: {calculateTotalPrice().toLocaleString('vi-VN')}đ
            </div>
          </div>
          <button
            onClick={handleProceedToPayment}  // Use handleProceedToPayment instead of old handler
            className="book-button"
            disabled={timeLeft <= 0}
          >
            {timeLeft > 0 ? `Đặt vé - ${calculateTotalPrice().toLocaleString('vi-VN')}đ` : 'Hết thời gian'}
          </button>
        </div>
      </div>
    </div>
  );
};

export default PaymentTicketForm;
