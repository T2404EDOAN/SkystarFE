import React, { useState } from "react";
import axios from "axios";
import { useAuth } from "../../context/AuthContext";
import { useNavigate } from "react-router-dom";
import { Space, Table, Tag } from "antd";
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
interface DataType {
  key: React.Key;
  firstName: string;
  lastName: string;
  age: number;
  address: string;
  tags: string[];
}
interface Showtime {
  id: number;
  movieName: string;
  theatresName: string;
  theaterAddress: string;
}

interface BookingHistory {
  id: number;
  bookingNumber: string;
  showtime: Showtime;
  totalAmount: number;
  bookingDate: string;
  createdAt: string;
}

const UserInfo: React.FC = () => {
  const { user, isAuthenticated, updateUser } = useAuth();
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState("personal");
  const [message, setMessage] = useState({ type: "", content: "" });
  const [loading, setLoading] = useState(false);
  const { Column, ColumnGroup } = Table;
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
  const [bookingHistory, setBookingHistory] = useState<BookingHistory[]>([]);
  const [loadingHistory, setLoadingHistory] = useState(false);
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
        `http://localhost:8081/api/users/${user.id}`,
        userFormData
      );

      console.log("Update response:", response.data);

      if (response.status === 200) {
        // Cập nhật thông tin trong context
        updateUser({
          ...user,
          ...userFormData,
        });

        // Cập nhật form data với thông tin mới
        setUserFormData({
          fullName: userFormData.fullName,
          dateOfBirth: userFormData.dateOfBirth,
          phoneNumber: userFormData.phoneNumber,
          email: userFormData.email,
        });

        setMessage({
          type: "success",
          content: "Cập nhật thông tin thành công!",
        });
      }
    } catch (error) {
      console.error("Update error:", error);
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

    // Kiểm tra mật khẩu mới khớp không
    if (passwordFormData.newPassword !== passwordFormData.confirmPassword) {
      setMessage({
        type: "error",
        content: "Mật khẩu mới và xác nhận mật khẩu không khớp!",
      });
      return;
    }

    setLoading(true);
    try {
      // Verify mật khẩu cũ
      const verifyResponse = await axios.get(
        `http://localhost:8081/api/users/${user.id}`
      );

      // Kiểm tra mật khẩu cũ
      if (verifyResponse.data.password !== passwordFormData.currentPassword) {
        setMessage({
          type: "error",
          content: "Mật khẩu cũ không chính xác!",
        });
        return; // Return luôn khi sai mật khẩu cũ
      }

      // Thay đổi mật khẩu
      const response = await axios.put(
        `http://localhost:8081/api/users/${user.id}`,
        {
          ...verifyResponse.data,
          password: passwordFormData.newPassword,
        }
      );

      // Kiểm tra kết quả và reset form
      if (response.status === 200) {
        setMessage({
          type: "success",
          content: "Đổi mật khẩu thành công!",
        });

        // Reset form ngay sau khi thành công
        setPasswordFormData({
          currentPassword: "",
          newPassword: "",
          confirmPassword: "",
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
  };

  const fetchBookingHistory = async () => {
    setLoadingHistory(true);
    try {
      const response = await axios.get(
        `http://localhost:8081/api/bookings/${user.id}`
      );
      setBookingHistory(response.data);
    } catch (error) {
      console.error("Error fetching booking history:", error);
    } finally {
      setLoadingHistory(false);
    }
  };
  React.useEffect(() => {
    if (activeTab === "history") {
      fetchBookingHistory();
    }
  }, [activeTab]);

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
        return (
          <div className="user-info-section1">
            <Table<BookingHistory>
              dataSource={bookingHistory}
              pagination={false}
              loading={loadingHistory}
              rowKey="id"
            >
              <Column
                title="Mã Sản Phẩm"
                dataIndex="bookingNumber"
                key="bookingNumber"
              />
              <Column
                title="Tên Phim"
                dataIndex={["showtime", "movieName"]}
                key="movieName"
              />
              <Column
                title="Ngày Đặt"
                dataIndex="bookingDate"
                key="bookingDate"
                render={(date) => new Date(date).toLocaleDateString("vi-VN")}
              />
              <Column
                title="Địa chỉ"
                dataIndex={["showtime", "theaterAddress"]}
                key="theaterAddress"
              />
              <Column
                title="Tổng tiền"
                dataIndex="totalAmount"
                key="totalAmount"
                render={(amount) => `${amount.toLocaleString("vi-VN")} đ`}
              />
            </Table>
          </div>
        );
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
          <div className="c-friends">
            <h3>C'Friends</h3>
            <div className="tich-diem-c-friends">
              <span>0/10K</span>
            </div>
          </div>
          <div className="thong-tin-khach-hang">
            <h3>Thông tin khách hàng</h3>
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
