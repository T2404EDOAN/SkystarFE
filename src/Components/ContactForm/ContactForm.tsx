import React from "react";
import "./ContactForm.css";

const ContactForm = () => {
  return (
    <div className="contact-container">
      <div className="contact-wrapper">
        {/* Left Column */}
        <div className="contact-left-column" style={{ flex: 1 }}>
          <div className="contact-left-content">
            <h2 className="contact-title">LIÊN HỆ VỚI CHÚNG TÔI</h2>
            {/* Facebook */}
            <div className="contact-social-item">
              <div className="social-image-container">
                <img
                  src="https://cinestar.com.vn/assets/images/ct-1.webp"
                  alt="Facebook"
                  className="social-image"
                />
              </div>
              <div className="social-text">Facebook</div>
            </div>
            {/* Zalo */}
            <div className="contact-social-item">
              <div className="social-text">Zalo</div>
              <div className="social-image-container">
                <img
                  src="https://cinestar.com.vn/assets/images/ct-2.webp"
                  alt="Zalo"
                  className="social-image"
                />
              </div>
            </div>
          </div>
        </div>
        {/* Right Column */}
        <div className="contact-right-column" style={{ flex: 1 }}>
          <h2 className="form-title">THÔNG TIN LIÊN HỆ</h2>
          <div className="contact-info">
            <p className="mb-2">📧 marketing.skystar@gmail.com</p>
            <p className="mb-2">📞 034 2556 642</p>
            <p>📍 48A Tôn Thất Thuyết, Cầu Giấy, Hà Nội</p>
          </div>
          <form className="space-y-4">
            <div>
              <input
                type="text"
                id="name"
                className="form-input"
                placeholder="Nhập tên của bạn"
              />
            </div>
            <div>
              <input
                type="email"
                id="email"
                className="form-input"
                placeholder="Nhập email của bạn"
              />
            </div>
            <div>
              <textarea
                rows={6}
                id="message"
                className="form-textarea"
                placeholder="Nhập thông tin liên hệ hoặc phản ánh"
              ></textarea>
            </div>
            <button type="submit" className="submit-button">
              <span className="button-text">GỬI NGAY</span>
              <div className="button-background" />
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default ContactForm;
