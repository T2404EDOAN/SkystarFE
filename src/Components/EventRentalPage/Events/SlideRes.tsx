import React from 'react';
import { Carousel } from 'react-bootstrap';
import restaurant from '../Images/restaurant.jpg';
import res2 from '../Images/res2.jpg';
import res3 from '../Images/res3.jpeg';
import "./EventStar.css";

const SlideRes = () => {
    return (
        <section>
        <Carousel interval={null} controls={true} indicators={true}>
        <Carousel.Item>
          <img
            className="d-block w-100"
            src={restaurant}
            alt="Slide 1"
          />
          <Carousel.Caption>
          </Carousel.Caption>
        </Carousel.Item>

        <Carousel.Item>
          <img
            className="d-block w-100"
            src={res2}
            alt="Slide 2"
          />
          <Carousel.Caption>
          </Carousel.Caption>
        </Carousel.Item>

        <Carousel.Item>
          <img
            className="d-block w-100"
            src={res3}
            alt="Slide 3"
          />
          <Carousel.Caption>
          </Carousel.Caption>
        </Carousel.Item>
      </Carousel>
    </section>
  );
};

export default SlideRes;