import React, { useState } from "react";
import { Row, Col, Card } from "react-bootstrap";
import anh4344 from "../Images/IMG_4344.jpg";
import anh1 from "../Images/1.png";
import anh2 from "../Images/2.png";
import anh3 from "../Images/3.png";
import anh4 from "../Images/4.png";
import xinh from "../Images/xinh.png";
import iu from "../Images/iu.png";
import "./Cinema.css";
import 'bootstrap-icons/font/bootstrap-icons.css';
import PlaceCard from "./card";

interface Errors {
  fullName?: string;
  phone?: string;
  email?: string;
  agree?: string;
}

const places = [
  { id: 1, name: "SKYSTAR HAI BÀ TRƯNG - 135 Hai Bà Trưng, TP.HCM", tel: '0824678230', image: anh1, description: "SKYSTAR Hai Bà Trưng nằm tại trung tâm Quận 1, gần nhiều trường đại học, trung tâm văn hóa và thương mại. Với vị trí đắc địa này SKYSTAR Hai Bà Trưng là điểm đến giải trí ưa thích của nhiều khán giả trẻ. Với cam kết mang đến những trải nghiệm điện ảnh tuyệt vời nhất cùng giá vé hấp dẫn." },
  { id: 2, name: "SKYSTAR LÂM ĐỒNG - 713 QL20, Lâm Đồng", tel: '0288101001', image: anh2, description: "SKYSTAR Lâm Đồng, nằm tại trung tâm của tỉnh Lâm Đồng, là điểm đến giải trí phổ biến cho cộng đồng yêu thích điện ảnh trong khu vực. Với vị trí đắc địa, rạp SKYSTAR Lâm Đồng mang đến cho cả cư dân địa phương và du khách những trải nghiệm điện ảnh độc đáo trên màn ảnh rộng." },
  { id: 3, name: "SKYSTAR ĐÀ LẠT - Quảng trường Lâm Viên", tel: '0966262325', image: anh3, description: "SKYSTAR Đà Lạt, tọa lạc tại trung tâm thành phố Đà Lạt, là điểm đến giải trí lý tưởng cho cộng đồng yêu thích điện ảnh tại thành phố ngàn hoa này. Với vị trí đắc địa, SKYSTAR Đà Lạt thuận lợi cho cả cư dân địa phương và du khách thưởng thức các tác phẩm điện ảnh đa dạng trên màn ảnh rộng." },
  { id: 4, name: "SKYSTAR HUẾ - 25 Hai Bà Trưng, TP.Huế", tel: '0355202002', image: anh4, description: "SKYSTAR Huế, nằm tại trung tâm thành phố Huế, là điểm đến giải trí phổ biến với cộng đồng yêu điện ảnh tại vùng này. Với vị trí đắc địa, rạp SKYSTAR Huế thuận lợi cho cả cư dân địa phương và du khách thưởng thức các bộ phim đa dạng trên màn ảnh rộng." },
];

