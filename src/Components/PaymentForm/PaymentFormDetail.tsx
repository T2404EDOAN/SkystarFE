import React, { useState, useEffect } from "react";
import { Input } from 'antd';
import { useLocation, useNavigate } from 'react-router-dom';
import axios from 'axios';
import './PaymentFormDetail.css';

const PaymentFormDetail = () => {
  const location = useLocation();
  const movieInfo = location.state;

  // Add console.log to debug
  useEffect(() => {
    
  }, [movieInfo]);

  useEffect(() => {


  }, [movieInfo]);

  // Add debug log at the top of component
  useEffect(() => {
   
  }, [movieInfo]);

  const [fullName, setFullName] = useState("");
  const [phone, setPhone] = useState("");
  const [email, setEmail] = useState("");
  const [ageVerified, setAgeVerified] = useState(false);
  const [termsAccepted, setTermsAccepted] = useState(false);
  const [activeStep, setActiveStep] = useState(1); // Add this for tracking active step
  const [isLoading, setIsLoading] = useState(false);

  // Add new state for payment status
  const [paymentStatus, setPaymentStatus] = useState({
    success: false,
    orderId: '',
    transId: '',
    amount: ''
  });

  const [bookingId, setBookingId] = useState<string>('');

  const navigate = useNavigate();

  useEffect(() => {
    if (movieInfo?.holdTimer) {
      const timer = setTimeout(() => {
        alert('Thời gian giữ ghế đã hết. Trang sẽ được tải lại.');
        window.location.reload();
      }, movieInfo.holdTimer * 1000);
      
      return () => clearTimeout(timer);
    }
  }, [movieInfo]);

  // Add effect to check URL params for payment result
  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    if (params.get('resultCode') === '0') {
      setPaymentStatus({
        success: true,
        orderId: params.get('orderId') || '',
        transId: params.get('transId') || '',
        amount: params.get('amount') || ''
      });
      setActiveStep(3); // Move to success screen
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
      alert('Thông tin đặt vé không hợp lệ');
      return;
    }

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
          seatIds: movieInfo.selectedSeats.map(seat => seat.id)
        };

        const response = await axios.post(
          'http://35.175.173.235:8080/api/bookings/create',
          bookingData
        );

        if (response.status === 200 || response.status === 201) {
          setBookingId(response.data.id); // Store the booking ID
          setActiveStep(2); // Move to payment step
        } else {
          alert('Đặt vé thất bại. Vui lòng thử lại.');
        }
      } catch (error) {
        console.error('Booking error:', error);
        alert('Đặt vé thất bại. Vui lòng thử lại.');
      } finally {
        setIsLoading(false);
      }
    }
  };

  const handleMomoPayment = async () => {
    try {
      setIsLoading(true);
      const paymentData = {
        orderInfo: "Thanh toán vé xem phim",
        amount: movieInfo.totalPrice.toString(),
        bookingId: bookingId // Add bookingId to payment request
      };

      // Add console.log to show payment data
      console.log('Payment Data being sent to Momo:', {
        paymentData,
        movieInfo: {
          title: movieInfo?.title,
          totalPrice: movieInfo?.totalPrice,
          selectedSeats: movieInfo?.selectedSeats
        }
      });

      const response = await axios.post(
        'http://localhost:8080/api/payments/momo',
        paymentData
      );

      if (response.data && response.data.payUrl) {
        window.location.href = response.data.payUrl;
      } else {
        alert('Không thể khởi tạo thanh toán. Vui lòng thử lại.');
      }
    } catch (error) {
      console.error('Payment error:', error);
      alert('Lỗi thanh toán. Vui lòng thử lại.');
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
          <li className={activeStep === 1 ? 'active' : ''}>
            <span className="step-number">1</span>
            <span className="step-text">Thông tin thanh toán</span>
          </li>
          <li className={activeStep === 2 ? 'active' : ''}>
            <span className="step-number">2</span>
            <span className="step-text">Thanh toán</span>
          </li>
          <li className={activeStep === 3 ? 'active' : ''}>
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
                <label htmlFor="fullName" className="skystar-form-label">Họ và tên</label>
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
                <label htmlFor="phone" className="skystar-form-label">Số điện thoại</label>
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
                <label htmlFor="email" className="skystar-form-label">Email</label>
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
                <label htmlFor="ageVerification" className="skystar-form-checkbox-label">
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
                <label htmlFor="termsAcceptance" className="skystar-form-checkbox-label">
                  Đồng ý với điều khoản của Cinestar
                </label>
              </div>
              <button 
                type="submit" 
                className="skystar-form-submit"
                disabled={!fullName || !phone || !email || !ageVerified || !termsAccepted || isLoading}
              >
                {isLoading ? 'Đang xử lý...' : 'Tiếp tục'}
              </button>
            </form>
          </div>
        )}
        {activeStep === 2 && (
          <div className="skystar-payment-step2">
            <div className="payment-methods-container">
              <div className="payment-method-box" onClick={handleMomoPayment} style={{ cursor: 'pointer' }}>
                <img src="/momo-logo.png" alt="Momo" />
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
            </div>
            <div className="payment-actions">
              <button onClick={handleBack} className="skystar-form-back">
                Quay lại
              </button>
            </div>
          </div>
        )}
        {activeStep === 3 && (
          <div className="payment-success-container">
            <div className="payment-success-content">
              <img src="/success-icon.png" alt="Success" className="success-icon" />
              <h2>Thanh toán thành công!</h2>
              <div className="payment-details">
                <p>Mã đơn hàng: {paymentStatus.orderId}</p>
                <p>Mã giao dịch: {paymentStatus.transId}</p>
                <p>Số tiền: {parseInt(paymentStatus.amount).toLocaleString('vi-VN')} VND</p>
              </div>
              <div className="payment-actions">
                <button 
                  onClick={() => navigate('/')} 
                  className="back-to-home"
                >
                  Về trang chủ
                </button>
              </div>
            </div>
          </div>
        )}
        <div className="skystar-payment-summary">
          <div className="skystar-payment-movie-info">
            <div className="info-row movie-title-row">
              <div className="title-hold">
                <div className="movie-details">
                  <span className="movie-name">{movieInfo?.title}</span>
                  <span className="movie-genre">{movieInfo?.movieType || 'Phim'}</span>
                </div>
              </div>
              <div className="hold-time">
                <span className="hold-timer">{Math.floor(movieInfo?.holdTimer / 60)}:
                  {(movieInfo?.holdTimer % 60).toString().padStart(2, '0')}</span>
              </div>
            </div>
            
            <div className="info-row cinema-info-row">
              <div className="cinema-details">
                <span className="cinema-name">{movieInfo?.cinemaName}</span>
                <span className="cinema-address">{movieInfo?.cinemaAddress}</span>
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
                <span className="detail-value">{movieInfo?.selectedSeats?.length}</span>
              </div>
              <div className="ticket-type">
                <span className="detail-label">Loại vé</span>
                <span className="detail-value">{movieInfo?.selectedSeats[0]?.seatType || 'Thường'}</span>
              </div>
              <div className="seat-numbers">
                <span className="detail-label">Số ghế</span>
                <span className="detail-value">
                  {movieInfo?.selectedSeats?.map(seat => seat.seatNumber).join(', ')}
                </span>
              </div>
            </div>
            
            <div className="info-row total-row">
              <span className="label">Số tiền cần thanh toán</span>
              <span className="value">
                {movieInfo?.totalPrice?.toLocaleString('vi-VN')} VND
              </span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default PaymentFormDetail;