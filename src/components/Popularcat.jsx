import React from 'react';
import { Col, Container, Row } from 'react-bootstrap';
import { Link } from 'react-router-dom'; // Import Link for routing

function PopularCategories() {
  const categories = [
    { name: 'Dairy', icon: 'https://cdn.dmart.in/images/rwd/banners/cards/1may23-popularcat-dairy.png',route: '/PoojaNeedGrid' },
    { name: 'Tea', icon: 'https://cdn.dmart.in/images/rwd/banners/cards/12sept23-popularcat-tea1.png',route: '/PoojaNeedGrid' },
    { name: 'Soft Drinks', icon: 'https://cdn.dmart.in/images/rwd/banners/cards/12sept23-popularcat-softdrinks.png',route: '/PoojaNeedGrid' },
    { name: 'Cleaners', icon: 'https://cdn.dmart.in/images/rwd/banners/cards/1oct24-popularcat-cleaners.png',route: '/PoojaNeedGrid' },
    { name: 'Bath Soaps', icon: 'https://cdn.dmart.in/images/rwd/banners/cards/12jan24-popularcat-soaps.png',route: '/PoojaNeedGrid' },
    { name: 'Toothpaste', icon: 'https://cdn.dmart.in/images/rwd/banners/cards/12sept23-popularcat-toothpaste.png',route: '/PoojaNeedGrid' },
    { name: 'Shampoos', icon: 'https://cdn.dmart.in/images/rwd/banners/cards/12jan24-popularcat-shampoos.png',route: '/PoojaNeedGrid' },
    { name: 'Pooja Needs', icon: 'https://cdn.dmart.in/images/rwd/banners/cards/16jan23-popularcat-poojaneeds1.png', route: '/PoojaNeedGrid' },
    { name: 'Towels', icon: 'https://cdn.dmart.in/images/rwd/banners/cards/1apr24-popularcat-towels.png',route: '/PoojaNeedGrid' },
    { name: 'Bath Utility', icon: 'https://cdn.dmart.in/images/rwd/banners/cards/1apr24-popularcat-bathroom.png',route: '/PoojaNeedGrid' },
    { name: 'Coffee', icon: 'https://cdn.dmart.in/images/rwd/banners/cards/12jan24-popularcat-coffee.png' ,route: '/PoojaNeedGrid'},
    { name: 'Fruits', icon: 'https://img.freepik.com/vecteurs-premium/illustration-vectorielle-fruits-pain_543090-723.jpg',route: '/PoojaNeedGrid' },
  ];

  return (
    <Container className="popular-categories mt-5">
      <Row className="text-center">
        {categories.map((category, index) => (
          <Col xs={4} md={3} lg={2} key={index} className="mb-4">
            {/* Wrap Pooja Needs with Link for routing */}
            {category.route ? (
              <Link to={category.route} style={{textDecoration:'none'}}>
                <img src={category.icon} alt={category.name} className="img-fluid" style={{maxHeight:'100px',maxWidth:'100px'}} />
                <p>{category.name}</p>
              </Link>
            ) : (
              <div>
                <img src={category.icon} alt={category.name} className="img-fluid" />
                <p>{category.name}</p>
              </div>
            )}
          </Col>
        ))}
      </Row>
    </Container>
  );
}

export default PopularCategories;
