import React, { useState } from "react";
import {  Row } from "react-bootstrap";
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.bundle.min.js'; 
import Slide from './Slide';
import SlideRes from './SlideRes';
import SlideBi from './SlideBi';
import SlideKid from './SlideKid';
import SlideBow from './SlideBow';
import 'bootstrap-icons/font/bootstrap-icons.css';

// const links = [
//   { id: 1, text: "Quảng trường Lâm Viên, TP. Đà Lạt", url: "https://www.google.com/maps/place/DaLat+Opera+House/@11.9383092,108.4455185,17z/data=!3m1!4b1!4m6!3m5!1s0x3171133db2f125df:0x98fa32c981c37a70!8m2!3d11.9383092!4d108.4455185!16s%2Fg%2F11sjhnf5sv?entry=ttu&g_ep=EgoyMDI1MDIxMi4wIKXMDSoASAFQAw%3D%3D" },
//   { id: 2, text: "25 Hai Bà Trưng, Phường Vĩnh Ninh, TP. Huế", url: "https://www.google.com/maps/place/25+Hai+B%C3%A0+Tr%C6%B0ng,+V%C4%A9nh+Ninh,+Hu%E1%BA%BF,+Th%C3%A0nh+ph%E1%BB%91+Hu%E1%BA%BF/data=!4m2!3m1!1s0x3141a138fce34895:0x217b641a02326dca?sa=X&ved=1t:242&hl=vi&ictx=111" },
// ];

