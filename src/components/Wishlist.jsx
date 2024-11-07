import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Row, Col, Card, Button } from 'react-bootstrap';
import { ToastContainer, toast } from 'react-toastify';

const Wishlist = ({ setWishlistCount }) => {
  const [wishlist, setWishlist] = useState([]);

  useEffect(() => {
    fetchWishlist();
  }, []);

  const fetchWishlist = async () => {
    try {
      const response = await axios.get('http://localhost:5000/api/wishlist');
      setWishlist(response.data);
      setWishlistCount(response.data.length); // Update wishlist count here
    } catch (error) {
      console.error('Error fetching wishlist:', error);
      
    }
  };

  const removeFromWishlist = async (productId) => {
    try {
      await axios.delete(`http://localhost:5000/api/wishlist/${productId}`);
      fetchWishlist(); // Refresh wishlist after removal
      toast.info('Item removed from wishlist!');
    } catch (error) {
      console.error('Error removing from wishlist:', error);
      toast.error('Failed to remove item from wishlist.');
    }
  };

  return (
    <>
      <h2>Your Wishlist ({wishlist.length} items)</h2>
      {wishlist.length === 0 ? (
        <div style={{ height: '400px', display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
          <h3 style={{ color: 'black' }}>Your wishlist is empty!</h3>
        </div>
      ) : (
        <Row className="g-4 justify-content-center flex-wrap">
          {wishlist.map((product) => (
            <Col key={product._id} xs={12} md={4} lg={2} className="d-flex justify-content-center">
              <Card style={{ width: '265px', padding: '8px 12px', marginTop: '100px' }} className="text-center">
                <Card.Img variant="top" src={product.image} style={{ maxHeight: '200px', objectFit: 'cover' }} />
                <Card.Body>
                  <Card.Title>{product.name}</Card.Title>
                  <Card.Text>Price: ${product.discount ? (product.price * (1 - product.discount / 100)).toFixed(2) : product.price}</Card.Text>
                  <Button variant="danger" onClick={() => removeFromWishlist(product._id)}>
                    Remove from Wishlist
                  </Button>
                </Card.Body>
              </Card>
            </Col>
          ))}
        </Row>
      )}
      <ToastContainer />
    </>
  );
};

export default Wishlist;
