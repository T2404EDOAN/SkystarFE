import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../../context/AuthContext";
import "./Header.css";
import { Input, Button, Dropdown, Menu, Typography, Row, Col } from "antd";
import { SearchOutlined, UserOutlined, DownOutlined } from "@ant-design/icons";
import type { MenuProps, Avatar } from "antd";
import axios from "axios";
interface Movie {
  id: number;
  title: string;
  showtimes: {
    id: number;
    theatresName: string;
    theaterAddress: string;
    // ... other showtime properties
  }[];
  // ... other movie properties
}

const Header: React.FC = () => {
  const { isAuthenticated, user, logout, setSelectedTheater } = useAuth();
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [cinemas, setCinemas] = useState<Cinema[]>([]);
  const [error, setError] = useState<string | null>(null);

  const handleLogout = () => {
    logout();
    navigate("/");
  };

  const handleProfileClick = () => {
    navigate("/user-info");
  };
  const handleTheaterSelect = (theater: Theater) => {
    console.log("Selecting theater:", theater);
    setSelectedTheater(theater);
    navigate(`/books-ticket/${encodeURIComponent(theater.name)}`);
  };
  // Hàm chia thành nhóm 3 item
  const chunkArray = (arr, size) => {
    return arr.reduce(
      (acc, _, i) => (
        i % size ? acc[acc.length - 1].push(arr[i]) : acc.push([arr[i]]), acc
      ),
      []
    );
  };
  const [theaters, setTheaters] = useState<{ name: string; address: string }[]>(
    []
  );

  useEffect(() => {
    const fetchMoviesAndTheaters = async () => {
      try {
        setLoading(true);
        const response = await axios.get<{ content: Movie[] }>(
          "http://localhost:8080/api/movies"
        );

        // Extract unique theaters from movies' showtimes
        const uniqueTheaters = response.data.content.reduce(
          (acc: { name: string; address: string }[], movie) => {
            movie.showtimes?.forEach((showtime) => {
              const exists = acc.some(
                (theater) => theater.name === showtime.theatresName
              );
              if (!exists && showtime.theatresName) {
                acc.push({
                  name: showtime.theatresName,
                  address: showtime.theaterAddress,
                });
              }
            });
            return acc;
          },
          []
        );

        setTheaters(uniqueTheaters);
      } catch (err) {
        console.error("Error fetching theaters:", err);
        setError("Failed to load theaters");
      } finally {
        setLoading(false);
      }
    };

    fetchMoviesAndTheaters();
  }, []);
  const userMenuItems: MenuProps["items"] = [
    {
      label: "Thông tin tài khoản",
      key: "profile",
      onClick: handleProfileClick,
    },
    {
      label: "Đăng xuất",
      key: "logout",
      onClick: handleLogout,
    },
  ];

  return (
    <header className="header">
      <div className="header-container">
        <div className="header-content">
          {/* Division 1: Logo */}

          <Link to="/" className="logo-link">
            <img src="/logo.png" alt="Logo" className="logo" />
          </Link>

          {/* Division 2: Book Ticket Button */}
          <div className="booking-section">
            <Link to="/payment">
              <Button
                type="primary"
                style={{ backgroundColor: "#f3ea28", color: "black" }}
                className="action-button"
              >
                <img
                  src="https://cinestar.com.vn/assets/images/ic-ticket.svg"
                  alt="ticket"
                  className="w-5 h-5"
                />
                <span>ĐẶT VÉ NGAY</span>
              </Button>
            </Link>
          </div>

          {/* Division 3: Search and User Actions */}
          <div className="actions-section">
            {/* Popcorn Drink Button */}
            <Link to="/popcorn-drink">
              <Button
                type="primary"
                style={{ backgroundColor: "#663399", color: "#F8FAFC" }}
                className="action-button"
              >
                <img
                  src="https://cinestar.com.vn/assets/images/ic-cor.svg"
                  alt="ticket"
                  className="w-5 h-5"
                />
                <span>ĐẶT BẮP NƯỚC</span>
              </Button>
            </Link>

            {/* Search Bar */}
            <Input
              placeholder="Tìm phim, rạp"
              prefix={<SearchOutlined className="search-icon" />}
              className="search-bar"
            />
            {isAuthenticated ? (
              <Dropdown menu={{ items: userMenuItems }} placement="bottomRight">
                <div className="user-actions">
                  {user?.avatarUrl ? (
                    <img
                      src={user.avatarUrl}
                      className="user-avatar"
                      alt={user.fullName}
                    />
                  ) : (
                    <UserOutlined className="user-icon" />
                  )}
                  <div className="user-text">{user?.fullName}</div>
                </div>
              </Dropdown>
            ) : (
              <Link to="/Login" className="user-actions">
                <UserOutlined className="user-icon" />
                <div className="user-text">Đăng nhập</div>
              </Link>
            )}
          </div>
        </div>
      </div>

      {/* Secondary Navigation - Desktop Only */}
      <div className="secondary-nav secondary-nav-lg">
        <div className="secondary-nav-container">
          <nav className="secondary-nav-content">
            <div className="secondary-nav-item">
              {/* Dropdown Chọn Rạp */}

              <div className="dropdown-content">
                <Link to="/books-ticket" className="dropdown-item">
                  <Dropdown
                    overlay={
                      <Menu
                        style={{
                          width: 1200,
                          background: "#0d0d1f",
                          color: "white",
                          padding: "10px",
                        }}
                      >
                        <Row gutter={16}>
                          {chunkArray(theaters, 3).map((group, index) => (
                            <Col key={index} span={8}>
                              {group.map((theater, idx) => (
                                <Menu.Item
                                  key={`${index}-${idx}`}
                                  style={{ background: "transparent" }}
                                >
                                  <Typography.Text
                                    style={{
                                      color: "white",
                                      cursor: "pointer",
                                    }}
                                    onClick={() => handleTheaterSelect(theater)}
                                  >
                                    <div className="theater-menu-item">
                                      <div className="theater-name">
                                        {theater.name}
                                      </div>
                                    </div>
                                  </Typography.Text>
                                </Menu.Item>
                              ))}
                            </Col>
                          ))}
                        </Row>
                      </Menu>
                    }
                  >
                    <Typography.Text
                      style={{
                        color: "white",
                        cursor: "pointer",
                        fontSize: 16,
                      }}
                      className="choose-theater-text"
                    >
                      Chọn rạp
                    </Typography.Text>
                  </Dropdown>
                </Link>
              </div>

              <Link to="/showtimes" className="secondary-nav-link">
                Lịch chiếu
              </Link>
            </div>
            <div className="secondary-nav-item">
              <Link to="/promotions" className="secondary-nav-link">
                Khuyến mãi
              </Link>
              <Link to="/thue-su-kien" className="secondary-nav-link">
                Thuê sự kiện
              </Link>
              <Link to="/entertaiment" className="secondary-nav-link">
                Tất cả các giải trí
              </Link>
              <Link to="/about" className="secondary-nav-link">
                Giới thiệu
              </Link>
            </div>
          </nav>
        </div>
      </div>
    </header>
  );
};

export default Header;
