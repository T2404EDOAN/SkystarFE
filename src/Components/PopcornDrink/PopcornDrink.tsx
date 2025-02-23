import React, { useState }  from "react";
import { Link } from "react-router-dom";
import {  Row, Col, Button } from "react-bootstrap";
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.bundle.min.js'; 
import 'bootstrap-icons/font/bootstrap-icons.css';
import "./PopcornDrink.css";
import banner from "../PopcornDrink/ImagesPop/bannerPop.jpg";
import combo1 from "../PopcornDrink/ImagesPop/combo1.jpeg";
import combo2 from "../PopcornDrink/ImagesPop/combo2.jpeg";
import combo3 from "../PopcornDrink/ImagesPop/combo3.jpeg";
import combo4 from "../PopcornDrink/ImagesPop/combo4.jpeg";

const selectPlaces = [
    { id: 1, name: "SkyStar Quốc Thanh (TP. HCM)" },
    { id: 2, name: "SkyStar Hai Bà Trưng (TP. HCM)" },
    { id: 3, name: "SkyStar Lâm Viên (TP. Lâm Đồng)" },
    { id: 4, name: "SkyStar Đà Lạt (TP. Đà Lạt)" },
    { id: 5, name: "SkyStar Huế (TP. Huế)" },
    { id: 6, name: "SkyStar Sinh Viên (Bình Dương"},
    { id: 7, name: "SkyStar Mỹ Tho (Tiền Giang)" },
    { id: 8, name: "SkyStar Kiên Giang (Kiên Giang)" },
];

const selectCombo = [
    { id: 1, name: "PREMIUM COMBO 1", price: "129.000đ", description: "02 Ly nước ngọt size L + 01 Hộp bắp lớn + 01 Snack"},
    { id: 2, name: "PREMIUM COMBO 2", price: "109.000đ", description: "01 Ly nước ngọt size L + 01 Hộp bắp lớn + 01 Snack"},
    { id: 3, name: "MY COMBO 1", price: "109.000đ", description: "02 Ly nước ngọt size L + 01 Hộp bắp ngọt lớn"},
    { id: 4, name: "MY COMBO 2", price: "89.000đ", description: "01 Ly nước ngọt size L + 01 Hộp bắp ngọt lớn"},
];

const PreCombo = () => {
    return (
        <Row className="g-3">
            {selectCombo.map((combo) => (
                <Col key={combo.id} xs={12} sm={6} md={4} lg={3}>
                    <div className="d-flex align-items-center combo-card">
                        {/* <img src={combo1} alt={combo.name} className="img-fluid me-3" style={{ width: "150px", height: "auto" }} /> */}
                        <div>
                            <h5>{combo.name}</h5>
                            <p>{combo.description}</p>
                            <p>{combo.price}</p>
                        </div>
                    </div>
                </Col>
            ))}
        </Row>
    );
};

