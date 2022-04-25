import React from 'react'
import hotelExample from "../images/hotelExample.png";
import { Carousel } from 'react-bootstrap';

function HotelCarousel() {
  return (
    <Carousel>
        <Carousel.Item>
            <img className="d-block w-100" src={hotelExample} alt="First slide"/>
            <Carousel.Caption>
                <h3>First slide label</h3>
                <p>Nulla vitae elit libero, a pharetra augue mollis interdum.</p>
            </Carousel.Caption>
        </Carousel.Item>
        <Carousel.Item>
            <img className="d-block w-100" src={hotelExample} alt="Second slide"/>
            <Carousel.Caption>
                <h3>Second slide label</h3>
                <p>Nulla vitae elit libero, a pharetra augue mollis interdum.</p>
            </Carousel.Caption>
        </Carousel.Item>
        <Carousel.Item>
            <img className="d-block w-100" src={hotelExample} alt="Third slide"/>
            <Carousel.Caption>
                <h3>Third slide label</h3>
                <p>Nulla vitae elit libero, a pharetra augue mollis interdum.</p>
            </Carousel.Caption>
        </Carousel.Item>
        
    </Carousel>
  )
}

export default HotelCarousel