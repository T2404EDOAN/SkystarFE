import React from "react";
import { Link } from "react-router";
import "./EntertaimentOptions.css";

const EntertaimentOptions = () => {
  return (
    <div className="box_entertaiment">
      <h1 className="title_entertaiment" style={{ fontFamily: "Anton, sans-serif" }}>TẤT CẢ CÁC GIẢI TRÍ</h1>
      <div className="content_entertaiment">
        <ul className="list_entertaiment">
          <li className="item_entertaiment">
            <Link to="/khu-tre-em">
              <img
                src="https://skystarimages.s3.us-east-1.amazonaws.com/banner/entKid.jpg"
                alt="kidzone"
                className="img_entertaiment"
              />
            </Link>
          </li>
          <li className="item_entertaiment">
            <Link to="/nha-hang">
              <img
                src="https://skystarimages.s3.us-east-1.amazonaws.com/banner/entMonngon.jpg"
                alt="restaurant"
                className="img_entertaiment"
              />
            </Link>
          </li>
          <li className="item_entertaiment">
            <Link to="/bowling">
              <img
                src="https://skystarimages.s3.us-east-1.amazonaws.com/banner/entBow.jpg"
                alt="bowling"
                className="img_entertaiment"
              />
            </Link>
          </li>
          <li className="item_entertaiment">
            <Link to="/billiard">
              <img
                src="https://skystarimages.s3.us-east-1.amazonaws.com/banner/entBil.jpg"
                alt="billiard"
                className="img_entertaiment"
              />
            </Link>
          </li>
          <li className="item_entertaiment">
            <Link to="/opera">
              <img
                src="https://skystarimages.s3.us-east-1.amazonaws.com/banner/entOpera.jpg"
                alt="opera"
                className="img_entertaiment"
              />
            </Link>
          </li>
          <li className="item_entertaiment">
            <Link to="/gym">
              <img
                src="https://skystarimages.s3.us-east-1.amazonaws.com/banner/entGym.jpg"
                alt="gym"
                className="img_entertaiment"
              />
            </Link>
          </li>
          <li className="item_entertaiment">
            <Link to="/coffee">
              <img
                src="https://skystarimages.s3.us-east-1.amazonaws.com/banner/entCf.jpg"
                alt="coffee"
                className="img_entertaiment"
              />
            </Link>
          </li>
        </ul>
      </div>
    </div>
  );
};

export default EntertaimentOptions;
