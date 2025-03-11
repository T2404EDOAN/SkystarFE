import React, { useState, useEffect } from "react";
import { Input, Modal } from "antd"; // Add Modal to imports
import { useLocation, useNavigate } from "react-router-dom";
import axios from "axios";
import "./PaymentFormDetail.css";

interface PaymentStatusResponse {
  paymentStatus: string;
  theaterName: string;
  totalAmount: number;
  bookingNumber: string;
  roomName: string;
  movieTitle: string;
  showtime: string;
}

// Add this type before the component
interface Voucher {
  id: string;
  name: string;
}

const PaymentFormDetail = () => {
  const location = useLocation();
  const movieInfo = location.state;
  const navigate = useNavigate();
  const [timeRemaining, setTimeRemaining] = useState(
    movieInfo?.timeRemaining || 0
  );

  // Add timer effect
  useEffect(() => {
    if (timeRemaining <= 0) {
      navigate(-1);
      return;
    }

    const timerId = setInterval(() => {
      setTimeRemaining((prevTime) => {
        if (prevTime <= 1) {
          navigate(-1);
          return 0;
        }
        return prevTime - 1;
      });
    }, 1000);

    return () => clearInterval(timerId);
  }, [timeRemaining, navigate]);

  const formatTime = (seconds: number): string => {
    const minutes = Math.floor(seconds / 60);
    const remainingSeconds = seconds % 60;
    return `${minutes}:${remainingSeconds.toString().padStart(2, "0")}`;
  };

  const [fullName, setFullName] = useState("");
  const [phone, setPhone] = useState("");
  const [email, setEmail] = useState("");
  const [ageVerified, setAgeVerified] = useState(false);
  const [termsAccepted, setTermsAccepted] = useState(false);
  const [activeStep, setActiveStep] = useState(1);
  const [isLoading, setIsLoading] = useState(false);

  // Add new state for payment status
  const [paymentStatus, setPaymentStatus] = useState<{
    success: boolean;
    orderId: string;
    transId: string;
    amount: string;
    details?: PaymentStatusResponse;
  }>({
    success: false,
    orderId: "",
    transId: "",
    amount: "",
  });

  const [bookingId, setBookingId] = useState<string>("");

  const [isVoucherModalVisible, setIsVoucherModalVisible] = useState(false);
  const [selectedVoucher, setSelectedVoucher] = useState<Voucher | null>(null);

  const showVoucherModal = () => {
    setIsVoucherModalVisible(true);
  };

  const handleVoucherCancel = () => {
    setIsVoucherModalVisible(false);
    setSelectedVoucher(null);
    setFinalPrice(movieInfo?.totalPrice || 0);
  };

  // Add new state for discounted price
  const [finalPrice, setFinalPrice] = useState(movieInfo?.totalPrice || 0);

  // Update handleVoucherSelect to calculate discounted price
  const handleVoucherSelect = (voucherId: string, voucherName: string) => {
    setSelectedVoucher({ id: voucherId, name: voucherName });
    // Calculate 50% discount
    const discountedPrice = (movieInfo?.totalPrice || 0) * 0.5;
    setFinalPrice(discountedPrice);
  };

  // Add new function to handle continue button click
  const handleVoucherContinue = () => {
    setIsVoucherModalVisible(false);
  };

  const [userAge, setUserAge] = useState<number | null>(null);
  const [isWednesday, setIsWednesday] = useState(false);

  // Add this useEffect to check user age and current day
  useEffect(() => {
    // Check if it's Wednesday
    const today = new Date();
    setIsWednesday(today.getDay() === 3); // 3 represents Wednesday (0 is Sunday)

    // Calculate user age
    const userData = localStorage.getItem("user");
    if (userData) {
      const { dateOfBirth } = JSON.parse(userData);
      if (dateOfBirth) {
        const birthDate = new Date(dateOfBirth);
        const age = today.getFullYear() - birthDate.getFullYear();
        const monthDiff = today.getMonth() - birthDate.getMonth();

        if (
          monthDiff < 0 ||
          (monthDiff === 0 && today.getDate() < birthDate.getDate())
        ) {
          setUserAge(age - 1);
        } else {
          setUserAge(age);
        }
      }
    }
  }, []);

  useEffect(() => {
    if (movieInfo?.holdTimer) {
      const timer = setTimeout(() => {
        alert("Thời gian giữ ghế đã hết. Trang sẽ được tải lại.");
        window.location.reload();
      }, movieInfo.holdTimer * 1000);

      return () => clearTimeout(timer);
    }
  }, [movieInfo]);

  // Sửa lại useEffect kiểm tra kết quả thanh toán
  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    const orderId = params.get("orderId");
    const resultCode = params.get("resultCode");

    if (resultCode === "0" && orderId) {
      setPaymentStatus((prev) => ({
        ...prev,
        success: true,
        orderId: orderId || "",
        transId: params.get("transId") || "",
        amount: params.get("amount") || "",
      }));

      const checkPaymentStatus = async () => {
        try {
          const response = await axios.get(
            `https://skystar.io.vn/api/payments/status?orderId=${orderId}`
          );
          setPaymentStatus((prev) => ({
            ...prev,
            details: response.data,
          }));
          setActiveStep(3);
        } catch (error) {
          console.error("Error checking payment status:", error);
          alert("Không thể kiểm tra trạng thái thanh toán");
        }
      };

      checkPaymentStatus();
    }
  }, []);

  const handleNameChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFullName(e.target.value);
  };

  const handlePhoneChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setPhone(e.target.value);
  };

  const handleEmailChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setEmail(e.target.value);
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (!movieInfo?.showtimeId || !movieInfo?.selectedSeats) {
      alert("Thông tin đặt vé không hợp lệ");
      return;
    }

    // Get user ID from localStorage and format it
    const userData = localStorage.getItem("user");
    const user = userData ? { id: JSON.parse(userData).id } : null;

    if (fullName && phone && email && ageVerified && termsAccepted) {
      try {
        setIsLoading(true);

        const bookingData = {
          guestName: fullName,
          guestEmail: email,
          guestPhone: phone,
          showtimeId: movieInfo.showtimeId,
          totalSeats: movieInfo.selectedSeats.length,
          totalAmount: movieInfo.totalPrice,
          seatIds: movieInfo.selectedSeats.map((seat) => seat.id),
          user: user,
        };

        console.log("Booking Data being sent:", {
          bookingData,
          movieInfo: {
            title: movieInfo?.title,
            showTime: movieInfo?.showTime,
            selectedSeats: movieInfo?.selectedSeats,
            user: user,
          },
        });

        const response = await axios.post(
          "https://skystar.io.vn/api/bookings/create",
          bookingData
        );

        if (response.status === 200 || response.status === 201) {
          setBookingId(response.data.id); // Store the booking ID
          setActiveStep(2); // Move to payment step
        } else {
          alert("Đặt vé thất bại. Vui lòng thử lại.");
        }
      } catch (error) {
        console.error("Booking error:", error);
        alert("Đặt vé thất bại. Vui lòng thử lại.");
      } finally {
        setIsLoading(false);
      }
    }
  };

  const handleMomoPayment = async () => {
    try {
      setIsLoading(true);
      const returnUrl = `${window.location.origin}/payment`; // Simplified return URL
      const paymentData = {
        orderInfo: "Thanh toán vé xem phim",
        amount: finalPrice.toString(), // Use finalPrice instead of totalPrice
        bookingId: bookingId,
        returnUrl: returnUrl,
      };

      // Add console.log to show payment data
      console.log("Payment Data being sent to Momo:", {
        paymentData,
        movieInfo: {
          title: movieInfo?.title,
          totalPrice: movieInfo?.totalPrice,
          selectedSeats: movieInfo?.selectedSeats,
        },
      });

      const response = await axios.post(
        "https://skystar.io.vn/api/payments/momo",
        paymentData
      );

      if (response.data && response.data.payUrl) {
        window.location.href = response.data.payUrl;
      } else {
        alert("Không thể khởi tạo thanh toán. Vui lòng thử lại.");
      }
    } catch (error) {
      console.error("Payment error:", error);
      alert("Lỗi thanh toán. Vui lòng thử lại.");
    } finally {
      setIsLoading(false);
    }
  };

  const handleBack = () => {
    setActiveStep(1);
  };

  return (
    <div className="skystar-payment-container">
      <div className="skystar-payment-header">
        <h1 className="skystar-payment-title">TRANG THANH TOÁN</h1>
        <ul className="skystar-payment-steps">
          <li className={activeStep === 1 ? "active" : ""}>
            <span className="step-number">1</span>
            <span className="step-text">Thông tin thanh toán</span>
          </li>
          <li className={activeStep === 2 ? "active" : ""}>
            <span className="step-number">2</span>
            <span className="step-text">Thanh toán</span>
          </li>
          <li className={activeStep === 3 ? "active" : ""}>
            <span className="step-number">3</span>
            <span className="step-text">Thông tin phim</span>
          </li>
        </ul>
      </div>
      <div className="skystar-payment-content">
        {activeStep === 1 && (
          <div className="skystar-payment-form-wrapper">
            <form className="skystar-payment-form" onSubmit={handleSubmit}>
              <div className="skystar-form-group">
                <label htmlFor="fullName" className="skystar-form-label">
                  Họ và tên
                </label>
                <Input
                  id="fullName"
                  value={fullName}
                  onChange={handleNameChange}
                  className="skystar-form-input"
                  required
                  size="large"
                />
              </div>
              <div className="skystar-form-group">
                <label htmlFor="phone" className="skystar-form-label">
                  Số điện thoại
                </label>
                <Input
                  id="phone"
                  value={phone}
                  onChange={handlePhoneChange}
                  className="skystar-form-input"
                  required
                  size="large"
                />
              </div>
              <div className="skystar-form-group">
                <label htmlFor="email" className="skystar-form-label">
                  Email
                </label>
                <Input
                  id="email"
                  value={email}
                  onChange={handleEmailChange}
                  className="skystar-form-input"
                  required
                  size="large"
                />
              </div>
              <div className="skystar-form-checkbox-group">
                <input
                  type="checkbox"
                  id="ageVerification"
                  checked={ageVerified}
                  onChange={(e) => setAgeVerified(e.target.checked)}
                  className="skystar-form-checkbox"
                  required
                />
                <label
                  htmlFor="ageVerification"
                  className="skystar-form-checkbox-label"
                >
                  Đảm bảo mua vé đúng số tuổi quy định
                </label>
              </div>

              <div className="skystar-form-checkbox-group">
                <input
                  type="checkbox"
                  id="termsAcceptance"
                  checked={termsAccepted}
                  onChange={(e) => setTermsAccepted(e.target.checked)}
                  className="skystar-form-checkbox"
                  required
                />
                <label
                  htmlFor="termsAcceptance"
                  className="skystar-form-checkbox-label"
                >
                  Đồng ý với điều khoản của Cinestar
                </label>
              </div>
              <button
                type="submit"
                className="skystar-form-submit"
                disabled={
                  !fullName ||
                  !phone ||
                  !email ||
                  !ageVerified ||
                  !termsAccepted ||
                  isLoading
                }
              >
                {isLoading ? "Đang xử lý..." : "Tiếp tục"}
              </button>
            </form>
          </div>
        )}
        {activeStep === 2 && (
          <div className="skystar-payment-step2">
            <div className="payment-methods-container">
              <div
                className="payment-method-box"
                onClick={handleMomoPayment}
                style={{ cursor: "pointer" }}
              >
                <img
                  src="https://cinestar.com.vn/assets/images/img-momo.png"
                  alt="Momo"
                />
                <p>Thanh toán qua ví Momo</p>
              </div>
              <div className="payment-method-box">
                <img src="/zalopay-logo.png" alt="ZaloPay" />
                <p>Thanh toán qua ví ZaloPay</p>
              </div>
              <div className="payment-method-box">
                <img src="/vnpay-logo.png" alt="VNPay" />
                <p>Thanh toán qua VNPay</p>
              </div>
              <div
                className="payment-method-box voucher-box"
                onClick={showVoucherModal}
              >
                <img
                  src="https://cinestar.com.vn/assets/images/icon-tag.svg"
                  alt="Voucher"
                  className="voucher-icon"
                />
                <p>
                  {selectedVoucher
                    ? `Voucher đã chọn: ${selectedVoucher.name}`
                    : "Chọn hoặc nhập mã giảm giá"}
                </p>
              </div>
            </div>
            <Modal
              title="Áp dụng ưu đãi"
              open={isVoucherModalVisible}
              onCancel={handleVoucherCancel}
              footer={
                <div className="voucher-modal-footer">
                  <button
                    className="voucher-continue-btn"
                    onClick={handleVoucherContinue}
                    disabled={!selectedVoucher}
                  >
                    {selectedVoucher ? "Tiếp tục" : "Vui lòng chọn ưu đãi"}
                  </button>
                </div>
              }
            >
              <div className="voucher-list">
                <div
                  className={`voucher-item ${
                    userAge && userAge < 22 ? "" : "disabled"
                  } ${selectedVoucher?.id === "VOUCHER1" ? "selected" : ""}`}
                  onClick={() =>
                    userAge &&
                    userAge < 22 &&
                    handleVoucherSelect("VOUCHER1", "C'Ten: 45k phim 2d")
                  }
                >
                  <div className="voucher-info">
                    <h3>C'Ten: 45k phim 2d</h3>
                    <p>Xem phim trước 10h sáng và sau 10h tối</p>
                    {userAge && userAge >= 22 && (
                      <p className="voucher-error">
                        Chỉ áp dụng cho khách hàng dưới 22 tuổi
                      </p>
                    )}
                  </div>
                </div>
                <div
                  className={`voucher-item ${isWednesday ? "" : "disabled"} ${
                    selectedVoucher?.id === "VOUCHER2" ? "selected" : ""
                  }`}
                  onClick={() =>
                    isWednesday &&
                    handleVoucherSelect("VOUCHER2", "C'Member: 45k phim 2d")
                  }
                >
                  <div className="voucher-info">
                    <h3>C'Member: 45k phim 2d</h3>
                    <p>Thành viên Cinestar vào ngày thứ 4 hàng tuần</p>
                    {!isWednesday && (
                      <p className="voucher-error">Chỉ áp dụng vào thứ 4</p>
                    )}
                  </div>
                </div>
              </div>
            </Modal>
            <div className="payment-actions">
              <button onClick={handleBack} className="skystar-form-back">
                Quay lại
              </button>
            </div>
          </div>
        )}
        {activeStep === 3 && (
          <div className="payment-status-container">
            {!paymentStatus.details ? (
              <div className="payment-loading-content">
                <div className="spinner"></div>
                <h2>Đang xử lý thanh toán...</h2>
                <p>Vui lòng đợi trong giây lát</p>
              </div>
            ) : paymentStatus.details.paymentStatus === "PENDING" ? (
              <div className="payment-pending-content">
                <div className="spinner"></div>
                <h2>Đang chờ thanh toán...</h2>
              </div>
            ) : paymentStatus.details.paymentStatus === "PAID" ? (
              <div className="payment-success-content">
                <img
                  src="/success-icon.png"
                  alt="Success"
                  className="success-icon"
                />
                <h2>Thanh toán thành công!</h2>
                <div className="payment-details">
                  <p>Mã đặt vé: {paymentStatus.details.bookingNumber}</p>
                  <p>Rạp: {paymentStatus.details.theaterName}</p>
                  <p>Phòng: {paymentStatus.details.roomName}</p>
                  <p>Phim: {paymentStatus.details.movieTitle}</p>
                  <p>Suất chiếu: {paymentStatus.details.showtime}</p>
                  <p>
                    Số tiền:{" "}
                    {paymentStatus.details.totalAmount.toLocaleString("vi-VN")}{" "}
                    VND
                  </p>
                  <p>Trạng thái: Đã thanh toán</p>
                  {movieInfo.selectedProducts &&
                    movieInfo.selectedProducts.length > 0 && (
                      <div className="selected-products-list">
                        <h3>Sản phẩm đã chọn:</h3>
                        {movieInfo.selectedProducts.map((product, index) => (
                          <p key={index}>
                            {product.name} x {product.quantity}
                          </p>
                        ))}
                      </div>
                    )}
                </div>
                <div className="payment-actions">
                  <button
                    onClick={() => navigate("/")}
                    className="back-to-home"
                  >
                    Về trang chủ
                  </button>
                </div>
              </div>
            ) : (
              <div className="payment-failed-content">
                <img
                  src="/failed-icon.png"
                  alt="Failed"
                  className="failed-icon"
                />
                <h2>Thanh toán thất bại</h2>
                <p>Vui lòng thử lại sau</p>
                <button
                  onClick={() => setActiveStep(2)}
                  className="try-again-button"
                >
                  Thử lại
                </button>
              </div>
            )}
          </div>
        )}
        {activeStep !== 3 && (
          <div className="skystar-payment-summary">
            <div className="skystar-payment-movie-info">
              <div className="info-row movie-title-row">
                <div className="title-hold">
                  <div className="payment-movie-details">
                    <span className="movie-name">{movieInfo?.title}</span>
                    <span className="movie-genre">
                      {movieInfo?.movieType || "Phim"}
                    </span>
                  </div>
                </div>
                <div className="hold-time">
                  <span className="hold-timer">
                    {formatTime(timeRemaining)}
                  </span>
                </div>
              </div>

              <div className="info-row cinema-info-row">
                <div className="cinema-details">
                  <span className="cinema-name">{movieInfo?.cinemaName}</span>
                  <span className="cinema-address">
                    {movieInfo?.cinemaAddress}
                  </span>
                </div>
              </div>

              <div className="info-row showtime-info-row">
                <div className="showtime-details">
                  <span className="time-label">Thời gian</span>
                  <span className="time-value">{movieInfo?.showTime}</span>
                </div>
              </div>

              <div className="info-row room-info-row">
                <div className="room-details">
                  <span className="detail-label">Phòng chiếu</span>
                  <span className="detail-value">{movieInfo?.roomName}</span>
                </div>
                <div className="ticket-count">
                  <span className="detail-label">Số vé</span>
                  <span className="detail-value">
                    {movieInfo?.selectedSeats?.length}
                  </span>
                </div>
                <div className="ticket-type">
                  <span className="detail-label">Loại vé</span>
                  <span className="detail-value">
                    {movieInfo?.selectedSeats[0]?.seatType || "Thường"}
                  </span>
                </div>
                <div className="seat-numbers">
                  <span className="detail-label">Số ghế</span>
                  <span className="detail-value">
                    {movieInfo?.selectedSeats
                      ?.map((seat) => seat.seatNumber)
                      .join(", ")}
                  </span>
                </div>
              </div>

              <div className="info-row concession-info-row">
                <div className="concession-details">
                  <span className="detail-label">Bắp nước:</span>
                  <span className="detail-value">
                    {movieInfo?.selectedProducts &&
                      movieInfo.selectedProducts.map((product, index) => (
                        <span key={index}>
                          {product.name} x {product.quantity}
                          {index < movieInfo.selectedProducts.length - 1
                            ? ", "
                            : ""}
                        </span>
                      ))}
                  </span>
                </div>
              </div>

              <div className="info-row total-row">
                <span className="label">SỐ TIỀN THANH TOÁN</span>
                <div className="value">
                  {selectedVoucher && (
                    <div className="original-price">
                      <span
                        style={{
                          textDecoration: "line-through",
                          color: "#999",
                          fontSize: "0.9em",
                        }}
                      >
                        {movieInfo?.totalPrice?.toLocaleString("vi-VN")} VND
                      </span>
                      <span style={{ color: "#28a745", marginLeft: "8px" }}>
                        -50%
                      </span>
                    </div>
                  )}
                  <span
                    style={{
                      color: selectedVoucher ? "#e71a0f" : "inherit",
                      fontWeight: "bold",
                    }}
                  >
                    {finalPrice.toLocaleString("vi-VN")} VND
                  </span>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default PaymentFormDetail;
