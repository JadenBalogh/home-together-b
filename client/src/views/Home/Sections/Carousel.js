/*
 * @Author: AA
 * @Date: 2021-01-28 08:15:15
 * @LastEditors: AA
 * @LastEditTime: 2021-01-29 05:51:51
 * @FilePath: /src/views/Home/Sections/Carousel.js
 */
import React from "react";
// Import plugin resources
import { Container } from "@material-ui/core";

// This plugin resources
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

// Import  dependent resources of this component
import "./assets/scss/Carousel.scss";
import image1 from "./assets/images/carousel/1.jpg";
import image2 from "./assets/images/carousel/2.jpg";
import image3 from "./assets/images/carousel/3.jpg";

export default function Carousel() {
  var settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    autoplay: true,
  };
  return (
    <Slider {...settings} className="home-carousel">
      <div className="home-carousel-item">
        <div
          className="home-carousel-container"
          style={{ backgroundImage: "url(" + image1 + ")" }}
        >
          <Container className="home-carousel-caption">
            <h1>This is AA's design</h1>
            <p>
              Thank you very much for reviewing the web.
            </p>
          </Container>
        </div>
      </div>
      <div className="home-carousel-item">
        <div
          className="home-carousel-container"
          style={{ backgroundImage: "url(" + image2 + ")" }}
        >
          <Container className="home-carousel-caption">
            <h1>This is AA's design</h1>
            <p>
              Thank you very much for reviewing the web.
            </p>
          </Container>
        </div>
      </div>
      <div className="home-carousel-item">
        <div
          className="home-carousel-container"
          style={{ backgroundImage: "url(" + image3 + ")" }}
        >
          <Container className="home-carousel-caption">
            <h1>This is AA's design</h1>
            <p>
              Thank you very much for reviewing the web.
            </p>
          </Container>
        </div>
      </div>
    </Slider>
  );
}