const PopcornDrink = () => {
    const [quantities, setQuantities] = useState({ 1: 0, 2: 0, 3: 0, 4: 0 }); // Khởi tạo số lượng cho mỗi combo

    const increaseQuantity = (id) => {
        setQuantities(prevQuantities => ({
            ...prevQuantities,
            [id]: prevQuantities[id] + 1
        }));
    };

    const decreaseQuantity = (id) => {
        setQuantities(prevQuantities => ({
            ...prevQuantities,
            [id]: Math.max(prevQuantities[id] - 1, 0) // Đảm bảo không giảm xuống dưới 0
        }));
    };

    const combo = selectCombo[0];

    return (
        <div>
            <header>
                <img src={banner} alt="banner" className="img-fluid"/>
                <h2 className="pop-header">CHỌN COMBO</h2>
            </header>

            {/* select option */}
            {/* <Row mt={3}>
                <Col xs={12}>
                    <div className="d-flex align-items-center pop-content">
                        <img src={combo1} alt={combo.name} className="img-fluid me-3" style={{ width: "200px", height: "auto" }} />
                        <div>
                            <h5 className="bold pop-name">{combo.name}</h5>
                            <p className="small pop-des">{combo.description}</p>
                            <p className="pop-des">- Miễn phí đổi vị bắp Caramel, đổi vị Milo, đổi vị phô mai.</p>
                            <p className="small pop-price">Giá: {combo.price}</p>
                        </div>
                    </div>
                </Col>
            </Row>
            <Row>
                <Col xs={12}>
                    <div className="d-flex align-items-center">
                        <img src={combo2} alt={combo.name} className="img-fluid me-3" style={{ width: "200px", height: "auto" }} />
                        <div className="pop-content">
                            <h5 className="bold">{combo.name}</h5>
                            <p className="small">{combo.description}</p>
                            <p className="small">Giá: {combo.price}</p>
                        </div>
                    </div>
                </Col>
            </Row> */}
            
            <Row mt={3}>
            
                <Col xs={12} md={6}>
                    <div className="d-flex align-items-center pop-content mb-3">
                        <img src={combo1} alt={combo.name} className="img-fluid me-3" style={{ width: "200px", height: "auto" }} />
                        <div>
                            <h5 className="bold pop-name">{combo.name}</h5>
                            <p className="small pop-des">{combo.description}</p>
                            <p className="pop-des">Miễn phí đổi vị bắp Caramel, bắp phô mai và được tùy chọn snack.</p>
                            <div>
                                <p className="small pop-price">Giá: {combo.price}</p>
                                <div className="d-flex align-items-center">
                                    <Button 
                                        variant="secondary" 
                                        onClick={() => decreaseQuantity(combo.id)}
                                        className="pop-button" 
                                    >
                                        -
                                    </Button>
                                    <span className="mx-2" style={{fontSize: "15px"}}>{quantities[combo.id]}</span>
                                    <Button 
                                        variant="secondary"
                                        onClick={() => increaseQuantity(combo.id)}
                                        className="pop-button" 
                                    >
                                        +
                                    </Button>
                                </div>
                            </div>
                        </div>
                    </div>
                </Col>
               
                <Col xs={12} md={6}>
                    <div className="d-flex align-items-center pop-content mb-3">
                        <img src={combo2} alt={selectCombo[1].name} className="img-fluid me-3" style={{ width: "200px", height: "auto" }} />
                        <div>
                            <h5 className="bold pop-name">{selectCombo[1].name}</h5>
                            <p className="small pop-des">{selectCombo[1].description}</p>
                            <p className="pop-des">Miễn phí đổi vị bắp Caramel, bắp phô mai và được tùy chọn snack.</p>
                            <div>
                                <p className="small pop-price">Giá: {selectCombo[1].price}</p>
                                <div className="d-flex align-items-center">
                                    <Button 
                                        variant="secondary" 
                                        onClick={() => decreaseQuantity(selectCombo[1].id)}
                                        className="pop-button" 
                                    >
                                        -
                                    </Button>
                                    <span className="mx-2" style={{fontSize: "15px"}}>{quantities[selectCombo[1].id]}</span>
                                    <Button 
                                        variant="secondary"
                                        onClick={() => increaseQuantity(selectCombo[1].id)}
                                        className="pop-button" 
                                    >
                                        +
                                    </Button>
                                </div>
                            </div>
                        </div>
                    </div>
                </Col>
                
            </Row>

            <Row mt={3}>
                <Col xs={12} md={6}>
                    <div className="d-flex align-items-center pop-content mb-3">
                        <img src={combo3} alt={selectCombo[2].name} className="img-fluid me-3" style={{ width: "200px", height: "auto" }} />
                        <div>
                            <h5 className="bold pop-name">{selectCombo[2].name}</h5>
                            <p className="small pop-des">{selectCombo[2].description}</p>
                            <p className="pop-des">Có phụ thu thêm khi đổi vị bắp Caramel, bắp Milo, bắp phô mai.</p>
                            <div>
                                <p className="small pop-price">Giá: {selectCombo[2].price}</p>
                                <div className="d-flex align-items-center">
                                    <Button 
                                        variant="secondary" 
                                        onClick={() => decreaseQuantity(selectCombo[2].id)}
                                        className="pop-button" 
                                    >
                                        -
                                    </Button>
                                    <span className="mx-2" style={{fontSize: "15px"}}>{quantities[selectCombo[2].id]}</span>
                                    <Button 
                                        variant="secondary"
                                        onClick={() => increaseQuantity(selectCombo[2].id)}
                                        className="pop-button" 
                                    >
                                        +
                                    </Button>
                                </div>
                            </div>
                        </div>
                    </div>
                </Col>

                <Col xs={12} md={6}>
                <div className="d-flex align-items-center pop-content mb-3">
                        <img src={combo4} alt={selectCombo[3].name} className="img-fluid me-3" style={{ width: "200px", height: "auto" }} />
                        <div>
                            <h5 className="bold pop-name">{selectCombo[3].name}</h5>
                            <p className="small pop-des">{selectCombo[3].description}</p>
                            <p className="pop-des">Có phụ thu thêm khi đổi vị bắp Caramel, bắp Milo, bắp phô mai.</p>
                            <div>
                                <p className="small pop-price">Giá: {selectCombo[3].price}</p>
                                <div className="d-flex align-items-center">
                                    <Button 
                                        variant="secondary" 
                                        onClick={() => decreaseQuantity(selectCombo[3].id)}
                                        className="pop-button" 
                                    >
                                        -
                                    </Button>
                                    <span className="mx-2" style={{fontSize: "15px"}}>{quantities[selectCombo[3].id]}</span>
                                    <Button 
                                        variant="secondary"
                                        onClick={() => increaseQuantity(selectCombo[3].id)}
                                        className="pop-button" 
                                    >
                                        +
                                    </Button>
                                </div>
                            </div>
                        </div>
                    </div>
                </Col>
            </Row>

            <h2 className="pop-header">NƯỚC NGỌT</h2>
            <h2 className="pop-header">NƯỚC ĐÓNG CHAI</h2>

            <h2 className="pop-header">SNACKS</h2>
        </div>
    );
};
export default PopcornDrink;