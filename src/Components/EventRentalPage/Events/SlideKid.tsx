import React from 'react';
import { Carousel } from 'react-bootstrap';
import "./EventStar.css";
import kidzone from '../Images/kidzone.jpg';
import kid2 from '../Images/kid2.jpg';
import kid3 from '../Images/kid3.jpg';
// import kid4 from '../Images/kid4.jpg';

const SlideKid = () => {
    return (
        <section>
        <Carousel interval={null} controls={true} indicators={true}>
        <Carousel.Item>
          <img
            className="d-block w-100"
            src={kidzone}
            alt="Slide 1"
          />
          <Carousel.Caption>
          </Carousel.Caption>
        </Carousel.Item>

        <Carousel.Item>
          <img
            className="d-block w-100"
            src={kid2}
            alt="Slide 2"
          />
          <Carousel.Caption>
          </Carousel.Caption>
        </Carousel.Item>

        <Carousel.Item>
          <img
            className="d-block w-100"
            src={kid3}
            alt="Slide 3"
          />
          <Carousel.Caption>
          </Carousel.Caption>
        </Carousel.Item>
      </Carousel>
    </section>
  );
};

export default SlideKid;