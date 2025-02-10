import React, { useState } from 'react';
import { useAuth } from '../../context/AuthContext';
import { useNavigate } from 'react-router-dom';
import './UserInfo.css';

const UserInfo: React.FC = () => {
  const { user, isAuthenticated } = useAuth();
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState('personal');

  // Redirect if not authenticated
  React.useEffect(() => {
    if (!isAuthenticated) {
      navigate('/login');
    }
  }, [isAuthenticated, navigate]);

  if (!user) {
    return null;
  }

  const renderTabContent = () => {
    switch (activeTab) {
      case 'personal':
        return (
          <div className="user-info">
            <div className="user-info-section">
              <h3>Thông tin cá nhân</h3>
              <div className="form-row">
                <div className="form-group">
                  <label htmlFor="name">Họ và tên:</label>
                  <input type="text" id="name" value={user.fullName} readOnly />
                </div>
                <div className="form-group">
                  <label htmlFor="birthDate">Ngày sinh:</label>
                  <input type="text" id="birthDate" value={user.dateOfBirth} readOnly />
                </div>
              </div>
              <div className="form-row">
                <div className="form-group">
                  <label htmlFor="phone">Số điện thoại:</label>
                  <input type="text" id="phone" value={user.phoneNumber} readOnly />
                </div>
                <div className="form-group">
                  <label htmlFor="email">Email:</label>
                  <input type="email" id="email" value={user.email} readOnly />
                </div>
              </div>
            </div>
            
            <div className="user-info-section">
              <h3>Đổi mật khẩu</h3>
              <button className="submit-btn" onClick={() => navigate('/change_pass')}>
                Đổi mật khẩu
              </button>
            </div>
          </div>
        );
      case 'member':
        return <div>Thông tin thành viên Cinestar</div>;
      case 'history':
        return <div>Lịch sử mua hàng của bạn</div>;
      default:
        return null;
    }
  };

  return (
    <div className="container">
      <div className="main-content">
        <h2>
          {activeTab === 'personal' && 'Thông tin khách hàng'}
          {activeTab === 'member' && 'Thành viên Cinestar'}
          {activeTab === 'history' && 'Lịch sử mua hàng'}
        </h2>
        {renderTabContent()}
      </div>
      <div className="sidebar">
        <div className="profile">
          <h2>{user.fullName}</h2>
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
                className={activeTab === 'personal' ? 'active' : ''}
                onClick={() => setActiveTab('personal')}
              >
                Thông tin cá nhân
              </li>
              <li 
                className={activeTab === 'member' ? 'active' : ''}
                onClick={() => setActiveTab('member')}
              >
                Thành viên Cinestar
              </li>
              <li 
                className={activeTab === 'history' ? 'active' : ''}
                onClick={() => setActiveTab('history')}
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