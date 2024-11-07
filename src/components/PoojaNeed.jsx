import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Row, Col, Card, Button } from 'react-bootstrap';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const PoojaNeedGrid = ({ cart, setCart }) => {
  const [poojaNeeds, setPoojaNeeds] = useState([]);

  useEffect(() => {
    const fetchPoojaNeeds = async () => {
      try {
        const response = await axios.get('http://localhost:5000/api/poojaneeds/allpoojaneeds');
        setPoojaNeeds(response.data.poojaNeeds); // Assuming the response contains 'poojaNeeds' as the key
      } catch (error) {
        console.error('Error fetching pooja needs:', error);
      }
    };

    fetchPoojaNeeds();
  }, []);

  const addToCart = async ({ image, name, price, poojaNeedId }) => {
    try {
      const response = await axios.post('http://localhost:5000/cart/addtocart', [{ image, name, price, poojaNeedId }]);
      setCart(response.data);
      toast.success('Item added to cart!');
    } catch (error) {
      console.error('Error adding to cart:', error);
    }
  };
  

  const removeFromCart = async (poojaNeedId) => {
    try {
      const response = await axios.delete(`http://localhost:5000/cart/remove/${poojaNeedId}`);
      setCart(response.data);
      toast.info('Item removed from cart!');
    } catch (error) {
      console.error('Error removing from cart:', error);
    }
  };

  const addToWishlist = async (poojaNeed) => {
    try {
      await axios.post('http://localhost:5000/api/wishlist', {
        poojaNeedId: poojaNeed._id,
        name: poojaNeed.name,
    
        image: poojaNeed.image,
        price: poojaNeed.price
      });
      toast.success('Item added to wishlist!');
    } catch (error) {
      console.error('Error adding to wishlist:', error);
      toast.error('Error adding item to wishlist.');
    }
  };

  return (
    <>
      <Row className="g-4 justify-content-center flex-wrap">
        {poojaNeeds.map((poojaNeed) => (
          <PoojaNeedCard
            key={poojaNeed._id}
            {...poojaNeed}
            addToCart={addToCart}
            removeFromCart={removeFromCart}
            addToWishlist={() => addToWishlist(poojaNeed)}
            isInCart={Array.isArray(cart) && cart.some(item => item.poojaNeedId === poojaNeed._id)}
            poojaNeedId={poojaNeed._id}
          />
        ))}
      </Row>
      <ToastContainer />
    </>
  );
};

const PoojaNeedCard = ({ image, name, price,addToCart,removeFromCart, addToWishlist, isInCart, poojaNeedId }) => (
  <Col xs={12} md={4} lg={2} className="d-flex justify-content-center" style={{position:'relative',top:'80px'}}>
    <Card style={{ width: '265px', height: 'auto', padding: '8px 12px' }} className="text-center">
      <Card.Img
        variant="top"
        src={image}
        style={{ height: 'auto', maxHeight: '200px', width: '100%', objectFit: 'cover' }}
      />
      <Card.Body className="d-flex flex-column" style={{ flexGrow: 1 }}>
        <Card.Title style={{ margin: '10px 0' }}>{name}</Card.Title>
        <Card.Text className="mb-auto">
          <div>Price: ${price}</div>
        
        </Card.Text>
        {!isInCart ? (
         <Button variant="success" onClick={() => addToCart({ image, name, price, poojaNeedId })}>
         Add to Cart
       </Button>
       
        ) : (
          <Button variant="danger" onClick={() => removeFromCart(poojaNeedId)} style={{ minHeight: '40px', padding: '10px', whiteSpace: 'nowrap' }} >
            Remove from Cart
          </Button>
        )}
        <Button variant="success" className="mt-2" onClick={addToWishlist} style={{ minHeight: '33px', marginTop: '8px', padding: '5px', whiteSpace: 'nowrap' }} >
          Add to Wishlist
        </Button>
      </Card.Body>
    </Card>
  </Col>
);

export default PoojaNeedGrid;
