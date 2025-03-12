import React, { useState, useEffect, useRef } from "react";
import { Link, useNavigate, useLocation } from "react-router-dom";
import { useAuth } from "../../context/AuthContext";
import "./Header.css";
import { Input, Button, Dropdown, Menu, Typography, Row, Col } from "antd";
import { SearchOutlined, DownOutlined } from "@ant-design/icons";
import type { MenuProps, Avatar } from "antd";
import axios from "axios";
import { useMediaQuery } from "react-responsive";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faBars } from "@fortawesome/free-solid-svg-icons";

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

interface SearchResult {
  id: number;
  title: string;
  posterUrl?: string;
}

const Header: React.FC = () => {
  const { isAuthenticated, user, logout, setSelectedTheater } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();
  const [loading, setLoading] = useState(false);
  const [cinemas, setCinemas] = useState<Cinema[]>([]);
  const [error, setError] = useState<string | null>(null);
  const [showSearch, setShowSearch] = useState(false);
  const inputRef = useRef(null);
  const isTabletOrMobile = useMediaQuery({ query: "(max-width: 1224px)" });
  const [menuOpen, setMenuOpen] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");
  const [searchResults, setSearchResults] = useState<SearchResult[]>([]);
  const [selectedDate, setSelectedDate] = useState<string>();
  const [selectedTheaterForSearch, setSelectedTheaterForSearch] =
    useState<Theater>();

  const toggleMenu = () => {
    setMenuOpen(!menuOpen);
  };

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
          "https://skystar.io.vn/api/movies"
        );
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

  const isActive = (path: string) => {
    return location.pathname === path;
  };

  const handleSearch = async (value: string) => {
    setSearchTerm(value);
    if (value.trim()) {
      try {
        const searchQuery = new URLSearchParams();
        // Kiểm tra giá trị có khớp với tên rạp không
        const isTheaterSearch = theaters.some(
          (theater) =>
            theater.name.toLowerCase().includes(value.toLowerCase()) ||
            theater.address.toLowerCase().includes(value.toLowerCase())
        );

        if (isTheaterSearch) {
          searchQuery.append("cinemaName", value.trim());
        } else {
          // Ngược lại search theo tên phim
          searchQuery.append("movieTitle", value.trim());
        }

        navigate(`/search?${searchQuery.toString()}`);
        setShowSearch(false);
        setSearchTerm("");
      } catch (error) {
        console.error("Search error:", error);
      }
    }
  };

  const searchBox = (
    <div className="search-container">
      <Input
        placeholder="Nhập tên phim hoặc tên rạp để tìm kiếm"
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
        onPressEnter={(e) => handleSearch(searchTerm)}
        prefix={<SearchOutlined className="search-icon" />}
        className="search-bar"
      />
    </div>
  );

  return (
    <header className="header">
      <div className={`header-container ${isTabletOrMobile ? "mobile" : ""}`}>
        <div className="header-content">
          <div className="booking-section">
            <Link to="/" className="logo-link">
              <img src="/logo.png" alt="Logo" className="logo" />
            </Link>
            {/* {isTabletOrMobile && (
              <FontAwesomeIcon
                icon={faBars}
                className="menu-icon"
                onClick={toggleMenu}
              />
            )} */}
            {/* {!isTabletOrMobile && ( */}
            <>
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
            </>
            {/* )} */}
          </div>
          <div className="actions-section">
            <Input
              placeholder="Tìm phim, rạp"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              onPressEnter={() => handleSearch(searchTerm)}
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
                  <Input
                    placeholder="Tìm kiếm..."
                    autoFocus
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    onPressEnter={() => handleSearch(searchTerm)}
                  />
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
                    <img
                      src="https://cinestar.com.vn/assets/images/ic-header-auth.svg"
                      alt="user"
                      className="user-icon"
                    />
                  )}
                  <div className="user-text">{user?.fullName}</div>
                </div>
              </Dropdown>
            ) : (
              <Link to="/Login" className="user-actions">
                <img
                  src="https://cinestar.com.vn/assets/images/ic-header-auth.svg"
                  alt="user"
                  className="user-icon"
                />
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
                <Link
                  to="/books-ticket"
                  className={`dropdown-item1 ${
                    isActive("/books-ticket") ? "active" : ""
                  }`}
                >
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
                        color: isActive("/books-ticket") ? "#f3ea28" : "white",
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

              <Link
                to="/showtimes"
                className={`secondary-nav-link ${
                  isActive("/showtimes") ? "active" : ""
                }`}
              >
                Lịch chiếu
              </Link>
            </div>
            <div className="secondary-nav-item">
              <Link
                to="/promotions"
                className={`secondary-nav-link ${
                  isActive("/promotions") ? "active" : ""
                }`}
              >
                Khuyến mãi
              </Link>
              <Link
                to="/thue-su-kien"
                className={`secondary-nav-link ${
                  isActive("/thue-su-kien") ? "active" : ""
                }`}
              >
                Thuê sự kiện
              </Link>
              <Link
                to="/entertaiment"
                className={`secondary-nav-link ${
                  isActive("/entertaiment") ? "active" : ""
                }`}
              >
                Tất cả các giải trí
              </Link>
              <Link
                to="/about"
                className={`secondary-nav-link ${
                  isActive("/about") ? "active" : ""
                }`}
                id="about11"
              >
                Giới thiệu
              </Link>
            </div>
          </nav>
        </div>
      </div>

      {/* {isTabletOrMobile && (
        <div className={`mobile-menu ${menuOpen ? "open" : ""}`}>
          <Link to="/payment" onClick={toggleMenu}>
            ĐẶT VÉ NGAY
          </Link>
          <Link to="/popcorn-drink" onClick={toggleMenu}>
            ĐẶT BẮP NƯỚC
          </Link>
          <Link to="/showtimes" onClick={toggleMenu}>
            Lịch chiếu
          </Link>
          <Link to="/promotions" onClick={toggleMenu}>
            Khuyến mãi
          </Link>
          <Link to="/thue-su-kien" onClick={toggleMenu}>
            Thuê sự kiện
          </Link>
          <Link to="/entertaiment" onClick={toggleMenu}>
            Tất cả các giải trí
          </Link>
          <Link to="/about" onClick={toggleMenu}>
            Giới thiệu
          </Link>
        </div>
      )} */}
    </header>
  );
};

export default Header;
