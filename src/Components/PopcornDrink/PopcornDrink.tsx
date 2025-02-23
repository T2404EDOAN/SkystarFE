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
import snack from "../PopcornDrink/ImagesPop/snack.png";

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

const selectDrinks = [
    { id: 1, name: "SPRITE 32OZ", price: "37.000đ"},
    { id: 2, name: "COCA-COLA ZERO 32OZ", price: "37.000đ"},
    { id: 3, name: "COCA-COLA 32OZ", price: "37.000đ"},
    { id: 4, name: "FANTA 32OZ", price: "37.000đ"},
    { id: 5, name: "NƯỚC CAM TEPPY 327ML", price: "28.000đ"},
    { id: 6, name: "NƯỚC SUỐI DASANI 500ML", price: "20.000đ"},
    { id: 7, name: "TRÀ Ô LONG TEA PLUS 450ML", price: "28.000đ"}
];

const selectSnack = [
    { id: 1, name: "SNACK THÁI", price: "25.000đ"},
    { id: 2, name: "SNACK POCA TÙY VỊ 32G", price: "20.000đ"},
    { id: 3, name: "KHOAI TÂY LAY'S STAX 100G", price: "59.000"},
    { id: 4, name: "POCA PARTYZ 30-33G", price: "20.000đ"},
    { id: 5, name: "POCA KHOAI TÂY 54G", price: "28.000đ"}
]

