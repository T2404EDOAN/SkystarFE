import React, { useState } from "react";
import axios from "axios";
import { useAuth } from "../../context/AuthContext";
import { useNavigate } from "react-router-dom";
import { UserOutlined } from "@ant-design/icons";
import "./UserInfo.css";

interface UserFormData {
  fullName: string;
  dateOfBirth: string;
  phoneNumber: string;
  email: string;
}

interface PasswordFormData {
  currentPassword: string;
  newPassword: string;
  confirmPassword: string;
}

const UserInfo: React.FC = () => {
  const { user, isAuthenticated, updateUser } = useAuth();
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState("personal");
  const [message, setMessage] = useState({ type: "", content: "" });
  const [loading, setLoading] = useState(false);

  const [userFormData, setUserFormData] = useState<UserFormData>({
    fullName: user?.fullName || "",
    dateOfBirth: user?.dateOfBirth || "",
    phoneNumber: user?.phoneNumber || "",
    email: user?.email || "",
  });

  const [passwordFormData, setPasswordFormData] = useState<PasswordFormData>({
    currentPassword: "",
    newPassword: "",
    confirmPassword: "",
  });

  React.useEffect(() => {
    if (!isAuthenticated) {
      navigate("/login");
    }
  }, [isAuthenticated, navigate]);

  if (!user) {
    return null;
  }
  const handleUserInfoChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { id, value } = e.target;
    setUserFormData((prev) => ({
      ...prev,
      [id]: value,
    }));
  };
  const handlePasswordChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setPasswordFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };
  const handleUserInfoSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setMessage({ type: "", content: "" });

    try {
      const response = await axios.put(
        `http://35.175.173.235:8080/api/users/${user.id}`,
        userFormData
      );
      console.log(response.data);
      if (response.data.success) {
        setMessage({
          type: "success",
          content: "Cập nhật thông tin thành công!",
        });
        updateUser(response.data.user);
      }
    } catch (error) {
      if (axios.isAxiosError(error)) {
        setMessage({
          type: "error",
          content: error.response?.data?.message || "Cập nhật thất bại!",
        });
      }
    } finally {
      setLoading(false);
    }
  };
  const handlePasswordSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (passwordFormData.newPassword !== passwordFormData.confirmPassword) {
      setMessage({
        type: "error",
        content: "Mật khẩu mới và xác nhận mật khẩu không khớp!",
      });
      return;
    }

    setLoading(true);
    try {
      const verifyResponse = await axios.get(
        `http://35.175.173.235:8080/api/users/${user.id}`
      );

      if (verifyResponse.data.password !== passwordFormData.currentPassword) {
        setMessage({
          type: "error",
          content: "Mật khẩu cũ không chính xác!",
        });
        setLoading(false);
        return;
      }
      const response = await axios.put(
        `http://35.175.173.235:8080/api/users/${user.id}`,
        {
          ...verifyResponse.data,
          password: passwordFormData.newPassword,
        }
      );

      if (response.data.success) {
        setMessage({
          type: "success",
          content: "Đổi mật khẩu thành công!",
        });
      }
    } catch (error) {
      console.error("Password change error:", error);
      setMessage({
        type: "error",
        content: "Đổi mật khẩu thất bại!",
      });
    } finally {
      setLoading(false);
    }
    setPasswordFormData({
      currentPassword: "",
      newPassword: "",
      confirmPassword: "",
    });
  };
  const renderTabContent = () => {
    switch (activeTab) {
      case "personal":
        return (
          <div className="user-info">
            <form className="user-info-section" onSubmit={handleUserInfoSubmit}>
              <h3>Thông tin cá nhân</h3>
              {message.content && (
                <div className={`message ${message.type}`}>
                  {message.content}
                </div>
              )}
              <div className="info-mini-box">
                <div className="info-box">
                  <label htmlFor="fullName">Họ và tên</label>
                  <input
                    type="text"
                    id="fullName"
                    value={userFormData.fullName}
                    onChange={handleUserInfoChange}
                  />
                </div>
                <div className="info-box">
                  <label htmlFor="dateOfBirth">Ngày sinh</label>
                  <input
                    type="Date"
                    id="dateOfBirth"
                    value={userFormData.dateOfBirth}
                    onChange={handleUserInfoChange}
                  />
                </div>
              </div>
              <div className="info-mini-box">
                <div className="info-box">
                  <label htmlFor="phoneNumber">Số điện thoại</label>
                  <input
                    type="text"
                    id="phoneNumber"
                    value={userFormData.phoneNumber}
                    onChange={handleUserInfoChange}
                  />
                </div>
                <div className="info-box">
                  <label htmlFor="email">Email</label>
                  <input
                    type="email"
                    id="email"
                    value={userFormData.email}
                    onChange={handleUserInfoChange}
                  />
                </div>
              </div>
              <button className="submit-btn" type="submit" disabled={loading}>
                {loading ? "Đang lưu..." : "Lưu thông tin"}
              </button>
            </form>

            <form className="user-info-section" onSubmit={handlePasswordSubmit}>
              <h3>Đổi mật khẩu</h3>
              <div className="info-box">
                <label htmlFor="currentPassword">Mật khẩu cũ</label>
                <input
                  type="password"
                  name="currentPassword"
                  value={passwordFormData.currentPassword}
                  onChange={handlePasswordChange}
                  placeholder="Nhập mật khẩu cũ"
                  required
                />
              </div>
              <div className="info-box">
                <label htmlFor="newPassword">Mật khẩu mới</label>
                <input
                  type="password"
                  name="newPassword"
                  value={passwordFormData.newPassword}
                  onChange={handlePasswordChange}
                  placeholder="Nhập mật khẩu mới"
                  required
                />
              </div>
              <div className="info-box">
                <label htmlFor="confirmPassword">
                  Xác nhận lại mật khẩu mới
                </label>
                <input
                  type="password"
                  name="confirmPassword"
                  value={passwordFormData.confirmPassword}
                  onChange={handlePasswordChange}
                  placeholder="Nhập lại mật khẩu mới"
                  required
                />
              </div>
              <button className="submit-btn" type="submit" disabled={loading}>
                {loading ? "Đang xử lý..." : "Đổi mật khẩu"}
              </button>
            </form>
          </div>
        );
      case "member":
        return <div>Thông tin thành viên Cinestar</div>;
      case "history":
        return <div>Lịch sử mua hàng của bạn</div>;
      default:
        return null;
    }
  };

  return (
    <div className="container-info">
      <div className="main-conten-info-user">
        <h2>
          {activeTab === "personal" && "Thông tin khách hàng"}
          {activeTab === "member" && "Thành viên Cinestar"}
          {activeTab === "history" && "Lịch sử mua hàng"}
        </h2>
        {renderTabContent()}
      </div>
      <div className="sidebar">
        <div className="profile">
          <div className="profile-mini">
            <div className="info-img1">
              {user.avatarUrl ? (
                <img
                  className="img11"
                  src={user.avatarUrl}
                  alt={user.fullName}
                />
              ) : (
                <UserOutlined className="default-avatar-icon" />
              )}
            </div>
            <div className="info-mini1">
              <p>{user.fullName}</p>
              <span>Thay đổi ảnh đại diện</span>
            </div>
          </div>

          <div className="thong-tin-khach-hang">
            <ul>
              <li
                className={activeTab === "personal" ? "active" : ""}
                onClick={() => setActiveTab("personal")}
              >
                Thông tin cá nhân
              </li>
              <li
                className={activeTab === "member" ? "active" : ""}
                onClick={() => setActiveTab("member")}
              >
                Thành viên Cinestar
              </li>
              <li
                className={activeTab === "history" ? "active" : ""}
                onClick={() => setActiveTab("history")}
              >
                Lịch sử mua hàng
              </li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
};

export default UserInfo;
