import 'bootstrap/dist/css/bootstrap.min.css';
import React from 'react';
import { Button, Carousel } from 'react-bootstrap';


function HeroSection() {
  return (
    <div className="hero-section text-center bg-primary text-light marginT">
      <Carousel>
        <Carousel.Item>
          
          <div className="carousel-slide">
            <img 
              className="d-block w-100"
              src="https://www.bigbasket.com/media/uploads/banner_images/IBBN092113357-26110.jpg?tr=w-1920,q=80" // Replace with your image URL
              alt="First slide"
            />
            <Carousel.Caption>
              
              <Button variant="light">Shop Now</Button>
            </Carousel.Caption>
          </div>
        </Carousel.Item>
        <Carousel.Item>
          <div className="carousel-slide">
            <img
              className="d-block w-100"
              src="https://www.bigbasket.com/media/uploads/banner_images/hp_bcd_m_bcd_250923_400.jpg?tr=w-1920,q=80" // Replace with your image URL
              alt="Second slide"
            />
            <Carousel.Caption>
              
              <Button variant="light">Shop Now</Button>
            </Carousel.Caption>
          </div>
        </Carousel.Item>
        <Carousel.Item>
          <div className="carousel-slide">
            <img
              className="d-block w-100"
              src="https://www.bigbasket.com/media/uploads/banner_images/IBBN092113357-26109.jpg?tr=w-1920,q=80" // Replace with your image URL
              alt="Third slide"
            />
            <Carousel.Caption>
              
              <Button variant="light">Shop Now</Button>
            </Carousel.Caption>
          </div>
        </Carousel.Item>
      </Carousel>
    </div>
  );
}

export default HeroSection;