import React from "react";
import { Link } from "react-router-dom";
import {  Row } from "react-bootstrap";
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.bundle.min.js'; 
import 'bootstrap-icons/font/bootstrap-icons.css';
import "./PopcornDrink.css";

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

const PopcornDrink = () => {
    return (
        <div>
            <header>
                <h2 className="pop-header">CHỌN RẠP GẦN BẠN</h2>
            </header>

            {/* select option */}
            
        </div>
    );
};
export default PopcornDrink;