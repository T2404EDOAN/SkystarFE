import React, { useState } from "react";
import { data, Link, useNavigate } from "react-router-dom"; // Correct import for Link and useNavigate
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
  const [rememberPassword, setRememberPassword] = useState(false);
  const navigate = useNavigate(); // Initialize navigate

  // Kiểm tra local storage khi component mount
  React.useEffect(() => {
    const savedCredentials = localStorage.getItem("userCredentials");
    if (savedCredentials) {
      const { identifier: savedIdentifier, password: savedPassword } =
        JSON.parse(savedCredentials);
      setIdentifier(savedIdentifier);
      setPassword(savedPassword);
      setRememberPassword(true);
    }
  }, []);

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
        setLoginError("");

        const response = await axios.post(
          "http://54.83.174.210:8085/api/users/login",
          {
            username: identifier,
            email: identifier,
            phoneNumber: identifier,
            password: password,
          }
        );

        // Nếu đăng nhập thành công và checkbox được chọn
        if (response.data && rememberPassword) {
          localStorage.setItem(
            "userCredentials",
            JSON.stringify({ identifier, password })
          );
        } else if (!rememberPassword) {
          // Xóa thông tin đăng nhập nếu không check
          localStorage.removeItem("userCredentials");
        }

        console.log("Login successful", response.data);
        const userData = response.data;

        login(userData);
        navigate("/");
      } catch (error) {
        console.error("Login error:", error);
        if (axios.isAxiosError(error)) {
          setLoginError(
            error.response?.data?.message ||
              "Thông tin đăng nhập không đúng"
          );
        } else {
          setLoginError("Đăng nhập thất bại. Vui lòng thử lại.");
        }
      }
    } else {
      if (!validateEmail(identifier)) {
        setEmailError("Email không hợp lệ");
        return;
      }

      if (password !== confirmPassword) {
        setRegistrationError("Mật khẩu và xác nhận mật khẩu không khớp");
        return;
      }

      try {
        const registrationData = {
          email: identifier,
          password: password,
          fullName: fullName,
          phoneNumber: phoneNumber,
          username: username,
          citizenId: cccd,
          dateOfBirth: dob,
          address: address,
        };

        console.log("Registration data being sent:", registrationData);

        const response = await axios.post(
          "http://54.83.174.210:8085/api/users/register",
          registrationData
        );

        if (response.status === 200 || response.status === 201) {
          console.log("Đăng ký thành công:", response.data);
          alert("Đăng ký thành công! Vui lòng đăng nhập.");
          setActiveTab("login");
          // Reset form
          setIdentifier("");
          setPassword("");
          setConfirmPassword("");
          setFullName("");
          setPhoneNumber("");
          setUsername("");
          setCccd("");
          setDob("");
          setAddress("");
        }
      } catch (error) {
        console.error("Registration error:", error);
        if (axios.isAxiosError(error)) {
          if (error.response?.status === 400) {
            setRegistrationError("Email đã tồn tại trong hệ thống!");
          } else {
            setRegistrationError(
              error.response?.data?.message ||
              "Đăng ký thất bại. Vui lòng kiểm tra lại thông tin."
            );
          }
        } else {
          setRegistrationError("Đăng ký thất bại. Vui lòng thử lại sau.");
        }
      }
    }
  };

  const validateEmail = (email) => {
    const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return re.test(String(email).toLowerCase());
  };

  return (
    <div className="login-tabs-container">
      <div className="login-tabs">
        <button
          className={`login-tab ${activeTab === "login" ? "login-active" : ""}`}
          onClick={() => setActiveTab("login")}
          id="login-in"
        >
          Đăng Nhập
        </button>
        <button
          className={`login-tab ${
            activeTab === "register" ? "login-active" : ""
          }`}
          onClick={() => setActiveTab("register")}
          id="login-up"
        >
          Đăng Ký
        </button>
      </div>

      <form
        className={`login-tabs-form ${
          activeTab === "login" ? "login-form-active" : "register-form-active"
        }`}
        onSubmit={handleSubmit}
      >
        {activeTab === "login" ? (
          <>
            <div className="login-form-group">
              <label className="login-form-label">
                Tài khoản, Email hoặc số điện thoại{" "}
                <span className="login-red">*</span>
              </label>
              <input
                type="text"
                required
                className="login-form-input"
                placeholder="Tài khoản, Email hoặc số điện thoại"
                value={identifier}
                onChange={(e) => {
                  setIdentifier(e.target.value);
                  setEmailError("");
                  setLoginError("");
                }}
              />
              {loginError && <span className="login-error">{loginError}</span>}
            </div>
            <div className="login-form-group">
              <label className="login-form-label">
                Mật khẩu <span className="login-red">*</span>
              </label>
              <div style={{ position: "relative" }}>
                <input
                  type={passwordVisible ? "text" : "password"}
                  required
                  className="login-form-input"
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
              {loginError && <span className="login-error">{loginError}</span>}
            </div>
            <div className="login-form-group">
              <label className="login-remember-me">
                <input
                  type="checkbox"
                  className="login-form-checkbox"
                  checked={rememberPassword}
                  onChange={(e) => setRememberPassword(e.target.checked)}
                />
                <span className="login-space">Lưu mật khẩu đăng nhập</span>
              </label>
            </div>
            <div className="login-forgot-password">
              <Link to="/change_pass" className="login-forgot-password-link">
                Quên mật khẩu?
              </Link>
            </div>
            <button type="submit" className="login-auth-button">
              <span>ĐĂNG NHẬP</span>
            </button>
          </>
        ) : (
          <>
            <div className="login-form-group">
              <label className="login-form-label">
                Họ và tên <span className="login-red">*</span>
              </label>
              <input
                type="text"
                required
                className="login-form-input"
                value={fullName}
                onChange={(e) => setFullName(e.target.value)}
                placeholder="Nhập họ và tên"
              />
            </div>
            <div className="login-form-group">
              <label className="login-form-label">
                Tên đăng nhập <span className="login-red">*</span>
              </label>
              <input
                type="text"
                required
                className="login-form-input"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                placeholder="Nhập tên đăng nhập"
              />
            </div>
            <div className="login-form-group">
              <label className="login-form-label">
                Ngày sinh <span className="login-red">*</span>
              </label>
              <input
                type="date"
                value={dob}
                onChange={(e) => setDob(e.target.value)}
                className="login-form-input"
                required
              />
            </div>
            <div className="login-form-group">
              <label className="login-form-label">
                Số điện thoại <span className="login-red">*</span>
              </label>
              <input
                type="tel"
                required
                className="login-form-input"
                value={phoneNumber}
                onChange={(e) => setPhoneNumber(e.target.value)}
                placeholder="Nhập số điện thoại"
              />
            </div>
            <div className="login-form-group">
              <label className="login-form-label">
                CCCD <span className="login-red">*</span>
              </label>
              <input
                type="text"
                value={cccd}
                onChange={(e) => setCccd(e.target.value)}
                className="login-form-input"
                placeholder="Nhập số CCCD"
                required
              />
            </div>
            <div className="login-form-group">
              <label className="login-form-label">
                Địa chỉ <span className="login-red">*</span>
              </label>
              <input
                type="text"
                required
                className="login-form-input"
                value={address}
                onChange={(e) => setAddress(e.target.value)}
                placeholder="Nhập địa chỉ"
              />
            </div>
            <div className="login-form-group">
              <label className="login-form-label">
                Email <span className="login-red">*</span>
              </label>
              <input
                type="email"
                required
                className="login-form-input"
                placeholder="Nhập email"
                value={identifier}
                onChange={(e) => {
                  setIdentifier(e.target.value);
                  setEmailError("");
                }}
              />
              {emailError && <span className="login-error">{emailError}</span>}
            </div>
            <div className="login-form-group">
              <label className="login-form-label">
                Mật khẩu <span className="login-red">*</span>
              </label>
              <div style={{ position: "relative" }}>
                <input
                  type={passwordVisible ? "text" : "password"}
                  required
                  className="login-form-input"
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
            <div className="login-form-group">
              <label className="login-form-label">
                Xác nhận mật khẩu <span className="login-red">*</span>
              </label>
              <div style={{ position: "relative" }}>
                <input
                  type={confirmPasswordVisible ? "text" : "password"}
                  required
                  className="login-form-input"
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
                <span className="login-error">{registrationError}</span>
              )}
            </div>
            <button type="submit" className="login-auth-button">
              <span>ĐĂNG KÝ</span>
            </button>
          </>
        )}
      </form>
    </div>
  );
};

export default Login;
