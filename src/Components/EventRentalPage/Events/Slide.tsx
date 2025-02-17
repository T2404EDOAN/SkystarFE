import React from 'react';
import { Carousel } from 'react-bootstrap';
import operaBanner from '../Images/opera-banner.png';
import opera2 from '../Images/opera2.jpg';
import opera3 from '../Images/opera.jpg';
import "./EventStar.css";

const Slide = () => {
  return (
    <>
    {/* Nhà hát Đà Lạt */}
    <section>
      <Carousel interval={null} controls={true} indicators={true}>
        <Carousel.Item>
          <img
            className="d-block w-100"
            src={operaBanner}
            alt="Slide 1"
          />
          <Carousel.Caption>
          </Carousel.Caption>
        </Carousel.Item>

        <Carousel.Item>
          <img
            className="d-block w-100"
            src={opera2}
            alt="Slide 2"
          />
          <Carousel.Caption>
          </Carousel.Caption>
        </Carousel.Item>

        <Carousel.Item>
          <img
            className="d-block w-100"
            src={opera3}
            alt="Slide 3"
          />
          <Carousel.Caption>
          </Carousel.Caption>
        </Carousel.Item>
      </Carousel>
    </section>
    </>
  );
};


export default Slide;
