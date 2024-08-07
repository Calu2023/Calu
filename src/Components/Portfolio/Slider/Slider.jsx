import React from "react";
import "./slider.css";
import arrow_L from "../../Home/icon_arrow_left.webp";
import arrow_R from "./icon_arrow_right.webp";
import Carousel from "react-multi-carousel";
import "react-multi-carousel/lib/styles.css";

function Slider({ children }) {
  const responsive = {
    desktop: {
      breakpoint: { max: 3000, min: 1024 },
      items: 3,
    },
    tablet: {
      breakpoint: { max: 1280, min: 464 },
      items: 2,
    },
    mobile: {
      breakpoint: { max: 767, min: 0 },
      items: 1,
    },
  };

  const CustomLeftArrow = ({ onClick }) => (
    <div onClick={onClick}>
      <img src={arrow_L} alt=" <= " className="arrowL" />
    </div>
  );

  const CustomRightArrow = ({ onClick }) => (
    <div onClick={onClick}>
      <img src={arrow_R} alt=" => " className="arrowR" />
    </div>
  );

  return (
    <div className="carousel">
      <Carousel
        containerClass="carousel-container"
        swipeable={true}
        draggable={false}
        infinite={true}
        responsive={responsive}
        showDots={true}
        customLeftArrow={<CustomLeftArrow />}
        customRightArrow={<CustomRightArrow />}
        itemClass="carouselItem"
        autoPlay={true}
        autoPlaySpeed={4500}
      >
        {React.Children.map(children, (child, index) => (
          <div key={index}>{child}</div>
        ))}
      </Carousel>
    </div>
  );
}

export default Slider;
