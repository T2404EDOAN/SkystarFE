import React, { useState } from "react";
import './PaymentFormDetail.css';  // Thêm dòng này vào đầu file

const PaymentFormDetail = () => {
  const [fullName, setFullName] = useState("");
  const [phone, setPhone] = useState("");
  const [email, setEmail] = useState("");
  const [ageVerified, setAgeVerified] = useState(false);
  const [termsAccepted, setTermsAccepted] = useState(false);
  const [activeStep, setActiveStep] = useState(1); // Add this for tracking active step

  const handleNameChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFullName(e.target.value);
  };

  const handlePhoneChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setPhone(e.target.value);
  };

  const handleEmailChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setEmail(e.target.value);
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    // Validate form
    if (fullName && phone && email && ageVerified && termsAccepted) {
      setActiveStep(2); // Move to step 2
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
      <div className="skystar-payment-content" style={{
        display: 'flex',
        gap: '2rem',
      }}>
        <div className="skystar-payment-form-wrapper" style={{
          flex: 1,
          display: activeStep === 1 ? 'block' : 'none', // Only show on step 1
        }}>
          <form className="skystar-payment-form" onSubmit={handleSubmit}>
            <div className="skystar-form-group">
              <label htmlFor="fullName" className="skystar-form-label">Họ và tên</label>
              <input
                type="text"
                id="fullName"
                value={fullName}
                onChange={handleNameChange}
                className="skystar-form-input"
                required
              />
            </div>
            <div className="skystar-form-group">
              <label htmlFor="phone" className="skystar-form-label">Số điện thoại</label>
              <input
                type="tel"
                id="phone"
                value={phone}
                onChange={handlePhoneChange}
                className="skystar-form-input"
                required
              />
            </div>
            <div className="skystar-form-group">
              <label htmlFor="email" className="skystar-form-label">Email</label>
              <input
                type="email"
                id="email"
                value={email}
                onChange={handleEmailChange}
                className="skystar-form-input"
                required
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
              disabled={!fullName || !phone || !email || !ageVerified || !termsAccepted}
            >
              Tiếp tục
            </button>
          </form>
        </div>
        {activeStep === 2 && (
          <div className="skystar-payment-step2" style={{ flex: 1 }}>
            <h2>Thanh toán</h2>
            <button 
              onClick={handleBack}
              className="skystar-form-back"
            >
              Quay lại
            </button>
            {/* Step 2 content will go here */}
          </div>
        )}
        <div className="skystar-payment-summary" style={{
          flex: 1,
        }}>
        </div>
      </div>
    </div>
  );
}

export default PaymentFormDetail;