const EventStar = () => {
  const email = "skystar@gmail.com";
  return (
    <div className="box mt-5">
        <Row className="event-types">
          <h2 className="text-center">CÁC LOẠI HÌNH CHO THUÊ</h2>
        </Row>
        <Row>
          <p className="mb-5"> 
            SKYSTAR cung cấp nhiều hơn cả không gian; chúng tôi mang đến những trải nghiệm. Từ kịch tính nghẹt thở của một màn trình diễn sân khấu đến niềm vui nhẹ nhàng của một phòng bowling, chúng tôi có địa điểm hoàn hảo để biến tầm nhìn của bạn thành hiện thực. Cho dù đó là một buổi giao lưu xã hội, một sự kiện của công ty, hay một lễ kỷ niệm gia đình đáng trân trọng, chúng tôi sẽ giúp bạn tạo ra khoảnh khắc thực sự đáng nhớ.
          </p>
        </Row>

        {/* NHÀ HÁT ĐÀ LẠT OPERA HOUSE */}
        <Row>
          <h2 className="text-center">NHÀ HÁT ĐÀ LẠT OPERA HOUSE</h2>
          <p className="text-center mb-3">
            Sân khấu hoành tráng của nhà hát Opera, lung linh ánh đèn cho buổi hòa nhạc,<br /> vở kịch hoặc cuộc thi hoa hậu đáng nhớ tiếp theo của bạn.
          </p>
        </Row>
        <Row>
          <p className="text-center mb-2">Để biết thêm thông tin về việc thuê, vui lòng gọi: 0966262325</p>
        </Row>
        <Row className="text-center mb-2 color-icon">
          <div className="color-icon">
            <a href="https://www.google.com/maps/place/DaLat+Opera+House/@11.9383092,108.4455185,17z/data=!3m1!4b1!4m6!3m5!1s0x3171133db2f125df:0x98fa32c981c37a70!8m2!3d11.9383092!4d108.4455185!16s%2Fg%2F11sjhnf5sv?entry=ttu&g_ep=EgoyMDI1MDIxMi4wIKXMDSoASAFQAw%3D%3D" target="_blank" rel="noreferrer">
              <i className="bi bi-geo-alt"></i>
                Quảng trường Lâm Viên, TP. Đà Lạt
            </a>
          </div>
        </Row>
        <Row className="custom">
        <Slide />
          {/* slide */}
        </Row>   
        <Row>
          <div className="d-grid gap-2 col-2 mx-auto mb-5">
            <button className="btn btn-primary contact-but" type="button">
              <a href={`mailto:${email}`}>
                LIÊN HỆ NGAY
              </a> 
            </button>
          </div>
        </Row>

        {/* Nhà hàng món ngon */}
        <Row>
          <h2 className="text-center">NHÀ HÀNG MÓN NGON</h2>
          <p className="text-center mb-3">
          Để bữa tiệc của bạn trở nên thú vị, để những vị khách đặc biệt của bạn được phục vụ tốt nhất,<br/> Nhà hàng Món Ngon là lựa chọn không thể bỏ lỡ.
          </p>
        </Row>
        <Row>
          <p className="text-center mb-2">Để biết thêm thông tin về việc thuê, vui lòng gọi: 0966262325</p>
        </Row>
        <Row className="text-center mb-2">
          <ul className="list">
            <li className="list-item">
              <a href="https://www.google.com/maps/place/DaLat+Opera+House/@11.9383092,108.4455185,17z/data=!3m1!4b1!4m6!3m5!1s0x3171133db2f125df:0x98fa32c981c37a70!8m2!3d11.9383092!4d108.4455185!16s%2Fg%2F11sjhnf5sv?entry=ttu&g_ep=EgoyMDI1MDIxMi4wIKXMDSoASAFQAw%3D%3D" target="_blank" rel="noreferrer">
              <i className="bi bi-geo-alt"></i>
                Quảng trường Lâm Viên, TP. Đà Lạt
              </a>
            </li>
            <li className="list-item">
              <a href="https://www.google.com/maps/place/25+Hai+B%C3%A0+Tr%C6%B0ng,+V%C4%A9nh+Ninh,+Hu%E1%BA%BF,+Th%C3%A0nh+ph%E1%BB%91+Hu%E1%BA%BF/@16.4612733,107.5895545,17z/data=!3m1!4b1!4m6!3m5!1s0x3141a138fce34895:0x217b641a02326dca!8m2!3d16.4612733!4d107.5895545!16s%2Fg%2F11cs7d96yl?entry=ttu&g_ep=EgoyMDI1MDIxMi4wIKXMDSoASAFQAw%3D%3D" target="_blank" rel="noreferrer">
              <i className="bi bi-geo-alt"></i>
                25 Hai Bà Trưng, Phường Vĩnh Ninh, TP. Huế
              </a>
            </li>
          </ul>
        </Row>
        <Row className="custom">
        <SlideRes />
          {/* slide */}
        </Row>   
        <Row>
          <div className="d-grid gap-2 col-2 mx-auto mb-5">
            <button className="btn btn-primary contact-but" type="button">
              <a href={`mailto:${email}`}>
                LIÊN HỆ NGAY
              </a> 
            </button>
          </div>
        </Row>

        {/* Trung tâm Billiards */}
        <Row>
          <h2 className="text-center">TRUNG TÂM BILLIARDS</h2>
          <p className="text-center mb-3">
            Trung tâm C'Billiards quy mô rộng lớn và hiện đại sẵn sàng đồng hành cũng các giải đấu Bida cho các câu lạc bộ, <br/> đội nhóm hay doanh nghiệp.
          </p>
        </Row>
        <Row>
          <p className="text-center mb-2">Để biết thêm thông tin về việc thuê, vui lòng gọi: 0966262325</p>
        </Row>
        <Row className="text-center mb-2">
          <ul className="list">
            <li className="list-item">
              <a href="https://www.google.com/maps/place/DaLat+Opera+House/@11.9383092,108.4455185,17z/data=!3m1!4b1!4m6!3m5!1s0x3171133db2f125df:0x98fa32c981c37a70!8m2!3d11.9383092!4d108.4455185!16s%2Fg%2F11sjhnf5sv?entry=ttu&g_ep=EgoyMDI1MDIxMi4wIKXMDSoASAFQAw%3D%3D" target="_blank" rel="noreferrer">
              <i className="bi bi-geo-alt"></i>
                Quảng trường Lâm Viên, TP. Đà Lạt
              </a>
            </li>
            <li className="list-item">
              <a href="https://www.google.com/maps/place/25+Hai+B%C3%A0+Tr%C6%B0ng,+V%C4%A9nh+Ninh,+Hu%E1%BA%BF,+Th%C3%A0nh+ph%E1%BB%91+Hu%E1%BA%BF/@16.4612733,107.5895545,17z/data=!3m1!4b1!4m6!3m5!1s0x3141a138fce34895:0x217b641a02326dca!8m2!3d16.4612733!4d107.5895545!16s%2Fg%2F11cs7d96yl?entry=ttu&g_ep=EgoyMDI1MDIxMi4wIKXMDSoASAFQAw%3D%3D" target="_blank" rel="noreferrer">
              <i className="bi bi-geo-alt"></i>
                25 Hai Bà Trưng, Phường Vĩnh Ninh, TP. Huế
              </a>
            </li>
          </ul>
        </Row>
        <Row className="custom">
        <SlideBi />
          {/* slide */}
        </Row>   
        <Row>
          <div className="d-grid gap-2 col-2 mx-auto mb-5">
            <button className="btn btn-primary contact-but" type="button">
              <a href={`mailto:${email}`}>
                LIÊN HỆ NGAY
              </a> 
            </button>
          </div>
        </Row>

        {/* Khu vui chơi KidZone */}
        <Row>
          <h2 className="text-center">KHU VUI CHƠI KIDZONE</h2>
          <p className="text-center mb-3">
          Để các bé có không gian vui chơi và giao lưu,<br /> C'Kidzone với không gian rộng lớn, sạch sẽ và hiện đại sẵn sàng đem đến cho các bé những kỷ niệm vui chơi thật ý nghĩa.
          </p>
        </Row>
        <Row>
          <p className="text-center mb-2">Để biết thêm thông tin về việc thuê, vui lòng gọi: 0966262325</p>
        </Row>
        <Row className="text-center mb-2">
          <ul className="list">
            <li className="list-item">
              <a href="https://www.google.com/maps/place/DaLat+Opera+House/@11.9383092,108.4455185,17z/data=!3m1!4b1!4m6!3m5!1s0x3171133db2f125df:0x98fa32c981c37a70!8m2!3d11.9383092!4d108.4455185!16s%2Fg%2F11sjhnf5sv?entry=ttu&g_ep=EgoyMDI1MDIxMi4wIKXMDSoASAFQAw%3D%3D" target="_blank" rel="noreferrer">
              <i className="bi bi-geo-alt"></i>
                Quảng trường Lâm Viên, TP. Đà Lạt
              </a>
            </li>
            <li className="list-item">
              <a href="https://www.google.com/maps/place/25+Hai+B%C3%A0+Tr%C6%B0ng,+V%C4%A9nh+Ninh,+Hu%E1%BA%BF,+Th%C3%A0nh+ph%E1%BB%91+Hu%E1%BA%BF/@16.4612733,107.5895545,17z/data=!3m1!4b1!4m6!3m5!1s0x3141a138fce34895:0x217b641a02326dca!8m2!3d16.4612733!4d107.5895545!16s%2Fg%2F11cs7d96yl?entry=ttu&g_ep=EgoyMDI1MDIxMi4wIKXMDSoASAFQAw%3D%3D" target="_blank" rel="noreferrer">
              <i className="bi bi-geo-alt"></i>
                25 Hai Bà Trưng, Phường Vĩnh Ninh, TP. Huế
              </a>
            </li>
          </ul>
        </Row>
        <Row className="custom">
        <SlideKid />
          {/* slide */}
        </Row>   
        <Row>
          <div className="d-grid gap-2 col-2 mx-auto mb-5">
            <button className="btn btn-primary contact-but" type="button">
              <a href={`mailto:${email}`}>
                LIÊN HỆ NGAY
              </a> 
            </button>
          </div>
        </Row>

        {/* Trung tâm Bowling */}
        <Row>
          <h2 className="text-center">TRUNG TÂM BOWLING</h2>
          <p className="text-center mb-3">
          Trung tâm C'Bowling hiện đại và đẳng cấp sẵn sàng đồng hành cùng bạn trong các giải đấu chuyên nghiệp cho các câu lạc bộ, hội thao.
          </p>
        </Row>
        <Row>
          <p className="text-center mb-2">Để biết thêm thông tin về việc thuê, vui lòng gọi: 0966262325</p>
        </Row>
        <Row className="text-center mb-2">
          <ul className="list">
            <li className="list-item">
              <a href="https://www.google.com/maps/place/DaLat+Opera+House/@11.9383092,108.4455185,17z/data=!3m1!4b1!4m6!3m5!1s0x3171133db2f125df:0x98fa32c981c37a70!8m2!3d11.9383092!4d108.4455185!16s%2Fg%2F11sjhnf5sv?entry=ttu&g_ep=EgoyMDI1MDIxMi4wIKXMDSoASAFQAw%3D%3D" target="_blank" rel="noreferrer">
              <i className="bi bi-geo-alt"></i>
                Quảng trường Lâm Viên, TP. Đà Lạt
              </a>
            </li>
            <li className="list-item">
              <a href="https://www.google.com/maps/place/25+Hai+B%C3%A0+Tr%C6%B0ng,+V%C4%A9nh+Ninh,+Hu%E1%BA%BF,+Th%C3%A0nh+ph%E1%BB%91+Hu%E1%BA%BF/@16.4612733,107.5895545,17z/data=!3m1!4b1!4m6!3m5!1s0x3141a138fce34895:0x217b641a02326dca!8m2!3d16.4612733!4d107.5895545!16s%2Fg%2F11cs7d96yl?entry=ttu&g_ep=EgoyMDI1MDIxMi4wIKXMDSoASAFQAw%3D%3D" target="_blank" rel="noreferrer">
              <i className="bi bi-geo-alt"></i>
                25 Hai Bà Trưng, Phường Vĩnh Ninh, TP. Huế
              </a>
            </li>
          </ul>
        </Row>
        <Row className="custom">
        <SlideBow />
          {/* slide */}
        </Row>   
        <Row>
          <div className="d-grid gap-2 col-2 mx-auto mb-5">
            <button className="btn btn-primary contact-but" type="button">
              <a href={`mailto:${email}`}>
                LIÊN HỆ NGAY
              </a> 
            </button>
          </div>
        </Row>
    </div>
  );
};

export default EventStar;