const Cinema = () => {
  const [fullName, setFullName] = useState('');
  const [phone, setPhone] = useState('');
  const [email, setEmail] = useState('');
  const [service, setService] = useState('Dịch vụ');
  const [location, setLocation] = useState('Khu vực');
  const [specialRequest, setSpecialRequest] = useState('');
  //const [successMessage, setSuccessMessage] = useState('');
  const [showModal, setShowModal] = useState(false); // State để kiểm soát alert
  const [errors, setErrors] = useState({});

  const validateField = (): boolean => {
    const newErrors: Errors = {};
    
    // Kiểm tra họ tên
    if (!fullName) newErrors.fullName = 'Vui lòng nhập họ tên.';
    
    // Kiểm tra số điện thoại
    const phoneRegex = /^\d{10}$/; // Định dạng số điện thoại (10 chữ số)
    if (!phone) {
      newErrors.phone = 'Vui lòng nhập điện thoại.';
    } else if (!phoneRegex.test(phone)) {
      newErrors.phone = 'Số điện thoại không hợp lệ.';
    }

    // Kiểm tra email
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/; // Định dạng email
    if (!email) {
      newErrors.email = 'Vui lòng nhập email.';
    } else if (!emailRegex.test(email)) {
      newErrors.email = 'Địa chỉ email không hợp lệ.';
    }
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault(); // Ngăn chặn hành vi mặc định của form

    if (!validateField()) {
      return; // Dừng nếu có lỗi
    }
    // validateField('name');
    // validateField('phone');
    // validateField('email');
  //   // Kiểm tra các trường nhập
  //   if (!fullName || !phone || !email || !location || !service) {
  //     alert("Vui lòng điền đầy đủ các trường bắt buộc.");
  //     return;
  //   }

    // Nếu tất cả trường đã được nhập, hiển thị thông báo thành công
    setShowModal(true);
    
    // Reset form nếu cần
    setFullName('');
    setPhone('');
    setEmail('');
    setLocation('');
    setService('');
    setSpecialRequest('');
    setErrors({});
  };

  const closeModal = () => {
    setShowModal(false);
  };

  const imageStyle = {
    width: '364px', // Kích thước cụ thể
    height: 'auto', // Chiều cao tự động

  };

  return (
    <div>
      {/* Phần 1: mô tả */}
      <div className="mt-5 mb-5">
        <Row gx={5}>
          <Col xs={12} lg={6} position="relative" >
            <h2 className="cinema-title" style={{ fontFamily: "Anton, sans-serif" }}>THUÊ RẠP TỔ CHỨC SỰ KIỆN</h2>
            <p className="cinema-p mb-3">Sự kiện ra mắt sản phẩm, họp công ty, hội nghị khách hàng...<br />
              Hỗ trợ sảnh rạp tổ chức đón khách, chụp hình thảm đỏ, tương tác với truyền thông tại chỗ
              Có nhiều kinh nghiệm tổ chức họp báo ra mắt phim, ra mắt MV ... SKYSTAR sẽ giúp bạn đưa sản phẩm tới công chúng gần hơn! <br />
              Liên hệ tư vấn vui lòng để thông tin ở bên dưới hoặc inbox fanpage SKYSTAR <br />
              Chúng tôi sẽ liên hệ sớm nhất có thể.</p>
          </Col>
          <Col xs={12} lg={6}>
            <img src={anh4344} alt="anh4344" className="img-fluid" />
          </Col>
        </Row>
      </div>

      {/* Phần 2: các địa điểm */}
      <div className="mt-5 mb-5">
        <h2 className="cinema-h2 md-6">CÁC CỤM ĐỊA ĐIỂM CHO THUÊ</h2>
        <PlaceCard />
      </div>

      {/* Phần 3: đặt lịch và đặt vé */}
      <div className="mt-5 mb-5">
        <h2 className="cinema-h2 mt-5">LIÊN HỆ: LẬP KẾ HOẠCH CÙNG SKYSTAR NGAY</h2>
        <Row>
          <Col md={8}>
            <Row>
              <Col md={6}>
              <img src={iu} alt="iu" style={imageStyle} className="small-image" />
              </Col>
          <Col md={6}>
            <form className="form-row needs-validation" noValidate onSubmit={handleSubmit}>
              <div className="mb-3 cinema-form-ct">
                <label htmlFor="validationFullName" className="cinema-form-label">Họ và Tên</label>
                <input
                  type="text"
                  className="form-control"
                  placeholder="Nhập họ và tên"
                  //id="validationFullName"
                  value={fullName}
                  onChange={(e) => setFullName(e.target.value)}
                  required
                />
                {errors.fullName && <div className="err-name" style={{ color: 'red', marginTop: '5px' }}>{errors.fullName}</div>}
                {/* <div className="valid-feedback">Looks good!</div> */}
              </div>

              <div className="mb-3 cinema-form-ct">
                <label htmlFor="validationPhone" className="cinema-form-label">Số Điện Thoại</label>
                <input
                  type="tel"
                  className="form-control"
                  placeholder="Nhập số điện thoại"
                  //id="validationPhone"
                  value={phone}
                  onChange={(e) => setPhone(e.target.value)}
                  required
                />
                {errors.phone && <div className="err-phone" style={{ color: 'red', marginTop: '5px' }}>{errors.phone}</div>}
                {/* <div className="valid-feedback">Looks good!</div> */}
              </div>

              <div className="mb-3 cinema-form-ct">
                <label htmlFor="validationEmail" className="cinema-form-label">Email</label>
                <input
                  type="email"
                  className="form-control"
                  placeholder="Nhập email"
                  //id="validationEmail"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                />
                {errors.email && <div className="err-email" style={{ color: 'red', marginTop: '5px' }}>{errors.email}</div>}
                {/* <div className="valid-feedback">Looks good!</div> */}
              </div>

              <div className="mb-3 cinema-form-ct">
                <label htmlFor="validationLocation" className="cinema-form-label">Chọn Địa Điểm</label>
                <select
                  className="form-select"
                  //id="validationLocation"
                  value={location}
                  onChange={(e) => setLocation(e.target.value)}
                  required
                >
                  {/* <option value="" disabled>Chọn...</option> */}
                  <option>SKYSTAR HAI BÀ TRƯNG - 135 Hai Bà Trưng, TP.HCM</option>
                  <option>SKYSTAR LÂM ĐỒNG - 713 QL20, Lâm Đồng</option>
                  <option>SKYSTAR ĐÀ LẠT - Quảng trường Lâm Viên</option>
                  <option>SKYSTAR HUẾ - 25 Hai Bà Trưng, TP.Huế</option>
                </select>
                {/* <div className="invalid-feedback">Please select a valid location.</div> */}
              </div>

              <div className="mb-3 cinema-form-ct">
                <label htmlFor="validationService" className="cinema-form-label">Chọn Dịch Vụ</label>
                <select
                  className="form-select"
                  //id="validationService"
                  value={service}
                  onChange={(e) => setService(e.target.value)}
                  required
                >
                  {/* <option value="" disabled>Chọn...</option> */}
                  <option>Cho Thuê Rạp Chiếu Phim</option>
                  <option>Nhà hát Đà Lạt Opera House</option>
                  <option>Nhà hàng món ngon</option>
                  <option>Trung tâm billiards</option>
                  <option>Khu vui chơi Kidzone</option>
                  <option>Trung tâm bowling</option>
                </select>
                {/* <div className="invalid-feedback">Please select a valid service.</div> */}
              </div>

              <div className="mb-3 cinema-form-ct">
                <label htmlFor="validationSpecialRequest" className="cinema-form-label">Hãy nói cho SKYSTAR biết những dự định của bạn nha</label>
                <textarea
                  className="form-control"
                  placeholder="Ghi chú / yêu cầu đặc biệt"
                  //id="validationSpecialRequest"
                  rows="3"
                  value={specialRequest}
                  onChange={(e) => setSpecialRequest(e.target.value)}
                ></textarea>
              </div>

              <div className="md-3 cinema-form-but">
                <button className="btn btn-primary cinema-submit-but" type="button" onClick={handleSubmit} style={{ fontFamily: "Anton, sans-serif" }}>
                  Gửi
                </button>
              </div>
            </form>
            {/* Modal thông báo */}
      {showModal && (
        <div className="cinema-modal">
          <div className="cinema-modal-content">
            <span className="cinema-close" onClick={closeModal}>&times;</span>
            <h2 className="cinema-h2">Thông báo</h2>
            <p className="cinema-p">Gửi thông tin thành công! <br /> Cảm ơn bạn đã liên hệ với SKYSTAR.</p>
            <button className="cinema-notii" onClick={closeModal}>Đồng ý</button>
          </div>
        </div>
      )}
          </Col>
        </Row>
        </Col>
        <Col md={4}>
          <img src={xinh} alt="xinh" style={imageStyle} className="small-image" />
        </Col>
        </Row>
      </div>
  </div >
  );
};

export default Cinema;