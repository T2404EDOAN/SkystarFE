import React from "react";
import { Link } from "react-router-dom";
import "./Header.css";
import { Input, Button, Dropdown } from "antd";
import { SearchOutlined, UserOutlined } from "@ant-design/icons";
import type { MenuProps } from "antd";

const Header: React.FC = () => {
  const items: MenuProps['items'] = [
    {
      label: 'Rạp 1',
      key: '1',
    },
    {
      label: 'Rạp 2',
      key: '2',
    },
    {
      label: 'Rạp 3',
      key: '3',
    },
  ];

  return (
    <header className="header">
      {/* Main Header */}
      <div className="header-container">
        <div className="header-content">
          {/* Logo Section */}
          <div className="logo-section">
            <Link to="/" className="logo-section">
              <img src="/logo.png" alt="Logo" className="logo" />
              <span className="logo-text">SKYSTAR</span>
            </Link>
          </div>

          {/* Desktop Navigation */}
          <div className="desktop-nav desktop-nav-lg">
            {/* Action Buttons */}
            <div className="flex space-x-4">
              <Link to="/booking">
                <Button type="primary" style={{ backgroundColor: '#f3ea28', color: 'black' }} className="action-button">
                  <img
                    src="https://cinestar.com.vn/assets/images/ic-ticket.svg"
                    alt="ticket"
                    className="w-5 h-5"
                  />
                  <span>ĐẶT VÉ NGAY</span>
                </Button>
              </Link>
            </div>

            {/* Search Bar */}
            <Input
              placeholder="Tìm phim, rạp"
              prefix={<SearchOutlined className="search-icon" />}
              className="search-bar"
            />

            {/* User Actions */}
            <Link to="/login" className="user-actions">
              <UserOutlined className="user-icon" />
              <div className="user-text">Đăng nhập</div>
            </Link>
          </div>
        </div>
      </div>

      {/* Secondary Navigation - Desktop Only */}
      <div className="secondary-nav secondary-nav-lg">
        <div className="secondary-nav-container">
          <nav className="secondary-nav-content">
            <div className="secondary-nav-item">
              {/* Dropdown Chọn Rạp */}
              <Dropdown menu={{ items }} placement="bottom">
                <div className="dropdown-content">
                  <UserOutlined className="dropdown-icon" />
                  <span>Chọn rạp</span>
                </div>
              </Dropdown>

              <Link to="/showtimes" className="secondary-nav-link">Lịch chiếu</Link>
            </div>
            <div className="secondary-nav-item">
              <Link to="/promotions" className="secondary-nav-link">Khuyến mãi</Link>
              <Link to="/events" className="secondary-nav-link">Thuê sự kiện</Link>
              <Link to="/entertainment" className="secondary-nav-link">Tất cả các giải trí</Link>
              <Link to="/about" className="secondary-nav-link">Giới thiệu</Link>
            </div>
          </nav>
        </div>
      </div>
    </header>
  );
};

export default Header;