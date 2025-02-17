import React from 'react';
import { Carousel } from 'react-bootstrap';
import "./EventStar.css";
import billiard from '../Images/billiard.jpg';
import bi2 from '../Images/bi2.png';

const SlideBi = () => {
    return (
        <section>
        <Carousel interval={null} controls={true} indicators={true}>
        <Carousel.Item>
          <img
            className="d-block w-100"
            src={billiard}
            alt="Slide 1"
          />
          <Carousel.Caption>
          </Carousel.Caption>
        </Carousel.Item>

        <Carousel.Item>
          <img
            className="d-block w-100"
            src={bi2}
            alt="Slide 2"
          />
          <Carousel.Caption>
          </Carousel.Caption>
        </Carousel.Item>
      </Carousel>
    </section>
  );
};

export default SlideBi;