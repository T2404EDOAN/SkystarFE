import React, { useState } from "react";
import { Card, Row, Col } from "react-bootstrap";
import anh1 from "../Images/1.png";
import anh2 from "../Images/2.png";
import anh3 from "../Images/3.png";
import anh4 from "../Images/4.png";
import "./Cinema.css";
import 'bootstrap-icons/font/bootstrap-icons.css';

// Dữ liệu nhập trực tiếp
const places = [
  { id: 1, name: "SKYSTAR HAI BÀ TRƯNG", tel: '0824678230', image: anh1, description: "SKYSTAR Hai Bà Trưng - 135 Hai Bà Trưng nằm tại trung tâm Quận 1, gần nhiều trường đại học, trung tâm văn hóa và thương mại. Với vị trí đắc địa này SKYSTAR Hai Bà Trưng là điểm đến giải trí ưa thích của nhiều khán giả trẻ. Với cam kết mang đến những trải nghiệm điện ảnh tuyệt vời nhất cùng giá vé hấp dẫn." },
  { id: 2, name: "SKYSTAR LÂM ĐỒNG", tel: '0288101001', image: anh2, description: "SKYSTAR Lâm Đồng - 713 QL20, Lâm Đồng, nằm tại trung tâm của tỉnh Lâm Đồng, là điểm đến giải trí phổ biến cho cộng đồng yêu thích điện ảnh trong khu vực. Với vị trí đắc địa, rạp SKYSTAR Lâm Đồng mang đến cho cả cư dân địa phương và du khách những trải nghiệm điện ảnh độc đáo trên màn ảnh rộng." },
  { id: 3, name: "SKYSTAR ĐÀ LẠT", tel: '0969688686', image: anh3, description: "SKYSTAR Đà Lạt - Quảng trường Lâm Viên, tọa lạc tại trung tâm thành phố Đà Lạt, là điểm đến giải trí lý tưởng cho cộng đồng yêu thích điện ảnh tại thành phố ngàn hoa này. Với vị trí đắc địa, SKYSTAR Đà Lạt thuận lợi cho cả cư dân địa phương và du khách thưởng thức các tác phẩm điện ảnh đa dạng trên màn ảnh rộng." },
  { id: 4, name: "SKYSTAR HUẾ", tel: '0355202002', image: anh4, description: "SKYSTAR Huế - 25 Hai Bà Trưng, TP.Huế, nằm tại trung tâm thành phố Huế, là điểm đến giải trí phổ biến với cộng đồng yêu điện ảnh tại vùng này. Với vị trí đắc địa, rạp SKYSTAR Huế thuận lợi cho cả cư dân địa phương và du khách thưởng thức các bộ phim đa dạng trên màn ảnh rộng." },
];

const PlaceCard = () => {
  return (
    <Row className="g-3">
      {places.map((place) => (
        <Col key={place.id} xs={12} sm={12} md={6} lg={6}>
          <HoverCard place={place} />
        </Col>
      ))}
    </Row>
  );
};

const HoverCard = ({ place }) => {
  const [hovered, setHovered] = useState(false);
  const email = "skystar@gmail.com";
  return (
    <Card
      style={{
        width: '100%',
        position: 'relative',
        overflow: 'hidden',
        borderRadius: '8px', // Tạo viền bo tròn cho card
      }}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
    >
      <Card.Img
        variant="top"
        src={place.image}
        alt={place.name}
        style={{
          transition: 'transform 0.3s ease-in-out',
          transform: hovered ? 'scale(1.1)' : 'scale(1)', // Phóng to ảnh khi hover
        }}
      />
      <Card.Body
        className="card-content"
        style={{
          position: 'absolute',
          bottom: 0,
          left: 0,
          width: '100%',
          background: 'rgba(0, 0, 0, 0.7)',
          color: 'white',
          transition: 'height 0.3s ease-in-out, padding 0.3s ease-in-out',
          height: hovered ? '100%' : '145px',
          padding: hovered ? '20px' : '10px',
          justifyContent: 'center',
          flexDirection: 'column',
        }}
      >
        <p className="fs-4 mt-4">{place.name}</p>
        <p className="fs-6">📞 {place.tel}</p>
        {hovered && <p>{place.description}</p>}
        {hovered && <div className="d-grid gap-2 col-3 mx-auto mb-5">
            <button className="btn btn-primary contact-but" type="button" style={{ fontFamily: "Anton, sans-serif" }}>
              <a href={`mailto:${email}`}>
                LIÊN HỆ NGAY
              </a> 
            </button>
          </div>} {/* Hiển thị số điện thoại khi hover */}
      </Card.Body>
    </Card>
  );
};

export default PlaceCard;
