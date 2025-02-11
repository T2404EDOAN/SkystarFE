import { Link } from "react-router";
import { useState, useEffect } from 'react';
import './PaymentTicketForm.css';

interface PaymentFormProps {
  title: string;
  roomName: string;
  cinemaName: string;
  showTime: string;
  selectedSeats: string[];
  onConfirm: (movieInfo: {
    title: string;
    roomName: string;
    cinemaName: string;
    showTime: string;
    selectedSeats: string[];
  }) => void;
  totalPrice: number;
}

const PaymentTicketForm: React.FC<PaymentFormProps> = ({
  title,
  roomName,
  cinemaName,
  showTime,
  selectedSeats,
  onConfirm,
}) => {
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

  const handleConfirm = () => {
    onConfirm({
      title,
      roomName,
      cinemaName,
      showTime,
      selectedSeats
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
                <span>{cinemaName}</span>
                <span className="divider">|</span>
                <span className="seats-info">
                  Ghế: {selectedSeats.join(", ")}
                </span>
              </div>
              <div className="showtime-info">
                <span>{roomName}</span>
            
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
                <path fill="currentColor" d="M12 2C6.486 2 2 6.486 2 12s4.486 10 10 10 10-4.486 10-10S17.514 2 12 2zm0 18c-4.411 0-8-3.589-8-8s3.589-8 8-8 8 3.589 8 8-3.589 8-8 8z"/>
                <path fill="currentColor" d="M13 7h-2v5.414l3.293 3.293 1.414-1.414L13 11.586z"/>
              </svg>
              <span className="timer-text">
                Thời gian giữ ghế: {formatTime(timeLeft)}
              </span>
            </div>
          </div>
          <Link to="/dat-ve">
            <button
              onClick={handleConfirm}
              className="book-button"
              disabled={timeLeft <= 0}
            >
              {timeLeft > 0 ? 'Đặt vé' : 'Hết thời gian'}
            </button>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default PaymentTicketForm;
