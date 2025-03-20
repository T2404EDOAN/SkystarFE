import React, { useState, useEffect } from "react";
import { Input, Modal } from "antd";
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

interface Voucher {
  id: string;
  name: string;
}

const PaymentFormDetail = () => {
  const location = useLocation();
  const movieInfo = location.state;
  const navigate = useNavigate();

  const [fullName, setFullName] = useState("");
  const [phone, setPhone] = useState("");
  const [email, setEmail] = useState("");
  const [ageVerified, setAgeVerified] = useState(false);
  const [termsAccepted, setTermsAccepted] = useState(false);
  const [activeStep, setActiveStep] = useState(1);
  const [isLoading, setIsLoading] = useState(false);
  const [isVoucherModalVisible, setIsVoucherModalVisible] = useState(false);
  const [selectedVoucher, setSelectedVoucher] = useState<Voucher | null>(null);
  const [finalPrice, setFinalPrice] = useState(movieInfo?.totalPrice || 0);
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
  const [user, setUser] = useState(null); // Add user state
  const [selectedPayment, setSelectedPayment] = useState<string | null>(null);
  const [timeRemaining, setTimeRemaining] = useState<number | null>(null);
  const [showTimeoutModal, setShowTimeoutModal] = useState(false);

  const formatTime = (seconds: number): string => {
    const minutes = Math.floor(seconds / 60);
    const remainingSeconds = seconds % 60;
    return `${minutes}:${remainingSeconds.toString().padStart(2, "0")}`;
  };

  // Replace the existing TimeoutModal component with this Ant Design version
  const TimeoutModal = () => (
    <Modal
      title="Thông báo hết thời gian"
      open={showTimeoutModal}
      onOk={() => navigate("/")}
      centered
      okText="Về trang chủ"
      closable={false}
      maskClosable={false}
      keyboard={false}
      cancelButtonProps={{ style: { display: "none" } }}
    >
      <div style={{ textAlign: "center", padding: "20px 0" }}>
        <h3 style={{ marginBottom: "16px", color: "#ff4d4f" }}>
          Phiên đặt vé đã hết hạn!
        </h3>
        <p>Vui lòng thực hiện đặt vé lại</p>
      </div>
    </Modal>
  );

  useEffect(() => {
    const searchParams = new URLSearchParams(window.location.search);
    const resultCode = searchParams.get("resultCode");
    const orderId = searchParams.get("orderId");
    const amount = searchParams.get("amount");
    const transId = searchParams.get("transId");

    // Get stored booking data
    const storedBooking = JSON.parse(
      localStorage.getItem("currentBooking") || "{}"
    );
    const storedMovieInfo = storedBooking.movieInfo || {};

    if (resultCode === "0") {
      // Payment successful
      setPaymentStatus({
        success: true,
        orderId: orderId || "",
        transId: transId || "",
        amount: amount || "",
        details: {
          paymentStatus: "PAID",
          theaterName: storedMovieInfo.cinemaName || "",
          totalAmount: Number(amount) || 0,
          bookingNumber: orderId || "",
          roomName: storedMovieInfo.roomName || "",
          movieTitle: storedMovieInfo.title || "",
          showtime: storedMovieInfo.showTime || "",
        },
      });
      setActiveStep(3);
    } else if (resultCode) {
      // Payment failed
      setPaymentStatus({
        success: false,
        orderId: "",
        transId: "",
        amount: "",
        details: {
          paymentStatus: "FAILED",
          theaterName: "",
          totalAmount: 0,
          bookingNumber: "",
          roomName: "",
          movieTitle: "",
          showtime: "",
        },
      });
      setActiveStep(3);
    }
  }, []);

  useEffect(() => {
    const storedBooking = JSON.parse(
      localStorage.getItem("currentBooking") || "{}"
    );
    const expireAt = storedBooking.expireAt;

    if (expireAt) {
      const updateTimer = () => {
        const now = Date.now();
        const remaining = Math.max(0, Math.floor((expireAt - now) / 1000));

        if (remaining === 0) {
          setShowTimeoutModal(true);
          // Clear the booking from localStorage
          localStorage.removeItem("currentBooking");
          // Cancel any pending booking if needed
          // You might want to add an API call here to release the seats
          return;
        }

        setTimeRemaining(remaining);
      };

      updateTimer();
      const timerId = setInterval(updateTimer, 1000);

      return () => {
        clearInterval(timerId);
        const remainingTime = Math.max(
          0,
          Math.floor((expireAt - Date.now()) / 1000)
        );
        if (remainingTime === 0) {
          localStorage.removeItem("currentBooking");
        }
      };
    }
  }, [navigate]);

  // Simple UI handlers
  const showVoucherModal = () => setIsVoucherModalVisible(true);
  const handleVoucherCancel = () => setIsVoucherModalVisible(false);
  const handleBack = () => setActiveStep(1);
  const handleVoucherContinue = () => setIsVoucherModalVisible(false);

  const handleNameChange = (e: React.ChangeEvent<HTMLInputElement>) =>
    setFullName(e.target.value);
  const handlePhoneChange = (e: React.ChangeEvent<HTMLInputElement>) =>
    setPhone(e.target.value);
  const handleEmailChange = (e: React.ChangeEvent<HTMLInputElement>) =>
    setEmail(e.target.value);

  const createBooking = async () => {
    try {
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

      const bookingResponse = await axios.post(
        "http://54.83.174.210:8085/api/bookings/create",
        bookingData
      );

      const bookingId = bookingResponse.data.id;

      // Store booking data in localStorage for later use
      localStorage.setItem(
        "currentBooking",
        JSON.stringify({
          bookingId,
          amount: finalPrice,
          movieInfo: movieInfo,
        })
      );

      return bookingResponse.data;
    } catch (error) {
      console.error("Error creating booking:", error);
      throw error;
    }
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsLoading(true);

    try {
      await createBooking();
      setActiveStep(2);
    } catch (error) {
      alert("Có lỗi xảy ra khi tạo đơn hàng. Vui lòng thử lại.");
    } finally {
      setIsLoading(false);
    }
  };

  const handleMomoPayment = async () => {
    try {
      setIsLoading(true);
      const currentBooking = JSON.parse(
        localStorage.getItem("currentBooking") || "{}"
      );

      const paymentData = {
        orderInfo: "Thanh toán vé xem phim",
        amount: finalPrice.toString(),
        bookingId: currentBooking.bookingId,
        returnUrl: `${window.location.origin}/payment`,
      };

      const response = await axios.post(
        "http://54.83.174.210:8085/api/payments/momo",
        paymentData
      );

      // Redirect to Momo payment URL
      if (response.data?.payUrl) {
        window.location.href = response.data.payUrl;
      } else {
        throw new Error("Payment URL not received");
      }
    } catch (error) {
      console.error("Error initiating Momo payment:", error);
      alert("Có lỗi xảy ra khi khởi tạo thanh toán. Vui lòng thử lại.");
      setActiveStep(2);
    } finally {
      setIsLoading(false);
    }
  };

  const handleVoucherSelect = (voucherId: string, voucherName: string) => {
    setSelectedVoucher({ id: voucherId, name: voucherName });
    setFinalPrice((movieInfo?.totalPrice || 0) * 0.5);
  };

  return (
    <div className="skystar-payment-container">
      <TimeoutModal />
      <div className="skystar-payment-header">
        <h1
          className={`skystar-payment-title ${
            activeStep === 3 ? "success-message" : ""
          }`}
        >
          {activeStep === 3
            ? "CHÚC MỪNG BẠN ĐÃ THANH TOÁN THÀNH CÔNG"
            : "TRANG THANH TOÁN"}
        </h1>
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
                  Đồng ý với điều khoản của Skystar
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
                className={`payment-method-box ${
                  selectedPayment === "momo" ? "selected" : ""
                }`}
                onClick={() => setSelectedPayment("momo")}
                style={{ cursor: "pointer" }}
              >
                <img
                  src="https://cinestar.com.vn/assets/images/img-momo.png"
                  alt="Momo"
                />
                <p>Thanh toán qua ví Momo</p>
              </div>
              <div
                className={`payment-method-box ${
                  selectedPayment === "zalopay" ? "selected" : ""
                }`}
                onClick={() => setSelectedPayment("zalopay")}
                style={{ opacity: 0.5, cursor: "not-allowed" }}
              >
                <img
                  src="https://cdn.haitrieu.com/wp-content/uploads/2022/10/Logo-ZaloPay-Square.png"
                  style={{ width: "35px", height: "35px", marginLeft: "12px" }}
                  alt="ZaloPay"
                />
                <p>Thanh toán qua ví ZaloPay (Sắp ra mắt)</p>
              </div>
              <div
                className={`payment-method-box ${
                  selectedPayment === "vnpay" ? "selected" : ""
                }`}
                onClick={() => setSelectedPayment("vnpay")}
                style={{ opacity: 0.5, cursor: "not-allowed" }}
              >
                <img
                  src="https://cdn.brandfetch.io/vnpay.vn/fallback/lettermark/theme/dark/h/256/w/256/icon?c=1bfwsmEH20zzEfSNTed"
                  style={{ width: "35px", height: "35px", marginLeft: "12px" }}
                  alt="VNPay"
                />
                <p>Thanh toán qua VNPay (Sắp ra mắt)</p>
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
                    selectedVoucher?.id === "VOUCHER1" ? "selected" : ""
                  }`}
                  onClick={() =>
                    handleVoucherSelect("VOUCHER1", "C'Ten: 45k phim 2d")
                  }
                >
                  <div className="voucher-info">
                    <h3>C'Ten: 45k phim 2d</h3>
                    <p>Xem phim trước 10h sáng và sau 10h tối</p>
                  </div>
                </div>
                <div
                  className={`voucher-item ${
                    selectedVoucher?.id === "VOUCHER2" ? "selected" : ""
                  }`}
                  onClick={() =>
                    handleVoucherSelect("VOUCHER2", "C'Member: 45k phim 2d")
                  }
                >
                  <div className="voucher-info">
                    <h3>C'Member: 45k phim 2d</h3>
                    <p>Thành viên Skystar vào ngày thứ 4 hàng tuần</p>
                  </div>
                </div>
              </div>
            </Modal>
            <div className="payment-total-section1">
              <div className="payment-buttons">
                <button onClick={handleBack} className="skystar-form-back">
                  Quay lại
                </button>
                <button
                  className="payment-confirm-btn"
                  onClick={handleMomoPayment}
                  disabled={!selectedPayment}
                >
                  Tiếp tục
                </button>
              </div>
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
                <div className="skystar-payment-movie-info">
                  <div className="info-row movie-title-row">
                    <div className="title-hold">
                      <div className="payment-movie-details">
                        <span className="movie-name">
                          {paymentStatus.details.movieTitle}
                        </span>
                        <span className="movie-genre">
                          {(() => {
                            const storedBooking = JSON.parse(
                              localStorage.getItem("currentBooking") || "{}"
                            );
                            const storedMovieInfo =
                              storedBooking.movieInfo || {};
                            return storedMovieInfo.movieType || "Phim";
                          })()}
                        </span>
                      </div>
                    </div>
                  </div>

                  <div className="info-row cinema-info-row">
                    <div className="cinema-details">
                      <span className="cinema-name">
                        {paymentStatus.details.theaterName}
                      </span>
                      <span className="cinema-address">
                        {(() => {
                          const storedBooking = JSON.parse(
                            localStorage.getItem("currentBooking") || "{}"
                          );
                          const storedMovieInfo = storedBooking.movieInfo || {};
                          return storedMovieInfo.cinemaAddress || "";
                        })()}
                      </span>
                    </div>
                  </div>

                  <div className="info-row showtime-info-row">
                    <div className="showtime-details">
                      <span className="time-label">Thời gian</span>
                      <span className="time-value">
                        {paymentStatus.details.showtime}
                      </span>
                    </div>
                    <div className="booking-number-details">
                      <span className="time-label">Mã đặt vé</span>
                      <span className="time-value">
                        {paymentStatus.details.bookingNumber}
                      </span>
                    </div>
                  </div>

                  <div className="info-row room-info-row">
                    <div className="room-details">
                      <span className="detail-label">Phòng chiếu</span>
                      <span className="detail-value">
                        {paymentStatus.details.roomName}
                      </span>
                    </div>
                    <div className="ticket-count">
                      <span className="detail-label">Số vé</span>
                      <span className="detail-value">
                        {(() => {
                          const storedBooking = JSON.parse(
                            localStorage.getItem("currentBooking") || "{}"
                          );
                          const storedMovieInfo = storedBooking.movieInfo || {};
                          return storedMovieInfo.selectedSeats?.length || 0;
                        })()}
                      </span>
                    </div>
                    <div className="ticket-type">
                      <span className="detail-label">Loại vé</span>
                      <span className="detail-value">
                        {(() => {
                          const storedBooking = JSON.parse(
                            localStorage.getItem("currentBooking") || "{}"
                          );
                          const storedMovieInfo = storedBooking.movieInfo || {};
                          return (
                            storedMovieInfo.selectedSeats?.[0]?.seatType ||
                            "Thường"
                          );
                        })()}
                      </span>
                    </div>
                    <div className="seat-numbers">
                      <span className="detail-label">Số ghế</span>
                      <span className="detail-value">
                        {(() => {
                          const storedBooking = JSON.parse(
                            localStorage.getItem("currentBooking") || "{}"
                          );
                          const storedMovieInfo = storedBooking.movieInfo || {};
                          return (
                            storedMovieInfo.selectedSeats
                              ?.map((seat) => seat.seatNumber)
                              .join(", ") || ""
                          );
                        })()}
                      </span>
                    </div>
                  </div>

                  {(() => {
                    const storedBooking = JSON.parse(
                      localStorage.getItem("currentBooking") || "{}"
                    );
                    const storedMovieInfo = storedBooking.movieInfo || {};
                    return (
                      storedMovieInfo.selectedProducts &&
                      storedMovieInfo.selectedProducts.length > 0 && (
                        <div className="info-row concession-info-row">
                          <div className="concession-details">
                            <span className="detail-label">Bắp nước:</span>
                            <div
                              className="detail-value"
                              style={{
                                display: "flex",
                                flexDirection: "column",
                                gap: "4px",
                              }}
                            >
                              {storedMovieInfo.selectedProducts.map(
                                (product, index) => (
                                  <span key={index}>
                                    {product.name} x {product.quantity}
                                  </span>
                                )
                              )}
                            </div>
                          </div>
                        </div>
                      )
                    );
                  })()}
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
                    {timeRemaining !== null && (
                      <>Thời gian giữ ghế: {formatTime(timeRemaining)}</>
                    )}
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
              <div className="payment-total-section">
                <div className="payment-total-amount">
                  <span className="total-label">TỔNG TIỀN THANH TOÁN:</span>
                  <span className="total-value">
                    {finalPrice.toLocaleString("vi-VN")} VNĐ
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
