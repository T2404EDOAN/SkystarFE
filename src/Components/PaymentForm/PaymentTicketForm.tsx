import { Link, useNavigate } from "react-router-dom";
import { useState } from 'react';
import './PaymentTicketForm.css';

interface PaymentFormProps {
  title: string;
  roomName: string;
  cinemaName: string;
  cinemaAddress: string;
  showTime: string;
  selectedSeats: Array<{
    seatNumber: string;
    seatType: string;
    price: number;
  }>;
  showtimeId: number;
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
  cinemaAddress,
  showTime,
  selectedSeats,
  showtimeId,
  onConfirm,
}) => {
  const navigate = useNavigate();

  const calculateTotalPrice = () => {
    return selectedSeats.reduce((total, seat) => total + seat.price, 0);
  };

  const handleProceedToPayment = () => {
 
    navigate('/payment', {
      state: {
        title: title,
        roomName: roomName,
        cinemaName: cinemaName,
        cinemaAddress: cinemaAddress,
        showTime: showTime,
        selectedSeats: selectedSeats,
        totalPrice: calculateTotalPrice(),
        movieType: "Hành động",
        showtimeId: showtimeId,
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
            <div className="total-price">
              <span>Tạm tính</span>
              <span className="price-amount">{calculateTotalPrice().toLocaleString('vi-VN')} VNĐ</span>
            </div>
          </div>
          <button
            onClick={handleProceedToPayment}
            className="book-button"
          >
            <div className="button-gradient"></div>
            <span className="book-button-text">
              Đặt vé
            </span>
          </button>
        </div>
      </div>
    </div>
  );
};

export default PaymentTicketForm;
