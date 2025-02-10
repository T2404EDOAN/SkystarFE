import React from "react";
import { Link } from "react-router";
import "./EntertaimentOptions.css";

const EntertaimentOptions = () => {
  return (
    <div className="box_entertaiment">
      <h1 className="title_entertaiment">TẤT CẢ CÁC GIẢI TRÍ</h1>
      <div className="content_entertaiment">
        <ul className="list_entertaiment">
          <li className="item_entertaiment">
            <Link to="/khu-tre-em">
              <img
                src="https://api-website.cinestar.com.vn/media/entertainment_images/s/e/service-1_1_.png"
                alt="kidzone"
                className="img_entertaiment"
              />
            </Link>
          </li>
          <li className="item_entertaiment">
            <Link to="/nha-hang">
              <img
                src="https://api-website.cinestar.com.vn/media/entertainment_images/r/e/rectangle_3463983_1_.png"
                alt="restaurant"
                className="img_entertaiment"
              />
            </Link>
          </li>
          <li className="item_entertaiment">
            <Link to="/bowling">
              <img
                src="https://api-website.cinestar.com.vn/media/entertainment_images/b/o/bowling-dt-2_1_.png"
                alt="bowling"
                className="img_entertaiment"
              />
            </Link>
          </li>
          <li className="item_entertaiment">
            <Link to="/billiard">
              <img
                src="https://api-website.cinestar.com.vn/media/entertainment_images/b/i/billards-dt-2_1_.png"
                alt="billiard"
                className="img_entertaiment"
              />
            </Link>
          </li>
          <li className="item_entertaiment">
            <Link to="/opera">
              <img
                src="https://api-website.cinestar.com.vn/media/entertainment_images/o/p/opera-dt-2_1_.png"
                alt="opera"
                className="img_entertaiment"
              />
            </Link>
          </li>
          <li className="item_entertaiment">
            <Link to="/gym">
              <img
                src="https://api-website.cinestar.com.vn/media/entertainment_images/g/y/gym-dt-2_1_.png"
                alt="gym"
                className="img_entertaiment"
              />
            </Link>
          </li>
          <li className="item_entertaiment">
            <Link to="/coffee">
              <img
                src="https://api-website.cinestar.com.vn/media/entertainment_images/c/o/coffee-dt-2_1_.png"
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
