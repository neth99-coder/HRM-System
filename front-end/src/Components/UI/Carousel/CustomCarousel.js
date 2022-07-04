import React, { useState } from 'react';

import { Carousel } from 'react-bootstrap';

import styled from './CustomCarousel.module.css';

// For the controlled Carousel

export default function HomeCarousel() {
    const [index, setIndex] = useState(0);
    const handleSelect = (selectedIndex, e) => {
      setIndex(selectedIndex);
    };
  
    const data = [
      {
        image: require("../../Images/HomeCarousel/img-1.jpg"),
        caption: "Caption",
        description: "Description Here",
      },
      {
        image: require("../../Images/HomeCarousel/img-2.jpg"),
        caption: "Caption",
        description: "Description Here",
      },
      {
        image: require("../../Images/HomeCarousel/img-3.jpg"),
        caption: "Caption",
        description: "Description Here",
      },
    ];
  
    return (
      <Carousel activeIndex={index} onSelect={handleSelect}>
        {data.map((slide, i) => {
          return (
            <Carousel.Item>
              <img
                className={`d-block w-100 ${styled["carousel-img"]}`}
                src={slide.image}
                alt={`slider ${i}`}
              />
              <Carousel.Caption>
                <h3>{slide.caption}</h3>
                <p>{slide.description}</p>
              </Carousel.Caption>
            </Carousel.Item>
          );
        })}
      </Carousel>
    );
  }