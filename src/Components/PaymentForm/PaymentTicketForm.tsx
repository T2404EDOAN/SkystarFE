import { Link, useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
import axios from "axios";
import "./PaymentTicketForm.css";

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
    holdExpiration: Date; // Added this field
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
  selectedProducts: Array<{
    id: number;
    name: string;
    quantity: number;
    price: number;
    category: string;
  }>;
  backdropUrl?: string;
}

const PaymentTicketForm: React.FC<PaymentFormProps> = (props) => {
  const navigate = useNavigate();
  const [timeRemaining, setTimeRemaining] = useState<number>(300); // 5 minutes in seconds

  useEffect(() => {
    if (props.selectedSeats.length === 0) return;

    // Find the earliest expiration time among all selected seats
    const earliestExpiration = Math.min(
      ...props.selectedSeats.map((seat) =>
        new Date(seat.holdExpiration).getTime()
      )
    );

    const updateTimer = () => {
      const now = Date.now();
      const remaining = Math.max(
        0,
        Math.floor((earliestExpiration - now) / 1000)
      );
      setTimeRemaining(remaining);

      if (remaining === 0) {
        // Redirect to movie detail page when time expires
        navigate(-1);
      }
    };

    // Update timer immediately and then every second
    updateTimer();
    const timerId = setInterval(updateTimer, 1000);

    return () => clearInterval(timerId);
  }, [props.selectedSeats, navigate]);

  // Add periodic seat checking
  useEffect(() => {
    const checkSeatsStatus = async () => {
      try {
        const response = await axios.get(
          `http://54.83.174.210:8085/api/seats/${props.showtimeId}/check-seats`
        );
        const unavailableSeats = response.data;

        // Check if any of our selected seats are no longer available
        const hasUnavailableSeats = props.selectedSeats.some((selectedSeat) =>
          unavailableSeats.some(
            (unavailableSeat) => unavailableSeat.id === selectedSeat.id
          )
        );

        if (hasUnavailableSeats) {
          alert("Một số ghế đã không còn khả dụng. Vui lòng chọn ghế khác.");
          navigate(-1);
        }
      } catch (error) {
        console.error("Error checking seats status:", error);
      }
    };

    const intervalId = setInterval(checkSeatsStatus, 5 * 60 * 1000); // 5 minutes

    // Run initial check
    checkSeatsStatus();

    // Cleanup
    return () => clearInterval(intervalId);
  }, [props.showtimeId, props.selectedSeats, navigate]);

  const formatTime = (seconds: number): string => {
    const minutes = Math.floor(seconds / 60);
    const remainingSeconds = seconds % 60;
    return `${minutes}:${remainingSeconds.toString().padStart(2, "0")}`;
  };

  const calculateTotalPrice = () => {
    const seatTotal = props.selectedSeats.reduce(
      (total, seat) => total + seat.price,
      0
    );
    const productTotal = props.selectedProducts.reduce(
      (total, product) => total + product.price * product.quantity,
      0
    );
    return seatTotal + productTotal;
  };

  const handleProceedToPayment = () => {
    const seatNumbers = props.selectedSeats.map(seat => seat.seatNumber).join(", ");
    const seatType = props.selectedSeats[0]?.seatType || "Standard";
    const seatCount = props.selectedSeats.length;

    navigate("/payment", {
      state: {
        title: props.title,
        roomName: props.roomName,
        cinemaName: props.cinemaName,
        cinemaAddress: props.cinemaAddress,
        showTime: props.showTime,
        selectedSeats: props.selectedSeats,
        totalPrice: calculateTotalPrice(),
        movieType: "Hành động",
        showtimeId: props.showtimeId,
        selectedProducts: props.selectedProducts,
        timeRemaining: timeRemaining,
        seatNumbers: seatNumbers,
        seatType: seatType,
        seatCount: seatCount,
        holdExpirationTime: formatTime(timeRemaining),
        backdropUrl: props.backdropUrl
      },
    });
  };

  return (
    <div className="payment-form-container">
      <div className="payment-form-content">
        <div className="movie-info-section">
          <div>
            <h1 className="movie-title-pay">{props.title}</h1>
            <div>
              <div className="cinema-info">
                {`${props.cinemaName} | ${
                  props.selectedSeats[0]?.seatType || "Standard"
                }`}
              </div>
              <div className="showtime-info">
                <span>{props.roomName}</span>
                <span className="divider">|</span>
                <span>
                  {props.selectedSeats
                    .map((seat) => seat.seatNumber)
                    .join(", ")}
                </span>
                <span className="divider">|</span>
                <span>{props.showTime}</span>
              </div>

              {/* Add product items here */}
              {props.selectedProducts.length > 0 && (
                <div className="selected-products-list">
                  {props.selectedProducts.map((product) => (
                    <span>
                      {product.name} x {product.quantity}
                    </span>
                  ))}
                </div>
              )}
            </div>
          </div>
        </div>

        <div className="vertical-divider"></div>

        <div className="button-section">
          <div className="timer-container">
            <div className="countdown-timer">
              Thời gian giữ ghế: {formatTime(timeRemaining)}
            </div>

            <div className="total-price">
              <span>Tạm tính</span>
              <span className="price-amount">
                {calculateTotalPrice().toLocaleString("vi-VN")} VNĐ
              </span>
            </div>
          </div>
          <button onClick={handleProceedToPayment} className="book-button">
            <div className="button-gradient"></div>
            <span className="book-button-text">ĐẶT VÉ</span>
          </button>
        </div>
      </div>
    </div>
  );
};

export default PaymentTicketForm;
