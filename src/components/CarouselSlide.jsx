import React from 'react';
import { Carousel } from 'react-responsive-carousel';
import "react-responsive-carousel/lib/styles/carousel.min.css";

const CarouselComponent = () => {
  return (
    <div className="carousel-container">
      <Carousel 
        autoPlay 
        infiniteLoop 
        showThumbs={false} 
        showStatus={false} 
        emulateTouch 
        useKeyboardArrows 
        transitionTime={700} 
        interval={3000}      
        showArrows={true}
        dynamicHeight={false}
        swipeable
      >
        <div className="carousel-slide">
          <div className="image-wrapper">
            <img 
              src="https://www.bigbasket.com/media/uploads/banner_images/hp_bcd_m_bcd_250923_400.jpg?tr=w-1920,q=80" 
              alt="Slide 1" 
              className="carousel-image"
            />
          </div>
        </div>
        <div className="carousel-slide">
          <div className="image-wrapper">
            <img 
              src="https://www.bigbasket.com/media/uploads/banner_images/hp_m_petstore_250923_400.jpg?tr=w-1920,q=80" 
              alt="Slide 2"   
              className="carousel-image"
            />
          </div>
        </div>
        <div className="carousel-slide">
          <div className="image-wrapper">
            <img 
              src="https://www.bigbasket.com/media/uploads/banner_images/hp_m_health_suppliment_250923_400.jpg?tr=w-1920,q=80" 
              alt="Slide 3"   
              className="carousel-image"
            />
          </div>
        </div>
      </Carousel>
    </div>
  );
};

export default CarouselComponent;