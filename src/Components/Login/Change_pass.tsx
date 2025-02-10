import React, { useState } from "react";
import { Link } from "react-router";
import "./Change_pass.css";

const change_pass = () => {
  return (
    <div className="box_change_pass">
      <h2 className="title_change">QUÊN MẬT KHẨU</h2>
      <p className="des_change">
        Nhập địa chỉ email của bạn và chúng tôi sẽ gửi cho mật khẩu mới
      </p>
      <form>
        <div className="form-group">
          <input
            type="email"
            required
            className="form-input1"
            placeholder="Email"
          />
        </div>
        <button type="submit" className="auth-button1">
          <span>Gửi</span>
        </button>
      </form>
    </div>
  );
};
export default change_pass;
