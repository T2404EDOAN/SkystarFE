import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom"; // Correct import for Link and useNavigate
import { FaRegEye, FaEyeSlash } from "react-icons/fa6";
import axios from "axios";
import { useAuth } from "../../context/AuthContext";
import "./Login.css";

const Login = () => {
  const { login } = useAuth();
  const [activeTab, setActiveTab] = useState("login");
  const [dob, setDob] = useState("");
  const [cccd, setCccd] = useState("");
  const [passwordVisible, setPasswordVisible] = useState(false);
  const [confirmPasswordVisible, setConfirmPasswordVisible] = useState(false);
  const [identifier, setIdentifier] = useState(""); // This will hold email, username, or phone number
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [emailError, setEmailError] = useState("");
  const [loginError, setLoginError] = useState("");
  const [registrationError, setRegistrationError] = useState("");
  const [fullName, setFullName] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");
  const [username, setUsername] = useState("");
  const [address, setAddress] = useState("");
  const navigate = useNavigate(); // Initialize navigate

  const togglePasswordVisibility = () => {
    setPasswordVisible(!passwordVisible);
  };

  const toggleConfirmPasswordVisibility = () => {
    setConfirmPasswordVisible(!confirmPasswordVisible);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (activeTab === "login") {
      try {
        const response = await axios.get(
          "http://35.175.173.235:8080/api/users",
          {
            params: {
              identifier,
              password,
            },
          }
        );
        
        const users = response.data;
        const user = users.find(
          (user) =>
            (user.email === identifier || user.username === identifier) &&
            user.passwordHash === password
        );

        if (user) {
          console.log("Login successful", user);
          login(user); // Save user data to context
          
          navigate("/");
        } else {
          setLoginError("Tài khoản hoặc mật khẩu không đúng");
        }
      } catch (error) {
        setLoginError("Tài khoản hoặc mật khẩu không đúng");
      }
    } else {
      // Registration logic
      if (!validateEmail(identifier)) {
        setEmailError("Email không hợp lệ");
        return;
      }

      if (password !== confirmPassword) {
        setRegistrationError("Mật khẩu và xác nhận mật khẩu không khớp");
        return;
      }

      try {
        const response = await axios.post("http://localhost:8080/api/users", {
          username,
          email: identifier,
          password,
          fullName,
          phoneNumber,
          citizenId: cccd,
          dateOfBirth: dob,
          address,
          avatarUrl: "", // Optional field
        });

        console.log("Registration response:", response); // Log the response

        if (response.status === 200) {
          console.log("Đăng ký thành công:", response.data);
          alert("Đăng ký thành công. Chuyển hướng đến trang đăng nhập.");
          navigate("/login"); // Redirect to login page
        } else {
          setRegistrationError("Đăng ký thất bại. Vui lòng thử lại.");
        }
      } catch (error) {
        console.error(
          "Lỗi khi đăng ký:",
          error.response?.data || error.message
        );

        // Display server error (if any)
        if (error.response?.data?.error) {
          setRegistrationError(error.response.data.error);
        } else {
          setRegistrationError("Đăng ký thất bại. Vui lòng thử lại.");
        }
      }
    }
  };

  const validateEmail = (email) => {
    const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return re.test(String(email).toLowerCase());
  };

  return (
    <div className="auth-tabs-container">
      <div className="auth-tabs">
        <button
          className={`auth-tab ${activeTab === "login" ? "active" : ""}`}
          onClick={() => setActiveTab("login")}
          id="loginin"
        >
          Đăng Nhập
        </button>
        <button
          className={`auth-tab ${activeTab === "register" ? "active" : ""}`}
          onClick={() => setActiveTab("register")}
          id="loginup"
        >
          Đăng Ký
        </button>
      </div>

      {/* Form */}
      <form
        className={`auth-tabs-form ${
          activeTab === "login" ? "login-active" : "register-active"
        }`}
        onSubmit={handleSubmit}
      >
        {activeTab === "login" ? (
          <>
            <div className="form-group">
              <label className="form-label">
                Tài khoản, Email hoặc số điện thoại{" "}
                <span className="red">*</span>
              </label>
              <input
                type="text"
                required
                className="form-input"
                placeholder="Tài khoản, Email hoặc số điện thoại"
                value={identifier}
                onChange={(e) => {
                  setIdentifier(e.target.value);
                  setEmailError("");
                  setLoginError("");
                }}
              />
              {loginError && <span className="error">{loginError}</span>}
            </div>
            <div className="form-group">
              <label className="form-label">
                Mật khẩu <span className="red">*</span>
              </label>
              <div style={{ position: "relative" }}>
                <input
                  type={passwordVisible ? "text" : "password"}
                  required
                  className="form-input"
                  placeholder="Mật khẩu"
                  value={password}
                  onChange={(e) => {
                    setPassword(e.target.value);
                    setLoginError("");
                  }}
                />
                <span
                  onClick={togglePasswordVisibility}
                  style={{
                    position: "absolute",
                    right: "10px",
                    top: "50%",
                    cursor: "pointer",
                    transform: "translateY(-50%)",
                  }}
                >
                  {passwordVisible ? <FaEyeSlash /> : <FaRegEye />}
                </span>
              </div>
              {loginError && <span className="error">{loginError}</span>}
            </div>
            <div className="form-group">
              <label className="remember-me">
                <input type="checkbox" className="form-checkbox" />
                <span className="space">Lưu mật khẩu đăng nhập</span>
              </label>
            </div>
            <div className="forgot-password">
              <Link to="/change_pass" className="forgot-password-link">
                Quên mật khẩu?
              </Link>
            </div>
            <button type="submit" className="auth-button">
              <span>ĐĂNG NHẬP</span>
            </button>
          </>
        ) : (
          <>
            <div className="form-group">
              <label className="form-label">
                Họ và tên <span className="red">*</span>
              </label>
              <input
                type="text"
                required
                className="form-input"
                value={fullName}
                onChange={(e) => setFullName(e.target.value)}
                placeholder="Nhập họ và tên"
              />
            </div>
            <div className="form-group">
              <label className="form-label">
                Tên đăng nhập <span className="red">*</span>
              </label>
              <input
                type="text"
                required
                className="form-input"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                placeholder="Nhập tên đăng nhập"
              />
            </div>
            <div className="form-group">
              <label className="form-label">
                Ngày sinh <span className="red">*</span>
              </label>
              <input
                type="date"
                value={dob}
                onChange={(e) => setDob(e.target.value)}
                className="form-input"
                required
              />
            </div>
            <div className="form-group">
              <label className="form-label">
                Số điện thoại <span className="red">*</span>
              </label>
              <input
                type="tel"
                required
                className="form-input"
                value={phoneNumber}
                onChange={(e) => setPhoneNumber(e.target.value)}
                placeholder="Nhập số điện thoại"
              />
            </div>
            <div className="form-group">
              <label className="form-label">
                CCCD <span className="red">*</span>
              </label>
              <input
                type="text"
                value={cccd}
                onChange={(e) => setCccd(e.target.value)}
                className="form-input"
                placeholder="Nhập số CCCD"
                required
              />
            </div>
            <div className="form-group">
              <label className="form-label">
                Địa chỉ <span className="red">*</span>
              </label>
              <input
                type="text"
                required
                className="form-input"
                value={address}
                onChange={(e) => setAddress(e.target.value)}
                placeholder="Nhập địa chỉ"
              />
            </div>
            <div className="form-group">
              <label className="form-label">
                Email <span className="red">*</span>
              </label>
              <input
                type="email"
                required
                className="form-input"
                placeholder="Nhập email"
                value={identifier}
                onChange={(e) => {
                  setIdentifier(e.target.value);
                  setEmailError("");
                }}
              />
              {emailError && <span className="error">{emailError}</span>}
            </div>
            <div className="form-group">
              <label className="form-label">
                Mật khẩu <span className="red">*</span>
              </label>
              <div style={{ position: "relative" }}>
                <input
                  type={passwordVisible ? "text" : "password"}
                  required
                  className="form-input"
                  placeholder="Mật khẩu"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                />
                <span
                  onClick={togglePasswordVisibility}
                  style={{
                    position: "absolute",
                    right: "10px",
                    top: "50%",
                    cursor: "pointer",
                    transform: "translateY(-50%)",
                  }}
                >
                  {passwordVisible ? <FaEyeSlash /> : <FaRegEye />}
                </span>
              </div>
            </div>
            <div className="form-group">
              <label className="form-label">
                Xác nhận mật khẩu <span className="red">*</span>
              </label>
              <div style={{ position: "relative" }}>
                <input
                  type={confirmPasswordVisible ? "text" : "password"}
                  required
                  className="form-input"
                  placeholder="Xác nhận mật khẩu"
                  value={confirmPassword}
                  onChange={(e) => setConfirmPassword(e.target.value)}
                />
                <span
                  onClick={toggleConfirmPasswordVisibility}
                  style={{
                    position: "absolute",
                    right: "10px",
                    top: "50%",
                    cursor: "pointer",
                    transform: "translateY(-50%)",
                  }}
                >
                  {confirmPasswordVisible ? <FaEyeSlash /> : <FaRegEye />}
                </span>
              </div>
              {registrationError && (
                <span className="error">{registrationError}</span>
              )}
            </div>
            <button type="submit" className="auth-button">
              <span>ĐĂNG KÝ</span>
            </button>
          </>
        )}
      </form>
    </div>
  );
};

export default Login;