const PopcornDrink = () => {
    const [quantities, setQuantities] = useState({ 1: 0, 2: 0, 3: 0, 4: 0, 5: 0, 6: 0, 7: 0 }); // Khởi tạo số lượng cho mỗi combo

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
                <h2 className="pop-header">CHỌN ĐỒ ĂN / THỨC UỐNG</h2>
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

            {/* COMBO */}
            <h2 className="pop-title">CHỌN COMBO</h2>
            <Row mt={3}>
            
                <Col xs={12} md={6}>
                    <div className="d-flex align-items-center pop-content mb-3">
                        <img src={combo1} alt={selectCombo[0].name} className="img-fluid me-3" style={{ width: "200px", height: "auto" }} />
                        <div>
                            <h5 className="bold pop-name">{selectCombo[0].name}</h5>
                            <p className="small pop-des">{selectCombo[0].description}</p>
                            <p className="pop-des">Miễn phí đổi vị bắp Caramel, bắp phô mai và được tùy chọn snack.</p>
                            <div>
                                <p className="small pop-price">Giá: {selectCombo[0].price}</p>
                                <div className="d-flex align-items-center">
                                    <Button 
                                        variant="secondary" 
                                        onClick={() => decreaseQuantity(selectCombo[0].id)}
                                        className="pop-button" 
                                    >
                                        -
                                    </Button>
                                    <span className="mx-2" style={{fontSize: "15px"}}>{quantities[selectCombo[0].id]}</span>
                                    <Button 
                                        variant="secondary"
                                        onClick={() => increaseQuantity(selectCombo[0].id)}
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

            {/* NƯỚC NGỌT */}
            <h2 className="pop-title">CHỌN NƯỚC NGỌT</h2>
            <Row mt={3}>
                <Col xs={12} md={6}>
                    <div className="d-flex align-items-center pop-content mb-3">
                        <img src="https://api-website.cinestar.com.vn/media/.thumbswysiwyg/pictures/HinhQuayconnew/sprite.png?rand=1719572953" alt={selectCombo[3].name} className="img-fluid me-3" style={{ width: "180px", height: "auto" }} />
                        <div>
                            <h5 className="bold pop-name">{selectDrinks[0].name}</h5>
                            <div>
                                <p className="small pop-price">Giá: {selectDrinks[0].price}</p>
                                <div className="d-flex align-items-center">
                                    <Button 
                                        variant="secondary" 
                                        onClick={() => decreaseQuantity(selectDrinks[0].id)}
                                        className="pop-button" 
                                    >
                                        -
                                    </Button>
                                    <span className="mx-2" style={{fontSize: "15px"}}>{quantities[selectDrinks[0].id]}</span>
                                    <Button 
                                        variant="secondary"
                                        onClick={() => increaseQuantity(selectDrinks[0].id)}
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
                        <img src="https://api-website.cinestar.com.vn/media/.thumbswysiwyg/pictures/HinhQuayconnew/COKE-ZERO.png?rand=1719573157" alt={selectCombo[3].name} className="img-fluid me-3" style={{ width: "180px", height: "auto" }} />
                        <div>
                            <h5 className="bold pop-name">{selectDrinks[1].name}</h5>
                            <div>
                                <p className="small pop-price">Giá: {selectDrinks[1].price}</p>
                                <div className="d-flex align-items-center">
                                    <Button 
                                        variant="secondary" 
                                        onClick={() => decreaseQuantity(selectDrinks[1].id)}
                                        className="pop-button" 
                                    >
                                        -
                                    </Button>
                                    <span className="mx-2" style={{fontSize: "15px"}}>{quantities[selectDrinks[1].id]}</span>
                                    <Button 
                                        variant="secondary"
                                        onClick={() => increaseQuantity(selectDrinks[1].id)}
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
                        <img src="https://api-website.cinestar.com.vn/media/.thumbswysiwyg/pictures/HinhQuayconnew/coca.png?rand=1719572301" alt={selectCombo[3].name} className="img-fluid me-3" style={{ width: "180px", height: "auto" }} />
                        <div>
                            <h5 className="bold pop-name">{selectDrinks[2].name}</h5>
                            <div>
                                <p className="small pop-price">Giá: {selectDrinks[2].price}</p>
                                <div className="d-flex align-items-center">
                                    <Button 
                                        variant="secondary" 
                                        onClick={() => decreaseQuantity(selectDrinks[2].id)}
                                        className="pop-button" 
                                    >
                                        -
                                    </Button>
                                    <span className="mx-2" style={{fontSize: "15px"}}>{quantities[selectDrinks[2].id]}</span>
                                    <Button 
                                        variant="secondary"
                                        onClick={() => increaseQuantity(selectDrinks[2].id)}
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
                        <img src="https://api-website.cinestar.com.vn/media/.thumbswysiwyg/pictures/HinhQuayconnew/fanta.jpg?rand=1719572506" alt={selectCombo[3].name} className="img-fluid me-3" style={{ width: "180px", height: "auto" }} />
                        <div>
                            <h5 className="bold pop-name">{selectDrinks[3].name}</h5>
                            <div>
                                <p className="small pop-price">Giá: {selectDrinks[3].price}</p>
                                <div className="d-flex align-items-center">
                                    <Button 
                                        variant="secondary" 
                                        onClick={() => decreaseQuantity(selectDrinks[3].id)}
                                        className="pop-button" 
                                    >
                                        -
                                    </Button>
                                    <span className="mx-2" style={{fontSize: "15px"}}>{quantities[selectDrinks[3].id]}</span>
                                    <Button 
                                        variant="secondary"
                                        onClick={() => increaseQuantity(selectDrinks[3].id)}
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

            {/* NƯỚC ĐÓNG CHAI */}
            <h2 className="pop-title">CHỌN NƯỚC ĐÓNG CHAI</h2>
            <Row mt={3}>
                <Col xs={12} md={4}>
                    <div className="d-flex align-items-center pop-content mb-3">
                        <img src="https://product.hstatic.net/200000078749/product/3296823_nuoc_teppy_cam_tep_1l_38d73a84e2ca4966aca780a14de821c3_a250bcee73bb4fb1801b2dc44cf3c02b.jpg" alt={selectCombo[3].name} className="img-fluid me-3" style={{ width: "180px", height: "auto" }} />
                        <div>
                            <h5 className="bold pop-name">{selectDrinks[4].name}</h5>
                            <div>
                                <p className="small pop-price">Giá: {selectDrinks[4].price}</p>
                                <div className="d-flex align-items-center">
                                    <Button 
                                        variant="secondary" 
                                        onClick={() => decreaseQuantity(selectDrinks[4].id)}
                                        className="pop-button" 
                                    >
                                        -
                                    </Button>
                                    <span className="mx-2" style={{fontSize: "15px"}}>{quantities[selectDrinks[4].id]}</span>
                                    <Button 
                                        variant="secondary"
                                        onClick={() => increaseQuantity(selectDrinks[4].id)}
                                        className="pop-button" 
                                    >
                                        +
                                    </Button>
                                </div>
                            </div>
                        </div>
                    </div>
                </Col>
            
                <Col xs={12} md={4}>
                    <div className="d-flex align-items-center pop-content mb-3">
                        <img src="https://truongphatdat.com/wp-content/uploads/2019/12/Dasani-500ml.jpg" alt={selectCombo[3].name} className="img-fluid me-3" style={{ width: "180px", height: "auto" }} />
                        <div>
                            <h5 className="bold pop-name">{selectDrinks[5].name}</h5>
                            <div>
                                <p className="small pop-price">Giá: {selectDrinks[5].price}</p>
                                <div className="d-flex align-items-center">
                                    <Button 
                                        variant="secondary" 
                                        onClick={() => decreaseQuantity(selectDrinks[5].id)}
                                        className="pop-button" 
                                    >
                                        -
                                    </Button>
                                    <span className="mx-2" style={{fontSize: "15px"}}>{quantities[selectDrinks[5].id]}</span>
                                    <Button 
                                        variant="secondary"
                                        onClick={() => increaseQuantity(selectDrinks[5].id)}
                                        className="pop-button" 
                                    >
                                        +
                                    </Button>
                                </div>
                            </div>
                        </div>
                    </div>
                </Col>

                <Col xs={12} md={4}>
                    <div className="d-flex align-items-center pop-content mb-3">
                        <img src="https://famima.vn/wp-content/uploads/2023/11/Tra-O-long-vi-chanh-Tea-Plus-450ml-01-1.jpg" alt={selectCombo[3].name} className="img-fluid me-3" style={{ width: "180px", height: "auto" }} />
                        <div>
                            <h5 className="bold pop-name">{selectDrinks[6].name}</h5>
                            <div>
                                <p className="small pop-price">Giá: {selectDrinks[6].price}</p>
                                <div className="d-flex align-items-center">
                                    <Button 
                                        variant="secondary" 
                                        onClick={() => decreaseQuantity(selectDrinks[6].id)}
                                        className="pop-button" 
                                    >
                                        -
                                    </Button>
                                    <span className="mx-2" style={{fontSize: "15px"}}>{quantities[selectDrinks[6].id]}</span>
                                    <Button 
                                        variant="secondary"
                                        onClick={() => increaseQuantity(selectDrinks[6].id)}
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

            {/* SNACK */}
            <h2 className="pop-title">CHỌN SNACKS</h2>
            <Row mt={3} className="pop-bot">
                <Col xs={12} md={4}>
                    <div className="d-flex align-items-center pop-content mb-3">
                        <img src={snack} alt={selectCombo[3].name} className="img-fluid me-3" style={{ width: "180px", height: "auto" }} />
                        <div>
                            <h5 className="bold pop-name">{selectSnack[0].name}</h5>
                            <div>
                                <p className="small pop-price">Giá: {selectSnack[0].price}</p>
                                <div className="d-flex align-items-center">
                                    <Button 
                                        variant="secondary" 
                                        onClick={() => decreaseQuantity(selectSnack[0].id)}
                                        className="pop-button" 
                                    >
                                        -
                                    </Button>
                                    <span className="mx-2" style={{fontSize: "15px"}}>{quantities[selectSnack[0].id]}</span>
                                    <Button 
                                        variant="secondary"
                                        onClick={() => increaseQuantity(selectSnack[0].id)}
                                        className="pop-button" 
                                    >
                                        +
                                    </Button>
                                </div>
                            </div>
                        </div>
                    </div>
                </Col>
            
                <Col xs={12} md={4}>
                    <div className="d-flex align-items-center pop-content mb-3">
                        <img src="https://www.laysvietnam.com/wp-content/uploads/2019/03/POCA.png" alt={selectCombo[3].name} className="img-fluid me-3" style={{ width: "180px", height: "auto" }} />
                        <div>
                            <h5 className="bold pop-name">{selectSnack[1].name}</h5>
                            <div>
                                <p className="small pop-price">Giá: {selectSnack[1].price}</p>
                                <div className="d-flex align-items-center">
                                    <Button 
                                        variant="secondary" 
                                        onClick={() => decreaseQuantity(selectSnack[1].id)}
                                        className="pop-button" 
                                    >
                                        -
                                    </Button>
                                    <span className="mx-2" style={{fontSize: "15px"}}>{quantities[selectSnack[1].id]}</span>
                                    <Button 
                                        variant="secondary"
                                        onClick={() => increaseQuantity(selectSnack[1].id)}
                                        className="pop-button" 
                                    >
                                        +
                                    </Button>
                                </div>
                            </div>
                        </div>
                    </div>
                </Col>

                <Col xs={12} md={4}>
                    <div className="d-flex align-items-center pop-content mb-3">
                        <img src="https://www.laysvietnam.com/wp-content/uploads/2019/03/lays-stax-malaysia-20220531-1.png" alt={selectCombo[3].name} className="img-fluid me-3" style={{ width: "180px", height: "auto" }} />
                        <div>
                            <h5 className="bold pop-name">{selectSnack[2].name}</h5>
                            <div>
                                <p className="small pop-price">Giá: {selectSnack[2].price}</p>
                                <div className="d-flex align-items-center">
                                    <Button 
                                        variant="secondary" 
                                        onClick={() => decreaseQuantity(selectSnack[2].id)}
                                        className="pop-button" 
                                    >
                                        -
                                    </Button>
                                    <span className="mx-2" style={{fontSize: "15px"}}>{quantities[selectSnack[2].id]}</span>
                                    <Button 
                                        variant="secondary"
                                        onClick={() => increaseQuantity(selectSnack[2].id)}
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

            {/* <Row mt={3} className="justify-content-center pop-bot">
                <Col xs={12} md={5}>
                    <div className="d-flex align-items-center pop-content mb-3">
                        <img src="https://www.laysvietnam.com/wp-content/uploads/2019/03/POCA.png" alt={selectCombo[3].name} className="img-fluid me-3" style={{ width: "180px", height: "auto" }} />
                        <div>
                            <h5 className="bold pop-name">{selectSnack[3].name}</h5>
                            <div>
                                <p className="small pop-price">Giá: {selectSnack[3].price}</p>
                                <div className="d-flex align-items-center">
                                    <Button 
                                        variant="secondary" 
                                        onClick={() => decreaseQuantity(selectSnack[3].id)}
                                        className="pop-button" 
                                    >
                                        -
                                    </Button>
                                    <span className="mx-2" style={{fontSize: "15px"}}>{quantities[selectSnack[3].id]}</span>
                                    <Button 
                                        variant="secondary"
                                        onClick={() => increaseQuantity(selectSnack[3].id)}
                                        className="pop-button" 
                                    >
                                        +
                                    </Button>
                                </div>
                            </div>
                        </div>
                    </div>
                </Col>

                <Col xs={12} md={5}>
                    <div className="d-flex align-items-center pop-content mb-3">
                        <img src="https://www.laysvietnam.com/wp-content/uploads/2019/03/POCA.png" alt={selectCombo[3].name} className="img-fluid me-3" style={{ width: "180px", height: "auto" }} />
                        <div>
                            <h5 className="bold pop-name">{selectSnack[4].name}</h5>
                            <div>
                                <p className="small pop-price">Giá: {selectSnack[4].price}</p>
                                <div className="d-flex align-items-center">
                                    <Button 
                                        variant="secondary" 
                                        onClick={() => decreaseQuantity(selectSnack[4].id)}
                                        className="pop-button" 
                                    >
                                        -
                                    </Button>
                                    <span className="mx-2" style={{fontSize: "15px"}}>{quantities[selectSnack[4].id]}</span>
                                    <Button 
                                        variant="secondary"
                                        onClick={() => increaseQuantity(selectSnack[4].id)}
                                        className="pop-button" 
                                    >
                                        +
                                    </Button>
                                </div>
                            </div>
                        </div>
                    </div>
                </Col>
            </Row> */}
        </div>
    );
};
export default PopcornDrink;