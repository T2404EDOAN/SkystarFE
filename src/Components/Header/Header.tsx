import React, { useState, useEffect, useRef } from "react";
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
    theatresId: number;
    theatresName: string;
    theaterAddress: string;
    // ... other showtime properties
  }[];
  // ... other movie properties
}

interface Theater {
  id: number;
  name: string;
  address: string;
}

const Header: React.FC = () => {
  const { isAuthenticated, user, logout, setSelectedTheater } = useAuth();
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [cinemas, setCinemas] = useState<Cinema[]>([]);
  const [error, setError] = useState<string | null>(null);
  const [showSearch, setShowSearch] = useState(false);
  const inputRef = useRef(null);
  const handleLogout = () => {
    logout();
    navigate("/");
  };

  const handleProfileClick = () => {
    navigate("/user-info");
  };
  const handleTheaterSelect = (theater: Theater) => {
    console.log("Selected theater:", theater);
    setSelectedTheater(theater);
    navigate("/books-ticket");
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
  const [theaters, setTheaters] = useState<Theater[]>([]);

  useEffect(() => {
    const fetchMoviesAndTheaters = async () => {
      try {
        setLoading(true);
        const response = await axios.get<{ content: Movie[] }>(
          "http://localhost:8081/api/movies"
        );

        // Extract unique theaters from movies' showtimes
        const uniqueTheaters = response.data.content.reduce(
          (acc: Theater[], movie) => {
            movie.showtimes?.forEach((showtime) => {
              const exists = acc.some(
                (theater) => theater.id === showtime.theatresId
              );
              if (!exists && showtime.theatresName) {
                acc.push({
                  id: showtime.theatresId,
                  name: showtime.theatresName,
                  address: showtime.theaterAddress,
                });
              }
            });
            return acc;
          },
          []
        );
        console.log("Fetched theaters:", uniqueTheaters);
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
  const handleClickOutside = (event) => {
    if (inputRef.current && !inputRef.current.contains(event.target)) {
      setShowSearch(false);
    }
  };

  useEffect(() => {
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);
  return (
    <header className="header">
      <div className="header-container">
        <div className="header-content">
          <div className="booking-section">
            <Link to="/" className="logo-link">
              <img src="/logo.png" alt="Logo" className="logo" />
            </Link>
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
            <Link to="/popcorn-drink">
              <Button
                type="primary"
                style={{ backgroundColor: "#663399", color: "#F8FAFC" }}
                className="action-button"
                id="popcorn-drink"
              >
                <img
                  src="https://cinestar.com.vn/assets/images/ic-cor.svg"
                  alt="ticket"
                  className="w-5 h-5"
                />
                <span>ĐẶT BẮP NƯỚC</span>
              </Button>
            </Link>
          </div>
          <div className="actions-section">
            <Input
              placeholder="Tìm phim, rạp"
              prefix={<SearchOutlined className="search-icon" />}
              className="search-bar"
            />
            <div id="search1">
              <Button
                icon={<SearchOutlined />}
                shape="circle"
                onClick={() => setShowSearch(true)}
              />
              {showSearch && (
                <div
                  ref={inputRef}
                  style={{
                    position: "fixed",
                    left: 0,
                    right: 0,
                    top: "70px", // Adjust this value based on your header height
                    background: "rgba(0,0,0,0.1)",
                    padding: "15px",
                    boxShadow: "0px 4px 6px rgba(0,0,0,0.1)",
                  }}
                  id="search2"
                >
                  <Input placeholder="Tìm kiếm..." autoFocus />
                </div>
              )}
            </div>
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
              <div className="dropdown-content">
                <Link to="/books-ticket" className="dropdown-item1">
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
              <Link to="/about" className="secondary-nav-link" id="about11">
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
