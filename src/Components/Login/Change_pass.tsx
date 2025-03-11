import React, { useState } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import "./Change_pass.css";

const Change_pass = () => {
  const [email, setEmail] = useState("");
  const [foundPassword, setFoundPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setLoading(true);

    try {
      const response = await axios.get(
        `https://skystar.io.vn/api/users/searchEmail`,
        {
          params: { email },
        }
      );

      setFoundPassword(response.data);
      setShowPassword(true);
    } catch (error) {
      if (axios.isAxiosError(error)) {
        setError(
          error.response?.data?.message || "Email không tồn tại trong hệ thống!"
        );
      } else {
        setError("Có lỗi xảy ra, vui lòng thử lại sau!");
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="box_change_pass">
      <h2 className="title_change">QUÊN MẬT KHẨU</h2>
      {!showPassword ? (
        <>
          <p className="des_change">
            Nhập địa chỉ email của bạn và chúng tôi sẽ gửi cho mật khẩu của bạn
          </p>
          <form onSubmit={handleSubmit}>
            <div className="form-group">
              <input
                type="email"
                required
                className="form-input1"
                placeholder="Email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                disabled={loading}
              />
            </div>
            {error && <p className="error-message">{error}</p>}
            <button type="submit" className="auth-button1" disabled={loading}>
              <span>{loading ? "Đang gửi..." : "Gửi"}</span>
            </button>
          </form>
        </>
      ) : (
        <div className="password-container">
          <p className="des_change">Mật khẩu của bạn là:</p>
          <div className="form-group">
            <input
              type="text"
              className="form-input1"
              value={foundPassword.password}
              readOnly
            />
          </div>
          <Link to="/login">
            <button
              className="auth-button1"
              style={{ marginLeft: "84.5%" }}
              onClick={() => {
                setShowPassword(false);
                setFoundPassword("");
                setEmail("");
                setError("");
              }}
            >
              <span>Quay lại</span>
            </button>
          </Link>
        </div>
      )}
    </div>
  );
};

export default Change_pass;
