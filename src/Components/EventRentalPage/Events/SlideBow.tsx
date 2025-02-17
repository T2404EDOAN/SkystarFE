import React from 'react';
import { Carousel } from 'react-bootstrap';
import "./EventStar.css";
import bowling from '../Images/bowling.png';

const SlideBi = () => {
    return (
        <section>
        <Carousel interval={null} controls={true} indicators={true}>
        <Carousel.Item>
          <img
            className="d-block w-100"
            src={bowling}
            alt="Slide 1"
          />
          <Carousel.Caption>
          </Carousel.Caption>
        </Carousel.Item>
      </Carousel>
    </section>
  );
};

export default SlideBi;