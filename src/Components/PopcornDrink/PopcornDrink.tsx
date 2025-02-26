import React, { useState, useEffect }  from "react";
import { Link } from "react-router-dom";
import {  Row, Col, Button } from "react-bootstrap";
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.bundle.min.js'; 
import 'bootstrap-icons/font/bootstrap-icons.css';
import "./PopcornDrink.css";
import banner from "../PopcornDrink/ImagesPop/bannerPop.jpg";

const PopcornDrink = ({ onSelectionChange }) => {
    const [products, setProducts] = useState([]);
    const [quantities, setQuantities] = useState({});
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        fetchProducts();
    }, []);

    const fetchProducts = async () => {
        try {
            const response = await fetch('http://18.205.19.89:8080/api/products');
            if (!response.ok) {
                throw new Error('Network response was not ok');
            }
            const data = await response.json();
       
            setProducts(data.content);
            
            // Initialize quantities for all products
            const initialQuantities = {};
            data.content.forEach(product => {
                initialQuantities[product.id] = 0;
            });
            setQuantities(initialQuantities);
            
            setLoading(false);
        } catch (error) {
            setError(error.message);
            setLoading(false);
        }
    };

    const getProductsByCategory = (categoryCode) => {
        const filtered = products.filter(product => 
            product.category && product.category.code === categoryCode
        );
     
        return filtered;
    };

    const increaseQuantity = (id) => {
        setQuantities(prev => {
            const newQuantities = {
                ...prev,
                [id]: (prev[id] || 0) + 1
            };
            // Call the callback with updated selection
            const selectedProducts = products.filter(p => newQuantities[p.id] > 0)
                .map(p => ({
                    id: p.id,
                    name: p.name,
                    quantity: newQuantities[p.id],
                    price: p.basePrice,
                    category: p.category.name
                }));
            onSelectionChange(selectedProducts);
            return newQuantities;
        });
    };

    const decreaseQuantity = (id) => {
        setQuantities(prev => {
            const newQuantities = {
                ...prev,
                [id]: Math.max((prev[id] || 0) - 1, 0)
            };
            // Call the callback with updated selection
            const selectedProducts = products.filter(p => newQuantities[p.id] > 0)
                .map(p => ({
                    id: p.id,
                    name: p.name,
                    quantity: newQuantities[p.id],
                    price: p.basePrice,
                    category: p.category.name
                }));
            onSelectionChange(selectedProducts);
            return newQuantities;
        });
    };

    const getCategoryName = (categoryCode) => {
        const product = products.find(p => p.category.code === categoryCode);
        return product ? product.category.name.toUpperCase() : '';
    };

    if (loading) return <div>Loading...</div>;
    if (error) return <div>Error: {error}</div>;

    const comboProducts = getProductsByCategory('COMBO');
    const drinkProducts = getProductsByCategory('SOFT_DRINK');
    const waterProducts = getProductsByCategory('BOTTLED_WATER');
    const snackProducts = getProductsByCategory('SNACKS');

    return (
        <div>
            {/* COMBO Section */}
            {comboProducts.length > 0 && (
                <>
                    <h2 className="pop-title text-center">CHỌN {getCategoryName('COMBO')}</h2>
                    <Row mt={3}>
                        {comboProducts.map((product) => (
                            <Col xs={12} md={4} key={product.id}>
                                <div className="d-flex align-items-center pop-content mb-3">
                                    <div className="flex-shrink-0" style={{width: "40%"}}>
                                        <img 
                                            src={product.imageUrl || "default-image-url"} 
                                            alt={product.name} 
                                            className="img-fluid" 
                                            style={{ width: "100%", height: "auto" }} 
                                        />
                                    </div>
                                    <div className="flex-grow-1 ms-3">
                                        <h5 className="bold pop-name">{product.name}</h5>
                                        <p className="small pop-des">{product.description}</p>
                                        <p className="small pop-price">Giá: {product.basePrice || 'Liên hệ'}</p>
                                        <div className="d-flex align-items-center">
                                            <Button 
                                                variant="secondary" 
                                                onClick={() => decreaseQuantity(product.id)}
                                                className="pop-button" 
                                            >
                                                -
                                            </Button>
                                            <span className="mx-2" style={{fontSize: "15px"}}>
                                                {quantities[product.id] || 0}
                                            </span>
                                            <Button 
                                                variant="secondary"
                                                onClick={() => increaseQuantity(product.id)}
                                                className="pop-button" 
                                            >
                                                +
                                            </Button>
                                        </div>
                                    </div>
                                </div>
                            </Col>
                        ))}
                    </Row>
                </>
            )}

            {/* SOFT DRINK Section */}
            {drinkProducts.length > 0 && (
                <>
                    <h2 className="pop-title">CHỌN {getCategoryName('SOFT_DRINK')}</h2>
                    <Row mt={3}>
                        {drinkProducts.map((product) => (
                            <Col xs={12} md={4} key={product.id}>
                                <div className="d-flex align-items-center pop-content mb-3">
                                    <div className="flex-shrink-0" style={{width: "40%"}}>
                                        <img 
                                            src={product.imageUrl || "default-image-url"} 
                                            alt={product.name} 
                                            className="img-fluid" 
                                            style={{ width: "100%", height: "auto" }} 
                                        />
                                    </div>
                                    <div className="flex-grow-1 ms-3">
                                        <h5 className="bold pop-name">{product.name}</h5>
                                        <p className="small pop-price">Giá: {product.basePrice || 'Liên hệ'}</p>
                                        <div className="d-flex align-items-center">
                                            <Button 
                                                variant="secondary" 
                                                onClick={() => decreaseQuantity(product.id)}
                                                className="pop-button" 
                                            >
                                                -
                                            </Button>
                                            <span className="mx-2" style={{fontSize: "15px"}}>
                                                {quantities[product.id] || 0}
                                            </span>
                                            <Button 
                                                variant="secondary"
                                                onClick={() => increaseQuantity(product.id)}
                                                className="pop-button" 
                                            >
                                                +
                                            </Button>
                                        </div>
                                    </div>
                                </div>
                            </Col>
                        ))}
                    </Row>
                </>
            )}

            {/* BOTTLED WATER Section */}
            {waterProducts.length > 0 && (
                <>
                    <h2 className="pop-title">CHỌN {getCategoryName('BOTTLED_WATER')}</h2>
                    <Row mt={3}>
                        {waterProducts.map((product) => (
                            <Col xs={12} md={4} key={product.id}>
                                <div className="d-flex align-items-center pop-content mb-3">
                                    <div className="flex-shrink-0" style={{width: "40%"}}>
                                        <img 
                                            src={product.imageUrl || "default-image-url"} 
                                            alt={product.name} 
                                            className="img-fluid" 
                                            style={{ width: "100%", height: "auto" }} 
                                        />
                                    </div>
                                    <div className="flex-grow-1 ms-3">
                                        <h5 className="bold pop-name">{product.name}</h5>
                                        <p className="small pop-price">Giá: {product.basePrice || 'Liên hệ'}</p>
                                        <div className="d-flex align-items-center">
                                            <Button 
                                                variant="secondary" 
                                                onClick={() => decreaseQuantity(product.id)}
                                                className="pop-button" 
                                            >
                                                -
                                            </Button>
                                            <span className="mx-2" style={{fontSize: "15px"}}>
                                                {quantities[product.id] || 0}
                                            </span>
                                            <Button 
                                                variant="secondary"
                                                onClick={() => increaseQuantity(product.id)}
                                                className="pop-button" 
                                            >
                                                +
                                            </Button>
                                        </div>
                                    </div>
                                </div>
                            </Col>
                        ))}
                    </Row>
                </>
            )}

            {/* SNACKS Section */}
            {snackProducts.length > 0 && (
                <>
                    <h2 className="pop-title">CHỌN {getCategoryName('SNACKS')}</h2>
                    <Row mt={3} className="pop-bot">
                        {snackProducts.map((product) => (
                            <Col xs={12} md={4} key={product.id}>
                                <div className="d-flex align-items-center pop-content mb-3">
                                    <div className="flex-shrink-0" style={{width: "40%"}}>
                                        <img 
                                            src={product.imageUrl || "default-image-url"} 
                                            alt={product.name} 
                                            className="img-fluid" 
                                            style={{ width: "100%", height: "auto" }} 
                                        />
                                    </div>
                                    <div className="flex-grow-1 ms-3">
                                        <h5 className="bold pop-name">{product.name}</h5>
                                        <p className="small pop-price">Giá: {product.basePrice || 'Liên hệ'}</p>
                                        <div className="d-flex align-items-center">
                                            <Button 
                                                variant="secondary" 
                                                onClick={() => decreaseQuantity(product.id)}
                                                className="pop-button" 
                                            >
                                                -
                                            </Button>
                                            <span className="mx-2" style={{fontSize: "15px"}}>
                                                {quantities[product.id] || 0}
                                            </span>
                                            <Button 
                                                variant="secondary"
                                                onClick={() => increaseQuantity(product.id)}
                                                className="pop-button" 
                                            >
                                                +
                                            </Button>
                                        </div>
                                    </div>
                                </div>
                            </Col>
                        ))}
                    </Row>
                </>
            )}
        </div>
    );
};

export default PopcornDrink;